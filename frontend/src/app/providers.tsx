// src/app/providers.tsx

'use client' // This directive tells Next.js that this file should be treated as a client component

import React from 'react';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

// Initialize PostHog on the client side
if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
    person_profiles: 'identified_only', // Adjust this based on your needs
  });
}

// Example context provider for PostHog
export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
