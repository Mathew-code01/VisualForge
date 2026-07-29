
// src/pages/Services.jsx
import React from "react";
import ServicesHero from "../components/services/ServicesHero.jsx";
import ServiceCapabilities from "../components/services/ServiceCapabilities.jsx";
import ServicesConnection from "../components/services/ServicesConnection.jsx";
import WhatWeCanBuild from "../components/services/WhatWeCanBuild.jsx";
import ServiceCTA from "../components/services/ServiceCTA.jsx";
import "./../styles/pages/services.css"; // Import your CSS file here

const Services = () => {
  return (
    <>
      <ServicesHero />
      <ServiceCapabilities />
      <ServicesConnection />
      <WhatWeCanBuild />
      <ServiceCTA />
    </>
  );
};

export default Services;