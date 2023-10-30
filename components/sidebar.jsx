"use client";
import { useEffect, useRef, useState } from "react";
import { IconUpload } from "@tabler/icons-react";
import { IconUsers } from "@tabler/icons-react";
import { IconPackage } from "@tabler/icons-react";
import { IconStars } from "@tabler/icons-react";
import { IconLayoutDashboard } from "@tabler/icons-react";

const Menu = (props) => {
  const { children, items } = props;
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="">
      <button
        className="w-full flex items-center justify-between text-gray-600 p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 duration-150"
        onClick={() => setIsOpened(!isOpened)}
      >
        <div className="flex items-center gap-x-2">{children}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`w-5 h-5 duration-150 ${isOpened ? "rotate-180" : ""}`}
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
              <a
                href={item.href}
                className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 duration-150"
              >
                {item.icon ? (
                  <div className="text-gray-500">{item.icon}</div>
                ) : (
                  ""
                )}
                {item.name}
              </a>
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
      name: "Users",
      icon: <IconUsers className="w-5 h-5" />,
    },
    {
      href: "javascript:void(0)",
      name: "Orders",
      icon: <IconPackage className="w-5 h-5" />,
    },
    {
      href: "javascript:void(0)",
      name: "Reviews",
      icon: <IconStars className="w-5 h-5" />,
    },
  ];

  const nestedNav = [
    { name: "Category", href: "javascript:void(0)", icon: "" },
    { name: "Product", href: "javascript:void(0)", icon: "" },
    { name: "Codes", href: "javascript:void(0)", icon: "" },
    { name: "Slider Image", href: "javascript:void(0)", icon: "" },
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
      className={`fixed top-0 bg-slate-50 right-0 w-full lg:h-full border-l space-y-8 transition-all duration-300 ${
        isSidebarOpen
          ? "sm:w-80 h-full md:w-72 lg:w-80"
          : "sm:w-20 lg:w-80 md:w-20 lg:h-full"
      }`}
    >
      <div className="flex flex-col h-full px-4">
        <div className="h-20 flex items-center pr-2">
          <div className="w-full flex items-center gap-x-4">
            <div>
              <span
                className="flex flex-row text-gray-700 text- font-semibold cursor-pointer"
                onClick={handleDashboardClick}
              >
                <IconLayoutDashboard className="me-2" />{" "}
                <p
                  className={`overflow-auto ${
                    isSidebarOpen ? "block" : "md:hidden lg:block block "
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
                <a
                  href={item.href}
                  className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg hover:bg-gray-50 active-bg-gray-100 duration-150"
                >
                  <div className="text-gray-500">{item.icon}</div>
                  {item.name}
                </a>
              </li>
            ))}
            <li>
              <Menu items={nestedNav} className="flex items-center">
                <IconUpload className="h-5 w-5" />
                Upload content
              </Menu>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
