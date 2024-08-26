'use client';

import { useParams } from 'next/navigation';
import TranscriptDetail from '@/components/core2/transcript-detail';
import Footer from '@/components/layout/footer';

export default function TranscriptPage() {
    const params = useParams();
    const transcriptId = Array.isArray(params.id) ? params.id[0] : params.id;

    return (
        <div className='flex flex-col min-h-screen'>
            <main className='flex-grow page-container items-center'>
                <TranscriptDetail transcriptId={transcriptId} />
            </main>
            <Footer />
        </div>
    );
}
