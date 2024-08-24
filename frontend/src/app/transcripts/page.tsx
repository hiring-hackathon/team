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
