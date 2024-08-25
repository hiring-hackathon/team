'use client'
import React from 'react';
import Image from 'next/image'; // Import Image from next/image
import { Button } from "@/components/ui/button";
import Navbar from './Navbar';

const teamMembers = [
  {
    name: 'Shaun Jhingoor',
    role: 'Backend, AI Engineer',
    photo: '/path/to/Shaun.jpg',
  },
  {
    name: 'Derek Gomez',
    role: 'Backend, AI Engineer',
    photo: '/path/to/Derek.jpg',
  },
  {
    name: 'Lloyd Chang',
    role: 'Frontend, Backend, AI Engineer',
    photo: '/path/to/Lloyd.jpg',
  },
  {
    name: 'David Muturi',
    role: 'Frontend, AI Engineer',
    photo: '/path/to/Muturi.jpg',
  },
  {
    name: 'Faith Nchang',
    role: 'Frontend, UI/UX Designer, AI Engineer',
    photo: '/path/to/Faith.jpg',
  },
];

// Sort team members alphabetically by name
teamMembers.sort((a, b) => a.name.localeCompare(b.name));

export default function MeetTheTeam() {
  return (
    <div className="p-10 bg-black">
      <Navbar />
      <p className="text-yellow-400 font-bold text-center text-3xl mb-8 mt-20">Meet the Team</p>

      <div className="p-8 bg-black">
        <div className="flex flex-wrap gap-6 justify-center">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-gray-900 p-6 text-center text-yellow-50 rounded-lg shadow-md max-w-xs flex-1">
              <Image
                src={member.photo}
                alt={`${member.name}'s photo`}
                width={96}  // Specify width
                height={96} // Specify height
                className="rounded-full object-cover mb-4"
              />
              <h2 className="text-xl font-semibold mb-2 text-yellow-200">{member.name}</h2>
              <p className="text-yellow-300 mb-4">{member.role}</p>
              <Button className="bg-yellow-500 text-gray-900 hover:bg-yellow-600">
                Contact
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
