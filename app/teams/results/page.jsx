import React from "react";
import { Preahvihear } from "next/font/google";
import Link from "next/link";
import "./result.css";
import bg from "../../../public/assets/images/vintagebg.jpg";
import trophy from "../../../public/assets/images/trophy3.gif";
import mask from "../../../public/assets/images/mask.png"
import shield from "../../../public/assets/images/shield.png"
import gauntlet from "../../../public/assets/images/gauntlet.png"


import Image from "next/image";

const preahvihear = Preahvihear({
  subsets: ["latin"],
  weight: ["400"],
});

const Results = () => {
  return (
    <div className="result">
    
      <div className="main">
      <div className="trophy">
      <Image src={trophy} alt=""  />
      </div>
      <div className="info">
          <div className="card">
            <div className="top">
            <Image src={mask} alt="" height={80} width={80} />
            <div className="name">Winners</div>
            </div>
            <div className="desc">Top 3 teams of Kodikas Premier League!</div>
            <Link href="results/round3"><div className="resultbtn">See results</div></Link>
          </div>

          <div className="card">
            <div className="top">
            <Image src={shield} alt="" height={80} width={80} />
            <div className="name">KoderRank</div>
            </div>
            <div className="desc">Top 8 teams of KoderRank!</div>
            <Link href="results/round2"><div className="resultbtn">See results</div></Link>
          </div>

          <div className="card">
            <div className="top">
            <Image src={gauntlet} alt="" height={80} width={80} />
            <div className="name">KodeTeaser</div>
            </div>
            <div className="desc">Top 30 teams of KodeTeaser!</div>
            <Link href="results/round1"><div className="resultbtn">See results</div></Link>
          </div>
      </div>

      </div>

    </div>
  );
};

export default Results;
