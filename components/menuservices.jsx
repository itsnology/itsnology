"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "./skeleton";
import fbcrd from "@pics/cards/fbcrd.png";
import instacrd from "@pics/cards/instacrd.png";
import tweetercrd from "@pics/cards/tweetercrd.png";
import pubgcrd from "@pics/cards/pubgcrd.png";
import itunescrd from "@pics/cards/itunescrd.png";
import ybcrd from "@pics/cards/ybcrd.png";
import tiktokcrd from "@pics/cards/tiktokcrd.png";
import twichcrd from "@pics/cards/twichcrd.png";

const MenuService = () => {
   const [isLoading, setIsLoading] = useState(true);
   const [data, setData] = useState([]);

   useEffect(() => {
      // Simulate fetching data from an API
      setTimeout(() => {
         setData([
            {
               id: 2,
               title: "PUBG",
               image: pubgcrd,
               url: "/pubg-services",
            },
            {
               id: 3,
               title: "ITUNES",
               image: itunescrd,
               url: "/itunes-services",
            },
            {
               id: 4,
               title: "YOUTUBE",
               image: ybcrd,
               url: "/youtube-services",
            },
            {
               id: 5,
               title: "TIKTOK",
               image: tiktokcrd,
               url: "/tiktok-services",
            },
            {
               id: 6,
               title: "TWITCH",
               image: twichcrd,
               url: "/twitch-services",
            },
            {
               id: 7,
               title: "FACEBOOK",
               image: fbcrd,
               url: "/facebook-services",
            },
            {
               id: 8,
               title: "INSTAGRAM",
               image: instacrd,
               url: "/instagram-services",
            },
            {
               id: 9,
               title: "TWITTER",
               image: tweetercrd,
               url: "/twitter-services",
            },
         ]);
         setIsLoading(false);
      }, 2000);
   }, []);

   return (
      <div>
         <h1
            className="text-4xl font-bold  mt-4 mb-4 text-center text-blue-500"
            id="menu"
         >
            الخدمات التي نقدمها
         </h1>
         <h4 className="text-xl font-semibold mb-8 text-center">
            أنقر على الخدمة لتتمتع بعروضنا
         </h4>
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
               {data.map((item) => (
                  <div
                     className="flex flex-col items-center justify-between h-full p-4 rounded-lg shadow-lg bg-white hover:shadow-2xl  "
                     key={item.id}
                  >
                     <Link href={`${item.url}`}>
                        <Image
                           src={item.image}
                           className="rounded-lg hover:scale-110 transition-all"
                           alt={item.url}
                           width={255}
                           height={255}
                        />
                     </Link>
                     <button className=" py-2 px-8 sm:px-6 mt-4 text-white bg-blue-500 rounded-full hover:bg-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                        <Link href={`${item.url}`}>أطلب الآن</Link>
                     </button>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default MenuService;
