"use client";

import MenuLink from "@/features/admin/shared/components/links/MenuLink";
import MenuLinkDropdown from "@/features/admin/shared/components/links/MenuLinkDropdown";
import MenuLinkDropdownItem from "@/features/admin/shared/components/links/MenuLinkDropdownItem";
import {
  route_admin_categories_create,
  route_admin_dashboard,
  route_categories_add,
  route_dashboard,
} from "@/routes/admin";
import {
  BarChart3,
  Box,
  ChevronDown,
  ChevronUp,
  Home,
  Settings,
  ShoppingBag,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SidebarAdmin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdown: any) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };
  return (
    <>
      {" "}
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      <aside
        className={`fixed lg:static w-64 bg-gray-900 text-white h-full z-30 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold flex items-center">
            <ShoppingBag className="mr-3 text-blue-400" />
            <span className="truncate">Admin Panel</span>
          </h1>
          <p className="text-sm text-gray-400 mt-2">eCommerce Dashboard</p>
        </div>

        <nav className="mt-6 px-4">
          <MenuLink
            name={"Dashboard"}
            href={route_admin_dashboard}
            iconName="home"
          />
          <MenuLinkDropdown
            name={"Categories"}
            iconName="box"
            menuId={"categories"}
          >
            <MenuLinkDropdownItem
              name={"Add New"}
              href={route_admin_categories_create}
            />
          </MenuLinkDropdown>
          {/* Products Dropdown */}
          <MenuLinkDropdown
            name={"Products"}
            iconName="box"
            menuId={"products"}
          >
            <MenuLinkDropdownItem name={"Add New"} href={"/product/add"} />
          </MenuLinkDropdown>
          {/* Orders Dropdown */}
          <MenuLinkDropdown name={"Orders"} iconName="box" menuId={"orders"}>
            <MenuLinkDropdownItem name={"All Orders"} href={"/orders"} />
          </MenuLinkDropdown>

          {/* Customers Dropdown */}
        </nav>

        <div className="absolute bottom-0 w-full p-6 border-t border-gray-800">
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Admin User"
            />
            <div className="ml-3">
              <p className="text-sm font-medium">John Anderson</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SidebarAdmin;
