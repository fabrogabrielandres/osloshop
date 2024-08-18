"use server";

import prisma from "@/lib/prisma";

interface Props{
    number:number
}


export const sleep = (seconds: number = 12) => {

    return new Promise( resolve => {
      setTimeout(() => {
        resolve(true);
      }, seconds * 1000 );
    })
}

export const getStockBySlug = async (slug: string): Promise<number> => {
  try {
    await sleep(15)
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
