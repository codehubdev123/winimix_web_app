import UseCase from "../../shared/UseCase";
import ICategoryContract from "../repositories/contracts/ICategoryContract";

export class CheckIfNamesAlreadyExistsUseCase
  implements UseCase<any, Promise<any>>
{
  private repo: ICategoryContract;

  constructor(repo: ICategoryContract) {
    this.repo = repo;
  }
  async execute(data: any): Promise<any, Promise<any>> {
    const category = await this.repo.getCategoryByNames(data);
    return category._size == 1 ? true : false;
  }
}
