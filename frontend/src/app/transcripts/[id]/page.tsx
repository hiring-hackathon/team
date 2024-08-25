'use client';

import { useParams } from 'next/navigation';
import TranscriptDetail from '@/components/core/transcript-detail';

export default function TranscriptPage() {
    const params = useParams();
    const transcriptId = Array.isArray(params.id) ? params.id[0] : params.id;

    return (
        <div className='page-container min-h-screen items-center'>
            <TranscriptDetail transcriptId={transcriptId} />
        </div>
    );
}

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/core/Sidebar';
import TranscriptPage  from '@/components/core/Transcript-info';
import { useParams } from 'next/navigation';

interface Transcript {
    id: string;
    text: string;
    timestamp: string;
}

export default function UniqueTranscript() {

    const params = useParams();
    const transcriptId = Array.isArray(params.id) ? params.id[0] : params.id;
    
    return (
       
        <div className="min-h-screen flex">
        <Sidebar />
        <div className='flex-grow p-6 bg-gray-900 rounded-lg mx-auto ml-60'>
            <TranscriptPage transcriptId={transcriptId} />
        </div>
    </div>
    );
};

