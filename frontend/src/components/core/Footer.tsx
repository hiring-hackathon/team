import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'; // Assuming you're using react-icons

const Footer: React.FC = () => {
  return (
    <footer className=" text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="text-center md:text-left mb-4 md:mb-0">
          <p className="text-lg font-semibold mb-2">Rilla</p>
          <p className="text-sm">© {new Date().getFullYear()} Rilla. All rights reserved.</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col md:flex-row mb-4 md:mb-0">
          <a href="/" className="text-white hover:text-gray-400 mx-2">Home</a>
          <a href="/about" className="text-white hover:text-gray-400 mx-2">About</a>
          <a href="/services" className="text-white hover:text-gray-400 mx-2">Services</a>
          <a href="/contact" className="text-white hover:text-gray-400 mx-2">Contact</a>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <FaTwitter size={24} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <FaLinkedin size={24} />
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-400">
            <FaGithub size={24} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
