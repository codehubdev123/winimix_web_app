import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import * as yup from "yup";
// import { categoryUpdateSchema } from "@/validations/categoryValidation";
import { CheckIfNamesAlreadyExistsUseCase } from "@/features/admin/categories/useCases/CheckIfNamesAlreadyExistsUseCase";
import { CategoryRepository } from "@/features/admin/categories/repositories/CategoryRepository";
import { CreateUseCase } from "@/features/admin/categories/useCases/CreateUseCase";
import { CategoryUpdateController } from "@/features/admin/categories/controllers/CategoryUpdateController";
import { EditUseCase } from "@/features/admin/categories/useCases/EditUseCase";
import { CheckIfCategoryExistsUseCase } from "@/features/admin/categories/useCases/CheckIfCategoryExistsUseCase";
import { CategoryDeleteController } from "@/features/admin/categories/controllers/CategoryDeleteController";
import { DeleteUseCase } from "@/features/admin/categories/useCases/DeleteUseCase";
import { CategoryShowController } from "@/features/admin/categories/controllers/CategoryShowController";
import { GetCategoryByIdUseCase } from "@/features/admin/categories/useCases/GetCategoryByIdUseCase";

// Type definitions
interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  errors?: string[];
}

// Dynamic route handler for individual category operations
interface RouteParams {
  params: {
    id: string;
  };
}

// GET /api/categories/[id] - Get single category by ID
export async function GET(
  req: NextRequest,
  { params }: RouteParams,
): Promise<any> {
  const app = new CategoryShowController(
    new GetCategoryByIdUseCase(new CategoryRepository()),
    new CheckIfCategoryExistsUseCase(new CategoryRepository()),
  );
  return await app.execute(req, params);
  // try {
  //   const { id } = params;
  //
  //   // Explanation: Validate category ID format
  //   if (!id || typeof id !== "string") {
  //     return NextResponse.json(
  //       {
  //         success: false,
  //         message: "Invalid category ID",
  //         errors: ["Category ID is required and must be a string"],
  //       },
  //       { status: 400 },
  //     );
  //   }
  //
  //   // Explanation: Get language preference from query parameters
  //   const { searchParams } = new URL(request.url);
  //   const language = searchParams.get("language") || "en";
  //
  //   // Explanation: Fetch category document from Firestore
  //   const doc = await adminDb.collection("categories").doc(id).get();
  //
  //   // Explanation: Handle case where category doesn't exist
  //   if (!doc.exists) {
  //     return NextResponse.json(
  //       {
  //         success: false,
  //         message: "Category not found",
  //         errors: [`Category with ID ${id} does not exist`],
  //       },
  //       { status: 404 },
  //     );
  //   }
  //
  //   // Explanation: Transform document data with language support
  //   const data = doc.data();
  //   const category = {
  //     id: doc.id,
  //     ...data,
  //     name: data?.name[language as keyof typeof data.name] || data?.name.en,
  //     description:
  //       data?.description?.[language as keyof typeof data.description] ||
  //       data?.description?.en,
  //   };
  //
  //   return NextResponse.json(
  //     {
  //       success: true,
  //       message: "Category retrieved successfully",
  //       data: category,
  //     },
  //     { status: 200 },
  //   );
  // // } catch (error) {
  //   console.error(`GET /api/categories/[id] Error:`, error);
  //   return NextResponse.json(
  //     {
  //       success: false,
  //       message: "Failed to retrieve category",
  //       errors: [error instanceof Error ? error.message : "Unknown error"],
  //     },
  //     { status: 500 },
  //   );
  // }
}

// PUT /api/categories/[id] - Update existing category
export async function PUT(req: NextRequest, { params }: RouteParams) {
  const app = new CategoryUpdateController(
    new EditUseCase(new CategoryRepository()),
    new GetCategoryByIdUseCase(new CategoryRepository()),
  );
  return await app.execute(req, params);
}

// DELETE /api/categories/[id] - Delete category by ID
export async function DELETE(
  req: NextRequest,
  { params }: RouteParams,
): Promise<any> {
  const app = new CategoryDeleteController(
    new DeleteUseCase(new CategoryRepository()),
    new CheckIfCategoryExistsUseCase(new CategoryRepository()),
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
