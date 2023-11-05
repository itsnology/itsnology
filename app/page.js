"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Navbar from "@components/navbar";
import Slider from "@components/slider";
import FirstPage2 from "@components/firstpage2";
import MenuService from "@components/menuservices";
import Rating from "@components/rating";
import SmallServices from "@components/smallservices";
import SeconDisc from "@components/seconDisc";
import FirstDiscedit from "@components/firstDiscedit";
import Popup from "@components/popup";

import Login from "@components/login";
export default function Home() {
   //! fetch All categories

   const [categoryData, setCategoryData] = useState([]);

   const fetchCategories = async () => {
      try {
         const response = await fetch("/api/category", { cach: "no-store" });
         if (response.ok) {
            const data = await response.json();

            setCategoryData(data); // Assuming the response has a "categories" field
         } else {
            console.error("Failed to fetch categories");
         }
      } catch (error) {
         console.error("Error fetching categories:", error);
      }
   };

   // Call fetchCategories when your component mounts
   useEffect(() => {
      fetchCategories();
   }, []);

   return (
      <main className=" ">
         <Navbar />
         <Slider />
         <Popup />
         <Login />
         <SeconDisc />
         <FirstPage2 />
         <SmallServices categoryData={categoryData} />
         <MenuService categoryData={categoryData} />
         <FirstDiscedit />
         <Rating />
      </main>
   );
}
