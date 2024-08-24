'use client';
import React from 'react';
import { useParams } from 'next/navigation';

const TranscriptPage = () => {
    const params = useParams();
    const transcriptId = Array.isArray(params.id) ? params.id[0] : params.id;

  return (
    <div className='flex   p-6 bg-gray-900 rounded-lg shadow-lg mx-auto mb-9 ml-60 h-screen'>
    <div className='p-5 text-white'>
        <p className='text-xl font-semibold mb-2'>Will continue tomorew</p>
        <div className='h-1 bg-yellow-600 w-24 mx-auto mb-4'></div>
      
      </div>
    </div>
  );
};

export default TranscriptPage;
