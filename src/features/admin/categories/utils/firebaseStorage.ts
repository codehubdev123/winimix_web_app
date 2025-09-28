import { storage } from "@/lib/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";

/**
 * Uploads an image file to Firebase Storage
 * @param file - The image file to upload
 * @param folder - Storage folder name (default: 'categories')
 * @returns Promise with download URL
 */
export async function uploadImageToFirebase(
  file: File,
  folder: string = "categories",
): Promise<string> {
  try {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      throw new Error("File must be an image");
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error("Image size must be less than 5MB");
    }

    // Create a unique filename with timestamp to avoid overwrites
    const timestamp = Date.now();
    const fileExtension = file.name.split(".").pop();
    const fileName = `${folder}/${timestamp}_${Math.random().toString(36).substring(2, 15)}.${fileExtension}`;

    // Create a reference to the storage location
    const storageRef = ref(storage, fileName);

    // Upload the file to Firebase Storage
    const snapshot = await uploadBytes(storageRef, file);

    // Get the public download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log("✅ Image uploaded successfully:", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error("❌ Image upload failed:", error);
    throw new Error(
      `Image upload failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Deletes an image from Firebase Storage
 * @param imageUrl - The URL of the image to delete
 */
export async function deleteImageFromFirebase(imageUrl: string): Promise<void> {
  try {
    // Extract the file path from the URL
    const matches = imageUrl.match(/o\/(.+)\?/);
    if (!matches || matches.length < 2) {
      throw new Error("Invalid image URL");
    }

    // URL decode the file path (spaces become %20 in URLs)
    const filePath = decodeURIComponent(matches[1]);
    const storageRef = ref(storage, filePath);

    // Delete the file
    await deleteObject(storageRef);
    console.log("✅ Image deleted successfully:", filePath);
  } catch (error) {
    console.error("❌ Image deletion failed:", error);
    throw new Error(
      `Image deletion failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}

/**
 * Validates an image file before upload
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
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  if (file.size > maxSize) {
    return { isValid: false, error: "Image size must be less than 5MB" };
  }

  return { isValid: true };
}
