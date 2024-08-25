

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Transcript interface
interface Transcript {
    id: string;
    text: string;
    timestamp: string;
}

export default function TranscriptList() {
    const [transcripts, setTranscripts] = useState<Transcript[]>([]);
    const [summary, setSummary] = useState<string>('');

    useEffect(() => {
        fetchTranscripts();
    }, []);

    // fetch transcripts from API
    const fetchTranscripts = async () => {
        const response = await fetch('/api/transcripts');
        const data = await response.json();
        setTranscripts(data);
    };

    // generate summary from transcripts
    const handleGenerateSummary = async () => {
        try {
            // First, ensure we have the latest transcripts
            await fetchTranscripts();

            // Prepare the transcript data in a readable format
            const transcriptTexts = transcripts.map(t => `${new Date(t.timestamp).toLocaleString()}: ${t.text}`).join('\n\n');

            // Send the formatted transcripts to the summarize API
            const response = await fetch('/api/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ transcripts: transcriptTexts }),
            });
            const data = await response.json();
            if (data.summary) {
                setSummary(data.summary);
            } else {
                console.error('No summary received from API');
                setSummary('Failed to generate summary. Please try again.');
            }
        } catch (error) {
            console.error('Error generating summary:', error);
            setSummary('An error occurred while generating the summary.');
        }
    }

    return (
        <div>
            <ul>
                {transcripts.map((transcript) => (
                    <li key={transcript.id}>
                        <Link href={`/transcripts/${transcript.id}`}>
                            <p>
                                <strong>{new Date(transcript.timestamp).toLocaleString()}</strong> - {transcript.text.slice(0, 50)}...
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
            <Button onClick={handleGenerateSummary} className="mt-4">Generate Summary</Button>
            {summary && (
                <Card className="p-4 mt-4">
                    <h2>Summary</h2>
                    <p>{summary}</p>
                </Card>
            )}
        </div>
    );
}

