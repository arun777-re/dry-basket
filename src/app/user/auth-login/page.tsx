"use client";

import React, { useState } from "react";
import LoginForm from "@/app/_components/form/user/LoginForm";
import RegisterForm from "@/app/_components/form/user/RegisterForm";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";
import HeroBanner from "@/app/Components/HeroBanner";

const UserSignUp = () => {
  const [page, setPage] = useState<string>("register");

  return (
    <div className="relative max-w-screen w-full mx-auto h-auto">
        <Navbar />
        <HeroBanner heading="Account/Login" />
        <div className="relative max-w-screen w-full  z-10 ">
            {page === "login" ? <LoginForm setPage={setPage}/> : <RegisterForm setPage={setPage}/>}
        </div>
        <Footer />
      </div>
  );
};

export default UserSignUp;
