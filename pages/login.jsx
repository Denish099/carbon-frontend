import React, { useState, useEffect } from "react";
import axiosInstance from "../lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const { data: authUser, isLoading } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const response = await axiosInstance.get("/auth/me");
      return response.data; // fixed: should be response.data, not Response.data
    },
  });

  // Redirect to home if the user is already authenticated
  useEffect(() => {
    if (authUser) {
      navigate("/home");
    }
  }, [authUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData);

    try {
      await axiosInstance.post("/auth/signin", {
        username: formData.username,
        password: formData.password,
      });

      // After successful login, you may want to refetch authUser or redirect
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
      // optionally show error to user
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold text-center mb-6">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
