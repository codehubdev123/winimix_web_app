import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import * as yup from "yup";
import { categoryUpdateSchema } from "@/validations/categoryValidation";
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
    new CheckIfCategoryExistsUseCase(new CategoryRepository()),
  );
  return await app.execute(req, params);

  try {
    const { id } = params;

    // Explanation: Validate category ID
    if (!id || typeof id !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid category ID",
          errors: ["Category ID is required and must be a string"],
        },
        { status: 400 },
      );
    }

    // Explanation: Check if category exists before updating
    const doc = await adminDb.collection("categories").doc(id).get();

    if (!doc.exists) {
      return NextResponse.json(
        {
          success: false,
          message: "Category not found",
          errors: [`Category with ID ${id} does not exist`],
        },
        { status: 404 },
      );
    }

    // Explanation: Parse and validate update data
    const body = await request.json();
    const validatedData = await categoryUpdateSchema.validate(body, {
      abortEarly: false,
      stripUnknown: true,
    });

    // Explanation: Check for slug uniqueness (excluding current category)
    if (validatedData.slug) {
      const slugExists = await adminDb
        .collection("categories")
        .where("slug.en", "==", validatedData.slug.en)
        .where("__name__", "!=", id) // Firestore syntax for document ID inequality
        .limit(1)
        .get();

      if (!slugExists.empty) {
        return NextResponse.json(
          {
            success: false,
            message: "Category with this English slug already exists",
            errors: ["Slug must be unique"],
          },
          { status: 400 },
        );
      }
    }

    // Explanation: Prepare update data with new timestamp
    const updateData = {
      ...validatedData,
      updatedAt: new Date(),
    };

    // Explanation: Perform the update operation
    await adminDb.collection("categories").doc(id).update(updateData);

    // Explanation: Fetch updated document to return complete data
    const updatedDoc = await adminDb.collection("categories").doc(id).get();

    return NextResponse.json(
      {
        success: true,
        message: "Category updated successfully",
        data: {
          id: updatedDoc.id,
          ...updatedDoc.data(),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: error.errors,
        },
        { status: 400 },
      );
    }

    console.error(`PUT /api/categories/[id] Error:`, error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update category",
        errors: [error instanceof Error ? error.message : "Unknown error"],
      },
      { status: 500 },
    );
  }
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

  // try {
  //   const { id } = params;
  //
  //   // Explanation: Validate category ID
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
  //   // Explanation: Check if category exists
  //   const doc = await adminDb.collection("categories").doc(id).get();
  //
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
  //   // Explanation: Check if category has associated products (business logic)
  //   const productsSnapshot = await adminDb
  //     .collection("products")
  //     .where("categoryId", "==", id)
  //     .limit(1)
  //     .get();
  //
  //   if (!productsSnapshot.empty) {
  //     return NextResponse.json(
  //       {
  //         success: false,
  //         message: "Cannot delete category with associated products",
  //         errors: [
  //           "Please remove or reassign products before deleting this category",
  //         ],
  //       },
  //       { status: 400 },
  //     );
  //   }
  //
  //   // Explanation: Perform deletion
  //   await adminDb.collection("categories").doc(id).delete();
  //
  //   return NextResponse.json(
  //     {
  //       success: true,
  //       message: "Category deleted successfully",
  //     },
  //     { status: 200 },
  //   );
  // // } catch (error) {
  //   console.error(`DELETE /api/categories/[id] Error:`, error);
  //   return NextResponse.json(
  //     {
  //       success: false,
  //       message: "Failed to delete category",
  //       errors: [error instanceof Error ? error.message : "Unknown error"],
  //     },
  //     { status: 500 },
  //   );
  // }
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
