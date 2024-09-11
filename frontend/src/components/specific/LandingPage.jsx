import React from "react";
import FeedBack from "../common/landingpage/FeedBack";
import Footer from "../common/landingpage/Footer";
import Doctor from "../common/landingpage/Doctor";
import Navigation from "../common/landingpage/Navigation";
import Hero from "../common/landingpage/Hero";
import About from "../common/landingpage/About";
import "../../sass/custom.scss";
import Superiority from "../common/landingpage/Superiority";
import Facilities from "../common/landingpage/Facilities";

const LandingPage = () => {
  return (
    <div className="d-flex flex-column">
      <Navigation />
      <Hero />
      <Superiority />
      <About />
      <Doctor />
      <Facilities />
      <FeedBack />
      <Footer />
    </div>
  );
};

export default LandingPage;
