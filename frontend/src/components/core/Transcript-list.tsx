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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setSummary('');
    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ transcripts }),
      });

      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (data.summary) {
          setSummary(data.summary);
        } else {
          setSummary('Failed to generate summary. No summary data received.');
        }
      } else {
        // If the response is not JSON, read it as text
        const text = await response.text();
        console.error('Received non-JSON response:', text);
        if (text.includes('<!DOCTYPE html>')) {
          setSummary('Error: Received HTML instead of JSON. This might indicate a server-side error.');
        } else {
          setSummary(`Error: Received unexpected response from server. Status: ${response.status}`);
        }
      }
    } catch (error) {
      console.error('Error generating summary:', error);
      if (error instanceof SyntaxError) {
        setSummary('Error: Received invalid JSON from server.');
      } else if (error instanceof TypeError) {
        setSummary('Error: Network issue or CORS problem. Check the console for more details.');
      } else {
        setSummary(`Error generating summary: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchTranscripts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test/transcriptions');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const { body } = data;
        const parsedBody = JSON.parse(body);

        const formattedTranscripts = parsedBody.map((item: any) => ({
          id: item.TranscriptId,
          text: item.TranscriptText,
          timestamp: new Date().toISOString() // If you have a timestamp, replace with the actual value
        }));

        setTranscripts(formattedTranscripts);
      } catch (error) {
        console.error('Error fetching transcripts:', error);
        // You might want to set an error state here to display to the user
      } finally {
        setIsLoading(false);
      }
    };

    fetchTranscripts();
  }, []);

  return (
    <div className="bg-black ml-60 p-5">
      <div className="flex justify-between items-center top-0 ml-28 bg-black left-28 right-0 p-5 fixed shadow-md z-50">
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
                  <Button 
                    onClick={handleGenerateSummary} 
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mt-4"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Generating...' : 'Generate Summary'}
                  </Button>
                </DialogTitle>
                <DialogDescription className="mt-4">
                  {summary || (isLoading ? 'Generating summary...' : '')}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isLoading ? (
        <p className="text-white mt-14">Loading transcripts...</p>
      ) : transcripts.length > 0 ? (
        transcripts.map((transcript) => (
          <div key={transcript.id} className="mb-5 mt-14">
            <TranscriptItem text={transcript.text} id={transcript.id} timestamp={transcript.timestamp} />
          </div>
        ))
      ) : (
        <p className="text-white mt-14">No transcripts available.</p>
      )}
    </div>
  );
}
