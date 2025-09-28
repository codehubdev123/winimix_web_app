import { NextRequest } from "next/server";
import { BaseController } from "../../shared/BaseController";
import { validateYup } from "@/utils/validateYupUtils";
import { formDataToJson, formDataToObject } from "@/utils/formDataUtils";
import { validateFormData } from "@/utils/validateFormData";
import { CheckIfNamesAlreadyExistsUseCase } from "../useCases/CheckIfNamesAlreadyExists";
import { STATUS_EXISTS } from "../../shared/Statuses";
import { CreateUseCase } from "../useCases/CreateUseCase";
import { CreateCategorySchema } from "../validations/CreateCategotySchema";

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
    // const jsonData = await request.json();
    // validatedData = await validateFormData(categoryFormDataSchema, jsonData as any);
    // const formData = formDataToObject(body);
    // check validations status
    console.log("🔴🔴🔴🔴🔴🔴 #here ", validatedData);
    console.log("🔴🔴🔴🔴🔴🔴 #body ", body);
    if (!validatedData.success) {
      return this.error({
        errors: validatedData.errors,
        fieldErrors: validatedData.fieldErrors,
      });
    }
    return this.success({ messge: "here" });
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
    if (validatedData.files?.image) {
      const imageFile = validatedData.files.image;
      console.log("🖼️ Processing image file:", imageFile.name);
      // Here you would upload to Firebase Storage
      // For now, we'll just store the file name
      validatedData.image = imageFile.name;
    }
    // Step 9: Prepare category data for database
    const data = {
      ...validatedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // add the data to database
    // Step 10: Save to Firestore
    const docRef = await this.createUsecase.execute(data);
    console.log("🔵🔵🔵🔵🔵🔵 docRef ", docRef);
    return this.success({
      message: "Category created successfully",
      data,
    });
  }
}
