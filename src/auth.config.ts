import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from "bcryptjs";

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
  },
  callbacks: {

    // authorized({ auth, request: { nextUrl } }) {
    //   console.log({ auth });
    //   // const isLoggedIn = !!auth?.user;

    //   // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
    //   // if (isOnDashboard) {
    //   //   if (isLoggedIn) return true;
    //   //   return false; // Redirect unauthenticated users to login page
    //   // } else if (isLoggedIn) {
    //   //   return Response.redirect(new URL('/dashboard', nextUrl));
    //   // }
    //   return true;
    // },

    jwt({ token, user }) {
      if ( user ) {
        token.data = user;
      }

      return token;
    },

    session({ session, token, user }) {
      session.user = token.data as any;
      return session;
    },



  },

  providers: [
    Credentials({
      async authorize(credentials) {
        // get email and password from the form and validate
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        if (!parsedCredentials.success) return null;
        const { email, password: passwordForm } = parsedCredentials.data;

        //find the email in Db.
        const user = await prisma.user.findUnique({
          where: {
            email: email.toLocaleLowerCase(),
          },
        });
        if (!user) return null;

        //compare passwords from the form and Db
        if (!bcryptjs.compareSync(passwordForm, user.password)) return null;

        const { password, ...rest } = user;

          // return user withOut password
        return rest;
      },
    }),
  ],
  
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
