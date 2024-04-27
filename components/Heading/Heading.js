import React from "react";
import "./Heading.css";
import { Bangers, Metal_Mania } from "next/font/google";

const preahvihear = Bangers({
  subsets: ["latin"],
  weight: ["400"],
});

function Heading(props) {
  return (
    <>
      <h1
        className="text-headerText  font-bold  text-center mb-4 headingText "
        // style={{ fontFamily: "'Fira Code', monospace !important;" }}
      >
        <span className={preahvihear.className}>
          {props.title}
          {props.subtitle}
        </span>
      </h1>
    </>
  );
}

export default Heading;
