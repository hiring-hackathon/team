'use client'

import React, { useState } from 'react';
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'; // Import Menu icon from Lucide
import Link from 'next/link';

export default function Navbar() {
    const [state, setState] = useState(false);

    // Updated paths for the navigation
    const navigation = [
        { title: "Team", path: "/team" },
        { title: "Transcripts", path: "/transcripts" },
        { title: "Chat", path: "/chat" },
    ];

    return (
        <nav className="w-full border-b md:border-0 md:static">
            <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
                <div className="flex items-center justify-between  md:block">
                    <Link href="/" passHref>
                            <h1 className='font-bold text-xl cursor-pointer'>
                                Rilla++
                            </h1>
                    </Link>
                    <div className="md:hidden">
                        <button
                            className=" outline-none p-2 rounded-md focus:border"
                            onClick={() => setState(!state)}
                        >
                            {state ? <X size={24} /> : <Menu size={24} />} {/* Use Lucide's Menu and X icons */}
                        </button>
                    </div>
                </div>
                <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}>
                    <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                        {navigation.map((item, idx) => (
                            <li key={idx} className="hover:text-primary">
                                <a href={item.path}>
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};