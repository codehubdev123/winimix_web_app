import { NextRequest } from "next/server";
import { BaseController } from "../../shared/BaseController";
import { validateFormData } from "@/utils/validateFormData";
import { CheckIfNamesAlreadyExistsUseCase } from "../useCases/CheckIfNamesAlreadyExists";
import { STATUS_EXISTS } from "../../shared/Statuses";
import { CreateUseCase } from "../useCases/CreateUseCase";
import { CreateCategorySchema } from "../validations/CreateCategotySchema";
import { uploadImageToFirebase } from "../../shared/firebaseStorage";

export class CategoryCreateController extends BaseController {
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

  public async execute(req: NextRequest) {
    // TODO: get the data from request
    const body = await req.formData();
    const validatedData = await validateFormData(CreateCategorySchema, body);
    // if using json use validations like that
    // check validations status
    if (!validatedData.success) {
      return this.error({
        errors: validatedData.errors,
        fieldErrors: validatedData.fieldErrors,
      });
    }

    // Step 6: Validation successful - proceed with business logic
    // Step 7: Check if category with same slug already exists
    const checkIfNamesExists =
      await this.checkIfNamesAlreadyExistsUseCase.execute(validatedData.data);

    // !checkIfNamesExists.empty ? exists : not exist so continu;
    if (checkIfNamesExists) {
      return this.error({
        STATUS_EXISTS,
        message: "Name already exists",
      });
    }
    // Step 8: Handle file upload if image is a File object
    // Upload image to Firebase Storage
    let imageUrl = "";

    // Handle image upload
    const imageFile = body.get("image") as File;
    console.log("🔴🔴🔴🔴🔴🔴 imageFile ", imageFile);
    if (imageFile && imageFile.size > 0) {
      console.log("🖼️ Starting image upload...");
      try {
        imageUrl = await uploadImageToFirebase(imageFile, "categories");
        console.log("✅ Image uploaded successfully:", imageUrl);
      } catch (uploadError) {
        console.error("❌ Image upload failed:", uploadError);
        return this.error({
          message: "Field to upload image",
        });
      }
    }
    // Prepare category data for Firestore
    const categoryData = {
      name: {
        en: validatedData.data.name.en,
        ar: validatedData.data.name.ar,
      },
      description: {
        en: validatedData.data.description.en,
        ar: validatedData.data.description.ar,
      },
      image: imageUrl, // url after uploaded to Firebase
      isVisible: validatedData.data.isVisible,
      isFeatured: validatedData.data.isFeatured,
      sortOrder: validatedData.data.sortOrder,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // Step 10: Save to Firestore
    const docRef = await this.createUsecase.execute(categoryData);

    return this.success({
      message: "Category created successfully ",
      data: {
        id: docRef.id, // Assuming execute returns the document reference
        ...categoryData,
      },
    });
  }
}
