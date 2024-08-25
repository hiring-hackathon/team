import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `Salesperson: Hello, Mrs. Johnson. My name is Sarah from Hometown Realty. I saw that you were interested in selling your home and would like to learn more about you and how we can work together. Do you have a few minutes to discuss selling your home?

Mrs. Johnson: Oh, hello Sarah. Yes, I've been thinking about selling. I suppose I have a few minutes.

Salesperson: Wonderful, thank you for your time. May I ask what's prompting you to consider selling at this time?

Mrs. Johnson: Well, we're empty nesters now, and this house feels too big for just the two of us.

Salesperson: I completely understand. Many of our clients find themselves in similar situations. Have you given any thought to what kind of home you'd like to move into?

Mrs. Johnson: We're thinking maybe a condo or a smaller house, something with less maintenance.

Salesperson: That's a great idea. Hometown Realty has a wide range of properties that might suit your needs. Before we dive into that, though, I'd love to learn more about your current home. How long have you lived there?

Mrs. Johnson: It's been about 25 years now.

Salesperson: Wonderful, so you've really made it a home. In your time there, have you made any major renovations or upgrades?

Mrs. Johnson: Yes, we remodeled the kitchen about 5 years ago and put in new windows last year.

Salesperson: Those are excellent selling points. Buyers love updated kitchens and energy-efficient windows. Mrs. Johnson, based on what you've told me, I believe we could put together a very attractive listing for your home. Would you be interested in having me come by for a free, no-obligation home valuation? I could give you a better idea of what your home might sell for in the current market.

Mrs. Johnson: That sounds helpful. When could you do that?

Salesperson: I have some availability this week. How does Thursday afternoon around 2 PM work for you?

Mrs. Johnson: Thursday at 2 would be fine.

Salesperson: Excellent, I'll put that in my calendar. Thank you so much for your time today, Mrs. Johnson. I'm looking forward to meeting you in person and helping you transition to the next chapter of your life. Is there anything else you'd like to know before we wrap up?

Mrs. Johnson: No, I think that covers it for now. Thank you, Sarah.

Salesperson: You're very welcome. Have a great day, and I'll see you on Thursday!`;

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