"use client";

import Link from "next/link";
import styles from "@styles/Form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useState } from "react";
import { useFormik } from "formik";
import { registerValidate } from "@lib/validate";
import { useRouter } from "next/navigation";
import Logo from "@pics/icons/Logo.png";

export default function Register() {
   const [show, setShow] = useState({ password: false, cpassword: false });
   const router = useRouter();
   const formik = useFormik({
      initialValues: {
         username: "",
         email: "",
         password: "",
         cpassword: "",
      },
      validate: registerValidate,
      onSubmit,
   });

   async function onSubmit(values) {
      const options = {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(values),
      };

      await fetch("/api/signup", options)
         .then((res) => res.json())
         .then((data) => {
            if (data) router.push("/");
         });
   }

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
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full sm:w-3/4"
            onSubmit={formik.handleSubmit}
         >
            {" "}
            <label
               className="block text-gray-700 font-bold mb-2"
               htmlFor="username"
            >
               الإسم بالكامل
            </label>
            <div
               className={`${styles.input_group} ${
                  formik.errors.username && formik.touched.username
                     ? "border-rose-600"
                     : ""
               }`}
            >
               <input
                  type="text"
                  name="Username"
                  placeholder="الإسم بالكامل"
                  className={styles.input_text}
                  {...formik.getFieldProps("username")}
               />
               <span className="icon flex items-center px-4">
                  <HiOutlineUser size={25} />
               </span>
            </div>
            {formik.errors.username && formik.touched.username ? (
               <span className="text-rose-500">{formik.errors.username}</span>
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
                  formik.errors.email && formik.touched.email
                     ? "border-rose-600"
                     : ""
               }`}
            >
               <input
                  type="email"
                  name="email"
                  placeholder="البريد الإلكتروني"
                  className={styles.input_text}
                  {...formik.getFieldProps("email")}
               />
               <span className="icon flex items-center px-4">
                  <HiAtSymbol size={25} />
               </span>
            </div>
            {formik.errors.email && formik.touched.email ? (
               <span className="text-rose-500">{formik.errors.email}</span>
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
                  formik.errors.password && formik.touched.password
                     ? "border-rose-600"
                     : ""
               } `}
            >
               <input
                  type={`${show.password ? "text" : "password"}`}
                  name="password"
                  placeholder="كلمة المرور"
                  className={styles.input_text}
                  {...formik.getFieldProps("password")}
               />
               <span
                  className="icon flex items-center px-4"
                  onClick={() => setShow({ ...show, password: !show.password })}
               >
                  <HiFingerPrint size={25} />
               </span>
            </div>
            {formik.errors.password && formik.touched.password ? (
               <span className="text-rose-500">{formik.errors.password}</span>
            ) : (
               <></>
            )}
            {/* {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500'>{formik.errors.cpassword}</span> : <></>} */}
            {/* login buttons */}
            <div className="input-button">
               <button type="submit" className={`${styles.button} mt-8`}>
                  تسجيل
               </button>
            </div>
         </form>

         {/* bottom */}
         <p className="text-center text-gray-400 ">
            هل لديك حساب?{" "}
            <Link href={"/login"}>
               <span className="text-blue-700">تسجيل دخول</span>
            </Link>
         </p>
      </div>
   );
}
