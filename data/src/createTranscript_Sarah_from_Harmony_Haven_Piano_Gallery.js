import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `Sarah: Good morning! Welcome to Harmony Haven Piano Gallery. I'm Sarah. How can I assist you today? Michael: Good morning, Sarah. I'm Michael. I've been thinking about purchasing a piano for my home. Sarah: That's wonderful, Michael! There's nothing quite like having a piano in your home. May I ask if you're a player yourself or if this is for someone else in the family? Michael: It's primarily for me. I used to play years ago and I'm looking to get back into it. Sarah: How exciting! Rediscovering a passion for music is always a joy. Do you have any particular style or brand in mind? Michael: To be honest, I'm not entirely sure. It's been a while since I've kept up with piano brands. I'm looking for something that would suit an intermediate player. Sarah: I understand. We have several excellent options for intermediate players. Would you prefer an upright or a grand piano? Michael: I think an upright would be more suitable for my space. Sarah: Great choice. Uprights are perfect for home use. Let me show you a few models that I think you might like. This first one is a Yamaha U1 - it's very popular among intermediate players. Michael: It looks beautiful. How does it sound? Sarah: Why don't you give it a try? Please, sit down and play a bit. (Sound of Michael playing a short melody) Michael: Wow, that feels nice. The keys have a good weight to them. Sarah: Yes, Yamaha is known for their excellent key action. How about we look at a few more? I'd like you to experience the differences in touch and sound. Michael: That sounds great. What else do you recommend? Sarah: Let's try this Kawai K-300. It has a slightly different feel and a warmer tone. (Sound of Michael playing the same melody on the Kawai) Michael: Interesting. You're right, it does sound warmer. Sarah: Indeed. Now, may I ask about your budget? That can help us narrow down the options. Michael: I'm thinking somewhere in the $5,000 to $8,000 range. Sarah: Perfect. Both of these models fall within that range. We also have some excellent used pianos that offer great value. Would you be interested in seeing a few of those? Michael: Sure, that could be a good option. Sarah: Excellent. While we walk over to that section, can you tell me a bit about your playing goals? Are you looking to perform, or is this mainly for personal enjoyment? Michael: Mainly personal enjoyment, but I might want to play for friends and family occasionally. Sarah: That's lovely. Music really brings people together. Here's a gently used Steinway upright. It's a few years old but in excellent condition. (Sound of Michael playing) Michael: This one has a really rich sound. Sarah: It does, doesn't it? Steinway is renowned for their tonal quality. Now, all of our used pianos come with a 5-year warranty, and we offer tuning services as well. Michael: That's good to know. Do you offer delivery and installation? Sarah: Absolutely. We have a team of experienced movers who will deliver and set up the piano in your home. We also do the first tuning after it's settled in your space. Michael: That's great. I have to say, I'm torn between the Yamaha and this Steinway. Sarah: That's completely understandable. They're both excellent instruments. Would you like to play them again, perhaps try a different piece of music? Michael: Yes, I think that would help. Sarah: Wonderful. Take your time. I'm here to answer any questions you might have about the instruments, our policies, or anything else. Michael: Thank you, Sarah. I appreciate your patience and expertise. Sarah: It's my pleasure, Michael. Finding the right piano is an important decision, and I'm here to help you make the best choice for your needs and preferences. (The conversation continues with Michael trying out both pianos again, asking more detailed questions about maintenance, resale value, and financing options. Sarah provides informative answers and gently guides Michael towards making a decision, ending with scheduling a follow-up appointment for Michael to bring his family to see and hear the pianos.)`;

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