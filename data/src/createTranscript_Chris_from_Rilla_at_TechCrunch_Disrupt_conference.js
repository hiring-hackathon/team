import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `Chris: Hello, everyone! I'm Chris, Co-founder and CTO of Rilla Voice. Welcome to our workshop on 'Leveraging AI in Field Sales' here at the TechCrunch Disrupt conference. As one of the founding members, I'm excited to dive deep into how our technology can transform your sales performance.\n\nParticipant: Hi Chris, great workshop. Can you tell us more about your journey as a co-founder?\n\nChris: Certainly! As a co-founder, my journey with Rilla has been exciting from the start. I began coding in college, initially planning to study biomedical engineering but switching to computer science after my first programming course. After a brief stint in the corporate world, I co-founded Rilla Voice in late 2019 with my partners.\n\nParticipant: Interesting background. How has the company grown since you co-founded it?\n\nChris: We've seen rapid growth. As co-founders, we're proud that the company reached over $10 million in annual recurring revenue by January 2024, with a goal to hit $100 million ARR by January 2025. We're building conversation intelligence tools for field sales, using AI to analyze sales conversations and provide feedback.\n\nParticipant: Sounds promising. How exactly does your system work with field sales?\n\nChris: Great question. Our reps use a mobile app to record conversations during customer visits or service calls. The audio is then analyzed by our AI system, providing detailed feedback and analytics. This allows sales managers to review performances and provide targeted coaching, even if they can't be physically present for every meeting.\n\nParticipant: What kind of results have you seen?\n\nChris: We've had fantastic outcomes. One client saw their team's average conversion rate jump from 44% to 55% after implementing our system. Another reported a $350,000 increase in revenue per rep per year. As co-founders, seeing these results is incredibly rewarding.\n\nParticipant: Those are impressive numbers. How can we try this out?\n\nChris: I'd be happy to set up a pilot program for your team. We could implement our system with a small group of your reps and track their progress over 30 days. As a co-founder, I'd be glad to personally oversee the implementation and present our findings. Shall we discuss this further after the workshop?`;

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