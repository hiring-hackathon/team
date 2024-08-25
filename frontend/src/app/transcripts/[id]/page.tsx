'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Sidebar from '@/components/core/Sidebar';
import TranscriptDetail from '@/components/core/transcript-detail';
import TranscriptInfo from '@/components/core/Transcript-info';

interface Transcript {
    id: string;
    text: string;
    timestamp: string;
}

export default function TranscriptPage() {
    const params = useParams();
    const transcriptId = Array.isArray(params.id) ? params.id[0] : params.id;

    return (
        <div className="min-h-screen flex">
            <Sidebar />
            <div className='flex-grow p-6 bg-gray-900 rounded-lg mx-auto ml-60'>
                <div className='page-container items-center'>
                    <TranscriptDetail transcriptId={transcriptId} />
                    <TranscriptInfo transcriptId={transcriptId} />
                </div>
            </div>
        </div>
    );
}
