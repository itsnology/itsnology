import React from "react";
import Image from "next/image";
import ratingclients from "@pics/icons/ratingclients.png";
import nclients from "@pics/icons/nclients.png";
import norders from "@pics/icons/norders.png";
import ordersbg from "@public/ordersbg.png";

const FirstPage2 = () => {
   return (
      <>
         <div
            className="w-full py-6 grid grid-cols-3 text-center"
            style={{
               backgroundImage: `url(${ordersbg.src})`,
               backgroundSize: "cover",
               backgroundPosition: "center",
            }}
         >
            <div className=" flex flex-col items-center ">
               <Image src={ratingclients} alt="ratingclients" />
               <h1 className="text-white md:text-xl   text-sm  font-semibold mt-4 mb-4">
                  نسبة الرضا عن خدماتنا
               </h1>

               <h1 className="text-white md:text-xl  text-sm font-semibold">
                  +90%
               </h1>
            </div>
            <div className=" flex flex-col items-center">
               <Image src={nclients} alt="nclients" />
               <h1 className="text-white md:text-xl  text-sm font-semibold mt-4 mb-4">
                  عدد العملاء الذين ثقوا بنا
               </h1>

               <h1 className="text-white md:text-xl  text-sm font-semibold">
                  1000
               </h1>
            </div>
            <div className=" flex flex-col items-center">
               <Image src={norders} alt="n orders" />
               <h1 className="text-white md:text-xl  text-sm font-semibold mt-4 mb-4">
                  عدد الطلبات التي تم تنفيذها
               </h1>

               <h1 className="text-white md:text-xl  text-sm font-semibold">
                  10000
               </h1>
            </div>
         </div>
      </>
   );
};

export default FirstPage2;
