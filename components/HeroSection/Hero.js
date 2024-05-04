import React, { useEffect } from "react";
import { Rubik_Dirt } from "next/font/google";
import Countdown from "./../Countdown/Countdown";
import TypingEffect from "./TypingEffect";
import './hero.css';

const preahvihear = Rubik_Dirt({
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
      if (index > classes.length - 1) index = 1;
      avenger.className = `avenger avenger--${classes[index]}`;
      setTimeout(loop, duration);
    };

    setTimeout(loop, duration);
  }, []);

  return (
    <section className="overflow-hidden py-10 relative">
      <div className="hero-container relative">
        <div className="text-center">
          <h1 className="text-headerText text-45xl sm:text-7xl font-bold mb-20 responsive-padding">
            <span className={preahvihear.className} style={{ color: "white" }}>
              <TypingEffect />
            </span>
          </h1>
         
        </div>
        <div style={{ marginTop: '10px' }}>
            <Countdown />
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
