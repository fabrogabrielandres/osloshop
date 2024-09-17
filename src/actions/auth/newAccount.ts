"use server";

import { signIn } from "@/auth.config";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

interface Props {
  name: string;
  email: string;
  password: string;
}

export const newAccount = async ({ name, email, password }: Props) => {
  try {
    const responce = await prisma.user.create({
      data: {
        email,
        name,
        password: bcryptjs.hashSync(password),
      },
      select: {
        email: true,
        id: true,
        name: true,
      },
    });
    return {
      ok: true,
      user: responce,
      message: "Profile was created",
    };
    
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "something was wrong",
      error:JSON.parse(JSON.stringify(error,null,2)).meta.target
    };
  }
};
