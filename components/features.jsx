import { BarChart3, LightbulbIcon, MonitorIcon } from "lucide-react";
import React from "react";
const Feature = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16">
          What You Can Do with CarbonIQ
        </h2>
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-green-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Real-time Emission Monitoring
            </h3>
            <p className="text-gray-600">
              Track and analyze your carbon emissions in real-time with advanced
              sensors and AI technology.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-green-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <LightbulbIcon className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Intelligent Suggestions for Reduction
            </h3>
            <p className="text-gray-600">
              Receive AI-powered recommendations to optimize your processes and
              reduce emissions.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-green-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
              <MonitorIcon className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Visual Emissions Dashboard & Map
            </h3>
            <p className="text-gray-600">
              Visualize your environmental impact with intuitive dashboards and
              interactive maps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
