import { CategoryCreateController } from "@/features/admin/categories/controllers/CategoryCreateController";
import { CategoryListController } from "@/features/admin/categories/controllers/CategoryListController";
import { CategoryRepository } from "@/features/admin/categories/repositories/CategoryRepository";
import { CheckIfNamesAlreadyExistsUseCase } from "@/features/admin/categories/useCases/CheckIfNamesAlreadyExistsUseCase";
import { CreateUseCase } from "@/features/admin/categories/useCases/CreateUseCase";
import { adminDb } from "@/lib/firebase-admin";
import { NextRequest, NextResponse } from "next/server";

// GET - Get categories with search, filters, and pagination
export async function GET(req: NextRequest) {
    const app = new CategoryListController();
  return await app.execute(req);

  try {
    const { searchParams } = new URL(request.url);
    
    // Get query parameters
    const search = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const isVisible = searchParams.get('isVisible');
    const isFeatured = searchParams.get('isFeatured');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    
    console.log('📥 Listing request with params:', {
      search, page, limit, isVisible, isFeatured, sortBy, sortOrder
    });

    // Calculate pagination
    const offset = (page - 1) * limit;
    
    // Start building Firestore query
    let query = adminDb.collection('categories');

    // Apply search filter
    if (search) {
      query = query.where('name.en', '>=', search)
                   .where('name.en', '<=', search + '\uf8ff');
    }
    
    // Apply visibility filter
    if (isVisible !== null) {
      query = query.where('isVisible', '==', isVisible === 'true');
    }
    
    // Apply featured filter
    if (isFeatured !== null) {
      query = query.where('isFeatured', '==', isFeatured === 'true');
    }
    
    // Apply sorting
    query = query.orderBy(sortBy, sortOrder as 'asc' | 'desc');
    
    // Get total count for pagination
    const countSnapshot = await query.get();
    const total = countSnapshot.size;
    const totalPages = Math.ceil(total / limit);
    
    // Apply pagination
    const snapshot = await query
      .offset(offset)
      .limit(limit)
      .get();
    
    // Format categories data
    const categories = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log(`✅ Found ${categories.length} categories out of ${total} total`);
    
    // Return success response with pagination info
    return Response.json({
      success: true,
      message: 'Categories fetched successfully',
      data: categories,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      },
      filters: {
        search,
        isVisible: isVisible ? isVisible === 'true' : undefined,
        isFeatured: isFeatured ? isFeatured === 'true' : undefined,
        sortBy,
        sortOrder
      }
    });
    
  } catch (error) {
    console.error('GET /api/categories error:', error);
    return Response.json({
      success: false,
      message: 'Failed to fetch categories',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}


export const POST = async (req: NextRequest) => {
  const app = new CategoryCreateController(
    new CheckIfNamesAlreadyExistsUseCase(new CategoryRepository()),
    new CreateUseCase(new CategoryRepository()),
  );
  return await app.execute(req);
//   try {
//     const docRef = await adminDb
//       .collection("categories")
//       .add({ name: "test name" });
//     return NextResponse.json({ SUCCESS: "created  yas", data: docRef });
//   } catch (error) {
//     console.log("🔵🔵🔵🔵🔵🔵 error ", error);
//     throw new Error("field to fetch data from this api");
//   }
// };
//
// import { NextRequest, NextResponse } from "next/server";
// import { adminDb } from "@/lib/firebase-admin";
// import * as yup from "yup";
// import { categoryValidationSchema } from "@/validations/categoryValidation";
//
// // Type definitions
// interface CategoryData {
//   name: {
//     en: string;
//     ar: string;
//   };
//   slug: {
//     en: string;
//     ar: string;
//   };
//   description?: {
//     en?: string;
//     ar?: string;
//   };
//   isVisible: boolean;
//   isFeatured: boolean;
//   image?: string;
//   parentId?: string | null;
//   sortOrder: number;
//   metaTitle?: {
//     en?: string;
//     ar?: string;
//   };
//   metaDescription?: {
//     en?: string;
//     ar?: string;
//   };
//   createdAt: Date;
//   updatedAt: Date;
// }
//
// interface ApiResponse<T = any> {
//   success: boolean;
//   message: string;
//   data?: T;
//   errors?: string[];
//   meta?: {
//     total?: number;
//     language?: string;
//     page?: number;
//     limit?: number;
//   };
// }
//
// // GET /api/categories - Get all categories with filtering and pagination
// export async function GET(
//   request: NextRequest,
// ): Promise<NextResponse<ApiResponse>> {
//   try {
//     // Explanation: Get search parameters from URL for filtering
//     const { searchParams } = new URL(request.url);
//     const language = searchParams.get("language") || "en";
//     const featured = searchParams.get("featured");
//     const visible = searchParams.get("visible");
//     const page = parseInt(searchParams.get("page") || "1");
//     const limit = parseInt(searchParams.get("limit") || "10");
//     const search = searchParams.get("search") || "";
//
//     // Explanation: Calculate pagination offsets
//     const offset = (page - 1) * limit;
//
//     // Explanation: Start building Firestore query
//     let query = adminDb.collection("categories") as FirebaseFirestore.Query;
//
//     // Explanation: Apply filters based on query parameters
//     if (visible !== null) {
//       query = query.where("isVisible", "==", visible === "true");
//     }
//
//     if (featured !== null) {
//       query = query.where("isFeatured", "==", featured === "true");
//     }
//
//     // Explanation: Get total count for pagination metadata
//     const countQuery = query;
//     const totalSnapshot = await countQuery.get();
//     const total = totalSnapshot.size;
//
//     // Explanation: Apply pagination and ordering
//     query = query
//       .orderBy("sortOrder", "asc")
//       .orderBy("name.en", "asc")
//       .offset(offset)
//       .limit(limit);
//
//     // Explanation: Execute the query
//     const snapshot = await query.get();
//
//     // Explanation: Handle empty results
//     if (snapshot.empty) {
//       return NextResponse.json(
//         {
//           success: true,
//           message: "No categories found",
//           data: [],
//           meta: { total: 0, language, page, limit },
//         },
//         { status: 200 },
//       );
//     }
//
//     // Explanation: Transform Firestore documents to category objects
//     const categories = snapshot.docs.map((doc) => {
//       const data = doc.data() as CategoryData;
//       return {
//         id: doc.id,
//         ...data,
//         // Explanation: Provide language-specific fields for easy consumption
//         name: data.name[language as keyof typeof data.name] || data.name.en,
//         description:
//           data.description?.[language as keyof typeof data.description] ||
//           data.description?.en,
//         slug: data.slug[language as keyof typeof data.slug] || data.slug.en,
//       };
//     });
//
//     // Explanation: Apply client-side search if search term provided
//     const filteredCategories = search
//       ? categories.filter(
//           (category) =>
//             category.name.toLowerCase().includes(search.toLowerCase()) ||
//             (category.description &&
//               category.description
//                 .toLowerCase()
//                 .includes(search.toLowerCase())),
//         )
//       : categories;
//
//     return NextResponse.json(
//       {
//         success: true,
//         message: "Categories retrieved successfully",
//         data: filteredCategories,
//         meta: {
//           total: filteredCategories.length,
//           language,
//           page,
//           limit,
//           totalPages: Math.ceil(total / limit),
//         },
//       },
//       { status: 200 },
//     );
//   } catch (error) {
//     // Explanation: Handle unexpected errors with proper logging
//     console.error("GET /api/categories Error:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to retrieve categories",
//         errors: [error instanceof Error ? error.message : "Unknown error"],
//       },
//       { status: 500 },
//     );
//   }
// }
//
// // POST /api/categories - Create a new category
// export async function POST(
//   request: NextRequest,
// ): Promise<NextResponse<ApiResponse>> {
//   return NextResponse.json(
//     {
//       success: false,
//       message: "Hello from post categories",
//       errors: [],
//     },
//     { status: 500 },
//   );
//   try {
//     // Explanation: Parse and validate incoming JSON data
//     const body = await request.json();
//
//     // Explanation: Validate request body against Yup schema
//     const validatedData = await categoryValidationSchema.validate(body, {
//       abortEarly: false, // Collect all validation errors, not just the first
//       stripUnknown: true, // Remove unknown fields
//     });
//
//     // Explanation: Check if category with same English slug already exists
//     const slugExists = await adminDb
//       .collection("categories")
//       .where("slug.en", "==", validatedData.slug.en)
//       .limit(1)
//       .get();
//
//     if (!slugExists.empty) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Category with this English slug already exists",
//           errors: ["Slug must be unique"],
//         },
//         { status: 400 },
//       );
//     }
//
//     // Explanation: Prepare category data with timestamps
//     const categoryData: CategoryData = {
//       ...validatedData,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     };
//
//     // Explanation: Add document to Firestore collection
//     const docRef = await adminDb.collection("categories").add(categoryData);
//
//     // Explanation: Return success response with created data
//     return NextResponse.json(
//       {
//         success: true,
//         message: "Category created successfully",
//         data: {
//           id: docRef.id,
//           ...categoryData,
//         },
//       },
//       { status: 201 },
//     );
//   } catch (error) {
//     // Explanation: Handle different types of errors appropriately
//     if (error instanceof yup.ValidationError) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Validation failed",
//           errors: error.errors,
//         },
//         { status: 400 },
//       );
//     }
//
//     console.error("POST /api/categories Error:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to create category",
//         errors: [error instanceof Error ? error.message : "Unknown error"],
//       },
//       { status: 500 },
//     );
//   }
// }
//
// // OPTIONS handler for CORS preflight requests (important for mobile app)
// export async function OPTIONS(): Promise<NextResponse> {
//   return new NextResponse(null, {
//     status: 200,
//     headers: {
//       "Access-Control-Allow-Origin": "*",
//       "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type, Authorization",
//     },
//   });
// }
