import React from "react";
import Image from "next/image";
import star from "@pics/icons/star.png";
import enterdata from "@pics/icons/enterdata.png";
import bankcard from "@pics/icons/bankcard.png";

const FirstDiscedit = () => {
   const services = [
      { name: "استلم طلبك ", image: star },
      { name: "اختر طريقة الدفع ", image: bankcard },
      { name: "ضع البيانات اللازمة ", image: enterdata },
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

export default FirstDiscedit;
