import { CartProduct } from "@/interfaces";
import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface CartProductActions {
  addProductToCart: (product: CartProduct) => void;
  getTotalItems: () => number;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };
  clearCart: () => void;
}

export interface StateCart {
  cart: CartProduct[];
}

export const cartProductSlice: StateCreator<
  CartProductActions & StateCart,
  [["zustand/devtools", never]]
> = (set, get) => ({
  cart: [],
  addProductToCart: (product) => {
    const { cart } = get();
    const productInCart = cart!.some((item) => {
      if (item.id === product.id && item.size === product.size) return item;
    });

    if (!productInCart) {
      set(
        (state) => ({ cart: [...cart!, product] }),
        false,
        "ProductToCart-create"
      );
      return;
    }
    const updateProductInCart = cart!.map((item) => {
      if (item.id === product.id && item.size === product.size)
        return { ...item, quantity: product.quantity + item.quantity };
      return item;
    });
    set({ cart: updateProductInCart }, false, "ProductToCart-add");
  },
  getTotalItems: () => {
    const listProductsInCart = get().cart.reduce(
      (acumulator, currentValue) => acumulator + currentValue.quantity,
      0
    );
    return listProductsInCart;
  },
  updateProductQuantity: (product: CartProduct, quantity: number) => {
    const { cart } = get();

    const updatedCartProducts = cart.map((item) => {
      if (item.id === product.id && item.size === product.size) {
        return { ...item, quantity: quantity };
      }
      return item;
    });

    set({ cart: updatedCartProducts }, false, "updateProductQuantity");
  },
  removeProduct: (product: CartProduct) => {
    const { cart } = get();
    const updatedCartProducts = cart.filter(
      (item) => item.id !== product.id || item.size !== product.size
    );

    set({ cart: updatedCartProducts });
  },
  getSummaryInformation: () => {
    const { cart } = get();

    const subTotal = cart.reduce(
      (subTotal, product) => product.quantity * product.price + subTotal,
      0
    );
    const tax = subTotal * 0.15;
    const total = subTotal + tax;
    const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

    return {
      subTotal,
      tax,
      total,
      itemsInCart,
    };
  },
  clearCart: () => {
    set({cart:[]} ,false, "clearCart")
  },
});

export const useCartProductStore = create<CartProductActions & StateCart>()(
  devtools(
    persist(cartProductSlice, {
      name: "cartProduct",
    })
  )
);
