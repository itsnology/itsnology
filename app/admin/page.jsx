"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import pubgLogo from "@pics/icons/pubglogo.png";
import Image from "next/image";

import SideBar from "@components/sidebar";
const page = () => {
   const [expandedRow, setExpandedRow] = React.useState(null);

   const orders = [
      {
         id: 1,
         userId: 1,
         productName: "منتج 1",
         date: "2022-01-01",
         time: "10:00 AM",
         price: 100,
         serviceName: "خدمة 1",
         userName: "جون دو",
         category: "cards",
         done: false,
      },
      {
         id: 2,
         userId: 1,
         productName: "منتج 2",
         date: "2022-01-02",
         time: "11:00 AM",
         price: 200,
         serviceName: "خدمة 2",
         userName: "جون دو",
         category: "list",
         done: false,
      },

      {
         id: 4,
         userId: 2,
         productName: "منتج 4",
         date: "2022-01-04",
         time: "01:00 PM",
         price: 400,
         serviceName: "خدمة 4",
         userName: "جين دو",
         category: "list",
         done: false,
      },
   ].sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateB - dateA;
   });

   const [filteredProducts, setFilteredProducts] = React.useState([]);
   console.log(filteredProducts);

   React.useEffect(() => {
      // Fetch card products with no cardCodes from the API
      fetch("/api/EndedProducts")
         .then((response) => response.json())
         .then((data) => {
            setFilteredProducts(data);
         })
         .catch((error) => {
            console.error("Error fetching card products:", error);
         });
   }, []);

   return (
      <div className="flex md:flex-row ">
         <SideBar />
         <div className="flex w-full flex-col">
            <div className="justify-center flex lg:mt-16 md:mt-16 mb-20 mt-20 ">
               <p className="md:text-6xl text-xl text-center font-semibold text-sky-950">
                  الصفحة الرئيسية{" "}
               </p>
            </div>
            <div className="flex md:flex-row flex-col ">
               <div className="flex">
                  <div className="flex flex-col">
                     <h1 className="font-semibold text-center text-gray-900">
                        lastest orders{" "}
                     </h1>
                     <div className="flex-grow p-4 	">
                        <table className="table-auto border-gray-600 border-dashed border-2 w-full">
                           <thead>
                              <tr>
                                 <th className="px-4 py-2">المستخدم</th>
                                 <th className="px-4 py-2">اسم المنتج</th>
                                 <th className="px-4 py-2">الخدمة</th>
                                 <th className="px-4 py-2">التاريخ</th>
                                 <th className="px-4 py-2">الوقت</th>
                                 <th className="px-4 py-2">السعر</th>
                              </tr>
                           </thead>
                           <tbody>
                              {orders.map((order) => (
                                 <React.Fragment key={order.id}>
                                    <tr
                                       className={`border-b border-gray-200 cursor-pointer ${
                                          expandedRow === order.id
                                             ? "bg-sky-200 font-bold "
                                             : ""
                                       } ${order.done ? "bg-blue-200" : ""} ${
                                          order.category === "cards"
                                             ? "bg-rose-200"
                                             : ""
                                       }`}
                                       onClick={() => handleRowClick(order.id)}
                                    >
                                       <td className="px-4 py-2">
                                          {order.userName}
                                       </td>
                                       <td className="px-4 py-2">
                                          <Link
                                             href={`/services/${order.productName}`}
                                             className="text-blue-500 hover:underline"
                                          >
                                             {order.productName}
                                          </Link>
                                       </td>
                                       <td className="px-4 py-2">
                                          <Link
                                             href={`/services/${order.productName}`}
                                          >
                                             {order.productName}
                                          </Link>
                                       </td>
                                       <td className="px-4 py-2">
                                          {order.date}
                                       </td>
                                       <td className="px-4 py-2">
                                          {order.time}
                                       </td>
                                       <td className="px-4 py-2">
                                          {order.price}
                                       </td>
                                    </tr>
                                 </React.Fragment>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
               <div className="flex-col mr-40 md:ml-0">
                  <h1 className="font-semibold text-center mb-3 text-gray-900">
                     Ended Products{" "}
                  </h1>
                  <div className="border-gray-600  border-dashed border-2 px-4 w-full">
                     {filteredProducts.map((item) => (
                        <div className="flex row mb-3" key={item.id}>
                           {" "}
                           <div
                              style={{
                                 backgroundImage: `url(/uploads/${item.image})`,
                                 margin: "8px 0 0 0",
                                 height: "55px",
                                 width: "55px",
                                 backgroundSize: "cover",
                                 borderRadius: "10px",
                              }}
                              className="rounded-lg hover:scale-110 transition-all"
                           ></div>
                           <div className="flex-col mr-2">
                              <div className="flex flex-row items-center">
                                 <h2 className="font-semibold text-lg ml-2 text-cyan-900">
                                    {item.categoryName} :
                                 </h2>
                                 <h2 className="font-semibold text-md text-red-600">
                                    {item.name}
                                 </h2>
                              </div>
                              <p className=" text-xs font-semibold	text-gray-500">
                                 {" "}
                                 {item.price}$
                              </p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default page;
