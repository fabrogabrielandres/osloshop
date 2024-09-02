import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from "bcryptjs";
import { sleep } from "./app/utils";

const authConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/new-account",
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

        console.log("llegue", rest);

        // return user withOut password
        return rest;
      },
    }),
  ],
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig);
