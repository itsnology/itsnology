"use client";
import { useEffect, useRef, useState } from "react";
import { IconHome2 } from "@tabler/icons-react";
import { IconUsers } from "@tabler/icons-react";
import { IconPackage } from "@tabler/icons-react";
import { IconStars } from "@tabler/icons-react";
import { IconLayoutDashboard } from "@tabler/icons-react";
import { IconShirt } from "@tabler/icons-react";
import { IconBarcode } from "@tabler/icons-react";
import { IconCategory2 } from "@tabler/icons-react";
import Link from "next/link";

const Menu = (props) => {
   const { children, items } = props;
   const [isOpened, setIsOpened] = useState(false);

   return (
      <div className="">
         <button
            className="w-full flex items-center justify-between text-white p-2 rounded-lg hover:text-gray-700 hover:bg-gray-50 active:bg-gray-100 duration-150"
            onClick={() => setIsOpened(!isOpened)}
         >
            <div className="flex items-center gap-x-2">{children}</div>
            <svg
               xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 20 20"
               fill="currentColor"
               className={`w-5 h-5 duration-150 ${
                  isOpened ? "rotate-180" : ""
               }`}
            >
               <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
               />
            </svg>
         </button>
         {isOpened ? (
            <ul className="mx-4 px-2 border-r text-sm font-medium">
               {items.map((item, idx) => (
                  <li key={idx}>
                     {" "}
                     <Link href={`/admin/upload/${item.link}`} passHref>
                        <div className="flex items-center gap-x-2  p-2 rounded-lg text-white hover:text-gray-700 hover:bg-gray-50 active-bg-gray-100 duration-150">
                           {item.icon}
                           {item.name}
                        </div>{" "}
                     </Link>
                  </li>
               ))}
            </ul>
         ) : (
            ""
         )}
      </div>
   );
};

const Sidebar = () => {
   const navigation = [
      {
         href: "javascript:void(0)",
         link: "",
         name: "الرئيسية",
         icon: <IconHome2 className="w-5 h-5 " />,
      },
      {
         href: "javascript:void(0)",
         link: "Users",
         name: "العملاء",
         icon: <IconUsers className="w-5 h-5 " />,
      },
      {
         href: "javascript:void(0)",
         link: "Orders",
         name: "الطلبات",
         icon: <IconPackage className="w-5 h-5 " />,
      },
      {
         href: "javascript:void(0)",
         link: "Reviews",
         name: "الآراء والتقييمات",
         icon: <IconStars className="w-5 h-5" />,
      },
      {
         name: "الخدمات",
         link: "Category",
         href: "javascript:void(0)",
         icon: <IconCategory2 className="w-5 h-5" />,
      },
      {
         name: "المنتجات",
         link: "Product",
         href: "javascript:void(0)",
         icon: <IconShirt className="w-5 h-5" />,
      },
      {
         name: "الأكواد",
         link: "Codes",
         href: "javascript:void(0)",
         icon: <IconBarcode className="w-5 h-5" />,
      },
   ];

   const profileRef = useRef();
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   const handleDashboardClick = () => {
      setIsSidebarOpen(!isSidebarOpen);
   };

   useEffect(() => {
      const handleProfile = (e) => {
         if (profileRef.current && !profileRef.current.contains(e.target))
            setIsSidebarOpen(false);
      };
      document.addEventListener("click", handleProfile);
   }, []);

   return (
      <nav
         className={`fixed md:relative top-0 bg-sky-500 right-0 w-full lg:h-full border-l space-y-8 transition-all duration-300 ${
            isSidebarOpen
               ? "w-full h-96 md:h-full md:w-72 lg:w-80"
               : "w-full lg:w-80 md:w-20 lg:h-full"
         }`}
      >
         <div className="flex flex-col h-full md:h-screen px-4">
            <div className="h-20 flex items-center pr-2">
               <div className="w-full flex items-center gap-x-4">
                  <div>
                     <span
                        className="flex flex-row text-white text- font-semibold cursor-pointer"
                        onClick={handleDashboardClick}
                     >
                        <IconLayoutDashboard className="me-2" />{" "}
                        <p
                           className={` ${
                              isSidebarOpen
                                 ? "block"
                                 : "md:hidden lg:block block "
                           }`}
                        >
                           Admin Dashboard
                        </p>
                     </span>
                  </div>
                  <div className="relative flex-1 text-left"></div>
               </div>
            </div>
            <div
               className={`overflow-auto ${
                  isSidebarOpen ? "block" : "hidden lg:block  "
               }`}
            >
               <ul className="text-sm font-medium">
                  {navigation.map((item, idx) => (
                     <li key={idx}>
                        <Link href={`/admin/${item.link}`}>
                           {" "}
                           <div
                              href={item.href}
                              class="flex items-center gap-x-2  p-2 rounded-lg text-white hover:text-gray-700 hover:bg-gray-50 active-bg-gray-100 duration-150"
                           >
                              <div>{item.icon}</div>
                              {item.name}
                           </div>{" "}
                        </Link>
                     </li>
                  ))}
               </ul>
            </div>
         </div>
      </nav>
   );
};

export default Sidebar;
