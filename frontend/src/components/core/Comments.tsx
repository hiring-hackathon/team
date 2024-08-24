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



    // gets the comments belonging to a specific transcript
    // fetch all the comments
    useEffect(() => {
        console.log('Fetching comments for transcript ID:', transcriptId);

        fetch(`https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test/transcriptions/${transcriptId}`)
            .then(response => response.json())
            .then(data => {
                console.log('fetching comments for ', data)
                if (Array.isArray(data)) {
                    const fetchedComments: Comment[] = data.map((item: any) => ({
                        id: item.CommentId,
                        transcriptId: item.TranscriptId,
                        text: item.CommentText,
                        file: '',  // Replace with actual file data if available
                        timeStamp: item.CreatedAt // Assuming CreatedAt is the timestamp
                    }));

                    setComments(fetchedComments);
                } else {
                    console.error('No comment data found');
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [transcriptId]);

    return (
        <div className='mb-5'>
            <h1 className='text-yellow-400'>Comments</h1>

            <div className=''>
            {comments.map((comment) => (
                <div key={comment.id} className='mb-4'>
                    <p className='white'>
                        <strong>{new Date(comment.timeStamp).toLocaleString()}</strong> -- {comment.text}
                    </p>
                    {comment.file && (
                        <p>
                            <a href={comment.file} target="_blank" rel="noopener noreferrer">
                                (Attached File)
                            </a>
                        </p>
                    )}
                </div>
            ))}
</div>

        </div>
    );
}
