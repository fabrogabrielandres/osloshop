"use client";

import { QuantitySelector } from "@/components";
import { useCartProductStore } from "@/store";
import Image from "next/image";

export const ProductsInCart = () => {

    const products  = useCartProductStore((state)=>state.cart)
    const upDateProductQuantity = useCartProductStore((state)=>state.upDateProductQuantity)



    return (
    <>
      {/* Items */}
      {products &&
        products.map((product) => (
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
            <h1>{`/products/${product.image}`}</h1>

            <div>
              <p>{product.title}</p>
              <p>${product.price}</p>
              <QuantitySelector key={product.id} quantity={product.quantity} onQuantityChange={()=>upDateProductQuantity(product,product.quantity)}/>

              <button className="underline mt-3">Remover</button>
            </div>
          </div>
        ))}
    </>
  );
};
