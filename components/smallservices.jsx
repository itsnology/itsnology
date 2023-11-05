"use client";
import Image from "next/image";
import { Fragment } from "react";
import Link from "next/link";
import Skeleton from "./skeleton";

const SmallServices = ({ categoryData }) => {
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
            {categoryData.map((category, index) => (
               <Fragment key={index}>
                  <div className="rounded-full rounded-br-none bg-white p-2 flex justify-between items-center  ">
                     {" "}
                     <p className="text-center  font-bold gradientx text-2xl">
                        {category.name}
                     </p>
                     <Link
                        href={
                           category.isSocialMedia
                              ? `/social-media/${category.name}?id=${category._id}`
                              : `/service/${category.name}?id=${category._id}`
                        }
                     >
                        <div
                           style={{
                              backgroundImage: `url(/uploads/${category.logoFile})`,
                              height: "50px",
                              width: "50px",
                              backgroundSize: "cover",
                              borderRadius: "50%",
                           }}
                        ></div>
                     </Link>
                  </div>
               </Fragment>
            ))}
         </div>
      </div>
   );
};

export default SmallServices;
