"use client";
import React, { useState} from "react";
import Sidebar from "@/components/core/Sidebar";
import Transcripts from "@/components/core/Transcript-list";

export default function Dashboard() {
  const [transcripts, setTranscripts] = useState([]);



  const deleteComment = () => {
    console.log("Hello world");
  };

  const addComment = () => {
    // Functionality to add a comment
  };

  const updateComment = () => {
    // Functionality to update a comment
  };

  const addFileToComment = () => {
    // Functionality to add a file to a comment
  };

  return (
    <main className="bg-black min-h-screen">
      <div className="flex">
        <Sidebar />
          <Transcripts />
      </div>
    </main>
  );
}
