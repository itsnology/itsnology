"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "./skeleton";

const MenuService = ({ categoryData }) => {
   const [isLoading, setIsLoading] = useState(false);

   return (
      <div className=" mb-16">
         <h1
            className="text-4xl font-bold  mt-16 mb-4 text-center gradientx h-14"
            id="menu"
         >
            الخدمات الاكثر طلبا
         </h1>

         {isLoading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
               {[...Array(4)].map((_, index) => (
                  <div className="h-screen" key={index}>
                     <Skeleton />
                  </div>
               ))}
            </div>
         ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
               {categoryData.map((category) => (
                  <div
                     className="flex flex-col items-center justify-between h-full p-4 rounded-lg shadow-lg bg-white hover:shadow-2xl  "
                     key={category._id}
                  >
                     <Link
                        href={
                           category.isSocialMedia
                              ? `/social-media/${category.name}?id=${category._id}`
                              : `/service/${category.name}?id=${category._id}`
                        }
                     >
                        <div
                           style={{
                              backgroundImage: `url(/uploads/${category.bannerFile})`,
                              height: "355px",
                              width: "255px",
                              backgroundSize: "cover",
                              borderRadius: "10px",
                           }}
                           className="rounded-lg hover:scale-110 transition-all"
                        ></div>
                     </Link>
                     <button className=" py-2 px-8 sm:px-6 mt-4 text-white gradientbg rounded-full hover:bg-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                        <Link
                           href={
                              category.isSocialMedia
                                 ? `/social-media/${category.name}?id=${category._id}`
                                 : `/service/${category.name}?id=${category._id}`
                           }
                        >
                           أطلب الآن
                        </Link>
                     </button>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default MenuService;
