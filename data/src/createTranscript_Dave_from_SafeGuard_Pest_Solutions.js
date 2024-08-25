import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `Dave: Good morning! I'm Dave from SafeGuard Pest Solutions. Thanks for reaching out to us. Is this Elena? Elena: Yes, that's me. Thanks for coming by, Dave. Dave: It's my pleasure, Elena. I understand you've been experiencing some pest issues. Before we dive in, how has your day been going? Elena: It's been alright, thanks. A bit stressful with these pests around, to be honest. Dave: I completely understand. Pest problems can definitely add unwanted stress to your life. Can you tell me a bit more about what you've been experiencing? Elena: Well, I've been seeing quite a few ants in my kitchen, and I think I heard some scratching in the walls, which worries me. Dave: I see. Ants can certainly be a nuisance, and that scratching sound is concerning. How long have you been noticing these issues? Elena: The ants started about two weeks ago, but the scratching is more recent, maybe the last few days. Dave: Thank you for that information, Elena. It's good that you're addressing this promptly. Pests can multiply quickly if left unchecked. Do you mind if I ask you a few more questions to get a better understanding of your situation? Elena: Not at all, go ahead. Dave: Great. Have you noticed any signs of droppings, especially in your attic or basement? Elena: Now that you mention it, I did see some small droppings in the basement when I was doing laundry yesterday. Dave: That's important to know. It sounds like you might be dealing with a rodent issue as well as the ants. Have you tried any DIY treatments so far? Elena: I bought some ant traps from the supermarket, but they don't seem to be doing much. Dave: I understand. Over-the-counter solutions can sometimes provide temporary relief, but they often don't address the root of the problem. At SafeGuard, we focus on long-term, comprehensive solutions. Would you like me to explain our approach? Elena: Yes, please. I'm really worried about having rodents in the house. Dave: I completely understand your concern, Elena. Our approach at SafeGuard is threefold: Inspect, Treat, and Prevent. First, I'd like to do a thorough inspection of your property to identify all pest entry points and nesting areas. Then, we'll implement a targeted treatment plan using eco-friendly, pet-safe products. Finally, we'll set up preventive measures to keep pests out in the future. Elena: That sounds thorough. Is it safe for my kids and pets? Dave: Absolutely, Elena. Safety is our top priority. All our products are EPA-approved and selected for their low impact on humans and pets. We also advise on any precautions to take during and after treatment. Do you have any specific concerns about the treatment process? Elena: No, that's reassuring to hear. How long does the process usually take? Dave: For an initial treatment, we usually need about 2-3 hours. We'll treat both the interior and exterior of your home. After that, we recommend quarterly follow-up treatments to maintain a pest-free environment. These follow-ups typically take about an hour. Elena: I see. And what about cost? I'm a bit worried about that. Dave: I understand, Elena. Cost is an important factor. Our initial treatment, which includes the comprehensive inspection and first round of treatment, typically ranges from $250 to $350, depending on the severity of the infestation and the size of your property. Our quarterly follow-ups are priced at $90-$120. We also offer an annual plan that can save you money in the long run. Would you like me to break down the potential costs for your specific situation? Elena: Yes, that would be helpful. Dave: Great. Based on what you've told me about the ants and potential rodent issue, I'd estimate your initial treatment would be around $300. This includes treating for both ants and rodents, as well as a full property inspection. Then, if you opt for our recommended quarterly follow-ups, that would be $100 per visit. So for a full year of protection, you're looking at about $700. Does that align with what you were expecting? Elena: It's a bit more than I hoped, but I understand the value of professional service. Dave: I appreciate your perspective, Elena. While it may seem like a significant investment upfront, consider the potential costs of continued damage from pests, not to mention the stress and health risks. We also offer a satisfaction guarantee - if you see pest activity between scheduled treatments, we'll come back and re-treat at no additional cost. How does that sound? Elena: That's a good point, and the guarantee is reassuring. Do I need to prepare my house in any way before treatment? Dave: Great question. We'll provide you with a checklist, but generally, we ask that you clear kitchen counters, move furniture away from walls, and ensure we have access to baseboards and corners. Don't worry, we'll go over all of this in detail before the appointment. Elena: Okay, that doesn't sound too difficult. How soon could you start? Dave: I'm glad you're ready to take action, Elena. We actually have an opening tomorrow afternoon, or if that's too soon, we could schedule for early next week. What works best for you? Elena: Tomorrow might be a bit rushed. Could we aim for next Tuesday? Dave: Absolutely, next Tuesday works perfectly. I have an opening at 10 AM or 2 PM. Do you have a preference? Elena: 10 AM would be better for me. Dave: Excellent, I'll put you down for next Tuesday at 10 AM. Now, do you have any other questions for me? I want to make sure you feel completely comfortable with our service. Elena: I think you've covered everything, Dave. Thanks for being so thorough. Dave: It's my pleasure, Elena. That's what we're here for. I'll email you a service agreement along with our preparation checklist. Please review it, and if you have any questions, don't hesitate to call. Otherwise, I'll see you next Tuesday at 10 AM. Elena: Sounds good. Thank you, Dave. Dave: Thank you, Elena. We're looking forward to helping you create a pest-free home. Have a great day! Elena: You too, goodbye. Dave: Goodbye, Elena.`;

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
