"use client";

import { getStockBySlug } from "@/actions/products/getStockBySlug";
import { titleFont } from "@/config/fonts";
import { ProductStock } from "@/interfaces";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [detail, setDetail] = useState<Array<any>>([]);

  const getStock = async () => {
    const stock = await getStockBySlug(slug);

    let stockMap = Object.entries(stock!)
      .filter((product) => product[0] !== "id")
      .filter((product) => product[0] !== "producStockId");
    setDetail(stockMap);
    setIsLoading(false);
  };

  useEffect(() => {
    getStock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isLoading ? (
        <h1
          className={` ${titleFont.className} antialiased font-bold text-lg bg-gray-200 animate-pulse `}
        >
          &nbsp;
        </h1>
      ) : (
        // <div className="grid grid-cols-2 gap-1">
        <div>
          <h1
            className={` ${titleFont.className} antialiased font-bold text-lg underline decoration-solid `}
          >
            Stock:
          </h1>
          {detail
            .filter((zise) => zise[1] != 0)
            .map((product) => {
              return (
                <div key={product[0]}>
                  <span>{`${product[0]} : ${product[1]}`} </span>
                  <br></br>
                </div>
              );
            })}
        </div>
      )}
    </>
  );
};
