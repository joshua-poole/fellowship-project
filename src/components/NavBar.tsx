"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { authClient, signOut } from "~/server/better-auth/client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Logo } from "./Logo";

export function NavBar() {
  const { data: session } = authClient.useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between p-4">
      <Link href="/">
        <Logo/>
      </Link>
      <div className="flex items-center gap-3">
        {session ? (
          <>
            {session.user.image && (
              <Image
                src={session.user.image}
                alt={session.user.name}
                width={32}
                height={32}
                className="h-8 w-8 rounded-full"
              />
            )}
            <span className="text-sm text-gray-700">{session.user.name}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              Sign out
            </Button>
          </>
        ) : (
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
