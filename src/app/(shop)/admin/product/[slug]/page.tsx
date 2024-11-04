export const revalidate = 0;
import { getAllSlugs, getCategories, getProductBySlug } from "@/actions";
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

  const [ product, categories, allSlugs ] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
    getAllSlugs()
  ]);


  // Todo: new
  if ( !product && slug !== 'new' ) {
    redirect('/admin/products')
  }

  const title = (slug === 'new') ? 'New Product' : 'Edit Product'

  return (
    <>
      <Title title={ title } />

      <ProductForm product={ product! ?? {} } allSlugs={allSlugs} categories={ categories } />
    </>
  );
}
