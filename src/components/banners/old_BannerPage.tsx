"use client";
const BannerPage = ({ title }: { title: string }) => {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80')`,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 to-primary z-1"></div>

      {/* Animated Blobs */}
      <div className="absolute top-0 left-0 w-full h-full z-2">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-32 w-96 h-96 bg-primary rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-32 w-80 h-80 bg-primary rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          {title}
        </h1>
        <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
          Discover our wide range of products organized by category
        </p>
      </div>
    </div>
  );
};

export default BannerPage;
