import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const FuelDashboard = () => {
  const { industryId } = useParams();
  const queryClient = useQueryClient();

  const {
    data: industry,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["industry", industryId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/predict/industry/${industryId}`);
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axiosInstance.post("/predict/emissions", formData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["industry", industryId]);
    },
  });

  const [form, setForm] = useState({
    fuel_name: "",
    unit: "",
    amount: "",
    hours: "",
    energy_kwh: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutation.mutate({ ...form, industryId: Number(industryId) });
    setForm({
      fuel_name: "",
      unit: "",
      amount: "",
      hours: "",
      energy_kwh: "",
    });
  };

  if (isLoading) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading fuel data...
      </div>
    );
  }

  if (isError || !industry) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load industry data.
      </div>
    );
  }
  const severityCounts = industry.consumptions.reduce(
    (acc, c) => {
      const sev = c.severity.toLowerCase();
      if (sev === "low") acc.low++;
      else if (sev === "medium") acc.medium++;
      else if (sev === "high") acc.high++;
      return acc;
    },
    { low: 0, medium: 0, high: 0 }
  );

  const chartData = [
    { name: "Low", value: severityCounts.low },
    { name: "Medium", value: severityCounts.medium },
    { name: "High", value: severityCounts.high },
  ];

  const COLORS = ["#34D399", "#FBBF24", "#F87171"];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Fuel Dashboard - {industry.name}
      </h1>

      {/* --- Mini Input Form --- */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-2xl p-6 mb-8 space-y-4 border max-w-2xl"
      >
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Add Fuel Consumption
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <input
            name="fuel_name"
            placeholder="Fuel Name (e.g., Diesel)"
            value={form.fuel_name}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded"
          />
          <input
            name="unit"
            placeholder="Unit (e.g., liter)"
            value={form.unit}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded"
          />
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded"
          />
          <input
            name="hours"
            type="number"
            placeholder="Hours"
            value={form.hours}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded"
          />
          <input
            name="energy_kwh"
            type="number"
            placeholder="Energy (kWh)"
            value={form.energy_kwh}
            onChange={handleChange}
            required
            className="border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          disabled={mutation.isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition"
        >
          {mutation.isLoading ? "Submitting..." : "Predict & Save"}
        </button>

        {mutation.isError && (
          <p className="text-red-500 mt-2">
            Error:{" "}
            {mutation.error?.response?.data?.message || "Failed to submit"}
          </p>
        )}
        {mutation.isSuccess && (
          <p className="text-green-600 mt-2">
            Prediction submitted successfully!
          </p>
        )}
      </form>

      {/* --- Existing Dashboard Cards --- */}
      {industry.consumptions.length === 0 ? (
        <p className="text-gray-600">No fuel consumption data available.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industry.consumptions.map((c) => (
            <div
              key={c.id}
              className="bg-white shadow-md rounded-2xl p-6 border hover:shadow-lg transition"
            >
              <div className="mb-2">
                <h2 className="text-xl font-semibold text-gray-800">
                  {c.fuel.name}
                </h2>
                <p className="text-sm text-gray-500">Unit: {c.fuel.unit}</p>
                <p className="text-sm text-gray-500">
                  Emission Factor: {c.fuel.emissionFactor} kg CO₂/{c.fuel.unit}
                </p>
              </div>

              <div className="mt-4 text-sm text-gray-700 space-y-1">
                <p>
                  <strong>Amount:</strong> {c.amount} {c.fuel.unit}
                </p>
                <p>
                  <strong>Hours:</strong> {c.hours}
                </p>
                <p>
                  <strong>Energy (kWh):</strong> {c.energyKwh}
                </p>
                <p>
                  <strong>Emissions (kg CO₂):</strong> {c.emissionsKg}
                </p>
              </div>

              <div className="mt-4 text-sm">
                <p
                  className={`font-bold ${
                    c.severity === "low"
                      ? "text-green-600"
                      : c.severity === "medium"
                      ? "text-yellow-500"
                      : "text-red-500"
                  }`}
                >
                  Severity: {c.severity}
                </p>
                <p className="text-gray-600 mt-1">
                  {c.suggestions || "No suggestions provided"}
                </p>
              </div>
            </div>
          ))}
          {industry.consumptions.length > 0 && (
            <div className="bg-white rounded-2xl shadow p-6 mb-10 max-w-xl mx-auto">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                Emission Severity Distribution
              </h2>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FuelDashboard;
