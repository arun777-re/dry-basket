"use client";
import DummyCard from "@/app/_components/card/DummyCard";
import OfferCard from "@/app/_components/card/OfferCard";
import { viewoffer } from "@/redux/slices/offerSlice";
import { AppDispatch, RootState } from "@/redux/store/store";
import { OfferDocument } from "@/types/offer";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ViewOffer: React.FC = () => {
  const [offers, setOffers] = useState<OfferDocument[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(viewoffer())
      .unwrap()
      .then((res) => {
        if (res?.success) {
          setOffers(res?.data);
          console.log("offers", res);
        }
      });
  }, [dispatch]);

  return (
    <div className="w-full min-h-screen relative">
      <h4>Offers</h4>
      {Array.isArray(offers) && offers.length > 0 ? (
        <section className="w-full h-auto flex flex-row flex-wrap relative gap-6">
          {offers.map((item, key) => {
            return <OfferCard key={key} {...item} />;
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

export default ViewOffer;
