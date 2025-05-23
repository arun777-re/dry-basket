'use client';
import React from "react";
import { FaStar } from "react-icons/fa";
import TeamCard from "../_components/card/TeamCard";

const Team = () => {
  const teamData = [
    {
      id: 1,
      name: "John Doe",
      designation: "CEO",
      image: "/images/team.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      designation: "CTO",
      image: "/images/team.jpg",
    },
    {
      id: 3,
      name: "Alice Johnson",
      designation: "CFO",
      image: "/images/team.jpg",
    },
    {
      id: 4,
      name: "Bob Brown",
      designation: "COO",
      image: "/images/team.jpg",
    },
  ];

  return (
    <section className="max-w-screen w-full h-screen relative ">
      <div className="w-full h-full relative flex flex-col items-center justify-center gap-10 px-30">
        <header className="relative max-w-md w-full flex flex-col items-center justify-center ">
          <h2>Our Team</h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          <div className="flex gap-2 items-center p-2">
            <FaStar size={18} className="text-first " />
            <FaStar size={25} className="text-body" />
            <FaStar size={18} className="text-first " />
          </div>
        </header>
        <section className="w-full relative flex items-center justify-center gap-8">
          {teamData &&
            teamData.map((item, index) => {
              return <TeamCard key={index} {...item} />;
            })}
        </section>
      </div>
    </section>
  );
};

export default Team;
