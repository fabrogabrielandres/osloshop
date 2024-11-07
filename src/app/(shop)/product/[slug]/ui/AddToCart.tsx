"use client";
import { QuantitySelector, SizeSelector } from "@/components";
import type { CartProduct, Product, ProductStock, Size } from "@/interfaces";
import { useCartProductStore } from "@/store";
import { clsx } from "clsx";
import { useEffect, useState } from "react";

interface Props {
  product: Product;
}
export const AddToCart = ({ product }: Props) => {
  const { id, images, price, slug, title, producStock } = product;
  const sizesmap = Object.entries({ ...producStock })
    .filter((product) => product[0] !== "id")
    .filter((product) => product[0] !== "producStockId")
    .filter((product) => Number(product[1]) > 0)
    .map((product) => product[0] as Size);

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);
  const [disableByStock, setDisableByStock] = useState(false);

  const addProductToCart = useCartProductStore(
    (state) => state.addProductToCart
  );

  const changeSize = (size: Size) => {
    setSize(size);
    setQuantity(1);
  };

  const onQuantityChange = (quantity: number) => {
    setQuantity(quantity);
  };

  useEffect(() => {
    if (!size) return;
    if (!producStock) return;
    if (producStock[size]! <= quantity) {
      setDisableByStock(true);
    } else {
      setDisableByStock(false);
    }
  }, [size, quantity, producStock]);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;
    const cartProduct: CartProduct = {
      id,
      images: images![0],
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
        availableSizes={sizesmap}
        changeSize={changeSize}
      />

      {/* Selector de Cantidad */}
      <QuantitySelector
        quantity={quantity}
        onQuantityChange={(quantity) => onQuantityChange(quantity)}
        blockAdd={disableByStock}
      />
      {/* Button */}
      <button
        onClick={addToCart}
        className={clsx("btn-primary my-5", { "btn-disabled": disableByStock })}
      >
        Agregar al carrito
      </button>
    </>
  );
};
