import type { NextApiRequest, NextApiResponse } from 'next';
import { getUploadUrl } from '../../utils/s3';

// Import formidable for handling file uploads
import formidable from 'formidable'; 

// Configure Next.js API route to disable the default body parser 
export const config = {
  api: {
    bodyParser: false, // Important for file uploads with formidable
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('API request received (method, url):', req.method, req.url);

  if (req.method === 'POST') {
    const form = formidable({ multiples: false }); // Create a new formidable form parser

    form.parse(req, async (err, fields, files) => { // Parse the incoming form data
      if (err) {
        console.error('Formidable parsing error:', err);
        return res.status(500).json({ message: 'File upload failed during parsing.' });
      }

      try {
        console.log('Parsed Form Data:', fields, files); // Log the parsed data

        // Access the uploaded file (assuming the field name is "file")
        const file = files.file as formidable.File;

        // --- Server-Side File Type Validation (Important!) ---
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
        if (!allowedTypes.includes(file.mimetype)) {
          console.warn('Invalid file type uploaded:', file.mimetype);
          return res.status(400).json({ message: 'Invalid file type. Please upload an image (JPEG, PNG, GIF) or a PDF.' });
        }

        // ... You can add more server-side validation here (e.g., file size) ... 

        const fileName = fields.filename as string; // Access filename from form data
        const uploadData = await getUploadUrl(fileName); // Pass filename to getUploadUrl
        console.log('Upload URL fetched successfully:', uploadData);

        res.status(200).json(uploadData); // Send upload data back to the client
      } catch (error) {
        console.error('Error getting upload URL:', error);
        res.status(500).json({ message: 'Failed to get upload URL.' });
      }
    });
  } else if (req.method === 'GET') {
    // ... (Handle GET requests for presigned URLs) ...
    const fileName = req.query.filename as string;
    if (!fileName) {
      console.warn('Filename not provided in request');
      return res.status(400).json({ message: 'Filename is required' });
    }

    try {
      console.log('Fetching upload URL for filename:', fileName);
      const uploadData = await getUploadUrl(fileName);
      console.log('Upload URL fetched successfully:', uploadData);
      res.status(200).json(uploadData);
    } catch (error) {
      console.error('Error getting upload URL:', error);
      res.status(500).json({ message: 'Failed to get upload URL' });
    }
  } else {
    console.warn('Invalid request method:', req.method);
    return res.status(405).json({ message: 'Method not allowed' }); 
  }
};
Use code with caution.
JavaScript
team/aws/s3-upload-next/src/utils/s3.ts
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || '',
  },
});

export const listFiles = async (): Promise<Array<{ Key: string; LastModified?: Date; Size?: number }>> => {
  console.log('listFiles() called');
  const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET;
  if (!bucketName) {
    console.error('S3 bucket name is not defined');
    throw new Error('S3 bucket name is not defined');
  }

  const params = {
    Bucket: bucketName,
  };

  try {
    console.log('Executing ListObjectsV2Command with params:', params);
    const command = new ListObjectsV2Command(params);
    const data = await s3Client.send(command);
    console.log('Files listed successfully:', data.Contents);
    return data.Contents || [];
  } catch (error) {
    console.error('Error listing files:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to list files from S3: ${error.message}`);
    } else {
      throw new Error('Failed to list files from S3: Unknown error');
    }
  }
};

export const getUploadUrl = async (fileName: string): Promise<{ url: string; fields: Record<string, string> }> => {
  console.log('getUploadUrl() called with fileName:', fileName);
  const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET;
  if (!bucketName) {
    console.error('S3 bucket name is not defined');
    throw new Error('S3 bucket name is not defined');
  }

  try {
    console.log('Creating presigned post with fileName:', fileName);
    const { url, fields } = await createPresignedPost(s3Client, {
      Bucket: bucketName,
      Key: fileName,
      Conditions: [
        ["content-length-range", 0, 10485760], // up to 10 MB
      ],
      Expires: 600, // 10 minutes
    });

    console.log('Presigned post created successfully:', { url, fields });
    return { url, fields };
  } catch (error) {
    console.error('Error getting upload URL:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to get upload URL: ${error.message}`);
    } else {
      throw new Error('Failed to get upload URL: Unknown error');
    }
  }
};
