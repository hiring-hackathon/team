import React from 'react'
import transcript from '/Images/sales_transcript.jpg'
import Image from 'next/image'
export default function description() {
  return (
    
<div className="p-20">
{/* First Section */}
<div className="flex flex-col md:flex-row items-center gap-8 mb-24">
    <div className="w-full md:w-1/2 p-12">
        <p className="text-lg md:text-xl leading-relaxed text-white">
        Get visibility into 100% of your sales conversations and improve your close rates.
        </p>
    </div>
    <div className="w-full md:w-1/2">
        <Image
        alt="transcript doc"
        src={'/images/sales_transcript.jpg'}
        width={400}
        height={300}
        className="transition-transform duration-500 transform hover:scale-105"
        />
    </div>
</div>
    {/* Second Section */}

    <div className="flex flex-col md:flex-row items-center gap-8 mb-8 pb-10">
    <div className="w-full md:w-1/2 p-12">
    <Image 
            alt="transcript" 
            src="/images/sales_transcript.jpg"
            width={400} 
            height={100} 
            className="transition-transform duration-500 transform hover:scale-105"
        />
    </div>
    <div className="w-full md:w-1/2">
    <p className="text-lg md:text-xl leading-relaxed  text-white">
    40% Avg increase in close rates. | 8X Avg time savings for Sales Managers. | 17% Avg increase in ticket price.
        </p>
    </div>
        <div>

        </div>
    </div>
</div>
  )
}

