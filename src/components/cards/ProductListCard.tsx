"use client";
import { useState } from "react";

const ProductListCard = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      sku: "WH-2023-001",
      category: "electronics",
      type: "physical",
      price: 129.99,
      stock: 45,
      status: "active",
      featured: true,
      description: "High-quality wireless headphones with noise cancellation",
      attributes: {
        color: ["Black", "White"],
        size: ["One Size"],
        brand: "AudioTech",
        weight: "0.5kg",
        warranty: "2 years",
      },
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300",
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=300",
      ],
    },
    {
      id: 2,
      name: "Online Course - Web Development",
      sku: "CO-2023-002",
      category: "digital",
      type: "digital",
      price: 89.99,
      stock: 999,
      status: "active",
      featured: false,
      description: "Complete web development course for beginners",
      attributes: {
        duration: "40 hours",
        format: "Video",
        access: "Lifetime",
        level: "Beginner",
      },
      images: [
        "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300",
      ],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Product types and their attributes
  const productTypes = {
    physical: {
      name: "Physical Product",
      attributes: [
        "color",
        "size",
        "brand",
        "weight",
        "warranty",
        "material",
        "dimensions",
      ],
    },
    digital: {
      name: "Digital Product",
      attributes: [
        "file_format",
        "file_size",
        "duration",
        "access_period",
        "compatibility",
        "license_type",
      ],
    },
    service: {
      name: "Service",
      attributes: [
        "duration",
        "location",
        "provider",
        "availability",
        "certification",
      ],
    },
  };

  const categories = [
    { value: "electronics", label: "Electronics" },
    { value: "clothing", label: "Clothing" },
    { value: "home", label: "Home & Garden" },
    { value: "digital", label: "Digital Products" },
    { value: "services", label: "Services" },
  ];

  // Filter products
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || product.status === statusFilter;
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Add new product
  const handleAddProduct = () => {
    setEditingProduct({
      id: Date.now(),
      name: "",
      sku: "",
      category: "",
      type: "physical",
      price: 0,
      stock: 0,
      status: "active",
      featured: false,
      description: "",
      attributes: {},
      images: [],
    });
    setIsModalOpen(true);
  };

  // Edit product
  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
    setIsModalOpen(true);
  };

  // Delete product
  const handleDeleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== productId));
    }
  };

  // Toggle status
  const toggleStatus = (productId) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? {
              ...product,
              status: product.status === "active" ? "inactive" : "active",
            }
          : product,
      ),
    );
  };

  // Save product
  const handleSaveProduct = (productData) => {
    if (products.some((p) => p.id === productData.id)) {
      // Update existing
      setProducts(
        products.map((p) => (p.id === productData.id ? productData : p)),
      );
    } else {
      // Add new
      setProducts([...products, productData]);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 space-y-4 lg:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Product Management
          </h2>
          <p className="text-gray-600">
            Manage your e-commerce products with dynamic attributes
          </p>
        </div>
        <button
          onClick={handleAddProduct}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Search products..."
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <select
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Images
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {product.images.length > 0 && (
                      <img
                        className="h-12 w-12 rounded-lg object-cover"
                        src={product.images[0]}
                        alt={product.name}
                      />
                    )}
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-500">{product.sku}</div>
                      <div className="text-xs text-gray-400">
                        {product.category}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                    {productTypes[product.type]?.name || product.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      product.stock > 10
                        ? "bg-green-100 text-green-800"
                        : product.stock > 0
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.stock} in stock
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleStatus(product.id)}
                    className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full cursor-pointer ${
                      product.status === "active"
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-red-100 text-red-800 hover:bg-red-200"
                    }`}
                  >
                    {product.status === "active" ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex -space-x-2">
                    {product.images.slice(0, 3).map((img, index) => (
                      <img
                        key={index}
                        className="h-8 w-8 rounded border-2 border-white"
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                      />
                    ))}
                    {product.images.length > 3 && (
                      <div className="h-8 w-8 rounded bg-gray-200 border-2 border-white flex items-center justify-center text-xs font-medium">
                        +{product.images.length - 3}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 space-x-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="text-blue-600 hover:text-blue-900 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-900 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <ProductModal
          product={editingProduct}
          productTypes={productTypes}
          categories={categories}
          onSave={handleSaveProduct}
          onClose={() => {
            setIsModalOpen(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
};

// Enhanced Product Modal Component
const ProductModal = ({
  product,
  productTypes,
  categories,
  onSave,
  onClose,
}) => {
  const [formData, setFormData] = useState(product);
  const [newImage, setNewImage] = useState("");
  const [newAttribute, setNewAttribute] = useState({ key: "", value: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  // Handle image uploads
  const handleAddImage = () => {
    if (newImage.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, newImage.trim()],
      }));
      setNewImage("");
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Handle dynamic attributes
  const handleAddAttribute = () => {
    if (newAttribute.key.trim() && newAttribute.value.trim()) {
      setFormData((prev) => ({
        ...prev,
        attributes: {
          ...prev.attributes,
          [newAttribute.key.trim()]: newAttribute.value.trim(),
        },
      }));
      setNewAttribute({ key: "", value: "" });
    }
  };

  const handleRemoveAttribute = (key) => {
    const newAttributes = { ...formData.attributes };
    delete newAttributes[key];
    setFormData((prev) => ({
      ...prev,
      attributes: newAttributes,
    }));
  };

  const handleAttributeChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [key]: value,
      },
    }));
  };

  // Get available attributes for selected product type
  const availableAttributes = productTypes[formData.type]?.attributes || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">
            {product.id <= 2 ? "Edit Product" : "Add New Product"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  SKU *
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.sku}
                  onChange={(e) =>
                    setFormData({ ...formData, sku: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category *
                </label>
                <select
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Type *
                </label>
                <select
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value,
                      attributes: {},
                    })
                  }
                >
                  {Object.entries(productTypes).map(([key, type]) => (
                    <option key={key} value={key}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: parseFloat(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            {/* Multiple Images Upload */}
            <div className="border-t pt-4">
              <h4 className="text-md font-medium mb-3">Product Images</h4>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <input
                    type="url"
                    placeholder="Enter image URL"
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={handleAddImage}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Add Image
                  </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="h-24 w-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Dynamic Attributes based on Product Type */}
            <div className="border-t pt-4">
              <h4 className="text-md font-medium mb-3">Product Attributes</h4>

              {/* Predefined attributes for product type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {availableAttributes.map((attr) => (
                  <div key={attr}>
                    <label className="block text-sm font-medium text-gray-700 capitalize">
                      {attr.replace("_", " ")}
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={formData.attributes[attr] || ""}
                      onChange={(e) =>
                        handleAttributeChange(attr, e.target.value)
                      }
                      placeholder={`Enter ${attr}`}
                    />
                  </div>
                ))}
              </div>

              {/* Custom attributes */}
              <div className="border-t pt-4">
                <h5 className="text-sm font-medium mb-3">Custom Attributes</h5>
                <div className="space-y-2">
                  {Object.entries(formData.attributes).map(
                    ([key, value]) =>
                      !availableAttributes.includes(key) && (
                        <div key={key} className="flex items-center space-x-2">
                          <span className="text-sm font-medium capitalize w-20">
                            {key}:
                          </span>
                          <input
                            type="text"
                            className="flex-1 border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            value={value}
                            onChange={(e) =>
                              handleAttributeChange(key, e.target.value)
                            }
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveAttribute(key)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      ),
                  )}

                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Attribute name"
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={newAttribute.key}
                      onChange={(e) =>
                        setNewAttribute({
                          ...newAttribute,
                          key: e.target.value,
                        })
                      }
                    />
                    <input
                      type="text"
                      placeholder="Attribute value"
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      value={newAttribute.value}
                      onChange={(e) =>
                        setNewAttribute({
                          ...newAttribute,
                          value: e.target.value,
                        })
                      }
                    />
                    <button
                      type="button"
                      onClick={handleAddAttribute}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Stock and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t pt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stock: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                  />
                  <label
                    htmlFor="featured"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Featured Product
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="status"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={formData.status === "active"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.checked ? "active" : "inactive",
                      })
                    }
                  />
                  <label
                    htmlFor="status"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Active Product
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 border-t pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductListCard;
