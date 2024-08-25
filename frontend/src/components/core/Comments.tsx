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
    fetchComments: () => void; // Add fetchComments prop
    
}

export default function Comments({ comments, fetchComments  }: CommentsProps) {

    const deleteComment = (id: string, commentId: string) => {
        return fetch(`https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test/transcriptions/${id}/getAllComments/${commentId}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            alert('comment deleted')
            console.log('Delete response data:', data); // Log the response to the console
            fetchComments();
        })
        .catch(error => console.error('Error deleting comment:', error)); // Log errors to the console
    };
    
      const addComment=() =>{
    
      }
    
      const updateComment = () =>{
    
      }
    
      const addFileToComment = () =>{
    
      }

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
                                <Button variant={'destructive'} size={'icon'}  className='mr-5' onClick={() => deleteComment(comment.transcriptId, comment.id)}>
                                        <Trash2 />
                                    </Button>

                              
                            </div>
                        </p>
                        
                    </div>
                ))}
            </div>
        </div>
    );
}
              