import { initialData, ValidSizes } from "./seed";
import prisma from "../lib/prisma";
import { countriesSeed } from "./seed-countrys";

async function Main() {
  if (process.env.NODE_ENV === "production") return;

  const { categories, products, user } = initialData;

  await prisma.addressUser.deleteMany();
  await prisma.orderAddress.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();

  //delete all users previus
  await prisma.user.deleteMany();

  //delete all registers previus
  await prisma.procutImage.deleteMany();
  await prisma.producStock.deleteMany();

  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.countrys.deleteMany();

  //insert Users
  await prisma.user.createMany({ data: initialData.user });

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

  //insert products , productStock and Images
  products.forEach(async (product) => {
    let { images, type, stockPerType, ...rest } = product;
    let mapSizes = Object.keys(stockPerType) as ValidSizes[];

    const productToInsert = {
      ...rest,
      sizes: mapSizes,
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

    const dataToCreateStockInDb = {
      ...stockPerType,
      producStockId: productFromDb.id,
    };

    // console.log("dataToCreateStockInDb",dataToCreateStockInDb);

    await prisma.producStock.createMany({
      data: dataToCreateStockInDb,
    });
  });

  await prisma.countrys.createMany({ data: countriesSeed });
}

(() => {
  Main();
})();
