"use client";
import React, { useState, useEffect } from "react";
import SideBar from "@components/sidebar";
import Adminlogin from "@components/adminlogin";
const Users = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [UserData, setUserData] = useState([]);
  const [OrderData, setOrderData] = useState([]);
  const [OrderSocial, setOrderSocial] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const submitLogin = async (e) => {
    setLoggedIn(true);
  };
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
          // Sort the orders array of each user in descending order based on the createdTime property
          const sortedUsers = users.map((user) => {
            const sortedOrders = user.orders.sort((a, b) => {
              const aTime =
                OrderData.find((order) => order._id === a)?.createdTime ||
                OrderSocial.find((order) => order._id === a)?.createdTime;
              const bTime =
                OrderData.find((order) => order._id === b)?.createdTime ||
                OrderSocial.find((order) => order._id === b)?.createdTime;
              return new Date(bTime) - new Date(aTime);
            });
            return { ...user, orders: sortedOrders };
          });
          setUserData(sortedUsers);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [OrderData, OrderSocial]);

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
          {loggedIn ? (
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
                  <React.Fragment key={user._id} id={user._id}>
                    <tr
                      className={`border-b border-gray-200 cursor-pointer ${
                        expandedRow === user._id ? "bg-sky-200 font-bold " : ""
                      }`}
                      onClick={() => handleRowClick(user._id)}
                    >
                      <td className="px-4 py-2 text-center">{user.name}</td>
                      <td className="px-4 py-2 text-center">{user.email}</td>
                      <td className="px-4 py-2 text-center">{user.number}</td>
                      <td className="px-4 py-2 text-center">
                        <button
                          className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                          onClick={() => handleRowClick(user.id)}
                        >
                          عرض الطلبات لـ {user.name}
                        </button>
                      </td>
                    </tr>
                    {expandedRow === user._id && (
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
                                const matchingOrder =
                                  OrderData.find(
                                    (order) => order._id === userOrderID
                                  ) ||
                                  OrderSocial.find(
                                    (order) => order._id === userOrderID
                                  );
                                if (matchingOrder) {
                                  return (
                                    <tr key={matchingOrder._id}>
                                      <td className="px-4 py-2 text-center">
                                        {matchingOrder.productName}
                                      </td>
                                      <td className="px-4 py-2 text-center">
                                        {matchingOrder.categoryName}
                                      </td>
                                      <td className="px-4 py-2 text-center">
                                        {new Date(
                                          matchingOrder.createdTime
                                        ).toLocaleDateString()}
                                      </td>
                                      <td className="px-4 py-2 text-center">
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
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          ) : (
            <Adminlogin login={submitLogin} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
