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
    const [comments, setComments] = useState<Comment[]>([{
        id: "1",
        transcriptId: "transcript1",
        text: "This is the first comment. It provides some feedback on the transcript.",
        file: "https://example.com/file1.pdf",
        timeStamp: "2024-08-23T14:30:00Z"
    },
    {
        id: "2",
        transcriptId: "transcript1",
        text: "This comment highlights an interesting point made in the transcript.",
        file: "https://example.com/file2.jpg",
        timeStamp: "2024-08-23T15:00:00Z"
    },
    {
        id: "3",
        transcriptId: "transcript1",
        text: "Here is a comment with additional context that may be useful for understanding.",
        file: "https://example.com/file3.docx",
        timeStamp: "2024-08-23T15:30:00Z"
    },
    {
        id: "4",
        transcriptId: "transcript1",
        text: "This comment provides a suggestion for improving the transcript.",
        file: "",
        timeStamp: "2024-08-23T16:00:00Z"
    },
    {
        id: "5",
        transcriptId: "transcript1",
        text: "Final thoughts and observations on the transcript are provided in this comment.",
        file: "",
        timeStamp: "2024-08-23T16:30:00Z"
    }]);
    
    const [comment, setComment] = useState<string>('');
    const [location, setLocation] = useState({ startIndex: 0, endIndex: 10 }); // Default location, update as needed
    const [addComment, setAddComment] = useState(false);

    const handleCommentTextChange = (event: any) => setComment(event.target.value);
    const handleStartIndexChange = (event: any) => setLocation(prev => ({ ...prev, startIndex: parseInt(event.target.value, 10) }));
    const handleEndIndexChange = (event: any) => setLocation(prev => ({ ...prev, endIndex: parseInt(event.target.value, 10) }));

    const fetchTranscript = () => {
        fetch(`https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test/transcriptions/${transcriptId}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.transcript) {
                    setTranscript({
                        id: data.transcript.TranscriptId,
                        text: data.transcript.TranscriptText,
                        timestamp: new Date().toISOString() // Update if timestamp is available in the response
                    });
                } else {
                    console.error('No transcript data found');
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const fetchComments = () => {
        fetch(`https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test/transcriptions/${transcriptId}/comments`)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched comments:', data);
                if (Array.isArray(data)) {
                    const fetchedComments: Comment[] = data.map((item: any) => ({
                        id: item.CommentId,
                        transcriptId: item.TranscriptId,
                        text: item.CommentText,
                        file: '',  // Replace with actual file data if available
                        timeStamp: item.CreatedAt // Assuming CreatedAt is the timestamp
                    }));
                    setComments(fetchedComments);
                } else {
                    console.error('No comment data found');
                }
            })
            .catch(error => console.error('Error fetching comments:', error));
    };

    const addNewComment = (event: any) => {
        event.preventDefault();

        fetch(`https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test/transcriptions/${transcriptId}/createComment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment,
                location
            })
        })
        .then(response => response.json())
        .then(() => {
            console.log('Comment created');
            fetchComments(); // Refetch comments after adding a new one
        })
        .catch(error => console.error('Error creating comment:', error));
    };

    useEffect(() => {
        fetchTranscript();
        fetchComments(); // Fetch comments initially
    }, [transcriptId]);

    return (
        <div>
            <Sidebar />
            <div className='p-5 text-white mb-10'>
                <div className='flex justify-between'>
                    <div>
                        <p className='text-yellow-400'>Transcript - {transcript?.id} </p>
                    </div>
                    <div>
                        <Dialog>
                            <DialogTrigger className="bg-white text-gray-600 p-2 rounded-lg" onClick={() => setAddComment(true)}>Add Comment</DialogTrigger>
                            {addComment && (
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
                                                    required
                                                />
                                                <p>End Index</p>
                                                <Textarea 
                                                    onChange={handleEndIndexChange}
                                                />
                                                <Button className="bg-slate-500 mt-5" onClick={addNewComment}>
                                                    Add
                                                </Button>
                                            </div>
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            )}
                        </Dialog>
                    </div>
                </div>
                <div className='text-xl font-semibold mb-2'>
                    {transcript ? (
                        <>
                            <p className='text-white mt-10'>
                                <div className='flex justify-between'>
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
                                <Comments comments={comments} />
                            </div>
                        </>
                    ) : (
                        'Loading...'
                    )}
                </div>
            </div>
        </div>
    );
}
