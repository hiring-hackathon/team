import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `Rebecca: Good afternoon, this is Rebecca from Golden Sunrise Retrievers. Is this Tom? Tom: Yes, it is. Hi Rebecca, thanks for getting back to me. Rebecca: It's my pleasure, Tom. I understand you're interested in our Golden Retriever puppies. How has your day been going? Tom: It's been good, thanks. Yes, I've always loved Golden Retrievers and I think now might be the right time to bring one into my life. Rebecca: That's wonderful to hear, Tom! Golden Retrievers are truly special dogs. What is it about the breed that appeals to you? Tom: Well, I've heard they're great family dogs, very friendly, and good with kids. Plus, I love how they look. Rebecca: You're absolutely right, Tom. Goldens are known for their friendly temperament and they're excellent with children. They're also intelligent and eager to please, which makes them a joy to train. May I ask about your living situation? Do you have a house with a yard? Tom: Yes, I do. We have a decent-sized backyard, actually. Rebecca: That's perfect for a Golden Retriever. They love having space to play and explore. Are you an active person, Tom? Goldens do require regular exercise. Tom: I'd say I'm fairly active. I go for runs a few times a week and I enjoy hiking on weekends. Rebecca: That's great to hear! A Golden would make an excellent running companion once they're fully grown, and they'd love joining you on hikes. Now, have you owned dogs before? Tom: I had a mixed breed dog when I was younger, but this would be my first dog as an adult. Rebecca: I see. It's wonderful that you're considering a Golden for your first adult dog. They're generally easy to train and very eager to please. However, they do require regular grooming. Are you prepared for that commitment? Tom: I think so, yes. How much grooming do they need? Rebecca: Goldens have a thick, water-repellent double coat that sheds seasonally. They need brushing at least 2-3 times a week, more during shedding season. They also benefit from professional grooming every 6-8 weeks. We offer grooming workshops for new puppy owners if you're interested in learning how to do some of it yourself. Tom: That's good to know. What about their energy level? Do they calm down as they get older? Rebecca: Great question, Tom. Golden Retrievers are known for their puppy-like enthusiasm well into adulthood, but they do mellow somewhat as they age. They remain playful and energetic for many years, which is why regular exercise is important. However, they're also content to relax with their family after a good play session. Tom: That sounds perfect for my lifestyle. Can you tell me about the puppies you currently have available? Rebecca: Of course! We have a litter of seven puppies that will be ready to go to their forever homes in about three weeks. There are four males and three females. All our puppies come with their first round of vaccinations, deworming, a health certificate from our vet, AKC registration, and a starter kit with food and some basic supplies. Would you like to schedule a visit to meet them? Tom: That sounds great. Before we do that, can I ask about the cost? Rebecca: Certainly, Tom. Our Golden Retriever puppies are priced at $2,500. This includes everything I mentioned before, as well as lifetime breeder support. We're always available to answer questions or provide advice as your puppy grows. We also offer a two-year health guarantee against genetic conditions. Tom: I see. That's a significant investment. Can you tell me more about the health guarantee? Rebecca: Absolutely, Tom. We take the health of our dogs very seriously. All our breeding dogs are OFA certified for hips, elbows, and eyes, and are genetically tested for common Golden Retriever health issues. Our two-year health guarantee covers any genetic conditions that may arise. If a genetic health issue is diagnosed by a licensed vet within two years, we'll refund the full purchase price or provide a replacement puppy, whichever you prefer. Tom: That's reassuring. Do you offer any kind of payment plan? Rebecca: Yes, we do. We understand it's a significant investment. We offer a three-month payment plan. You'd make an initial deposit of $1,000 to reserve your puppy, followed by three monthly payments of $500. There's no interest charged. Would that be helpful? Tom: Yes, that does make it more manageable. I think I'd like to meet the puppies before making a final decision. When could I come see them? Rebecca: I'm so glad to hear that, Tom! We have availability this Saturday at 11 AM or Sunday at 2 PM. Which would work better for you? Tom: Saturday at 11 AM would be perfect. Rebecca: Wonderful! I'll put you down for Saturday at 11 AM. When you visit, you'll be able to interact with the puppies and their parents. I'll also be there to answer any questions you might have. Is there anything specific you'd like to know before your visit? Tom: I think you've covered most things, Rebecca. I'm just excited to meet them! Rebecca: We're excited to meet you too, Tom! I'll send you an email confirmation with directions to our location and some tips to prepare for your visit. Do you have any final questions for me? Tom: No, I think I'm all set. Thanks for all the information. Rebecca: You're very welcome, Tom. We're looking forward to meeting you on Saturday at 11 AM. Have a great rest of your day! Tom: You too, Rebecca. See you Saturday! Rebecca: Goodbye, Tom! Tom: Goodbye!`;

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
        {loading ? 'Posting...' : 'Posting Transcript'}
      </button>

      {loading && <p>Posting transcript...</p>}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {response && (
        <div className="border border-gray-300 rounded p-5">
          <h2 className="text-xl mb-3">Posting Transcript</h2>
          <pre className="whitespace-pre-wrap overflow-x-auto">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;