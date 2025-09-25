import * as yup from "yup";

// Multi-language string validation
const multiLanguageString = (fieldName) =>
  yup.object({
    en: yup
      .string()
      .min(2, `${fieldName} (English) must be at least 2 characters`)
      .max(100, `${fieldName} (English) must not exceed 100 characters`)
      .required(`${fieldName} (English) is required`),
    ar: yup
      .string()
      .min(2, `${fieldName} (Arabic) must be at least 2 characters`)
      .max(100, `${fieldName} (Arabic) must not exceed 100 characters`)
      .required(`${fieldName} (Arabic) is required`),
  });

// Slug validation
const slugSchema = yup.object({
  en: yup
    .string()
    .matches(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug (English) must be URL-friendly",
    )
    .required("Slug (English) is required"),
  ar: yup
    .string()
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug (Arabic) must be URL-friendly")
    .required("Slug (Arabic) is required"),
});

export const categoryValidationSchema = yup.object({
  name: multiLanguageString("Name"),
  slug: slugSchema,
  description: yup.object({
    en: yup
      .string()
      .max(500, "Description (English) must not exceed 500 characters"),
    ar: yup
      .string()
      .max(500, "Description (Arabic) must not exceed 500 characters"),
  }),
  isVisible: yup.boolean().default(true),
  isFeatured: yup.boolean().default(false),
  image: yup.string().url("Must be a valid URL").nullable(),
  parentId: yup.string().nullable(),
  sortOrder: yup.number().integer().min(0).default(0),
  metaTitle: yup.object({
    en: yup
      .string()
      .max(100, "Meta title (English) must not exceed 100 characters"),
    ar: yup
      .string()
      .max(100, "Meta title (Arabic) must not exceed 100 characters"),
  }),
  metaDescription: yup.object({
    en: yup
      .string()
      .max(200, "Meta description (English) must not exceed 200 characters"),
    ar: yup
      .string()
      .max(200, "Meta description (Arabic) must not exceed 200 characters"),
  }),
});

export const categoryUpdateSchema = categoryValidationSchema.shape({
  // Add any update-specific validations here
});
