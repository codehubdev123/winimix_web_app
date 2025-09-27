"use client";

import { Bell, Mail, Menu, Search } from "lucide-react";

const HeaderAdmin = () => {
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <button
          className="lg:hidden mr-4 text-gray-600"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-semibold">Dashboard</h2>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button className="relative p-2 text-gray-500 hover:text-gray-700">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </button>

        <button className="relative p-2 text-gray-500 hover:text-gray-700">
          <Mail className="w-6 h-6" />
          <span className="absolute top-0 right-0 h-4 w-4 bg-blue-500 rounded-full text-xs text-white flex items-center justify-center">
            7
          </span>
        </button>

        {/* <button */}
        {/*   className="p-2 text-gray-500 hover:text-gray-700" */}
        {/*   onClick={() => setIsRTL(!isRTL)} */}
        {/* > */}
        {/*   {isRTL ? "LTR" : "RTL"} */}
        {/* </button> */}
      </div>
    </header>
  );
};

export default HeaderAdmin;
