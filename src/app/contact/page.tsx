"use client";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import MapComponent from "../Components/MapComponent";
import Contact from "../_components/Contact";
import HeroBanner from "../Components/HeroBanner";

const ContactPage = () => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Navbar />
      <HeroBanner heading="Contact Us" />
      <Contact />
      {/* Map + Contact Form Section */}
      <section className="w-full flex flex-col lg:flex-row gap-8 px-4 sm:px-6 lg:px-30 pt-0 pb-12">
        {/* Map */}
        <div className="w-full lg:w-1/2">
          <MapComponent />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
