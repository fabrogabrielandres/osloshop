import { Title } from "@/components";
import { ProductGrid } from "@/components/Products/ProductGrid/ProductGrid";
import { initialData } from "@/seed/seed";

export default function Home() {
  const products = initialData.products;

  return (
    <>
      <Title
        subtitle="Todos los productos"
        className="mb-2"
        title="Todos las categorias"
      ></Title>
      <div>
        <ProductGrid products={products}></ProductGrid>
      </div>
    </>
  );
}
