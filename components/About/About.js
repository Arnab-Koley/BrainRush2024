import React, { useState } from "react";
import Heading from "./../Heading/Heading";
import "./About.css";
import AboutMain from "./AboutMain";
import Venue from "@components/Venue/Venue";
import Team from "@components/Team/Team";
import { Bangers } from "next/font/google";

const preahvihear = Bangers({
  subsets: ["latin"],
  weight: ["400"],
});

const tabHeadings = {
  about: "About Us",
  venue: "Our Venue",
  team: "Our Team",
};

function About() {
  const [activeTab, setActiveTab] = useState("about");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
      <section className="overflow-hidden px-5 sm:px-20" id="about">
        <Heading
          title={tabHeadings[activeTab]}
          header={"Know more About"}
          hearerspan="BrainRush 2k24"
          subheader="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          subheaderspan1="In convallis tortor eros. Donec vitae tortor lacus."
          subheaderspan2="Phasellus aliquam ante in maximus."
        />
        <div className="about-section">
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
            <div
              onClick={() => handleTabChange("team")}
              className={
                activeTab === "team"
                  ? "about-button active"
                  : "about-button inactive"
              }
            >
              <span className={preahvihear.className}>Our Team</span>
            </div>
            {/* Add the image below the text */}
            <img src="assets/images/spiderman.png" alt="Spiderman" />
          </div>
          <div className="about-content">
            {activeTab === "about" && <AboutMain />}
            {activeTab === "venue" && <Venue />}
            {activeTab === "team" && <Team />}
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
