"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
  Parallax,
} from "swiper/modules";
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
  Sparkles,
  Rocket,
  Camera,
  Video,
  FileText,
  Cloud,
  Server,
  Cpu,
  Database,
  GitBranch,
  Grid,
  Layout,
  Smartphone as MobileIcon,
  Monitor,
  Filter,
} from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/parallax";

export default function PremiumAgencyHomepage() {
  const [darkMode, setDarkMode] = useState(false);
  const [isRTL, setIsRTL] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activePortfolioTab, setActivePortfolioTab] = useState("all");

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

    // Scroll progress tracker
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.offsetHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isRTL]);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Portfolio filter tabs
  const portfolioTabs = [
    { id: "all", name: "جميع الأعمال", icon: <Grid className="w-4 h-4" /> },
    { id: "web", name: "مواقع ويب", icon: <Monitor className="w-4 h-4" /> },
    {
      id: "mobile",
      name: "تطبيقات جوال",
      icon: <MobileIcon className="w-4 h-4" />,
    },
    {
      id: "branding",
      name: "هوية بصرية",
      icon: <Palette className="w-4 h-4" />,
    },
    {
      id: "marketing",
      name: "تسويق رقمي",
      icon: <BarChart3 className="w-4 h-4" />,
    },
  ];

  // Portfolio items data
  const portfolioItems = [
    {
      id: 1,
      title: "منصة تجارة إلكترونية",
      category: "web",
      description: "تصميم وتطوير منصة تجارة إلكترونية متكاملة مع نظام دفع آمن",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      featured: true,
    },
    {
      id: 2,
      title: "تطبيق توصيل طعام",
      category: "mobile",
      description: "تطبيق جوال لأنظمة iOS و Android مع لوحة تحكم للمطاعم",
      image:
        "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      featured: false,
    },
    {
      id: 3,
      title: "هوية علامة تجارية",
      category: "branding",
      description: "تصميم هوية بصرية متكاملة لشركة ناشئة في مجال التقنية",
      image:
        "https://images.unsplash.com/photo-1545235617-9465d2a55698?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      featured: true,
    },
    {
      id: 4,
      title: "حملة تسويق رقمي",
      category: "marketing",
      description: "حملة تسويق رقمي متكاملة لزيادة الوعي بالعلامة التجارية",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      featured: false,
    },
    {
      id: 5,
      title: "منصة تعليمية",
      category: "web",
      description: "منصة تعليمية تفاعلية مع نظام إدارة محتوى متكامل",
      image:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      featured: true,
    },
    {
      id: 6,
      title: "تطبيق لياقة بدنية",
      category: "mobile",
      description: "تطبيق متكامل لللياقة البدنية مع نظام متابعة وتقارير",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      featured: false,
    },
    {
      id: 7,
      title: "هوية لمطعم",
      category: "branding",
      description:
        "تصميم هوية بصرية كاملة لمطعم راقي بما فيها القوائم والتغليف",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      featured: false,
    },
    {
      id: 8,
      title: "إستراتيجية وسائط اجتماعية",
      category: "marketing",
      description: "إستراتيجية متكاملة لإدارة الوسائط الاجتماعية لعلامة تجارية",
      image:
        "https://images.unsplash.com/photo-1432888622747-4eb9a8f5a07a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      featured: true,
    },
    {
      id: 9,
      title: "موقع شركة تقنية",
      category: "web",
      description: "موقع شركة تقنية مع عرض المنتجات والخدمات بشكل مبتكر",
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      featured: false,
    },
  ];

  // Filter portfolio items based on active tab
  const filteredPortfolio =
    activePortfolioTab === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activePortfolioTab);

  // Services data
  const services = [
    {
      id: 1,
      title: "التسويق الرقمي",
      description:
        "استراتيجيات تسويق مبتكرة تعزز وجود علامتك التجارية وتحقق أهدافك",
      icon: <BarChart3 className="w-10 h-10" />,
      gradient: "from-green-500 to-emerald-600",
    },
    {
      id: 2,
      title: "تصميم الويب",
      description:
        "تصاميم ويب فريدة وسريعة الاستجابة تعكس هوية علامتك التجارية",
      icon: <Code className="w-10 h-10" />,
      gradient: "from-green-600 to-teal-600",
    },
    {
      id: 3,
      title: "تطبيقات الجوال",
      description:
        "تطبيقات جوال مبتكرة لأنظمة iOS و Android بتجربة مستخدم استثنائية",
      icon: <Smartphone className="w-10 h-10" />,
      gradient: "from-emerald-500 to-green-700",
    },
    {
      id: 4,
      title: "استشارات الأعمال",
      description:
        "استشارات احترافية لتحسين أداء عملك وزيادة أرباحك بشكل مستدام",
      icon: <Users className="w-10 h-10" />,
      gradient: "from-teal-500 to-green-600",
    },
    {
      id: 5,
      title: "إدارة الوسائط",
      description:
        "إدارة محترفة لجميع منصات الوسائط الاجتماعية لتعزيز engagement",
      icon: <MessageCircle className="w-10 h-10" />,
      gradient: "from-green-600 to-emerald-700",
    },
    {
      id: 6,
      title: "تحسين محركات البحث",
      description:
        "تحسين ظهور موقعك في نتائج محركات البحث وزيادة الزيارات العضوية",
      icon: <Search className="w-10 h-10" />,
      gradient: "from-emerald-600 to-teal-700",
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
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5,
    },
    {
      id: 2,
      name: "سارة الفهد",
      position: "مالكة متجر إلكتروني",
      content:
        "زادت مبيعاتي بنسبة 200% بعد التعامل مع الوكالة وتنفيذ استراتيجيتهم التسويقية المميزة.",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5,
    },
    {
      id: 3,
      name: "محمد القحطاني",
      position: "CEO, TechStart",
      content:
        "الوكالة قدمت لنا حلولاً تقنية متكاملة ساهمت في نمو أعمالنا بشكل ملحوظ وفي وقت قياسي.",
      avatar:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 4,
    },
    {
      id: 4,
      name: "لطيفة الحربي",
      position: "مديرة مشاريع، مؤسسة النهضة",
      content:
        "فريق العمل محترف جداً ويقدم خدمات بتقنيات عالية الجودة وأسعار مناسبة.",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      rating: 5,
    },
  ];

  // Team members data
  const team = [
    {
      id: 1,
      name: "خالد العتيبي",
      position: "مدير التسويق",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      social: { twitter: "#", linkedin: "#" },
    },
    {
      id: 2,
      name: "نورة السعد",
      position: "مصممة UX/UI",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      social: { twitter: "#", linkedin: "#" },
    },
    {
      id: 3,
      name: "فهد الشمري",
      position: "مطور ويب",
      image:
        "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      social: { twitter: "#", linkedin: "#" },
    },
    {
      id: 4,
      name: "لمى الجهني",
      position: "أخصائية SEO",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      social: { twitter: "#", linkedin: "#" },
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
      className={`min-h-screen transition-colors duration-500 ${darkMode ? "dark bg-gradient-to-br from-gray-900 to-gray-800 text-white" : "bg-gradient-to-br from-gray-50 to-white text-gray-900"}`}
    >
      {/* Scroll progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full bg-gradient-to-r from-green-500 to-green-700 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000" />
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000" />
      </div>

      {/* Fixed Navbar - stays at top while scrolling */}
      <header className="fixed w-full z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md py-4 shadow-md border-b border-gray-200/30 dark:border-gray-700/30">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-700 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
              <Shield className="w-6 h-6" />
            </div>
            <span className="mr-3 rtl:mr-0 rtl:ml-3 font-bold text-xl bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              الوكالة السعودية
            </span>
          </div>

          <nav className="hidden md:flex space-x-8 rtl:space-x-reverse">
            <a
              href="#home"
              className="relative group hover:text-green-600 transition-colors"
            >
              الرئيسية
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full" />
            </a>
            <a
              href="#services"
              className="relative group hover:text-green-600 transition-colors"
            >
              خدماتنا
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full" />
            </a>
            <a
              href="#portfolio"
              className="relative group hover:text-green-600 transition-colors"
            >
              أعمالنا
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full" />
            </a>
            <a
              href="#about"
              className="relative group hover:text-green-600 transition-colors"
            >
              من نحن
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full" />
            </a>
            <a
              href="#contact"
              className="relative group hover:text-green-600 transition-colors"
            >
              اتصل بنا
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full" />
            </a>
          </nav>

          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900 transition-colors shadow-sm"
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
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900 transition-colors shadow-sm"
              aria-label="Toggle direction"
            >
              {isRTL ? (
                <ChevronLeft className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>

            <button
              className="md:hidden p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900 transition-colors shadow-sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>

            <button className="hidden md:block bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg">
              اطلب خدمة
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-lg py-4 animate-slide-down">
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              <a
                href="#home"
                className="hover:text-green-600 transition-colors py-2"
              >
                الرئيسية
              </a>
              <a
                href="#services"
                className="hover:text-green-600 transition-colors py-2"
              >
                خدماتنا
              </a>
              <a
                href="#portfolio"
                className="hover:text-green-600 transition-colors py-2"
              >
                أعمالنا
              </a>
              <a
                href="#about"
                className="hover:text-green-600 transition-colors py-2"
              >
                من نحن
              </a>
              <a
                href="#contact"
                className="hover:text-green-600 transition-colors py-2"
              >
                اتصل بنا
              </a>
              <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-2 rounded-lg transition-all duration-300 shadow-md">
                اطلب خدمة
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section with Swiper */}
      <section id="home" className="pt-24 pb-16 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-gray-900 z-10" />

        <Swiper
          modules={[EffectFade, Autoplay, Pagination, Parallax]}
          effect="fade"
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          speed={1000}
          parallax={true}
          className="h-[85vh]"
        >
          <SwiperSlide>
            <div className="relative h-full w-full overflow-hidden">
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transform scale-110 swiper-parallax"
                data-swiper-parallax="-30%"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)",
                }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 swiper-parallax"
                data-swiper-parallax="-20%"
              ></div>

              <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
                <div className="max-w-4xl">
                  <Sparkles className="w-16 h-16 mx-auto mb-6 text-green-400 animate-pulse" />
                  <h1
                    className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up"
                    data-swiper-parallax="-100"
                  >
                    وكالة{" "}
                    <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                      سعودية
                    </span>{" "}
                    رائدة
                  </h1>
                  <p
                    className="text-xl md:text-2xl mb-8 text-gray-100 animate-fade-in-up delay-200"
                    data-swiper-parallax="-200"
                  >
                    نقدم حلولاً إبداعية ومبتكرة لتعزيز وجودك الرقمي وزيادة
                    مبيعاتك
                  </p>
                  <div
                    className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 rtl:sm:space-x-reverse animate-fade-in-up delay-300"
                    data-swiper-parallax="-300"
                  >
                    <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group">
                      اكتشف خدماتنا
                      <ArrowLeft className="mr-2 rtl:mr-0 rtl:ml-2 group-hover:animate-bounce-horizontal rtl:group-hover:animate-bounce-horizontal-rtl" />
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm px-8 py-4 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/30">
                      اتصل بنا
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative h-full w-full overflow-hidden">
              <div
                className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transform scale-110 swiper-parallax"
                data-swiper-parallax="-30%"
                style={{
                  backgroundImage:
                    "url(https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)",
                }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40 swiper-parallax"
                data-swiper-parallax="-20%"
              ></div>

              <div className="relative z-20 h-full flex items-center justify-center text-center px-4">
                <div className="max-w-4xl">
                  <Rocket className="w-16 h-16 mx-auto mb-6 text-green-400 animate-pulse" />
                  <h1
                    className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in-up"
                    data-swiper-parallax="-100"
                  >
                    تصميم وتطوير{" "}
                    <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                      ويب احترافية
                    </span>
                  </h1>
                  <p
                    className="text-xl md:text-2xl mb-8 text-gray-100 animate-fade-in-up delay-200"
                    data-swiper-parallax="-200"
                  >
                    نصمم مواقع ويب جذابة وسريعة الاستجابة تلبي احتياجات عملك
                  </p>
                  <div
                    className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 rtl:sm:space-x-reverse animate-fade-in-up delay-300"
                    data-swiper-parallax="-300"
                  >
                    <button className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center group">
                      تصفح أعمالنا
                      <ArrowLeft className="mr-2 rtl:mr-0 rtl:ml-2 group-hover:animate-bounce-horizontal rtl:group-hover:animate-bounce-horizontal-rtl" />
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm px-8 py-4 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/30">
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
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dark opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className="text-center p-8 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-white/20 transition-all duration-500 hover:-translate-y-3 animate-fade-in-up group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-6 group-hover:animate-pulse">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold mb-3 group-hover:text-green-200 transition-colors">
                  {stat.value}
                </div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 relative">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-green-600/5 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
              <Sparkles className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              خدماتنا{" "}
              <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                المتميزة
              </span>
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
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group border border-gray-100 dark:border-gray-700/50 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`p-4 rounded-xl bg-gradient-to-r ${service.gradient} w-fit mb-6 group-hover:animate-pulse`}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {service.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium group-hover:animate-pulse"
                >
                  اكتشف المزيد
                  <ArrowLeft className="mr-1 rtl:mr-0 rtl:ml-1 mt-1 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section with Filter Tabs */}
      <section
        id="portfolio"
        className="py-20 bg-gray-50 dark:bg-gray-900/50 relative"
      >
        <div className="absolute inset-0 bg-dots opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
              <Layout className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              معرض{" "}
              <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                أعمالنا
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              استعرض مجموعة من مشاريعنا الناجحة في مختلف المجالات
            </p>
          </div>

          {/* Portfolio Filter Tabs */}
          <div className="flex flex-wrap justify-center mb-12 gap-2">
            {portfolioTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePortfolioTab(tab.id)}
                className={`flex items-center px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activePortfolioTab === tab.id
                    ? "bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-md"
                }`}
              >
                <span className="ml-2 rtl:ml-0 rtl:mr-2">{tab.icon}</span>
                {tab.name}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPortfolio.map((item, index) => (
              <div
                key={item.id}
                className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in-up relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {item.featured && (
                    <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
                      <Star
                        className="w-3 h-3 ml-1 rtl:ml-0 rtl:mr-1"
                        fill="currentColor"
                      />
                      مميز
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors mx-auto mb-4">
                      عرض المشروع
                      <ArrowLeft className="mr-1 rtl:mr-0 rtl:ml-1" />
                    </button>
                  </div>
                </div>
                <div className="p-5 bg-white dark:bg-gray-800">
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                    {portfolioTabs.find((t) => t.id === item.category)?.name}
                  </span>
                  <h3 className="font-semibold text-lg mt-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredPortfolio.length === 0 && (
            <div className="text-center py-12">
              <Filter className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-400">
                لا توجد مشاريع في هذا التصنيف
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                جرب تصنيفاً آخر لعرض المشاريع
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-green-200 dark:bg-green-900/20 rounded-full -translate-y-36 translate-x-36 opacity-50" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200 dark:bg-emerald-900/20 rounded-full translate-y-48 -translate-x-48 opacity-50" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
              <Star className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              آراء{" "}
              <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                عملائنا
              </span>
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
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700/50">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover shadow-md"
                    />
                    <div className="mr-3 rtl:mr-0 rtl:ml-3">
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {testimonial.content}
                  </p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${i < testimonial.rating ? "text-amber-400 fill-current" : "text-gray-300"}`}
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
      <section id="about" className="py-20 relative">
        <div className="absolute inset-0 bg-grid-green-500/10 dark:bg-grid-green-400/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-6">
              <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              فريقنا{" "}
              <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                المحترف
              </span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              تعرف على الفريق المبدع الذي يعمل خلف الكواليس لتحقيق نجاحك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={member.id}
                className="text-center group animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden rounded-2xl mb-5">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-4">
                    <div className="flex space-x-3 rtl:space-x-reverse mb-4">
                      <a
                        href={member.social.twitter}
                        className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-colors hover:animate-pulse"
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                      <a
                        href={member.social.linkedin}
                        className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full backdrop-blur-sm transition-colors hover:animate-pulse"
                      >
                        <Users className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-lg group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
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
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-lines opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Zap className="w-16 h-16 mx-auto mb-6 text-green-200 animate-pulse" />
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            مستعد لبدء <span className="text-green-200">مشروعك</span> القادم؟
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            تواصل معنا اليوم واحصل على استشارة مجانية لمشروعك
          </p>
          <button className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center mx-auto group">
            اتصل بنا الآن
            <Phone className="ml-2 rtl:ml-0 rtl:mr-2 group-hover:animate-ring" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-green-600/10 to-transparent" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-700 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <Shield className="w-6 h-6" />
                </div>
                <span className="mr-3 rtl:mr-0 rtl:ml-3 font-bold text-xl bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                  الوكالة السعودية
                </span>
              </div>
              <p className="text-gray-400 mb-6">
                نقدم حلولاً إبداعية ومبتكرة لتعزيز وجودك الرقمي وزيادة مبيعاتك
              </p>
              <div className="flex space-x-4 rtl:space-x-reverse">
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

            <div>
              <h3 className="font-semibold text-lg mb-6">روابط سريعة</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors flex items-center group"
                  >
                    الرئيسية{" "}
                    <ArrowLeft className="mr-1 rtl:mr-0 rtl:ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors flex items-center group"
                  >
                    خدماتنا{" "}
                    <ArrowLeft className="mr-1 rtl:mr-0 rtl:ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors flex items-center group"
                  >
                    أعمالنا{" "}
                    <ArrowLeft className="mr-1 rtl:mr-0 rtl:ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors flex items-center group"
                  >
                    من نحن{" "}
                    <ArrowLeft className="mr-1 rtl:mr-0 rtl:ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors flex items-center group"
                  >
                    اتصل بنا{" "}
                    <ArrowLeft className="mr-1 rtl:mr-0 rtl:ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-6">خدماتنا</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors flex items-center group"
                  >
                    التسويق الرقمي{" "}
                    <ArrowLeft className="mr-1 rtl:mr-0 rtl:ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors flex items-center group"
                  >
                    تصميم الويب{" "}
                    <ArrowLeft className="mr-1 rtl:mr-0 rtl:ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors flex items-center group"
                  >
                    تطبيقات الجوال{" "}
                    <ArrowLeft className="mr-1 rtl:mr-0 rtl:ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors flex items-center group"
                  >
                    استشارات الأعمال{" "}
                    <ArrowLeft className="mr-1 rtl:mr-0 rtl:ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-green-400 transition-colors flex items-center group"
                  >
                    تحسين محركات البحث{" "}
                    <ArrowLeft className="mr-1 rtl:mr-0 rtl:ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-6">اتصل بنا</h3>
              <address className="text-gray-400 not-italic">
                <div className="flex items-center mb-4">
                  <MapPin className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2 text-green-400" />
                  <span>الرياض، المملكة العربية السعودية</span>
                </div>
                <div className="flex items-center mb-4">
                  <Mail className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2 text-green-400" />
                  <span>info@saudiagency.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 ml-2 rtl:ml-0 rtl:mr-2 text-green-400" />
                  <span>+966 12 345 6789</span>
                </div>
              </address>
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
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
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
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes slide-down {
          from {
            transform: translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
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
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        .bg-pattern-dark {
          background-image: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.1) 1px,
            transparent 1px
          );
          background-size: 20px 20px;
        }
        .bg-dots {
          background-image: radial-gradient(
            circle,
            rgba(0, 0, 0, 0.1) 1px,
            transparent 1px
          );
          background-size: 20px 20px;
        }
        .bg-grid-green-500\/10 {
          background-image:
            linear-gradient(
              to right,
              rgba(16, 185, 129, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(16, 185, 129, 0.1) 1px,
              transparent 1px
            );
          background-size: 20px 20px;
        }
        .bg-lines {
          background-image: linear-gradient(
            to right,
            rgba(255, 255, 255, 0.1) 1px,
            transparent 1px
          );
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
}
