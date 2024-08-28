import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `Chris: Hello there! I'm Chris, Co-founder and CTO of Rilla Voice. Thanks for inviting me to your sales team meeting. I understand you're looking to improve your field sales team's performance?\n\nSales Manager: Yes, that's right. We've been struggling to consistently meet our targets, especially with our newer reps.\n\nChris: I get that. At Rilla, we've developed conversation intelligence tools specifically for field sales. We use AI to analyze sales conversations and provide feedback. I actually started coding in college, not as a child like many founders. I initially planned to study biomedical engineering but switched to computer science after taking my first programming course as a sophomore. I found I loved being able to solve problems with just a laptop.\n\nSales Manager: Interesting background. How did that lead to Rilla?\n\nChris: Well, after college, I took a job at Morgan Stanley but quickly realized the corporate world wasn't for me. I co-founded Rilla Voice in late 2019. We're building these conversation intelligence tools for field sales, using AI to analyze sales conversations and provide feedback. The company has grown rapidly, reaching over $10 million in annual recurring revenue by January 2024. Our goal is to reach $100 million ARR by January 2025.\n\nSales Manager: That's impressive growth. How exactly does your system work with field sales?\n\nChris: Great question. Our reps use a mobile app to record their conversations during customer visits or service calls. The audio is then analyzed by our AI system, which provides detailed feedback and analytics. This allows sales managers to review performances and provide targeted coaching, even if they can't be physically present for every meeting.\n\nSales Manager: Sounds useful. What kind of results have you seen?\n\nChris: We've had some fantastic outcomes. For instance, one of our clients saw their team's average conversion rate jump from 44% to 55% after implementing our system. Another reported a $350,000 increase in revenue per rep per year.\n\nSales Manager: Those are impressive numbers. How long does it typically take to see results?\n\nChris: It varies, but many of our clients start seeing improvements within the first month. The key is using the insights to guide your coaching and training efforts. When hiring for our own team, I look for \"high slope\" individuals - people who can learn and grow quickly. I care more about someone's potential and ability to figure things out than their current knowledge. For startups and sales teams alike, it's important to find people who can solve problems from first principles and adapt to rapidly changing environments.\n\nSales Manager: That makes sense. How about we set up a pilot program with a few of our reps?\n\nChris: Absolutely! We could set up a small group of your reps with our system and track their progress over 30 days. We'd provide the app, train your reps on how to use it, and work with your sales managers to interpret the data and develop coaching strategies. At the end of the 30 days, I'd be happy to come back and present our findings. How does that sound?`;

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