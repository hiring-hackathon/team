
import TranscriptList from "@/components/core/transcript-list";
export default function Page() {
    return (
        <main className="page-container min-h-screen items-center justify-center">
            <h1 className="text-3xl font-bold">Transcripts</h1>
            <TranscriptList />
        </main>
    );
}