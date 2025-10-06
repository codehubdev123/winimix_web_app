import UseCase from "../../shared/UseCase";
import IBrandContract from "../repositories/contracts/IBrandContract";

export class CheckIfNamesAlreadyExistsUseCase
  implements UseCase<any, Promise<any>>
{
  private repo: IBrandContract;

  constructor(repo: IBrandContract) {
    this.repo = repo;
  }
  async execute(data: any): Promise<any> {
    const category = await this.repo.getBrandByNames(data);
    return category._size == 1 ? true : false;
  }
}
