import type { Metadata } from "next";
import { inter } from "@/config/fonts";
import "./globals.css";
import { auth } from "@/auth.config";
import { SessionProvider } from "next-auth/react";
import NextAuthProvider from "@/components/provaiders/NextAuthProvider";
// import { NextAuthProvider } from "@/components/provaiders";

export const metadata: Metadata = {
  title: {
    template: "%s - Teslo | Shop",
    default: "Home - Teslo | Shop",
  },
  description: "Una tienda virtual de productos",
};
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider session={session}>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
