import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `Rilla Voice offers an innovative virtual ride-along service tailored for sales and service teams, with a particular focus on outside sales in industries like home services and contracting. Their system revolutionizes the traditional ride-along process by leveraging technology to create a more efficient and scalable coaching method.

  At the core of Rilla's service is an audio recording system that captures sales conversations during customer visits or service calls. These recordings are then transcribed into text format, providing a written record of each interaction. Rilla's AI technology analyzes these transcripts and conversations, extracting valuable insights and generating concise summaries of each sales encounter.

  The platform goes beyond mere transcription by offering robust analytics based on the recorded conversations. This data-driven approach allows sales managers to gain a comprehensive understanding of their team's performance and identify areas for improvement. Managers can review the transcripts, recordings, and summaries at their convenience, adding comments and creating highlights to use in coaching sessions.

  One of the key benefits of Rilla's system is its ability to facilitate remote coaching. Sales managers can provide detailed feedback and guidance to their reps based on the transcripts and analysis, without the need to be physically present during sales calls. This virtual approach saves considerable time and resources, allowing managers to coach more frequently and efficiently.

  The platform also tracks important performance metrics such as conversion rates and average ticket prices. By monitoring these key indicators, sales teams can measure the impact of their coaching efforts and track improvement over time. This data-driven approach enables more targeted and effective sales training, ultimately leading to better results for the organization.

  In essence, Rilla's virtual ride-along service transforms the way sales teams operate, providing unprecedented visibility into every sales conversation and empowering managers to coach their teams more effectively. By leveraging technology to create "virtual" ride-alongs, Rilla helps companies save time, improve coaching efficiency, and ultimately drive better sales performance.`;

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