// src/components/core/generate-summary.ts

'use client'
import React, { useEffect, useState } from 'react';
import TranscriptItem from './Transcript';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  

interface Transcript {
  id: string;
  text: string;
  timestamp: string;
}

export default function Transcripts() {
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [summary, setSummary] = useState<string>('');

  const handleGenerateSummary = async () => {
    setSummary('');
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcripts }), // Send as array of objects
      });
  
      const data = await response.json();
      if (data.summary) {
        setSummary(data.summary);
      } else {
        console.error('No summary received from API');
        setSummary('Failed to generate summary. Please try again.');
      }
    } catch (error) {
      console.error('Error generating summary:', error);
      setSummary('An error occurred while generating the summary. ' + error);
    }
  };
  
  

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
      <div className="flex justify-between items-center top-0  ml-28  bg-black left-28 right-0 p-5 fixed shadow-md z-50 ">
    <div>
        <p className="text-yellow-500 font-bold text-xl">Transcripts</p>
    </div>
    <div>
        <Dialog>
            <DialogTrigger className="text-white hover:text-yellow-300 transition-colors duration-300">
                Generate Summary
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <Button onClick={handleGenerateSummary} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mt-4">
                            Generate Summary
                        </Button>
                    </DialogTitle>
                    <DialogDescription className="mt-4">
                        {summary}
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    </div>
</div>
       

        {/* Example Button */}
        {/* <Button className="bg-blue-500 text-white" onClick={() => setAddTranscript(!addTranscript)}>
          {addTranscript ? 'Cancel' : 'Add Transcript'}
        </Button> */}
      {transcripts.length > 0 ? (
        transcripts.map((transcript) => (
          <div key={transcript.id} className="mb-5 mt-14">
            <TranscriptItem text={transcript.text} id={transcript.id} timestamp={transcript.timestamp} />
          </div>
        ))
      ) : (
        <p className="text-white">No transcripts available.</p>
      )}
    </div>
  );
}