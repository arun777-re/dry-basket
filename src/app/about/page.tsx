import React from "react";
import Navbar from "../Components/Navbar";
import Banner from "../Components/Banner";
import Footer from "../Components/Footer";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Team from "../Components/Team";
import Process from "../Components/Process";

const testimData = [
  {
    image: "/images/testim.jpg",
    name: "Arun",
    designation: "Developer",
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing eli Necessitatibus ex eius perferendis distinctio voluptates excepturi fugit culpa voluptatem, neque dolor unde, maiores accusantium aliquam nostrum fuga praesentium architecto. Sit",
  },
  {
    image: "/images/testim.jpg",
    name: "Arun",
    designation: "Developer",
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing eli Necessitatibus ex eius perferendis distinctio voluptates excepturi fugit culpa voluptatem, neque dolor unde, maiores accusantium aliquam nostrum fuga praesentium architecto. Sit",
  },
  {
    image: "/images/testim.jpg",
    name: "Arun",
    designation: "Developer",
    description:
      " Lorem ipsum dolor sit amet consectetur adipisicing eli Necessitatibus ex eius perferendis distinctio voluptates excepturi fugit culpa voluptatem, neque dolor unde, maiores accusantium aliquam nostrum fuga praesentium architecto. Sit",
  },
];

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-screen relative w-full mx-auto h-auto overflow-x-hidden">
      <Navbar />
      <Banner heading="About US" />
      <section className="w-full relative">
        <div className="w-full relative px-30 py-20 h-[70vh]">
          <div className="w-full relative h-full border-2 gap-6 flex items-center justify-center overflow-hidden">
            <div className="w-1/2 relative h-full flex flex-col gap-4">
              <h5 className="text-head">The Oil Richest Almonds</h5>
              <div className="w-full flex flex-col items-start justify-center relative gap-8">
                <p className="leading-loose">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Necessitatibus ex eius perferendis distinctio voluptates
                  excepturi fugit culpa voluptatem, neque dolor unde, maiores
                  accusantium aliquam nostrum fuga praesentium architecto. Sit
                  sunt ea obcaecati similique maxime est ad nisi quo molestiae
                  nemo.
                </p>
                <article className="w-full relative flex items-center justify-center gap-3">
                  <div className="h-[100px] relative bg-body w-[8px] "></div>
                  <p className="font-cursive leading-loose">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Necessitatibus ex eius perferendis distinctio voluptates
                    excepturi fugit culpa voluptatem, neque dolor unde, maiores
                    accusantium aliquam nostrum fuga praesentium architecto. Sit
                    sunt ea obcaecati similique maxime est ad nisi quo
                    molestiae.
                  </p>
                </article>
              </div>
            </div>
            <div className="w-1/2 relative h-[90%]">
              <Image
                src={"/images/banner-4.jpg"}
                alt="about"
                fill
                priority
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="max-w-screen w-full h-auto bg-gray-100">
        <div className="relative w-full px-30 flex flex-col items-center justify-center gap-10 pt-20 ">
          <header className="relative max-w-lg w-full flex flex-col items-center justify-center ">
            <h2>A unique blended taste</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing with height.</p>
            <div className="flex gap-2 items-center p-2">
              <FaStar size={18} className="text-first " />
              <FaStar size={25} className="text-body" />
              <FaStar size={18} className="text-first " />
            </div>
          </header>
          <section className="w-full relative flex flex-col items-center justify-center gap-20 pb-30">
                <div
                    className="w-full relative h-[32vh] flex gap-16"
                  >
                      <div className="w-[46%] relative ">
                       <div className="w-full relative h-full bg-head hover:animate-pulse">

                       </div>
                       <div className="absolute w-full h-full top-8 left-8 ">
                          <Image
                          src={'/images/banner-2.jpg'}
                          alt="about"
                          fill
                          priority
                          className="object-center object-fill"
                          />
                       </div>
                    </div>
                    <article className="w-[54%] flex flex-col items-start justify-center gap-6">
                        <h5 className="text-head">
                            The finest spice
                        </h5>
                      <p className="font-roboto leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur adipisicing eli Necessitatibus ex eius perferendis distinctio voluptates excepturi fugit culpa voluptatem,
                         neque dolor unde, maiores accusantium aliquam nostrum fuga praesentium architecto. Sit",
                      </p>
                    
                    </article>
                  
                  </div>
                <div
                    className="w-full relative h-[32vh] flex flex-row-reverse  gap-16"
                  >
                      <div className="w-[46%] relative ">
                       <div className="w-full relative h-full bg-head hover:animate-pulse">

                       </div>
                       <div className="absolute w-full h-full top-8 left-8 border-2 border-first">
                          <Image
                          src={'/images/banner-2.jpg'}
                          alt="about"
                          fill
                          priority
                          className="object-center object-fill"
                          />
                       </div>
                    </div>
                    <article className="w-[54%] flex flex-col items-end justify-center gap-6">
                        <h5 className="text-head">
                            The finest Nuts
                        </h5>
                      <p className="font-roboto text-right leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur adipisicing eli Necessitatibus ex eius perferendis distinctio voluptates excepturi fugit culpa voluptatem,
                         neque dolor unde, maiores accusantium aliquam nostrum fuga praesentium architecto. Sit",
                      </p>
                    
                    </article>
                  
                  </div>
      
          </section>
        </div>
      </section>
      <Process/>

      <section className="max-w-screen w-full h-auto bg-gray-100">
        <div className="relative w-full px-30 flex flex-col items-center justify-center gap-10 pt-20 ">
          <header className="relative max-w-lg w-full flex flex-col items-center justify-center ">
            <h2>Our Client Words</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing</p>
            <div className="flex gap-2 items-center p-2">
              <FaStar size={18} className="text-first " />
              <FaStar size={25} className="text-body" />
              <FaStar size={18} className="text-first " />
            </div>
          </header>
          <section className="w-full relative flex items-center justify-center gap-8 pb-30">
            {testimData &&
              testimData.map((item, key) => {
                return (
                  <div
                    key={key}
                    className="w-1/3 relative h-[30vh] flex flex-col gap-8"
                  >
                    <article className="flex flex-col items-start justify-center gap-4">
                      <p className="font-roboto">{item?.description}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar size={18} className="text-body" />
                        ))}
                      </div>
                    </article>
                    <div className="flex items-center w-full relative justify-start gap-2">
                      <img
                        style={{ borderRadius: "50%" }}
                        src={item?.image}
                        alt="testimonial"
                        className="h-[70px] w-[70px] border border-first object-center object-fill"
                      />
                      <p>
                        <span className="font-semibold text-body">
                          {item?.name}
                        </span>
                        &nbsp; -&nbsp;
                        <span className="">{item?.designation}</span>
                      </p>
                    </div>
                  </div>
                );
              })}
          </section>
        </div>
      </section>
      <Team />
      <Footer />
    </div>
  );
};

export default AboutPage;
