'use client';

import { useEffect, useState } from 'react';
import Comments from './Comments'

interface Transcript {
    id: string;
    text: string;
    timestamp: string;
}

export default function TranscriptDetail({ transcriptId }: { transcriptId: string }) {
    const [transcript, setTranscript] = useState<Transcript | null>(null);

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

    return (
     
    <div className='flex   p-6 bg-gray-900 rounded-lg shadow-lg mx-auto mb-9'>
    <div className='p-5 text-white'>
    
        <div className='h-1 bg-yellow-600 w-24 mx-auto mb-4'>
            Transcript Detail
        </div>

        <p className='text-gray-200 '>
        {new Date(transcript.timestamp).toLocaleString()}
        </p>

        <p>
        {transcript.text}
        </p>
        <Comments transcriptId={transcriptId} />
    </div>
    </div>

    );
}