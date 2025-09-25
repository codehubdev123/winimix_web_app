import * as yup from "yup";

/**
 * Converts FormData to a nested JavaScript object
 * Handles: nested keys (name.en), arrays, boolean conversions, number conversions
 */
export function formDataToObject(formData: FormData): Record<string, any> {
  // Initialize an empty object to store the result
  const result: Record<string, any> = {};

  // Loop through all entries in the FormData
  for (const [key, value] of formData.entries()) {
    // Split keys by dots to handle nested objects (e.g., "name.en" -> {name: {en: value}})
    const keys = key.split(".");
    let current = result; // Start from the root object

    // Navigate through the nested structure, creating objects as needed
    for (let i = 0; i < keys.length - 1; i++) {
      const currentKey = keys[i];

      // If the current level doesn't exist or isn't an object, create it
      if (!current[currentKey] || typeof current[currentKey] !== "object") {
        current[currentKey] = {};
      }
      current = current[currentKey]; // Move deeper into the nested structure
    }

    // Set the final value at the last key
    const lastKey = keys[keys.length - 1];
    current[lastKey] = convertFormValue(value); // Convert string values to proper types
  }

  return result;
}

/**
 * Converts FormData string values to appropriate JavaScript types
 * "true" -> boolean true, "123" -> number 123, etc.
 */
function convertFormValue(value: FormDataEntryValue): any {
  // If it's a File object, return it as-is
  if (value instanceof File) {
    return value;
  }

  // Handle string values
  if (typeof value === "string") {
    // Convert boolean strings to actual booleans
    if (value === "true" || value === "on") return true;
    if (value === "false" || value === "off") return false;

    // Convert number strings to actual numbers
    if (/^-?\d+$/.test(value)) return parseInt(value, 10); // Integers
    if (/^-?\d*\.\d+$/.test(value)) return parseFloat(value); // Floats

    // Try to parse JSON strings (for nested objects sent as strings)
    if (
      (value.startsWith("{") && value.endsWith("}")) ||
      (value.startsWith("[") && value.endsWith("]"))
    ) {
      try {
        return JSON.parse(value);
      } catch {
        // If JSON parsing fails, return the original string
        return value;
      }
    }

    // Return empty strings as null for cleaner data
    if (value === "") return null;
  }

  // Return the value as-is if no conversion needed
  return value;
}

/**
 * Extracts files from FormData for separate handling
 */
export function extractFilesFromFormData(
  formData: FormData,
): Record<string, File> {
  const files: Record<string, File> = {};

  for (const [key, value] of formData.entries()) {
    // Only collect File objects, ignore strings
    if (value instanceof File) {
      files[key] = value;
    }
  }

  return files;
}
