import "~/styles/globals.css";

import { type Metadata, type Viewport } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { env } from "~/env";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover"
};

export const metadata: Metadata = {
  title: "Airtable: Build Enterprise-ready AI Workflows, Apps & Agents - Airtable",
  description: "500,000+ brands use Airtable to enable real-time collaboration, automate repetitive tasks & manual work, and streamline business processes in minutes. Join them.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  metadataBase: new URL(env.BETTER_AUTH_URL),
  openGraph: {
    title: "Airtable: Build Enterprise-ready AI Workflows, Apps & Agents - Airtable",
    description: "500,000+ brands use Airtable to enable real-time collaboration, automate repetitive tasks & manual work, and streamline business processes in minutes. Join them.",
    siteName: "Airtable",
    locale: "en_AU",
    type: "website",
  },
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" style={{ overflow: "auto" }} className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
