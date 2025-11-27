"use client";

import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Toaster } from "react-hot-toast";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 800,
    });
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Toaster position="top-right" toastOptions={{
          duration:2000
        }}/>
        {children}
      </PersistGate>
    </Provider>
  );
}
