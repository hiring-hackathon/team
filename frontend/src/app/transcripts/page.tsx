
import TranscriptList from "@/components/core2/transcript-list";
export default function Page() {
    return (
        <main className="page-container min-h-screen items-center justify-center">
            <h1 className="text-3xl font-bold">Transcripts</h1>
            <TranscriptList />
        </main>
    );
}

'use client';
import React, { useState } from 'react';
import Sidebar from '@/components/core/Sidebar';
import Transcripts from '@/components/core/Transcript-list';

export default function TranscriptsPage() {
  return (
    <div className="flex min-h-screen ">
      <Sidebar />
      <div className="flex-1">
        <Transcripts />
      </div>
    </div>
  );
}
