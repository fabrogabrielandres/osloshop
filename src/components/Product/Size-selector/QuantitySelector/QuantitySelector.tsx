"use client";

import { count } from "console";
import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
}

export const QuantitySelector = ({ quantity }: Props) => {
  const [quantityProduct, setQuantity] = useState(quantity);
  const onValueChanged = (value: number) => {
    if (1 > value + quantityProduct) return;
    setQuantity((oldValue) => value + oldValue);
  };

  return (
    <div className="flex">
      <button onClick={() => onValueChanged(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className="w-20 mx-3 px-5 bg-gray-100 text-center rounded">
        {quantityProduct}
      </span>

      <button onClick={() => onValueChanged(+1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
