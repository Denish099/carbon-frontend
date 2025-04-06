import React from "react";
import NavBar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import Hero from "../components/hero.jsx";
import Feature from "../components/features.jsx";
import Map from "../components/map.jsx";
import About from "../components/about.jsx";

const Home = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <Feature />
      <Map />
      <About />
      <Footer />
    </>
  );
};
export default Home;
