"use client";

import React from "react";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import Footer from "../Components/Footer";
import { Card } from "@radix-ui/themes";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPaperPlane, FaStar } from "react-icons/fa";
import MapComponent from "../Components/MapComponent";
import { Button } from "@/components/ui/button";

const processData = [
  {
    icon: <IoCall size={22} className="text-white" />,
    title: "Phone",
    subheading1: "0000-123-456789",
    subheading2: "0000-123-456789",
  },
  {
    icon: <MdEmail size={22} className="text-white" />,
    title: "Email",
    subheading1: "mail@example.com",
    subheading2: "support@example.com",
  },
  {
    icon: <FaPaperPlane size={20} className="text-white" />,
    title: "Address",
    subheading1: "No: 58 A, East Vivekanand Street",
    subheading2: "Baltimore,Sonipat,Haryana 131001",
  },
];

const ContactPage = () => {
  const [active, setActive] = React.useState<number | null>(null);
  return (
    <div className="max-w-screen w-full h-auto mx-auto">
      <Navbar />
      <Banner heading="Contact Us" />
      <section className="max-w-screen w-full h-auto relative">
        <div className="w-full h-full px-30 py-20 relative flex flex-col items-center justify-center gap-10">
              <header className="relative max-w-lg w-full flex flex-col items-center justify-center ">
                    <h2>Contact Us</h2>
                    <p>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </p>
                    <div className="flex gap-2 items-center p-2">
                      <FaStar size={18} className="text-first " />
                      <FaStar size={25} className="text-body" />
                      <FaStar size={18} className="text-first " />
                    </div>
                  </header>
          <section className="w-full h-full  gap-10 flex items-center justify-center">
  {processData &&
            processData.map((item, key) => {
              return (
                <Card
                  onMouseEnter={() => setActive(key)}
                  onMouseLeave={() => setActive(null)}
                  key={key}
                  className="w-[25vw] h-50 relative flex flex-col
                   items-start justify-center rounded-3xl border-2 border-gray-200 px-6 pt-4 "
                >
                  <div
                    className={`w-[46px] h-[46px] relative border
                  rounded-full flex items-center justify-center cursor-pointer
                 ${
                   active === key ? "bg-first" : "bg-head"
                 }  transition-all duration-500 ease-in-out `}
                  >
                    {item?.icon}
                  </div>
                  {key !== 0 ? (
                    <article className="py-5 items-start ">
                      <h5
                        className={`${
                          active === key ? "text-first" : "text-head"
                        }  transition-all duration-500 ease-in-out`}
                      >
                        {item?.title}
                      </h5>
                      <p className=" leading-loose pt-2">{item?.subheading1}</p>
                      <p className=" leading-loose">{item?.subheading2}</p>
                    </article>
                  ) : (
                    <article className=" py-5 items-start">
                      <h5
                        className={`${
                          active === key ? "text-first" : "text-head"
                        }  transition-all duration-500 ease-in-out`}
                      >
                        {item?.title}
                      </h5>
                      <p className=" leading-loose pt-2">
                        <span className="font-semibold">Toll Free:</span>&nbsp;
                        {item?.subheading1}
                      </p>
                      <p className=" leading-loose">
                        <span className="font-semibold">Fax:</span>&nbsp;
                        {item?.subheading2}
                      </p>
                    </article>
                  )}
                </Card>
              );
            })}
          </section>
        
        </div>
      </section>
      <section className="w-full relative h-[80vh] ">
        <div className="w-full relative h-full px-30 pb-20 flex items-center justify-center gap-8">
          <div className="w-1/2 h-full relative">
            <MapComponent height="100%"/>
          </div>
          <div className="w-1/2 relative h-full">
          <form action="" method="post" className="w-full h-full relative flex flex-col gap-6 items-start justify-center">
            <input type="text"
              placeholder="Name"
              className="w-full rounded-full py-2 px-6 placeholder:text-sm border-1 border-gray-100/50 outline-1 focus:outline-head"
            />
            <input type="text"
              placeholder="Email"
              className="w-full rounded-full py-2 px-6 placeholder:text-sm border-1 border-gray-100/50 outline-1 focus:outline-head"
            />
            <input type="text"
              placeholder="Phone"
              className="w-full rounded-full py-2 px-6 placeholder:text-sm border-1 border-gray-100/50 outline-1 focus:outline-head"
            />
            <textarea rows={46} 
              placeholder="Message"
              className="w-full rounded-xl px-6 placeholder:text-sm py-3 border-1 border-gray-100/50 outline-1 focus:outline-head"
            />
         <Button className="px-30 py-6 bg-tansparent rounded-full border-2 border-head text-body cursor-pointer
         hover:bg-first hover:border-first transition-all duration-500 ease-in-out">
          Send
         </Button>
          </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ContactPage;
