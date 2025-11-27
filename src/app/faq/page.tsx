'use client';
import React from 'react';
import Navbar from '../Components/Navbar';
import Banner from '../Components/Banner';
import Footer from '../Components/Footer';
import { FaStar } from 'react-icons/fa';
import { Card } from '@radix-ui/themes';
import { faqData } from '@/data/faqData';

const FaqPage = () => {
  const [active, setActive] = React.useState<number | null>(null);

  return (
    <div className="w-full h-auto overflow-x-hidden">
      <Navbar />
      <Banner heading="FAQ" />

      <section className="max-w-screen-xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-8">
          {/* Header */}
          <header className="flex flex-col items-center text-center gap-4 max-w-lg">
            <h2 className="text-2xl sm:text-3xl font-bold text-head">Frequently Asked Questions</h2>
            <p className="text-gray-600 text-sm sm:text-base">
              A lot more questions.
            </p>
            <div className="flex gap-2 items-center">
              <FaStar size={18} className="text-first" />
              <FaStar size={25} className="text-body" />
              <FaStar size={18} className="text-first" />
            </div>
          </header>

          {/* FAQ Cards */}
          <section className="w-full flex flex-col gap-4">
            {faqData &&
              faqData.map((item, key) => (
                <Card
                  key={key}
                  className="w-full"
                >
                  <article className="flex flex-col">
                    {/* Question */}
                    <div
                      className="bg-gray-200 w-full py-3 px-4 cursor-pointer"
                      onClick={() => setActive(key)}
                    >
                      <h5 className="text-head font-medium">{item?.question}</h5>
                    </div>

                    {/* Answer */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out
                        ${active === key ? 'max-h-80 opacity-100 py-3 px-4' : 'max-h-0 opacity-0 px-4'}`}
                      style={{ transitionProperty: 'max-height, opacity, padding' }}
                    >
                      <p className="text-gray-700 text-sm sm:text-base">{item?.answer}</p>
                    </div>
                  </article>
                </Card>
              ))}
          </section>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FaqPage;
