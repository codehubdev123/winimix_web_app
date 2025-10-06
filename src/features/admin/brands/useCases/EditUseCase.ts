import UseCase from "../../shared/UseCase";
import IBrandContract from "../repositories/contracts/IBrandContract";

export class EditUseCase implements UseCase<any, Promise<any>> {
  private repo: IBrandContract;

  constructor(repo: IBrandContract) {
    this.repo = repo;
  }
  async execute(id: any, data?: any): Promise<any> {
    const docRef = this.repo.update(id, data);
    return docRef;
  }
}
