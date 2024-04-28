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
      <div
        className="ml-3 flex flex-wrap md:w-full lg:w-4/5 px-4 mx-auto items-center justify-center"
        style={{ margin: "auto" }}
      >
        <div className="lg:mr-auto place-self-center">
          <h1 className="mt-10 px-5 max-w-2xl text-headerText mx-auto flex justify-center items-center text-45xl font-bold sm:text-8xl text-center mb-20 responsive-padding">
            <span className={preahvihear.className}>BrainRush-2K24</span>
          </h1>
          <h1
            className="px-5 max-w-2xl mx-auto -mt-16 flex justify-center items-center text-pink-500 text-3xl font-bold sm:text-l text-center mb-20 responsive-padding"
            style={{
              fontSize: "1.5 rem",
              color: "#ed3d15",
              fontFamily: "'Bangers', sans-serif; !important",
            }}
          >
            <span className={preahvihear.className}>
              Unlock Your Coding Potential{" "}
            </span>
          </h1>
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
