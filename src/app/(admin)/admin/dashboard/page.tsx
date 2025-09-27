"use client";

import { useState, useEffect } from "react";
import {
  Home,
  Box,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  DollarSign,
  ShoppingBag,
  UserPlus,
  TrendingUp,
  Search,
  Bell,
  Mail,
  Download,
  Filter,
} from "lucide-react";
import SidebarAdmin from "@/components/sidebars/SidebarAdmin";
import HeaderAdmin from "@/components/headers/HeaderAdmin";

const AdminDashboard = () => {
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    // Apply RTL/LTR to document
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);

  // Stats data
  const stats = [
    {
      id: 1,
      title: "Total Revenue",
      value: "$24,563.00",
      change: "+18.2%",
      icon: <DollarSign className="w-6 h-6" />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      title: "Total Orders",
      value: "1,842",
      change: "+12.5%",
      icon: <ShoppingBag className="w-6 h-6" />,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 3,
      title: "New Customers",
      value: "324",
      change: "+9.7%",
      icon: <UserPlus className="w-6 h-6" />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      id: 4,
      title: "Conversion Rate",
      value: "3.24%",
      change: "-1.2%",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "bg-amber-100 text-amber-600",
    },
  ];

  // Recent orders data
  const orders = [
    {
      id: 1,
      customer: "John Smith",
      date: "Oct 12, 2023",
      amount: "$245.00",
      status: "Completed",
      statusColor: "bg-green-100 text-green-800",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 2,
      customer: "Emma Johnson",
      date: "Oct 11, 2023",
      amount: "$425.00",
      status: "Processing",
      statusColor: "bg-yellow-100 text-yellow-800",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 3,
      customer: "Michael Chen",
      date: "Oct 10, 2023",
      amount: "$365.00",
      status: "Shipped",
      statusColor: "bg-blue-100 text-blue-800",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 4,
      customer: "Sarah Wilson",
      date: "Oct 9, 2023",
      amount: "$189.00",
      status: "Cancelled",
      statusColor: "bg-red-100 text-red-800",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
  ];

  // Top products data
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: "$199.99",
      sold: 182,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 2,
      name: "Smart Watch",
      category: "Wearables",
      price: "$249.99",
      sold: 156,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 3,
      name: "Running Shoes",
      category: "Footwear",
      price: "$89.99",
      sold: 134,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
  ];

  // Traffic sources data
  const trafficSources = [
    { source: "Direct", percentage: 42, color: "bg-blue-600" },
    { source: "Organic Search", percentage: 28, color: "bg-green-600" },
    { source: "Social Media", percentage: 18, color: "bg-purple-600" },
    { source: "Email", percentage: 12, color: "bg-amber-600" },
  ];

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h3 className="text-2xl font-bold text-gray-800 mt-1">
                  {stat.value}
                </h3>
                <p
                  className={`text-sm mt-2 ${stat.change.includes("+") ? "text-green-600" : "text-red-600"}`}
                >
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts & Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Revenue Overview
            </h3>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>
          <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">Revenue chart visualization</p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Recent Orders
            </h3>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
              View All
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b border-gray-200">
                  <th className="pb-3">Customer</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3">Amount</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td className="py-3">
                      <div className="flex items-center">
                        <img
                          className="h-8 w-8 rounded-full mr-3"
                          src={order.image}
                          alt={order.customer}
                        />
                        <span>{order.customer}</span>
                      </div>
                    </td>
                    <td className="py-3">{order.date}</td>
                    <td className="py-3">{order.amount}</td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 ${order.statusColor} text-xs rounded-full`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Top Products & Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Top Selling Products
            </h3>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-700">
              View All
            </a>
          </div>
          <div className="space-y-4">
            {products.map((product) => (
              <div key={product.id} className="flex items-center">
                <div className="h-12 w-12 bg-gray-200 rounded-lg overflow-hidden mr-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="text-sm text-gray-500">{product.category}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{product.price}</p>
                  <p className="text-sm text-gray-500">{product.sold} sold</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Traffic Sources
            </h3>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
            </select>
          </div>
          <div className="space-y-4">
            {trafficSources.map((source, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{source.source}</span>
                  <span className="text-sm font-medium">
                    {source.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${source.color} h-2 rounded-full`}
                    style={{ width: `${source.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
