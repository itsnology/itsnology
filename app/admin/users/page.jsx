"use client";
import React, { useState, useEffect } from "react";
import SideBar from "@components/sidebar";

const Users = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [UserData, setUserData] = useState([]);
  const [OrderData, setOrderData] = useState([]);

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

  console.log(OrderData);
  console.log(UserData);
  const handleRowClick = async (id) => {
    if (expandedRow === id) {
      setExpandedRow(null);
    } else {
      setExpandedRow(id);
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

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        `/api/GetUser/GetOrder?userId=${expandedRow}`,
        {
          cache: "no-store", // Corrected typo here
        }
      );
      if (response.ok) {
        const data = await response.json();

        setOrderData(data); // Assuming the response has a "categories" field
      } else {
        console.error("Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (expandedRow) {
      fetchOrders(); // Fetch orders when expandedRow is set
    }
  }, [expandedRow]);

  return (
    <div className="flex md:flex-row">
      <SideBar />
      <div className="flex-col w-full">
        <div className="justify-center flex lg:mt-16 md:mt-16 mb-20 mt-20 ">
          <p className="md:text-6xl text-xl text-center font-semibold text-sky-950">
            إدارة العملاء{" "}
          </p>
        </div>
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
                            {user.orders.map((userOrderID) => {
                              const matchingOrder = OrderData.find(
                                (order) => order._id === userOrderID
                              );
                              if (matchingOrder) {
                                return (
                                  <tr key={matchingOrder._id}>
                                    <td className="px-4 py-2">
                                      {matchingOrder.productName}
                                    </td>
                                    <td className="px-4 py-2">
                                      {matchingOrder.categoryName}
                                    </td>
                                    <td className="px-4 py-2">
                                      {matchingOrder.createdTime}
                                    </td>
                                    <td className="px-4 py-2">
                                      {matchingOrder.price}
                                    </td>
                                  </tr>
                                );
                              }
                              return null; // Handle cases where no matching order is found
                            })}
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
    </div>
  );
};

export default Users;
