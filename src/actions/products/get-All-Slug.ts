"use service";

import prisma from "@/lib/prisma";

export const getAllSlugs = async () => {
  try {
    const allSulgs = await prisma.product.findMany({
      select: {
        slug: true,
      },
    });
    return allSulgs;
  } catch (error) {
    return [];
  }
};
