'use client'

import dynamic from "next/dynamic";
import Spinner from "../_components/Spinner";

const Banner = dynamic(() => import("../Components/Banner"), {
  ssr: false,
  loading: () => <Spinner />,
});


const BannnerWrapper = () => {
  return <Banner/>
}

export default BannnerWrapper