'use client';
import { Card } from "@radix-ui/themes";
import Image from "next/image";
import React from "react";
import { BiLogoFacebook } from "react-icons/bi";
import { LiaTwitter } from "react-icons/lia";
import { FaInstagram } from "react-icons/fa";
import { PiLinkedinLogo } from "react-icons/pi";
import team from '@/../public/images/team.jpg';

interface TeamCardProps {
  name?: string;
  designation?: string;
  image: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ name, designation, image }) => {
  const [active, setActive] = React.useState<boolean>(false);

  return (
    <Card
      className="w-full sm:w-72 md:w-64 lg:w-60 h-auto border border-first transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div className="flex flex-col items-center">
        {/* Image */}
        <div className="relative w-full h-48 sm:h-56 md:h-48 flex items-center justify-center">
          <div
            style={{ borderRadius: "50%" }}
            className={`relative w-32 h-32 sm:w-36 sm:h-36  border-8 ${
              active ? "border-head" : "border-first"
            } transition-all duration-500 ease-in-out`}
          >
            <Image
              src={image ?? team}
              alt="team-image"
              fill
              priority
              className="object-cover object-center w-full h-full rounded-full z-20"
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col items-center justify-center gap-2 py-4 px-4 sm:px-6 text-center">
          <h4 className="text-lg sm:text-xl font-semibold">{name}</h4>
          <p className="text-gray-700 text-sm sm:text-base">{designation}</p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <BiLogoFacebook size={20} className="animate-pulse"/>
            <LiaTwitter size={20} className="animate-pulse"/>
            <FaInstagram size={20} className="animate-pulse"/>
            <PiLinkedinLogo size={20} className="animate-pulse"/>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TeamCard;
