import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `Alex: Good afternoon! I'm Alex from SunBright Solar Solutions. Thanks for having me over to discuss solar options for your home. How are you doing today, Jamie? Jamie: Hi Alex, I'm doing well, thanks. I've been curious about solar for a while now. Alex: That's great to hear! Many homeowners are becoming interested in solar energy. What sparked your interest in solar panels? Jamie: Well, I'm concerned about rising energy costs, and I'd like to reduce my carbon footprint if possible. Alex: Those are excellent reasons, Jamie. Solar can indeed help with both of those concerns. Before we dive in, do you mind if I ask you a few questions about your home and energy usage? Jamie: Not at all, go ahead. Alex: Great. First, how long have you been living in this house? Jamie: About five years now. Alex: Perfect. And what's your average monthly electricity bill? Jamie: It varies, but usually around $150 to $200. Alex: Thanks for sharing that. Now, have you noticed your roof getting a good amount of sunlight throughout the day? Jamie: Yes, especially the south-facing side. It gets sun most of the day. Alex: That's ideal for solar panels. Now, let me give you a quick overview of how solar energy works and the benefits it can provide. Jamie: Sounds good. Alex: Solar panels capture sunlight and convert it into electricity. This can significantly reduce or even eliminate your reliance on grid power. The benefits include lower energy bills, increased home value, and a reduced carbon footprint. Plus, there are federal tax incentives available right now that can offset a good portion of the installation cost. Jamie: That all sounds promising. But how much does it typically cost? Alex: The cost varies depending on the system size and your energy needs. Based on what you've told me about your energy usage, I estimate a system for your home would be in the $15,000 to $20,000 range before incentives. However, with the current 30% federal tax credit, that could bring the cost down to $10,500 to $14,000. Jamie: That's a significant investment. How long would it take to recoup the costs? Alex: Great question. Given your current energy bills, we typically see a payback period of 7 to 10 years. After that, you're essentially getting free electricity. And remember, solar panels typically last 25 to 30 years, so you'll be saving for decades. Jamie: I see. What about maintenance? Do solar panels require a lot of upkeep? Alex: Solar panels are actually very low maintenance. They don't have moving parts, so there's little that can go wrong. We recommend a professional cleaning once a year, which we can provide. Other than that, you just let them do their job. Jamie: That's good to know. How long does the installation process take? Alex: For a typical residential installation, we're usually done in 1 to 3 days. We handle all the permitting and paperwork, so it's a hassle-free process for you. Jamie: Okay. And what about warranties? Alex: We offer a 25-year warranty on the panels themselves and a 10-year warranty on our workmanship. Plus, the inverter, which converts the solar power to usable electricity for your home, comes with a 12-year manufacturer's warranty. Jamie: That's reassuring. Do you have any references from other customers in the area? Alex: Absolutely! I'd be happy to provide you with references. We've done several installations in this neighborhood, and our customers have been very satisfied. I can also show you some before-and-after photos of recent projects if you'd like. Jamie: That would be helpful, thanks. Alex: Great. Now, would you like me to do a quick survey of your roof to give you a more accurate estimate? Jamie: Sure, that makes sense. Alex: Perfect. While I do that, here's a brochure with more details about our products and services. Feel free to look it over, and I'll be back in a few minutes to discuss my findings. (Alex steps out to survey the roof) Alex: (returning) Thanks for your patience, Jamie. I've taken a look, and your roof is in excellent condition for solar panel installation. Based on what I've seen, I can give you a more precise quote. Would you like me to work up some numbers for you? Jamie: Yes, please. I'm definitely interested, but I'll need to discuss this with my partner before making a decision. Alex: Of course, I completely understand. How about I prepare a detailed proposal for you, including potential energy savings over time? I can email it to you this evening. Then, you and your partner can review it together, and I'll follow up in a couple of days to answer any questions you might have. Jamie: That sounds like a good plan, Alex. I appreciate your thoroughness. Alex: It's my pleasure, Jamie. I'm passionate about helping homeowners like you transition to clean, renewable energy. Do you have any other questions for me at this point? Jamie: Not right now, but I'm sure I'll have more after reviewing the proposal. Alex: That's perfectly fine. Here's my card with my direct number. Please don't hesitate to reach out if anything comes to mind. I'll send over that proposal this evening, and I'll give you a call in a couple of days to follow up. Does that work for you? Jamie: Yes, that works great. Thanks for your time today, Alex. Alex: Thank you for considering SunBright Solar Solutions, Jamie. I look forward to helping you harness the power of the sun for your home. Have a great rest of your day! Jamie: You too, Alex. Goodbye. Alex: Goodbye, Jamie.`;

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