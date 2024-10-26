export const revalidate = 0;
import { getCategories, getProductBySlug } from "@/actions";
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params;

  const [ product, categories ] = await Promise.all([
    getProductBySlug(slug),
    getCategories()
  ]);

  console.log("llegue", slug);

  // Todo: new
  if ( !product && slug !== 'new' ) {
    redirect('/admin/products')
  }

  const title = (slug === 'new') ? 'New Product' : 'Edit Product'

  return (
    <>
      <span>hola</span>
      <Title title={ title } />

      <ProductForm product={ product! ?? {} }  />
    </>
  );
}
