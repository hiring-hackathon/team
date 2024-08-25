"use client"; 
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { FileUp, Trash2, Pencil, X } from 'lucide-react';

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

export default function Comment({ comment, x, y }: CommentProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [open, setOpen] = useState(true);

    useEffect(() => {
        if (x === 0 && y === 0) {
            setOpen(false);
            
        }
    }, [x, y]);

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
                        {comment.file && (
                            <div className="flex justify-between items-center mb-4">
                                <Button variant={'ghost'}>
                                    <FileUp />
                                </Button>
                                <a href={comment.file} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                    View Attached File
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
