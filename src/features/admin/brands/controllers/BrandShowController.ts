import { NextRequest } from "next/server";
import { BaseController } from "../../shared/BaseController";
import { CheckIfBrandExistsUseCase } from "../useCases/CheckIfBrandExistsUseCase";
import { FindByIdUseCase } from "../useCases/FindByIdUseCase";
import validationUtils from "../../shared/utils/ValidationUtils";

export class BrandShowController extends BaseController {
  private readonly findByIdUseCase: FindByIdUseCase;
  private readonly checkIfBrandExistsUseCase: CheckIfBrandExistsUseCase;
  constructor(
    findByIdUseCase: FindByIdUseCase,
    checkIfBrandExistsUseCase: CheckIfBrandExistsUseCase,
  ) {
    super();
    this.findByIdUseCase = findByIdUseCase;
    this.checkIfBrandExistsUseCase = checkIfBrandExistsUseCase;
  }

  public async execute(req: NextRequest, params: any) {
    // Explanation: Get language preference from query parameters
    const { searchParams } = new URL(req.url);
    const { id } = await params;

    // Explanation: Validate brand ID format
    const isValidId = validationUtils.validateId(id);
    if (!isValidId) {
      return this.error({
        message: "Invalid brand ID",
        errors: ["Brand ID is required and must be a string"],
      });
    }
    //   // Explanation: Fetch brand document from Firestore
    const doc = await this.findByIdUseCase.execute(id);
    // Explanation: Handle case where brand doesn't exist
    if (!doc.exists) {
      return this.error({ status: 404, message: "Brand  not found" });
    }
    // Explanation: Transform document data with language support
    const data = doc.data();
    const brand = {
      id: doc.id,
      ...data,
    };
    return this.success({ data: brand });
  }
}
