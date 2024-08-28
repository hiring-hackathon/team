import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `Sebastian: Good afternoon, Mr. Johnson. I'm Sebastian, CEO and Co-founder of Rilla. Thank you for inviting me to your office to discuss how we can revolutionize your field sales operations.\n\nMr. Johnson: Welcome, Sebastian. I've heard good things about Rilla. Can you tell me more about how your solution applies to our door-to-door sales team?\n\nSebastian: Absolutely. At Rilla, we specialize in speech analytics for outside sales, particularly for teams like yours who interact face-to-face with customers. Our mobile app records these in-person conversations, which are then analyzed using AI to improve sales techniques.\n\nMr. Johnson: Interesting. Can you give me a specific example of how this has helped other companies?\n\nSebastian: Certainly. One of our clients in roofing sales saw remarkable results. Our analytics revealed that their top performers spent 80% of their conversations focusing on specific pain points like missing shingles. This approach made them three to four times more likely to book an appointment compared to newer reps.\n\nMr. Johnson: That's impressive. How does this work in practice for a door-to-door team?\n\nSebastian: Great question. Your reps would use our app to record their conversations as they visit potential customers. Our AI then analyzes these interactions, providing insights on things like talk ratio - we've found the ideal ratio for door-to-door sales is around 75-85% for the salesperson.\n\nMr. Johnson: How do you ensure this doesn't disrupt our sales process?\n\nSebastian: We've designed our system to be unobtrusive. The app runs in the background, and the analysis happens after the fact. This allows your team to focus on what they do best - selling - while still gathering valuable data to improve their performance.\n\nMr. Johnson: This sounds promising. What would implementation look like for us?\n\nSebastian: I'd be happy to set up a pilot program. We could start with a small group of your reps, have them use our system for a month, and then I'd personally come back to present the results and ROI analysis. How does that sound?\n\nMr. Johnson: That's a solid approach. Let's do it. Can you have your team send over the details for the pilot program?\n\nSebastian: Absolutely, Mr. Johnson. I'll have that sent over today. Thank you for your time, and I'm looking forward to helping your team excel in their field sales efforts.`;

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