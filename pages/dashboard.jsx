import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Card from "../components/card.jsx";
import axiosInstance from "../lib/axios.js";

const Dashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    location: "",
  });

  const [industries, setIndustries] = useState([]);

  const {
    data: authUser,
    isLoading: authLoading,
    isError: authError,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const response = await axiosInstance.get("auth/me");
      return response.data;
    },
  });

  const fetchIndustries = async (userId) => {
    try {
      const response = await axiosInstance.get(`predict/${userId}`);
      setIndustries(response.data);
    } catch (error) {
      console.error("Error fetching industries:", error);
    }
  };

  useEffect(() => {
    if (authUser?.userId) {
      fetchIndustries(authUser.userId);
    }
  }, [authUser]);

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationKey: ["addIndustry"],
    mutationFn: async (newIndustry) => {
      const response = await axiosInstance.post(
        "/predict/industry",
        newIndustry
      );
      return response.data;
    },
    onSuccess: (data) => {
      fetchIndustries(authUser.userId);
      setFormData({ type: "", name: "", location: "" });
    },
    onError: (error) => {
      console.error("❌ Error adding industry:", error);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!authUser?.userId) return;

    const payload = {
      ...formData,
      id: authUser?.userId,
    };
    mutate(payload);
  };

  if (authLoading)
    return <p className="text-center mt-10 text-lg">Loading user...</p>;
  if (authError)
    return (
      <div className="text-center text-red-600 mt-10">Error loading data</div>
    );

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Dashboard</h1>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 max-w-xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Add New Industry
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="type"
            placeholder="Industry Type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Industry Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            required
          />
          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-2 rounded-xl font-medium text-white transition-colors ${
              isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-blue-700"
            }`}
          >
            {isPending ? "Adding..." : "Add Industry"}
          </button>

          {isSuccess && (
            <p className="text-green-600 text-sm text-center">
              Industry added successfully!
            </p>
          )}
          {isError && (
            <p className="text-red-600 text-sm text-center">
              Failed to add industry: {error.message}
            </p>
          )}
        </form>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Your Industries
        </h3>
        {industries.length === 0 ? (
          <p className="text-gray-500 text-center">No industries added yet.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <Card key={industry.id} industry={industry} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
