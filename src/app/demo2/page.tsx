// app/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

// Define types for our data
interface Service {
  icon: string;
  title: string;
  description: string;
}

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

interface PortfolioItem {
  title: string;
  category: string;
  image: string;
}

interface MarketingPlan {
  name: string;
  price: string;
  features: string[];
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Refs for animation
  const servicesRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const blogRef = useRef<HTMLDivElement>(null);

  // Sample data
  const services: Service[] = [
    {
      icon: "🚀",
      title: "Digital Marketing",
      description:
        "Comprehensive digital marketing strategies to boost your online presence and engagement.",
    },
    {
      icon: "💻",
      title: "Web Development",
      description:
        "Modern, responsive websites built with the latest technologies for optimal performance.",
    },
    {
      icon: "📱",
      title: "App Development",
      description:
        "Native and cross-platform mobile applications for iOS and Android devices.",
    },
    {
      icon: "📊",
      title: "Data Analytics",
      description:
        "Turn your data into actionable insights with our advanced analytics solutions.",
    },
    {
      icon: "🎨",
      title: "Branding",
      description:
        "Create a memorable brand identity that resonates with your target audience.",
    },
    {
      icon: "🔍",
      title: "SEO Optimization",
      description:
        "Improve your search engine rankings and drive organic traffic to your website.",
    },
  ];

  const blogPosts: BlogPost[] = [
    {
      title: "The Future of Digital Marketing in Saudi Arabia",
      excerpt:
        "Exploring the growing trends and opportunities in the Saudi digital market...",
      date: "May 15, 2023",
      image: "/api/placeholder/400/250",
    },
    {
      title: "How to Build a Successful Brand in the Middle East",
      excerpt:
        "Key strategies for establishing a strong brand presence in the Middle Eastern market...",
      date: "April 28, 2023",
      image: "/api/placeholder/400/250",
    },
    {
      title: "The Importance of Mobile Optimization in 2023",
      excerpt:
        "Why mobile-friendly websites are no longer optional for businesses in the region...",
      date: "March 12, 2023",
      image: "/api/placeholder/400/250",
    },
  ];

  const portfolioItems: PortfolioItem[] = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      image: "/api/placeholder/400/300",
    },
    {
      title: "Food Delivery App",
      category: "Mobile App",
      image: "/api/placeholder/400/300",
    },
    {
      title: "Corporate Branding",
      category: "Branding",
      image: "/api/placeholder/400/300",
    },
    {
      title: "Social Media Campaign",
      category: "Digital Marketing",
      image: "/api/placeholder/400/300",
    },
    {
      title: "Data Dashboard",
      category: "Analytics",
      image: "/api/placeholder/400/300",
    },
    {
      title: "SEO Optimization",
      category: "SEO",
      image: "/api/placeholder/400/300",
    },
  ];

  const marketingPlans: MarketingPlan[] = [
    {
      name: "Basic",
      price: "499 SAR/month",
      features: [
        "Social Media Management",
        "10 Posts per Month",
        "Basic Analytics",
      ],
    },
    {
      name: "Professional",
      price: "999 SAR/month",
      features: [
        "Complete Digital Strategy",
        "20 Posts per Month",
        "Advanced Analytics",
        "Ad Campaign Management",
      ],
    },
    {
      name: "Enterprise",
      price: "1999 SAR/month",
      features: [
        "Full-Service Marketing",
        "Unlimited Posts",
        "Comprehensive Analytics",
        "Dedicated Account Manager",
        "24/7 Support",
      ],
    },
  ];

  useEffect(() => {
    // Check system preference for dark mode
    if (typeof window !== "undefined") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setDarkMode(isDark);

      // Simulate loading time
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    // Initialize animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
        }
      });
    }, observerOptions);

    // Observe all animate-on-scroll elements
    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="flex flex-col items-center">
          <div className="relative w-40 h-40 mb-4">
            <div className="absolute inset-0 bg-green-600 rounded-full animate-ping"></div>
            <div className="absolute inset-5 bg-white rounded-full flex items-center justify-center">
              <span className="text-green-600 text-xl font-bold">KSA</span>
            </div>
          </div>
          <p className="text-green-600 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? "dark" : ""}`}>
      <div className="dark:bg-gray-900 dark:text-white transition-colors duration-300">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white dark:bg-gray-800 shadow-md transition-colors duration-300">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center cursor-pointer">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">KSA</span>
                </div>
                <span className="text-xl font-bold text-green-600">
                  Organization
                </span>
              </div>

              <div className="hidden md:flex items-center space-x-8">
                <nav className="flex space-x-6">
                  <a
                    href="#home"
                    className="font-medium hover:text-green-600 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                  >
                    Home
                  </a>
                  <a
                    href="#about"
                    className="font-medium hover:text-green-600 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                  >
                    About
                  </a>
                  <a
                    href="#services"
                    className="font-medium hover:text-green-600 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                  >
                    Services
                  </a>
                  <a
                    href="#marketing"
                    className="font-medium hover:text-green-600 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                  >
                    Marketing Plans
                  </a>
                  <a
                    href="#portfolio"
                    className="font-medium hover:text-green-600 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                  >
                    Portfolio
                  </a>
                  <a
                    href="#blog"
                    className="font-medium hover:text-green-600 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                  >
                    Blog
                  </a>
                  <a
                    href="#contact"
                    className="font-medium hover:text-green-600 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                  >
                    Contact
                  </a>
                </nav>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300"
                    aria-label="Toggle dark mode"
                  >
                    {darkMode ? (
                      <svg
                        className="w-5 h-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-gray-700"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                className="md:hidden flex flex-col space-y-1"
                onClick={toggleMenu}
              >
                <span className="w-6 h-0.5 bg-gray-700 dark:bg-gray-300"></span>
                <span className="w-6 h-0.5 bg-gray-700 dark:bg-gray-300"></span>
                <span className="w-6 h-0.5 bg-gray-700 dark:bg-gray-300"></span>
              </button>
            </div>

            {isMenuOpen && (
              <div className="md:hidden mt-4 py-4 border-t border-gray-200 dark:border-gray-700">
                <nav className="flex flex-col space-y-4">
                  <a
                    href="#home"
                    className="font-medium py-2 hover:text-green-600 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                  >
                    Home
                  </a>
                  <a
                    href="#about"
                    className="font-medium py-2 hover:text-green-600 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                  >
                    About
                  </a>
                  <a
                    href="#services"
                    className="font-medium py-2 hover:text-green-600 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                  >
                    Services
                  </a>
                  <a
                    href="#marketing"
                    className="font-medium py-2 hover:text-green-600 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                  >
                    Marketing Plans
                  </a>
                  <a
                    href="#portfolio"
                    className="font-medium py-2 hover:text-green-600 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                  >
                    Portfolio
                  </a>
                  <a
                    href="#blog"
                    className="font-medium py-2 hover:text-green-600 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                  >
                    Blog
                  </a>
                  <a
                    href="#contact"
                    className="font-medium py-2 hover:text-green-600 transition-colors duration-200 text-gray-700 dark:text-gray-300"
                  >
                    Contact
                  </a>
                </nav>
              </div>
            )}
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section
            id="home"
            className="relative h-screen flex items-center justify-center overflow-hidden"
          >
            <Swiper
              modules={[Autoplay, EffectFade, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              effect="fade"
              autoplay={{ delay: 5000 }}
              pagination={{ clickable: true }}
              className="w-full h-full"
            >
              <SwiperSlide>
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('/api/placeholder/1200/600')`,
                  }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-on-scroll opacity-0 translate-y-10">
                    Innovative Business Solutions
                  </h1>
                  <p
                    className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-on-scroll opacity-0 translate-y-10"
                    style={{ animationDelay: "0.2s" }}
                  >
                    Transforming businesses with cutting-edge strategies
                  </p>
                  <button
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 animate-on-scroll opacity-0 translate-y-10"
                    style={{ animationDelay: "0.4s" }}
                  >
                    Start Your Journey
                  </button>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('/api/placeholder/1200/600')`,
                  }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Marketing Excellence
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                    Driving growth through innovative marketing plans
                  </p>
                  <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                    View Our Plans
                  </button>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url('/api/placeholder/1200/600')`,
                  }}
                >
                  <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center text-white">
                  <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Global Reach
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                    Expanding your business horizons worldwide
                  </p>
                  <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                    Contact Us
                  </button>
                </div>
              </SwiperSlide>
            </Swiper>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                ></path>
              </svg>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll opacity-0 translate-y-10">
                  About Our Organization
                </h2>
                <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
                <p
                  className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-on-scroll opacity-0 translate-y-10"
                  style={{ animationDelay: "0.2s" }}
                >
                  We are a leading Saudi organization dedicated to providing
                  innovative business solutions and marketing strategies
                  tailored to the unique needs of the Middle Eastern market.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div
                  className="animate-on-scroll opacity-0 translate-y-10"
                  style={{ animationDelay: "0.4s" }}
                >
                  <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    To empower businesses in Saudi Arabia and beyond with
                    cutting-edge digital solutions that drive growth and create
                    lasting impact.
                  </p>
                  <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    To be the premier digital transformation partner for
                    organizations throughout the Middle East, helping them
                    thrive in the digital age.
                  </p>
                  <div className="flex space-x-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xl">🇸🇦</span>
                      </div>
                      <span className="font-semibold">Saudi Owned</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-3">
                        <span className="text-xl">🌍</span>
                      </div>
                      <span className="font-semibold">Global Reach</span>
                    </div>
                  </div>
                </div>
                <div
                  className="relative animate-on-scroll opacity-0 translate-y-10"
                  style={{ animationDelay: "0.6s" }}
                >
                  <div className="rounded-lg overflow-hidden shadow-xl">
                    <img
                      src="/api/placeholder/600/400"
                      alt="Our Team"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-green-600 rounded-full flex items-center justify-center text-white font-bold text-center p-4 shadow-lg">
                    Since 2010
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" ref={servicesRef} className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll opacity-0 translate-y-10">
                  Our Services
                </h2>
                <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
                <p
                  className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-on-scroll opacity-0 translate-y-10"
                  style={{ animationDelay: "0.2s" }}
                >
                  We offer a comprehensive range of digital services designed to
                  help your business grow and succeed in the modern marketplace.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transform transition-all duration-500 hover:-translate-y-2 animate-on-scroll opacity-0 translate-y-10"
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4 mx-auto icon-hover-effect">
                      <span className="text-2xl">{service.icon}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-3 text-gray-800 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-center">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Marketing Plans Section */}
          <section id="marketing" className="py-20 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll opacity-0 translate-y-10">
                  Marketing Plans
                </h2>
                <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
                <p
                  className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-on-scroll opacity-0 translate-y-10"
                  style={{ animationDelay: "0.2s" }}
                >
                  Choose the perfect marketing plan for your business needs. All
                  plans include expert consultation and performance reporting.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {marketingPlans.map((plan, index) => (
                  <div
                    key={index}
                    className={`rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:-translate-y-2 animate-on-scroll opacity-0 translate-y-10 ${
                      index === 1
                        ? "border-4 border-green-600 scale-105"
                        : "border border-gray-200 dark:border-gray-700"
                    }`}
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <div
                      className={`p-6 text-center ${index === 1 ? "bg-green-600 text-white" : "bg-white dark:bg-gray-700"}`}
                    >
                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                      <div className="text-3xl font-bold mb-4">
                        {plan.price}
                      </div>
                      <button
                        className={`px-6 py-2 rounded-full font-semibold ${
                          index === 1
                            ? "bg-white text-green-600"
                            : "bg-green-600 text-white"
                        }`}
                      >
                        Get Started
                      </button>
                    </div>
                    <div className="p-6 bg-gray-50 dark:bg-gray-600">
                      <ul className="space-y-3">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center">
                            <svg
                              className="w-5 h-5 text-green-600 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Portfolio Section */}
          <section id="portfolio" ref={portfolioRef} className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll opacity-0 translate-y-10">
                  Our Portfolio
                </h2>
                <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
                <p
                  className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-on-scroll opacity-0 translate-y-10"
                  style={{ animationDelay: "0.2s" }}
                >
                  Explore our recent projects and see how we've helped
                  businesses like yours achieve their goals.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {portfolioItems.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-xl shadow-lg overflow-hidden group animate-on-scroll opacity-0 translate-y-10"
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-green-600 bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <button className="bg-white text-green-600 px-4 py-2 rounded-full font-semibold">
                          View Project
                        </button>
                      </div>
                    </div>
                    <div className="p-4 bg-white dark:bg-gray-800">
                      <h3 className="font-semibold text-lg mb-1">
                        {item.title}
                      </h3>
                      <p className="text-green-600">{item.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Blog Section */}
          <section
            id="blog"
            ref={blogRef}
            className="py-20 bg-gray-50 dark:bg-gray-800"
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll opacity-0 translate-y-10">
                  From Our Blog
                </h2>
                <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
                <p
                  className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-on-scroll opacity-0 translate-y-10"
                  style={{ animationDelay: "0.2s" }}
                >
                  Stay updated with the latest trends, insights, and news in
                  digital marketing and business development.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {blogPosts.map((post, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden animate-on-scroll opacity-0 translate-y-10"
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <span className="text-green-600 text-sm">
                        {post.date}
                      </span>
                      <h3 className="font-semibold text-xl my-3">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {post.excerpt}
                      </p>
                      <a
                        href="#"
                        className="text-green-600 font-semibold flex items-center"
                      >
                        Read More
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          ></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className="text-center mt-12 animate-on-scroll opacity-0 translate-y-10"
                style={{ animationDelay: "0.6s" }}
              >
                <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
                  View All Posts
                </button>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-on-scroll opacity-0 translate-y-10">
                  Contact Us
                </h2>
                <div className="w-20 h-1 bg-green-600 mx-auto mb-6"></div>
                <p
                  className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto animate-on-scroll opacity-0 translate-y-10"
                  style={{ animationDelay: "0.2s" }}
                >
                  Ready to take your business to the next level? Get in touch
                  with us today for a free consultation.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12">
                <div
                  className="animate-on-scroll opacity-0 translate-y-10"
                  style={{ animationDelay: "0.4s" }}
                >
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block mb-2 font-medium">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block mb-2 font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block mb-2 font-medium"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent dark:bg-gray-700 dark:border-gray-600"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
                <div
                  className="animate-on-scroll opacity-0 translate-y-10"
                  style={{ animationDelay: "0.6s" }}
                >
                  <div className="bg-green-600 text-white p-8 rounded-xl">
                    <h3 className="text-2xl font-bold mb-6">Get In Touch</h3>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            ></path>
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            ></path>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold">Address</h4>
                          <p>123 Business District, Riyadh, Saudi Arabia</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            ></path>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold">Phone</h4>
                          <p>+966 12 345 6789</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            ></path>
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-semibold">Email</h4>
                          <p>info@saudiorganization.com</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-xl">KSA</span>
                  </div>
                  <span className="text-xl font-bold">Organization</span>
                </div>
                <p className="text-gray-400 mb-6">
                  Leading the way in digital innovation and business solutions
                  across Saudi Arabia and the Middle East.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 00224 4.59z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.280.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#home"
                      className="text-gray-400 hover:text-green-600 transition-colors duration-300"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about"
                      className="text-gray-400 hover:text-green-600 transition-colors duration-300"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      className="text-gray-400 hover:text-green-600 transition-colors duration-300"
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a
                      href="#marketing"
                      className="text-gray-400 hover:text-green-600 transition-colors duration-300"
                    >
                      Marketing Plans
                    </a>
                  </li>
                  <li>
                    <a
                      href="#portfolio"
                      className="text-gray-400 hover:text-green-600 transition-colors duration-300"
                    >
                      Portfolio
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-6">Services</h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-green-600 transition-colors duration-300"
                    >
                      Digital Marketing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-green-600 transition-colors duration-300"
                    >
                      Web Development
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-green-600 transition-colors duration-300"
                    >
                      App Development
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-green-600 transition-colors duration-300"
                    >
                      Branding
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-green-600 transition-colors duration-300"
                    >
                      SEO Optimization
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-6">Newsletter</h3>
                <p className="text-gray-400 mb-4">
                  Subscribe to our newsletter for the latest updates and offers.
                </p>
                <form className="flex">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="px-4 py-2 w-full rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-600 bg-gray-700"
                  />
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-r-lg transition-colors duration-300"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
              <p>
                © {new Date().getFullYear()} Saudi Organization. All rights
                reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @import "swiper/css";
        @import "swiper/css/effect-fade";
        @import "swiper/css/pagination";

        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        ::-webkit-scrollbar-thumb {
          background: #16a34a;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #15803d;
        }

        .dark ::-webkit-scrollbar-track {
          background: #374151;
        }

        .dark ::-webkit-scrollbar-thumb {
          background: #22c55e;
        }

        .dark ::-webkit-scrollbar-thumb:hover {
          background: #16a34a;
        }

        /* Animation classes */
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition:
            opacity 0.6s ease-out,
            transform 0.6s ease-out;
        }

        .animate-fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }

        .icon-hover-effect {
          transition: all 0.3s ease;
        }

        .icon-hover-effect:hover {
          transform: scale(1.1) rotate(5deg);
        }

        /* Swiper customization */
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5 !important;
        }

        .swiper-pagination-bullet-active {
          opacity: 1 !important;
          background: #16a34a !important;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
