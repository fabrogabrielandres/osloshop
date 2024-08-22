"use client";

import * as React from "react";
import { devtools, persist } from 'zustand/middleware';
import { create } from "zustand";
import { CartProductActions, cartProductSlice, StateCart, useCartProductStore } from "../cartProduct/cartProduct.Store";



type ShareState = CartProductActions  & StateCart;

export const useHydratation = create<ShareState>()(
    (...a) => ({
        ...cartProductSlice(...a),
    })
);


const Hydration = () => {
    React.useEffect(() => {
        useCartProductStore.persist.rehydrate();

    }, []);
    return null;
};

export default Hydration;