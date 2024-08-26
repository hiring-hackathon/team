import TranscriptList from "@/components/core2/transcript-list";
import Navbar from "@/components/layout/nav";
import Footer from "@/components/layout/footer";

export default function Page() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow flex flex-col items-center justify-center px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Transcripts</h1>
                <div className="w-full max-w-4xl">
                    <TranscriptList />
                </div>
            </main>
            <Footer />
        </div>
    );
}
