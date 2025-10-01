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
  deleteImageFromFirebase,
  uploadImageToFirebase,
  validateImageFile,
} from "../../shared/firebaseStorage";
import firebase from "firebase/compat/app";
import { adminDb } from "@/lib/firebase-admin";
import { categoryCollection } from "../../shared/collections/Collections";
import { EditUseCase } from "../useCases/EditUseCase";
import { CheckIfCategoryExistsUseCase } from "../useCases/CheckIfCategoryExistsUseCase";
import { DeleteUseCase } from "../useCases/DeleteUseCase";
import { revalidatePath, revalidateTag } from "next/cache";

export class CategoryDeleteController extends BaseController {
  private readonly deleteUseCase: DeleteUseCase;
  private readonly checkIfCategoryExistsUseCase: CheckIfCategoryExistsUseCase;
  constructor(
    deleteUseCase: DeleteUseCase,
    checkIfCategoryExistsUseCase: CheckIfCategoryExistsUseCase,
  ) {
    super();
    this.deleteUseCase = deleteUseCase;
    this.checkIfCategoryExistsUseCase = checkIfCategoryExistsUseCase;
  }

  public async execute(req: NextRequest, params: any) {
    const { id } = await params;
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
    const doc = await this.checkIfCategoryExistsUseCase.execute(id);
    if (!doc) {
      return this.error({ message: "category not found", status: 404 });
    }
    //   // Explanation: Check if category has associated products (business logic)
    //   const productsSnapshot = await adminDb
    //     .collection("products")
    //     .where("categoryId", "==", id)
    //     .limit(1)
    //     .get();
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
    // Check if category exists
    const existingDoc = await adminDb
      .collection(categoryCollection)
      .doc(id)
      .get();
    if (!existingDoc.exists) {
      return Response.json(
        {
          success: false,
          message: "Category not found",
        },
        { status: 404 },
      );
    }

    const existingData = existingDoc.data();

    // Explanation: Perform deletion
    await deleteImageFromFirebase(existingData.image);
    console.log("✅ Old image deleted from Firebase Storage");
    await this.deleteUseCase.execute(id);
    revalidatePath("/admin/categories");

    return this.success({
      message: "Category deleted successfully",
    });
  }
}
