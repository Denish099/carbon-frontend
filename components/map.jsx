import React from "react";
const Map = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16">
          See Emissions Across the Globe
        </h2>
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
            alt="World map with emission points"
            className="w-full h-[500px] object-cover rounded-xl"
          />
          <a
            href="https://climatetrace.org/explore/#admin=&gas=co2e&year=2024&timeframe=100&sector=&asset="
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors">
              Explore Map
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Map;
