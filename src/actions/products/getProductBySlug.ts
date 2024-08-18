"use server";

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
  try {
    const productPrisma = await prisma.product.findUnique({
      include: {
        ProcutImage: {
          select: {
            url: true,
          },
        },
      },
      where: {
        slug: slug,
      },
    });

    if (!productPrisma) return null;

    const images = productPrisma?.ProcutImage.map((url) => url.url);
    const { ProcutImage, ...rest } = productPrisma;
    const productParce = { ...rest, images };
    return productParce
  } catch (error) {
    throw new Error(`No se pudo cargar los productos ${(error)}`);
  }
};
