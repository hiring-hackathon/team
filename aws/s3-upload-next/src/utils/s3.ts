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
  const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET;
  if (!bucketName) {
    throw new Error('S3 bucket name is not defined');
  }

  const params = {
    Bucket: bucketName,
  };

  try {
    const command = new ListObjectsV2Command(params);
    const data = await s3Client.send(command);
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
  const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET;
  if (!bucketName) {
    throw new Error('S3 bucket name is not defined');
  }

  try {
    const { url, fields } = await createPresignedPost(s3Client, {
      Bucket: bucketName,
      Key: fileName,
      Conditions: [
        ["content-length-range", 0, 10485760], // up to 10 MB
      ],
      Expires: 600, // 10 minutes
    });

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
