'use client';

import { useParams } from 'next/navigation';
import TranscriptDetail from '@/components/core/transcript-detail';

export default function TranscriptPage() {
    const params = useParams();
    const transcriptId = Array.isArray(params.id) ? params.id[0] : params.id;

    return (
        <div>
            <TranscriptDetail transcriptId={transcriptId} />
        </div>
    );
}
