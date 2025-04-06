import { useQuery } from "@tanstack/react-query";
import { Leaf } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import LatestNews from "../pages/insights";

const NavBar = () => {
  const navigate = useNavigate();
  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const response = await axiosInstance.get("/auth/me");
      console.log(response.data);
      return response.data;
    },
  });

  return (
    <nav className="px-6 py-4 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Leaf className="w-8 h-8 text-green-600" />
          <span className="text-xl font-semibold">CarbonIQ</span>
        </div>

        <div className="flex gap-8">
          <button
            onClick={() => navigate("/predictor")}
            className="text-gray-600 hover:text-gray-900"
          >
            Emissions Predictor
          </button>

          <button
            onClick={() => {
              window.location.href =
                "https://climatetrace.org/explore/#admin=&gas=co2e&year=2024&timeframe=100&sector=&asset=";
            }}
            className="text-gray-600 hover:text-gray-900"
          >
            Realtime Map
          </button>

          <button
            onClick={() => navigate("/insights")} // assuming /insights is the path for LatestNews
            className="text-gray-600 hover:text-gray-900"
          >
            Insights
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="text-gray-600 hover:text-gray-900"
          >
            Contact
          </button>

          {authUser ? null : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-gray-600 hover:text-gray-900"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="text-white bg-green-600 hover:bg-green-700 px-4 py-1 rounded"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
