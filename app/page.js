import Image from "next/image";

import Navbar from "@components/navbar";
import Slider from "@components/slider";
import FirstPage2 from "@components/firstpage2";
import MenuService from "@components/menuservices";
import Rating from "@components/rating";
import SmallServices from "@components/smallservices";
import SeconDisc from "@components/seconDisc";
import FirstDiscedit from "@components/firstDiscedit";
import Popup from "@components/popup";
import Login from "@components/login";
export default function Home() {
   return (
      <main className=" ">
         <Navbar />
         <Slider />
         <Popup />
         <Login />
         <SeconDisc />
         <FirstPage2 />
         <SmallServices />
         <MenuService />
         <FirstDiscedit />
         <Rating />
      </main>
   );
}
