import { Button } from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      Rilla Voice
      <Link href="/transcripts">
        <Button>
          List
        </Button>
      </Link>
    </main>
  );
}
