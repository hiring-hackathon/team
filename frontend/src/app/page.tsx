"use client"; 
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Navbar from "@/components/core/Navbar";
import Description from "@/components/core/description";
import Features from "@/components/core/Features";
import Footer from "@/components/core/Footer";


export default function Home() {
  const [transcripts, setTranscripts] = useState([])
  
  return (

    <main className="page-container min-h-screen items-center justify-center">
      Rilla Voice
    <main className="bg-black ">
       

       <div >
      
       <Navbar />
             
        <Description />

        <Features />

        <Footer />

        

       </div>
    
    </main>
    </main>
  );
}