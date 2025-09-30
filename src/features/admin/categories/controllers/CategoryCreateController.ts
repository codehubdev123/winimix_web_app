import { NextRequest } from "next/server";
import { BaseController } from "../../shared/BaseController";
import { validateYup } from "@/utils/validateYupUtils";
import { formDataToJson, formDataToObject } from "@/utils/formDataUtils";
import { validateFormData } from "@/utils/validateFormData";
import { CheckIfNamesAlreadyExistsUseCase } from "../useCases/CheckIfNamesAlreadyExists";
import { STATUS_EXISTS } from "../../shared/Statuses";
import { CreateUseCase } from "../useCases/CreateUseCase";
import { CreateCategorySchema } from "../validations/CreateCategotySchema";
import {
  uploadImageToFirebase,
  validateImageFile,
} from "../../shared/firebaseStorage";
import firebase from "firebase/compat/app";

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
    console.log("🔴🔴🔴🔴🔴🔴 from create ", body);
    const validatedData = await validateFormData(CreateCategorySchema, body);
    // if using json use validations like that
    // const jsonData = await request.json();
    // validatedData = await validateFormData(categoryFormDataSchema, jsonData as any);
    // const formData = formDataToObject(body);
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
    // if (validatedData.files?.image) {
    //   const imageFile = validatedData.files.image;
    //   console.log("🖼️ Processing image file:", imageFile.name);
    //   // Here you would upload to Firebase Storage
    //   // For now, we'll just store the file name
    //   validatedData.image = imageFile.name;
    // }
    // Handle image upload if provided
    // Validate image file before upload
    // const validation = validateImageFile(validatedData.image);
    // if (!validation.isValid) {
    //   console.log("🔴🔴🔴🔴🔴🔴 errors upload ", validation.error);
    //   return this.error({
    //     message: validation.error,
    //   });
    // }

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
      //   slug: {
      //     en: validatedData["slug.en"],
      //     ar: validatedData["slug.ar"],
      //   },
      description: {
        en: validatedData.data.name.en,
        ar: validatedData.data.name.ar,
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
    console.log("🔵🔵🔵🔵🔵🔵 docRef ", docRef);

    return this.success({
      message: "Category created successfully ",
      data: {
        id: docRef.id, // Assuming execute returns the document reference
        ...categoryData,
      },
    });
  }
}
