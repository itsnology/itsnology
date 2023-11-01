"use client";
import React from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import fbcrd from "@pics/cards/fbcrd.png";

const Product = () => {
   const params = useParams();
   const data = [
      {
         name: params.name,
         image: fbcrd,
         description:
            "وصف المنتج يمكن أن يكون هنا. وصف المنتج يمكن أن يكون هنا. وصف المنتج يمكن أن يكون هنا.",
         options: [
            { name: "خيار 1", price: "10 دولار" },
            { name: "خيار 2", price: "20 دولار" },
            { name: "خيار 3", price: "30 دولار" },
         ],
      },
   ];
   return (
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between bg-white rounded-lg shadow-lg overflow-hidden p-4 sm:p-32 ">
         <div className="md:w-5/12 sm:pl-16">
            <Image src={data[0].image} alt="Product Image" width={500} />
         </div>
         <div className="p-6 md:w-7/12 ">
            <h2 className="text-4xl font-bold mb-4  text-blue-700">
               اسم المنتج
            </h2>
            <p className="text-gray-700 text-base mb-4 min-h-[11rem]  ">
               {data[0].description}
            </p>
            <form>
               <div className="mb-4">
                  <label
                     className="block text-gray-700 font-bold mb-2"
                     htmlFor="username"
                  >
                     اسم المستخدم على وسائل التواصل الاجتماعي
                  </label>
                  <input
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="username"
                     type="text"
                     placeholder="اسم المستخدم"
                  />
               </div>
               <div className="mb-4">
                  <label
                     className="block text-gray-700 font-bold mb-2"
                     htmlFor="options"
                  >
                     الخيارات
                  </label>
                  <select
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                     id="options"
                  >
                     {data[0].options.map((option, index) => (
                        <option key={index} value={option.price}>
                           {option.name} - {option.price}
                        </option>
                     ))}
                  </select>
               </div>
               <div className="flex items-center justify-center">
                  <button
                     className="py-2 px-8 sm:px-6 mt-4 text-blue-700 bg-transparent border border-blue-700 rounded-full hover:bg-blue-700 hover:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-colors duration-300"
                     type="button"
                  >
                     اشتري الآن
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default Product;
