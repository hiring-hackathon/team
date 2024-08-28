import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `Lukasz: Hello! I'm Lukasz, Head of Engineering at Rilla. It's great to meet you here at the TechCrunch Disrupt conference. I understand you're interested in how our technology works under the hood?\n\nProspect: Yes, we're always looking for cutting-edge solutions to improve our sales processes. Can you tell me more about the technical side of Rilla?\n\nLukasz: Certainly! At Rilla, we've built a robust platform that leverages the latest advancements in AI and machine learning to analyze sales conversations. Our system uses advanced natural language processing techniques to transcribe and analyze audio recordings from field sales interactions.\n\nProspect: That sounds complex. How do you ensure accuracy and reliability?\n\nLukasz: Great question. We've implemented a multi-layered approach to ensure high accuracy. Our speech-to-text engine is trained on a diverse dataset of voices and accents, and we use context-aware algorithms to improve transcription accuracy. For analysis, we employ a combination of rule-based systems and machine learning models that are continuously refined based on feedback and new data.\n\nProspect: Impressive. How does this translate to actionable insights for sales teams?\n\nLukasz: Our system doesn't just provide raw data - it extracts meaningful insights. For example, we can identify key topics discussed, measure sentiment throughout the conversation, and even detect specific sales techniques being used. We then aggregate this data to provide trends and patterns across the entire sales team.\n\nProspect: That could be really valuable. How scalable is your solution?\n\nLukasz: We've designed our architecture to be highly scalable. We use cloud-based infrastructure that can automatically scale up or down based on demand. This means we can handle anything from small teams to enterprise-level deployments with thousands of sales reps.\n\nProspect: Security must be a concern with all this sensitive data. How do you address that?\n\nLukasz: Absolutely. Security is a top priority for us. We use end-to-end encryption for all data transmission and storage. Our systems are regularly audited and comply with industry standards like SOC 2 and GDPR. We also provide granular access controls, allowing companies to manage exactly who can access what data.\n\nProspect: This all sounds very promising. What would be involved in implementing this for our team?\n\nLukasz: I'd be happy to walk you through that. Why don't we set up a meeting next week at your office? I can bring our technical team to do a deep dive into the implementation process and answer any specific questions your IT department might have. How does that sound?`;

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