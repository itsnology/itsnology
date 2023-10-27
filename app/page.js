import Image from "next/image";
import FirstPage2 from "@components/firstpage2";
import Navbar from "@components/navbar";
import Slider from "@components/slider";
export default function Home() {
  return (
    <main className=" ">
      <Navbar />
<Slider/>
      <FirstPage2 />
    </main>
  );
}
