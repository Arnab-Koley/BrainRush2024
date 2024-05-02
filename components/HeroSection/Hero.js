import React, { useEffect } from "react";
import { Bangers } from "next/font/google";
import Countdown from "./../Countdown/Countdown";
import './hero.css';

const preahvihear = Bangers({
  subsets: ["latin"],
  weight: ["400"],
});

const Hero = () => {
  useEffect(() => {
    const avenger = document.querySelector(".avenger");
    const classes = ["shield", "hammer", "fist", "helmet"];
    const duration = 1000;

    let index = 0;
    const loop = () => {
      index++;
      if (index > classes.length - 1) index = 0;
      avenger.className = `avenger avenger--${classes[index]}`;
      setTimeout(loop, duration);
    };

    setTimeout(loop, duration);
  }, []);

  return (
    <section className="overflow-hidden py-10">
      <div className="hero-container">
        <div className="text-center">
          <h1 className="text-headerText text-45xl sm:text-8xl font-bold mb-20 responsive-padding">
            <span className={preahvihear.className} style={{ color: "white" }}>BrainRush-2K24</span>
          </h1>
          <h1 className="text-white-500 text-3xl sm:text-l font-bold mb-20 responsive-padding">
            <span className={preahvihear.className} style={{ color: "white" }}>.</span>
          </h1>
          <Countdown style={{ marginTop: '10px' }} />
        </div>
        <div className="flex items-center justify-center">
          <div className="avenger">
            <div className="avenger__icon"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
