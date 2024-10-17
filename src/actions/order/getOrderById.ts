"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface Props {
  id: string;
}

export const getItemByOrder = async ({ id }: Props) => {

  const session = await auth();

  if ( !session?.user ) {
    return {
      ok: false,
      message: 'Debe de estar autenticado'
    }
  }

  try {
    const order = await prisma.order.findMany({
      where: {
        id: id,
      },
      include: {
        OrderAddress: true,
        OrderItem: {
          select: {
            price: true,
            quantity: true,
            size: true,
            product: {
              select: {
                title: true,
                slug: true,
                ProcutImage: {
                  select: {
                    url: true,
                  },
                  take:1
                },
              },
            },
          },
        },
      },
    });
    if( !order ) throw `${ id } no existe`;

    

    if ( session.user.role === 'user' ) {
      if ( session.user.id !== order[0].userId ) {
        throw `${ id } no es de ese usuario`
      }
    }



    return {
      ok: true,
      order: order,
    }

  } catch (error) {
    return {
      ok: false,
      errorMsj: error,
    };
  }
};
