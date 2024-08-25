'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { FileUp } from 'lucide-react';
import { Trash2 } from 'lucide-react';
import { Pencil } from 'lucide-react';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

interface Comment {
    id: string;
    transcriptId: string;
    text: string;
    file: string;
    timeStamp: string;
}

interface CommentsProps {
    comments: Comment[];
    fetchComments: () => void; // update the comments when a comment is deleted/edited
}

export default function Comments({ comments, fetchComments }: CommentsProps) {
    const [commentText, setCommentText] = useState('');
    const [location, setLocation] = useState({ startIndex: 0, endIndex: 15 });
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    
    {console.log(comments)}

    const sampleComments = [
        {
            id: "1",
            transcriptId: "transcript1",
            text: "This is a sample comment text for the first comment.",
            file: "https://example.com/file1.pdf",
            timeStamp: "2024-08-23T12:34:56Z"
        },
        {
            id: "2",
            transcriptId: "transcript2",
            text: "This is another sample comment text for the second comment.",
            file: null, // No file attached
            timeStamp: "2024-08-24T14:22:30Z"
        }
    ];

    const handleCommentTextChange = (event: React.ChangeEvent<HTMLInputElement>) => setCommentText(event.target.value);
    const handleStartIndexChange = (event: React.ChangeEvent<HTMLInputElement>) => setLocation(prev => ({ ...prev, startIndex: parseInt(event.target.value, 10) }));
    const handleEndIndexChange = (event: React.ChangeEvent<HTMLInputElement>) => setLocation(prev => ({ ...prev, endIndex: parseInt(event.target.value, 10) }));

    const deleteComment = (id: string, commentId: string) => {
        return fetch(`https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test/transcriptions/${id}/getAllComments/${commentId}/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                alert('comment deleted');
                console.log('Delete response data:', data);
                fetchComments();
            })
            .catch(error => console.error('Error deleting comment:', error));
    };

    const updateComment = (id: string, commentId: string) => {
        
        fetch(`https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test/transcriptions/${id}/getAllComments/${commentId}/edit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: commentText,
                location
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Update response data:', data);
                fetchComments();
            })
            .catch(error => console.error('Error updating comment:', error));
    };

    const handleEditClick = (comment: Comment) => {
        setCommentText(comment.text);
        setLocation({ startIndex: 0, endIndex: 15 }); 
    };

    const attachFile = () => {
        return
    }

    return (
        <div className='mb-5'>
            <h1 className='text-yellow-400'>Comments</h1>
            <div className=" mb-4">
                {comments.map((comment) => (
                    <div key={comment.id} className='mb-4'>
                        <p className='text-white'>
                            <div>
                                <strong>{comment.timeStamp}</strong> --    {comment.text ? comment.text : 'No text available'} 
                                <Button variant={'ghost'} onClick={attachFile}>
                                <FileUp />
                                </Button>
                            
                            </div>
                            {comment.file && (
                                <p>
                                    <a href={comment.file} target="_blank" rel="noopener noreferrer">
                                        (Attached File)
                                    </a>
                                </p>
                            )}
                            <div className='flex justify-end max-h-4 mb-20'>
                                <Button className='mr-5'>
                                    <Dialog>
                                        <DialogTrigger onClick={() => handleEditClick(comment)}>
                                            <Pencil />
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Edit Comment</DialogTitle>
                                                <DialogDescription>
                                                    <form>
                                                        <div className='mb-4'>
                                                            <label htmlFor="commentText" className="block text-sm font-medium text-gray-900">
                                                                Comment Text
                                                            </label>
                                                            <input
                                                                id="commentText"
                                                                type="text"
                                                                onChange={handleCommentTextChange}
                                                                value={commentText}
                                                                required
                                                                className="mt-1 block w-full p-2 rounded-md bg-gray-700 text-white"
                                                            />
                                                        </div>
                                                        <div className='mb-4'>
                                                            <label htmlFor="startIndex" className="block text-sm font-medium text-gray-900">
                                                                Start Index
                                                            </label>
                                                            <input
                                                                id="startIndex"
                                                                type="number"
                                                                onChange={handleStartIndexChange}
                                                                value={location.startIndex}
                                                                required
                                                                className="mt-1 block w-full p-2 rounded-md bg-gray-700 text-white"
                                                            />
                                                        </div>
                                                        <div className='mb-4'>
                                                            <label htmlFor="endIndex" className="block text-sm font-medium text-gray-900">
                                                                End Index
                                                            </label>
                                                            <input
                                                                id="endIndex"
                                                                type="number"
                                                                onChange={handleEndIndexChange}
                                                                value={location.endIndex}
                                                                required
                                                                className="mt-1 block w-full p-2 rounded-md bg-gray-700 text-white"
                                                            />
                                                        </div>
                                                        <Button className="bg-slate-500 mt-5" onClick={() => updateComment(comment.transcriptId, comment.id)}>
                                                            Update
                                                        </Button>
                                                    </form>
                                                </DialogDescription>
                                            </DialogHeader>
                                        </DialogContent>
                                    </Dialog>
                                </Button>
                                <Button variant={'destructive'} size={'icon'} className='mr-5' onClick={() => deleteComment(comment.transcriptId, comment.id)}>
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
