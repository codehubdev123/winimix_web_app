"use client";

import { useState } from "react";
import {
  CreditCard,
  Truck,
  Lock,
  ArrowRight,
  ArrowLeft,
  Shield,
  CheckCircle,
  MapPin,
  Edit,
  ChevronDown,
  Plus,
} from "lucide-react";

const CheckoutPage = () => {
  const [activeTab, setActiveTab] = useState("information");
  const [isRTL, setIsRTL] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    saveInfo: false,
    shippingMethod: "standard",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const cartItems = [
    {
      id: 1,
      name: "iPhone 13 Pro Max",
      price: 999,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80",
    },
    {
      id: 2,
      name: "Apple Watch Series 7",
      price: 399,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80",
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 15;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const shippingMethods = [
    {
      id: "standard",
      name: "التوصيل العادي",
      price: 15,
      delivery: "2-5 أيام عمل",
    },
    {
      id: "express",
      name: "التوصيل السريع",
      price: 25,
      delivery: "1-2 أيام عمل",
    },
    {
      id: "priority",
      name: "التوصيل المميز",
      price: 40,
      delivery: "خلال 24 ساعة",
    },
  ];

  return (
    <div
      className={`min-h-screen bg-gray-50 ${isRTL ? "rtl" : "ltr"}`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Header */}

      {/* Progress Steps */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            {activeTab === "information" && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  معلومات الاتصال
                </h2>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="example@example.com"
                  />
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  عنوان الشحن
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الاسم الأول
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الاسم الأخير
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    العنوان
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      المدينة
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الرمز البريدي
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center mb-6">
                  <input
                    type="checkbox"
                    id="saveInfo"
                    name="saveInfo"
                    checked={formData.saveInfo}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded ml-2 rtl:ml-0 rtl:mr-2"
                  />
                  <label
                    htmlFor="saveInfo"
                    className="block text-sm text-gray-700"
                  >
                    حفظ المعلومات للمرة القادمة
                  </label>
                </div>

                <button
                  onClick={() => setActiveTab("shipping")}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  الاستمرار إلى الشحن
                  <ArrowLeft className="ml-2 rtl:ml-0 rtl:mr-2" />
                </button>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  طريقة الشحن
                </h2>

                <div className="border border-gray-200 rounded-lg divide-y divide-gray-200 mb-6">
                  {shippingMethods.map((method) => (
                    <div key={method.id} className="p-4">
                      <div className="flex items-start">
                        <input
                          type="radio"
                          id={method.id}
                          name="shippingMethod"
                          value={method.id}
                          checked={formData.shippingMethod === method.id}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 mt-1 ml-3 rtl:ml-0 rtl:mr-3"
                        />
                        <div className="flex-1">
                          <label
                            htmlFor={method.id}
                            className="block text-sm font-medium text-gray-700"
                          >
                            {method.name}
                          </label>
                          <p className="text-sm text-gray-500 mt-1">
                            {method.delivery}
                          </p>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          ${method.price}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-4 rtl:space-x-reverse">
                  <button
                    onClick={() => setActiveTab("information")}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <ArrowRight className="ml-2 rtl:ml-0 rtl:mr-2" />
                    العودة
                  </button>
                  <button
                    onClick={() => setActiveTab("payment")}
                    className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    الاستمرار إلى الدفع
                    <ArrowLeft className="ml-2 rtl:ml-0 rtl:mr-2" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === "payment" && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  طريقة الدفع
                </h2>

                <div className="border border-gray-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <CreditCard className="text-gray-600 ml-2 rtl:ml-0 rtl:mr-2" />
                      <span className="font-medium">بطاقة ائتمان</span>
                    </div>
                    <div className="flex space-x-2 rtl:space-x-reverse">
                      <img
                        src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/visa.svg"
                        alt="Visa"
                        className="h-6"
                      />
                      <img
                        src="https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/svg/color/mastercard.svg"
                        alt="Mastercard"
                        className="h-6"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      رقم البطاقة
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      اسم صاحب البطاقة
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        تاريخ الانتهاء
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center mb-6">
                  <CheckCircle
                    className="text-green-500 ml-2 rtl:ml-0 rtl:mr-2"
                    size={20}
                  />
                  <span className="text-sm text-gray-600">
                    سيتم خصم المبلغ بعد الموافقة على الطلب
                  </span>
                </div>

                <div className="flex space-x-4 rtl:space-x-reverse">
                  <button
                    onClick={() => setActiveTab("shipping")}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center"
                  >
                    <ArrowRight className="ml-2 rtl:ml-0 rtl:mr-2" />
                    العودة
                  </button>
                  <button className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center">
                    اكمال الطلب
                  </button>
                </div>
              </div>
            )}

            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                ضمان الاسترجاع
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                نضمن لك حق الاسترجاع خلال 14 يومًا من استلام المنتج في حال وجود
                أي عيوب أو إذا لم يكن المنتج كما هو موصوف.
              </p>
              <div className="flex items-center text-sm text-gray-600">
                <Shield className="ml-2 rtl:ml-0 rtl:mr-2" size={16} />
                <span>مشترى آمن ومحمي</span>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                ملخص الطلب
              </h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="mr-4 rtl:mr-0 rtl:ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-800">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        الكمية: {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-gray-800">
                      ${item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">المجموع الفرعي</span>
                  <span className="text-gray-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">الشحن</span>
                  <span className="text-gray-800">${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">الضريبة</span>
                  <span className="text-gray-800">${tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between border-t border-gray-200 pt-4 mb-6">
                <span className="text-lg font-bold text-gray-800">المجموع</span>
                <span className="text-lg font-bold text-gray-800">
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="flex items-center text-sm text-gray-600 mb-4">
                <Truck className="ml-2 rtl:ml-0 rtl:mr-2" size={16} />
                <span>التوصيل خلال 2-5 أيام عمل</span>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <Lock className="ml-2 rtl:ml-0 rtl:mr-2" size={16} />
                <span>معاملات آمنة ومشفرة</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
