import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `Jason: Good morning, Mr. Thompson. I'm Jason from SecureHome Systems. Thank you for inviting me to your office to discuss our home security solutions. How has your day been so far?\n\nMr. Thompson: Good morning, Jason. It's been a busy day, but I'm glad we could schedule this meeting.\n\nJason: I appreciate you taking the time. I understand you've been considering upgrading your office security. Can you tell me more about your current setup and concerns?\n\nMr. Thompson: Well, we have a basic alarm system, but with our recent expansion, I feel we need something more comprehensive. I'm particularly concerned about after-hours security and protecting our new equipment.\n\nJason: Those are valid concerns, Mr. Thompson. At SecureHome Systems, we specialize in customized security solutions for businesses like yours. Based on what you've told me, I'd recommend our BusinessSecure Plus package. This includes advanced motion sensors, smart cameras with night vision, and a centralized control system that you can monitor from your smartphone.\n\nMr. Thompson: That sounds promising. How does the installation process work?\n\nJason: Great question. Our team of certified technicians can complete the installation over a weekend to minimize disruption to your business operations. We'll work with you to determine the optimal placement for all devices. After installation, we provide thorough training for you and your staff.\n\nMr. Thompson: And what about ongoing support?\n\nJason: We offer 24/7 monitoring and technical support. If any issues arise, our team is always available to assist you. Additionally, we provide quarterly system checks to ensure everything is functioning optimally.\n\nMr. Thompson: I see. Can you give me an idea of the cost?\n\nJason: Certainly. For a business of your size, the BusinessSecure Plus package, including installation, would be approximately $5,000. We also offer flexible payment plans if that would be helpful.\n\nMr. Thompson: That's within our budget. I think I'd like to move forward with this.\n\nJason: Excellent choice, Mr. Thompson. I'm confident this system will provide the comprehensive security your business needs. Shall we schedule the installation for next weekend?\n\nMr. Thompson: Yes, let's do that. Thank you, Jason.\n\nJason: Thank you, Mr. Thompson. I'll send over the contract and installation details this afternoon. It's been a pleasure meeting with you.`;

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