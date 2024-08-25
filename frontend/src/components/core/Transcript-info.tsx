'use client';

import { useState, useEffect } from 'react';
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
import { Textarea } from "@/components/ui/textarea";
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

    const handleCommentTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setComment(event.target.value);
    const handleStartIndexChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setLocation(prev => ({ ...prev, startIndex: parseInt(event.target.value, 10) }));
    const handleEndIndexChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setLocation(prev => ({ ...prev, endIndex: parseInt(event.target.value, 10) }));

    const fetchTranscript = () => {
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
    };

    const fetchComments = () => {
        console.log('fteching comments')
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
                    console.log()
                } else {
                    console.error('No comment data found');
                }
            })
            .catch(error => console.error('Error fetching comments:', error));
    };

    const addNewComment = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    
        fetch(`https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test/transcriptions/${transcriptId}/createComment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: comment,
                transcriptId: transcriptId,
                
                location
            })
        })
        .then(response => response.json())
        .then(() => {
            console.log('Comment created');
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
    }, [transcriptId]);

    // Open dialog on right-click
    const handleContextMenu = (event: React.MouseEvent) => {
        event.preventDefault();
        setDialogOpen(true);
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
                                        <div>
                                            <p>Comment Text</p>
                                            <Textarea 
                                                onChange={handleCommentTextChange}
                                                value={comment}
                                                required
                                            />
                                            <p>Start Index</p>
                                            <Textarea 
                                                onChange={handleStartIndexChange}
                                                value={location.startIndex}
                                                required
                                            />
                                            <p>End Index</p>
                                            <Textarea 
                                                onChange={handleEndIndexChange}
                                                value={location.endIndex}
                                            />
                                            <Button className="bg-slate-500 mt-5" onClick={addNewComment}>
                                                Add
                                            </Button>
                                        </div>
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
                                <Comments comments={comments} fetchComments={fetchComments} />
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
