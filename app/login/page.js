"use client";

import Link from "next/link";
import styles from "@styles/Form.module.css";
import Image from "next/image";
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from "react";
import { signIn, signOut } from "next-auth/react";
import { useFormik } from "formik";
import login_validate from "@lib/validate";
import { useRouter } from "next/navigation";

export default function Login() {
   const [show, setShow] = useState(false);
   const router = useRouter();
   // formik hook
   const formik = useFormik({
      initialValues: {
         email: "",
         password: "",
      },
      validate: login_validate,
      onSubmit,
   });

   /**
    * haleykennedy@gmail.com
    * admin123
    */

   async function onSubmit(values) {
      const status = await signIn("credentials", {
         redirect: false,
         email: values.email,
         password: values.password,
         callbackUrl: "/",
      });

      if (status.ok) router.push(status.url);
   }

   return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2 fontgl">
         <h1
            className="text-4xl font-bold  mt-16 mb-4 text-center text-blue-500"
            id="menu"
         >
            قم بتسجيل الدخول وانضم الى عائلتنا{" "}
         </h1>

         {/* form */}
         <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full sm:w-3/4"
            onSubmit={formik.handleSubmit}
         >
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
                  placeholder=" البريد الإلكتروني
                     "
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
            </label>
            <div
               className={`${styles.input_group} ${
                  formik.errors.password && formik.touched.password
                     ? "border-rose-600"
                     : ""
               }`}
            >
               <input
                  type={`${show ? "text" : "password"}`}
                  name="password"
                  placeholder="كلمة المرور
                     "
                  className={styles.input_text}
                  {...formik.getFieldProps("password")}
               />
               <span
                  className="icon flex items-center px-4"
                  onClick={() => setShow(!show)}
               >
                  <HiFingerPrint size={25} />
               </span>
            </div>

            {formik.errors.password && formik.touched.password ? (
               <span className="text-rose-500">{formik.errors.password}</span>
            ) : (
               <></>
            )}
            {/* login buttons */}
            <div className="input-button mt-8">
               <button type="submit" className={styles.button}>
                  تسجيل
               </button>
            </div>
         </form>

         {/* bottom */}
         <p className="text-center text-gray-400 ">
            ليس لديك حساب؟{" "}
            <Link href={"/signup"}>
               <span className="text-blue-700">سجل الان</span>
            </Link>
         </p>
      </div>
   );
}
