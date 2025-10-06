import UseCase from "../../shared/UseCase";
import IBrandContract from "../repositories/contracts/IBrandContract";

export class FindByIdUseCase implements UseCase<any, Promise<any>> {
  private repo: IBrandContract;

  constructor(repo: IBrandContract) {
    this.repo = repo;
  }
  async execute(id: any): Promise<any> {
    const docRef = await this.repo.findById(id);
    return docRef;
  }
}
