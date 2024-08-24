'use client'
import React from 'react';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

interface TranscriptProps {
  text: string;
  id: number
}


export default function TranscriptItem({ text, id }: TranscriptProps) {
    const router = useRouter();
    
  const handleRedirect = (index: number) => {
    // Encode the transcript text for use in the URL
    router.push(`/transcript?id=${index}`);
  };


  return (
    <div className='flex   p-6 bg-gray-900 rounded-lg shadow-lg mx-auto mb-9'>
        <div className='p-5 text-white'>
            <p className='text-xl font-semibold mb-2'>{text}</p>
            <div className='h-1 bg-yellow-600 w-24 mx-auto mb-4'></div>
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
