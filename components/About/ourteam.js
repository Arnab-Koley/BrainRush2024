import React from "react";
import Image from "next/image";
import { Bangers } from "next/font/google";
import TeamImage1 from "public/assets/images/TeamImage1.JPG";
import TeamImage2 from "public/assets/images/TeamImage2.JPG";
import TeamImage3 from "public/assets/images/TeamImage3.JPG";

const preahvihear = Bangers({
  subsets: ["latin"],
  weight: ["400"],
});

const OurTeam = () => {
  return (
    <>
      <div className="container mx-auto my-7">
        <div className="-mx-4 flex flex-wrap items-center justify-between">
          <div className="w-full px-4 lg:w-6/12">
            <div className="-mx-3 flex items-center sm:-mx-4">
              <div className="w-full px-3 sm:px-4 xl:w-1/2">
                <div className="py-3 sm:py-4">
                  <Image
                    src={TeamImage1}
                    alt="Team Member 1"
                    className="w-full rounded-2xl animate__animated animate__zoomIn animate__faster"
                  />
                </div>
                <div className="py-3 sm:py-4">
                  <Image
                    src={TeamImage2}
                    alt="Team Member 2"
                    className="w-full rounded-2xl animate__animated animate__zoomIn animate__faster"
                  />
                </div>
              </div>
              <div className="w-full px-3 sm:px-4 xl:w-1/2">
                <div className="relative z-10 my-4">
                  <Image
                    src={TeamImage3}
                    alt="Team Member 3"
                    className="w-full rounded-2xl animate__animated animate__zoomIn animate__faster"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
            <div className="mt-10 lg:mt-0">
              <p className="text-gray-800 mb-8 text-base">
                <span className={preahvihear.className}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aliquam at porttitor sem. Aliquam erat volutpat. Donec
                  placerat nisl magna, et faucibus arcu condimentum sed.
                </span>
              </p>
              <p className="text-gray-800 mb-12 text-base">
                <span className={preahvihear.className}>
                  Integer dictum massa vitae mauris varius, in eleifend ante
                  pulvinar. Maecenas aliquet felis non lacus tincidunt, vitae
                  fermentum augue faucibus. Nulla facilisi. Nulla vitae neque
                  quis lectus scelerisque aliquam. Nullam maximus orci justo.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurTeam;
