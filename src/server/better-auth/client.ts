import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export type Session = typeof authClient.$Infer.Session;

export const signInWithGoogle = async () => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/",
    errorCallbackURL: "/login",
  });
};

export const signOut = async () => {
  const data = await authClient.signOut();
  return data;
};

export const getSession = async () => {
  const data = await authClient.getSession();
  return data;
};