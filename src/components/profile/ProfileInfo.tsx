"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Save, Edit, User, Mail, MapPin, Phone } from "lucide-react";

const profileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),
});

export default function ProfileInfo({ user, setUser, isRTL }) {
  const [isEditing, setIsEditing] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user.name.split(" ")[0],
      lastName: user.name.split(" ").slice(1).join(" "),
      email: user.email,
      phone: "+1 (555) 123-4567",
      address: "123 Main Street",
      city: "New York",
      country: "United States",
    },
  });

  const onSubmit = async (data) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Profile updated:", data);
    setUser((prev) => ({
      ...prev,
      name: `${data.firstName} ${data.lastName}`,
    }));
    setIsEditing(false);
  };

  return (
    <div className="p-6 lg:p-8">
      <div
        className={`flex items-center justify-between mb-6 ${isRTL ? "flex-row-reverse" : ""}`}
      >
        <h2 className="text-2xl font-bold text-gray-900">
          {isRTL ? "معلومات الملف الشخصي" : "Profile Information"}
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <Edit className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
          {isEditing
            ? isRTL
              ? "إلغاء"
              : "Cancel"
            : isRTL
              ? "تعديل الملف"
              : "Edit Profile"}
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div className={isRTL ? "text-right" : ""}>
            <label
              className={`flex items-center text-sm font-medium text-gray-700 mb-2 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <User className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {isRTL ? "الاسم الأول" : "First Name"}
            </label>
            <input
              {...register("firstName")}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              dir={isRTL ? "rtl" : "ltr"}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div className={isRTL ? "text-right" : ""}>
            <label
              className={`flex items-center text-sm font-medium text-gray-700 mb-2 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <User className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {isRTL ? "الاسم الأخير" : "Last Name"}
            </label>
            <input
              {...register("lastName")}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              dir={isRTL ? "rtl" : "ltr"}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className={`md:col-span-2 ${isRTL ? "text-right" : ""}`}>
            <label
              className={`flex items-center text-sm font-medium text-gray-700 mb-2 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <Mail className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {isRTL ? "البريد الإلكتروني" : "Email Address"}
            </label>
            <input
              type="email"
              {...register("email")}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              dir="ltr" // Email should always be LTR
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className={isRTL ? "text-right" : ""}>
            <label
              className={`flex items-center text-sm font-medium text-gray-700 mb-2 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <Phone className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {isRTL ? "رقم الهاتف" : "Phone Number"}
            </label>
            <input
              {...register("phone")}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              dir="ltr" // Phone numbers should always be LTR
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div className={`md:col-span-2 ${isRTL ? "text-right" : ""}`}>
            <label
              className={`flex items-center text-sm font-medium text-gray-700 mb-2 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <MapPin className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {isRTL ? "العنوان" : "Address"}
            </label>
            <input
              {...register("address")}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              dir={isRTL ? "rtl" : "ltr"}
            />
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* City */}
          <div className={isRTL ? "text-right" : ""}>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              {isRTL ? "المدينة" : "City"}
            </label>
            <input
              {...register("city")}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              dir={isRTL ? "rtl" : "ltr"}
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          {/* Country */}
          <div className={isRTL ? "text-right" : ""}>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              {isRTL ? "البلد" : "Country"}
            </label>
            <input
              {...register("country")}
              disabled={!isEditing}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              dir={isRTL ? "rtl" : "ltr"}
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">
                {errors.country.message}
              </p>
            )}
          </div>
        </div>

        {isEditing && (
          <div
            className={`flex justify-end pt-4 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <Save className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {isSubmitting
                ? isRTL
                  ? "جاري الحفظ..."
                  : "Saving..."
                : isRTL
                  ? "حفظ التغييرات"
                  : "Save Changes"}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
