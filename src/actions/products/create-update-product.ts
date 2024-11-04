"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Gender, Product, Size } from "@prisma/client";
import { z } from "zod";
import {v2 as cloudinary} from 'cloudinary';
cloudinary.config( process.env.CLOUDINARY_URL ?? '' );

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string().max(1500),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  XS: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  S: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  M: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  L: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  XL: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  XXL: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  XXXL: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((val) => val.split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export const createUpdateProduct = async (data: { [key: string]: any }) => {
  
  const productParsed = productSchema.safeParse(data);
  if (!productParsed.success) {
    return { ok: false, error: productParsed.error };
  }

  const dataProducts = productParsed.data;
  dataProducts.slug = dataProducts.slug.toLowerCase().replace(/ /g, "-").trim();
  const { id, XS, L, M, S, XL, XXL, XXXL, ...rest } = dataProducts;
  const stockProducts = {
    XS,
    L,
    M,
    S,
    XL,
    XXL,
    XXXL,
  };

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product;
      const tagsArray = rest.tags
        .split(",")
        .map((tag) => tag.trim().toLowerCase());

      if (id) {
        // Actualizar

        product = await prisma.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
            producStock: {
              upsert: {
                update: {
                  id,
                  ...stockProducts,
                },
                create: {
                  id,
                  ...stockProducts,
                },
              },
            },
          },
        });
        return { product, ok: true, message: "Update was success" };
      } else {
        // Crear
        product = await prisma.product.create({
          data: {
            ...rest,
            sizes: {
              set: rest.sizes as Size[],
            },
            tags: {
              set: tagsArray,
            },
            producStock: {
              create: {
                ...stockProducts,
              },
            },
          },
        });

        return { product, ok: true, message: "Create was success" };
      }
    });
    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${prismaTx.product.slug}`);
    revalidatePath(`/products/${prismaTx.product.slug}`);

    return {
      product: prismaTx.product,
      message: prismaTx.message,
      ok: prismaTx.ok,
    };
  } catch (error) {
    console.log("BBB", error);

    return {
      ok: false,
      message: JSON.stringify(error),
    };
  }
};

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString("base64");

        // return cloudinary.uploader.upload(`data:image/png;base64,${ base64Image }`)
        //   .then( r => r.secure_url );
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages;
  } catch (error) {
    console.log(error);
    return null;
  }
};
