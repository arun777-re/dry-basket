"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [active, setActive] = useState(false);

  // Scroll logic to activate navbar
  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="max-w-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-center text-first relative py-6 z-50">Dry Basket</h1>

      {/* AnimatePresence allows exit animations */}
      <AnimatePresence>
        <motion.nav
          key="navbar"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`fixed top-0 z-50 bg-black transition-all duration-300 ${
            active
              ? "shadow-md px-36 w-full"
              : "w-[76%] mx-auto top-22"
          } text-white`}
        >
          <div className="max-w-screen-xl mx-auto py-6 px-6 flex justify-between items-center">
            <ul className="flex gap-8">
              {["Home", "Products", "About", "Contact","Faq"].map((item, index) => (
                <li key={index}>
                  <Link
                    href={item === 'Home' ? '/' : `/${item.toLowerCase().replace(/\s+/g, "")}`}
                    className="text-sm font-roboto hover:text-[color:var(--color-first)] transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex gap-4">
              <IoSearchOutline className="text-2xl cursor-pointer" />
              <MdAddShoppingCart className="text-2xl cursor-pointer" />
              <FaUser className="text-2xl cursor-pointer" />
            </div>
          </div>
        </motion.nav>
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
