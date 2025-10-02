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
import { EditUseCase } from "../useCases/EditUseCase";
import { CheckIfCategoryExistsUseCase } from "../useCases/CheckIfCategoryExistsUseCase";
import { GetCategoryByIdUseCase } from "../useCases/GetCategoryByIdUseCase";

export class CategoryShowController extends BaseController {
  private readonly getCategoryByIdUseCase: GetCategoryByIdUseCase;
  private readonly checkIfCategoryExistsUseCase: CheckIfCategoryExistsUseCase;
  constructor(
    getCategoryByIdUseCase: GetCategoryByIdUseCase,
    checkIfCategoryExistsUseCase: CheckIfCategoryExistsUseCase,
  ) {
    super();
    this.getCategoryByIdUseCase = getCategoryByIdUseCase;
    this.checkIfCategoryExistsUseCase = checkIfCategoryExistsUseCase;
  }

  public async execute(req: NextRequest, params: any) {
    // Explanation: Get language preference from query parameters
    const { searchParams } = new URL(req.url);
    // const language = searchParams.get("language") || "en";
    const { id } = params;

    // Explanation: Validate category ID format
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
    //   // Explanation: Fetch category document from Firestore
    //   const doc = await adminDb.collection("categories").doc(id).get();
    const doc = await this.getCategoryByIdUseCase.execute(id);
    // Explanation: Handle case where category doesn't exist
    if (!doc.exists) {
      return this.error({ status: 404, message: "Category  not found" });
    }
    // Explanation: Transform document data with language support
    const data = doc.data();
    const category = {
      id: doc.id,
      ...data,
    };
    return this.success({ data: category });
  }
}
