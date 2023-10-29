"use client";
import { useState } from "react";
import { IconStarFilled } from "@tabler/icons-react";
import { IconDiscountCheckFilled } from "@tabler/icons-react";
import Image from "next/image";
import securityrate from "@pics/banners/securityrate.png";

const Rating = () => {
   const [ratings, setRatings] = useState([
      {
         name: "John Doe",
         email: "johndoe@example.com",
         rating: 4,
         comment: "Great product!",
      },
      {
         name: "Jane Doe",
         email: "janedoe@example.com",
         rating: 5,
         comment: "Excellent service!",
      },
      {
         name: "Bob Smith",
         email: "bobsmith@example.com",
         rating: 3,
         comment: "Could be better.",
      },
      {
         name: "Alice Johnson",
         email: "alicejohnson@example.com",
         rating: 2,
         comment: "Not satisfied.",
      },
   ]);

   return (
      <div className="container mx-auto mt-16">
         <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-16 px-4 ">
            <div className="md:col-span-4 md:order-2 ">
               <Image src={securityrate} alt="Image" />
            </div>
            <div className="md:col-span-8 md:order-1 p-8 ">
               <h1
                  className="text-2xl font-bold  mt-4 mb-4 text-center text-blue-500"
                  id="menu"
               >
                  نوفر لك بيئة آمنة وسرية تامة{" "}
               </h1>
               <h4 className="text-lg font-semibold mb-8 text-center text-black/40">
                  لأن راحتك تهمنا، يسعدنا و يزيدنا سرورا أن نقدم لك الخدمات
                  المختلفة بكل مصداقية وآمان. شعارنا هو كسب ثقة العملاء الكرام..{" "}
               </h4>

               <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className=" flex items-center">
                     <IconDiscountCheckFilled className="w-5 h-5 text-blue-500" />
                     <h4 className="text-lg font-semibold ml-3  text-black/40">
                        نضمن لك تسليم سريع للخدمة
                     </h4>
                  </div>

                  <div className=" flex items-center">
                     <IconDiscountCheckFilled className="w-5 h-5 text-blue-500" />
                     <h4 className="text-lg font-semibold ml-3 text-black/40">
                        30 يومًا لإعادة التعبئة
                     </h4>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className=" flex items-center">
                     <IconDiscountCheckFilled className="w-5 h-5 text-blue-500" />
                     <h4 className="text-lg font-semibold ml-3  text-black/40">
                        لا توجد كلمة مرور مطلوبة{" "}
                     </h4>
                  </div>

                  <div className=" flex items-center">
                     <IconDiscountCheckFilled className="w-5 h-5 text-blue-500" />
                     <h4 className="text-lg font-semibold ml-3 text-black/40">
                        بياناتك في الموقع سرية 100%{" "}
                     </h4>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className=" flex items-center">
                     <IconDiscountCheckFilled className="w-5 h-5 text-blue-500" />
                     <h4 className="text-lg font-semibold ml-3  text-black/40">
                        24/7 الدعم الفني{" "}
                     </h4>
                  </div>

                  <div className=" flex items-center">
                     <IconDiscountCheckFilled className="w-5 h-5 text-blue-500" />
                     <h4 className="text-lg font-semibold ml-3 text-black/40">
                        ستحصل على نتائج مُرضية{" "}
                     </h4>
                  </div>
               </div>
            </div>
         </div>

         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 ">
            {ratings.map((rating, index) => (
               <div
                  key={index}
                  className="flex flex-col items-center justify-between h-full p-4 rounded-lg shadow-lg bg-white hover:shadow-2xl px-8 py-4 "
               >
                  <div className="flex items-center mb-4" dir="ltr">
                     {[...Array(rating.rating)].map((_, index) => (
                        <IconStarFilled
                           key={index}
                           className="w-5 h-5 text-blue-500"
                        />
                     ))}
                  </div>
                  <h2 className="text-lg font-medium text-gray-800">
                     {rating.name}
                  </h2>
                  <p className="text-sm text-gray-500">{rating.email}</p>
                  <p className="text-gray-700">{rating.comment}</p>
               </div>
            ))}
         </div>
         <div className="w-full bg-blue-900  text-center p-4 mt-16 text-white">
            © 2023 ITS NOLOGY. كل الحقوق محفوظة.
         </div>
      </div>
   );
};

export default Rating;
