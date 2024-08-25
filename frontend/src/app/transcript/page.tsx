'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/components/core/Sidebar';

const TranscriptPage = () => {
 

  return (
    <div className='flex   p-6 bg-gray-900 rounded-lg shadow-lg mx-auto mb-9 ml-60 h-screen'>
      <Sidebar />
    <div className='p-5 text-white'>
        <p className='text-xl font-semibold mb-2'>Will continue tomorrow</p>
        <div className='h-1 bg-yellow-600 w-24 mx-auto mb-4'></div>
      
      </div>
    </div>
  );
};

export default TranscriptPage;
