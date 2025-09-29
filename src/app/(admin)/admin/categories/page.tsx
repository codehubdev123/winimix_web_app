import { Table } from "@/features/admin/categories/tables/table";
import { Category } from "@/services/categoryService";

const CategoriesPage = () => {
  return (
    <Table
      categories={[]}
      onEdit={function (category: Category): void {
        throw new Error("Function not implemented.");
      }}
      onDelete={function (category: Category): void {
        throw new Error("Function not implemented.");
      }}
      onToggleVisibility={function (id: string, isVisible: boolean): void {
        throw new Error("Function not implemented.");
      }}
      onToggleFeatured={function (id: string, isFeatured: boolean): void {
        throw new Error("Function not implemented.");
      }}
      onSearch={function (params: {
        search: string;
        isVisible?: boolean;
        isFeatured?: boolean;
        sortBy: string;
        sortOrder: "asc" | "desc";
      }): void {
        throw new Error("Function not implemented.");
      }}
      onCreateNew={function (): void {
        throw new Error("Function not implemented.");
      }}
      isLoading={false}
    />
  );
};

export default CategoriesPage;
