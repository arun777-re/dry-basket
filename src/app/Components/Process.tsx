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
            border border-first/80 shadow-md shadow-first/30
            flex flex-col items-center justify-start"
          >
            {/* ICON WRAPPER */}
            <div
              className="w-[70px] h-[70px] rounded-full bg-first/80 flex items-center justify-center 
              -mt-9 border border-border cursor-pointer transition-all duration-300
              hover:bg-prdct hover:border-prdct"
            >
              {item.icon}
            </div>

            {/* TEXT BLOCK */}
            <article className="flex flex-col items-center justify-center gap-2 px-4 py-5">
              <h5 className="text-first text-lg font-medium tracking-wide
                hover:text-prdct transition-all duration-500">
                {item.title}
              </h5>
              <p className=" text-center leading-relaxed">
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
