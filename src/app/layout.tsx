import {
  ClerkProvider,
  // SignInButton,
  // SignedIn,
  // SignedOut,
  // UserButton
} from '@clerk/nextjs'
import type { Metadata } from "next";
import localFont from "next/font/local";
import '@radix-ui/themes/styles.css';
import "@copilotkit/react-ui/styles.css";
import "./globals.css";

import { Theme } from '@radix-ui/themes';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "QuesRAG",
  description: "RAG app to chat with documents. Built using nextjs, tailwindcss, radix-ui, copilotkit, clerk, prisma, postgresql, mongodb, ChatGPT, GoogleGemini. AI application for chat with documents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Theme appearance='dark' accentColor='cyan'>
            {children}
          </Theme>
        </body>
      </html>
    </ClerkProvider>
  );
}
