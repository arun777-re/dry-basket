import Link from "next/link";


const FaFacebook = dynamic(() => import("react-icons/fa").then(i => i.FaFacebook));
const FaInstagram = dynamic(() => import("react-icons/fa").then(i => i.FaInstagram));
const FaLinkedin = dynamic(() => import("react-icons/fa").then(i => i.FaLinkedin));
const FaTwitter = dynamic(() => import("react-icons/fa").then(i => i.FaTwitter));
const FaHome = dynamic(() => import("react-icons/fa").then(i => i.FaHome));
const FaPhone = dynamic(() => import("react-icons/fa").then(i => i.FaPhone));


import { GoClock } from "react-icons/go";
import { MdOutlineEmail } from "react-icons/md";
import { PiGreaterThanBold } from "react-icons/pi";
import { ROUTES } from "@/constants/routes";
import dynamic from "next/dynamic";

const footerData = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: `${ROUTES.HOME}` },
      { label: "Shop", href: `${ROUTES.ALL_PRODUCTS}` },
      { label: "About Us", href: `${ROUTES.ABOUT}` },
      { label: "Contact Us", href: `${ROUTES.CONTACT}` },
    ],
  },
  {
    title: "Our Products",
    links: [
      { label: "Almonds", href: "/products/almonds" },
      { label: "Cashews", href: "/products/cashews" },
      { label: "Raisins", href: "/products/raisins" },
      { label: "Pistachios", href: "/products/pistachios" },
      { label: "Walnuts", href: "/products/walnuts" },
    ],
  },
  {
    title: "Information",
    links: [
      { label: "Shipping Policy", href: `${ROUTES.SHIPPING_POLICY}` },
      { label: "Privacy Policy", href: `${ROUTES.PRIVACY_POLICY}` },
      { label: "Terms & Conditions", href: `${ROUTES.TERMS_AND_CONDITIONS}` },
    ],
  },
];

const Footer = ({bgcolor}:{bgcolor?:string}) => {


  return (
<footer className={`relative w-full ${bgcolor ? '' : 'bg-[#1f6f6f10]'} flex flex-col gap-16 pt-20 pb-6`}
style={bgcolor ? {backgroundColor:bgcolor} : undefined}
>

  {/* Top Footer */}
  <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6 md:px-12">

    {/* About */}
    <div className="flex flex-col gap-4">
      <h5 className="text-head text-lg font-semibold tracking-wide">About DryBasket</h5>
      <p className="text-sm text-text/80 leading-relaxed">
        At DryBasket, we bring you the finest quality dry fruits sourced
        directly from trusted farms. Freshness, purity, and premium taste — 
        delivered to your doorstep.
      </p>

      <Link 
        href="/about"
        className="text-first/80 hover:text-first transition-all duration-300 mt-2"
      >
        Read More →
      </Link>
    </div>

    {/* Dynamic Columns */}
    {footerData.map((section, i) => (
      <div key={i} className="flex flex-col gap-4">
        <h5 className="text-head text-lg font-semibold tracking-wide">{section.title}</h5>

        <ul className="flex flex-col gap-3">
          {section.links.map((link, idx) => (
            <li key={idx}>
              <Link
                href={link.href}
                className="text-sm text-text/70 hover:text-first flex items-center gap-2 transition-all duration-300"
              >
                <PiGreaterThanBold className="text-xs" /> {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ))}

    {/* Contact */}
    <div className="flex flex-col gap-4">
      <h5 className="text-head text-lg font-semibold tracking-wide">Contact Us</h5>

      <ul className="flex flex-col gap-3 text-sm text-text/70">
        <li className="flex items-center gap-2"><FaHome size={16} /> 21-B, Model Town, Sonipat</li>
        <li className="flex items-center gap-2"><FaPhone size={16} /> +91 98765 43210</li>
        <li className="flex items-center gap-2"><GoClock size={16} /> Mon–Sat: 9AM - 7PM</li>
        <li className="flex items-center gap-2"><MdOutlineEmail size={16} /> support@drybasket.in</li>
      </ul>
      <Link
      href={`${ROUTES.CONTACT}`}
        className="
          mt-4 bg-first text-body px-5 py-2 rounded-lg 
          font-semibold cursor-pointer
          hover:bg-head transition-all duration-300
        "
      >
        Contact Now
      </Link>
    </div>
  </div>

  {/* Bottom */}
  <div className="border-t border-border/40 pt-4 flex flex-col md:flex-row justify-between items-center px-6 md:px-12 gap-4">
    
    <p className="text-text/60 text-sm text-center md:text-left">
      © 2025 S.R. Tech Solutions. All Rights Reserved.
    </p>

    <div className="flex gap-5 items-center text-text/70">
      <FaLinkedin className="hover:text-first transition-colors duration-300" size={20} />
      <FaFacebook className="hover:text-first transition-colors duration-300" size={20} />
      <FaInstagram className="hover:text-first transition-colors duration-300" size={20} />
      <FaTwitter className="hover:text-first transition-colors duration-300" size={20} />
    </div>

  </div>
</footer>



  );
};

export default Footer;
