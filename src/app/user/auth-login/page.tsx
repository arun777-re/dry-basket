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
        <Navbar />
        <Banner heading="Account/Login" />
        <div className="relative max-w-screen w-full  z-10 ">
            {page === "login" ? <LoginForm setPage={setPage}/> : <RegisterForm setPage={setPage}/>}
        </div>
        <Footer />
      </div>
  );
};

export default UserSignUp;
