'use client'
import React, { useEffect, useState } from 'react'
import TranscriptItem from '@/components/core/Transcripts';
import { Button } from '@/components/ui/button';

export default function Transcripts() {
  const [transcripts, setTranscripts] = useState<string[]>(["Here's a long paragraph that you can use:In today's fast-paced and ever-evolving business environment, companies are constantly seeking innovative ways to improve their operations and stay ahead of the competition. One of the critical areas of focus is optimizing the performance of outside sales and service teams. These teams are often the front line of an organization, responsible for building relationships, closing deals, and ensuring customer satisfaction. However, managing and analyzing their activities can be a daunting task, especially when dealing with large volumes of data and complex interactions. To address this challenge, we are developing a comprehensive platform that leverages cutting-edge technology to enhance the efficiency and effectiveness of outside sales and service operations. Our platform is designed to streamline the management of sales transcripts, allowing managers to add, edit, and delete comments on specific parts of a transcript, attach files, and generate concise summaries using advanced language models. This feature-rich solution is aimed at transforming how sales interactions are documented and utilized, providing powerful tools for analysis and decision-making. With our platform, organizations can gain deeper insights into their sales processes, identify areas for improvement, and ultimately drive better business outcomes. By integrating state-of-the-art technology and user-friendly features, we are committed to delivering a solution that meets the needs of modern sales teams and helps them achieve their goals with greater efficiency and effectiveness.",
  "Transcript 2: The service call involved troubleshooting issues with the client's equipment...",
  "Transcript 3: The quarterly review focused on our sales targets and strategies for the next quarter...",
  "Transcript 4: During the product demo, we highlighted the new features and improvements...",
  "Transcript 5: The follow-up call was to check on the progress of the implementation..."])

  useEffect(() => {
    const fetchData = async () => {
      const data = await loadTranscripts();
    //   setTranscripts(data)s;
    };

    fetchData();
  }, []);

  const loadTranscripts = async () => {
    console.log('Loading transcripts...');
    // WILL UPDATE THIS LATER
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(['Transcript 1', 'Transcript 2']);

        
      }, 2000);
      return []
    });
  };

  return (

    <div className="bg-black ml-60 p-5">
      <p className="text-yellow-500 font-bold mb-5">Transcripts</p>
      {transcripts.length > 0 && (
        transcripts.map((transcript, index) => (
          <div key={index} className="mb-5">
            <TranscriptItem text={transcript} id={index} />
            
          </div>
        ))
      )}
    </div>
  );
  
}
