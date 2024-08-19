"use client";
import { QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { Product, Size } from "@/interfaces";
import { useState } from "react";


interface Props {
  product: Product;
}
export const AddToCart = ({ product }: Props) => {
  const { sizes } = product;
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const changeSize = (size: Size) => {
    setSize(size);
  };

  const onQuantityChange = (quantity: number) => {
    setQuantity(quantity);
  };

  const addToCart = () => {
    setPosted(true);
    console.log({
      quantity,
      size,
    });
  };


  return (
    <>
      {size === undefined && posted && (
        <span className="mt-2 text-red-600 fade-in">You should select a size</span>
      )}
      {/* Selector de Tallas */}
      <SizeSelector
        selectedSize={size}
        availableSizes={sizes}
        changeSize={changeSize}
      />

      {/* Selector de Cantidad */}
      <QuantitySelector
        quantity={quantity}
        onQuantityChange={onQuantityChange}
      />

      {/* Button */}
      <button onClick={addToCart} className="btn-primary my-5">
        Agregar al carrito
      </button>
    </>
  );
};
