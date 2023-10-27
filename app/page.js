import Image from "next/image";

import Navbar from "@components/navbar";
import Slider from "@components/slider";
import FirstPage2 from "@components/firstpage2";
import MenuService from "@components/menuservices";
import Rating from "@components/rating";

import FirstDisc from "@components/firstDisc";
export default function Home() {
  return (
    <main className=" ">
      <Navbar />
      <Slider />
      <FirstDisc />
      <FirstPage2 />
      <MenuService />
         <Rating />

    </main>
  );
}
