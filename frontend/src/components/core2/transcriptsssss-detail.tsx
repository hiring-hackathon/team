'use client';

import { useEffect, useState, useCallback } from 'react';
import CommentSection from './comments';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Transcript {
    TranscriptText: string;
    TranscriptId: string;
}

export default function TranscriptDetail({ transcriptId }: { transcriptId: string }) {
    const [transcript, setTranscript] = useState<Transcript | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [summary, setSummary] = useState<string>('');

    const fetchTranscript = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test/transcriptions/${transcriptId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch transcript');
            }
            const data = await response.json();
            setTranscript(data.transcript);
        } catch (err) {
            setError('Error fetching transcript. Please try again later.');
            console.error('Error fetching transcript:', err);
        } finally {
            setLoading(false);
        }
    }, [transcriptId]);

    useEffect(() => {
        fetchTranscript();
    }, [fetchTranscript]);

    const handleGenerateSummary = async () => {
        if (!transcript) return;

        try {
            const response = await fetch('/api/summarize', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ transcripts: transcript.TranscriptText }),
            });
            const data = await response.json();
            if (data.summary) {
                setSummary(data.summary);
            } else {
                console.error('No summary received from API');
                setSummary('Failed to generate summary. Please try again.');
            }
        } catch (error) {
            console.error('Error generating summary:', error);
            setSummary('An error occurred while generating the summary.');
        }
    }

    if (loading) {
        return <div>Loading transcript...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!transcript) {
        return <div>No transcript found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Transcript Detail</h1>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <p className="text-sm text-gray-600 mb-2">
                    <strong>Transcript ID:</strong> {transcript.TranscriptId}
                </p>
                <div className="whitespace-pre-wrap">
                    {transcript.TranscriptText}
                </div>
            </div>
            <Button onClick={handleGenerateSummary} className="mt-4">Generate Summary</Button>
            {summary && (
                <Card className="p-4 mt-4">
                    <h2 className="text-xl font-semibold mb-2">Summary</h2>
                    <p>{summary}</p>
                </Card>
            )}
            <CommentSection transcriptId={transcriptId} />
        </div>
    );
}

// 'use client';

// import { useEffect, useState } from 'react';
// import CommentSection from './comments';
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";

// interface Transcript {
//     TranscriptText: string;
//     TranscriptId: string;
// }

// export default function TranscriptDetail({ transcriptId }: { transcriptId: string }) {
//     const [transcript, setTranscript] = useState<Transcript | null>(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [summary, setSummary] = useState<string>('');

//     useEffect(() => {
//         fetchTranscript();
//     }, [transcriptId]);

//     const fetchTranscript = async () => {
//         try {
//             setLoading(true);
//             const response = await fetch(`https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test/transcriptions/${transcriptId}`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch transcript');
//             }
//             const data = await response.json();
//             setTranscript(data.transcript);
//         } catch (err) {
//             setError('Error fetching transcript. Please try again later.');
//             console.error('Error fetching transcript:', err);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleGenerateSummary = async () => {
//         if (!transcript) return;

//         try {
//             // Prepare the transcript data in a readable format
//             const transcriptText = transcript.TranscriptText;

//             // Send the transcript to the summarize API
//             const response = await fetch('/api/summarize', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ transcripts: transcriptText }),
//             });
//             const data = await response.json();
//             if (data.summary) {
//                 setSummary(data.summary);
//             } else {
//                 console.error('No summary received from API');
//                 setSummary('Failed to generate summary. Please try again.');
//             }
//         } catch (error) {
//             console.error('Error generating summary:', error);
//             setSummary('An error occurred while generating the summary.');
//         }
//     }

//     if (loading) {
//         return <div>Loading transcript...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     if (!transcript) {
//         return <div>No transcript found.</div>;
//     }

//     return (
//         <div className="max-w-4xl mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">Transcript Detail</h1>
//             <div className="bg-white shadow-md rounded-lg p-6 mb-6">
//                 <p className="text-sm text-gray-600 mb-2">
//                     <strong>Transcript ID:</strong> {transcript.TranscriptId}
//                 </p>
//                 <div className="whitespace-pre-wrap">
//                     {transcript.TranscriptText}
//                 </div>
//             </div>
//             <Button onClick={handleGenerateSummary} className="mt-4">Generate Summary</Button>
//             {summary && (
//                 <Card className="p-4 mt-4">
//                     <h2 className="text-xl font-semibold mb-2">Summary</h2>
//                     <p>{summary}</p>
//                 </Card>
//             )}
//             <CommentSection transcriptId={transcriptId} />
//         </div>
//     );
// }


// 'use client';

// import { useEffect, useState } from 'react';
// import CommentSection from './comments';

// interface Transcript {
//     TranscriptText: string;
//     TranscriptId: string;
// }

// export default function TranscriptDetail({ transcriptId }: { transcriptId: string }) {
//     const [transcript, setTranscript] = useState<Transcript | null>(null);

//     useEffect(() => {
//         const fetchTranscript = async () => {
//             try {
//                 const response = await fetch(`https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test/transcriptions/${transcriptId}`);
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 const data = await response.json();
//                 setTranscript(data.transcript);
//             } catch (error) {
//                 console.error('Error fetching transcript:', error);
//             }
//         };

//         fetchTranscript();
//     }, [transcriptId]);

//     if (!transcript) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div>
//             <h1>Transcript Detail</h1>
//             <p>
//                 <strong>Transcript ID: {transcript.TranscriptId}</strong>
//             </p>
//             <p style={{ whiteSpace: 'pre-wrap' }}>{transcript.TranscriptText}</p>
//             <CommentSection transcriptId={transcriptId} />
//         </div>
//     );
// }