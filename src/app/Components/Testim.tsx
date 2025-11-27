'use client'
import { testimData } from '@/data/testimData';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa6';

const Testim = () => {
  return (
        <section className="w-full bg-gray-100 py-12">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12">
          <header className="text-center flex flex-col items-center gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold">Our Client Words</h2>
            <p className="text-gray-600 text-sm sm:text-base">Lorem ipsum, dolor sit amet consectetur adipisicing</p>
            <div className="flex gap-2 items-center">
              <FaStar size={18} className="text-first" />
              <FaStar size={25} className="text-body" />
              <FaStar size={18} className="text-first" />
            </div>
          </header>

          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimData.map((item, key) => (
              <div key={key} className="flex flex-col gap-4 bg-white rounded-xl shadow-md p-4">
                <article className="flex flex-col gap-2 text-gray-700">
                  <p className="text-sm sm:text-base">{item.description}</p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} size={18} className="text-body" />
                    ))}
                  </div>
                </article>
                <div className="flex items-center gap-2 mt-auto">
                  <Image
                    src={item.image}
                    alt="testimonial"
                    width={70}
                    height={70}
                    className="rounded-full border border-first object-cover"
                  />
                  <p className="text-sm sm:text-base">
                    <span className="font-semibold text-body">{item.name}</span> - {item.designation}
                  </p>
                </div>
              </div>
            ))}
          </section>
        </div>
      </section>
  )
}

export default Testim