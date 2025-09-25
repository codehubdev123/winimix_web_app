export const categorySchema = {
  name: {
    en: "",
    ar: "",
  },
  slug: {
    en: "",
    ar: "",
  },
  description: {
    en: "",
    ar: "",
  },
  isVisible: true,
  isFeatured: false,
  image: "",
  parentId: null, // For subcategories
  sortOrder: 0,
  metaTitle: {
    en: "",
    ar: "",
  },
  metaDescription: {
    en: "",
    ar: "",
  },
  createdAt: null,
  updatedAt: null,
};

export const categoryValidationSchema = {
  name: {
    en: { required: true, minLength: 2, maxLength: 100 },
    ar: { required: true, minLength: 2, maxLength: 100 },
  },
  slug: {
    en: { required: true, pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/ },
    ar: { required: true, pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/ },
  },
};
