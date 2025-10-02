import UseCase from "../../shared/UseCase";
import ICategoryContract from "../repositories/contracts/ICategoryContract";

export class EditUseCase implements UseCase<any, Promise<any>> {
  private repo: ICategoryContract;

  constructor(repo: ICategoryContract) {
    this.repo = repo;
  }
  async execute(id: any, data?: any): Promise<any> {
    console.log("🔵🔵🔵🔵🔵🔵 from  inside usecase ", id, data);
    const docRef = this.repo.update(id, data);
    return docRef;
  }
}
