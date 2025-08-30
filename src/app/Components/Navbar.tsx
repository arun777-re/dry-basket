"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaLongArrowAltUp, FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { CartDrawer } from "./CartDrawer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";
import { logoutUserLocally,logoutuser} from "@/redux/slices/userSlice";
import SearchBar from "../_components/SearchBar";
import { UserPropsIncoming } from "@/types/user";
import { IncomingAPIResponseFormat } from "@/types/response";
import { ROUTES } from "@/constants/routes";
import authHook from "@/hooks/authHook";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [search, setSearch] = useState(false);

  const router = useRouter();

  // Scroll logic to activate navbar
  useEffect(() => {
    const handleScroll = () => {
      setActive(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const user = useSelector<RootState,IncomingAPIResponseFormat<UserPropsIncoming>>(state => state.user.user);

  const {LOGOUT_USER} = authHook();

  const handleLogout = ()=>{
    LOGOUT_USER(user?.data?._id!);
  }

  const handleLoginAndUserDashBoard = React.useCallback((e:React.MouseEvent<SVGElement>)=>{
    e.preventDefault();
      if(!user.success){
        router.push(`${ROUTES.LOGIN}`)
      }else{
         router.push(`${ROUTES.USER_DASHBOARD}`)
      }
  },[user])

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
              <IoSearchOutline className="text-2xl cursor-pointer" onClick={()=>setSearch(prev => !prev)}/>
              <CartDrawer/>
              <FaUser onClick={handleLoginAndUserDashBoard} className="text-xl cursor-pointer"/>
                <FaLongArrowAltUp onClick={handleLogout}/>
            </div>
             {search &&
      <SearchBar/>
      }
          </div>
        </motion.nav>
      </AnimatePresence>
     

    </div>
  );
};

export default Navbar;
