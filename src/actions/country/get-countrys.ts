"use server";
import prisma from "@/lib/prisma";

export const getCountries = async () => {
  const countrys = await prisma.countrys.findMany();
  return countrys;
};
