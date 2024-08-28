import React, { useState, useEffect } from 'react';

const TranscriptAnalysis = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `Sarah: Good afternoon, Dr. Roberts. I'm Sarah from MediTech Solutions. Thank you for allowing me to visit your clinic today. I understand you've been looking into upgrading your medical equipment.\n\nDr. Roberts: Yes, that's right. We're particularly interested in new imaging technology.\n\nSarah: Excellent. At MediTech, we specialize in cutting-edge imaging solutions. Based on our previous conversation, I believe our AdvancedScan X3 would be perfect for your needs. Would you like me to set it up for a demonstration?\n\nDr. Roberts: That would be great. What are its key features?\n\nSarah: The AdvancedScan X3 offers high-resolution 3D imaging, faster scan times, and reduced radiation exposure for patients. It's also compatible with our cloud-based storage system, allowing for easy access and sharing of images among your staff.\n\nDr. Roberts: Impressive. How does it compare to our current system in terms of image quality?\n\nSarah: Let me show you. I've brought some comparison images. [Sarah sets up a display] As you can see, the AdvancedScan X3 provides significantly clearer images, especially in soft tissue definition.\n\nDr. Roberts: The difference is remarkable. What about the learning curve for my staff?\n\nSarah: We provide comprehensive training as part of the package. Most clinics find their staff fully proficient within a week. We also offer ongoing support if any questions arise.\n\nDr. Roberts: That's reassuring. And the cost?\n\nSarah: The AdvancedScan X3, including installation, training, and a 3-year warranty, is priced at $175,000. We do offer flexible leasing options as well.\n\nDr. Roberts: That's within our budget. I think this could really enhance our diagnostic capabilities.\n\nSarah: I agree, Dr. Roberts. Shall we discuss the next steps for implementation?\n\nDr. Roberts: Yes, let's do that. Thank you for coming in today, Sarah.\n\nSarah: It's my pleasure, Dr. Roberts. I'm excited to help improve your clinic's imaging capabilities.`;

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
