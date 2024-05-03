import React, { useState } from "react";
import "./About.css";
import AboutMain from "./AboutMain";
import Venue from "@components/Venue/Venue";
import { Bangers } from "next/font/google";

const preahvihear = Bangers({
  subsets: ["latin"],
  weight: ["400"],
});

function About() {
  const [activeTab, setActiveTab] = useState("about");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <section className="about-section" id="about">
        <h2 className="about-heading">
          <span className={preahvihear.className}>Know More About Us</span>
        </h2>
        <div className="about-buttons-container">
          <div
            onClick={() => handleTabChange("about")}
            className={
              activeTab === "about"
                ? "about-button active"
                : "about-button inactive"
            }
          >
            <span className={preahvihear.className}>About Us</span>
          </div>
          <div
            onClick={() => handleTabChange("venue")}
            className={
              activeTab === "venue"
                ? "about-button active"
                : "about-button inactive"
            }
          >
            <span className={preahvihear.className}>Our Venue</span>
          </div>
        </div>
        <div className="about-content">
          {activeTab === "about" && <AboutMain />}
          {activeTab === "venue" && <Venue />}
        </div>
      </section>
    </>
  );
}

export default About;
