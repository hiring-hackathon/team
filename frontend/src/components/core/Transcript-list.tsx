'use client'
import React, { useEffect, useState } from 'react'
import TranscriptItem from './Transcript';
import { Button } from '@/components/ui/button';

interface Transcript {
    id: string;
    text: string;
    timestamp: string;
}


export default function Transcripts() {
  const [transcripts, setTranscripts] = useState<Transcript []>();

  useEffect(() => {
      const getTranscripts = async () => {
          const response = await fetch('/api/transcripts');
          const data = await response.json();
          setTranscripts(data);
      };

      getTranscripts();
  }, []);

  

  return (

    <div className="bg-black ml-60 p-5">
      <p className="text-yellow-500 font-bold mb-5">Transcripts</p>
      {transcripts.length > 0 && (
        transcripts.map((transcript, index) => (
          <div key={transcript.id} className="mb-5">
          
            <TranscriptItem text={transcript.text} id={transcript.id}  timestamp={transcript.timestamp}/>
            
          </div>
        ))
      )}
    </div>
  );
  
}
