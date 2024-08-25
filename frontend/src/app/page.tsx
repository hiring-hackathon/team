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


      {/* <Footer /> */}
    </main>
  );
}
