import TranscriptDetail from "@/components/core/transcript-detail";

export default function TranscriptPage({ params }: { params: { id: string } }) {
    return (
        <div>
            <TranscriptDetail transcriptId={params.id} />
        </div>
    );
}
