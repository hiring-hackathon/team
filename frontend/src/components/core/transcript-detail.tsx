'use client';

import { useEffect, useState } from 'react';
import CommentSection from './comments';

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
        <div>
            <h1>Transcript Detail</h1>
            <p>
                <strong>{new Date(transcript.timestamp).toLocaleString()}</strong>
            </p>
            <p>{transcript.text}</p>
            <CommentSection transcriptId={transcriptId} />
        </div>
    );
}
