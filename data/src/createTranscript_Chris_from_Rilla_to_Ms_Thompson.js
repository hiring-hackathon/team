import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `Chris: Good morning, Ms. Thompson. I'm Chris, Co-founder and CTO of Rilla Voice. Thank you for allowing me to join your sales team meeting today at your headquarters.\n\nMs. Thompson: Welcome, Chris. We're interested in improving our field sales performance. How can Rilla help?\n\nChris: Absolutely. At Rilla, we've developed conversation intelligence tools specifically for outside sales teams. Our system uses AI to analyze the face-to-face conversations your reps have with customers, providing actionable feedback to improve their performance.\n\nMs. Thompson: Interesting. How does this work in practice for our reps in the field?\n\nChris: Great question. Your reps would use our mobile app to record their conversations during customer visits. Our AI then analyzes these recordings, providing insights on things like key topics discussed, sentiment analysis, and even specific sales techniques used.\n\nMs. Thompson: That sounds complex. Is it difficult for the reps to use?\n\nChris: Not at all. We've designed it to be very user-friendly. The app runs in the background during their sales visits, and all the complex analysis happens on our end. Your reps and managers can then access the insights through an easy-to-use dashboard.\n\nMs. Thompson: What kind of results have other companies seen with this?\n\nChris: We've had some fantastic outcomes. One client saw their team's average conversion rate jump from 44% to 55% after implementing our system. Another reported a $350,000 increase in revenue per rep per year.\n\nMs. Thompson: Those are impressive numbers. How long does it typically take to see results?\n\nChris: Many of our clients start seeing improvements within the first month. The key is using the insights to guide your coaching and training efforts. Would you be interested in setting up a pilot program? We could equip a group of your reps with our system and track their progress over 30 days.\n\nMs. Thompson: That sounds like a good way to test it out. What would that involve on our end?\n\nChris: Minimal effort, actually. We'd provide the app and train your reps on how to use it. Then we'd work with your sales managers to interpret the data and develop coaching strategies. At the end of the 30 days, I'd personally come back to present our findings and discuss next steps.\n\nMs. Thompson: Alright, let's give it a try. Can you send over the details for the pilot program?\n\nChris: Absolutely, Ms. Thompson. I'll have that sent over today. Thank you for your time, and I'm excited to help your field sales team reach new heights of performance.`;

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