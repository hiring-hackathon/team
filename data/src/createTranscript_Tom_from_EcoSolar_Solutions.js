import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `Tom: Good morning, Mrs. Anderson. I'm Tom from EcoSolar Solutions. Thank you for allowing me to visit your home today to discuss our solar panel systems.\n\nMrs. Anderson: Good morning, Tom. I've been considering solar energy for a while now.\n\nTom: That's great to hear. What sparked your interest in solar power?\n\nMrs. Anderson: Well, I'm looking to reduce my energy bills and do something good for the environment.\n\nTom: Those are excellent reasons. Solar energy can definitely help with both. Would you mind if we take a look at your roof to assess its solar potential?\n\nMrs. Anderson: Not at all, please go ahead.\n\n[Tom and Mrs. Anderson go outside]\n\nTom: Your roof has excellent sun exposure, which is ideal for solar panels. Based on what I'm seeing, we could install a system that would cover about 80% of your current energy usage.\n\nMrs. Anderson: That sounds impressive. How much would a system like that cost?\n\nTom: For a home your size, a system capable of that output would cost around $15,000. However, with current federal tax incentives, that price would come down to about $11,000.\n\nMrs. Anderson: That's a significant investment. How long would it take to recoup the costs?\n\nTom: Based on your current energy usage, we estimate you'd break even in about 7-8 years. After that, you'd essentially be getting free electricity for the life of the system, which is typically 25-30 years.\n\nMrs. Anderson: That's certainly appealing. What about maintenance?\n\nTom: Solar panels are very low maintenance. We recommend an annual cleaning, which we can provide. Otherwise, you just let them do their job.\n\nMrs. Anderson: I see. And how long does the installation take?\n\nTom: For a system this size, installation typically takes 2-3 days. We handle all the paperwork and permits as well.\n\nMrs. Anderson: That sounds straightforward. I think I'd like to move forward with this.\n\nTom: Excellent! I'm confident you'll be very happy with your decision. Shall we go back inside to discuss the details and schedule the installation?\n\nMrs. Anderson: Yes, let's do that. Thank you for the informative presentation, Tom.\n\nTom: It's my pleasure, Mrs. Anderson. I'm looking forward to helping you harness the power of the sun.`;

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
        className={`bg-blue-500 text-white py-2 px-4 rounded mb-5 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
      >
        {loading ? 'Posting...' : 'Post Transcript'}
      </button>

      {loading && <p>Posting transcript...</p>}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5">
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
