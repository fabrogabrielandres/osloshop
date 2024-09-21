"use server";
import prisma from "@/lib/prisma";

export const getCountries = async () => {
  try {
    const countrys = await prisma.countrys.findMany({
        orderBy:{
            name:"asc"
        }
    });
    return countrys;
  } catch (error) {
    return []
  }
};
