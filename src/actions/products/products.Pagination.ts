"use server";

import { TypeProduct } from "@/interfaces";
import prisma from "@/lib/prisma";

export const getPaginatedProductWithImages = async () => {
  try {
    const products = await prisma.product.findMany({
      include: {
        ProcutImage: {
          take: 2,
          select: {
            url: true,
          },
        },
      },
    });

    const productsData = products.map((product) => {
      const { ProcutImage, categoryId, ...rest } = product;
      const images = ProcutImage.map((images) => images.url);
      const productWithImage = { ...rest, images };
      return productWithImage;
    });

    return productsData;
  } catch (error) {
    return [];
  }
};
