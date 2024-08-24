'use client';

import React from 'react';
import { Button } from "@/components/ui/button"
import { FileUp } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Pencil } from 'lucide-react';

interface Comment {
    id: string;
    transcriptId: string;
    text: string;
    file: string;
    timeStamp: string;
}

interface CommentsProps {
    comments: Comment[]; // Comments passed as props
}

export default function Comments({ comments }: CommentsProps) {
    return (
        <div className='mb-5'>
            <h1 className='text-yellow-400'>Comments</h1>
            <div className=" mb-4">

                {comments.map((comment) => (
                    <div key={comment.id} className='mb-4'>
                        <p className='text-white'>
                            <div><strong>{new Date(comment.timeStamp).toLocaleString()}</strong> -- {comment.text}</div>
                            {comment.file && (
                            <p>
                                <a href={comment.file} target="_blank" rel="noopener noreferrer">
                                    (Attached File)
                                </a>
                            </p>
                        )}
                            <div  className='flex justify-end max-h-4 mb-20'>
                            <Button className='mr-5'>
                                    <Pencil />
                                </Button>
                                <Button variant={'destructive'} size={'icon'}  className='mr-5' >
                                        <Trash2 />
                                    </Button>

                                <Button className="text-gray-500 hover:text-gray-700 mr-5" size={'sm'} variant='secondary' >
                                ✖️
                                </Button>
                            </div>
                        </p>
                        
                    </div>
                ))}
            </div>
        </div>
    );
}
              