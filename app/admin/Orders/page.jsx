"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import SideBar from "@components/sidebar";
import Adminlogin from "@components/adminlogin";

const Orders = () => {
   const [expandedRow, setExpandedRow] = useState(null);
   const [OrderData, setOrderData] = useState([]);
   const [OrderSocial, setOrderSocial] = useState([]);
   const [loggedIn, setLoggedIn] = useState(false);

   const submitLogin = async (e) => {
      setLoggedIn(true);
   };

   console.log(OrderSocial);

   useEffect(() => {
      const fetchOrders = async () => {
         try {
            const response = await fetch("/api/GetUser/GetOrder", {
               cache: "no-store",
            });
            if (response.ok) {
               const data = await response.json();

               setOrderData(data);
            } else {
               console.error("Failed to fetch reviews");
            }
         } catch (error) {
            console.error("Error fetching reviews:", error);
         }
      };
      fetchOrders();
   }, []);

   useEffect(() => {
      const fetchOrders = async () => {
         try {
            const response = await fetch("/api/GetUser/GetOrderSocial", {
               cache: "no-store",
            });
            if (response.ok) {
               const data = await response.json();

               setOrderSocial(data);
            } else {
               console.error("Failed to fetch reviews");
            }
         } catch (error) {
            console.error("Error fetching reviews:", error);
         }
      };
      fetchOrders();
   }, []);

   const handleRowClick = (id) => {
      if (expandedRow === id) {
         setExpandedRow(null);
      } else {
         setExpandedRow(id);
      }
   };

   const handleCheckboxClick = (e, id) => {
      e.stopPropagation();
      const updatedOrders = OrderSocial.map((order) => {
         if (order._id === id) {
            return {
               ...order,
               done: !order.done,
            };
         }
         return order;
      });

      setOrderSocial(updatedOrders);
   };

   const Orders = [...OrderData, ...OrderSocial];
   const sortedOrders = Orders.sort((a, b) => {
      const aTime =
         OrderData.find((order) => order._id === a._id)?.createdTime ||
         OrderSocial.find((order) => order._id === a._id)?.createdTime;
      const bTime =
         OrderData.find((order) => order._id === b._id)?.createdTime ||
         OrderSocial.find((order) => order._id === b._id)?.createdTime;
      return new Date(bTime) - new Date(aTime);
   });

   return (
      <div className="flex md:flex-row ">
         <SideBar />
         <div className="w-full flex-col ">
            <div className="justify-center flex lg:mt-16 md:mt-16 mb-20 mt-20 ">
               <p className="md:text-6xl text-xl text-center font-semibold text-sky-950">
                  إدارة الطلبات{" "}
               </p>
            </div>
            {loggedIn ? (
               <div className="flex-grow p-4">
                  <table className="table-auto w-full">
                     <thead>
                        <tr>
                           <th className="px-4 py-2">المستخدم</th>
                           <th className="px-4 py-2">اسم المنتج</th>
                           <th className="px-4 py-2">الخدمة</th>

                           <th className="px-4 py-2">السعر</th>
                           <th className="px-4 py-2">تاريخ الطلب</th>
                        </tr>
                     </thead>
                     <tbody>
                        {sortedOrders.map((order) => (
                           <React.Fragment key={order._id}>
                              <tr
                                 className={`border-b border-gray-200 cursor-pointer ${
                                    expandedRow === order._id
                                       ? "bg-sky-200 font-bold "
                                       : ""
                                 } ${order.done ? "bg-blue-300" : ""} ${
                                    OrderSocial.find(
                                       (o) => o?._id === order._id
                                    )
                                       ? " bg-green-200"
                                       : "bg-white"
                                 }`}
                                 onClick={() => handleRowClick(order._id)}
                              >
                                 <td className="px-4 py-2">
                                    <Link
                                       href={`#${order.userId}`}
                                       className="text-blue-500 hover:underline"
                                    >
                                       {order.username}
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
                                    <Link
                                       href={`/services/${order.productName}`}
                                    >
                                       {order.categoryName || order.linkpost}
                                    </Link>
                                 </td>

                                 <td className="px-4 py-2">{order.price}</td>
                                 <td className="px-4 py-2">
                                    {" "}
                                    {new Date(
                                       order.createdTime
                                    ).toLocaleDateString()}
                                 </td>
                                 <td className="px-4 py-2">
                                    {order.orderTime}
                                 </td>
                                 {order.category !== "cards" && (
                                    <td className="px-4 py-2">
                                       {OrderSocial.find(
                                          (o) => o?._id === order._id
                                       ) ? (
                                          <input
                                             type="checkbox"
                                             checked={order.done}
                                             onChange={(e) =>
                                                handleCheckboxClick(
                                                   e,
                                                   order._id
                                                )
                                             }
                                          />
                                       ) : (
                                          <></>
                                       )}
                                    </td>
                                 )}
                              </tr>
                           </React.Fragment>
                        ))}
                     </tbody>
                  </table>
               </div>
            ) : (
               <Adminlogin login={submitLogin} />
            )}
         </div>
      </div>
   );
};

export default Orders;
