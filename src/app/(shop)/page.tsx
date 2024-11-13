export const revalidate = 60;
import { getPaginatedProductWithImages } from "@/actions";
import { Pagination, Title } from "@/components";
import { ProductGrid } from "@/components/Products/ProductGrid/ProductGrid";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? Number(searchParams.page) : 1;

  const { products,currentPage,totalPages } = await getPaginatedProductWithImages({
    page: Number(page),
  });

  if(products.length === 0){
    redirect("/")
  }

  return (
    <>
      <Title
        subtitle="All products"
        className="mb-2"
        title="All categories"
      ></Title>
      <div>
        <ProductGrid products={products}></ProductGrid>
      </div>

      <Pagination totalPages={totalPages}/>
    </>
  );
}
