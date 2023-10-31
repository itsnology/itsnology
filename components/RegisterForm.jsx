"use client";

import Link from "next/link";
import styles from "@styles/Form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Logo from "@pics/icons/Logo.png";

export default function Register() {
   const [show, setShow] = useState({ password: false, cpassword: false });
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");

   const router = useRouter();

   const handleSubmit = async (e) => {
      e.preventDefault();

      if (!name || !email || !password) {
         setError("All fields are necessary.");
         return;
      }

      try {
         const resUserExists = await fetch("api/userExists", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
         });

         const { user } = await resUserExists.json();

         if (user) {
            setError("User already exists.");
            router.push("/");
         }

         const res = await fetch("api/register", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify({
               name,
               email,
               password,
            }),
         });

         if (res.ok) {
            const form = e.target;
            form.reset();
            router.push("/");
         } else {
            console.log("User registration failed.");
         }
      } catch (error) {
         console.log("Error during registration: ", error);
      }
   };

   return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2 fontgl">
         <div className="flex items-center justify-center mb-2">
            <Link href={"/"}>
               <Image src={Logo} alt="logo" />
            </Link>
         </div>
         <h1
            className="text-4xl font-bold   mb-4 text-center text-blue-500"
            id="menu"
         >
            تسجيل عضو جديد
         </h1>

         {/* form */}
         <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full sm:w-1/2"
            onSubmit={handleSubmit}
         >
            {" "}
            <label
               className="block text-gray-700 font-bold mb-2"
               htmlFor="name"
            >
               الإسم بالكامل
            </label>
            <div
               className={`${styles.input_group} ${
                  error && !name ? "border-rose-600" : ""
               }`}
            >
               <input
                  type="text"
                  name="name"
                  placeholder="الإسم بالكامل"
                  className={styles.input_text}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
               />
               <span className="icon flex items-center px-4">
                  <HiOutlineUser size={25} />
               </span>
            </div>
            {error && !name ? (
               <span className="text-rose-500">{error}</span>
            ) : (
               <></>
            )}
            <label
               className="block text-gray-700 font-bold mb-2"
               htmlFor="email"
            >
               البريد الإلكتروني
            </label>
            <div
               className={`${styles.input_group} ${
                  error && !email ? "border-rose-600" : ""
               }`}
            >
               <input
                  type="email"
                  name="email"
                  placeholder="البريد الإلكتروني"
                  className={styles.input_text}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
               <span className="icon flex items-center px-4">
                  <HiAtSymbol size={25} />
               </span>
            </div>
            {error && !email ? (
               <span className="text-rose-500">{error}</span>
            ) : (
               <></>
            )}
            <label
               className="block text-gray-700 font-bold mb-2"
               htmlFor="password"
            >
               كلمة المرور
            </label>{" "}
            <div
               className={`${styles.input_group} ${
                  error && !password ? "border-rose-600" : ""
               } `}
            >
               <input
                  type={`${show.password ? "text" : "password"}`}
                  name="password"
                  placeholder="كلمة المرور"
                  className={styles.input_text}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
               <span
                  className="icon flex items-center px-4"
                  onClick={() => setShow({ ...show, password: !show.password })}
               >
                  <HiFingerPrint size={25} />
               </span>
            </div>
            {error && !password ? (
               <span className="text-rose-500">{error}</span>
            ) : (
               <></>
            )}
            {/* {error && !cpassword ? <span className='text-rose-500'>{error}</span> : <></>} */}
            {/* login buttons */}
            <div className="input-button">
               <button type="submit" className={`${styles.button} mt-8`}>
                  تسجيل
               </button>
            </div>
         </form>

         {/* bottom */}
      </div>
   );
}
