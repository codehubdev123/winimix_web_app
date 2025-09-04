const NewsLetter = () => {
  return (
    <div className="bg-primary/30 border-t border-primary py-12 px-4 sm:px-6 lg:px-8 mt-12">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-font mb-2">Stay Updated</h2>
        <p className="text-font/200 mb-6">
          Subscribe to our newsletter to get updates on new categories and
          products
        </p>
        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-secondary"
          />
          <button className="bg-primary hover:bg-secondary text-white font-medium py-2 px-6 rounded-lg transition-colors duration-300">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
