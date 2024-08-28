import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `Michael: Good afternoon, Dr. Roberts. I'm Michael, Co-Founder and Chief Data Scientist at Rilla. Thank you for inviting me to your pharmaceutical company's regional sales meeting.\n\nDr. Roberts: Welcome, Michael. We're interested in how AI can improve our field sales representatives' performance when visiting doctors' offices. Can you elaborate on that?\n\nMichael: Certainly, Dr. Roberts. At Rilla, we've developed an AI-powered system that analyzes face-to-face sales conversations. For your field reps visiting doctors' offices, this could provide valuable insights to improve their effectiveness.\n\nDr. Roberts: Interesting. How exactly would this work for our reps in the field?\n\nMichael: Your reps would use our mobile app to record their conversations during their visits to doctors' offices. Our AI then analyzes these recordings, providing insights on things like key topics discussed, the doctor's sentiment, and even specific sales techniques used by your rep.\n\nDr. Roberts: That sounds powerful. Can you give me an example of how this has helped other field sales teams?\n\nMichael: Absolutely. One of our clients in the medical device industry discovered that their top-performing reps were spending 60% of their conversations focusing on specific patient outcomes. This insight allowed them to train other reps to use similar techniques, resulting in a significant increase in product adoption rates.\n\nDr. Roberts: Impressive. How do you ensure this doesn't interfere with the delicate nature of these medical conversations?\n\nMichael: Great question. We've designed our system to be completely unobtrusive. The app runs silently in the background, and all analysis happens after the fact. We also have strict privacy protocols in place to protect sensitive medical information.\n\nDr. Roberts: That's reassuring. How difficult is it to implement and start seeing results?\n\nMichael: It's quite straightforward. We typically see clients starting to gain insights within the first month. Would you be interested in setting up a pilot program? We could equip a group of your field reps with our system and track their progress over 60 days.\n\nDr. Roberts: That sounds like a reasonable approach. What would the next steps be?\n\nMichael: I'd be happy to set that up for you. We'd provide the app and train your reps on how to use it. Then we'd work with your sales managers to interpret the data and develop coaching strategies. At the end of the 60 days, I'd personally come back to present our findings and discuss the impact on your field sales performance.\n\nDr. Roberts: Alright, let's proceed with the pilot. Can you send over the program details?\n\nMichael: Absolutely, Dr. Roberts. I'll have that sent over today. Thank you for your time, and I'm looking forward to helping your field sales team excel in their crucial conversations with healthcare professionals.`;

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