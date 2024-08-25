"use client";

import { QuantitySelector } from "@/components";
import { useCartProductStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ProductsInCart = () => {
  const products = useCartProductStore((state) => state.cart);
  const updateProductQuantity = useCartProductStore((state) => state.updateProductQuantity);
  const removeProduct = useCartProductStore( state => state.removeProduct );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {/* Items */}
      {products &&
        products.map((product) => (
          <div key={`${product.slug}${product.size}`} className="flex mb-5">
            <Image
              src={`/products/${product.image}`}
              width={100}
              height={100}
              style={{
                width: "100px",
                height: "100px",
              }}
              alt={product.title}
              className="mr-5 rounded"
            />
        
            <div>
              <Link
                className="hover:underline cursor-pointer"
                href={`/product/${product.slug} `}
              >
                {product.size} - {product.title}
              </Link>
              <QuantitySelector
                key={product.id}
                quantity={product.quantity}
                onQuantityChange={(quantity) =>
                  updateProductQuantity(product, quantity)
                }
              />
            <button 
              onClick={ () => removeProduct(product) }
              className="underline mt-3">Remover</button>
            </div>
          </div>
        ))}
    </>
  );
};
