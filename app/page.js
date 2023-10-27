import Image from "next/image";
import FirstPage2 from "@components/firstpage2";
import Navbar from "@components/navbar";

export default function Home() {
   return (
     <main className=" ">
       <Navbar />

       <FirstPage2 />
     </main>
   );
}
