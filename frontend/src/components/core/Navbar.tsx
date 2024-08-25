import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Import your Button component
import { GiHamburgerMenu } from 'react-icons/gi'; // Import hamburger menu icon

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-black p-4 mb-10">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Logo or Brand Name */}
        <div className="text-white text-3xl font-semibold hover:text-green-400 transition-colors duration-300">
          Rilla 
        </div>

        {/* Hamburger Menu */}
        <div className="block lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <GiHamburgerMenu size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <div className={`lg:flex lg:space-x-6 ${isOpen ? 'block' : 'hidden'}`}>
          <a href="/dashboard" className="text-white text-xl hover:text-yellow-400 transition-colors duration-300">
            Dashboard
          </a>
          <a href="/" className="text-white text-xl hover:text-yellow-400 transition-colors duration-300">
            Home
          </a>
          <a href="/transcripts" className="text-white text-xl hover:text-yellow-400 transition-colors duration-300">
            Transcripts
          </a>
          <a href="/team" className="text-white text-xl hover:text-yellow-400 transition-colors duration-300">
            Team
          </a>
        </div>

        <Button
          className="bg-black text-white hover:bg-yellow-400 hover:text-black transition-colors duration-300 mt-4 lg:mt-0"
          size="sm"
        >
          Contact Us
        </Button>
      </div>
    </nav>
  );
}
