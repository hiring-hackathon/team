// src/components/core/Transcript-info.tsx

'use client';

import { useState, useEffect, useCallback } from 'react';
import Comments from './Comments';
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { FileUp } from 'lucide-react';
import Sidebar from '@/components/core/Sidebar';

interface Transcript {
    id: string;
    text: string;
    timestamp: string;
}

interface Comment {
    id: string;
    transcriptId: string;
    text: string;
    file: string;
    timeStamp: string;
}

export default function TranscriptPage({ transcriptId }: { transcriptId: string }) {
    const [transcript, setTranscript] = useState<Transcript | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [comment, setComment] = useState<string>('');
    const [location, setLocation] = useState({ startIndex: 0, endIndex: 10 });
    const [dialogOpen, setDialogOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [rightClickPosition, setRightClickPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const handleCommentTextChange = (event: React.ChangeEvent<HTMLInputElement>) => setComment(event.target.value);
    const handleStartIndexChange = (event: React.ChangeEvent<HTMLInputElement>) => setLocation(prev => ({ ...prev, startIndex: parseInt(event.target.value, 10) }));
    const handleEndIndexChange = (event: React.ChangeEvent<HTMLInputElement>) => setLocation(prev => ({ ...prev, endIndex: parseInt(event.target.value, 10) }));
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const fetchTranscript = useCallback(() => {
        fetch(`https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test/transcriptions/${transcriptId}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.transcript) {
                    setTranscript({
                        id: data.transcript.TranscriptId,
                        text: data.transcript.TranscriptText,
                        timestamp: new Date().toISOString()
                    });
                } else {
                    console.error('No transcript data found');
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [transcriptId]);

    const fetchComments = useCallback(() => {
        console.log('fetching comments');
        fetch(`https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test/transcriptions/${transcriptId}/getAllComments`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const fetchedComments: Comment[] = data.map((item: any) => ({
                        id: item.CommentId,
                        transcriptId: item.TranscriptId,
                        text: item.CommentText,
                        file: '',  // Replace with actual file data if available
                        timeStamp: item.CreatedAt
                    }));
                    setComments(fetchedComments);
                } else {
                    console.error('No comment data found');
                }
            })
            .catch(error => console.error('Error fetching comments:', error));
    }, [transcriptId]);

    const addNewComment = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        console.log('Comment:', comment);
        console.log('Location:', location);

        const payload = {
            commentText: comment,
            transcriptId: transcriptId,
            location: location
        };

        await fetch(`https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test/transcriptions/${transcriptId}/createComment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(() => {
            console.log(comment);
            fetchComments(); // Refetch comments after adding a new one
        })
        .catch(error => {
            console.error('Error creating comment:', error);
        })
        .finally(() => {
            // Reset state values
            setComment(''); // Reset comment text
            setLocation({ startIndex: 0, endIndex: 10 }); // Reset location to default values
            setDialogOpen(false); // Close the dialog
        });
    };

    useEffect(() => {
        fetchTranscript();
        fetchComments();
    }, [fetchTranscript, fetchComments]);

    // Open dialog on right-click and set position
    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setDialogOpen(true);
        setRightClickPosition({ x: event.clientX, y: event.clientY });
    };

    return (
        <>
            <Sidebar />
            <div className='p-5 text-white mb-10'>
                <div className='flex justify-between'>
                    <div>
                        <p className='text-yellow-400'>Transcript - {transcript?.id} </p>
                    </div>
                    <div>
                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                            <DialogTrigger asChild>
                                <Button className="bg-white text-gray-600 p-2 rounded-lg" onClick={() => setDialogOpen(true)}>
                                    Add Comment
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="text-yellow-700">Add a New Comment</DialogTitle>
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
                                                    value={comment}
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
                                            <div className='flex items-center space-x-4 mb-4'>
                                                <label htmlFor="fileUpload" className="text-sm font-medium text-gray-900 flex items-center">
                                                    <FileUp />
                                                    <span className="ml-2">Upload File</span>
                                                </label>
                                                <input
                                                    id="fileUpload"
                                                    type="file"
                                                    onChange={handleFileChange}
                                                    className="block p-2 rounded-md bg-gray-700 text-white"
                                                />
                                            </div>
                                            <Button className="bg-slate-500 mt-5" onClick={addNewComment}>
                                                Add
                                            </Button>
                                        </form>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <div className='text-xl font-semibold mb-2'>
                    {transcript ? (
                        <>
                            <p className='text-white mt-10'>
                                <div className='flex justify-between' onContextMenu={handleContextMenu}>
                                    <div className='pr-9'>
                                        {new Date(transcript.timestamp).toLocaleString()}
                                    </div>
                                    <div>
                                        {transcript.text}
                                    </div>
                                </div>
                            </p>
                            <div className='h-1 bg-yellow-600 w-24 mx-auto mb-4 mt-4'></div>
                            <p></p>
                            <div className='mt-8'>
                                <Comments comments={comments} fetchComments={fetchComments} rightClickPosition={rightClickPosition}/>
                            </div>
                        </>
                    ) : (
                        'Loading...'
                    )}
                </div>
            </div>
        </>
    );
}
