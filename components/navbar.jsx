"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Logo from "@pics/icons/Logo.png";
// Avtar with darpdown menu
const AvatarMenue = () => {
  const [state, setState] = useState(false);
  const profileRef = useRef();

  const navigation = [
    { title: "لوحة التجكم", path: "javascript:void(0)" },
    { title: "التحليلات", path: "javascript:void(0)" },
    { title: "الملف الشخصي", path: "javascript:void(0)" },
    { title: "الاعدادات", path: "javascript:void(0)" },
  ];

  useEffect(() => {
    const handleDropDown = (e) => {
      if (!profileRef.current.contains(e.target)) setState(false);
    };
    document.addEventListener("click", handleDropDown);
  }, []);

  return (
    <div className="relative border-t lg:border-none">
      <div className="">
        <button
          ref={profileRef}
          className="hidden w-fit bg-sky-500 px-4 py-1 text-gray-100 h-10 outline-none rounded-full  lg:block"
          onClick={() => setState(!state)}
        >
          تسجيل الدخول
        </button>
      </div>
    </div>
  );
};

export default () => {
  const [state, setState] = useState(false);

  // Replace javascript:void(0) paths with your paths

  const submenuNav = [
    { title: "الرئيسية", path: "javascript:void(0)" },
    { title: "خدمات انستغرام", path: "javascript:void(0)" },
    { title: "خدمات تويتر", path: "javascript:void(0)" },
    { title: "خدمات يوتيوب", path: "javascript:void(0)" },
    { title: "خدمات تيك توك", path: "javascript:void(0)" },
    { title: "خدمات فيسبوك", path: "javascript:void(0)" },
    { title: "تويتش", path: "javascript:void(0)" },
    { title: "شدات ببجي", path: "javascript:void(0)" },
  ];

  return (
    <header className="text-base lg:text-sm">
      <div
        className={`bg-white items-center gap-x-14 px-4 max-w-screen-xl mx-auto md:px-8 lg:flex lg:static ${
          state ? "h-full fixed inset-x-0" : ""
        }`}
      >
        <div className="flex items-center justify-between py-3 lg:py-5 lg:block">
          <a href="javascript:void(0)">
            <Image src={Logo} width={220} height={60} alt="logo" />
          </a>
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
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
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
          className={`nav-menu flex-1 pb-28 mt-8 overflow-y-auto max-h-screen lg:block lg:overflow-visible lg:pb-0 lg:mt-0 ${
            state ? "" : "hidden"
          }`}
        >
          <ul className="items-center space-y-6 lg:flex lg:space-x-6 lg:space-x-reverse lg:space-y-0">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex-1 items-center justify-start pb-4 lg:flex lg:pb-0"
            >
              <div
                className="flex items-center gap-1 px-2 border rounded-full

"
              >
                <input
                  type="text"
                  placeholder="البحث عن..."
                  className="w-full px-2 py-2 text-gray-500 bg-transparent rounded-md outline-none"
                />
              </div>
            </form>

            <AvatarMenue />
          </ul>
        </div>
      </div>
      <nav className="border-b">
        <ul className="flex items-center gap-x-3 max-w-screen-xl mx-auto px-4 overflow-x-auto lg:px-8">
          {submenuNav.map((item, idx) => {
            return (
              // Replace [idx == 0] with [window.location.pathname == item.path]
              <li
                key={idx}
                className={`py-1 ${
                  idx == 0 ? "border-b-2 border-sky-600 " : ""
                }`}
              >
                <a
                  href={item.path}
                  className="block py-2 px-3 rounded-lg text-gray-700 hover:text-sky-500 focus:text-sky-500 hover:bg-gray-100 duration-150"
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};
