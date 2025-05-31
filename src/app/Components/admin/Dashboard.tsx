/* eslint-disable react-hooks/exhaustive-deps */

"use client";
import React, { useEffect, useState } from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { PiUsersThreeBold } from "react-icons/pi";
import { MdOutlineMapsHomeWork, MdOutlineAddHome } from "react-icons/md";
import { BsLightningCharge } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store/store";



const Dashboard = () => {
  const [sold, setSold] = useState<number>(0);
  const [rented, setRented] = useState<number>(0);
  const [allProperties, setAllProperties] = useState<number>(0);
  const [active, setActive] = useState<number>(0);
  const [revenue, setRevenue] = useState<number>(0);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <section className="w-full relative h-auto ">
      <article className="flex flex-col gap-1">
        <h2 className="text-lg font-medium">Hello, </h2>
        <p className="text-sm text-gray-700/60 font-medium">Welcome back!</p>
      </article>
      <div className="flex flex-col items-start h-auto py-5 pb-10">
        <div className="flex flex-row items-start gap-4">
          <article className="p-3 shadow flex flex-row items-center gap-6 rounded bg-white">
            <div className="relative">
              <p className="text-gray-700/60 text-sm font-medium pb-4">
                Total Revenue
              </p>
              <h1 className="text-xl text-gray-800 font-semibold">
                Rs&nbsp;{typeof revenue === 'number' ? revenue : 0}
              </h1>
            </div>
            <FaIndianRupeeSign
              size={30}
              className="text-green-600 bg-gray-100/60  rounded"
            />
          </article>
          <article className="p-3 shadow flex flex-row items-center gap-6 rounded bg-white">
            <div className="gap-8">
              <p className="text-gray-700/60 text-sm pb-4">
                Total Visitor Come
              </p>
              <h1 className="text-xl text-gray-800 font-semibold">{typeof active === 'number' ? active : 0}</h1>
            </div>
            <PiUsersThreeBold
              size={35}
              className="text-green-600  bg-gray-100/60 rounded"
            />
          </article>
          <article className="p-3 shadow flex flex-row items-center gap-6 rounded bg-white">
            <div className="gap-8">
              <p className="text-gray-700/60 text-sm pb-4">Total Properties</p>
              <h1 className="text-xl text-gray-800 font-semibold">
                {typeof allProperties === 'number' ? allProperties : 0}
              </h1>
            </div>
            <MdOutlineMapsHomeWork
              size={35}
              className="text-green-600 bg-gray-100/60 rounded"
            />
          </article>
          <article className="p-3 shadow flex flex-row items-center gap-6 rounded bg-white">
            <div className="gap-8">
              <p className="text-gray-700/60 text-sm pb-4">
                Sold Properties
              </p>
              <h1 className="text-xl text-gray-800 font-semibold">{typeof sold === 'number' ? sold : 0}</h1>
            </div>
            <BsLightningCharge
              size={35}
              className="text-green-600 bg-gray-100/60 rounded"
            />
          </article>
          <article className="p-3 shadow flex flex-row items-center gap-6 rounded bg-white">
            <div className="gap-8">
              <p className="text-gray-700/60 text-sm pb-4">
                Rented Properties
              </p>
              <h1 className="text-xl text-gray-800 font-semibold">{typeof rented === 'number' ? rented : 0}</h1>
            </div>
            <MdOutlineAddHome
              size={35}
              className="text-green-600 bg-gray-100/60 rounded"
            />
          </article>
        </div>
        <div className="rounded shadow w-[75vw] h-[60vh] mt-10 px-4 bg-white pb-10">
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
