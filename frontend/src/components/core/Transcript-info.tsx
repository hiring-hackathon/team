'use client';

import { useEffect, useState } from 'react';
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


interface props {
    transcriptId: string; // transc
}

export default function TranscriptPage ({ transcriptId }: props) {
    const [transcript, setTranscript] = useState<Transcript | null>(null);
    const [comment, setComment] = useState<string>('');
    const [addComment, setAddComment] = useState(false)
    
    // fetching the transcript with the current id
    useEffect(() => {
        // Fetch data from the API Gateway endpoint
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
    }, [transcriptId]);


    

    const addNewComment = () => {
        // Implement your function to add a new comment
        console.log('Adding new comment:', comment);

        setAddComment(false)
    };

    return (
        <div >
            <Sidebar />
            <div className='p-5 text-white mb-10'>
                <div className='flex justify-between '>
                    <div>
                           <p className='text-yellow-400'>Transcript - {transcript?.id} </p>
                    </div>
                    <div>
                    <div>
                    
                      
                    
                    <Dialog>
                    <DialogTrigger className="bg-white text-gray-600 p-2 rounded-lg" onClick={() => setAddComment(true)}>Add Comment</DialogTrigger>
                    {addComment && (
                        <>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-yellow-700">Add a New Comment</DialogTitle>
                            <DialogDescription>
                                <div>
                                    <Textarea 
                                        onChange={(e) => setComment(e.target.value)}
                                        value={comment}
                                    />
                                    
                        
                                    <Button className="bg-slate-500 mt-5" onClick={addNewComment} >
                                        Add
                                    </Button>
                                </div>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                    </>)}
                </Dialog>
                
                </div>
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
                            <Comments transcriptId={transcript.id} />
                        </div>
                    </>
                ) : (
                    'Loading...'
                )}
            </div>
            </div>
        </div>
    );
};

