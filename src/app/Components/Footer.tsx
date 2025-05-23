"use client";

import React, { useCallback } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { PiGreaterThanBold } from "react-icons/pi";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { GoClock } from "react-icons/go";
import { MdOutlineEmail } from "react-icons/md";

const footerData = [
  {
    title: "Help",
    link1: "Search",
    link2: "Help",
    link3: "Information",
    link4: "Privacy Policy",
    link5: "Shipping Details",
  },
  {
    title: "Support",
    link1: "Contact us",
    link2: "About us",
    link3: "Carrers",
    link4: "Refunds",
    link5: "Deliveries",
  },
  {
    title: "Help",
    link1: "Search Terms",
    link2: "Advance Search",
    link3: "Help & Faq's",
    link4: "Store Location",
    link5: "Orders & Returns",
  },
];

const Footer = () => {
  const router = usePathname();
  const redirect = useRouter();

  const Handlecontact = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      redirect.push("/contact");
    },
    [router]
  );
  return (
    <section className="relative max-w-screen w-full mx-auto">
      <div className="relative h-auto bg-black px-0 w-full z-0 top-[88%] text-gray-100/90 flex flex-col gap-20">
          <div className="max-w-screen w-full grid grid-cols-1 lg:grid-cols-5 px-4 md:px-20 lg:px-30 pt-20 gap-6 ">
            <div className="flex flex-col gap-5 items-start w-2/3 justify-start">
              <h5 className="text-first">About Us</h5>
              <p className="text-sm text-space text-white h-16 lg:h-20 tracking-wide">
                A great plateform to buy and sell your properties without any
                agent or commisions.
              </p>
              <Link
                href={"/about"}
                className="pt-8 transition-all duration-500 ease-in-out"
              >
                <p className="text-first hover:text-white">Read more</p>
              </Link>
            </div>
            {footerData.map((item, key) => {
              return (
                <div
                  className="flex flex-col gap-5 items-start w-3/3 justify-start"
                  key={key}
                >
                  <h5 className="text-first">{item?.title}</h5>
                  <ul className="flex flex-col gap-3">
                    <li>
                      <Link
                        href="#"
                        className="text-sm text-white hover:text-first tracking-wider cursor-pointer transition colors duration-350 ease-in-out flex gap-2 items-center-safe"
                      >
                        <PiGreaterThanBold /> {item?.link1}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-sm text-white hover:text-first tracking-wider cursor-pointer transition colors duration-350 ease-in-out flex gap-2 items-center-safe"
                      >
                        <PiGreaterThanBold /> {item?.link2}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-sm text-white hover:text-first tracking-wider cursor-pointer transition colors duration-350 ease-in-out flex gap-2 items-center-safe"
                      >
                        <PiGreaterThanBold /> {item?.link3}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-sm text-white hover:text-first tracking-wider cursor-pointer transition colors duration-350 ease-in-out flex gap-2 items-center-safe"
                      >
                        <PiGreaterThanBold /> {item?.link4}
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="#"
                        className="text-sm text-white hover:text-first tracking-wider cursor-pointer transition colors duration-350 ease-in-out flex gap-2 items-center-safe"
                      >
                        <PiGreaterThanBold /> {item?.link5}
                      </Link>
                    </li>
                  </ul>
                </div>
              );
            })}
            <div className="flex flex-col gap-5 items-start w-3/3 justify-start">
              <h5 className="text-first">Contact Details</h5>
              <ul className="flex flex-col gap-3">
                {[
                  {
                    icon: <FaHome size={16} className="text-white" />,
                    title: "Sec 14 Sonipat Haryana",
                  },
                  {
                    icon: <FaPhone size={14} className="text-white" />,
                    title: "67867867867",
                  },
                  {
                    icon: <GoClock size={16} className="text-white" />,
                    title: "9.30AM - 7.30PM",
                  },
                  {
                    icon: <MdOutlineEmail size={16} className="text-white" />,
                    title: "mail@example.com",
                  },
                ].map((item, key) => (
                  <li className="flex flex-row items-center gap-2" key={key}>
                    {item?.icon}
                    <span className="text-sm text-white tracking-wider cursor-default transition colors duration-350 ease-in-out">
                      {item?.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row md:justify-between gap-6 md:gap-0 items-center px-4 md:px-20 lg:px-30 pb-5">
            <p className="text-gray-400 tracking-widest leading-loose text-center">
              © 2025 S.R Tech Solutions. All rights reserved.
            </p>
            <div className="flex flex-row gap-5 items-center justify-center">
              <FaLinkedin
                size={20}
                className="text-white animate-pulse cursor-pointer"
              />
              <FaFacebook
                size={20}
                className="text-white animate-pulse cursor-pointer"
              />
              <FaInstagram
                size={20}
                className="text-white animate-pulse cursor-pointer"
              />
              <FaTwitter
                size={20}
                className="text-white animate-pulse cursor-pointer"
              />
              <FaInstagram
                size={20}
                className="text-white animate-pulse cursor-pointer"
              />
            </div>
          </div>
      </div>
    </section>
  );
};

export default Footer;
