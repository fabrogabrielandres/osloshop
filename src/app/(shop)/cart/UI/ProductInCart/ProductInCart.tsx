"use client";
import { QuantitySelector } from "@/components";
import { useCartProductStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export const ProductInCart = () => {
  const totalItems = useCartProductStore((state)=>state.getTotalItems())

  if (totalItems <= 0 ) redirect("/empty");
  const cart = useCartProductStore((state) => state.cart);

  return (
    <>
      <div className="flex flex-col mt-5">
        <span className="text-xl">Agregar más items</span>
        <Link href="/" className="underline mb-5">
          Continúa comprando
        </Link>

        {/* Items */}
        {cart &&
          cart.map((product) => (
            <div key={product.slug} className="flex mb-5">
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
                <p>{product.title}</p>
                <p>${product.price}</p>
                <QuantitySelector quantity={product.quantity} />

                <button className="underline mt-3">Remover</button>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
