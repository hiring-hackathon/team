'use client';

import { useEffect, useState } from 'react';
import Comments from './Comments'
import { Button } from '../ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Textarea } from "@/components/ui/textarea"

  

interface Transcript {
    id: string;
    text: string;
    timestamp: string;
}

export default function TranscriptDetail({ transcriptId }: { transcriptId: string }) {
    const [transcript, setTranscript] = useState<Transcript | null>(null);
    const [addComment, setAddComment] = useState(false)
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState()

    useEffect(() => {
        const fetchTranscript = async () => {
            const response = await fetch(`/api/transcripts`);
            const data = await response.json();
            const selectedTranscript = data.find((t: Transcript) => t.id === transcriptId);
            setTranscript(selectedTranscript);
        };

        fetchTranscript();
    }, [transcriptId]);

    if (!transcript) {
        return <div>Loading...</div>;
    }

    const addNewComment = () => {
        // // Logic to add a new comment
        // const newComment = 'This is a new comment'; // Replace with actual comment logic
        // setComments([...comments, newComment]);
        // console.log('New comment added:', newComment);
      };

    return (
     
    <div className='flex   p-6 bg-gray-900 rounded-lg shadow-lg mx-auto mb-9'>
    <div className='p-5 text-white'>
    
        <div className='h-1 bg-yellow-600 w-24 mx-auto mb-4'>
            Transcript Detail
        </div>
        <div>
        <Button variant='outline' className=' bg-gray-900 text-white font-bold hover:text-yellow-400' onClick={() => setAddComment(true)}>Add Comment</Button>

        </div>


        <p className='text-gray-200 text-xs'>
        {new Date(transcript.timestamp).toLocaleString()}
        </p>

        <p className='text-start'>
        {transcript.text}
        </p>
        <div className='mt-8'>
            <Comments transcriptId={transcriptId} />
        </div>
        
    </div>

    <div className="">
        <Dialog>
        <DialogTrigger className="bg-white  p-2  rounded-lg">Add Comment</DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle className="text-yellow-700">Add a  new Comment</DialogTitle>
            <DialogDescription>
                <div>
                 
                <Textarea onChange={(e) => {setComment(e.target.value)}}/>
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

    );
}