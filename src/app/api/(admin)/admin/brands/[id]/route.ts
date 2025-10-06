import { NextRequest, NextResponse } from "next/server";
import { BrandRepository } from "@/features/admin/brands/repositories/BrandRepository";
import { BrandUpdateController } from "@/features/admin/brands/controllers/BrandUpdateController";
import { EditUseCase } from "@/features/admin/brands/useCases/EditUseCase";
import { CheckIfBrandExistsUseCase } from "@/features/admin/brands/useCases/CheckIfBrandExistsUseCase";
import { BrandDeleteController } from "@/features/admin/brands/controllers/BrandDeleteController";
import { DeleteUseCase } from "@/features/admin/brands/useCases/DeleteUseCase";
import { BrandShowController } from "@/features/admin/brands/controllers/BrandShowController";
import { FindByIdUseCase } from "@/features/admin/brands/useCases/FindByIdUseCase";

// Dynamic route handler for individual brand operations
interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/brands/[id] - Get single brand by ID
export async function GET(
  req: NextRequest,
  { params }: RouteParams,
): Promise<any> {
  const app = new BrandShowController(
    new FindByIdUseCase(new BrandRepository()),
    new CheckIfBrandExistsUseCase(new BrandRepository()),
  );
  return await app.execute(req, params);
}

// PUT /api/brands/[id] - Update existing brand
export async function PUT(req: NextRequest, { params }: RouteParams) {
  const app = new BrandUpdateController(
    new EditUseCase(new BrandRepository()),
    new FindByIdUseCase(new BrandRepository()),
  );
  return await app.execute(req, params);
}

// DELETE /api/brands/[id] - Delete brand by ID
export async function DELETE(
  req: NextRequest,
  { params }: RouteParams,
): Promise<any> {
  const app = new BrandDeleteController(
    new DeleteUseCase(new BrandRepository()),
    new CheckIfBrandExistsUseCase(new BrandRepository()),
  );
  return await app.execute(req, params);
}

// OPTIONS handler for CORS
export async function OPTIONS(): Promise<NextResponse> {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
