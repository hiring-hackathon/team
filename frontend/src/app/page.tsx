import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/layout/nav";
import Footer from "@/components/layout/footer";
import Features from "@/components/landing/features";


export default function Home() {
  return (
    <main className="page-container items-center">
      <Navbar />
      <div className="min-h-screen items-center justify-center">
        {/* <Link href="/transcripts">
          <Button>
            List
          </Button>
        </Link> */}
        <Features />

      </div>


      <footer className="w-full text-center py-4 border-t mt-8">
                © 2024 Rilla All Rights Reserved
            </footer>
    </main>
  );
}
