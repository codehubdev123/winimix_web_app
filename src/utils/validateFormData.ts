import * as yup from "yup";
import { extractFilesFromFormData, formDataToObject } from "./formDataUtils";

/**
 * Interface for standardized API responses
 */
export interface ValidationResult<T = any> {
  success: boolean;
  data?: T;
  errors?: string[];
  fieldErrors?: Array<{
    path: string;
    message: string;
    value: any;
  }>;
  files?: Record<string, File>;
}

/**
 * Main validation function that handles both FormData and JSON
 * Returns a standardized result object for easy error handling
 */
export async function validateFormData<T>(
  schema: yup.ObjectSchema<any>,
  formData: FormData,
): Promise<ValidationResult<T>> {
  try {
    // Step 1: Convert FormData to a structured JavaScript object
    const data = formDataToObject(formData);
    console.log("📥 Converted FormData:", data);

    // Step 2: Extract files for separate handling
    const files = extractFilesFromFormData(formData);
    console.log("📁 Extracted files:", Object.keys(files));

    // Step 3: Validate the data against the Yup schema
    const validatedData = await schema.validate(data, {
      abortEarly: false, // Collect all errors, not just the first one
      stripUnknown: true, // Remove fields not defined in schema
    });

    console.log("✅ Validation successful:", validatedData);

    // Step 4: Return success result with validated data and files
    return {
      success: true,
      data: validatedData,
      files: files,
    };
  } catch (error) {
    // Step 5: Handle validation errors
    if (error instanceof yup.ValidationError) {
      console.log("❌ Validation errors:", error.errors);

      // Extract detailed field error information
      const fieldErrors = error.inner.map((err) => ({
        path: err.path || "unknown",
        message: err.message,
        value: err.value,
      }));

      return {
        success: false,
        errors: error.errors, // Array of error messages
        fieldErrors: fieldErrors, // Detailed field information
      };
    }

    // Step 6: Handle unexpected errors
    console.error("💥 Unexpected validation error:", error);
    return {
      success: false,
      errors: ["An unexpected error occurred during validation"],
    };
  }
}

/**
 * Helper function to validate regular JSON data (for non-form submissions)
 */
export async function validateJsonData<T>(
  schema: yup.ObjectSchema<any>,
  jsonData: any,
): Promise<ValidationResult<T>> {
  try {
    const validatedData = await schema.validate(jsonData, {
      abortEarly: false,
      stripUnknown: true,
    });

    return {
      success: true,
      data: validatedData,
    };
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      const fieldErrors = error.inner.map((err) => ({
        path: err.path || "unknown",
        message: err.message,
        value: err.value,
      }));

      return {
        success: false,
        errors: error.errors,
        fieldErrors: fieldErrors,
      };
    }

    return {
      success: false,
      errors: ["An unexpected error occurred during validation"],
    };
  }
}

/**
 * Utility function to create consistent API error responses
 */
export function createErrorResponse(
  message: string,
  status: number = 400,
  details?: any,
): Response {
  return new Response(
    JSON.stringify({
      success: false,
      message,
      ...details,
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    },
  );
}

/**
 * Utility function to create consistent API success responses
 */
export function createSuccessResponse(
  data: any,
  message: string = "Operation completed successfully",
  status: number = 200,
): Response {
  return new Response(
    JSON.stringify({
      success: true,
      message,
      data,
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    },
  );
}
