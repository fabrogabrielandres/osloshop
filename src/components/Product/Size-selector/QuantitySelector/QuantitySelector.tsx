"use client";
import clsx from "clsx";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;
  onQuantityChange: (value: number) => void;
  blockAdd?: boolean;
}

export const QuantitySelector = ({
  quantity,
  onQuantityChange,
  blockAdd = false,
}: Props) => {
  const onValueChanged = (value: number) => {
    if (1 > value + quantity) return;
    onQuantityChange(value + quantity);
  };

  return (
    <div className="flex">
      <button onClick={() => onValueChanged(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>

      <span
        className={clsx("w-20 mx-3 px-5 bg-gray-100 text-center rounded", {
          "text-red-600": blockAdd,
        })}
      >
        {quantity}
      </span>

      <button disabled={blockAdd} onClick={() => onValueChanged(+1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  );
};
