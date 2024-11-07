import { OrderStatus, PayPalButton, ProductImage, Title } from "@/components";
import Image from "next/image";
import { getItemByOrder } from "@/actions/order/getOrderById";
import { redirect } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default async function orderIdPage({ params }: Props) {
  const { id } = params;

  const { order, ok } = await getItemByOrder({ id: id });

  if (!ok || !order) {
    redirect("/");
  }

  order.OrderItem.map((x) => {
    if (!x.product.ProcutImage.length) {
      x.product.ProcutImage.push({
        url: "",
      });
    }
  });

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <OrderStatus isPaid={order.isPaid} />

            {/* Items */}
            {order.OrderItem
              ? order.OrderItem!.map((item) => (
                  <div
                    key={`${item.product.slug}${item.size}`}
                    className="flex mb-5"
                  >
                    <ProductImage
                      src={`${
                        item.product.ProcutImage[0].url
                          ? item.product.ProcutImage[0].url
                          : ""
                      }`}
                      width={100}
                      height={100}
                      style={{
                        width: "100px",
                        height: "100px",
                      }}
                      alt={item.product.title}
                      className="mr-5 rounded"
                    />
                    <div>
                      <p>{item.product.title}</p>
                      <p>
                        ${item.price} x {item.quantity}
                      </p>
                      <p className="font-bold">
                        Subtotal: ${item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))
              : ""}
          </div>

          {/* Checkout - Resumen de orden */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">{`${order.OrderAddress?.firstName} ${order.OrderAddress?.lastName}`}</p>
              <p>{`${order.OrderAddress?.address}`}</p>
              <p>{`${order.OrderAddress?.address2}`}</p>
              <p>{`${order.OrderAddress?.postalCode}`}</p>
              <p>{`${order.OrderAddress?.city}, ${order.OrderAddress?.countryId} `}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">{`${order.itemsInOrder} artículos`}</span>

              <span>Subtotal</span>
              <span className="text-right">{`$ ${order.subTotal}`}</span>

              <span>{`Impuestos (${15}%)`}</span>
              <span className="text-right">{`$ ${order.tax}`}</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">{`$ ${order.total}`}</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              {order.isPaid ? (
                <OrderStatus isPaid={order.isPaid} />
              ) : (
                <PayPalButton amount={order.total} orderId={id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
