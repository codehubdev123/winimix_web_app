"use client";

import { useState } from "react";
import ProfileBanner from "@/components/profile/ProfileBanner";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ChangePassword from "@/components/profile/ChangePassword";
import Wishlist from "@/components/profile/Wishlist";
import { User, Heart, Lock, Settings } from "lucide-react";

const tabs = [
  { id: "profile", label: "Profile Information", icon: User },
  { id: "password", label: "Change Password", icon: Lock },
  { id: "wishlist", label: "Wishlist", icon: Heart },
];

// Mock user data
const userData = {
  name: "John Doe",
  email: "john.doe@example.com",
  profileImage: "/api/placeholder/150/150",
  joinDate: "January 2024",
  location: "New York, USA",
  language: "English", // This will determine RTL/LTR
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(userData);
  const [isRTL, setIsRTL] = useState(false); // You can set this based on user language

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return <ProfileInfo user={user} setUser={setUser} isRTL={isRTL} />;
      case "password":
        return <ChangePassword isRTL={isRTL} />;
      case "wishlist":
        return <Wishlist isRTL={isRTL} />;
      default:
        return <ProfileInfo user={user} setUser={setUser} isRTL={isRTL} />;
    }
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Profile Banner */}
      <ProfileBanner user={user} isRTL={isRTL} setIsRTL={setIsRTL} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "text-gray-700 hover:bg-gray-50"
                      } ${isRTL ? "flex-row-reverse" : ""}`}
                    >
                      <Icon className={`w-5 h-5 ${isRTL ? "ml-3" : "mr-3"}`} />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
