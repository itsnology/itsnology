"use client";

import Image from "next/image";
import { Fragment } from "react";
import Link from "next/link";
import xlogo from "@pics/icons/xlogo.png";
import fblogo from "@pics/icons/fblogo.png";
import instalogo from "@pics/icons/instalogo.png";
import tiktoklogo from "@pics/icons/tiktoklogo.png";
import ytblogo from "@pics/icons/ytblogo.png";
import ituneslogo from "@pics/icons/ituneslogo.png";
import pubglogo from "@pics/icons/pubglogo.png";
import twichlogo from "@pics/icons/twichlogo.png";

const services = [
   { name: "خدمات تويتر", image: xlogo, url: "twitter" },
   { name: "خدمات فيسبوك", image: fblogo, url: "facebook" },
   { name: "خدمات إنستغرام", image: instalogo, url: "instagram" },
   { name: "خدمات تويتش", image: twichlogo, url: "twitch" },
   { name: "خدمات آيتونز", image: ituneslogo, url: "itunes" },
   { name: "خدمات ببجي", image: pubglogo, url: "pubg" },
   { name: "خدمات تيك توك", image: tiktoklogo, url: "tiktok" },
   { name: "خدمات يوتيوب", image: ytblogo, url: "youtube" },
];

const SmallServices = () => {
   return (
      <div className="container mx-auto my-16 ">
         <h1
            className="text-4xl font-bold  mt-16 mb-4 text-center gradientx h-14"
            id="menu"
         >
            الخدمات التي نقدمها
         </h1>
         <h4 className="text-xl font-semibold mb-8 text-center text-black/40">
            أنقر على الخدمة لتتمتع بعروضنا
         </h4>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4  bg-stone-300 py-16 px-8  ">
            {services.map((service, index) => (
               <Fragment key={index}>
                  <div className="rounded-full rounded-br-none bg-white p-2 flex justify-between items-center  ">
                     {" "}
                     <p className="text-center  font-bold gradientx text-2xl">
                        {service.name}
                     </p>
                     <Link href={`/services/${service.url}`}>
                        <Image
                           src={service.image}
                           alt={`${service.name} logo`}
                           width={50}
                           height={50}
                        />
                     </Link>
                  </div>
               </Fragment>
            ))}
         </div>
      </div>
   );
};

export default SmallServices;
