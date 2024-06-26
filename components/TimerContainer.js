import React from "react";
import { NumberBox } from "./NumberBox/NumberBox";

export const TimerContainer = ({ days, hours, minutes, seconds }) => {
  if (days < 10) {
    days = "0" + days;
  }

  if (hours < 10) {
    hours = "0" + hours;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return (
    <div className="-mt-20 rounded-xl bg-white-500"> {/* Added bg-red-500 class for red background */}
      <div className="flex items-center space-x-1 justify-between mt-2 rounded-xl px-6 py-8 responsive-padding">
        <NumberBox num={days} unit={"Days"} />
        <span className="text-3xl -mt-8 md:inline-block md:text-5xl font-normal text-white-700 ">
          :
        </span>
        <NumberBox num={hours} unit={"Hours"} />
        <span className="text-3xl -mt-8 md:inline-block md:text-5xl font-normal text-white-700">
          :
        </span>
        <NumberBox num={minutes} unit={"Minutes"} />
        <span className="text-3xl -mt-8 md:inline-block md:text-5xl font-normal text-white-700">
          :
        </span>
        <NumberBox num={seconds} unit={"Seconds"} />
      </div>
    </div>
  );
};
