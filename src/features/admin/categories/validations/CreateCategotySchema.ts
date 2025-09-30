import * as yup from "yup";

export const CreateCategorySchema = yup.object({
  // Name field with bilingual support
  name: yup.object({
    en: yup
      .string()
      .required("English name is required")
      .min(2, "English name must be at least 2 characters")
      .max(100, "English name cannot exceed 100 characters"),
    ar: yup
      .string()
      .required("Arabic name is required")
      .min(2, "Arabic name must be at least 2 characters")
      .max(100, "Arabic name cannot exceed 100 characters"),
  }),

  // Slug field with URL-friendly validation
  // slug: yup.object({
  //   en: yup
  //     .string()
  //     .required("English slug is required")
  //     .matches(
  //       /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  //       "English slug can only contain lowercase letters, numbers, and hyphens",
  //     ),
  //   ar: yup
  //     .string()
  //     .required("Arabic slug is required")
  //     .matches(
  //       /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  //       "Arabic slug can only contain lowercase letters, numbers, and hyphens",
  //     ),
  // }),

  // Description field - optional
  description: yup
    .object({
      en: yup
        .string()
        .required()
        .max(500, "English description cannot exceed 500 characters"),
      ar: yup
        .string()
        .required()
        .max(500, "Arabic description cannot exceed 500 characters"),
    })
    .required()
    .default({ en: "", ar: "" }),

  // Visibility toggle
  isVisible: yup.boolean().required().default(true),

  // Featured status
  isFeatured: yup.boolean().required().default(false),

  // Image field - can be File (new upload) or string (existing URL)
  image: yup
    .mixed()
    .required()
    .test("is-valid-image", "Image must be a valid file or URL", (value) => {
      // Allow empty/undefined (image is optional)
      if (!value) return true;

      // Allow File objects (new uploads)
      if (value instanceof File) return true;

      // Allow string URLs (existing images)
      if (typeof value === "string") return true;

      return false;
    }),
  // .nullable(),
  // Sorting order
  sortOrder: yup.number().min(0, "Sort order cannot be negative").default(0),
});

export type CategoryFormData = yup.InferType<typeof CreateCategorySchema>;

export const EditCategorySchema = CreateCategorySchema.shape({
  // Make image optional for edit
  image: yup
    .mixed()
    .nullable() // Allow null
    .optional() // Make it optional
    .test("is-valid-image", "Image must be a valid file or URL", (value) => {
      // Allow empty/undefined/null (image is optional in edit)
      if (!value || value === null || value === "") return true;

      // Allow File objects (new uploads)
      if (value instanceof File) return true;

      // Allow string URLs (existing images)
      if (typeof value === "string") return true;

      return false;
    }),
});
