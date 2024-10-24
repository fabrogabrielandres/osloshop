"use server";

import { sleep } from "@/utils";
import prisma from "@/lib/prisma";
import { ProductStock } from "@/interfaces";

export const getStockBySlug = async (slug: string):Promise<ProductStock | null> => {
  try {
    // await sleep(2)
    const stock = await prisma.product.findUnique({
      where: {
        slug: slug,
      },
      select: {
        producStock: true,
      },
    });

    const producStock =stock?.producStock;
    
    
    return producStock!;
  } catch (error) {
    return null;
  }
};
