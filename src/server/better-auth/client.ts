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
  await authClient.signOut();
};

export const getSession = async () => {
  await authClient.getSession();
};