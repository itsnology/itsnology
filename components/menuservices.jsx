"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "./skeleton";
import fbcrd from "@pics/cards/fbcrd.png";
import instacrd from "@pics/cards/instacrd.png";
import tweetercrd from "@pics/cards/tweetercrd.png";
import pubgcrd from "@pics/cards/pubgcrd.png";
import itunescrd from "@pics/cards/itunescrd.png";
import ybcrd from "@pics/cards/ybcrd.png";
import tiktokcrd from "@pics/cards/tiktokcrd.png";
import twichcrd from "@pics/cards/twichcrd.png";
import ReviewPopUp from "./ReviewPopUp";
const MenuService = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const [isOpen, setIsOpen] = useState(false);
  const chatPopupStyle = {
    transform: isOpen ? "translateX(0)" : "translateX(100%)",
    zIndex: isOpen ? 100 : -1, // Set a high z-index value when open
  };

  useEffect(() => {
    // Simulate fetching data from an API
    setTimeout(() => {
      setData([
        {
          id: 2,
          title: "PUBG",
          image: pubgcrd,
          url: "/service/pubg",
        },
        {
          id: 3,
          title: "ITUNES",
          image: itunescrd,
          url: "/service/itunes",
        },
        {
          id: 4,
          title: "YOUTUBE",
          image: ybcrd,
          url: "/social-media/youtube",
        },
        {
          id: 5,
          title: "TIKTOK",
          image: tiktokcrd,
          url: "/social-media/tiktok",
        },
        {
          id: 6,
          title: "TWITCH",
          image: twichcrd,
          url: "/service/twitch",
        },
        {
          id: 7,
          title: "FACEBOOK",
          image: fbcrd,
          url: "/social-media/facebook",
        },
        {
          id: 8,
          title: "INSTAGRAM",
          image: instacrd,
          url: "/social-media/instagram",
        },
        {
          id: 9,
          title: "TWITTER",
          image: tweetercrd,
          url: "/social-media/twitter",
        },
      ]);
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className=" mb-16">
      <h1
        className="text-4xl font-bold  mt-16 mb-4 text-center gradientx h-14"
        id="menu"
      >
        الخدمات الاكثر طلبا
      </h1>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[...Array(4)].map((_, index) => (
            <div className="h-screen" key={index}>
              <Skeleton />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4">
          {data.map((item) => (
            <div
              className="flex flex-col items-center justify-between h-full p-4 rounded-lg shadow-lg bg-white hover:shadow-2xl z-0"
              key={item.id}
            >
              <Link href={`${item.url}`}>
                <Image
                  src={item.image}
                  className="rounded-lg hover:scale-110 transition-all"
                  alt={item.url}
                  width={255}
                  height={255}
                />
              </Link>
              <button
                onClick={togglePopup}
                // Open the review pop-up
                className=" py-2 px-8 sm:px-6 mt-4 text-white gradientbg rounded-full hover:bg-blue-700 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
              >
                أطلب الآن
              </button>
              {isOpen && (
                <ReviewPopUp onClose={togglePopup} style={chatPopupStyle} /> // Render the review pop-up
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuService;
