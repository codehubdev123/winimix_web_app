import UseCase from "../../shared/UseCase";
import ICategoryContract from "../repositories/contracts/ICategoryContract";

export class DeleteUseCase implements UseCase<any, Promise<any>> {
  private repo: ICategoryContract;

  constructor(repo: ICategoryContract) {
    this.repo = repo;
  }

  async execute(id: any): Promise<any> {
    const docRef = await this.repo.delete(id);
    return docRef;
  }
}
