// frontend/src/app/files/page.tsx

"use client";

import React, { useState, useEffect, useRef } from 'react';
import { listFiles, getUploadUrl } from '../../lib/s3';
import Navbar from "@/components/layout/nav";
import Footer from "@/components/layout/footer";

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
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success messages
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sortColumn, setSortColumn] = useState<string>('Key');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [eta, setEta] = useState<number | null>(null);
  const [uploadSpeed, setUploadSpeed] = useState<number | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File input changed');
    const file = e.target.files ? e.target.files[0] : null;
    setSelectedFile(file);
    setError(null);
    setSuccessMessage(null); // Clear success message on new action
    console.log('Selected file:', file);

    if (file) {
      await handleUpload(file);
    }
  };

  const handleUpload = async (file: File) => {
    console.log('handleUpload() called');
    if (!file) {
      setError('Please select a file to upload.');
      console.warn('Upload attempted without selecting a file.');
      return;
    }

    console.log('Selected file:', file);

    const maxSize = 5 * 1024 * 1024 * 1024 * 1024; // 5TB in bytes
    if (file.size > maxSize) {
      setError('File is too large. Maximum size is 5TB.');
      console.warn('Selected file is too large:', file.size);
      return;
    }

    setProgress(0);
    setError(null);
    setSuccessMessage(null);
    setIsLoading(true);
    setEta(null);
    setUploadSpeed(null);

    const startTime = new Date().getTime(); // Track the start time

    try {
      console.log('Getting upload URL from server...');
      const { url, fields } = await getUploadUrl(file.name);
      console.log('Upload URL and fields received:', { url, fields });

      const formData = new FormData();
      Object.entries({ ...fields, file: file }).forEach(([key, value]) => {
        formData.append(key, value);
      });

      console.log('Form data prepared for upload:', formData);

      const xhr = new XMLHttpRequest();
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          setProgress(percentComplete);
          console.log(`Upload progress: ${percentComplete}%`);

          // Calculate upload speed (bytes per second)
          const elapsedTime = (new Date().getTime() - startTime) / 1000; // in seconds
          const speed = event.loaded / elapsedTime; // bytes per second
          setUploadSpeed(speed);

          // Calculate ETA (seconds remaining)
          const remainingTime = (event.total - event.loaded) / speed; // in seconds
          setEta(remainingTime);
        }
      };

      xhr.onload = async function() {
        console.log('XHR onload triggered. Status:', xhr.status);
        console.log('XHR response body:', xhr.responseText);
        
        if (!file || !file.name) {
          console.warn('No file or filename is available. Aborting further actions.');
          return; // Exit early if there's no file or filename
        }
      
        if (xhr.status === 204) {
          setProgress(100);
          setSuccessMessage(`Upload successful: ${file.name}`); // Show success message with filename
          console.log('Upload completed successfully. Refreshing file list...');
          await fetchFiles(); // Refresh file list after upload
          setSelectedFile(null);
          if (fileInputRef.current) fileInputRef.current.value = ''; // Clear file input
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

  const formatSpeed = (bytesPerSecond: number): string => {
    if (bytesPerSecond < 1024) return bytesPerSecond.toFixed(2) + ' B/s';
    else if (bytesPerSecond < 1048576) return (bytesPerSecond / 1024).toFixed(2) + ' KB/s';
    else if (bytesPerSecond < 1073741824) return (bytesPerSecond / 1048576).toFixed(2) + ' MB/s';
    else return (bytesPerSecond / 1073741824).toFixed(2) + ' GB/s';
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}m ${secs}s`;
  };

  const handleSort = (column: string) => {
    const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(newSortOrder);
    setFileList((prevList) =>
      [...prevList].sort((a, b) => {
        const aValue = a[column as keyof S3File];
        const bValue = b[column as keyof S3File];

        if (aValue === undefined && bValue === undefined) return 0;
        if (aValue === undefined) return newSortOrder === 'asc' ? -1 : 1;
        if (bValue === undefined) return newSortOrder === 'asc' ? 1 : -1;

        if (newSortOrder === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      })
    );
  };

  const renderSortArrow = (column: string) => {
    if (sortColumn === column) {
      return sortOrder === 'asc' ? ' ↑' : ' ↓';
    }
    return ' ↕'; // Neutral arrow when not sorted
  };

  const handleDownload = (fileKey: string) => {
    const s3BucketUrl = 'https://' + process.env.NEXT_PUBLIC_S3_BUCKET + '.s3.amazonaws.com'; // Use environment variable for the S3 bucket URL
    const fileUrl = `${s3BucketUrl}/${encodeURIComponent(fileKey)}`;
  
    fetch(fileUrl)
      .then(response => {
        if (!response.ok) throw new Error('Failed to download file.');
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileKey.split('/').pop() || 'download'; // Extract file name or use 'download' as default
        a.click();
        window.URL.revokeObjectURL(url);
        setSuccessMessage('Download successful!'); // Show success message
        console.log('File downloaded successfully.');
      })
      .catch(error => {
        setError('Failed to download file. ' + error.message);
        console.error('Error during file download:', error);
      });
  };  

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{ 
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
                Upload
              </button>
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileInput} 
                disabled={isLoading}
                style={{ display: 'none' }} // Hide the input field
              />
            </div>

            {selectedFile && progress > 0 && progress < 100 && (
              <div style={{ marginBottom: '20px' }}>
                <p>Uploading: {selectedFile.name}</p> {/* Display the name of the file being uploaded */}
                <progress value={progress} max="100" style={{ width: '100%', height: '20px' }} />
                <p>{progress.toFixed(2)}% Uploaded</p>
                {uploadSpeed && <p>Upload Speed: {formatSpeed(uploadSpeed)}</p>}
                {eta && <p>ETA: {formatTime(eta)}</p>}
              </div>
            )}

            {successMessage && (
              <div style={{ color: 'green', marginBottom: '10px', padding: '10px', backgroundColor: '#e6ffe6', border: '1px solid #ccffcc', borderRadius: '5px' }}>
                {successMessage}
              </div>
            )}

            {error && (
              <div style={{ color: 'red', marginBottom: '10px', padding: '10px', backgroundColor: '#ffeeee', border: '1px solid #ffcccc', borderRadius: '5px' }}>
                {error}
              </div>
            )}

            {isLoading ? (
              <p>Loading files...</p>
            ) : (
              <div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ backgroundColor: 'yellow', color: 'black' }}>
                      <th style={{ padding: '10px', textAlign: 'left', cursor: 'pointer' }} onClick={() => handleSort('Key')}>
                        File Name {renderSortArrow('Key')}
                      </th>
                      <th style={{ padding: '10px', textAlign: 'left', cursor: 'pointer' }} onClick={() => handleSort('Size')}>
                        Size {renderSortArrow('Size')}
                      </th>
                      <th style={{ padding: '10px', textAlign: 'left', cursor: 'pointer' }} onClick={() => handleSort('LastModified')}>
                        Last Modified {renderSortArrow('LastModified')}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fileList.map((file, index) => (
                      <tr key={file.Key} style={{ backgroundColor: index % 2 === 0 ? '#f8f9fa' : 'white' }}>
                        <td style={{ padding: '10px', cursor: 'pointer', textDecoration: 'underline' }} onClick={() => handleDownload(file.Key)}>
                          {file.Key}
                        </td>
                        <td style={{ padding: '10px' }}>{formatFileSize(file.Size)}</td>
                        <td style={{ padding: '10px' }}>{file.LastModified ? new Date(file.LastModified).toLocaleString() : 'Unknown'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
