"use server";

import prisma from "@/lib/prisma";
import { Address } from "../../interfaces/Address.Interface";

interface Props {
  userId: string;
}
export const getUserAddress = async ({ userId }: Props): Promise<Address> => {
  console.error("server action ", userId);

  const userEmpty: Address = {
    address: "",
    address2: "",
    city: "",
    country: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    postalCode: "",
  };
  try {
    const addressDb = await prisma.addressUser.findUnique({
      where: {
        userId: userId,
      },
    });

    if (addressDb) {
      return {
        address: addressDb.address,
        address2: addressDb.address2!,
        city: addressDb.city,
        country: addressDb.countryId,
        firstName: addressDb.firstName,
        lastName: addressDb.lastName,
        phoneNumber: addressDb.phoneNumber,
        postalCode: addressDb.postalCode,
      };
    } else {
      return {
        ...userEmpty,
      };
    }
  } catch (error) {
    return userEmpty;
  }
};
