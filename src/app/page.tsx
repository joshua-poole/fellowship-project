"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { authClient } from "~/server/better-auth/client";
import { NavBar } from "~/components/NavBar";
import { Dashboard }  from "~/components/Dashboard";
import { Sidebar } from "~/components/Sidebar";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <main className="min-h-screen pl-12 pt-12 text-black bg-(--palette-gray-gray25)">
      <NavBar />
      <Sidebar />
      <Dashboard />
    </main>
  );
}
