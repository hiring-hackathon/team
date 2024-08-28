import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `Sebastian: Good morning! I'm Sebastian, CEO of Rilla. Thank you for stopping by our booth at the Sales 3.0 Conference. Are you interested in learning about how AI can revolutionize your outside sales team's performance?\n\nVisitor: Hi Sebastian. I've heard a bit about AI in sales, but I'm not sure how it applies to field sales. Can you elaborate?\n\nSebastian: Absolutely! Our focus at Rilla is on analyzing conversations of door-to-door representatives, roofing reps, solar reps, and anyone who speaks face-to-face with customers. We use a mobile app to record these customer conversations, which are then analyzed using AI to help improve sales techniques.\n\nVisitor: That's interesting. How does it work in practice?\n\nSebastian: Great question. Let me give you an example from one of our clients in roofing sales. Our analytics revealed that top performers focused on specific pain points like missing shingles and debris in about 80% of their conversations. This approach made them three to four times more likely to book an appointment compared to newer reps who used different pitching strategies.\n\nVisitor: Impressive. What other insights can your system provide?\n\nSebastian: Another crucial insight is the importance of the talk ratio - how much the salesperson talks versus the customer. For door-to-door conversations, we've found the ideal talk ratio is around 75-85% for the salesperson. However, for inspections or adjuster meetings, the ratio should decrease to about 50-60%, emphasizing the importance of listening in sales.\n\nVisitor: This could be really valuable for our team. How difficult is it to implement?\n\nSebastian: It's quite straightforward. I'd be happy to schedule a demo at your office next week. We could analyze some of your team's conversations and show you the kind of insights you could gain. Would that be of interest?\n\nVisitor: Yes, that would be great. Let's set that up.`;

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