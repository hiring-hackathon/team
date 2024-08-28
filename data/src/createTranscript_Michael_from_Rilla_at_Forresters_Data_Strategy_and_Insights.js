import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `Michael: Hi there! I'm Michael, Co-Founder and Chief Data Scientist at Rilla. Thanks for having me at Forrester's Data Strategy & Insights. I'm excited to share how our AI can transform your outside sales operations.\n\nHost: Welcome, Michael. Our team is eager to learn about new technologies that can give us an edge. Can you start by explaining your background and what Rilla does?\n\nMichael: Of course! I actually got into AI somewhat unexpectedly. I was originally studying electrical engineering in college but was struggling academically. After watching the TV show Westworld, I became fascinated with AI and started teaching himself Python and machine learning concepts through online resources.\n\nHost: That's quite a journey! How did that lead to Rilla?\n\nMichael: As a senior in college, I created a music recommendation system that used AI to analyze the actual content of songs, rather than just collaborative filtering. I entered this project into competitions and hackathons, which led to some exciting opportunities. At one event, I ended up presenting to high-profile judges like Jack Selby, PayPal co-founder, and even got connected with Apple Music executives.\n\nWhen we started Rilla, I spent two years solving the challenging problem of speaker diarization - determining who is speaking and when in an audio recording. This was crucial for accurately analyzing sales conversations. Now, at Rilla, we provide speech analytics for outside sales, analyzing conversations to help sales reps sell more effectively.\n\nHost: Impressive. How does this translate to real-world sales improvements?\n\nMichael: Great question. Let me give you a concrete example. One of our clients in the roofing industry discovered that their top performers were spending 80% of their conversations focusing on specific pain points like missing shingles. This insight allowed them to train other reps to use similar techniques, resulting in a significant increase in appointments booked.\n\nOur system captures audio from sales conversations during customer visits or service calls. These recordings are then transcribed and analyzed by our AI, extracting valuable insights and generating concise summaries of each sales encounter. Sales managers can review these transcripts, recordings, and summaries at their convenience, adding comments and creating highlights to use in coaching sessions.\n\nHost: That sounds powerful. How difficult is it to implement your system?\n\nMichael: It's quite straightforward. We provide a mobile app for your reps to record their conversations. Our AI then analyzes these recordings and provides insights through a dashboard. We also offer training to help your team make the most of the data. One of the key benefits is that it facilitates remote coaching. Sales managers can provide detailed feedback and guidance to their reps based on the transcripts and analysis, without the need to be physically present during sales calls.\n\nHost: This could be a game-changer for our team. What would be the next steps to try this out?\n\nMichael: I'd be happy to set up a pilot program for your team. We could start with a small group of reps, implement our system, and track their progress over a month or two. I could then come back and present the results, showing you exactly how it's impacted their performance. How does that sound?`;

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