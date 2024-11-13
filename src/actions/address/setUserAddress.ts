"use server";

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

interface Props {
  addressUser: Address;
  userId: string;
}

export const setUserAddress = async (addressUser: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress({ userId, addressUser });
    return {
      ok: true,
      address: newAddress,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Address could not be recorded",
    };
  }
};

const createOrReplaceAddress = async ({ userId, addressUser }: Props) => {
  const toSabeAddress = {
    userId: userId,
    address: addressUser.address,
    address2: addressUser.address2,
    firstName: addressUser.firstName,
    lastName: addressUser.lastName,
    postalCode: addressUser.postalCode,
    phoneNumber: addressUser.phoneNumber,
    city: addressUser.city,
    countryId: addressUser.country,
  };
  try {
    const user = await prisma.addressUser.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!user) {
      const newUser = await prisma.addressUser.create({
        data: { ...toSabeAddress },
      });
      return newUser;
    }
    const updateUser = await prisma.addressUser.update({
      where: {
        userId: userId,
      },
      data: { ...toSabeAddress },
    });
    return updateUser;
  } catch (error) {
    console.log(error);
    throw new Error("Problems when i try to create user");
  }
};
