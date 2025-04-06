import { Navigate, Routes, Route } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axiosInstance from "../lib/axios.js";
import { useQuery } from "@tanstack/react-query";

import LatestNews from "../pages/insights.jsx";
import React from "react";

import Login from "../pages/login.jsx";
import SignUp from "../pages/signup.jsx";
import NavBar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import Hero from "../components/hero.jsx";
import Feature from "../components/features.jsx";
import Map from "../components/map.jsx";
import About from "../components/about.jsx";
import Dashboard from "../pages/dashboard.jsx";
import FuelsDashboard from "../pages/fueldashboard.jsx";

function App() {
  const {
    data: authUser,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await axiosInstance.get("/auth/me");
        return res.data;
      } catch (error) {
        if (error.response && error.response.status === 400) {
          return null; // user is not authenticated
        }

        return null;
      }
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  if (isError) {
    toast.error("Failed to load user data");
  }

  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavBar />
              <Hero />
              <Feature />
              <Map />
              <About />
              <Footer />
            </>
          }
        />
        <Route
          path="/insights"
          element={
            <>
              <NavBar />
              <LatestNews />
              <Footer />
            </>
          }
        />
        <Route
          path="/predictor"
          element={
            <>
              <NavBar />
              <Dashboard />
              <Footer />
            </>
          }
        />
        <Route
          path="/fuelsdashboard/:industryId"
          element={
            <>
              <NavBar />
              <FuelsDashboard />
              <Footer />
            </>
          }
        />
        {authUser ? (
          <Route path="/login" element={<Navigate to="/" />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}
        {authUser ? (
          <Route path="/signup" element={<Navigate to="/" />} />
        ) : (
          <Route path="/signup" element={<SignUp />} />
        )}
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
