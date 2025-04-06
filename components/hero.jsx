import React from "react";
const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to CarbonIQ
          </h1>
          <h2 className="text-2xl text-gray-700 mb-8">
            AI-powered carbon footprint calculator for Industries
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Help industries monitor, analyze, and reduce their carbon emissions
            in real-time with advanced AI technology.
          </p>
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors">
            Start Tracking
          </button>
        </div>
        <div className="relative">
          <div className="w-full h-[400px] bg-green-50 rounded-full absolute -z-10 transform translate-x-4 translate-y-4"></div>
          <img
            src="/image.png"
            alt="Industrial facility with sustainable features"
            className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
