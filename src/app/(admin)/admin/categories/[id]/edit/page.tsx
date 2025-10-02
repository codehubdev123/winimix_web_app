// app/products/[id]/edit/page.tsx
import EditProductForm from "@/app/ui/products/EditProductForm";
import { fetchProductById } from "@/app/lib/data"; // Assuming a function to fetch product data
import { EditForm } from "@/features/admin/categories/forms/EditForm";

export default async function EditCategory({
  params,
}: {
  params: { id: string };
}) {
  // const product = await fetchProductById(params.id); // Fetch product data based on ID
  // if (!product) {
  //   return <div>Product not found.</div>;
  // }

  return <EditForm />;
}
