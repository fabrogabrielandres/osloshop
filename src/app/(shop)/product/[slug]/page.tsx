import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: params.slug };
}

export default function ProductPage({ params }: Props) {
  const { slug } = params;

  const product = initialData.products.find(
    (product) => product.slug === slug
  );

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2 ">
        {/* Mobile Slideshow */}


        {/* Desktop Slideshow */}
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5">
        {/* SizeSelector */}

        <h1 className={` ${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>

        <p className="text-lg mb-5">${product.price}</p>


        {/* Descripción */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
