// components/profile/ProfileBanner.jsx
"use client";

import { useState, useRef } from "react";
import { Camera, Edit3, Globe, Check, X } from "lucide-react";

export default function ProfileBanner({ user, isRTL, setIsRTL }) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(user.name);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    setIsUploading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Image uploaded:", file);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleNameSave = () => {
    console.log("Name updated to:", editedName);
    setIsEditingName(false);
  };

  const handleNameCancel = () => {
    setEditedName(user.name);
    setIsEditingName(false);
  };

  return (
    <div className="bg-gradient-to-br from-[#222934] via-[#2a3240] to-[#1a1f29] text-white py-16 pb-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Content */}
        <div className="text-center">
          {/* Profile Image */}
          <div className="relative inline-block group mb-6">
            <div className="relative">
              <img
                src={user.profileImage}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-white/20 shadow-2xl object-cover mx-auto"
              />
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Upload Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#222934] text-white p-2 rounded-full shadow-lg hover:bg-[#2a3240] disabled:opacity-50 transition-all duration-200 border-2 border-white"
            >
              {isUploading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Edit3 className="w-5 h-5" />
              )}
            </button>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>

          {/* User Name */}
          <div className="mb-4">
            {isEditingName ? (
              <div className="flex items-center justify-center gap-3">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:border-white/50 text-2xl font-bold text-center w-80"
                  placeholder={isRTL ? "أدخل اسمك" : "Enter your name"}
                />
                <button
                  onClick={handleNameSave}
                  className="p-2 bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Check className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNameCancel}
                  className="p-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4">
                <h1 className="text-4xl font-bold">{user.name}</h1>
                <button
                  onClick={() => setIsEditingName(true)}
                  className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* User Email */}
          <p className="text-gray-300 text-lg mb-6">{user.email}</p>

          {/* User Info */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-gray-300 mb-8">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
              {isRTL ? "انضم في" : "Joined"} {user.joinDate}
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              {user.location}
            </span>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
            <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">
                {user.stats.orders}
              </div>
              <div className="text-gray-300 text-sm">
                {isRTL ? "طلبات" : "Orders"}
              </div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">
                {user.stats.wishlist}
              </div>
              <div className="text-gray-300 text-sm">
                {isRTL ? "المفضلة" : "Wishlist"}
              </div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">
                {user.stats.reviews}
              </div>
              <div className="text-gray-300 text-sm">
                {isRTL ? "تقييمات" : "Reviews"}
              </div>
            </div>
            <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">
                {user.stats.years}
              </div>
              <div className="text-gray-300 text-sm">
                {isRTL ? "سنوات" : "Years"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
