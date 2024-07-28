import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function Main() {
  if (process.env.NODE_ENV === "production") return;

  //delete all registers previus

  await prisma.procutImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  //insert categories
  const dataToCreateCategoriInDb = initialData.categories.map((category) => {
    return { name: category };
  });

  await prisma.category.createMany({ data: dataToCreateCategoriInDb });

  const categoriesFromDB = await prisma.category.findMany();

  const categoriesMap = categoriesFromDB.reduce((map, category) => {
    map[category.name.toLocaleLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  //insert products and Images
  initialData.products.forEach(async (product) => {
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

    console.log(dataToCreateImageInDb);

    // console.log("productFromDb",productFromDb);
  });
}

(() => {
  Main();
})();
