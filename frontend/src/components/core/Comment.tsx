"use client";
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { FileUp, Trash2, Pencil, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';

interface CommentProps {
    comment: Comment;
    x: number;
    y: number;
}

interface Comment {
    id: string;
    transcriptId: string;
    text: string;
    file?: string; // Made file optional
    timeStamp: string;
}

// Access environment variables
const S3_BUCKET = process.env.NEXT_PUBLIC_S3_BUCKET;
const REGION = process.env.NEXT_PUBLIC_AWS_REGION;
const ACCESS_KEY = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
const SECRET_KEY = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;

export default function Comment({ comment, x, y }: CommentProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<string | undefined>(comment.file);

    useEffect(() => {
        if (x === 0 && y === 0) {
            setOpen(false);
        }
    }, [x, y]);

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        try {
            if (!S3_BUCKET || !REGION || !ACCESS_KEY || !SECRET_KEY) {
                throw new Error('Missing required environment variables for S3 upload');
            }

            const fileName = `${uuidv4()}-${file.name}`;
            const fileType = file.type;

            const dateISOString = new Date().toISOString();
            const yymmdd = dateISOString.split('T')[0].replace(/-/g, '');
            const amzdate = yymmdd + 'T' + dateISOString.split('T')[1].replace(/:/g, '').split('.')[0] + 'Z';
            const datestamp = yymmdd;

            const policy = {
                expiration: new Date(new Date().getTime() + 3600 * 1000).toISOString(),
                conditions: [
                    {"bucket": S3_BUCKET},
                    ["starts-with", "$key", ""],
                    {"acl": "public-read"},
                    ["starts-with", "$Content-Type", ""],
                    {"x-amz-credential": ACCESS_KEY + "/" + datestamp + "/" + REGION + "/s3/aws4_request"},
                    {"x-amz-algorithm": "AWS4-HMAC-SHA256"},
                    {"x-amz-date": amzdate}
                ]
            };

            const policyBase64 = btoa(JSON.stringify(policy));

            const getSignatureKey = (key: string, dateStamp: string, regionName: string) => {
                let kDate = CryptoJS.HmacSHA256(dateStamp, "AWS4" + key);
                let kRegion = CryptoJS.HmacSHA256(regionName, kDate);
                let kService = CryptoJS.HmacSHA256("s3", kRegion);
                let kSigning = CryptoJS.HmacSHA256("aws4_request", kService);
                return kSigning;
            };

            const signatureKey = getSignatureKey(SECRET_KEY, datestamp, REGION);
            const signature = CryptoJS.HmacSHA256(policyBase64, signatureKey).toString(CryptoJS.enc.Hex);

            const formData = new FormData();
            formData.append('key', fileName);
            formData.append('acl', 'public-read');
            formData.append('Content-Type', fileType);
            formData.append('x-amz-credential', ACCESS_KEY + "/" + datestamp + "/" + REGION + "/s3/aws4_request");
            formData.append('x-amz-algorithm', 'AWS4-HMAC-SHA256');
            formData.append('x-amz-date', amzdate);
            formData.append('policy', policyBase64);
            formData.append('x-amz-signature', signature);
            formData.append('file', file);

            const response = await fetch(`https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('S3 upload failed');
            }

            const fileUrl = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${fileName}`;
            setUploadedFile(fileUrl);

        } catch (error) {
            console.error('Error uploading file:', error);
            // Handle error (e.g., show an error message to the user)
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div 
            style={{ 
                position: 'absolute', 
                top: y, 
                left: x, 
                zIndex: 50 
            }} 
        >
            {/* Floating Button */}
            {open && !isOpen && (
                <Button
                    onClick={() => setIsOpen(true)}
                    className="bg-gray-600 text-white p-4 rounded-full shadow-lg focus:outline-none"
                >
                    💬
                </Button>
            )}

            {/* Comment Box */}
            {isOpen && (
                <div className='bg-white border border-gray-300 rounded-lg shadow-lg p-2 w-80 mt-2'>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Comment</h2>
                        <div className="flex items-center space-x-2">
                            <Button variant={'ghost'}>
                                <Pencil />
                            </Button>
                            <Button variant={'destructive'} size={'icon'}>
                                <Trash2 />
                            </Button>
                            <Button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                                size={'sm'}
                                variant='secondary'
                            >
                                <X />
                            </Button>
                        </div>
                    </div>
                    <div className="overflow-y-auto h-40">
                        <div className="mb-2 text-yellow-600">
                            <p className="text-sm">{comment.id}</p>
                            <p className="text-sm">{comment.text}</p>
                        </div>
                        {uploadedFile ? (
                            <div className="flex justify-between items-center mb-4">
                                <Button variant={'ghost'}>
                                    <FileUp />
                                </Button>
                                <a href={uploadedFile} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                    View Attached File
                                </a>
                            </div>
                        ) : (
                            <div className="mb-4">
                                <input
                                    type="file"
                                    onChange={handleFileUpload}
                                    disabled={isUploading}
                                    className="hidden"
                                    id="fileInput"
                                />
                                <label htmlFor="fileInput">
                                    <Button as="span" variant={'ghost'} disabled={isUploading}>
                                        <FileUp />
                                        {isUploading ? 'Uploading...' : 'Upload File'}
                                    </Button>
                                </label>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}