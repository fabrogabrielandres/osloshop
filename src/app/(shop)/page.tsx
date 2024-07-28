import { getPaginatedProductWithImages } from "@/actions";
import { Title } from "@/components";
import { ProductGrid } from "@/components/Products/ProductGrid/ProductGrid";
import { initialData } from "@/seed/seed";

export default async function Home() {
  // const products = initialData.products;

  const productsImages = await getPaginatedProductWithImages();
  console.log("****");
  // console.log("AA",products[0]);
  console.log("BB",productsImages[0]);

  return (
    <>
      <Title
        subtitle="Todos los productos"
        className="mb-2"
        title="Todos las categorias"
      ></Title>
      <div>
        <ProductGrid products={productsImages}></ProductGrid>
      </div>
    </>
  );
}
