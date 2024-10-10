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
        producStock:{
          select: {
          producStockId:false,
          product:false,
          id:true,
          S:true,
          XS:true,
          L:true,
          M:true,
          XL:true,
          XXL:true,
          XXXL:true,
          }
        }
      },
      where: {
        slug: slug,
      },
    });

    if (!productPrisma) return null;

    const images = productPrisma?.ProcutImage.map((url) => url.url);
    const { ProcutImage, ...rest } = productPrisma;
    const productParce = { ...rest, images };
    console.log("productParce",productParce);
    
    return productParce;
  } catch (error) {
    throw new Error(`No se pudo cargar los productos ${error}`);
  }
};
