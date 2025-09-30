import { NextRequest, NextResponse } from "next/server";
import { BaseController } from "../../shared/BaseController";
import { validateYup } from "@/utils/validateYupUtils";
import { formDataToJson, formDataToObject } from "@/utils/formDataUtils";
import { validateFormData } from "@/utils/validateFormData";
import { CheckIfNamesAlreadyExistsUseCase } from "../useCases/CheckIfNamesAlreadyExists";
import { STATUS_EXISTS } from "../../shared/Statuses";
import { CreateUseCase } from "../useCases/CreateUseCase";
import {
  CreateCategorySchema,
  EditCategorySchema,
} from "../validations/CreateCategotySchema";
import {
  uploadImageToFirebase,
  validateImageFile,
} from "../../shared/firebaseStorage";
import firebase from "firebase/compat/app";
import { adminDb } from "@/lib/firebase-admin";
import { categoryCollection } from "../../shared/collections/Collections";

export class CategoryEditController extends BaseController {
  private readonly checkIfNamesAlreadyExistsUseCase: CheckIfNamesAlreadyExistsUseCase;
  private readonly createUsecase: CreateUseCase;
  constructor(
    checkIfNamesAlreadyExistsUseCase: CheckIfNamesAlreadyExistsUseCase,
    createUseCase: CreateUseCase,
  ) {
    super();
    this.checkIfNamesAlreadyExistsUseCase = checkIfNamesAlreadyExistsUseCase;
    this.createUsecase = createUseCase;
  }

  public async execute(req: NextRequest, params: any) {
    const { id } = params;
    const body = await req.formData();
    // Explanation: Parse and validate update data
    const validatedData = await validateFormData(EditCategorySchema, body);
    if (!validatedData.success) {
      return this.error({
        errors: validatedData.errors,
        fieldErrors: validatedData.fieldErrors,
      });
    }

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
    const doc = await adminDb.collection(categoryCollection).doc(id).get();
    if (!doc.exists) {
      return this.error({ message: "category not found", status: 404 });
    }

    // Explanation: Prepare update data with new timestamp
    const updateData = {
      ...validatedData.data,
      updatedAt: new Date(),
    };

    // Explanation: Perform the update operation
    await adminDb.collection(categoryCollection).doc(id).update(updateData);
    // Explanation: Fetch updated document to return complete data
    const updatedDoc = await adminDb
      .collection(categoryCollection)
      .doc(id)
      .get();

    return this.success({
      message: "Category updated successfully",
      data: {
        id: updatedDoc.id,
        ...updatedDoc.data(),
      },
    });
    // try {

    //   // Explanation: Check for slug uniqueness (excluding current category)
    //   if (validatedData.slug) {
    //     const slugExists = await adminDb
    //       .collection("categories")
    //       .where("slug.en", "==", validatedData.slug.en)
    //       .where("__name__", "!=", id) // Firestore syntax for document ID inequality
    //       .limit(1)
    //       .get();
    //
    //     if (!slugExists.empty) {
    //       return NextResponse.json(
    //         {
    //           success: false,
    //           message: "Category with this English slug already exists",
    //           errors: ["Slug must be unique"],
    //         },
    //         { status: 400 },
    //       );
    //     }
    //   }
    //
    //
    //
    //
    //   return NextResponse.json(
    //     {
    //       success: true,
    //       message: "Category updated successfully",
    //       data: {
    //         id: updatedDoc.id,
    //         ...updatedDoc.data(),
    //       },
    //     },
    //     { status: 200 },
    //   );
    // } catch (error) {
    // if (error instanceof yup.ValidationError) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "Validation failed",
    //       errors: error.errors,
    //     },
    //     { status: 400 },
    //   );
    // }

    // console.error(`PUT /api/categories/[id] Error:`, error);
    // return NextResponse.json(
    //   {
    //     success: false,
    //     message: "Failed to update category",
    //     errors: [error instanceof Error ? error.message : "Unknown error"],
    //   },
    //   { status: 500 },
    // );
  }
}
