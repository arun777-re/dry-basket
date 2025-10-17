"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { CartDrawer } from "./CartDrawer";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import SearchBar from "../_components/SearchBar";
import { UserPropsIncoming } from "@/types/user";
import { IncomingAPIResponseFormat } from "@/types/response";
import { ROUTES } from "@/constants/routes";
import { totalCartItems } from "@/redux/slices/cartSlice";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [search, setSearch] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);


  const cartItemsLength = useSelector(totalCartItems);

  const router = useRouter();

  // Scroll logic to activate navbar
  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const user = useSelector<
    RootState,
    IncomingAPIResponseFormat<UserPropsIncoming>
  >((state) => state.user.user);

  const handleLoginAndUserDashBoard = React.useCallback(
    (e: React.MouseEvent<SVGElement>) => {
      e.preventDefault();
      if (!user.success) {
        router.push(`${ROUTES.LOGIN}`);
      } else {
        router.push(`${ROUTES.USER_DASHBOARD}`);
      }
    },
    [user]
  );

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1
        data-aos="fade-down"
        className="text-center text-first relative py-6 z-50"
      >
        Dry Basket
      </h1>

      <AnimatePresence>
        <motion.nav
          key="navbar"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`fixed top-0 z-50 bg-black transition-all duration-300 ${
            active
              ? "shadow-md px-0 md:px-20 lg:px-36 w-full"
              : "w-[86%] sm:w-[80%] lg:w-[76%] mx-auto top-22"
          } text-white`}
        >
          <div className="max-w-screen-xl mx-auto py-4 md:py-6 px-6 flex justify-between items-center">
            {/* Hamburger on small screens */}
            <div className="flex items-center gap-4">
              <button
                className="md:hidden text-2xl"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label="Toggle Menu"
              >
                {mobileOpen ? <FaTimes /> : <FaBars />}
              </button>

              {/* Desktop Links */}
              <ul className="hidden md:flex gap-8">
                {["Home", "Shop", "About", "Contact", "Faq"].map((item) => {
                  let href = `/${item.toLowerCase().replace(/\s+/g, "")}`;

                  if (item === "Home") {
                    href = "/";
                  } else if (item === "Shop") {
                    href = "/allproducts";
                  }
                  return (
                    <li key={item}>
                      <Link
                        href={href}
                        className="text-sm font-roboto hover:text-[color:var(--color-first)] transition"
                      >
                        {item}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Icons */}
            <div className="flex gap-4 items-center">
              <IoSearchOutline
                className="text-2xl cursor-pointer"
                onClick={() => setSearch((prev) => !prev)}
              />
              <CartDrawer />
              <FaUser
                onClick={handleLoginAndUserDashBoard}
                className="text-xl cursor-pointer"
              />
            </div>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="md:hidden bg-black/95 px-6 pb-4">
              <ul className="flex flex-col gap-4 mt-2">
                {["Home", "Shop", "About", "Contact", "Faq"].map((item) => {
                    let href = `/${item.toLowerCase().replace(/\s+/g, "")}`;
                    if (item === "Home") {
                    href = "/";
                  } else if (item === "Shop") {
                    href = "/allproducts";
                  }
                  return <li key={item}>
                    <Link
                      href={
                        href
                      }
                      className="block text-sm font-roboto hover:text-[color:var(--color-first)] transition"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item}
                    </Link>
                  </li>
})}
              </ul>
            </div>
          )}

          {search && <SearchBar />}
        </motion.nav>
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
