import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `Alex: Good morning, Mr. Johnson. I'm Alex from GreenGrow Agricultural Solutions. Thank you for meeting me here on your farm today.\n\nMr. Johnson: Morning, Alex. I appreciate you coming out here.\n\nAlex: It's my pleasure. I understand you're interested in our precision farming technology. How about we take a walk through your fields and I can show you how our system could benefit your operations?\n\nMr. Johnson: Sounds good. Let's start with the corn fields.\n\nAlex: Perfect. [As they walk] Our GreenGrow Precision system uses satellite imaging and soil sensors to provide real-time data on crop health, soil moisture, and nutrient levels. For instance, in a field like this, our system could help you optimize irrigation and fertilizer use.\n\nMr. Johnson: That could certainly help cut costs. How accurate is it?\n\nAlex: Our system is accurate to within 2% for soil moisture and nutrient levels. Here, let me show you a live demo. [Alex takes out a tablet] This is data from a similar farm using our system. You can see how it identifies areas that need more or less water or fertilizer.\n\nMr. Johnson: Impressive. What about the installation process?\n\nAlex: We handle everything. Our team will install soil sensors across your fields and set up the central system. The whole process usually takes about a week, and we can work around your schedule to minimize disruption.\n\nMr. Johnson: And the cost?\n\nAlex: For a farm your size, the total cost including installation would be $50,000. However, based on data from our other clients, you could see a return on investment within two growing seasons through reduced water and fertilizer use.\n\nMr. Johnson: That's a significant investment, but the potential savings are attractive.\n\nAlex: Absolutely. Plus, we offer a satisfaction guarantee. If you don't see at least a 10% reduction in water and fertilizer use in the first year, we'll refund 50% of the purchase price.\n\nMr. Johnson: That's a strong guarantee. I think I'm interested in moving forward.\n\nAlex: Excellent! Shall we head back to your office to discuss the details and schedule the installation?\n\nMr. Johnson: Yes, let's do that. Thanks for the informative tour, Alex.\n\nAlex: Thank you, Mr. Johnson. I'm looking forward to helping you optimize your farm operations.`;

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