"use client";
const NewPageBannerTwo = () => {
  return (
    <section className="text-gray-600 body-font bg-main ">
      <div className="container mx-auto flex md:py-10 md:flex-row flex-col items-center px-2  lg:px-8">
        <div
          className="lg:flex-grow mt-5 md:mt-0   md:w-1.5/2  flex flex-col md:items-start
            md:text-left mb-16 md:mb-0 items-center text-center "
        >
          <h1
            className="text-2xl md:text-center mt-10 md:mt-auto lg:text-3xl xl:text-5xl
                font-bold lg:font-extrabold
                mb-3 text-black text-shadow mx-auto"
          >
            All Categories
          </h1>
          <p className="mb-8 md:pl-0  pl-2 pr-2 leading-relaxed text-black text-shadow text-xl mx-auto">
            All Categories
          </p>
          <div className="flex justify-center">
            <a
              href="#"
              className="ml-4 inline-flex text-dark bg-white border-0 py-2 px-6 focus:outline-none hover:bg-gold text-shadow rounded text-lg"
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
              consequatur sint deleniti laborum ipsa sapiente rerum voluptate
              sed quae? Laboriosam corrupti facere hic dolores alias in non
              dignissimos earum. Atque!
            </a>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full mb-5 md:mb-0 md:w-1/2 w-3/6 hidden md:block">
          <img src="/banner.png" alt="" />
        </div>
      </div>
    </section>
  );
};

export default NewPageBannerTwo;
