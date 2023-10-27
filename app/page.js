import Image from "next/image";
import FirstPage2 from "@components/firstpage2";
import MenuService from "@components/menuservices";
import Rating from "@components/rating";
export default function Home() {
   return (
      <main className=" ">
         <FirstPage2 />
         <MenuService />
         <Rating />
      </main>
   );
}
