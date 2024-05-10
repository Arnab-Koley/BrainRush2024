import React, { useEffect } from "react";
import Heading from "@components/Heading/Heading";
import { Preahvihear } from "next/font/google";
import "./style1.css";

const preahvihear = Preahvihear({
  subsets: ["latin"],
  weight: ["400"],
});

const TimelineItem = ({ title, date, description }) => {
  return (
    <li>
      <div>
        <time>{title}</time>
        <p>{date}</p>
        <p>{description}</p>
      </div>
    </li>
  );
};

function Schedule() {
  useEffect(() => {
    // define variables
    var items = document.querySelectorAll(".timeline li");

    // check if an element is in viewport
    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    function callbackFunc() {
      for (var i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
          items[i].classList.add("in-view");
        }
      }
    }

    // listen for events
    window.addEventListener("load", callbackFunc);
    window.addEventListener("resize", callbackFunc);
    window.addEventListener("scroll", callbackFunc);

    // cleanup function
    return () => {
      window.removeEventListener("load", callbackFunc);
      window.removeEventListener("resize", callbackFunc);
      window.removeEventListener("scroll", callbackFunc);
    };
  }, []); // empty dependency array ensures that this effect runs only once after initial render

  return (
    <>
      <section id="schedule" class="mt-10 bg-red-600 text-blue-600">
  <Heading title="Our Schedule" />
  <div class="container max-w-5xl px-4 pt-3 pb-12 mx-auto timeline-container">
    <div class="timeline">
      <ul>
        <li>
          <div>
            <h3>KodeTeaser</h3>
            <p>Date TBD</p>
            <p>Teams will compete in a thrilling coding knowledge journey through an online quiz. We've got treats to fuel the brains of our victorious teams!</p>
          </div>
        </li>
        <li>
          <div>
            <h3>KoderRank</h3>
            <p>Date TBD</p>
            <p>Teams will tackle coding challenges using their favorite languages. If your team makes the cut, you're heading to the final round!</p>
          </div>
        </li>
        <li>
          <div>
            <h3>Kodikas Premier League (KPL)</h3>
            <p>Date TBD</p>
            <p>Teams will go head-to-head in 1 vs 1 battles, aiming to conquer Kodikas and claim their coding crowns!</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</section>

    </>
  );
}

export default Schedule;