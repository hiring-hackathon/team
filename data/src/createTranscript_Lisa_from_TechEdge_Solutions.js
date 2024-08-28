import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `Lisa: Good afternoon, Mr. Brown. I'm Lisa from TechEdge Solutions. Thank you for meeting me here at your manufacturing plant.\n\nMr. Brown: Hello Lisa, welcome to our facility.\n\nLisa: Thank you. I understand you're interested in automating some of your production processes. Would you mind giving me a tour of your operations so I can better understand your needs?\n\nMr. Brown: Of course, follow me.\n\n[They walk through the factory]\n\nLisa: I notice your assembly line here is still largely manual. Have you considered robotic automation for this section?\n\nMr. Brown: We've thought about it, but we're unsure of the cost-benefit ratio.\n\nLisa: I understand. Based on what I'm seeing, I believe our RoboAssist 5000 could significantly increase your production speed and reduce errors. Would you like me to show you a simulation?\n\nMr. Brown: Yes, that would be helpful.\n\n[Lisa sets up a laptop and shows a 3D simulation]\n\nLisa: As you can see, the RoboAssist 5000 can handle the repetitive tasks currently done by your workers, freeing them up for more complex operations. Our projections show this could increase your output by 40% while reducing errors by 60%.\n\nMr. Brown: Those are impressive numbers. What about the initial investment and ROI?\n\nLisa: For a setup of this size, the initial investment would be around $500,000. However, based on your current production levels, we project you'd see a return on investment within 18 months.\n\nMr. Brown: That's faster than I expected. What about maintenance and downtime?\n\nLisa: The RoboAssist 5000 is designed for minimal downtime. We provide 24/7 support and can often troubleshoot issues remotely. For on-site maintenance, we guarantee a response time of less than 4 hours.\n\nMr. Brown: That's reassuring. How long would the installation and integration process take?\n\nLisa: For a system of this scale, we typically complete installation and integration within 3-4 weeks. We work closely with your team to ensure a smooth transition and provide comprehensive training.\n\nMr. Brown: I'm impressed, Lisa. I think this could really revolutionize our operations.\n\nLisa: I agree, Mr. Brown. Shall we discuss the next steps? I can prepare a detailed proposal for you to review with your team.\n\nMr. Brown: Yes, let's do that. Thank you for coming out today, Lisa.\n\nLisa: It's my pleasure. I'm excited about the potential to help optimize your manufacturing processes.`;

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
