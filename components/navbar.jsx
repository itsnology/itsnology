"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Logo from "@pics/icons/Logo.png";
import Bag from "@pics/icons/bag.png";
import Link from "next/link";

const AvatarMenu = () => {
  const [state, setState] = useState(false);
  const profileRef = useRef();
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Get data from sessionStorage
    const user = window.sessionStorage.getItem("Token"); // Replace 'your_key' with the key you used to store the data

    // Retrieve user information from session storage

    setToken(user);
    console.log(user);
  }, []);
  const signOut = () => {
    sessionStorage.removeItem("152cyx6gt1ocxsflbcans8");
    setToken(null);
  };

  useEffect(() => {
    const handleDropDown = (e) => {
      if (!profileRef.current.contains(e.target)) setState(false);
    };
    document.addEventListener("click", handleDropDown);

    return () => {
      document.removeEventListener("click", handleDropDown);
    };
  }, []);

  return (
    <div className="relative lg:border-none bg-slate-50">
      <div className="flex flex-row items-center">
        <button className="bg-blue-100 py-3 px-4 rounded-full me-4">
          <Image src={Bag} alt="image" />
        </button>
        {!token ? (
          <button
            ref={profileRef}
            className="w-fit gradientbg px-4 py-1 flex items-center text-gray-100 h-10 outline-none rounded-full lg:block"
            onClick={() => {
              document.getElementById("loginpage").classList.add("flex");
              document.getElementById("loginpage").classList.remove("hidden");
              setState(!state);
            }}
          >
            تسجيل الدخول
          </button>
        ) : (
          <button
            ref={profileRef}
            className=" px-4 py-1 flex items-center text-gray-100 h-10 outline-none rounded-full lg:block w-fit bg-[conic-gradient(at_right,_var(--tw-gradient-stops))] from-red-400 to-red-600"
            onClick={() => signOut()}
          >
            تسجيل خروج
          </button>
        )}
      </div>
    </div>
  );
};

const submenuNav = [
  { title: "الرئيسية", path: "/" },
  { title: "خدمات انستغرام", path: "/instagram-services" },
  { title: "خدمات تويتر", path: "/twitter-services" },
  { title: "خدمات يوتيوب", path: "/youtube-services" },
  { title: "خدمات تيك توك", path: "/tiktok-services" },
  { title: "خدمات فيسبوك", path: "/facebook-services" },
  { title: "تويتش", path: "/twitch-services" },
  { title: "شدات ببجي", path: "/pubg-services" },
];

const Navbar = ({ onLoginClick }) => {
  const [state, setState] = useState(false);

  const [token, setToken] = useState(null);

  useEffect(() => {
    // Perform localStorage action
    const token = JSON.parse(sessionStorage.getItem("email"));
    setToken(token);
  }, []);

  return (
    <header className="text-base lg:text-sm">
      <div
        className={`bg-slate-50 items-center gap-x-14 px-4 max-w-screen-xl mx-auto md:px-8 lg:flex lg:static`}
      >
        <div className="flex items-center justify-between pt-1 lg:block">
          <Link href="/">
            <Image src={Logo} width={220} height={60} alt="logo" />
          </Link>
          <div className="lg:hidden">
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a.75.75 0 011.414 0L10 8.586l4.293-4.293a.75.75 0 111.414 1.414L11.414 10l4.293 4.293a.75.75 0 01-1.414 1.414L10 11.414l-4.293 4.293a.75.75 0 01-1.414-1.414L8.586 10 4.293 5.707a.75.75 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm8.25 5.25a.75.75 0 01.75-.75h8.25a.75.75 0 010 1.5H12a.75.75 0 01-.75-.75z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`nav-menu flex-1 pb-4 mt-8 overflow-y-auto max-h-screen lg:block lg:overflow-visible lg:pb-0 lg:mt-0 ${
            state ? "" : "hidden"
          }`}
        >
          <ul className="items-center space-y-6 lg:flex lg:space-x-4 lg:space-x-reverse lg:space-y-0">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex-1 w-full items-center justify-start lg:me-12"
            >
              <div className="flex items-center justify-between px-2 border rounded-full">
                <input
                  type="text"
                  placeholder="البحث عن..."
                  className="px-2 py-2 text-gray-500 bg-transparent rounded-md outline-none"
                />
                <div className="flex flex-row items-center whitespace-nowrap text-gray-600 w-fit">
                  جميع الفئات
                  <button onClick={() => setState(!state)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5 text-gray-400"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l4.293-4.293a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </form>

            <AvatarMenu token={token} />
          </ul>
        </div>
      </div>
      <nav className="border-b">
        <ul className="flex items-center gap-x-3 max-w-screen-xl mx-auto px-4 overflow-x-auto lg:px-8">
          {submenuNav.map((item, idx) => (
            <li
              key={idx}
              className={`py-2 ${
                idx === 0 ? "w-fit text-sky-500 border-sky-600" : ""
              }`}
            >
              <Link
                href={item.path}
                className={`block  whitespace-nowrap py-2 px-3 rounded-lg text-gray-700 hover:text-sky-500 focus:text-sky-500 duration-150 ${
                  idx === 0
                    ? "w-fit text-sky-500 border-sky-600 underline underline-offset-8 decoration-[1.5px]"
                    : ""
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
