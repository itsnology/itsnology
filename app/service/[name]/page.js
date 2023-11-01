"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "@components/skeleton";
import fbcrd from "@pics/cards/fbcrd.png";
import instacrd from "@pics/cards/instacrd.png";
import tweetercrd from "@pics/cards/tweetercrd.png";
import pubgcrd from "@pics/cards/pubgcrd.png";
import itunescrd from "@pics/cards/itunescrd.png";
import ybcrd from "@pics/cards/ybcrd.png";
import tiktokcrd from "@pics/cards/tiktokcrd.png";
import twichcrd from "@pics/cards/twichcrd.png";
import { useParams } from "next/navigation";

const Service = () => {
   const [isLoading, setIsLoading] = useState(true);
   const [data, setData] = useState([]);
   const params = useParams();

   useEffect(() => {
      // Simulate fetching data from an API
      setTimeout(() => {
         setData([
            {
               id: 2,
               name: "اسم الخدمة",
               title: "PUBG",
               image: pubgcrd,
               price: "10.99$",
            },
            {
               id: 3,
               name: "اسم الخدمة",
               title: "ITUNES",
               image: pubgcrd,
               price: "15.99$",
            },
            {
               id: 4,
               name: "اسم الخدمة",
               title: "YOUTUBE",
               image: pubgcrd,
               price: "20.99$",
            },
            {
               id: 5,
               name: "اسم الخدمة",
               title: "TIKTOK",
               image: pubgcrd,
               price: "25.99$",
            },
            {
               id: 6,
               name: "اسم الخدمة",
               title: "TWITCH",
               image: pubgcrd,
               price: "30.99$",
            },
            {
               id: 7,
               name: "اسم الخدمة",
               title: "FACEBOOK",
               image: pubgcrd,
               price: "35.99$",
            },
            {
               id: 8,
               name: "اسم الخدمة",
               title: "INSTAGRAM",
               image: pubgcrd,
               price: "40.99$",
            },
            {
               id: 9,
               name: "اسم الخدمة",
               title: "TWITTER",
               image: pubgcrd,
               price: "45.99$",
            },
         ]);
         setIsLoading(false);
      }, 2000);
   }, []);

   return (
      <div className=" mb-16">
         <h1
            className="text-4xl font-bold  mt-16 mb-4 text-center gradientx h-14"
            id="menu"
         >
            {params.name}
         </h1>

         {isLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4">
               {[...Array(4)].map((_, index) => (
                  <div className="h-screen" key={index}>
                     <Skeleton />
                  </div>
               ))}
            </div>
         ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 px-4">
               {data.map((item) => (
                  <div
                     className="flex flex-col  justify-between h-full p-4 rounded-lg shadow-lg bg-white hover:shadow-2xl  "
                     key={item.id}
                  >
                     <Link href={`${item.url}`}>
                        <Image
                           src={item.image}
                           className="rounded-lg hover:scale-110 transition-all"
                           alt={item.url}
                           width={200}
                           height={200}
                        />
                     </Link>
                     <h1 className="text-xl font-bold mt-4 text-blue-700">
                        {item.name}
                     </h1>

                     <h1 className="text-xl font-bold mt-4 text-green-600 ">
                        {item.price}
                     </h1>
                     <button className="py-2 px-8 sm:px-6 mt-4 text-blue-700 bg-transparent border border-blue-700 rounded-full hover:bg-blue-700 hover:text-white font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 transition-colors duration-300">
                        <Link href={`${item.url}`}>اشتري الآن</Link>
                     </button>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default Service;
