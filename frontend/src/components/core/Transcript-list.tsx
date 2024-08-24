'use client'
import React, { useEffect, useState } from 'react';
import TranscriptItem from './Transcript';
import { Button } from '@/components/ui/button';

interface Transcript {
  id: string;
  text: string;
  timestamp: string;
}

export default function Transcripts() {
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [addTranscript, setAddTranscript] = useState(false);

  useEffect(() => {
    // Set transcripts to an empty array initially
    setTranscripts([]);

    // Fetch data from the API Gateway endpoint
    fetch('https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test/transcriptions')
      .then(response => {
        if (!response.ok) {
          // Log response status if not ok
          console.error('Network response was not ok:', response.statusText);
          return;
        }
        return response.json(); // Parse the JSON
      })
      .then(data => {
        console.log('Fetched data:', data);
        // Extract and parse the 'body' field from the response
        const { body } = data;
        const parsedBody = JSON.parse(body);

        // Map the parsed body to the desired format
        const formattedTranscripts = parsedBody.map((item: any) => ({
          id: item.TranscriptId,
          text: item.TranscriptText,
          timestamp: new Date().toISOString() // If you have a timestamp, replace with the actual value
        }));

        console.log('Formatted transcripts:', formattedTranscripts);
        setTranscripts(formattedTranscripts); 
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="bg-black ml-60 p-5">
      <div className='flex justify-between'>
        <p className="text-yellow-500 font-bold mb-5">Transcripts</p>
        {/* Example Button */}
        {/* <Button className="bg-blue-500 text-white" onClick={() => setAddTranscript(!addTranscript)}>
          {addTranscript ? 'Cancel' : 'Add Transcript'}
        </Button> */}
      </div>
      {transcripts.length > 0 ? (
        transcripts.map((transcript) => (
          <div key={transcript.id} className="mb-5">
            <TranscriptItem text={transcript.text} id={transcript.id} timestamp={transcript.timestamp} />
          </div>
        ))
      ) : (
        <p className="text-white">No transcripts available.</p>
      )}
    </div>
  );
}
