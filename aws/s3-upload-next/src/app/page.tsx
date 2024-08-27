// aws/s3-upload-next/src/app/page.tsx

// aws/s3-upload-next/src/api/upload.ts

"use client";

import React, { useState, useEffect } from 'react';
import { listFiles, getUploadUrl } from '../utils/s3';

interface S3File {
  Key: string;
  LastModified?: Date;
  Size?: number;
}

const Home: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileList, setFileList] = useState<S3File[]>([]);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    console.log('Component mounted. Fetching files...');
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    console.log('fetchFiles() called');
    setIsLoading(true);
    setError(null);
    try {
      console.log('Calling listFiles() to get files from S3...');
      const files = await listFiles();
      console.log('Files fetched successfully:', files);
      setFileList(files);
    } catch (error) {
      const errorMessage = `Failed to fetch files: ${error instanceof Error ? error.message : 'Unknown error'}`;
      setError(errorMessage);
      console.error('Error fetching file list:', error);
    }
    setIsLoading(false);
    console.log('fetchFiles() completed');
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File input changed');
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);
    setError(null);
    console.log('Selected file:', file);
  };

  const handleUpload = async () => {
    console.log('handleUpload() called');
    if (!selectedFile) {
      setError('Please select a file to upload.');
      console.warn('Upload attempted without selecting a file.');
      return;
    }

    console.log('Selected file:', selectedFile);

    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (selectedFile.size > maxSize) {
      setError('File is too large. Maximum size is 10MB.');
      console.warn('Selected file is too large:', selectedFile.size);
      return;
    }

    setProgress(0);
    setError(null);
    setIsLoading(true);

    try {
      console.log('Getting upload URL from server...');
      const { url, fields } = await getUploadUrl(selectedFile.name);
      console.log('Upload URL and fields received:', { url, fields });
      
      const formData = new FormData();
      Object.entries({ ...fields, file: selectedFile }).forEach(([key, value]) => {
        formData.append(key, value);
      });

      console.log('Form data prepared for upload:', formData);

      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setProgress(percentComplete);
          console.log(`Upload progress: ${percentComplete}%`);
        }
      };

      xhr.onload = async function() {
        console.log('XHR onload triggered. Status:', xhr.status);
        console.log('XHR response body:', xhr.responseText);
        if (xhr.status === 204) {
          setProgress(100);
          console.log('Upload completed successfully. Refreshing file list...');
          await fetchFiles();
          setSelectedFile(null);
          const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
          if (fileInput) fileInput.value = '';
        } else {
          const error = new Error(`Upload failed with status ${xhr.status}`);
          console.error(error);
          throw error;
        }
      };

      xhr.onerror = function() {
        console.error('XHR request failed', xhr.statusText);
        throw new Error('XHR request failed');
      };

      xhr.open('POST', url);
      console.log('Starting file upload...');
      console.log('XHR request headers:', xhr.getAllResponseHeaders());
      xhr.send(formData);

    } catch (error) {
      let errorMessage = 'Failed to upload file. ';
      if (error instanceof Error) {
        errorMessage += error.message;
      } else {
        errorMessage += 'An unknown error occurred.';
      }
      setError(errorMessage);
      console.error('Error during file upload:', error);
    }

    setIsLoading(false);
    console.log('handleUpload() completed');
  };

  const formatFileSize = (bytes?: number): string => {
    if (!bytes) return 'Unknown';
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(2) + ' MB';
    else return (bytes / 1073741824).toFixed(2) + ' GB';
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', borderBottom: '2px solid #333', paddingBottom: '10px' }}>S3 File Manager</h1>

      <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
        <input 
          type="file" 
          onChange={handleFileInput} 
          disabled={isLoading}
          style={{ flex: 1 }}
        />
        <button 
          onClick={handleUpload} 
          style={{ 
            marginLeft: '10px', 
            padding: '10px 20px', 
            backgroundColor: '#FFFF00',  // Yellow background
            color: 'black',  // Black text
            border: 'none', 
            borderRadius: '5px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.3s'
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Uploading...' : 'Upload to S3'}
        </button>
      </div>

      {progress > 0 && progress < 100 && (
        <div style={{ marginBottom: '20px' }}>
          <progress value={progress} max="100" style={{ width: '100%', height: '20px' }} />
          <p>{progress.toFixed(2)}% Uploaded</p>
        </div>
      )}

      {error && <div style={{ color: 'red', marginBottom: '10px', padding: '10px', backgroundColor: '#ffeeee', border: '1px solid #ffcccc', borderRadius: '5px' }}>{error}</div>}

      <h2>Files in S3:</h2>
      {isLoading ? (
        <p>Loading files...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>File Name</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Size</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Last Modified</th>
            </tr>
          </thead>
          <tbody>
            {fileList.map((file, index) => (
              <tr key={file.Key} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white' }}>
                <td style={{ padding: '10px' }}>{file.Key}</td>
                <td style={{ padding: '10px' }}>{formatFileSize(file.Size)}</td>
                <td style={{ padding: '10px' }}>{file.LastModified ? new Date(file.LastModified).toLocaleString() : 'Unknown'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
