import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const postTranscript = async () => {
    const transcriptText = `Hi, I'm Sebastian, the founder and CEO of Rilla Voice. We provide speech analytics for outside sales and service. Our focus is on analyzing conversations of door-to-door representatives, roofing reps, solar reps, and anyone who speaks face-to-face with customers. We use a mobile app to record customer conversations, which are then analyzed using AI to help improve sales techniques.

The idea for Rilla Voice came from a previous startup where we worked with major brands. We realized that 85% of sales and commerce still happens offline, with limited visibility into these interactions. Understanding what people think by analyzing what they say became the foundation for Rilla Voice.

Let me give you an example using roofing sales. Our analytics revealed key differences between top performers and newer reps. Top performers focused on specific pain points like missing shingles and debris in about 80% of their conversations. This approach made them three to four times more likely to book an appointment compared to newer reps who used different pitching strategies.

Another crucial insight from our analytics is the importance of the talk ratio - how much the salesperson talks versus the customer. For door-to-door conversations, the ideal talk ratio is around 75-85% for the salesperson. However, for inspections or adjuster meetings, the ratio should decrease to about 50-60%, emphasizing the importance of listening in sales.

At Rilla Voice, we're committed to providing these valuable insights into offline sales interactions, helping companies improve their sales strategies and performance. Our goal is to bring visibility and data-driven decision making to the world of face-to-face sales, which has been largely overlooked by technology until now.`;

    setLoading(true);

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
    <div className="App">
      <h1>Rilla Voice: Speech Analytics for Outside Sales</h1>

      {loading && <p>Loading transcript...</p>}

      {response && (
        <div>
          <h2>Transcript Analysis:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div>
          <h2>Error:</h2>
          <pre>{error}</pre>
        </div>
      )}

      <button onClick={postTranscript}>Analyze Transcript</button>
    </div>
  );
}

export default App;
