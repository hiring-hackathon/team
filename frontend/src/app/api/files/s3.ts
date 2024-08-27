// frontend/src/app/api/files/s3.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { getUploadUrl } from '../../../lib/s3'; // Correct path to lib/s3.ts

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

        // Ensure the file is a single file object and not an array or undefined
        const file = Array.isArray(files.file) ? files.file[0] : files.file;

        if (!file) {
          console.warn('No file uploaded.');
          return res.status(400).json({ message: 'No file uploaded.' });
        }

        // Now file is guaranteed to be of type formidable.File
        const typedFile = file as formidable.File;

        // --- Server-Side File Type Validation (Important!) ---
        /*
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'];
        if (!allowedTypes.includes(file.mimetype)) {
          console.warn('Invalid file type uploaded:', file.mimetype);
          return res.status(400).json({ message: 'Invalid file type. Please upload an image (JPEG, PNG, GIF) or a PDF.' });
        }
        */

        // Handle filename safely
        const fileNameField = fields.filename;
        const fileName = Array.isArray(fileNameField) ? fileNameField[0] : fileNameField;

        if (!fileName) {
          console.warn('Filename is not provided.');
          return res.status(400).json({ message: 'Filename is required.' });
        }

        const uploadData = await getUploadUrl(fileName); // Pass filename to getUploadUrl
        console.log('Upload URL fetched successfully:', uploadData);

        res.status(200).json(uploadData); // Send upload data back to the client
      } catch (error) {
        console.error('Error getting upload URL:', error);
        res.status(500).json({ message: 'Failed to get upload URL.' });
      }
    });
  } else if (req.method === 'GET') {
    // Handle GET requests for presigned URLs
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
