// frontend/src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CSPostHogProvider } from './providers';



// Import Inter font
const inter = Inter({ subsets: ["latin"] });

// Define metadata for the application
export const metadata: Metadata = {
  title: "Rilla Trancriptions",
  description: "",
};

// Consolidated RootLayout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Use PostHog provider for analytics if needed */}
      <CSPostHogProvider>

        <body className={inter.className}>{children}</body>

      </CSPostHogProvider>
    </html>
  );
}
