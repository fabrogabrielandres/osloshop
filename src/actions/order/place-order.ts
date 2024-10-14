"use server";
import prisma from "@/lib/prisma";

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

export const placeOrder = async (
  productsToOrder: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;


  // validate user session
  if (!userId) {
    return {
      ok: false,
      message: "No hay sesión de usuario",
    };
  }

  // get information about products
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productsToOrder.map((productOrder) => productOrder.productId),
      },
    },
    include: {
      producStock: {
        select: {
          L: true,
          M: true,
          S: true,
          XL: true,
          XS: true,
          XXL: true,
          XXXL: true,
        },
      },
    },
  });

  // Calcular los montos
  const itemsInOrder = productsToOrder.reduce(
    (count, p) => count + p.quantity,
    0
  );

  // totals of tax, subtotal, and total
  const { subTotal, tax, total } = productsToOrder.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) throw new Error(`${item.productId} no existe - 500`);

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * 0.15;
      totals.total += subTotal * 1.15;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );


  // Crear la transacción de base de datos
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // // 1. Actualizar el stock de los productos
      // const updatedProductsPromises = productsToOrder.map((productOrder) => {

      //   // Verificar valores negativos en las existencia = no hay stock
      //   let productTovalidate = products.filter((p)=> p.id == productOrder.productId)[0].producStock![productOrder.size];

      //   if (productOrder.quantity === 0 || ( productTovalidate -  productOrder.quantity < 0) ) {
      //     throw new Error(`${productOrder.productId} no tiene cantidad definida`);
      //   }

      //   return tx.product.update({
      //     where: { id: productOrder.productId },
      //     data: {
      //       producStock: {
      //         update: {
      //           [productOrder.size]: {
      //             decrement: productOrder.quantity,
      //           },
      //         },
      //       },
      //     },
      //   });
      // });
      // // throw new Error(`${""} no tiene cantidad definida`);

      // const updatedProducts = await Promise.all(updatedProductsPromises);

      // 2. Crear la orden - Encabezado - Detalles

      
  
      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,


          OrderItem: {
            createMany: {
              data: productsToOrder.map((p) => ({
                quantity: p.quantity,
                size: p.size,
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? 0,
              })),
            },
          },
        },
      });
      console.log("order*******************", order);

      // Validar, si el price es cero, entonces, lanzar un error

      // 3. Crear la direccion de la orden
      // Address
      // const { country, ...restAddress } = address;
      // const orderAddress = await tx.orderAddress.create({
      //   data: {
      //     ...restAddress,
      //     countryId: country,
      //     orderId: order.id,
      //   },
      // });

      return {
        // updatedProducts: updatedProducts,
        order: order,
        // orderAddress: orderAddress,
      };
    });

    console.log("prismaTx", prismaTx);

    return {
      // ok: true,
      order: prismaTx.order,
      // prismaTx: prismaTx,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message,
    };
  }
};
