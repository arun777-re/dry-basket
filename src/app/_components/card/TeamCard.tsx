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
name?:string;
designation?:string;
image:string;
}

const TeamCard:React.FC<TeamCardProps> = ({


    name,designation,image
}) => {

  const [active,setActive] = React.useState<boolean>(false);

  return (
    <Card className="w-[18vw] h-96 relative border border-first" onMouseEnter={()=>setActive(true)} onMouseLeave={()=>setActive(false)}>
      <div className="w-full h-full flex flex-col items-center">
        <div className="relative w-full h-[60%] bg-first flex items-center justify-center">
          <div style={{borderRadius:"50%"}} className={`relative w-[60%] h-[60%] border-8  ${active ? 'border-head' : 'border-first'} transition-all duration-500 ease-in-out`}>
            <Image
              src={image ?? team}
              alt="team-image"
              fill
              priority
              className="object-cover object-center w-full h-full rounded-full z-20"
            />
          </div>
        </div>
        <div className="w-full h-[40%] flex flex-col items-center justify-center gap-4 py-4 px-8">
          <h4 className="mb-0 cursor-default">{name}</h4>
          <p className="leading-loose text-black">{designation}</p>
          <div className="flex items-center justify-between w-full">
         <BiLogoFacebook size={16}/>
         <LiaTwitter size={16}/>
            <FaInstagram size={16}/>
            <PiLinkedinLogo size={16}/>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default TeamCard;
