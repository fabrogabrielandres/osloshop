"use server";

import prisma from "@/lib/prisma";

interface Props {
  userId: string;
}

export const deleteUserAddress = async ({ userId }: Props) => {
  try {
    const userdeleted = await prisma.addressUser.delete({
      where: {
        userId: userId,
      },
    });
    return {
      ok: true,
      userdeleted,
    };
  } catch (error) {
    return{
        ok:false,
        messagge:"error when trying to delete a user"
    }
  }
};
