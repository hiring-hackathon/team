import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `Michael: Good morning, everyone! I'm Michael, Co-Founder and Chief Data Scientist at Rilla. Thank you for joining our breakout session on 'AI-Driven Sales Optimization' at the International Sales Tech Expo. As one of the co-founders, I'm thrilled to share how our AI can transform your outside sales operations.\n\nAttendee: Hi Michael, fascinating session. Can you start by explaining your background and what led you to co-found Rilla?\n\nMichael: Of course! My journey to co-founding Rilla is a bit unconventional. I was studying electrical engineering but became fascinated with AI after watching Westworld. I taught myself Python and machine learning, eventually creating a music recommendation system that analyzed song content. This led to exciting opportunities, including presenting to high-profile judges and connecting with Apple Music executives.\n\nAttendee: That's quite a journey! How did that lead to co-founding Rilla?\n\nMichael: When we started Rilla, as co-founders, we spent two years solving the challenging problem of speaker diarization - determining who is speaking and when in an audio recording. This was crucial for accurately analyzing sales conversations. Now, at Rilla, we provide speech analytics for outside sales, analyzing conversations to help sales reps sell more effectively.\n\nAttendee: Impressive. How does this translate to real-world sales improvements?\n\nMichael: Great question. One of our clients in the roofing industry discovered that their top performers were spending 80% of their conversations focusing on specific pain points. This insight allowed them to train other reps to use similar techniques, resulting in a significant increase in appointments booked.\n\nAttendee: That sounds powerful. How difficult is it to implement your system?\n\nMichael: It's quite straightforward. We provide a mobile app for your reps to record conversations. Our AI then analyzes these recordings and provides insights through a dashboard. We also offer training to help your team make the most of the data. One key benefit is remote coaching - sales managers can provide detailed feedback based on the analysis, without being physically present during sales calls.\n\nAttendee: This could be a game-changer for our team. What would be the next steps to try this out?\n\nMichael: As a co-founder, I'd be happy to personally oversee a pilot program for your team. We could start with a small group of reps, implement our system, and track their progress over a month or two. I could then present the results, showing you exactly how it's impacted their performance. Would you like to discuss this further at your office next week?`;

  const postTranscript = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test/transcriptions/transcript', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcriptText }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      console.error('Error posting data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    postTranscript();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Rilla Voice: Speech Analytics for Outside Sales</h1>

      <div style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '20px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Transcript</h2>
        {transcriptText.split('\n\n').map((paragraph, index) => (
          <p key={index} style={{ marginBottom: '10px' }}>{paragraph.trim()}</p>
        ))}
      </div>

      <button 
        onClick={postTranscript} 
        disabled={loading}
        style={{
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '20px'
        }}
      >
        {loading ? 'Posting...' : 'Posting Transcript'}
      </button>

      {loading && <p>Posting transcript...</p>}

      {error && (
        <div style={{ backgroundColor: '#ffeeee', border: '1px solid #ff0000', borderRadius: '4px', padding: '20px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '10px', color: '#ff0000' }}>Error</h2>
          <p style={{ color: '#ff0000' }}>{error}</p>
        </div>
      )}

      {response && (
        <div style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '20px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Posting Transcript</h2>
          <pre style={{ whiteSpace: 'pre-wrap', overflowX: 'auto' }}>
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;