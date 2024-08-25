'use client'

import React, { useEffect, useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Trash, Edit } from 'lucide-react'

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
    const [commentText, setNewComment] = useState('');
    const [location, setLocation] = useState({ startIndex: 0, endIndex: 10 })


    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingComment, setEditingComment] = useState<Comment | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

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
            console.log(data)
            setComments(data || []);
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
            // const response = await fetch('https://tjq0k92mt4.execute-api.us-east-2.amazonaws.com/summarize-transcript', {
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

    const handleSubmit = async () => {
        await fetch(`https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test/transcriptions/${transcriptId}/createComment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                commentText,
                location
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Comment created:', data);
                setNewComment('');
                setIsDialogOpen(false);
                fetchComments();
            })
            .catch(error => console.error('Error creating comment:', error));
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

    const deleteComment = async (id: string, commentId: string) => {
        try {
            const response = await fetch(`https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test/transcriptions/${id}/getAllComments/${commentId}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete comment');
            }
            alert('Comment deleted');
            fetchComments();
        } catch (error) {
            console.error('Error deleting comment:', error);
            alert('Failed to delete comment');
        }
    };

    const updateComment = async (id: string, commentId: string, updatedText: string) => {
        try {
            // https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test/transcriptions/${id}/getAllComments/${commentId}/edit
            const response = await fetch(`https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test/transcriptions/${id}/getAllComments/${commentId}/edit`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ CommentText: updatedText })
            });
            if (!response.ok) {
                throw new Error('Failed to update comment');
            }
            alert('Comment updated');
            setIsEditDialogOpen(false);
            fetchComments();
        } catch (error) {
            console.error('Error updating comment:', error);
            alert('Failed to update comment');
        }
    };

    const handleEditComment = (comment: Comment) => {
        setEditingComment(comment);
        setNewComment(comment.CommentText);
        setIsEditDialogOpen(true);
    };

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
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>Add Comment</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Comment</DialogTitle>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="comment" className="text-right">
                                            Comment
                                        </Label>
                                        <Textarea
                                            id="comment"
                                            value={commentText}
                                            onChange={(e) => setNewComment(e.target.value)}
                                            placeholder="Enter your comment"
                                            className="col-span-3"
                                        />
                                    </div>
                                </div>
                                <Button onClick={handleSubmit}>Add Comment</Button>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <h2 className="text-xl font-semibold mb-4">Comments</h2>
                    {comments.map((comment) => (
                        <Card key={comment.CommentId} className="p-4 mb-4 flex flex-row items-center justify-between ">
                            <p className="whitespace-pre-wrap">{comment.CommentText}</p>
                            <div>
                                <Button variant="ghost" size="icon" className="mr-2" onClick={() => handleEditComment(comment)}>
                                    <Edit size={16} />
                                </Button>
                                <Button variant="destructive" size="icon" onClick={() => deleteComment(transcriptId, comment.CommentId)}>
                                    <Trash size={16} />
                                </Button>
                            </div>
                        </Card>
                    ))}
                    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Comment</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-comment" className="text-right">
                                        Comment
                                    </Label>
                                    <Textarea
                                        id="edit-comment"
                                        value={commentText}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        placeholder="Edit your comment"
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <Button onClick={() => editingComment && updateComment(transcriptId, editingComment.CommentId, commentText)}>
                                Update Comment
                            </Button>
                        </DialogContent>
                    </Dialog>
                </TabsContent>
            </Tabs>
        </div>
    );
}

