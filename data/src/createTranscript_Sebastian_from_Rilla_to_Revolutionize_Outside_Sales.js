import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `Sebastian: Hi, I'm Sebastian, the CEO and founder of Rilla. We provide virtual ride-along services for outside sales and service teams. Our focus is on analyzing conversations of door-to-door representatives, roofing reps, solar reps, and anyone who speaks face-to-face with customers. We use AI to analyze these conversations and provide insights to help improve sales techniques.\n\nInterviewer: That's fascinating. Can you tell us more about how Rilla works?\n\nSebastian: Certainly. Our system uses a mobile app to record customer conversations. These recordings are then transcribed and analyzed by our AI. The AI extracts key insights, generates summaries, and provides analytics on various aspects of the sales interaction. This allows sales managers to gain 100% visibility into every sales conversation without physically being present.\n\nInterviewer: What kind of results have your clients seen?\n\nSebastian: We've seen some incredible results. For example, A1 Garage saw a 2X increase in their average ticket size. Long Home Products reported a $350,000 increase in revenue per rep per year. Mister Sparky increased their average ticket for technicians by 25%. These are just a few examples of the impact Rilla can have.\n\nInterviewer: That's impressive. How does Rilla help save time for sales managers?\n\nSebastian: Great question. Our data shows that sales managers who coach with Rilla's AI are 8x faster and 20x more efficient. They can review conversations, leave comments, and create highlights much more quickly than traditional ride-alongs. This allows them to coach all their reps every day and even manage twice as many reps as before.\n\nInterviewer: Can you address any concerns about privacy or adoption?\n\nSebastian: Absolutely. We take privacy very seriously. All data is encrypted and securely stored. As for adoption, we've found that most teams adapt quickly to the system. The interface is intuitive, and the benefits become apparent very quickly. We also offer thorough training and support to ensure smooth adoption.\n\nInterviewer: Finally, what's your vision for the future of Rilla?\n\nSebastian: Our goal is to revolutionize outside sales and service by bringing data-driven insights to an industry that has been largely overlooked by technology. We want to help companies save time, coach better, and ultimately win more. We're constantly innovating and looking for ways to provide even more value to our clients.`;

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