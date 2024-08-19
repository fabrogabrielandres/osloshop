"use server";

import { sleep } from "@/app/utils";
import prisma from "@/lib/prisma";

interface Props{
    number:number
}

export const getStockBySlug = async (slug: string): Promise<number> => {
  try {
    // await sleep(2)
    const stock = await prisma.product.findUnique({
      where: {
        slug: slug,
      },
      select: {
        inStock: true,
      },
    });
    return stock?.inStock ?? 0;
  } catch (error) {
    return 0;
  }
};
