import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from 'zod';

const authConfig: NextAuthConfig = {
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/new-account",
    },
    providers: [
        Credentials({
            async authorize(credentials) {
              const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);

                if(!parsedCredentials.success) return null
           
                const { email, password } = parsedCredentials.data;
                console.log(email, password);
                return null
                

            },
          }),
    ]
};




export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth(authConfig)
