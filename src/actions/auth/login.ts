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
    // console.log("log in try ");

    return "Success";
  } catch (error) {
    // console.log("log in catch ");
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
interface PropsLogin {
  email: string;
  password: string;
}
export const login = async ({ email, password }: PropsLogin) => {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    return "error in login credentials";
  }
};
