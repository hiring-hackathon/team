"use client"; 
import React , { useState} from 'react'
 import { Button } from "@/components/ui/button"
 import { FileUp } from 'lucide-react';
 import { Trash2 } from 'lucide-react';
 import { Pencil } from 'lucide-react';




 interface CommentProps {
    comment: string
    deleteComment: () => void;
    editComment: () => void;
    attachFile: () => void;
}

export default function Comment({ comment, deleteComment, editComment, attachFile }: CommentProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
    <div className=" z-50">
    {/* Floating Button */}
    {!isOpen && <Button
        onClick={()=> setIsOpen(true)}
        className="bg-gray-600 text-white p-4 rounded-full shadow-lg focus:outline-none"
    >
        💬
    </Button>}

    {/* Comment Box */}
    {isOpen && (
        <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-2 w-80 mt-2">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Comment</h2>
                 <Button onClick={editComment} variant={'ghost'}>
                    <Pencil />
                 </Button>
                 <Button variant={'destructive'} size={'icon'} onClick={deleteComment}>
                        <Trash2 />
                    </Button>

                <Button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700" size={'sm'} variant='secondary'>
                ✖️
                </Button>
            </div>
            <div className="overflow-y-auto h-40">
                <div className="mb-2">
                    <p className="text-sm">{comment} </p>
                </div>
                <div className="flex justify-between items-center mb-4">
                    <Button variant={'ghost'} onClick={attachFile}>
                    <FileUp />
                    </Button>
                  
                    
                </div>

            </div>
            
        </div>
    )}
</div>
);
}
