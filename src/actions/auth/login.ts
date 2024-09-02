'use server';
 
import { signIn } from '@/auth.config';
import { AuthError } from 'next-auth';
 
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    
    
    await signIn('credentials', formData);
    const { email, passoword  } = Object.fromEntries(formData)
    console.log("d",email, passoword);
    
    
  } catch (error) {
    return "CredentialsSignin"

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