import admin from "@/lib/firebase-admin";

/**
 * Upload image to Firebase Storage and return public URL
 */
export async function uploadImageToFirebase(
  file: File,
  folder: string = "categories",
): Promise<string> {
  try {
    console.log("🖼️ Starting Firebase Storage upload...");

    // Get the storage bucket
    const bucket = admin.storage().bucket();

    // Create unique filename to avoid conflicts
    const timestamp = Date.now();
    const fileExtension = file.name.split(".").pop();
    const fileName = `${folder}/${timestamp}_${Math.random().toString(36).substring(2, 15)}.${fileExtension}`;

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log(`📁 Uploading file: ${fileName} (${buffer.length} bytes)`);

    // Upload to Firebase Storage
    const fileUpload = bucket.file(fileName);

    await fileUpload.save(buffer, {
      metadata: {
        contentType: file.type,
        metadata: {
          originalName: file.name,
          uploadedAt: new Date().toISOString(),
        },
      },
    });

    console.log("✅ File uploaded to Firebase Storage");

    // Make the file publicly accessible
    await fileUpload.makePublic();

    // Get public URL
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

    console.log("🔗 Public URL:", publicUrl);

    return publicUrl;
  } catch (error) {
    console.error("❌ Firebase Storage upload error:", error);
    throw new Error(
      `Failed to upload image: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Delete image from Firebase Storage
 */
export async function deleteImageFromFirebase(imageUrl: string): Promise<void> {
  try {
    console.log("🗑️ Deleting image from Firebase Storage:", imageUrl);

    const bucket = admin.storage().bucket();

    // Extract file path from URL
    const urlParts = imageUrl.split("/");
    const fileName = urlParts[urlParts.length - 1];
    const folder = urlParts[urlParts.length - 2];
    const filePath = `${folder}/${fileName}`;

    console.log(`📁 File path to delete: ${filePath}`);

    // Delete file from storage
    await bucket.file(filePath).delete();

    console.log("✅ Image deleted successfully from Firebase Storage");
  } catch (error) {
    console.error("❌ Firebase Storage deletion error:", error);
    throw new Error(
      `Failed to delete image: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Validate image file before upload
 */
export function validateImageFile(file: File): {
  isValid: boolean;
  error?: string;
} {
  // Check if it's actually a file
  if (!(file instanceof File)) {
    return { isValid: false, error: "Invalid file object" };
  }

  // Check file type
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
  ];
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "Only JPEG, PNG, WebP, and GIF images are allowed",
    };
  }

  // Check file size (5MB max)
  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return { isValid: false, error: "Image size must be less than 5MB" };
  }

  return { isValid: true };
}
