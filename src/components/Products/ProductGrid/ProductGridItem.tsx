"use client";

import { currencyFormat } from "@/utils";
import { Product } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
import { ProductImage } from "@/components/Product/product-image/ProductImage";

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images?.at(0)?.url ? product.images?.at(0)?.url : "");

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <div
          onMouseLeave={() => setDisplayImage(product.images?.at(0)?.url ? product.images?.at(0)?.url : "" )}
          onMouseEnter={() => setDisplayImage(product.images?.at(1)?.url ? product.images?.at(1)?.url : "" )}
        >
          <ProductImage
            src={displayImage!}
            width={500}
            height={500}
            alt={product.title}
            className="w-full object-cover rounded fade-in"
          />
        </div>
      </Link>

      <div className="p-4 flex flex-col">
        <Link className="hover:text-blue-600" href={`/product/${product.slug}`}>
          {product.title}
        </Link>
        <span className="font-bold">${currencyFormat(product.price)}</span>
      </div>
    </div>
  );
};
