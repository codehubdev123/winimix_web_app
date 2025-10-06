import { BrandCreateController } from "@/features/admin/brands/controllers/BrandCreateController";
import { BrandListController } from "@/features/admin/brands/controllers/BrandListController";
import { BrandRepository } from "@/features/admin/brands/repositories/BrandRepository";
import { CheckIfNamesAlreadyExistsUseCase } from "@/features/admin/brands/useCases/CheckIfNamesAlreadyExistsUseCase";
import { CreateUseCase } from "@/features/admin/brands/useCases/CreateUseCase";
import { NextRequest } from "next/server";

// GET - Get brands with search, filters, and pagination
export async function GET(req: NextRequest) {
  const app = new BrandListController();
  return await app.execute(req);
}

export const POST = async (req: NextRequest) => {
  const app = new BrandCreateController(
    new CheckIfNamesAlreadyExistsUseCase(new BrandRepository()),
    new CreateUseCase(new BrandRepository()),
  );
  return await app.execute(req);
};
