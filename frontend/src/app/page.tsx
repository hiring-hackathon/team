import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <main className="page-container min-h-screen items-center justify-center">
      Rilla Voice
      <Link href="/transcripts">
        <Button>
          List
        </Button>
      </Link>
    </main>
  );
}
