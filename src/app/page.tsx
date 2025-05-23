import Banner from "./Components/Banner";
import BestProducts from "./Components/BestProducts";
import BgFixed from "./Components/BgFixed";
import Blog from "./Components/Blog";
import Footer from "./Components/Footer";
import ListingCategory from "./Components/ListingCategory";
import Navbar from "./Components/Navbar";
import PremiumProduct from "./Components/PremiumProduct";
import Process from "./Components/Process";
import Team from "./Components/Team";

export default function Home() {
 const category1 = [
    {
      category: "Nuts",
      image: "/images/banner7.jpg",
    },
    {
      category: "almonds",
      image: "/images/category-1.jpg",
    },
    {
      category: "cashews",
      image: "/images/category-2.jpg",
    },
    {
      category: "jaggery",
      image: "/images/category-3.jpg",
    },
    {
      category: "desi ghee",
      image: "/images/category-4.jpg",
    },
  ];

  return (
    <div className="max-w-screen  min-h-screen  mx-auto w-full relative h-auto overflow-x-hidden">
     <Navbar/>
     <Banner/>
     <BestProducts/>
     <BgFixed image={'/images/banner-6.jpg'}
     title="Best Almonds"
     heading="Get 10% off On all Spicy & Herbs"
     subHeading="
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum quidem tenetur doloremque praesentium impedit alias eveniet aliquam quaerat corrupti possimus!
     
     "
     />
     <ListingCategory data={category1} drxn={false}/>
     <ListingCategory data={category1} drxn={true}/>
       <BgFixed image={'/images/banner-6.jpg'}
     title="Best Almonds"
     heading="Get 10% off On all Spicy & Herbs"
     subHeading="
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum quidem tenetur doloremque praesentium impedit alias eveniet aliquam quaerat corrupti possimus!
     
     "
     />
     <Team/>
     <Blog/>
     <PremiumProduct/>
     <Process/>
     <Footer/>
    </div>
  );
}
