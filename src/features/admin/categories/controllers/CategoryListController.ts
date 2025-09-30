import { NextRequest } from "next/server";
import { BaseController } from "../../shared/BaseController";
import { adminDb } from "@/lib/firebase-admin";
import { Pagination } from "swiper/modules";

export class CategoryListController extends BaseController {
  constructor() {
    super();
  }

  public async execute(req: NextRequest) {
    try {
      const { searchParams } = new URL(req.url);

      // Get query parameters
      const search = searchParams.get("search") || "";
      const page = parseInt(searchParams.get("page") || "1");
      const limit = parseInt(searchParams.get("limit") || "10");
      const isVisible = searchParams.get("isVisible");
      const isFeatured = searchParams.get("isFeatured");
      const sortBy = searchParams.get("sortBy") || "createdAt";
      const sortOrder = searchParams.get("sortOrder") || "desc";

      console.log("📥 Listing request with params:", {
        search,
        page,
        limit,
        isVisible,
        isFeatured,
        sortBy,
        sortOrder,
      });

      // Calculate pagination
      const offset = (page - 1) * limit;

      // Start building Firestore query
      let query = adminDb.collection("categories");

      // Apply search filter
      if (search) {
        query = query
          .where("name.en", ">=", search)
          .where("name.en", "<=", search + "\uf8ff");
      }

      // Apply visibility filter
      if (isVisible !== null) {
        query = query.where("isVisible", "==", isVisible === "true");
      }

      // Apply featured filter
      if (isFeatured !== null) {
        query = query.where("isFeatured", "==", isFeatured === "true");
      }

      // Apply sorting
      query = query.orderBy(sortBy, sortOrder as "asc" | "desc");

      // Get total count for pagination
      const countSnapshot = await query.get();
      const total = countSnapshot.size;
      const totalPages = Math.ceil(total / limit);

      // Apply pagination
      const snapshot = await query.offset(offset).limit(limit).get();

      // Format categories data
      const categories = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log(
        `✅ Found ${categories.length} categories out of ${total} total`,
      );

      return this.success({
        messsage: "",
        data: categories,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
        filters: {
          search,
          isVisible: isVisible ? isVisible === "true" : undefined,
          isFeatured: isFeatured ? isFeatured === "true" : undefined,
          sortBy,
          sortOrder,
        },
      });
      // Return success response with pagination info
      // Response.json({
      //   success: true,
      //   message: "Categories fetched successfully",
      //   data: categories,
      //   pagination: {
      //     page,
      //     limit,
      //     total,
      //     totalPages,
      //     hasNext: page < totalPages,
      //     hasPrev: page > 1,
      //   },
      //   filters: {
      //     search,
      //     isVisible: isVisible ? isVisible === "true" : undefined,
      //     isFeatured: isFeatured ? isFeatured === "true" : undefined,
      //     sortBy,
      //     sortOrder,
      //   },
      // });
    } catch (error) {
      console.error("GET /api/categories error:", error);
      return Response.json(
        {
          success: false,
          message: "Failed to fetch categories",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 },
      );
    }

    // return this.success({
    //   message: "Hello from category list",
    // data: {
    //   id: docRef.id, // Assuming execute returns the document reference
    //   ...categoryData,
    // },
    //   });
  }
}
