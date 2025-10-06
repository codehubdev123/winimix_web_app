import { adminDb } from "@/lib/firebase-admin";
import ICategoryContract from "./contracts/ICategoryContract";
import { categoryCollection } from "../../shared/collections/Collections";
import { data } from "framer-motion/client";

export class CategoryRepository implements ICategoryContract {
  async delete(id: any): Promise<any> {
    const docRef = await adminDb.collection("categories").doc(id).delete();
    return docRef;
  }
  async getCategoryById(id: any): Promise<any> {
    const docRef = await adminDb.collection(categoryCollection).doc(id).get();
    return docRef;
  }

  async update(id: any, data: any): Promise<any> {
    console.log("🔴🔴🔴🔴🔴🔴 frpm inside repo updateData ", data);

    // Always update the updatedAt timestamp
    // updateData.updatedAt = new Date().toISOString();
    const docRef = await adminDb
      .collection(categoryCollection)
      .doc(id)
      .update(data);
    return docRef;
  }

  async create(data: any): Promise<any> {
    const docRef = await adminDb.collection(categoryCollection).add(data);
    return docRef;
  }
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
