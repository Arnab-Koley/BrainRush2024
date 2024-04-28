import Heading from "@components/Heading/Heading";
import React from "react";
import Image from "next/image";
import sponsor1 from "public/assets/images/ardent_logo.png";
import sponsor2 from "public/assets/images/unit.png";
import { Bangers } from "next/font/google";
import Link from "next/link";
import "./sponsor.css"

const preahvihear = Bangers({
  subsets: ["latin"],
  weight: ["400"],
});

const Sponsor = () => {
  return (
    <>
      <Heading title="Our Sponsors" />
      <div className="container mx-auto my-7">
        <div className="flex flex-wrap items-center justify-center">
          <div className="w-full sm:px-4 md:px-0 lg:w-6/12">
            <div className="flex flex-col md:flex gap-8 md:flex-row items-center sm:-mx-4">
              <div className="md:px-0 sm:px-4 md:py-12 md:w-1/2 xl:w-1/2">
                <div className="sponsor-box">
                  <div className="logo-container">
                    <Image
                      src={sponsor1}
                      alt=""
                      className="logo"
                    />
                  </div>
                  <div className="text-center py-3">
                    <button
                      type="submit"
                      className="visit-website-btn"
                    >
                      <span className={preahvihear.className}>
                        Visit Website
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="px-3 sm:px-4 md:w-1/2 xl:w-1/2">
                <div className="sponsor-box">
                  <div className="logo-container">
                    <Image
                      src={sponsor2}
                      alt=""
                      className="logo"
                    />
                  </div>
                  <div className="text-center py-3">
                    <button
                      type="submit"
                      className="visit-website-btn"
                    >
                      <span className={preahvihear.className}>
                        Visit Website
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sponsor;
