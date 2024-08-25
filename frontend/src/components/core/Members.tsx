'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import Navbar from './Navbar';

const teamMembers = [
  {
    name: 'David Muturi',
    role: 'AI Engineer, Full-stack',
    photo: '/images/David_Mutari.jpeg',
    email: 'muturidavid854@gmail.com',
    location: 'Nairobi, Nairobi County, Kenya'
  },
  {
    name: 'Derek Gomez',
    role: 'AI Engineer, Full-stack',
    photo: '/images/Derek_Gomez.jpeg',
    email: 'dmatt.gomez@gmail.com',
    location: 'San Jose, California, United States'
  },
  {
    name: 'Faith Nchang',
    role: 'AI Engineer, Frontend Lead, UI/UX Designer',
    photo: '/images/Faith_Nchang.jpeg',
    email: 'nchangfru24@gmail.com',
    location: 'Washington DC-Baltimore Area, United States'
  },
  {
    name: 'Lloyd Chang',
    role: 'AI Engineer, Full-stack, Infrastructure Lead',
    photo: '/images/Lloyd_Chang.jpeg',
    email: 'lloydchang@gmail.com',
    location: 'San Francisco, California, United States'
  },
  {
    name: 'Shaun Jhingoor',
    role: 'AI Engineer, Backend Lead',
    photo: '/images/Shaun_Jhingoor.jpeg',
    email: 'jhingoor1945@gmail.com',
    location: 'New York, New York, United States'
  }
];

export default function MeetTheTeam() {
  const [toast, setToast] = useState({ show: false, message: '' });

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleContactClick = (email) => {
    navigator.clipboard.writeText(email).then(() => {
      setToast({ show: true, message: `Email address copied: ${email}` });
    }).catch(err => {
      console.error('Failed to copy email: ', err);
      setToast({ show: true, message: 'Failed to copy email address' });
    });
  };

  return (
    <div className="p-10 bg-black min-h-screen">
      <Navbar />
      <p className="text-yellow-400 font-bold text-center text-3xl mb-8 mt-20">Meet the Team</p>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {teamMembers.map((member, index) => (
            <div 
              key={index} 
              className="bg-gray-900 p-4 rounded-lg shadow-md text-center flex flex-col items-center justify-between h-full"
            >
              <div className="w-full">
                <Image
                  src={member.photo}
                  alt={`${member.name}'s photo`}
                  width={80}
                  height={80}
                  className="rounded-full object-cover mx-auto mb-4"
                />
                <h2 className="text-lg font-semibold mb-2 text-yellow-200">{member.name}</h2>
                <p className="text-yellow-300 text-sm mb-2">{member.role}</p>
                <p className="text-yellow-100 text-xs mb-2">{member.email}</p>
                <p className="text-yellow-100 text-xs mb-4">{member.location}</p>
              </div>
              <Button 
                className="bg-yellow-500 text-gray-900 hover:bg-yellow-600 text-sm py-2 px-4 w-full"
                onClick={() => handleContactClick(member.email)}
              >
                Copy Email
              </Button>
            </div>
          ))}
        </div>
      </div>
      
      {toast.show && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded shadow-lg transition-opacity duration-300">
          {toast.message}
        </div>
      )}
    </div>
  );
}
