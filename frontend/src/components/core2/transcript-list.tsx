'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card } from "@/components/ui/card";


// Transcript interface
interface Transcript {
    TranscriptText: string;
    TranscriptId: string;
}

export default function TranscriptList() {
    const [transcripts, setTranscripts] = useState<Transcript[]>([]);

    useEffect(() => {
        fetchTranscripts();
    }, []);

    // fetch transcripts from API
    const fetchTranscripts = async () => {
        try {
            const response = await fetch('https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test/transcriptions');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            // Parse the JSON string in the 'body' property
            const parsedData = JSON.parse(data.body);
            setTranscripts(parsedData);
        } catch (error) {
            console.error('Error fetching transcripts:', error);
        }
    };

    return (
        <div>
            {transcripts.map((transcript) => (
                <Card key={transcript.TranscriptId} className="mb-4 p-4">
                    <Link href={`/transcripts/${transcript.TranscriptId}`}>
                        <h3 className="font-bold mb-2">Transcript ID: {transcript.TranscriptId}</h3>
                        <p>{transcript.TranscriptText.slice(0, 150)}...</p>
                    </Link>
                </Card>
            ))}
        </div>
    );
}