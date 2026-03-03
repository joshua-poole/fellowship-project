import { HydrateClient } from "~/trpc/server";
import { NavBar } from "~/app/_components/NavBar";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="min-h-screen text-black">
        <header>
          <NavBar />
        </header>
      </main>
    </HydrateClient>
  );
}
