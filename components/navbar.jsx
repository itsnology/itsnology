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
      const user = window.sessionStorage.getItem("Token");
      setToken(user);
      console.log(user);
   }, []);

   const signOut = () => {
      sessionStorage.removeItem("Token");
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
                     document
                        .getElementById("loginpage")
                        .classList.remove("hidden");
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
      const token = JSON.parse(localStorage.getItem("token"));
      setToken(token);
   }, []);

   const [categoryData, setCategoryData] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [isFocused, setIsFocused] = useState(false);

   const fetchCategories = async () => {
      try {
         const response = await fetch("/api/category", { cach: "no-store" });
         if (response.ok) {
            const data = await response.json();

            setCategoryData(data); // Assuming the response has a "categories" field
         } else {
            console.error("Failed to fetch categories");
         }
      } catch (error) {
         console.error("Error fetching categories:", error);
      }
   };

   // Call fetchCategories when your component mounts
   useEffect(() => {
      fetchCategories();
   }, []);

   const filteredCategories = categoryData.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
   );

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
                           id="search"
                           type="text"
                           placeholder="البحث عن..."
                           className="px-2 py-2 text-gray-500 bg-transparent rounded-md outline-none"
                           value={searchTerm}
                           onChange={(e) => setSearchTerm(e.target.value)}
                           autoComplete="off"
                           onFocus={() => setIsFocused(true)}
                        />
                     </div>
                     {isFocused && filteredCategories.length > 0 && (
                        <div className="absolute z-10 bg-white  mt-1 rounded-md shadow-lg w-2/4">
                           {filteredCategories.map((category) => (
                              <Link
                                 key={category._id}
                                 href={
                                    category.isSocialMedia
                                       ? `/social-media/${category.name}?id=${category._id}`
                                       : `/service/${category.name}?id=${category._id}`
                                 }
                                 className="block px-4 py-2 text-gray-800 hover:bg-gray-100  w-full"
                              >
                                 {category.name}
                              </Link>
                           ))}
                        </div>
                     )}
                  </form>

                  <AvatarMenu token={token} />
               </ul>
            </div>
         </div>
         <nav className="border-b">
            <ul className="flex items-center gap-x-3 max-w-screen-xl mx-auto px-4 overflow-x-auto lg:px-8">
               <li className="w-fit text-sky-500 border-sky-600">
                  <Link
                     href="/"
                     className="block  whitespace-nowrap py-2 px-3 rounded-lg text-gray-700 hover:text-sky-500 focus:text-sky-500 duration-150 "
                  >
                     الرئيسية
                  </Link>
               </li>
               {categoryData.map((item, idx) => (
                  <li key={idx} className={`py-2`}>
                     <Link
                        href={
                           item.isSocialMedia
                              ? `/social-media/${item.name}?id=${item._id}`
                              : `/service/${item.name}?id=${item._id}`
                        }
                        className={`block  whitespace-nowrap py-2 px-3 rounded-lg text-gray-700 hover:text-sky-500 focus:text-sky-500 duration-150 `}
                     >
                        {item.name}
                     </Link>
                  </li>
               ))}
            </ul>
         </nav>
      </header>
   );
};

export default Navbar;
