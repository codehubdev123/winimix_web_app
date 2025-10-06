import UseCase from "../../shared/UseCase";
import IBrandContract from "../repositories/contracts/IBrandContract";

export class CreateUseCase implements UseCase<any, Promise<any>> {
  private repo: IBrandContract;

  constructor(repo: IBrandContract) {
    this.repo = repo;
  }
  async execute(data?: any): Promise<any> {
    const docRef = this.repo.create(data);
    return docRef;
  }
}
