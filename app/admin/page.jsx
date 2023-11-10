"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import pubgLogo from "@pics/icons/pubglogo.png";
import Image from "next/image";
import Adminlogin from "@components/adminlogin";
import { IconAlertTriangle } from "@tabler/icons-react";
import { IconTruckDelivery } from "@tabler/icons-react";
import SideBar from "@components/sidebar";
const PageAdmin = () => {
  const [expandedRow, setExpandedRow] = React.useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const submitLogin = async (e) => {
    setLoggedIn(true);
  };

  const [OrderData, setOrderData] = useState([]);
  const [OrderSocial, setOrderSocial] = useState([]);

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
        {loggedIn ? (
          <div className="flex md:flex-row  flex-col ">
            <div className="flex w-fit border-gray-600 border mr-20 rounded-lg ">
              <div className="flex  flex-col">
                <div className="w-full flex flex-row justify-start	bg-sky-900 rounded-t-lg  ">
                  {" "}
                  <h1 className=" text-center px-20 flex flex-row  mb-3 font-semibold text-md text-white">
                    <IconTruckDelivery className="text-white ml-3 w-5 h-5  mt-1" />{" "}
                    أحدث الطلبات
                  </h1>{" "}
                </div>
                <div className="flex-grow p-4 	">
                  <table className="table-auto  w-full">
                    <thead>
                      <tr>
                        <th className="px-4 py-2">المستخدم</th>
                        <th className="px-4 py-2">اسم المنتج</th>
                        <th className="px-4 py-2">الخدمة</th>
                        <th className="px-4 py-2">التاريخ</th>
                        <th className="px-4 py-2">السعر</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedOrders.map((order) => (
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
                            <td className="px-4 py-2">{order.username}</td>
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
                            <td className="px-4 py-2">
                              {" "}
                              {new Date(order.createdTime).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-2 font-semibold text-emerald-800	">
                              {order.price} ر.ق{" "}
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="flex-col h-fit pb4-4 justify-start w-1/3 border rounded-lg border-gray-400  mr-8 md:ml-0">
              <div className="w-full flex flex-row justify-start	bg-sky-900 rounded-t-lg  ">
                {" "}
                <h1 className=" text-center px-20 flex flex-row  mb-3 font-semibold text-md text-white">
                  <IconAlertTriangle className="text-white ml-3 w-5 h-5  mt-1" />{" "}
                  منتجات نفذت
                </h1>{" "}
              </div>

              <div className="border-gray-600 justify-start	 flex bg-gray-100 opacity-85	 px-4 w-full">
                {filteredProducts.map((item) => (
                  <div className="flex   row mb-3" key={item.id}>
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
                        <h2 className="font-semibold text-lg ml-2 text-red-600">
                          {item.categoryName} :
                        </h2>
                        <h2 className="font-semibold text-md text-red-600">
                          {item.name}
                        </h2>
                      </div>
                      <p className=" text-xs font-semibold	text-gray-500">
                        {" "}
                        {item.price}ر.ق
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Adminlogin login={submitLogin} />
        )}
      </div>
    </div>
  );
};

export default PageAdmin;
