import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ industry }) => {
  const navigate = useNavigate();
  return (
    <div
      key={industry.id}
      onClick={() => navigate(`/fuelsdashboard/${industry.id}`)}
      className="bg-white p-6 rounded-2xl shadow-md border hover:shadow-lg transition cursor-pointer group"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition"></div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">
            {industry.name}
          </h3>
          <p className="text-sm text-gray-500">{industry.type}</p>
        </div>
      </div>
      <p className="text-gray-600 line-clamp-3">
        {industry.location || "No description provided."}
      </p>
    </div>
  );
};

export default Card;
