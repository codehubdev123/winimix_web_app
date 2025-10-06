import UseCase from "../../shared/UseCase";
import IBrandContract from "../repositories/contracts/IBrandContract";

export class DeleteUseCase implements UseCase<any, Promise<any>> {
  private repo: IBrandContract;

  constructor(repo: IBrandContract) {
    this.repo = repo;
  }

  async execute(id: any): Promise<any> {
    const docRef = await this.repo.delete(id);
    return docRef;
  }
}
