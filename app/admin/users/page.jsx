"use client";
import React, { useState } from "react";
import SideBar from "@components/sidebar";

const Users = () => {
   const [expandedRow, setExpandedRow] = useState(null);
   const users = [
      {
         id: 1,
         name: "جون دو",
         email: "johndoe@example.com",
         number: "123-456-7890",
         orders: [
            {
               id: 1,
               name: "الطلب 1",
               type: "النوع 1",
               date: "2022-01-01",
               price: 100,
            },
            {
               id: 2,
               name: "الطلب 2",
               type: "النوع 2",
               date: "2022-01-02",
               price: 200,
            },
         ],
      },
      {
         id: 2,
         name: "جين دو",
         email: "janedoe@example.com",
         number: "987-654-3210",
         orders: [
            {
               id: 3,
               name: "الطلب 3",
               type: "النوع 3",
               date: "2022-01-03",
               price: 300,
            },
            {
               id: 4,
               name: "الطلب 4",
               type: "النوع 4",
               date: "2022-01-04",
               price: 400,
            },
         ],
      },
   ];

   const handleRowClick = (id) => {
      if (expandedRow === id) {
         setExpandedRow(null);
      } else {
         setExpandedRow(id);
      }
   };

   return (
      <div className="flex md:flex-row ">
         <SideBar />
         <div className="flex-grow p-4">
            <table className="table-auto w-full">
               <thead>
                  <tr>
                     <th className="px-4 py-2">الاسم</th>
                     <th className="px-4 py-2">البريد الإلكتروني</th>
                     <th className="px-4 py-2">رقم الهاتف</th>
                     <th className="px-4 py-2">الطلبات</th>
                  </tr>
               </thead>
               <tbody>
                  {users.map((user) => (
                     <React.Fragment key={user.id} id={user.id}>
                        <tr
                           className={`border-b border-gray-200 cursor-pointer ${
                              expandedRow === user.id
                                 ? "bg-sky-200 font-bold "
                                 : ""
                           }`}
                           onClick={() => handleRowClick(user.id)}
                        >
                           <td className="px-4 py-2">{user.name}</td>
                           <td className="px-4 py-2">{user.email}</td>
                           <td className="px-4 py-2">{user.number}</td>
                           <td className="px-4 py-2">
                              <button
                                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                 onClick={() => handleRowClick(user.id)}
                              >
                                 عرض الطلبات لـ {user.name}
                              </button>
                           </td>
                        </tr>
                        {expandedRow === user.id && (
                           <tr>
                              <td colSpan="4">
                                 <table className="table-auto w-full">
                                    <thead>
                                       <tr>
                                          <th className="px-4 py-2">الاسم</th>
                                          <th className="px-4 py-2">النوع</th>
                                          <th className="px-4 py-2">التاريخ</th>
                                          <th className="px-4 py-2">السعر</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {user.orders.map((order) => (
                                          <tr key={order.id}>
                                             <td className="px-4 py-2">
                                                {order.name}
                                             </td>
                                             <td className="px-4 py-2">
                                                {order.type}
                                             </td>
                                             <td className="px-4 py-2">
                                                {order.date}
                                             </td>
                                             <td className="px-4 py-2">
                                                {order.price}
                                             </td>
                                          </tr>
                                       ))}
                                    </tbody>
                                 </table>
                              </td>
                           </tr>
                        )}
                     </React.Fragment>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
   );
};

export default Users;
