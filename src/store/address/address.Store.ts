import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface AddressActions {
  setAddress: (address: Address) => void;
}

export interface StateAddress {
  address: Address;
}

interface Address {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  postalCode: string;
  city: string;
  country: string;
  phoneNumber: string;
}

export const addressSlice: StateCreator<
  AddressActions & StateAddress,
  [["zustand/devtools", never]]
> = (set, get) => ({
  address: {
    firstName: "",
    lastName: "",
    address: "",
    address2: "",
    postalCode: "",
    city: "",
    country: "",
    phoneNumber: "",
  },
  setAddress: (address: Address) => {
    set({ address: address }, false, "setAddress");
  },
});

export const useAdressStore = create<AddressActions & StateAddress>()(
  devtools(
    persist(addressSlice, {
      name: "Address",
    })
  )
);
