import React from 'react';
import { Button } from '@/components/ui/button'; // Assuming you have a Button component

export default function Navbar() {
  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo or Brand Name */}
        <div className="text-white text-3xl font-semibold hover:text-green-400 transition-colors duration-300">
          Rail AI VOice
        </div>

        {/* Navigation Links */}
        <div className="space-x-6">
          <a href="/" className="text-white text-xl hover:text-green-400 transition-colors duration-300">
            Home
          </a>
          <a href="/transcripts" className="text-white text-xl hover:text-green-400 transition-colors duration-300">
            Transcripts
          </a>
         
          <a href="/teams" className="text-white text-xl hover:text-green-400 transition-colors duration-300">
            Teams
          </a>
        </div>

        <Button
          className="bg-black text-white hover:bg-green-400 hover:text-black transition-colors duration-300"
          size="sm"
        >
          Contact Us
        </Button>
      </div>
    </nav>
  );
}
