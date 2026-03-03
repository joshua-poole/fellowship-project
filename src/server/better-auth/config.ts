import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import { env } from "~/env";
import { db } from "~/server/db";

export const auth = betterAuth({
  baseURL: env.BETTER_AUTH_URL as string,
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: {
    google: {
      clientId: env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: env.BETTER_AUTH_GOOGLE_CLIENT_SECRET as string,
      redirectURI: env.BETTER_AUTH_URL as string + "/api/auth/callback/google",
    },
  },
});

export type Session = typeof auth.$Infer.Session;
