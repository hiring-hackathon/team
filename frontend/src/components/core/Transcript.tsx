'use client'
import React from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';


interface Transcript {
  id: string;
  text: string;
  timestamp: string;
}


export default function TranscriptItem({id, text, timestamp}: Transcript) {
    const router = useRouter();
    
  const handleRedirect = (transcriptId: String) => {
    // redirects to a specific transcript page
    router.push(`/transcripts/${transcriptId}`);
  };

  return (
    <div className='flex   p-6 bg-gray-900 rounded-lg shadow-lg mx-auto mb-9'>
        <div className='p-5 text-white'>
           
            <p className='h-1 bg-yellow-600  mx-auto mb-8'>
                Transcript - {id}
            </p>

            <p className='text-gray-200 mb-8'>
              {new Date(timestamp).toLocaleString()}
            </p>

            <p className='py-5'>
            {text}
            </p>
            <Button
              className="mt-3 text-white bg-yellow-500 hover:bg-yellow-400"
              onClick={() => handleRedirect(id)}
              
            >
              View Transcript
            </Button>
        </div>
</div>

  );
}
