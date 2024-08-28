import React, { useState, useEffect } from 'react';

const TranscriptAnalysis = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `John: Good morning! I'm John from IndustrialTech Solutions. I'm here to meet with your operations manager about our new line of industrial automation equipment. Do you have a moment to direct me?\n\nReceptionist: Good morning, John. Yes, let me check if Mr. Thompson is available. Please have a seat.\n\n(After a short wait)\n\nMr. Thompson: Hello, John. I'm Mark Thompson. Thanks for coming by. Let's head to the conference room.\n\nJohn: Thank you for your time, Mr. Thompson. I understand you're looking to upgrade your production line. Can you tell me about your current setup and the challenges you're facing?\n\nMr. Thompson: Well, we've been using the same equipment for about a decade now. It's becoming less reliable, and we're falling behind our competitors in terms of efficiency.\n\nJohn: I see. Let me show you how our latest automation solutions can address those issues...`;

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
        {loading ? 'Posting...' : 'Post Transcript'}
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
          <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>API Response</h2>
          <pre style={{ whiteSpace: 'pre-wrap', overflowX: 'auto' }}>
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default TranscriptAnalysis;
