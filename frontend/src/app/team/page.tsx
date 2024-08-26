'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import Navbar from '@/components/layout/nav';

// Define the team members' data
const teamMembers = [
    {
        name: 'David Muturi',
        role: 'AI Engineer, Full-Stack Lead',
        photo: '/images/David_Mutari.jpeg',
        email: 'muturidavid854@gmail.com',
        location: 'Nairobi, Nairobi County, Kenya'
    },
    {
        name: 'Derek Gomez',
        role: 'AI Engineer Lead, Full-Stack',
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
        role: 'AI Engineer, Full-Stack, Infrastructure Lead',
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

// Define the MeetTheTeam component
const MeetTheTeam: React.FC = () => {
    // State for managing toast notifications
    const [toast, setToast] = useState<{ show: boolean; message: string }>({ show: false, message: '' });

    // Effect to handle toast notification auto-dismiss
    useEffect(() => {
        if (toast.show) {
            const timer = setTimeout(() => {
                setToast({ show: false, message: '' });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toast.show]);

    // Function to handle contact click and copy email to clipboard
    const handleContactClick = (email: string) => {
        navigator.clipboard.writeText(email).then(() => {
            setToast({ show: true, message: `Email address copied: ${email}` });
        }).catch(err => {
            console.error('Failed to copy email: ', err);
            setToast({ show: true, message: 'Failed to copy email address' });
        });
    };

    return (
        <div className="p-10 min-h-screen">
            <div style={{ marginBottom: '60px', alignSelf: "center" }}>
                <Navbar />
            </div>
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
                                    loading="lazy"
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

            {/* New section for YouTube video reference and embed */}
            <div className="text-center my-8">
                <p className="text-yellow-400 font-bold text-2xl mb-4">Check out our team in action!</p>
                <p className="text-black mb-4">
                    Watch our video: <a href="https://www.youtube.com/watch?v=OIlAv2BzpxQ" className="underline hover:text-yellow-300" target="_blank" rel="noopener noreferrer">Team Showcase</a>
                </p>
                
                {/* YouTube video embed */}
                <div className="relative max-w-screen-lg mx-auto aspect-[9/16] w-full">
                    <iframe
                        src="https://www.youtube.com/embed/OIlAv2BzpxQ?autoplay=1"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute top-0 left-0 w-full h-full"
                    ></iframe>
                </div>
            </div>

            {/* Toast notification for feedback */}
            {toast.show && (
                <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded shadow-lg transition-opacity duration-300">
                    {toast.message}
                </div>
            )}
        </div>
    );
};

// Export the TeamPage component as the default export
export default function TeamPage() {
    return <MeetTheTeam />;
}
