"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

export default function NextAuthProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? "",
        intent:"capture",
        currency:"USD"
      }}
    >
      <SessionProvider session={session}>{children}</SessionProvider>
    </PayPalScriptProvider>
  );
}
