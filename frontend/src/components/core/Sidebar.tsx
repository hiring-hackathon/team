import React from 'react';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component

export default function Sidebar() {
  return (
    <aside className="bg-gray-900 h-screen p-4 w-30 fixed top-0 left-0 flex flex-col ">
      {/* Logo or Brand Name */}
      <div className="text-yellow-500 text-3xl font-semibold hover:text-green-100 transition-colors duration-300 mb-10">
        Rilla 
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col space-y-10">
        <a href="/" className="text-white text-xl hover:text-yellow-500 transition-colors duration-300 pb-10">
          Home
        </a>
        <a href="/transcripts" className="text-white text-xl hover:text-yellow-500 transition-colors duration-300 pb-10">
          Transcripts
        </a>
        

        <a
        className="text-white text-xl hover:text-yellow-500 transition-colors duration-300 pb-10 "
        href="/chat"
        >
        Chat
      </a>
      <a href="/team" className="text-white text-xl hover:text-yellow-500 transition-colors duration-300 pb-10">
          Team
        </a>



      </div>
      
      
       
     
      
      
    </aside>
  );
}
