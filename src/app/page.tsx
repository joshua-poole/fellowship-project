import Link from "next/link";
import { api, HydrateClient } from "~/trpc/server";
// import { TaskDashboard } from "~/app/_components/TaskDashboard";
import { NavBar } from "~/app/_components/NavBar";

export default async function Home() {
  // Prefetch on the server so the client has data instantly
  // void api.task.getAll.prefetch();
  // void api.project.getAll.prefetch();

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
