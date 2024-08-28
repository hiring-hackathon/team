import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `Chris: Hello there! I'm Chris, co-founder of Rilla Voice. Thanks for agreeing to meet with me here at your office. I understand you're looking to improve your field sales team's performance?\n\nCustomer: Yes, that's right. We've been struggling to consistently meet our targets.\n\nChris: I see. At Rilla, we've developed conversation intelligence tools specifically for field sales. We use AI to analyze sales conversations and provide feedback. Can you tell me a bit about your current sales process?\n\nCustomer: Well, our reps usually make initial contact by phone, then set up in-person meetings to close deals. We're finding it hard to identify why some reps are more successful than others.\n\nChris: That's a common challenge. Our system can help by providing insights into what top performers are doing differently. For example, we might find that successful reps spend more time addressing specific customer pain points or use certain key phrases more often.\n\nCustomer: That sounds useful. But how does it work with in-person meetings?\n\nChris: Great question. Our reps use a mobile app to record their conversations during these meetings. The audio is then analyzed by our AI system, which provides detailed feedback and analytics. This allows sales managers to review performances and provide targeted coaching, even if they can't be physically present for every meeting.\n\nCustomer: Interesting. What kind of results have you seen?\n\nChris: We've had some fantastic outcomes. For instance, one of our clients saw their team's average conversion rate jump from 44% to 55% after implementing our system. Another reported a $350,000 increase in revenue per rep per year.\n\nCustomer: Those are impressive numbers. How long does it typically take to see results?\n\nChris: It varies, but many of our clients start seeing improvements within the first month. The key is using the insights to guide your coaching and training efforts. Would you be interested in a pilot program? We could set up a small group of your reps with our system and track their progress over 30 days.\n\nCustomer: That sounds like a good way to test it out. What would that involve on our end?\n\nChris: Minimal effort, actually. We'd provide the app and train your reps on how to use it. Then we'd work with your sales managers to interpret the data and develop coaching strategies. At the end of the 30 days, we'd present our findings and discuss next steps. How does that sound?\n\nCustomer: It sounds promising. Let's do it.`;

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