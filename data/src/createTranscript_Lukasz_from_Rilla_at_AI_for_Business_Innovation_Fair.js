import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `Lukasz: Hello, everyone! I'm Lukasz, Co-founder and Head of Engineering at Rilla. Welcome to our booth at the AI for Business Innovation Fair. As one of the four co-founders, I'm excited to demonstrate how our technology is transforming outside sales.\n\nVisitor: It's great to meet a co-founder, Lukasz. Can you tell me more about your role in starting Rilla and the technical side of your solution?\n\nLukasz: Certainly! As a co-founder, I've been involved in Rilla from the very beginning. Together with Sebastian, Chris, and Michael, we saw a huge opportunity to apply AI and machine learning to outside sales. My focus has been on building the robust technological foundation that powers our platform.\n\nVisitor: That sounds fascinating. How did you and your co-founders approach building this technology?\n\nLukasz: Great question. As co-founders, we knew we needed to create something truly innovative. We've built a platform that leverages the latest advancements in AI and machine learning to analyze sales conversations. Our system uses advanced natural language processing techniques to transcribe and analyze audio recordings from field sales interactions.\n\nVisitor: That sounds complex. How do you ensure accuracy and reliability?\n\nLukasz: As co-founders, ensuring the quality of our technology has been a top priority from day one. We've implemented a multi-layered approach to ensure high accuracy. Our speech-to-text engine is trained on a diverse dataset of voices and accents, and we use context-aware algorithms to improve transcription accuracy. For analysis, we employ a combination of rule-based systems and machine learning models that are continuously refined based on feedback and new data.\n\nVisitor: Impressive. How does this translate to actionable insights for sales teams?\n\nLukasz: This is where our combined expertise as co-founders really shines. Our system doesn't just provide raw data - it extracts meaningful insights. We can identify key topics discussed, measure sentiment throughout the conversation, and even detect specific sales techniques being used. We then aggregate this data to provide trends and patterns across the entire sales team.\n\nVisitor: That could be really valuable. How scalable is your solution?\n\nLukasz: Scalability was one of our key considerations as co-founders from the start. We've designed our architecture to be highly scalable, using cloud-based infrastructure that can automatically adjust based on demand. This means we can handle anything from small teams to enterprise-level deployments with thousands of sales reps.\n\nVisitor: Security must be a concern with all this sensitive data. How do you address that?\n\nLukasz: Absolutely. As co-founders, we recognized early on that security would be critical for our clients. We use end-to-end encryption for all data transmission and storage. Our systems are regularly audited and comply with industry standards like SOC 2 and GDPR. We also provide granular access controls, allowing companies to manage exactly who can access what data.\n\nVisitor: This all sounds very promising. What would be involved in implementing this for our team?\n\nLukasz: I'd be happy to walk you through that. As a co-founder, I can offer you a comprehensive view of the implementation process. Why don't we set up a meeting at your office next week? I can bring our technical team, and I'd be glad to dive deep into how we can tailor our solution to your specific needs. How does that sound?`;

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