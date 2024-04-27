import React from "react";
import Heading from "@components/Heading/Heading";
import { Metal_Mania } from "next/font/google";

const preahvihear = Metal_Mania({
  subsets: ["latin"],
  weight: ["400"],
});

const FAQ = () => {
  return (
    <div className="max-w-screen-full text-gray-50  px-5  min-h-sceen">
      <div className="flex flex-col items-center">
        <Heading
          title={"FAQ"}
          header={"Frequently asked questions"}
          hearerspan=""
          subheader=""
          subheaderspan1=""
          subheaderspan2=""
        />
      </div>
      <div className="grid mb-6 lg:mb-16 md:grid-cols-1 divide-y divide-neutral-200 max-w-6xl mx-auto mt-8">
        <div className="py-5">
          <details className="group">
            <summary className="flex justify-between items-center text-subHeaderText font-bold cursor-pointer list-none">
              <span className={preahvihear.className}>
                Is there a registration fee for the event?
              </span>
              <span className="transition group-open:rotate-180">
                <svg
                  fill="none"
                  height={24}
                  shapeRendering="geometricPrecision"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width={24}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </summary>
            <p className="text-blue-500 text-lg font-semibold mt-3 group-open:animate-fadeIn">
              Yes, the registration fee is ₹60 per team.
            </p>
          </details>
        </div>
        <div className="py-5">
          <details className="group">
            <summary className="flex justify-between items-center text-subHeaderText font-bold cursor-pointer list-none">
              <span className={preahvihear.className}>
                Can I register for the event as an individual if I don't have
                a team?
              </span>
              <span className="transition">
                <svg
                  fill="none"
                  height={24}
                  shapeRendering="geometricPrecision"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width={24}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </summary>
            <p className="text-blue-500 text-lg font-semibold mt-3 group-open:animate-fadeIn">
              No, you cannot register as an individual.
            </p>
          </details>
        </div>
        <div className="py-5">
          <details className="group">
            <summary className="flex justify-between items-center text-subHeaderText font-bold cursor-pointer list-none">
              <span className={preahvihear.className}>
                Who can be my teammates?
              </span>
              <span className="transition group-open:rotate-180">
                <svg
                  fill="none"
                  height={24}
                  shapeRendering="geometricPrecision"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width={24}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </summary>
            <p className="text-blue-500 text-lg font-semibold mt-3 group-open:animate-fadeIn">
              Teams can be formed from the same department and same year,
              Cross-Department registration is also allowed.
            </p>
          </details>
        </div>
        <div className="py-5">
          <details className="group">
            <summary className="flex justify-between text-subHeaderText font-bold cursor-pointer list-none">
              <span className={preahvihear.className}>
                Will there be any breaks during the event?
              </span>
              <span className="transition group-open:rotate-180">
                <svg
                  fill="none"
                  height={24}
                  shapeRendering="geometricPrecision"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width={24}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </summary>
            <p className="text-blue-500 text-lg font-semibold mt-3 group-open:animate-fadeIn">
              Yes, there will be scheduled breaks during the event to give you
              a chance to rest and recharge.
            </p>
          </details>
        </div>
        <div className="py-5">
          <details className="group">
            <summary className="flex justify-between text-subHeaderText font-bold items-center  cursor-pointer list-none">
              <span className={preahvihear.className}>
                Will refreshments be provided?
              </span>
              <span className="transition group-open:rotate-180">
                <svg
                  fill="none"
                  height={24}
                  shapeRendering="geometricPrecision"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width={24}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </summary>
            <p className="text-blue-500 text-lg font-semibold mt-3 group-open:animate-fadeIn">
              Yes, the teams which qualify the first round will be given
              refreshments during the lunch break.
            </p>
          </details>
        </div>
        <div className="py-5">
          <details className="group">
            <summary className="flex justify-between text-subHeaderText font-bold items-center  cursor-pointer list-none">
              <span className={preahvihear.className}>
                How will the winners be announced?
              </span>
              <span className="transition group-open:rotate-180">
                <svg
                  fill="none"
                  height={24}
                  shapeRendering="geometricPrecision"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width={24}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </summary>
            <p className="text-blue-500 text-lg font-semibold mt-3 group-open:animate-fadeIn">
              The winners will be announced on the day of the event itself.
            </p>
          </details>
        </div>
        <div className="py-5">
          <details className="group">
            <summary className="flex justify-between text-subHeaderText font-bold items-center  cursor-pointer list-none">
              <span className={preahvihear.className}>
                What should I do if I have technical difficulties during the
                event?
              </span>
              <span className="transition group-open:rotate-180">
                <svg
                  fill="none"
                  height={24}
                  shapeRendering="geometricPrecision"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  width={24}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
            </summary>
            <p className="text-blue-500 text-lg font-semibold mt-3 group-open:animate-fadeIn">
              If you experience any technical difficulties during the event,
              please contact the event organizers immediately through the event
              platform or through the contact form on the website. We will do
              our best to assist you and ensure a smooth experience for all
              participants.
            </p>
          </details>
        </div>
      </div>
      <div className="text-sm text-logoYellow sm:text-center py-4">
        Made with ❤️ by BrainRush Tech Team
      </div>
    </div>
  );
};

export default FAQ;
