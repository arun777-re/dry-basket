'use client';
import React from "react";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import Footer from "../Components/Footer";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Team from "../Components/Team";
import Process from "../Components/Process";
import Testim from "../Components/Testim";

const AboutPage: React.FC = () => {
  return (
    <div className="w-full h-auto overflow-x-hidden">
      <Navbar />
      <Banner heading="About US" />

      {/* Hero Section */}
      <section className="w-full relative px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-8 max-w-screen-xl mx-auto">
          {/* Text */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <h5 className="text-head text-xl sm:text-2xl font-bold">The Oil Richest Almonds</h5>
            <p className="leading-loose text-gray-700">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ex eius perferendis distinctio voluptates excepturi fugit culpa voluptatem, neque dolor unde, maiores accusantium aliquam nostrum fuga praesentium architecto. Sit sunt ea obcaecati similique maxime est ad nisi quo molestiae nemo.
            </p>
            <article className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <div className="h-[100px] w-2 bg-body"></div>
              <p className="font-cursive leading-loose text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ex eius perferendis distinctio voluptates excepturi fugit culpa voluptatem, neque dolor unde, maiores accusantium aliquam nostrum fuga praesentium architecto.
              </p>
            </article>
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2 h-64 sm:h-96 relative">
            <Image
              src={"/images/banner-4.jpg"}
              alt="about"
              fill
              className="object-cover object-center rounded-xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Unique Blended Taste Section */}
      <section className="w-full bg-gray-100 py-12">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
          <header className="text-center flex flex-col items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold">A unique blended taste</h2>
            <p className="text-gray-600 text-sm sm:text-base">Lorem ipsum, dolor sit amet consectetur adipisicing with height.</p>
         
          </header>

          {/* Image + Text Pairs */}
          <div className="flex flex-col gap-12">
            {/* Pair 1 */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-16 items-center">
              <div className="w-full lg:w-1/2 h-64 relative">
                <Image
                  src={'/images/banner-2.jpg'}
                  alt="about"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              <article className="w-full lg:w-1/2 flex flex-col gap-4 text-gray-700">
                <h5 className="text-head text-lg sm:text-xl font-bold">The finest spice</h5>
                <p className="leading-relaxed text-sm sm:text-base">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ex eius perferendis distinctio voluptates excepturi fugit culpa voluptatem, neque dolor unde, maiores accusantium aliquam nostrum fuga praesentium architecto.
                </p>
              </article>
            </div>

            {/* Pair 2 */}
            <div className="flex flex-col lg:flex-row-reverse gap-6 lg:gap-16 items-center">
              <div className="w-full lg:w-1/2 h-64 relative">
                <Image
                  src={'/images/banner-2.jpg'}
                  alt="about"
                  fill
                  className="object-cover rounded-xl border-2 border-first"
                />
              </div>
              <article className="w-full lg:w-1/2 flex flex-col gap-4 items-start lg:items-end text-gray-700">
                <h5 className="text-head text-lg sm:text-xl font-bold">The finest Nuts</h5>
                <p className="leading-relaxed text-sm sm:text-base text-left lg:text-right">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus ex eius perferendis distinctio voluptates excepturi fugit culpa voluptatem, neque dolor unde, maiores accusantium aliquam nostrum fuga praesentium architecto.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <Process />

      {/* Testimonials */}
    <Testim/>
      <Team />
      <Footer />
    </div>
  );
};

export default AboutPage;
