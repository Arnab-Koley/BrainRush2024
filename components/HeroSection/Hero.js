import React from "react";
import Image from "next/image";
import Countdown from "./../Countdown/Countdown";
import logo from "./../../public/assets/images/kodikasLogo.png";
import { Metal_Mania } from "next/font/google";
import './hero.css';

const preahvihear = Metal_Mania({
  subsets: ["latin"],
  weight: ["400"],
});

const Hero = () => {
  return (
    <section className="overflow-hidden relative">
      {/* Snitch Ball */}
      <div className="snitch absolute top-0 left-1/2 transform -translate-x-1/2">
        <div className="obj">
          <div className="body">
            <div className="flourish"></div>
            <div className="flourish"></div>
            <div className="flourish"></div>
            <div className="flourish"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="flourish"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
          <div className="l joint"></div>
          <div className="l wing">
            <div className="feather"></div>
            <div className="feather"></div>
            <div className="feather"></div>
          </div>
          <div className="r joint"></div>
          <div className="r wing">
            <div className="feather"></div>
            <div className="feather"></div>
            <div className="feather"></div>
          </div>
        </div>
        <div className="shadow"></div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="-mt-20 px-5 max-w-2xl text-headerText mx-auto flex justify-center items-center text-3xl font-bold sm:text-7xl text-center mb-20 responsive-padding">
          <span className={preahvihear.className}>BrainRush 2024</span>
        </h1>
        <h1
          className="px-5 max-w-2xl mx-auto -mt-16 flex justify-center items-center text-pink-500 text-3xl font-bold sm:text-l text-center mb-20 responsive-padding"
          style={{
            fontSize: "1.5rem",
            color: "#ed3d15",
            fontFamily: "'Metal_Mania', sans-serif; !important",
          }}
        >
          <span className={preahvihear.className}>
            Unlock Your Coding Potential{" "}
          </span>
        </h1>
        <Countdown />
      </div>
    </section>
  );
};

export default Hero;


