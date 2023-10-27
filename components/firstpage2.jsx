import React from "react";
import Image from "next/image";

const FirstPage2 = () => {
   return (
      <>
         <div className="w-full py-12 grid grid-cols-3 bg-gradient-to-b from-blue-500 to-blue-700 ">
            <div className=" flex flex-col items-center">
               <Image
                  src="/pics/icons/ratingclients.png"
                  width={500}
                  height={500}
               />
               <h1 className="text-white text-4xl font-bold">
                  نسبة الرضا عن خدماتنا
               </h1>
            </div>
         </div>
      </>
   );
};

export default FirstPage2;
