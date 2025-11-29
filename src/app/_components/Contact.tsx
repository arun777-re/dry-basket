'use client'
import React from 'react'
import { Card } from "@radix-ui/themes";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPaperPlane, FaStar } from "react-icons/fa";

export const processData = [
  {
    icon: <IoCall size={22} className="text-white" />,
    title: "Phone",
    subheading1: "0000-123-456789",
    subheading2: "0000-123-456789",
    link: "tel:0000123456789", 
  },
  {
    icon: <MdEmail size={22} className="text-white" />,
    title: "Email",
    subheading1: "mail@example.com",
    subheading2: "support@example.com",
    link: "mailto:mail@example.com",
  },
  {
    icon: <FaPaperPlane size={20} className="text-white" />,
    title: "Address",
    subheading1: "No: 58 A, East Vivekanand Street",
    subheading2: "Baltimore, Sonipat, Haryana 131001",
    link: "https://www.google.com/maps/search/?api=1&query=No:+58+A,+East+Vivekanand+Street,+Baltimore,+Sonipat,+Haryana",
  },
];

const Contact = () => {
  const [active, setActive] = React.useState<number | null>(null);

  return (
    <section className="w-full h-auto py-16 px-4 sm:px-6 md:px-10 lg:px-30 flex flex-col items-center gap-10">
      <header className="text-center max-w-md flex flex-col items-center justify-center">
        <h2>Contact Us</h2>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
     
      </header>

      <div className="w-full flex flex-row flex-wrap sm:flex-nowrap gap-6 justify-items-center">
        {processData.map((item, key) => (
          <a key={key} href={item.link} target="_blank" rel="noopener noreferrer" className="w-full sm:w-60 md:w-80 lg:w-80">
            <Card
              onMouseEnter={() => setActive(key)}
              onMouseLeave={() => setActive(null)}
              className="h-64 flex flex-col justify-between items-start rounded-3xl border-2 border-gray-200 px-6 py-4 transition-transform hover:scale-105 cursor-pointer"
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full ${
                  active === key ? "bg-first" : "bg-head"
                } transition-all duration-500 ease-in-out`}
              >
                {item?.icon}
              </div>
              <article className="flex flex-col gap-2">
                <h5
                  className={`${
                    active === key ? "text-first" : "text-head"
                  } transition-all duration-500 ease-in-out`}
                >
                  {item?.title}
                </h5>
                <p className="leading-loose">
                  {key === 0 ? (
                    <>
                      <span className="font-semibold">Toll Free:</span>&nbsp;
                      {item?.subheading1}
                    </>
                  ) : (
                    item?.subheading1
                  )}
                </p>
                <p className="leading-loose">
                  {key === 0 ? (
                    <>
                      <span className="font-semibold">Fax:</span>&nbsp;
                      {item?.subheading2}
                    </>
                  ) : (
                    item?.subheading2
                  )}
                </p>
              </article>
            </Card>
          </a>
        ))}
      </div>
    </section>
  )
}

export default Contact;
