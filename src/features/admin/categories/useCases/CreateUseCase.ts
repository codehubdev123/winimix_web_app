import UseCase from "../../shared/UseCase";
import ICategoryContract from "../repositories/contracts/ICategoryContract";

export class CreateUseCase implements UseCase<any, Promise<any>> {
  private repo: ICategoryContract;

  constructor(repo: ICategoryContract) {
    this.repo = repo;
  }
  execute(data?: any): Promise<any> {
    return this.repo.create(data);
  }
}
