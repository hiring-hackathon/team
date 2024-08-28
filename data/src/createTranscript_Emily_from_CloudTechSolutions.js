import React, { useState, useEffect } from 'react';

const TranscriptAnalysis = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `Emily: Good afternoon, Ms. Garcia. I'm Emily from CloudTech Solutions. Thank you for inviting me to your office today to discuss our project management software.\n\nMs. Garcia: Hello Emily, thanks for coming. We've been struggling with our current project management system, so I'm interested in hearing about your solution.\n\nEmily: I'm sorry to hear you've been having difficulties. Can you tell me more about the challenges you're facing?\n\nMs. Garcia: Our teams are often out of sync, deadlines are being missed, and it's hard to track progress across multiple projects.\n\nEmily: Those are common issues that our CloudProject software is designed to address. Would you like me to give you a quick demonstration?\n\nMs. Garcia: Yes, please.\n\nEmily: Great. [Emily sets up her laptop] As you can see, CloudProject provides a centralized dashboard where you can view all your projects at a glance. You can easily assign tasks, set deadlines, and track progress in real-time.\n\nMs. Garcia: That looks much more intuitive than our current system. How difficult is it to implement?\n\nEmily: We've designed it to be user-friendly. Our team handles the entire setup process, and we provide comprehensive training for your staff. Most of our clients find their teams fully operational within a week.\n\nMs. Garcia: That's promising. What about data migration from our current system?\n\nEmily: We have a dedicated migration team that will handle that for you. They'll ensure all your existing project data is transferred accurately.\n\nMs. Garcia: And the cost?\n\nEmily: For a company of your size, the annual subscription would be $10,000. This includes the software, setup, training, and ongoing support.\n\nMs. Garcia: That's within our budget. I think this could really help streamline our operations.\n\nEmily: I agree, Ms. Garcia. Shall we discuss the next steps for implementation?\n\nMs. Garcia: Yes, let's do that. Thank you for coming in today, Emily.\n\nEmily: It's my pleasure. I'm excited to help improve your project management capabilities.`;

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
