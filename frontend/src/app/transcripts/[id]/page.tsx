'use client';

import { useParams } from 'next/navigation';
import TranscriptDetail from '@/components/core2/transcript-detail';

export default function TranscriptPage() {
    const params = useParams();
    const transcriptId = Array.isArray(params.id) ? params.id[0] : params.id;

    return (
        <div className='page-container min-h-screen items-center'>
            <TranscriptDetail transcriptId={transcriptId} />
        </div>
    );
}
