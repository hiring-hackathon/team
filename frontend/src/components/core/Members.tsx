'use client'
import React from 'react';
import { Button } from "@/components/ui/button";
import Navbar from './Navbar';

const teamMembers = [
  {
    name: 'Shaun',
    role: 'Backend - AWS ',
    photo: '/path/to/Shaun.jpg',
  },
  {
    name: 'Derek',
    role: 'AI integration',
    photo: '/path/to/Derek.jpg',
  },
  {
    name: 'Lloyd Chang',
    role: 'Backend - S3 and DynamoDB',
    photo: '/path/to/Lloyd.jpg',
  },
  {
    name: 'Muturi',
    role: 'Frontend and LLM AI Integration',
    photo: '/path/to/Muturi.jpg',
  },
  {
    name: 'Faith Nchang',
    role: 'Frontend, UI/UX Designer',
    photo: '/path/to/Faith.jpg',
  },
];

export default function MeetTheTeam() {
  return (
   
    <div className="p-10 bg-black">
       <Navbar />
      <p className="text-yellow-400 font-bold text-center text-3xl mb-8 mt-20">Meet the Team</p>

      <div className="p-8 bg-black">
        <div className="flex flex-wrap gap-6 justify-center">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-gray-900 p-6 text-center text-yellow-50 rounded-lg shadow-md max-w-xs flex-1">
              <img
                src={member.photo}
                alt={`${member.name}'s photo`}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
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
