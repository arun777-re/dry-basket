"use client";

import React, { useState } from "react";
import LoginForm from "@/app/Components/user/LoginForm";
import RegisterForm from "@/app/Components/user/RegisterForm";
import Banner from "@/app/Components/Banner";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";

const UserSignUp = () => {
  const [page, setPage] = useState<string>("register");

  return (
    <div className="relative max-w-screen w-full mx-auto h-auto">
      <div
        className=" absolute inset-0 z-0 bg-[url('/images/login.avif')] bg-no-repeat bg-cover bg-fixed 
               animate-wiggle transition-all duration-800"
        style={{ backgroundSize: "300%" }}
      >
        <Navbar />
        <Banner heading="Account/Login" />
        <div className="relative max-w-screen w-full  z-10 flex flex-col justify-center items-center py-10 h-auto gap-5 px-4 ">
          <button
            style={{ top: page === "login" ? "5%" : "5%" }}
            type="button"
            onClick={() => setPage(page === "login" ? "register" : "login")}
            className="underline text-body font-semibold cursor-pointer px-8 py-2 bg-transparent border-2 
                      border-head rounded-full
                       hover:border-first hover:bg-first
                        transition-all duration-500 ease-in-out
                      right-0 relative z-300 -bottom-1"
          >
            {page === "login" ? "SignUp" : "Login"}
          </button>
          <div className="relative w-[100%] md:w-[100%]">
            {page === "login" ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default UserSignUp;
