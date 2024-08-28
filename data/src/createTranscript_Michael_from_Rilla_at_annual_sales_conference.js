import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `Michael: Hi there! I'm Michael, Chief AI Officer at Rilla. Thank you for inviting me to your annual sales conference. I'm excited to share how AI can transform your outside sales operations.\n\nHost: Welcome, Michael. Our team is eager to learn about new technologies that can give us an edge. Can you start by explaining what Rilla does?\n\nMichael: Certainly! Rilla provides speech analytics for outside sales, analyzing conversations to help sales reps sell more effectively. We use AI to analyze recordings of sales interactions, providing insights that can dramatically improve performance.\n\nHost: That sounds intriguing. How did you develop this technology?\n\nMichael: It's an interesting story, actually. I originally studied electrical engineering, but became fascinated with AI after watching the TV show Westworld. I taught myself Python and machine learning concepts, and eventually created a music recommendation system that analyzed the actual content of songs.\n\nHost: That's quite a journey! How did that lead to sales analytics?\n\nMichael: When we started Rilla, we spent two years solving the challenging problem of speaker diarization - determining who is speaking and when in an audio recording. This was crucial for accurately analyzing sales conversations. Now, we can provide detailed breakdowns of sales interactions, including talk ratios, key topics discussed, and even emotional sentiment.\n\nHost: Impressive. How does this translate to real-world sales improvements?\n\nMichael: Great question. Let me give you a concrete example. One of our clients in the roofing industry discovered that their top performers were spending 80% of their conversations focusing on specific pain points like missing shingles. This insight allowed them to train other reps to use similar techniques, resulting in a significant increase in appointments booked.\n\nHost: That's the kind of actionable insight we're looking for. How difficult is it to implement your system?\n\nMichael: It's quite straightforward. We provide a mobile app for your reps to record their conversations. Our AI then analyzes these recordings and provides insights through a dashboard. We also offer training to help your team make the most of the data. Would you be interested in a pilot program to see how it works with your team?\n\nHost: Absolutely. That sounds like a great way to test it out. What would be the next steps?\n\nMichael: Excellent! I'll set up a meeting with our implementation team for next week. We'll go over the details of the pilot program, including how we'll measure success. In the meantime, I'd be happy to answer any more questions you or your team might have. Shall we open it up to the audience?`;

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