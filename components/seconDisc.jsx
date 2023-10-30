import React from "react";
import Image from "next/image";
import fulltake from "@pics/icons/fulltkae.png";
import select from "@pics/icons/select.png";
import bankcard from "@pics/icons/bankcard.png";

const SeconDisc = () => {
   const services = [
      { name: "تسليم كود رقمي ", image: fulltake },
      { name: "اختر طريقة الدفع ", image: bankcard },
      { name: "إختار البطاقة", image: select },
   ];

   return (
      <div className="container mx-auto px-4 my-12 md:grid md:grid-cols-3 md:gap-4">
         {services.map((service, index) => (
            <div
               key={index}
               className="md:col-span-1 flex flex-col justify-center items-center"
            >
               <Image src={service.image} alt={service.name} className=" " />
               <h1 className="text-3xl font-bold  mt-4 mb-4 text-center gradientx h-14">
                  {service.name}
               </h1>
            </div>
         ))}
      </div>
   );
};

export default SeconDisc;
