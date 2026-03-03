import { createAuthClient } from "better-auth/react";
import { headers } from "next/headers";
import { auth } from "./config";

export const authClient = createAuthClient();

export type Session = typeof authClient.$Infer.Session;

export const signInWithGoogle = async () => {
  const data = await authClient.signIn.social({
    provider: "google",
    callbackURL: "/dashboard",
    errorCallbackURL: "/error",
    newUserCallbackURL: "/welcome",
    disableRedirect: true,
  });
  return data;
}; 

export const signOut = async () => {
  const data = await authClient.signOut();
  return data;
};

export const getSession = async () => {
  const data = await authClient.getSession();
  return data;
};

export const getUser = async () => {
  const data = await auth.api.getSession({ headers: await headers() });
  return data?.user?.name;
};

export const getUserId = async () => {
  const data = await auth.api.getSession({ headers: await headers() });
  return data?.user?.id;
};

export const getUserEmail = async () => {
  const data = await auth.api.getSession({ headers: await headers() });
  return data?.user?.email;
};