import React, { useState, useEffect } from 'react';

interface Comment {
  id: string;
  text: string;
  // Add other properties as needed
}

interface CommentsProps {
  transcriptId: string;
}

export default function Comments({ transcriptId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/comments?transcriptId=${transcriptId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        setComments(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching comments:', err);
        setError('Failed to fetch comments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [transcriptId]);

  if (loading) {
    return <div>Loading comments...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h1 className='text-yellow-400'>Comments</h1>
      <div className="mb-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className='mb-4'>
              <p className='text-white'>
                <div>
                  {/* Render comment details here */}
                  {comment.text}
                </div>
              </p>
            </div>
          ))
        ) : (
          <p className="text-white">No comments yet.</p>
        )}
      </div>
      {/* Add your comment form or other components here */}
    </div>
  );
}
