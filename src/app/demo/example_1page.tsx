"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import {
  ArrowLeft,
  ArrowRight,
  Moon,
  Sun,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Clock,
  Heart,
  Star,
  Users,
  Target,
  Award,
  ChevronRight,
  ChevronLeft,
  Calendar,
  BarChart3,
  Code,
  Palette,
  Smartphone,
  MessageCircle,
  Search,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

export default function AgencyHomepage() {
  const [darkMode, setDarkMode] = useState(false);
  const [isRTL, setIsRTL] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check system preference for dark mode
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setDarkMode(true);
    }

    // Set initial direction based on client requirement
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Services data
  const services = [
    {
      id: 1,
      title: "التسويق الرقمي",
      description:
        "نقدم استراتيجيات تسويق رقمي مخصصة لتعزيز وجود علامتك التجارية",
      icon: <BarChart3 className="w-10 h-10" />,
    },
    {
      id: 2,
      title: "تصميم الويب",
      description: "تصميم مواقع ويب جذابة وسريعة الاستجابة تلبي احتياجات عملك",
      icon: <Code className="w-10 h-10" />,
    },
    {
      id: 3,
      title: "تطبيقات الجوال",
      description: "تطوير تطبيقات جوال مبتكرة لأنظمة iOS و Android",
      icon: <Smartphone className="w-10 h-10" />,
    },
    {
      id: 4,
      title: "استشارات الأعمال",
      description: "نقدم استشارات احترافية لتحسين أداء عملك وزيادة أرباحك",
      icon: <Users className="w-10 h-10" />,
    },
    {
      id: 5,
      title: "إدارة الوسائط الاجتماعية",
      description:
        "إدارة محترفة لجميع منصات الوسائط الاجتماعية لعلامتك التجارية",
      icon: <MessageCircle className="w-10 h-10" />,
    },
    {
      id: 6,
      title: "تحسين محركات البحث",
      description: "تحسين ظهور موقعك في نتائج محركات البحث وزيادة الزيارات",
      icon: <Search className="w-10 h-10" />,
    },
  ];

  // Projects data
  const projects = [
    {
      id: 1,
      title: "موقع تجارة إلكترونية",
      category: "تصميم الويب",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      title: "تطبيق توصيل طعام",
      category: "تطبيقات الجوال",
      image:
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      title: "حملة تسويق رقمي",
      category: "التسويق الرقمي",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 4,
      title: "هوية علامة تجارية",
      category: "تصميم الشعار",
      image:
        "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 5,
      title: "منصة تعليمية",
      category: "تطوير الويب",
      image:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 6,
      title: "إستراتيجية وسائط اجتماعية",
      category: "إدارة الوسائط",
      image:
        "https://images.unsplash.com/photo-1432888622747-4eb9a8f5a07a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "أحمد السديس",
      position: "مدير تسويق، شركة التقنية",
      content:
        "تعاملت مع العديد من وكالات التسويق، ولكن هذه الوكالة تميزت بالإبداع والاحترافية في تنفيذ الحملات التسويقية.",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 2,
      name: "سارة الفهد",
      position: "مالكة متجر إلكتروني",
      content:
        "زادت مبيعاتي بنسبة 200% بعد التعامل مع الوكالة وتنفيذ استراتيجيتهم التسويقية المميزة.",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 3,
      name: "محمد القحطاني",
      position: "CEO, TechStart",
      content:
        "الوكالة قدمت لنا حلولاً تقنية متكاملة ساهمت في نمو أعمالنا بشكل ملحوظ وفي وقت قياسي.",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 4,
      name: "لطيفة الحربي",
      position: "مديرة مشاريع، مؤسسة النهضة",
      content:
        "فريق العمل محترف جداً ويقدم خدمات بتقنيات عالية الجودة وأسعار مناسبة.",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
  ];

  // Team members data
  const team = [
    {
      id: 1,
      name: "خالد العتيبي",
      position: "مدير التسويق",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 2,
      name: "نورة السعد",
      position: "مصممة UX/UI",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 3,
      name: "فهد الشمري",
      position: "مطور ويب",
      image:
        "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 4,
      name: "لمى الجهني",
      position: "أخصائية SEO",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
  ];

  // Stats data
  const stats = [
    {
      id: 1,
      value: "250+",
      label: "مشروع مكتمل",
      icon: <Target className="w-8 h-8" />,
    },
    {
      id: 2,
      value: "120+",
      label: "عميل سعيد",
      icon: <Heart className="w-8 h-8" />,
    },
    {
      id: 3,
      value: "98%",
      label: "رضا العملاء",
      icon: <Star className="w-8 h-8" />,
    },
    {
      id: 4,
      value: "15+",
      label: "جائزة محلية",
      icon: <Award className="w-8 h-8" />,
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"}`}
    >
      {/* Header */}
      <header className="fixed w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm py-4 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-green-800 rounded-lg flex items-center justify-center text-white font-bold text-xl">
              <Shield className="w-6 h-6" />
            </div>
            <span className="mr-3 rtl:mr-0 rtl:ml-3 font-bold text-xl">
              الوكالة السعودية
            </span>
          </div>

          <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
            <a href="#home" className="hover:text-green-600 transition-colors">
              الرئيسية
            </a>
            <a
              href="#services"
              className="hover:text-green-600 transition-colors"
            >
              خدماتنا
            </a>
            <a
              href="#projects"
              className="hover:text-green-600 transition-colors"
            >
              أعمالنا
            </a>
            <a href="#about" className="hover:text-green-600 transition-colors">
              من نحن
            </a>
            <a
              href="#contact"
              className="hover:text-green-600 transition-colors"
            >
              اتصل بنا
            </a>
          </nav>

          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={() => setIsRTL(!isRTL)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
              aria-label="Toggle direction"
            >
              {isRTL ? (
                <ChevronLeft className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>

            <button
              className="md:hidden p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            <button className="hidden md:block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors">
              اطلب خدمة
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-lg py-4">
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              <a
                href="#home"
                className="hover:text-green-600 transition-colors"
              >
                الرئيسية
              </a>
              <a
                href="#services"
                className="hover:text-green-600 transition-colors"
              >
                خدماتنا
              </a>
              <a
                href="#projects"
                className="hover:text-green-600 transition-colors"
              >
                أعمالنا
              </a>
              <a
                href="#about"
                className="hover:text-green-600 transition-colors"
              >
                من نحن
              </a>
              <a
                href="#contact"
                className="hover:text-green-600 transition-colors"
              >
                اتصل بنا
              </a>
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors w-full">
                اطلب خدمة
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section with Swiper */}
      <section id="home" className="pt-24 pb-16">
        <Swiper
          modules={[EffectFade, Autoplay, Pagination]}
          effect="fade"
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          className="h-[80vh]"
        >
          <SwiperSlide>
            <div className="relative h-full w-full">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                alt="Digital Marketing"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <div className="max-w-3xl px-4">
                  <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                    وكالة سعودية رائدة في التسويق الرقمي
                  </h1>
                  <p className="text-xl mb-8 animate-fade-in delay-200">
                    نقدم حلولاً إبداعية ومبتكرة لتعزيز وجودك الرقمي وزيادة
                    مبيعاتك
                  </p>
                  <div className="flex justify-center space-x-4 rtl:space-x-reverse animate-fade-in delay-300">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition-colors flex items-center group">
                      اكتشف خدماتنا
                      <ArrowLeft className="mr-2 rtl:mr-0 rtl:ml-2 group-hover:animate-bounce-horizontal rtl:group-hover:animate-bounce-horizontal-rtl" />
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm px-8 py-3 rounded-lg transition-colors">
                      اتصل بنا
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative h-full w-full">
              <img
                src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                alt="Web Development"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute inset-0 flex items-center justify-center text-center">
                <div className="max-w-3xl px-4">
                  <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                    تصميم وتطوير مواقع ويب احترافية
                  </h1>
                  <p className="text-xl mb-8 animate-fade-in delay-200">
                    نصمم مواقع ويب جذابة وسريعة الاستجابة تلبي احتياجات عملك
                  </p>
                  <div className="flex justify-center space-x-4 rtl:space-x-reverse animate-fade-in delay-300">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition-colors flex items-center group">
                      تصفح أعمالنا
                      <ArrowLeft className="mr-2 rtl:mr-0 rtl:ml-2 group-hover:animate-bounce-horizontal rtl:group-hover:animate-bounce-horizontal-rtl" />
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm px-8 py-3 rounded-lg transition-colors">
                      اطلب عرض سعر
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-4 animate-pulse">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              خدماتنا الاحترافية
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              نقدم مجموعة متكاملة من خدمات التسويق الرقمي وتطوير الويب لمساعدة
              عملك على النمو
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-green-600 mb-4 group-hover:animate-bounce">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center mt-4 text-green-600 hover:text-green-700 font-medium group-hover:animate-pulse"
                >
                  اكتشف المزيد
                  <ArrowLeft className="mr-1 rtl:mr-0 rtl:ml-1 mt-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              أعمالنا الأخيرة
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              استعرض بعض مشاريعنا الناجحة التي نفخر بها
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center">
                      عرض المشروع
                      <ArrowLeft className="mr-1 rtl:mr-0 rtl:ml-1" />
                    </button>
                  </div>
                </div>
                <div className="p-4 bg-white dark:bg-gray-700">
                  <span className="text-sm text-green-600">
                    {project.category}
                  </span>
                  <h3 className="font-semibold text-lg">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg transition-colors flex items-center mx-auto group">
              شاهد المزيد من الأعمال
              <ArrowLeft className="mr-2 rtl:mr-0 rtl:ml-2 group-hover:animate-bounce-horizontal rtl:group-hover:animate-bounce-horizontal-rtl" />
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ما قاله عملاؤنا
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              آراء عملائنا تهمنا ونعمل دائماً لتجاوز توقعاتهم
            </p>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            className="pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="mr-3 rtl:mr-0 rtl:ml-3">
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    {testimonial.content}
                  </p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-amber-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Team Section */}
      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              فريقنا المحترف
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              تعرف على الفريق المبدع الذي يعمل خلف الكواليس لتحقيق نجاحك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={member.id}
                className="text-center group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden rounded-xl mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-green-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4 rtl:space-x-reverse">
                    <a
                      href="#"
                      className="text-white bg-black/20 p-2 rounded-full hover:bg-black/30 transition-colors hover:animate-pulse"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="text-white bg-black/20 p-2 rounded-full hover:bg-black/30 transition-colors hover:animate-pulse"
                    >
                      <Users className="w-5 h-5" />
                    </a>
                  </div>
                </div>
                <h3 className="font-semibold text-lg group-hover:text-green-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {member.position}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <Zap className="w-16 h-16 mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            مستعد لبدء مشروعك القادم؟
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            تواصل معنا اليوم واحصل على استشارة مجانية لمشروعك
          </p>
          <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors flex items-center mx-auto group">
            اتصل بنا الآن
            <Phone className="ml-2 rtl:ml-0 rtl:mr-2 group-hover:animate-ring" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-800 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  <Shield className="w-6 h-6" />
                </div>
                <span className="mr-3 rtl:mr-0 rtl:ml-3 font-bold text-xl">
                  الوكالة السعودية
                </span>
              </div>
              <p className="text-gray-400">
                نقدم حلولاً إبداعية ومبتكرة لتعزيز وجودك الرقمي وزيادة مبيعاتك
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">روابط سريعة</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    الرئيسية
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    خدماتنا
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    أعمالنا
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    من نحن
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    اتصل بنا
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">خدماتنا</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    التسويق الرقمي
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    تصميم الويب
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    تطبيقات الجوال
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    استشارات الأعمال
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors"
                  >
                    تحسين محركات البحث
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">اتصل بنا</h3>
              <address className="text-gray-400 not-italic">
                <div className="flex items-center mb-2">
                  <MapPin className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2" />
                  <span>الرياض، المملكة العربية السعودية</span>
                </div>
                <div className="flex items-center mb-2">
                  <Mail className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2" />
                  <span>info@saudiagency.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2" />
                  <span>+966 12 345 6789</span>
                </div>
              </address>
              <div className="flex space-x-4 rtl:space-x-reverse mt-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition-colors hover:animate-pulse"
                >
                  <Globe className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition-colors hover:animate-pulse"
                >
                  <Users className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 transition-colors hover:animate-pulse"
                >
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} الوكالة السعودية. جميع الحقوق
              محفوظة.
            </p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce-horizontal {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(-5px);
          }
        }
        @keyframes bounce-horizontal-rtl {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(5px);
          }
        }
        @keyframes ring {
          0% {
            transform: rotate(0);
          }
          25% {
            transform: rotate(15deg);
          }
          50% {
            transform: rotate(-15deg);
          }
          75% {
            transform: rotate(5deg);
          }
          100% {
            transform: rotate(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .group-hover .group-hover\:animate-bounce-horizontal:hover {
          animation: bounce-horizontal 1s infinite;
        }
        .group-hover .group-hover\:animate-bounce-horizontal-rtl:hover {
          animation: bounce-horizontal-rtl 1s infinite;
        }
        .group-hover .group-hover\:animate-ring:hover {
          animation: ring 1s ease;
        }
      `}</style>
    </div>
  );
}
