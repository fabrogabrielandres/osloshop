import { Title } from "@/components";
import { ProductGrid } from "@/components/Products/ProductGrid/ProductGrid";
import { Categorie } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: string;
  };
}

export default function CategoryPage({ params }: Props) {
  // console.log(params);
  // if (params.id === "kids") {
  // notFound()
  // }

  const products = initialData.products.filter(
    (product) => product.gender === params.id
  );

  const labels: Record<Categorie, string> = {
    men: "hombres",
    women: "mujeres",
    kid: "niños",
    unisex: "hombres y mujeres",
  };

  return (
    <div>
      <Title
        title={`Articulos para ${labels[params.id as Categorie]}`}
        subtitle="Todos los productos"
        className="mb-2"
      ></Title>
      <div>
        <ProductGrid products={products}></ProductGrid>
      </div>
    </div>
  );
}
