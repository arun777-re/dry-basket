"use client";
import { Card } from "@radix-ui/themes";
import React from "react";
import { LuRefreshCw } from "react-icons/lu";
import { BsBriefcase } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa6";

export const processData = [
  {
    icon: <LuRefreshCw size={30} className="text-primary" />,
    title: "Money Back Guarantee",
    description:
      "Sit amet dolor consecteur adipisicing elitsed to eiusmod tempor incident umbrella et dollar units et dolar.",
  },
  {
    icon: <BsBriefcase size={30} className="text-primary" />,
    title: "Free Shipping",
    description:
      "Sit amet dolor consecteur adipisicing elitsed to eiusmod tempor incident umbrella et dollar units et dolar.",
  },
  {
    icon: <FaRegClock size={30} className="text-primary" />,
    title: "24/7 Customer Service",
    description:
      "Sit amet dolor consecteur adipisicing elitsed to eiusmod tempor incident umbrella et dollar units et dolar.",
  },
];

const Process = () => {
  return (
    <section className="max-w-screen w-full h-auto lg:h-[60vh] relative">
      <div className="w-full h-full px-4 md:px-20 lg:px-30 py-20
       flex flex-wrap lg:flex-nowrap items-center justify-start gap-10">

        {processData.map((item, key) => (
          <Card
            key={key}
            className="w-full lg:w-[25vw] h-55 rounded-lg 
            border border-[#1f6f6f33] bg-[#0f0f0f] shadow-[0px_0px_20px_rgba(0,0,0,0.35)]
            flex flex-col items-center justify-start"
          >
            {/* ICON WRAPPER */}
            <div
              className="w-[70px] h-[70px] rounded-full bg-primary flex items-center justify-center 
              -mt-9 border border-primary/40 cursor-pointer transition-all duration-500
              hover:bg-accent hover:border-accent"
            >
              {item.icon}
            </div>

            {/* TEXT BLOCK */}
            <article className="flex flex-col items-center justify-center gap-2 px-4 py-5">
              <h5 className="text-primary text-lg font-medium tracking-wide
                hover:text-accent transition-all duration-500">
                {item.title}
              </h5>
              <p className="text-body/80 text-center leading-relaxed">
                {item.description}
              </p>
            </article>
          </Card>
        ))}

      </div>
    </section>
  );
};

export default Process;
