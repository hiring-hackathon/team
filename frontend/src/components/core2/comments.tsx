'use client';

import { useEffect, useState } from 'react';

interface Comment {
    CommentId: string;
    TranscriptId: string;
    CommentText: string;
    FileUrl: string;
    Timestamp: string;
}

export default function CommentSection({ transcriptId }: { transcriptId: string }) {
    const [comments, setComments] = useState<Comment[]>([]);

    console.log(transcriptId)
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test/transcriptions/${transcriptId}/getAllComments`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setComments(data.comments || []);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [transcriptId]);

    return (
        <div>
            <h2>Comments</h2>
            {comments.length === 0 ? (
                <p>No comments yet.</p>
            ) : (
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.CommentId}>
                            <strong>{new Date(comment.Timestamp).toLocaleString()}</strong>: {comment.CommentText}
                            {comment.FileUrl && (
                                <a href={comment.FileUrl} target="_blank" rel="noopener noreferrer"> (Attached File)</a>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}