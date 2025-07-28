"use client";
import AdminCategoryCard from "@/app/_components/card/AdminCategoryCard";
import DummyCard from "@/app/_components/card/DummyCard";
import OfferCard from "@/app/_components/card/OfferCard";
import { viewCategory } from "@/redux/slices/categorySlice";
import { AppDispatch } from "@/redux/store/store";
import { ProductDocument } from "@/types/product";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const ViewCategory: React.FC = () => {
  const [offers, setOffers] = useState([]);
  const dispatch = useDispatch<AppDispatch>(); 

  React.useEffect(() => {
    dispatch(viewCategory())
      .unwrap()
      .then((res) => {
        if (res?.success) {
          setOffers(res?.data);
        }
      });
  }, [dispatch]);

  return (
    <div className="w-full min-h-screen relative">
      <h4>Categories</h4>
      {Array.isArray(offers) && offers.length > 0 ? (
        <section className="w-full h-auto flex flex-row flex-wrap relative gap-6">
          {offers.map((item, key) => {
            return <AdminCategoryCard key={key} {...item} />;
          })}
        </section>
      ) : (
        <section className="w-full h-auto flex flex-row flex-wrap relative gap-4">
          {[...Array(6)].map((_, k) => {
            return <DummyCard key={k} />;
          })}
        </section>
      )}
    </div>
  );
};

export default ViewCategory;
