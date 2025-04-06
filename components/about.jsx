import React from "react";
const About = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">About CarbonIQ</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto">
          We help industries monitor, innovate, and reduce carbon emissions. Our
          mission is to accelerate the transition to a sustainable future
          through advanced technology and data-driven insights.
        </p>
        <div className="mt-12 flex justify-center">
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
