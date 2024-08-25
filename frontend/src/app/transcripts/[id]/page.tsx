'use client';

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
        <div className='flex p-6 bg-gray-900 rounded-lg mx-auto  ml-60 h-screen'>
            <Sidebar />
            <TranscriptPage transcriptId={transcriptId} />
        </div>
    );
};

