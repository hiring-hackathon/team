import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `Lukasz: Good morning, Mr. Garcia. I'm Lukasz, Co-founder and Head of Engineering at Rilla. Thank you for allowing me to visit your solar panel installation company today.\n\nMr. Garcia: Welcome, Lukasz. I'm interested in how your technology could help our door-to-door sales team. Can you explain more?\n\nLukasz: Certainly, Mr. Garcia. At Rilla, we've developed an AI-powered platform specifically designed for outside sales teams like yours. Our system analyzes the face-to-face conversations your reps have with potential customers, providing valuable insights to improve their performance.\n\nMr. Garcia: That sounds intriguing. How would this work for our door-to-door reps?\n\nLukasz: Your reps would use our mobile app to record their conversations during their door-to-door visits. Our AI then analyzes these recordings, providing insights on conversation structure, customer objections, and effective pitching techniques.\n\nMr. Garcia: Interesting. Can you give me an example of how this has helped other door-to-door sales teams?\n\nLukasz: Of course. One of our clients in the home security industry found that their top performers were spending the first 30% of the conversation building rapport and understanding the homeowner's specific concerns. This insight allowed them to train other reps to use a similar approach, resulting in a 40% increase in appointments set.\n\nMr. Garcia: That's impressive. How do you ensure the privacy and security of these recorded conversations?\n\nLukasz: Excellent question. As co-founders, we recognized early on that security would be critical. We use end-to-end encryption for all data transmission and storage. Our systems comply with industry standards like SOC 2 and GDPR, and we provide granular access controls so you can manage exactly who can access the data.\n\nMr. Garcia: That's reassuring. How scalable is your solution? We're planning to expand our sales force significantly next quarter.\n\nLukasz: We've designed our architecture to be highly scalable. We use cloud-based infrastructure that can automatically adjust based on demand. This means we can handle anything from small teams to large, distributed sales forces with thousands of reps.\n\nMr. Garcia: Sounds promising. What would implementation look like for us?\n\nLukasz: I'd be happy to set up a pilot program. We could start with a group of your door-to-door reps, have them use our system for 45 days, and then I'd personally come back to present the results and ROI analysis. We'd provide all necessary training and support throughout the process.\n\nMr. Garcia: That's a solid approach. Let's move forward with the pilot. Can you send over the program details?\n\nLukasz: Absolutely, Mr. Garcia. I'll have that sent over today. Thank you for your time, and I'm excited to help your door-to-door sales team leverage AI to boost their performance in the field.`;

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