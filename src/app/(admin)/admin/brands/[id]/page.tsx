import { Details } from "@/features/admin/brands/components/details/Details";
import { BrandService } from "@/features/admin/brands/services/BrandService";
import { notFound } from "next/navigation";

interface BrandShowPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ShowBrand({ params }: BrandShowPageProps) {
  const { id } = await params;

  try {
    const response = await new BrandService().getBrandById(id);
    console.log("🔴🔴🔴🔴🔴🔴 response ShowBrand ", response);

    if (!response.data.success || !response.data.data) {
      return notFound();
    }

    return <Details brand={response.data.data} />;
  } catch (error) {
    console.error("Error loading brand:", error);
    notFound();
  }
}
