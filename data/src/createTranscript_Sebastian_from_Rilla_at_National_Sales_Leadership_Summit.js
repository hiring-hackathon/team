import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

      const transcriptText = `Sebastian: Good afternoon, everyone. I'm Sebastian, CEO and Co-founder of Rilla. Thank you for attending my keynote speech here at the National Sales Leadership Summit. As a co-founder, I'm thrilled to share how we're revolutionizing outside sales operations through AI-powered analytics.\n\nAttendee: Hi Sebastian, your keynote was inspiring. Can you elaborate on how you started Rilla?\n\nSebastian: Absolutely! My co-founders and I started Rilla because we saw a huge opportunity in the outside sales space. We provide speech analytics for field sales and service, focusing on analyzing conversations of door-to-door representatives, roofing reps, solar reps, and anyone who speaks face-to-face with customers.\n\nAttendee: That's fascinating. What inspired you and your co-founders to focus on this area?\n\nSebastian: Great question. The idea for Rilla Voice actually came from a previous startup where we worked with major brands. We realized that 85% of sales and commerce still happens offline, with limited visibility into these interactions. As co-founders, we saw the potential to bring data-driven insights to this overlooked area.\n\nAttendee: Can you give an example of how it works in practice?\n\nSebastian: Certainly! One of our clients in roofing sales saw amazing results. Our analytics revealed that top performers focused on specific pain points like missing shingles and debris in about 80% of their conversations. This approach made them three to four times more likely to book an appointment compared to newer reps who used different pitching strategies.\n\nAttendee: That's impressive. How can companies implement your system?\n\nSebastian: It's quite straightforward. As co-founders, we've put a lot of effort into making our system user-friendly and effective for field sales teams. We use a mobile app to record customer conversations, which are then analyzed using AI to help improve sales techniques. I'd be happy to discuss implementation details further if you'd like to set up a meeting at your office next week.`;

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
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-2xl mb-5">Rilla Voice: Speech Analytics for Outside Sales</h1>

      <div className="border border-gray-300 rounded p-5 mb-5">
        <h2 className="text-xl mb-3">Transcript</h2>
        {transcriptText.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-3">{paragraph.trim()}</p>
        ))}
      </div>

      <button 
        onClick={postTranscript} 
        disabled={loading}
        className={`bg-${loading ? 'gray' : 'blue'}-500 text-white py-2 px-4 rounded ${loading ? 'cursor-not-allowed' : 'cursor-pointer'} mb-5`}
      >
        {loading ? 'Posting...' : 'Posting Transcript'}
      </button>

      {loading && <p>Posting transcript...</p>}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {response && (
        <div className="border border-gray-300 rounded p-5">
          <h2 className="text-xl mb-3">API Response</h2>
          <pre className="whitespace-pre-wrap overflow-x-auto">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;