"use server";

import { signIn } from "@/auth.config";
import { AuthError } from "next-auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    const { email, password } = Object.fromEntries(formData);
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return "Success";
  } catch (error) {
    return "CredentialsSignin";

    // if (error instanceof AuthError) {
    //   switch (error.type) {
    //     case 'CredentialsSignin':
    //       return 'Invalid credentials.';
    //     default:
    //       return 'Something went wrong.';
    //   }
    // }
    // throw error;
  }
}
