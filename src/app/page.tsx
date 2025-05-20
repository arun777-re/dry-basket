import Banner from "./Components/Banner";
import BestProducts from "./Components/BestProducts";
import Navbar from "./Components/Navbar";

export default function Home() {
  return (
    <div className="max-w-screen min-h-screen  mx-auto w-full relative h-auto overflow-x-hidden">
     <Navbar/>
     <Banner/>
     <BestProducts/>
    </div>
  );
}
