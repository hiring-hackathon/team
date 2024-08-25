import React, { useState, useEffect } from 'react';

function App() {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const transcriptText = `Jason: Good morning! This is Jason from SecureHome Systems. Am I speaking with Karen? Karen: Yes, this is Karen. Good morning, Jason. Jason: Thank you for your interest in our home security solutions, Karen. How has your day been so far? Karen: It's been fine, thanks. Just a bit busy with work. Jason: I understand. I appreciate you taking the time to speak with me. May I ask what prompted your interest in home security? Karen: Well, there have been a few break-ins in our neighborhood recently. It's got me worried about the safety of my family. Jason: I'm sorry to hear about the break-ins, Karen. It's understandable that you're concerned. Home security is indeed crucial for protecting your family and property. Can you tell me a bit about your home? Is it a house or an apartment? Karen: It's a two-story house with a basement. We've been living here for about five years. Jason: Thank you for that information. A multi-story home can have unique security needs. Have you had any security systems installed before? Karen: No, we haven't. This would be our first. Jason: I see. Well, you've come to the right place. SecureHome Systems specializes in customized security solutions for homes just like yours. We offer a range of services from basic alarm systems to comprehensive smart home security integration. What specific concerns do you have about your home's security? Karen: I'm mainly worried about intruders, especially at night or when we're away on vacation. And I'd like to be able to check on the house when I'm not there. Jason: Those are common concerns, Karen, and we have excellent solutions for both. Our basic package includes door and window sensors, motion detectors, and a smart control panel. We also offer cameras with remote viewing capabilities through a smartphone app. Would you be interested in that level of monitoring? Karen: Yes, that sounds like what I'm looking for. How does the system work? Jason: Great question. Our system is designed to be user-friendly and effective. When armed, any unauthorized entry triggers an alarm, immediately notifying both you and our 24/7 monitoring center. The monitoring center can then verify the situation and dispatch police if necessary. With cameras, you can check live feeds or recorded footage anytime via our secure app. How does that sound to you? Karen: That sounds good. Is it complicated to use? Jason: Not at all, Karen. We pride ourselves on creating systems that are easy to use. The control panel has a simple touchscreen interface, and our app is very intuitive. Plus, we provide thorough training during installation and offer 24/7 technical support. Many of our customers find they become comfortable with the system within a day or two. Karen: That's reassuring. What about installation? How long does that take? Jason: For a house your size, installation typically takes about 4-6 hours. We handle everything, from placing sensors and cameras to setting up the control panel and ensuring everything is working correctly. We also work with you to determine the best placement for all devices. Do you have a preference for when the installation would take place? Karen: Weekends would be best for us. Do you work on Saturdays? Jason: Absolutely! We offer installation services seven days a week to accommodate our customers' schedules. Now, Karen, based on what you've told me about your home and security needs, I'd recommend our SecureHome Plus package. This includes door and window sensors, three motion detectors, two indoor cameras, one outdoor camera, and our smart control panel with mobile app access. The total cost for this package, including professional installation, would be $899, with a monthly monitoring fee of $39.99. How does that align with your budget? Karen: That's a bit more than I was expecting to spend. Do you have any more basic options? Jason: I completely understand, Karen. Security is an investment, but we want to ensure it fits your budget. We do have a more basic package that might suit your needs. Our SecureHome Essentials package includes door and window sensors, two motion detectors, and the smart control panel with mobile app access, but without cameras. This package is priced at $599 with installation, and the monthly monitoring fee is $29.99. Would that be more in line with what you had in mind? Karen: Yes, that sounds more reasonable. And I could always add cameras later if I wanted to, right? Jason: Absolutely! That's one of the great things about our system - it's easily expandable. You can start with the essentials and add components as your needs change or your budget allows. We can add cameras, smart door locks, or even smoke and carbon monoxide detectors in the future. Karen: That's good to know. Do you offer any kind of warranty? Jason: Yes, we do, Karen. All our equipment comes with a 3-year warranty, and we also offer a 30-day money-back guarantee. If you're not completely satisfied with your system within the first month, we'll remove it and refund your money, no questions asked. Additionally, our monthly monitoring agreement is contract-free, so you can cancel at any time without penalties. Karen: That's quite reassuring. I think I'd like to go ahead with the Essentials package. Jason: That's fantastic, Karen! I think you've made an excellent choice. The SecureHome Essentials package will provide robust protection for your home. Shall we go ahead and schedule the installation? I see we have availability this Saturday at 9 AM or 1 PM. Would either of those times work for you? Karen: Saturday at 1 PM would be perfect. Jason: Excellent! I'll schedule you for this Saturday at 1 PM. Our installation team will call you the day before to confirm. Now, regarding payment, we require a $200 deposit to secure your installation slot, with the balance due upon completion. Does that work for you? Karen: Yes, that's fine. How can I make the deposit? Jason: Great! I can take your deposit over the phone right now using a credit or debit card. Once that's done, I'll email you a confirmation of your order and installation appointment, along with some information to help you prepare for the installation. Do you have any other questions for me before we proceed with the deposit? Karen: I think you've covered everything, Jason. Thank you for being so thorough. Jason: It's my pleasure, Karen. We want you to feel completely comfortable with your decision. If any questions come up later, please don't hesitate to call us. Our customer service team is available 24/7. Shall we go ahead with the deposit now? Karen: Yes, let's do that. Jason: Perfect. I'll just need your credit card information... (The conversation concludes with Jason processing the deposit and providing final details about the installation process.)`;

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
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Rilla Voice: Speech Analytics for Outside Sales</h1>

      <div style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '20px', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Transcript</h2>
        {transcriptText.split('\n\n').map((paragraph, index) => (
          <p key={index} style={{ marginBottom: '10px' }}>{paragraph.trim()}</p>
        ))}
      </div>

      <button 
        onClick={postTranscript} 
        disabled={loading}
        style={{
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '20px'
        }}
      >
        {loading ? 'Posting...' : 'Posting Transcript'}
      </button>

      {loading && <p>Posting transcript...</p>}

      {error && (
        <div style={{ backgroundColor: '#ffeeee', border: '1px solid #ff0000', borderRadius: '4px', padding: '20px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '10px', color: '#ff0000' }}>Error</h2>
          <p style={{ color: '#ff0000' }}>{error}</p>
        </div>
      )}

      {response && (
        <div style={{ border: '1px solid #ccc', borderRadius: '4px', padding: '20px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '10px' }}>Posting Transcript</h2>
          <pre style={{ whiteSpace: 'pre-wrap', overflowX: 'auto' }}>
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default App;