import { EditForm } from "@/features/admin/brands/forms/EditForm";

export default async function EditBrand({
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
