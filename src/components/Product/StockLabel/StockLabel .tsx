"use client";

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    const getStock = async () => {
      const stock = await getStockBySlug(slug);
      setStock(stock);
      setIsLoading(false)
    };
    getStock();

  });

  return (
    <>
      {isLoading ? (
        <h1
          className={` ${titleFont.className} antialiased font-bold text-lg bg-gray-200 animate-pulse `}
        >
          &nbsp;
        </h1>
      ) : (
        <h1 className={` ${titleFont.className} antialiased font-bold text-lg`}>
          Stock: {stock}
        </h1>
      )}
    </>
  );
};