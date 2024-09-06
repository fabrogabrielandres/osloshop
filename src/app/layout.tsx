import type { Metadata } from "next";
import { inter } from "@/config/fonts";
import "./globals.css";
import NextAuthProvider from "@/components/provaiders/NextAuthProvider";
import { auth } from "@/auth.config";


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
  console.log("server side",session, new Date());
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider session={session}>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
