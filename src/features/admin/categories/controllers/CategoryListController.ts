import { NextRequest } from "next/server";
import { BaseController } from "../../shared/BaseController";
import { validateYup } from "@/utils/validateYupUtils";
import { formDataToJson, formDataToObject } from "@/utils/formDataUtils";
import { validateFormData } from "@/utils/validateFormData";
import { CreateCategorySchema } from "../validations/CreateCategotySchema";
import { CheckIfNamesAlreadyExistsUseCase } from "../useCases/CheckIfNamesAlreadyExists";

export class CateogoryListController extends BaseController {
  private readonly checkIfNamesAlreadyExistsUseCase: CheckIfNamesAlreadyExistsUseCase;
  constructor(
    checkIfNamesAlreadyExistsUseCase: CheckIfNamesAlreadyExistsUseCase,
  ) {
    super();
    this.checkIfNamesAlreadyExistsUseCase = checkIfNamesAlreadyExistsUseCase;
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
    if (!validatedData.success) {
      return this.error({
        errors: validatedData.errors,
        fieldErrors: validatedData.fieldErrors,
      });
      console.log("❌ Validation failed:", validatedData.fieldErrors);
    }
    // Step 6: Validation successful - proceed with business logic
    // Step 7: Check if category with same slug already exists
    const checkIfNamesExists =
      await this.checkIfNamesAlreadyExistsUseCase.execute(validatedData.data);

    // !checkIfNamesExists.empty ? exists : not exist so continu;
    if (checkIfNamesExists) {
      return this.error({
        status: 401,
        message: "Name already exists",
      });
    }

    // console.warn("@@ ", validatedData.success);
    // console.warn("## ", formData);
    return this.success({
      message: validatedData, // return empty
    });
  }
}
