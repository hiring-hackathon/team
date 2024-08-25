'use client';

import { useEffect, useState } from 'react';

interface Comment {
    id: string;
    transcriptId: string;
    text: string;
    fileUrl: string;
    timestamp: string;
}

export default function CommentSection({ transcriptId }: { transcriptId: string }) {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const fetchComments = async () => {
            const response = await fetch('/api/comments');
            const data = await response.json();
            const filteredComments = data.filter((comment: Comment) => comment.transcriptId === transcriptId);
            setComments(filteredComments);
        };

        fetchComments();
    }, [transcriptId]);

    return (
        <div>
            <h2>Comments</h2>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <strong>{new Date(comment.timestamp).toLocaleString()}</strong>: {comment.text}
                        {comment.fileUrl && <a href={comment.fileUrl} target="_blank" rel="noopener noreferrer"> (Attached File)</a>}
                    </li>
                ))}
            </ul>
        </div>
    );
}
