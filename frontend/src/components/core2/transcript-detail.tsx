'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Transcript {
    TranscriptText: string;
    TranscriptId: string;
}

interface Comment {
    CommentId: string;
    CommentText: string;
    Location: {
        startIndex: number;
        endIndex: number;
    };
}

export default function TranscriptDetail({ transcriptId }: { transcriptId: string }) {
    const [transcript, setTranscript] = useState<Transcript | null>(null);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [summary, setSummary] = useState<string>('');
    const [newComment, setNewComment] = useState('');
    const [startIndex, setStartIndex] = useState<number>(0);
    const [endIndex, setEndIndex] = useState<number>(0);

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

    const fetchComments = useCallback(async () => {
        try {
            const response = await fetch(`https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test/transcriptions/${transcriptId}/getAllComments`);
            if (!response.ok) {
                throw new Error('Failed to fetch comments');
            }
            const data = await response.json();
            setComments(data.comments || []);
        } catch (err) {
            console.error('Error fetching comments:', err);
        }
    }, [transcriptId]);

    useEffect(() => {
        fetchTranscript();
        fetchComments();
    }, [fetchTranscript, fetchComments]);

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

    const handleCreateComment = async () => {
        try {
            const response = await fetch(`https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test/transcriptions/${transcriptId}/createComment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    CommentText: newComment,
                    Location: {
                        startIndex,
                        endIndex
                    }
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to create comment');
            }
            const data = await response.json();
            console.log('Comment created:', data);
            setNewComment('');
            setStartIndex(0);
            setEndIndex(0);
            fetchComments();  // Refresh comments after creating a new one
        } catch (err) {
            console.error('Error creating comment:', err);
        }
    }

    const handleStartIndexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setStartIndex(value === '' ? 0 : parseInt(value, 10));
    };

    const handleEndIndexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEndIndex(value === '' ? 0 : parseInt(value, 10));
    };

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
            <Tabs defaultValue="details">
                <TabsList>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="comments">Comments</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                    <Card className="p-6 mb-6">
                        <p className="text-sm text-muted-foreground mb-2">
                            <strong>Transcript ID:</strong> {transcript.TranscriptId}
                        </p>
                        <div className="whitespace-pre-wrap">
                            {transcript.TranscriptText}
                        </div>
                    </Card>
                    <Button onClick={handleGenerateSummary} className="mt-4">Generate Summary</Button>
                    {summary && (
                        <Card className="p-4 mt-4">
                            <h2 className="text-xl font-semibold mb-2">Summary</h2>
                            <p>{summary}</p>
                        </Card>
                    )}
                </TabsContent>
                <TabsContent value="comments">
                    <div>
                        <Card className="p-6 mb-6">
                            <h2 className="text-xl font-semibold mb-4">Add Comment</h2>
                            <Textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Enter your comment"
                                className="mb-2"
                            />
                            <Input
                                type="number"
                                value={startIndex === 0 ? '' : startIndex.toString()}
                                onChange={handleStartIndexChange}
                                placeholder="Start Index"
                                className="mb-2"
                            />
                            <Input
                                type="number"
                                value={endIndex === 0 ? '' : endIndex.toString()}
                                onChange={handleEndIndexChange}
                                placeholder="End Index"
                                className="mb-2"
                            />
                            <Button onClick={handleCreateComment}>Add Comment</Button>
                        </Card>
                    </div>
                    <h2 className="text-xl font-semibold mb-4">Comments</h2>
                    {comments.map((comment) => (
                        <Card key={comment.CommentId} className="p-4 mb-4">
                            <p>{comment.CommentText}</p>
                            <p className="text-sm text-gray-600 mt-2">
                                Location: {comment.Location.startIndex} - {comment.Location.endIndex}
                            </p>
                        </Card>
                    ))}
                </TabsContent>
            </Tabs>
        </div>
    );
}