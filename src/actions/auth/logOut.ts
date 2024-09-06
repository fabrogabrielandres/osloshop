"use server";

import { signOut } from "@/auth.config";


export const logOut = async () => {
  await signOut();
};
