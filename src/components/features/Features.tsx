import { ShoppingBag, Star, Tag, Truck } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: <Truck className="w-8 h-8 text-white" />,
      title: "Free Shipping",
      description: "On orders over $50",
    },
    {
      icon: <ShoppingBag className="w-8 h-8 text-white" />,
      title: "Easy Returns",
      description: "30-day return policy",
    },
    {
      icon: <Star className="w-8 h-8 text-white" />,
      title: "Quality Products",
      description: "Curated selection",
    },
    {
      icon: <Tag className="w-8 h-8 text-white" />,
      title: "Best Prices",
      description: "Competitive pricing",
    },
  ];
  return (
    <div className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              className="relative flex flex-col justify-center overflow-hidden border border-primary/20"
              key={index}
            >
              <div className="group relative cursor-pointer overflow-hidden bg-white  pt-10 pb-8 transition-all duration-300 hover:-translate-y-1 sm:mx-auto w-full">
                <span className="absolute top-10 left-1/2 -translate-x-1/2 z-0 h-20 w-20 rounded-full bg-primary transition-all duration-300 group-hover:scale-[10]"></span>

                <div className="relative z-10 flex flex-col items-center text-center">
                  <span className="grid h-20 w-20 place-items-center rounded-full bg-primary transition-all duration-300 group-hover:bg-secondary text-white">
                    {feature.icon}
                  </span>

                  <div className="space-y-6 pt-5 text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-white/90">
                    <h3 className="font-semibold  mb-2">{feature.title}</h3>
                    <p className="text-sm ">{feature.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
