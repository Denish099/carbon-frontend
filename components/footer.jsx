import { Factory } from "lucide-react";
import React from "react";
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Factory className="w-6 h-6" />
            <span className="text-xl font-semibold">CarbonIQ</span>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-green-400">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-green-400">
              Terms of Service
            </a>
            <a href="#" className="hover:text-green-400">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          © 2025 CarbonIQ. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
