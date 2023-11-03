"use client";
import React, { useState } from "react";
import Link from "next/link";
import SideBar from "@components/sidebar";

const Orders = () => {
   const [expandedRow, setExpandedRow] = useState(null);

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
         id: 3,
         userId: 2,
         productName: "منتج 3",
         date: "2022-01-03",
         time: "12:00 PM",
         price: 300,
         serviceName: "خدمة 3",
         userName: "جين دو",
         category: "cards",
         done: true,
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

   const [Orders, setOreders] = useState(orders);

   const users = [
      {
         id: 1,
         name: "جون دو",
         email: "johndoe@example.com",
         number: "123-456-7890",
      },
      {
         id: 2,
         name: "جين دو",
         email: "janedoe@example.com",
         number: "987-654-3210",
      },
   ];

   const handleRowClick = (id) => {
      if (expandedRow === id) {
         setExpandedRow(null);
      } else {
         setExpandedRow(id);
      }
   };

   const handleCheckboxClick = (e, id) => {
      e.stopPropagation();
      const updatedOrders = orders.map((order) => {
         if (order.id === id) {
            return {
               ...order,
               done: !order.done,
            };
         }
         return order;
      });

      setOreders(updatedOrders);
   };

   return (
      <div className="flex md:flex-row ">
         <SideBar />
         <div className="flex-grow p-4">
            <table className="table-auto w-full">
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
                              order.category === "cards" ? "bg-rose-200" : ""
                           }`}
                           onClick={() => handleRowClick(order.id)}
                        >
                           <td className="px-4 py-2">
                              <Link
                                 href={`#${order.userId}`}
                                 className="text-blue-500 hover:underline"
                              >
                                 {order.userName}
                              </Link>
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
                              <Link href={`/services/${order.productName}`}>
                                 {order.productName}
                              </Link>
                           </td>
                           <td className="px-4 py-2">{order.date}</td>
                           <td className="px-4 py-2">{order.time}</td>
                           <td className="px-4 py-2">{order.price}</td>
                           {order.category !== "cards" && (
                              <td className="px-4 py-2">
                                 <input
                                    type="checkbox"
                                    checked={order.done}
                                    onChange={(e) =>
                                       handleCheckboxClick(e, order.id)
                                    }
                                 />
                              </td>
                           )}
                        </tr>
                     </React.Fragment>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default Orders;
