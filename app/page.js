import Image from "next/image";

import Navbar from "@components/navbar";
import Slider from "@components/slider";
import FirstPage2 from "@components/firstpage2";
import MenuService from "@components/menuservices";
import Rating from "@components/rating";
import SmallServices from "@components/smallservices";

import FirstDisc from "@components/firstDisc";
import Popup from "@components/popup";
export default function Home() {
   return (
      <main className=" ">
         <Navbar />
         <Slider />
         <Popup />
         {/* <FirstDisc /> */}
         <FirstPage2 />
         <SmallServices />
         <MenuService />
         <Rating />
      </main>
   );
}
