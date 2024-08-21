"use client";
import { QuantitySelector, SizeSelector, StockLabel } from "@/components";
import { CartProduct, Product, Size } from "@/interfaces";
import { useCartProduct } from "@/store";
import { useState } from "react";
import { cartProduct } from "../../../../../store/cartProduct/cartProduct.Store";

interface Props {
  product: Product;
}
export const AddToCart = ({ product }: Props) => {
  const {
    sizes,
    description,
    gender,
    id,
    images,
    inStock,
    price,
    slug,
    tags,
    title,
  } = product;
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addProductToCart = useCartProduct((state) => state.addProductToCart);

  const changeSize = (size: Size) => {
    setSize(size);
  };

  const onQuantityChange = (quantity: number) => {
    setQuantity(quantity);
  };

  const addToCart = () => {
    setPosted(true);
    if (!size) return;
    const cartProduct: CartProduct = {
      id,
      images: images[0],
      price,
      quantity,
      size,
      slug,
      title,
    };
    setPosted(false);
    setSize(undefined);
    setQuantity(1);

    addProductToCart(cartProduct);
    console.log({
      quantity,
      size,
      product,
    });
  };

  return (
    <>
      {size === undefined && posted && (
        <span className="mt-2 text-red-600 fade-in">
          You should select a size
        </span>
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
