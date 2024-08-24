'use clent'
import React, { useState, useEffect } from 'react'

interface Comment {
    id: string;
    transcriptId: string;
    text: string;
    file: string;
    timeStamp: string;
}


export default function Comments({transcriptId}: {transcriptId: string}) {
    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        const getComments = async () => {
            const response = await fetch('/api/get-Comments');
            const data = await response.json();
            const filteredComments = data.filter((comment: Comment) => comment.transcriptId === transcriptId);
            setComments(filteredComments);
        };

        getComments();
    }, [transcriptId]);

    return (
        <div>
            <h2>Comments</h2>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        <strong>{new Date(comment.timeStamp).toLocaleString()}</strong>: {comment.text}
                        {comment.file && <a href={comment.file} target="_blank" rel="noopener noreferrer"> (Attached File)</a>}
                    </li>
                ))}
            </ul>
        </div>
    );
}
