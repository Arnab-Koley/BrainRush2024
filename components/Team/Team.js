import React, { useState } from "react";
import Link from "next/link";
import teamDetails from "./team_data.js";
import Heading from "@components/Heading/Heading"; // Import Heading component
import { Bangers } from "next/font/google";
import "./Team.css";

const preahvihear = Bangers({
  subsets: ["latin"],
  weight: ["400"],
});

const Team = () => {
  // Group team members by year
  const groupedTeamMembers = teamDetails.reduce((acc, member) => {
    const year = member.year.split("/")[0].trim(); // Extract year from the string
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(member);
    return acc;
  }, {});

  // State to manage the active year
  const [activeYear, setActiveYear] = useState(null);

  // Function to toggle active year
  const toggleYear = (year) => {
    setActiveYear(activeYear === year ? null : year);
  };

  return (
    <section className="team-section bg-marvel-blue py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
      {/* Our Team Heading */}
      <Heading title="Our Team" />

      {/* Render year buttons */}
      <div className="flex justify-center gap-4">
        {Object.keys(groupedTeamMembers).map((year) => (
          <button
            key={year}
            className={`year-button ${activeYear === year ? 'active' : ''}`}
            onClick={() => toggleYear(year)}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Render team members */}
      <div className="team-scroll-container">
        {activeYear && groupedTeamMembers[activeYear].map((member, index) => (
          <div key={index} className="team-member">
            <img className="team-member-photo" src={member.photo} alt="" />
            <h3 className="team-member-name red-text">
              <Link href={member.whatsapp} target="_blank" className={preahvihear.className}>
                {member.name}
              </Link>
            </h3>
            <p className="team-member-description">{member.emoji}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Team;
