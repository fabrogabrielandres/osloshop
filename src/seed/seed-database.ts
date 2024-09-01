import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function Main() {
  if (process.env.NODE_ENV === "production") return;

  const { categories,products,user } = initialData

  //delete all users previus
  await prisma.user.deleteMany();


  //delete all registers previus
  await prisma.procutImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  //insert Users

  await prisma.user.createMany({data:initialData.user})

  //insert categories
  const dataToCreateCategoriInDb = categories.map((category) => {
    return { name: category };
  });

  await prisma.category.createMany({ data: dataToCreateCategoriInDb });

  const categoriesFromDB = await prisma.category.findMany();

  const categoriesMap = categoriesFromDB.reduce((map, category) => {
    map[category.name.toLocaleLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  //insert products and Images
  products.forEach(async (product) => {
    let { images, type, ...rest } = product;
    const productToInsert = {
      ...rest,
      categoryId: categoriesMap[product.type],
    };

    const productFromDb = await prisma.product.create({
      data: productToInsert,
    });

    const dataToCreateImageInDb = images.map((image) => {
      return {
        productId: productFromDb.id,
        url: image,
      };
    });

    await prisma.procutImage.createMany({
      data: dataToCreateImageInDb,
    });




  });
}

(() => {
  Main();
})();
