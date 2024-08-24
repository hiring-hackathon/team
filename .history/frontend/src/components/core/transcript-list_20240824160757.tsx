'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface Transcript {
    id: string;
    text: string;
    timestamp: string;
}

export default function TranscriptList() {
    const [transcripts, setTranscripts] = useState<Transcript[]>([]);

    useEffect(() => {
        const fetchTranscripts = async () => {
            const response = await fetch('/api/transcripts');
            const data = await response.json();
            setTranscripts(data);
        };

        fetchTranscripts();
    }, []);

    return (
        <div>
            {/* <h1>Transcript List</h1> */}
            <ul>
                {transcripts.map((transcript) => (
                    <li key={transcript.id}>
                        <Link href={`/transcript/${transcript.id}`}>
                            <p>
                                <strong>{new Date(transcript.timestamp).toLocaleString()}</strong> - {transcript.text.slice(0, 50)}...
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
