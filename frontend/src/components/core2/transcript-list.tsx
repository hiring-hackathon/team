// components/core2/transcript-list.tsx
'use client';

import { useState, useEffect } from 'react';
// import Link from 'next/link';
import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

interface Conversation {
    id: string;
    title: string;
    date: string;
}

export default function TranscriptList() {
    const [conversations, setConversations] = useState<Conversation[]>([]);

    useEffect(() => {
        fetch('https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test1/transcriptions')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:', data);
                setConversations(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            {conversations.map(conversation => (
                <Card key={conversation.id} className="p-4">
                    {conversation.title}
                </Card>
            ))}
        </div>
        // <div className="space-y-4">
        //     {conversations.map(conversation => (
        //         <Card key={conversation.id} className="p-4">
        //             <h2 className="text-xl font-bold">{conversation.title}</h2>
        //             <p>{new Date(conversation.date).toLocaleDateString()}</p>
        //             <Link href={`/transcripts/${conversation.id}`}>
        //                 <Button className="mt-2">View Transcript</Button>
        //             </Link>
        //         </Card>
        //     ))}
        // </div>
    );
}
// 'use client';

// import React, { useEffect } from 'react';


// export default function TranscriptList() {


//     useEffect(() => {
//         const fetchTranscripts = async () => {
//             const response = await fetch('https://jo589y2zh7.execute-api.us-east-1.amazonaws.com/test1/transcriptions');
//             const data = await response.json();
//             console.log(data)

//         };

//         fetchTranscripts();
//     }, []);

//     return (
//         <div>
//             view data in console
//         </div>
//     );
// }