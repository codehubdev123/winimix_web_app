import { NextRequest } from "next/server";
import { BaseController } from "../../shared/BaseController";
import { validateFormData } from "@/utils/validateFormData";
import { STATUS_EXISTS } from "../../shared/Statuses";
import { CreateUseCase } from "../useCases/CreateUseCase";
import { CreateBrandSchema } from "../validations/CreateBrandSchema";
import { uploadImageToFirebase } from "../../shared/firebaseStorage";
import { brandCollection } from "../../shared/collections/Collections";
import { CheckIfNamesAlreadyExistsUseCase } from "../useCases/CheckIfNamesAlreadyExistsUseCase";

export class BrandCreateController extends BaseController {
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
    const validatedData = await validateFormData(CreateBrandSchema, body);
    // if using json use validations like that
    // check validations status
    if (!validatedData.success) {
      return this.error({
        errors: validatedData.errors,
        fieldErrors: validatedData.fieldErrors,
      });
    }

    // Step 6: Validation successful - proceed with business logic
    // Step 7: Check if brands with same slug already exists
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
    if (imageFile && imageFile.size > 0) {
      console.log("🖼️ Starting image upload...");
      try {
        imageUrl = await uploadImageToFirebase(imageFile, brandCollection);
        console.log("✅ Image uploaded successfully:", imageUrl);
      } catch (uploadError) {
        console.error("❌ Image upload failed:", uploadError);
        return this.error({
          message: "Field to upload image",
        });
      }
    }
    // Prepare Brands data for Firestore
    const brandData = {
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
    const docRef = await this.createUsecase.execute(brandData);

    return this.success({
      message: "Brands created successfully ",
      data: {
        id: docRef.id, // Assuming execute returns the document reference
        ...brandData,
      },
    });
  }
}
