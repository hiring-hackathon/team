
import TranscriptList from "@/components/core2/transcript-list";
import Navbar from "@/components/layout/nav";
export default function Page() {
    return (
        <main className="page-container min-h-screen items-center justify-center">
             <div style={{ marginBottom: '60px', width: "60vw", alignSelf: "center" }}>
                <Navbar />
            </div>
            <h1 className="text-3xl font-bold">Transcripts</h1>
            <TranscriptList />
        </main>
    );
}