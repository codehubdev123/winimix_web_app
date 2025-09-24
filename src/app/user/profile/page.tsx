"use client";

import { useState } from "react";
import ProfileBanner from "@/components/profile/ProfileBanner";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ChangePassword from "@/components/profile/ChangePassword";
import Wishlist from "@/components/profile/Wishlist";
import Dropshipping from "@/components/profile/Dropshipping";
import Orders from "@/components/profile/Orders";
import { User, Heart, Lock, Package, Truck, Settings } from "lucide-react";

const tabs = [
  {
    id: "profile",
    label: "Profile Information",
    labelAr: "معلومات الملف",
    icon: User,
  },
  {
    id: "password",
    label: "Change Password",
    labelAr: "تغيير كلمة المرور",
    icon: Lock,
  },
  { id: "wishlist", label: "Wishlist", labelAr: "المفضلة", icon: Heart },
  {
    id: "dropshipping",
    label: "Dropshipping",
    labelAr: "البيع بالعمولة",
    icon: Truck,
  },
  { id: "orders", label: "My Orders", labelAr: "طلباتي", icon: Package },
];

const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  profileImage: "/api/placeholder/150/150",
  joinDate: "January 2024",
  location: "New York, USA",
  stats: {
    orders: 12,
    wishlist: 8,
    reviews: 2,
    years: 1,
  },
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(userData);
  const [isRTL, setIsRTL] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileInfo user={user} setUser={setUser} isRTL={isRTL} />;
      case "password":
        return <ChangePassword isRTL={isRTL} />;
      case "wishlist":
        return <Wishlist isRTL={isRTL} />;
      case "dropshipping":
        return <Dropshipping isRTL={isRTL} />;
      case "orders":
        return <Orders isRTL={isRTL} />;
      default:
        return <ProfileInfo user={user} setUser={setUser} isRTL={isRTL} />;
    }
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Centered Profile Banner */}
      <ProfileBanner user={user} isRTL={isRTL} setIsRTL={setIsRTL} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-[#222934] text-white shadow-md"
                          : "text-gray-700 hover:bg-gray-50 hover:text-[#222934]"
                      } ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <Icon className={`w-5 h-5 ${isRTL ? "ml-3" : "mr-3"}`} />
                      <span className="font-medium">
                        {isRTL ? tab.labelAr : tab.label}
                      </span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-lg border border-gray-200">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
