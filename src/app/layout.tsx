import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Airtable: Build Enterprise-ready AI Workflows, Apps & Agents - Airtable",
  description: "500,000+ brands use Airtable to enable real-time collaboration, automate repetitive tasks & manual work, and streamline business processes in minutes. Join them.",
  icons: [{ rel: "icon", url: "/favicon.ico" }], // TODO: Change to the actual icon
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit: "cover",
  },
  openGraph: {
    title: "Airtable: Build Enterprise-ready AI Workflows, Apps & Agents - Airtable",
    description: "500,000+ brands use Airtable to enable real-time collaboration, automate repetitive tasks & manual work, and streamline business processes in minutes. Join them.",
    url: "https://airtable.com", // TODO: Change to the actual URL
    siteName: "Airtable",
    images: [{ url: "/airtable-seo.jpg" }], // TODO: Change to the actual image
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
