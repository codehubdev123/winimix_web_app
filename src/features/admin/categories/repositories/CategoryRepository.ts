import { adminDb } from "@/lib/firebase-admin";
import ICategoryContract from "./contracts/ICategoryContract";
import { categoryCollection } from "../../shared/Collections/Collections";

export class CategoryRepository implements ICategoryContract {
  // get by name en or ar
  async getCategoryByNames(data: any): Promise<any> {
    // Step 7: Check if category with same slug already exists
    return await adminDb
      .collection(categoryCollection)
      .where("name.en", "==", data.name.en)
      .limit(1)
      .get();
  }
}
