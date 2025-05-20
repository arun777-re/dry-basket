"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdAddShoppingCart } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import Aos from "aos";

const Navbar = () => {
  const [active, setActive] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

//   refresh aos when active changes
useEffect(()=>{
    Aos.refresh()
},[active])

  return (
    <>
    <h1 className="text-center text-first relative py-6 z-50">Dry Basket</h1>
    <nav
      className={`sticky  bg-black mx-auto  z-50 transition-all duration-300  ${
        active ? " text-white top-0 w-full shadow-md px-36" : " text-white w-[76%] top-22 mx-auto"
      }`}
    >
      <div
       data-aos={active ? 'fade-down' : undefined}
       key={active ? 'active' : 'inactive'}
       className="max-w-screen-xl mx-auto py-6 px-6 flex justify-between items-center">
        <ul className="flex gap-8">
          {["Home", "Products", "About Us", "Contact Us"].map((item, index) => (
            <li key={index}>
              <Link
                href={`/${item.toLowerCase().replace(/\s+/g, "")}`}
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
    </nav>
    </>

  );
};

export default Navbar;
