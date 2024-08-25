import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // State for loading

  // Function to send POST request
  const postTranscript = async () => {
    const transcriptText = "I got it done"; // Replace with actual transcript text
    setLoading(true); // Set loading to true when request starts

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
      setLoading(false); // Set loading to false when request completes
    }
  };

  // Call postTranscript on component mount
  useEffect(() => {
    postTranscript(); // Automatically send POST request when component mounts
  }, []);

  return (
    <div className="App">
      <h1>Check the console for the POST request result</h1>

      {loading && <p>Loading...</p>}

      {response && (
        <div>
          <h2>Response:</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div>
          <h2>Error:</h2>
          <pre>{error}</pre>
        </div>
      )}

      {/* Button to manually trigger the request */}
      <button onClick={postTranscript}>Send Transcript</button>
    </div>
  );
}

export default App;
