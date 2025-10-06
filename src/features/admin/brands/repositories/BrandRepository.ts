import { adminDb } from "@/lib/firebase-admin";
import IBrandContract from "./contracts/IBrandContract";
import { brandCollection } from "../../shared/collections/Collections";

export class BrandRepository implements IBrandContract {
  async delete(id: any): Promise<any> {
    const docRef = await adminDb.collection(brandCollection).doc(id).delete();
    return docRef;
  }
  async findById(id: any): Promise<any> {
    const docRef = await adminDb.collection(brandCollection).doc(id).get();
    return docRef;
  }

  async update(id: any, data: any): Promise<any> {
    // Always update the updatedAt timestamp
    // updateData.updatedAt = new Date().toISOString();
    const docRef = await adminDb
      .collection(brandCollection)
      .doc(id)
      .update(data);
    return docRef;
  }

  async create(data: any): Promise<any> {
    const docRef = await adminDb.collection(brandCollection).add(data);
    return docRef;
  }
  // get by name en or ar
  async findByNames(data: any): Promise<any> {
    // Step 7: Check if brand with same slug already exists
    return await adminDb
      .collection(brandCollection)
      .where("name.en", "==", data.name.en)
      .limit(1)
      .get();
  }
}
