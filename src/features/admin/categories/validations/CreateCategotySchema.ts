import * as yup from "yup";

/**
 * Yup schema for category validation that handles FormData conversions
 * Uses lazy evaluation to handle both string values and objects from FormData
 */
export const CreateCategorySchema = yup.object({
  // Handle name field - can be string (JSON) or object
  name: yup.lazy((value) => {
    // If value is a string, try to parse it as JSON (for FormData JSON strings)
    if (typeof value === "string") {
      return yup
        .string()
        .test("is-json", "Name must be valid JSON", (val) => {
          if (!val) return false;
          try {
            JSON.parse(val);
            return true;
          } catch {
            return false;
          }
        })
        .transform((val) => JSON.parse(val)) // Convert JSON string to object
        .shape({
          en: yup
            .string()
            .required("English name is required")
            .min(2, "English name must be at least 2 characters")
            .max(100),
          ar: yup
            .string()
            .required("Arabic name is required")
            .min(2, "Arabic name must be at least 2 characters")
            .max(100),
        });
    }

    // If value is already an object, validate it directly
    return yup.object({
      en: yup.string().required("English name is required").min(2).max(100),
      ar: yup.string().required("Arabic name is required").min(2).max(100),
    });
  }),

  // Handle slug field - same pattern as name
  slug: yup.lazy((value) => {
    if (typeof value === "string") {
      return yup
        .string()
        .test("is-json", "Slug must be valid JSON", (val) => {
          try {
            JSON.parse(val!);
            return true;
          } catch {
            return false;
          }
        })
        .transform((val) => JSON.parse(val!))
        .shape({
          en: yup
            .string()
            .required("English slug is required")
            .matches(
              /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
              "English slug can only contain lowercase letters, numbers, and hyphens",
            ),
          ar: yup
            .string()
            .required("Arabic slug is required")
            .matches(
              /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
              "Arabic slug can only contain lowercase letters, numbers, and hyphens",
            ),
        });
    }

    return yup.object({
      en: yup
        .string()
        .required("English slug is required")
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid English slug format"),
      ar: yup
        .string()
        .required("Arabic slug is required")
        .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid Arabic slug format"),
    });
  }),

  // Handle description field - optional with transformation
  description: yup.lazy((value) => {
    if (typeof value === "string") {
      return yup
        .string()
        .optional()
        .transform((val) => (val ? JSON.parse(val) : { en: "", ar: "" }));
    }

    return yup
      .object({
        en: yup.string().optional().max(500, "English description too long"),
        ar: yup.string().optional().max(500, "Arabic description too long"),
      })
      .optional()
      .default({ en: "", ar: "" });
  }),

  // Handle boolean fields with string conversion
  isVisible: yup.lazy((value) => {
    // Convert string booleans to actual booleans
    if (typeof value === "string") {
      return yup
        .string()
        .oneOf(["true", "false", "on", "off"], "Must be a boolean value")
        .transform((val) => val === "true" || val === "on")
        .default(true);
    }
    return yup.boolean().default(true);
  }),

  isFeatured: yup.lazy((value) => {
    if (typeof value === "string") {
      return yup
        .string()
        .oneOf(["true", "false", "on", "off"], "Must be a boolean value")
        .transform((val) => val === "true" || val === "on")
        .default(false);
    }
    return yup.boolean().default(false);
  }),

  // Handle image field - can be File object or URL string
  image: yup
    .mixed()
    .test("is-file-or-url", "Image must be a file or valid URL", (value) => {
      if (!value) return true; // Optional field
      return typeof value === "string" || value instanceof File;
    })
    .nullable()
    .optional(),

  // Handle number field with string conversion
  sortOrder: yup.lazy((value) => {
    if (typeof value === "string") {
      return yup
        .string()
        .matches(/^\d+$/, "Must be a valid number")
        .transform((val) => (val ? parseInt(val, 10) : 0))
        .default(0);
    }
    return yup.number().min(0, "Sort order cannot be negative").default(0);
  }),
});

// Type definition for TypeScript
export type CategoryFormData = yup.InferType<typeof CreateCategorySchema>;
