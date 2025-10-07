import { Details } from "@/features/admin/categories/components/details/Details";
import { CategoryService } from "@/features/admin/categories/services/CategoryService";
import { notFound } from "next/navigation";

interface CategoryShowPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ShowCategory({ params }: CategoryShowPageProps) {
  const { id } = await params;

  try {
    const response = await new CategoryService().getCategoryById(id);
    console.log("🔴🔴🔴🔴🔴🔴 response ShowCategory ", response);

    if (!response.data.success || !response.data.data) {
      return notFound();
    }

    return <Details category={response.data.data} />;
  } catch (error) {
    console.error("Error loading category:", error);
    notFound();
  }
}
