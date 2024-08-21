import { CartProduct } from "@/interfaces";
import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface CartProductActions {
  addProductToCart: (product: CartProduct) => void;
}

interface State {
  cart?: CartProduct[];
}


export const cartProduct: StateCreator<CartProductActions & State,[["zustand/devtools", never]]> = (set, get) => ({
  
  cart:[],
  
  addProductToCart: (product) => {
    const { cart } = get();
    const productInCart = cart!.some((item) => {
      if (item.id === product.id && item.size === product.size) return item;
    });

    if (!productInCart) {
      set((state) => ({ cart: [...cart!, product]}),false,"ProductToCart-create");
      return;
    }
    const updateProductInCart =  cart!.map(item=>{
        if(item.id === product.id && item.size === product.size) return {...item, quantity:product.quantity+item.quantity};
        return item
    })
    set({cart:updateProductInCart},false,"ProductToCart-add")
  },



});

export const useCartProduct = create<CartProductActions & State>()(
  devtools(
    persist(cartProduct, {
      name: "cartProduct",
    })
  )
);
