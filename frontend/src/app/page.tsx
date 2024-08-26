import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import Features from "@/components/landing/features";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          {/* Uncomment this section if you want to include the List button
          <Link href="/transcripts">
            <Button>
              List
            </Button>
          </Link>
          */}
          <Features />
        </div>
      </main>
      <Footer />
    </div>
  );
}
