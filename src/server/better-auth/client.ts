import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient();

export type Session = typeof authClient.$Infer.Session;

export const signInWithGoogle = async () => {
  // TODO: change these to the correct callback URLs
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