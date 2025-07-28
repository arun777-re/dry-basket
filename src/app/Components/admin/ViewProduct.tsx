"use client";
import AdminProductCard from "@/app/_components/card/AdminProductCard";
import DummyCard from "@/app/_components/card/DummyCard";
import { getAllProduct } from "@/redux/slices/productSlice";
import { AppDispatch } from "@/redux/store/store";
import { ProductDocument } from "@/types/product";
import React, { useState } from "react";
import { useDispatch} from "react-redux";

const ViewProduct: React.FC = () => {
  const [offers, setOffers] = useState<ProductDocument[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  React.useEffect(() => {
    dispatch(getAllProduct())
      .unwrap()
      .then((res) => {
        if (res?.success) {
          setOffers(res?.data);
        }
      });
  }, [dispatch]);

  return (
    <div className="w-full min-h-screen h-auto relative">
      <h4>All Products</h4>
      {Array.isArray(offers) && offers.length > 0 ? (
        <section className="w-full h-auto flex flex-row flex-wrap relative gap-6">
          {offers.map((item, key) => {
            return <AdminProductCard key={key} {...item} />;
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

export default ViewProduct;
