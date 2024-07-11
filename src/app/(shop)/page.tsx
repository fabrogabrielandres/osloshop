import { Title } from "@/components";
import { ProductGrid } from "@/components/Products/ProductGrid/ProductGrid";
import { inter, titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";



export default function Home() {
  const products = initialData.products;


  return (
    <>
      <Title title="dd"></Title>
      <div>
        <ProductGrid products={products} ></ProductGrid>
      </div>
    </>
  );
}
