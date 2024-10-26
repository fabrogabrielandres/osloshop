"use server";

import prisma from "@/lib/prisma";

import { Gender } from "@prisma/client";

interface Props {
  page?: number;
  take?: number;
  gender?:Gender 
}

export const getPaginatedProductWithImages = async ({
  page = 1,
  take = 12,
  gender 
}: Props) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    // 1. get products
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        ProcutImage: {
          take: 2,
          select: {
            url: true,
          },
        }
      },
      where: {
        gender: gender 
      }
    });

    //2. get page total
    const numberOfProducts = await prisma.product.count({
      where:{
        gender:gender
      }
    });
    const totalPages = Math.ceil(numberOfProducts / take);
    

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProcutImage.map((image) => image.url),
      })),
    };
  } catch (error) {
    throw new Error("No se pudo cargar los productos");
  }
};
