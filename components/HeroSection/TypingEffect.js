import React from "react";
import { Rubik_Dirt } from "next/font/google";
import "./typing.css";

const preahvihear = Rubik_Dirt({
  subsets: ["latin"],
  weight: ["400"],
});

const TypingEffect = () => {
  return (
    <div className="container">
      <div className={`text ${preahvihear.className}`}>BRAINRUSH-2K24</div>
    </div>
  );
};

export default TypingEffect;
