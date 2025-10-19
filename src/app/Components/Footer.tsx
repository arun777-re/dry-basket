"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaHome,
  FaPhone,
} from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { MdOutlineEmail } from "react-icons/md";
import { PiGreaterThanBold } from "react-icons/pi";

const footerData = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "Shop", href: "/shop" },
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Our Products",
    links: [
      { label: "Almonds", href: "/category/almonds" },
      { label: "Cashews", href: "/category/cashews" },
      { label: "Raisins", href: "/category/raisins" },
      { label: "Pistachios", href: "/category/pistachios" },
      { label: "Walnuts", href: "/category/walnuts" },
    ],
  },
  {
    title: "Information",
    links: [
      { label: "Shipping Policy", href: "/shipping-policy" },
      { label: "Return & Refund Policy", href: "/refund-policy" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
    ],
  },
];

const Footer = () => {
  const router = useRouter();

  const handleContact = useCallback(() => {
    router.push("/contact");
  }, [router]);

  return (
    <footer className="relative w-full bg-black text-gray-100/90 flex flex-col gap-16 pt-20 pb-6">
      {/* Top Footer */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6 md:px-12">
        
        {/* About Section */}
        <div className="flex flex-col gap-4">
          <h5 className="text-first text-lg font-semibold">About DryBasket</h5>
          <p className="text-sm text-gray-300 leading-relaxed">
            At DryBasket, we bring you the finest quality dry fruits sourced directly
            from trusted farms. Freshness, purity, and premium taste — delivered to
            your doorstep.
          </p>
          <Link
            href="/about"
            className="text-first hover:text-white transition-all duration-300 mt-2"
          >
            Read More →
          </Link>
        </div>

        {/* Dynamic Footer Columns */}
        {footerData.map((section, i) => (
          <div key={i} className="flex flex-col gap-4">
            <h5 className="text-first text-lg font-semibold">{section.title}</h5>
            <ul className="flex flex-col gap-3">
              {section.links.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-first flex items-center gap-2 transition-all duration-300"
                  >
                    <PiGreaterThanBold className="text-xs" /> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact Details */}
        <div className="flex flex-col gap-4">
          <h5 className="text-first text-lg font-semibold">Contact Us</h5>
          <ul className="flex flex-col gap-3 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <FaHome size={16} /> 21-B, Model Town, Sonipat, Haryana
            </li>
            <li className="flex items-center gap-2">
              <FaPhone size={16} /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <GoClock size={16} /> Mon–Sat: 9:00AM - 7:00PM
            </li>
            <li className="flex items-center gap-2">
              <MdOutlineEmail size={16} /> support@drybasket.in
            </li>
          </ul>
          <button
            onClick={handleContact}
            className="mt-4 bg-first text-black font-semibold px-5 py-2 rounded-lg hover:bg-white transition-all duration-300"
          >
            Contact Now
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 pt-4 flex flex-col md:flex-row justify-between items-center px-6 md:px-12 gap-4">
        <p className="text-gray-400 text-sm text-center md:text-left">
          © 2025 S.R. Tech Solutions. All Rights Reserved.
        </p>
        <div className="flex gap-5 items-center justify-center">
          <Link href="https://www.linkedin.com" target="_blank">
            <FaLinkedin className="hover:text-first transition-colors duration-300" size={20} />
          </Link>
          <Link href="https://www.facebook.com" target="_blank">
            <FaFacebook className="hover:text-first transition-colors duration-300" size={20} />
          </Link>
          <Link href="https://www.instagram.com" target="_blank">
            <FaInstagram className="hover:text-first transition-colors duration-300" size={20} />
          </Link>
          <Link href="https://x.com" target="_blank">
            <FaTwitter className="hover:text-first transition-colors duration-300" size={20} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
