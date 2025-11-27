"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
import dynamic from "next/dynamic";

const FaBars = dynamic(() => import("react-icons/fa").then(i => i.FaBars));
const FaTimes = dynamic(() => import("react-icons/fa").then(i => i.FaTimes));
const FaUser = dynamic(() => import("react-icons/fa").then(i => i.FaUser));
const IoSearchOutline = dynamic(() => import("react-icons/io5").then(i => i.IoSearchOutline));

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [search, setSearch] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartItemsLength = useSelector(totalCartItems);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setActive(window.scrollY > 0);
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
      !user.success
        ? router.push(ROUTES.LOGIN)
        : router.push(ROUTES.USER_DASHBOARD);
    },
    [user]
  );

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {/* SITE TITLE */}
      <h1 data-aos="fade-down" className="text-center relative  my-4 z-50">
        Dry Basket
      </h1>

      <AnimatePresence>
        <motion.nav
          key="navbar"
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`fixed top-0 z-50 backdrop-blur-md transition-all duration-300
            bg-[color:var(--color-background)]/90 border-b border-[color:var(--color-border)]
            ${
              active
                ? "shadow-md px-0 md:px-20 lg:px-36 w-full"
                : "w-[86%] sm:w-[80%] lg:w-[76%] mx-auto top-22"
            }
          `}
        >
          <div className="max-w-screen-xl mx-auto py-4 md:py-6 px-6 flex justify-between items-center">
            {/* Hamburger */}
            <div className="flex items-center gap-4">
              <button
                className="md:hidden text-2xl text-head"
                onClick={() => setMobileOpen((prev) => !prev)}
                aria-label="Toggle Menu"
              >
                {mobileOpen ? <FaTimes /> : <FaBars />}
              </button>

              {/* Desktop Links */}
              <ul className="hidden md:flex gap-8">
                {["Home", "Shop", "Blogs", "About", "Contact", "Faq"].map(
                  (item) => {
                    let href = "/";
                    if (item === "Shop") href = "/allproducts";
                    else if (item === "About") href = "/about";
                    else if (item === "Contact") href = "/contact";
                    else if (item === "Faq") href = "/faq";
                    else if (item === "Blogs") href = "/allblogs";

                    return (
                      <li key={item}>
                        <Link
                          href={href}
                          className="text-sm font-roboto  hover:text-head transition"
                        >
                          {item}
                        </Link>
                      </li>
                    );
                  }
                )}
              </ul>
            </div>

            {/* Icons */}
            <div className="flex gap-4 items-center text-head">
              <IoSearchOutline
                className="text-2xl cursor-pointer hover:text-first"
                onClick={() => setSearch((prev) => !prev)}
              />

              <CartDrawer />

              <FaUser
                onClick={handleLoginAndUserDashBoard}
                className="text-xl cursor-pointer hover:text-first"
              />
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="md:hidden bg-[color:var(--color-background)]/95 px-6 pb-4 border-t border-border">
              <ul className="flex flex-col gap-4 mt-2">
                {["Home", "Shop", "Blogs", "About", "Contact", "Faq"].map(
                  (item) => {
                    let href = "/";
                    if (item === "Shop") href = "/allproducts";
                    else if (item === "About") href = "/about";
                    else if (item === "Contact") href = "/contact";
                    else if (item === "Faq") href = "/faq";
                    else if (item === "Blogs") href = "/allblogs";
                    return (
                      <li key={item}>
                        <Link
                          href={href}
                          className="block text-sm font-roboto  hover:text-head transition"
                          onClick={() => setMobileOpen(false)}
                        >
                          {item}
                        </Link>
                      </li>
                    );
                  }
                )}
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
