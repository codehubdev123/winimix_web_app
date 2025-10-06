import { NextRequest, NextResponse } from "next/server";
import { BaseController } from "../../shared/BaseController";
import { validateFormData } from "@/utils/validateFormData";
import { EditBrandSchema } from "../validations/CreateBrandSchema";
import {
  deleteImageFromFirebase,
  uploadImageToFirebase,
} from "../../shared/firebaseStorage";
import { adminDb } from "@/lib/firebase-admin";
import { brandCollection } from "../../shared/collections/Collections";
import { EditUseCase } from "../useCases/EditUseCase";
import { FindByIdUseCase } from "../useCases/FindByIdUseCase";
import validationUtils from "../../shared/utils/ValidationUtils";

export class BrandUpdateController extends BaseController {
  private readonly editUsecase: EditUseCase;
  private readonly findByIdUseCase: FindByIdUseCase;
  constructor(editUseCase: EditUseCase, findByIdUseCase: FindByIdUseCase) {
    super();
    this.editUsecase = editUseCase;
    this.findByIdUseCase = findByIdUseCase;
  }

  public async execute(req: NextRequest, params: any) {
    const { id } = await params;
    const body = await req.formData();
    // Explanation: Parse and validate update data
    const validatedData = await validateFormData(EditBrandSchema, body);
    if (!validatedData.success) {
      return this.error({
        errors: validatedData.errors,
        fieldErrors: validatedData.fieldErrors,
      });
    }

    // Explanation: Validate brand ID
    const isValidId = validationUtils.validateId(id);
    if (!isValidId) {
      return this.error({
        message: "Invalid brand ID",
        errors: ["Brand ID is required and must be a string"],
      });
    }

    // Explanation: Check if brand exists before updating
    const doc = await this.findByIdUseCase.execute(id);
    // Explanation: Handle case where brand doesn't exist
    if (!doc.exists) {
      return this.error({ status: 404, message: "Brand  not found" });
    }
    const existingData = doc.data();

    // Handle image upload
    const imageFile = body.get("image") as File;
    const removeImage = body.get("removeImage") === "true";
    let imageUrl = existingData.image; // Start with existing image
    console.log("🔴🔴🔴🔴🔴🔴 #touched here ", validatedData.data, {
      hasImageFile: !!imageFile,
      removeImageFlag: removeImage,
      existingImage: existingData.image,
    });
    if (imageFile && imageFile.size > 0) {
      console.log("🖼️ New image detected, starting upload...");
      // Upload image to Firebase Storage
      try {
        // Delete old image ONLY if it exists
        if (existingData.image) {
          console.log("🗑️ Deleting old image:", existingData.image);
          await deleteImageFromFirebase(existingData.image);
          console.log("✅ Old image deleted successfully");
        } else {
          console.log(" No existing image to delete");
        }
        // Upload new image
        imageUrl = await uploadImageToFirebase(imageFile, brandCollection);
        console.log("✅ New image uploaded successfully:", imageUrl);
        // Explanation: Perform deletion
      } catch (uploadError) {
        console.error("❌ Image upload failed:", uploadError);
        return this.error({
          message: "Field to upload image",
        });
      }
    } else {
      imageUrl = existingData.image;
    }
    // Prepare update data
    const updateData = {
      ...validatedData.data,
      image: imageUrl, // This will be either: new URL, null, or existing URL
      updatedAt: new Date(),
    };
    console.log("📤 Final update data:", updateData);
    // Perform the update
    const docRef = await this.editUsecase.execute(id, updateData);

    // Fetch updated document
    const updatedDoc = await adminDb.collection(brandCollection).doc(id).get();

    return this.success({
      message: "Brand updated successfully",
      data: {
        id: updatedDoc.id,
        ...updatedDoc.data(),
      },
    });
  }
}
