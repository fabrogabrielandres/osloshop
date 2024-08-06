import { getPaginatedProductWithImages } from "@/actions";
import { Pagination, Title } from "@/components";
import { ProductGrid } from "@/components/Products/ProductGrid/ProductGrid";
import { Categorie } from "@/interfaces";
import { Gender } from "@prisma/client";
import { notFound, redirect } from "next/navigation";

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page?: string;
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {


  const page = searchParams.page ? Number(searchParams.page) : 1;


  const { products, totalPages, currentPage } =await getPaginatedProductWithImages({page: page,gender: params.gender as Gender,take: 12,});

  if (products.length === 0) {
    redirect(`/gender${params.gender}`);
  }

  console.log("products", products);

  const labels: Record<string, string> = {
    men: "hombres",
    women: "mujeres",
    kid: "niños",
    unisex: "hombres y mujeres",
  };

  return (
    <div>
      <Title
        title={`Articulos para ${labels[params.gender as Categorie]}`}
        subtitle="Todos los productos"
        className="mb-2"
      ></Title>
      <div>
        <ProductGrid products={products}></ProductGrid>
      </div>
      <Pagination totalPages={totalPages} />
    </div>
  );
}
