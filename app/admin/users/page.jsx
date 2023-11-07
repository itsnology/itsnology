"use client";
import React, { useState, useEffect } from "react";
import SideBar from "@components/sidebar";

const Users = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [UserData, setUserData] = useState([]);

  const handleRowClick = async (id) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);

      // Fetch the order details for the selected user
      try {
        const response = await fetch(`/api/GetUser/UserInfo?userId=${id}`);
        if (response.ok) {
          const userWithOrders = await response.json();
          const updatedUserData = UserData.map((user) => {
            if (user.id === id) {
              return userWithOrders;
            }
            return user;
          });
          setUserData(updatedUserData);
        } else {
          console.error("Failed to fetch user orders");
        }
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/GetUser/UserInfo", {
          cache: "no-store",
        });
        if (response.ok) {
          const users = await response.json();
          setUserData(users);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex md:flex-row">
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
            {UserData.map((user) => (
              <div key={user.id} id={user.id}>
                <tr
                  className={`border-b border-gray-200 cursor-pointer ${
                    expandedRow === user.id ? "bg-sky-200 font-bold " : ""
                  }`}
                  onClick={() => handleRowClick(user.id)}
                >
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.number}</td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
                            <tr key={order._id}>
                              <td className="px-4 py-2">{order.name}</td>
                              <td className="px-4 py-2">
                                {order.categoryName}
                              </td>
                              <td className="px-4 py-2">{order.createdTime}</td>
                              <td className="px-4 py-2">{order.price}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </div>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
