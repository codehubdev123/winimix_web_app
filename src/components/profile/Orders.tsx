// components/profile/Dropshipping.jsx
"use client";

import { useState } from "react";
import { Plus, TrendingUp, Users, DollarSign, Package } from "lucide-react";

export default function Dropshipping({ isRTL }) {
  const [products] = useState([
    {
      id: 1,
      name: "Wireless Earbuds",
      price: 79.99,
      commission: 15,
      sales: 45,
      status: "active",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.99,
      commission: 20,
      sales: 23,
      status: "active",
    },
    {
      id: 3,
      name: "Phone Case",
      price: 24.99,
      commission: 10,
      sales: 67,
      status: "paused",
    },
  ]);

  const stats = [
    { label: "Total Commission", value: "$1,234.56", icon: DollarSign },
    { label: "Products", value: "12", icon: Package },
    { label: "Monthly Sales", value: "89", icon: TrendingUp },
    { label: "Customers", value: "156", icon: Users },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div
        className={`flex items-center justify-between mb-6 ${isRTL ? "flex-row-reverse" : ""}`}
      >
        <h2 className="text-2xl font-bold text-gray-900">
          {isRTL ? "البيع بالعمولة" : "Dropshipping"}
        </h2>
        <button
          className={`flex items-center px-4 py-2 bg-[#222934] text-white rounded-lg hover:bg-[#2a3240] transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <Plus className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
          {isRTL ? "إضافة منتج" : "Add Product"}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-gradient-to-br from-[#222934] to-[#2a3240] text-white p-6 rounded-lg"
            >
              <div
                className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <div>
                  <p className="text-blue-200 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <Icon className="w-8 h-8 text-blue-300 opacity-80" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {isRTL ? "منتجاتي" : "My Products"}
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {isRTL ? "المنتج" : "Product"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {isRTL ? "السعر" : "Price"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {isRTL ? "العمولة" : "Commission"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {isRTL ? "المبيعات" : "Sales"}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {isRTL ? "الحالة" : "Status"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {product.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${product.price}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {product.commission}%
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.sales}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        product.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {product.status === "active"
                        ? isRTL
                          ? "نشط"
                          : "Active"
                        : isRTL
                          ? "متوقف"
                          : "Paused"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
