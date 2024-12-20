export const revalidate = 0; // 1 day

import {
  ProductMobileSlideshow,
  ProductSliceShow,
  StockLabel,
} from "@/components";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui";
import { titleFont } from "@/config/fonts";
import { getProductBySlug } from "@/actions";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);

  return {
    title: product?.slug,
    description: product?.description,
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",
      // images: [], // https://tttttttttttyyyyyyyyyyyyy.com/products/image.png
      // images: [`/products/${product?.images[1].url}`],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  if (!product.images.length) {
    product.images.push({
      id: 2,
      url: "",
    });
  }

  return (
    <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2 ">
        {/* Mobile Slideshow */}
        <div className="md:hidden">
          <ProductMobileSlideshow
            title={product.title}
            images={product.images}
            className="block md:hidden"
          />
        </div>

        {/* Desktop Slideshow */}
        <div className="hidden md:block">
          <ProductSliceShow
            title={product.title}
            images={product.images}
            className="hidden md:block"
          />
        </div>
      </div>

      {/* Detalles */}

      <div className="col-span-1 px-5">
        <StockLabel slug={product.slug} />
        <h1 className={` ${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>

        <p className="text-lg mb-5">${product.price}</p>

        <AddToCart product={product} />
        {/* Descripción */}
        <h3 className="font-bold text-sm">Description</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
