import Image from "next/image";

import Navbar from "@components/navbar";
import Slider from "@components/slider";
import FirstPage2 from "@components/firstpage2";
import MenuService from "@components/menuservices";
export default function Home() {
  return (
    <main className=" ">
      <Navbar />
      <Slider />
      <FirstPage2 />
      <MenuService />
    </main>
  );
}
