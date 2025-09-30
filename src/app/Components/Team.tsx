'use client';
import { FaStar } from "react-icons/fa";
import TeamCard from "../_components/card/TeamCard";
import { teamData } from "@/data/teamData";

const Team = () => {
  return (
    <section className="w-full h-auto py-16 bg-gray-100">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center gap-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex flex-col items-center text-center gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold">Our Team</h2>
          <p className="text-gray-600 text-sm sm:text-base">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          <div className="flex gap-2 items-center p-2">
            <FaStar size={18} className="text-first " />
            <FaStar size={25} className="text-body" />
            <FaStar size={18} className="text-first " />
          </div>
        </header>

        {/* Team Cards */}
        <section className="w-full flex flex-wrap justify-center gap-6">
          {teamData &&
            teamData.map((item, index) => (
              <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                <TeamCard {...item} />
              </div>
            ))}
        </section>
      </div>
    </section>
  );
};

export default Team;
