import { NextRequest, NextResponse } from "next/server";
import { BaseController } from "../../shared/BaseController";
import { deleteImageFromFirebase } from "../../shared/firebaseStorage";
import { adminDb } from "@/lib/firebase-admin";
import { brandCollection } from "../../shared/collections/Collections";
import { CheckIfBrandExistsUseCase } from "../useCases/CheckIfBrandExistsUseCase";
import { DeleteUseCase } from "../useCases/DeleteUseCase";

export class BrandDeleteController extends BaseController {
  private readonly deleteUseCase: DeleteUseCase;
  private readonly checkIfBrandExistsUseCase: CheckIfBrandExistsUseCase;
  constructor(
    deleteUseCase: DeleteUseCase,
    checkIfBrandExistsUseCase: CheckIfBrandExistsUseCase,
  ) {
    super();
    this.deleteUseCase = deleteUseCase;
    this.checkIfBrandExistsUseCase = checkIfBrandExistsUseCase;
  }

  public async execute(req: NextRequest, params: any) {
    const { id } = await params;
    // Explanation: Validate brand ID
    if (!id || typeof id !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid brand ID",
          errors: ["Brand ID is required and must be a string"],
        },
        { status: 400 },
      );
    }
    const doc = await this.checkIfBrandExistsUseCase.execute(id);
    if (!doc) {
      return this.error({ message: "brand not found", status: 404 });
    }
    // Check if brand exists
    const existingDoc = await adminDb.collection(brandCollection).doc(id).get();
    if (!existingDoc.exists) {
      return Response.json(
        {
          success: false,
          message: "Brand not found",
        },
        { status: 404 },
      );
    }

    const existingData = existingDoc.data();

    // Explanation: Perform deletion
    await deleteImageFromFirebase(existingData.image);
    console.log("✅ Old image deleted from Firebase Storage");
    await this.deleteUseCase.execute(id);

    return this.success({
      message: "Brand deleted successfully",
    });
  }
}
