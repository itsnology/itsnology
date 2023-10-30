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
