"use client";
import { useState } from "react";
import { Fragment } from "react";
import Logo from "@pics/icons/Logo.png";
import Image from "next/image";
import Link from "next/link";
import { useFormik } from "formik";
import styles from "@styles/Form.module.css";
import { registerValidate } from "@lib/validate";
import { HiAtSymbol } from "react-icons/hi";
import { FaTimes, FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Login = () => {
   const [otpSent, setOtpSent] = useState(false);
   const [email, setEmail] = useState("");
   const [otp, setOtp] = useState("");
   const [verificationResult, setVerificationResult] = useState("");

   const router = useRouter();

   const formik = useFormik({
      initialValues: {
         email: "",
      },
      validate: registerValidate,
   });

   const handleEmailSubmit = async (e) => {
      e.preventDefault();

      // Generate a random OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000);

      // Save the generated OTP to local storage
      localStorage.setItem("otp", generatedOtp);

      const response = await fetch("/api/sendOtp", {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ email, generatedOtp }), // Send email as JSON string
      });

      if (response.ok) {
         setOtpSent(true);
      } else {
         console.error("Failed to send email");
      }
   };

   const handleVerifyOtp = () => {
      // Retrieve the stored OTP from local storage
      const storedOtp = localStorage.getItem("otp");

      if (otp === storedOtp) {
         router.push("/register");
      } else {
         setVerificationResult("Incorrect OTP");
      }
   };

   return (
      <Fragment>
         <div
            className="fixed inset-0 bg-gray-300 bg-opacity-50 backdrop-filter backdrop-blur-sm z-50  items-center justify-center h-screen overflow-hidden hidden"
            id="loginpage"
         >
            {otpSent ? (
               <div className="flex flex-col p-5 w-full max-w-lg transition-all transform bg-white rounded-3xl shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                     <button
                        onClick={() =>
                           document
                              .getElementById("loginpage")
                              .classList.add("hidden")
                        }
                     >
                        <FaTimes className="text-2xl text-gray-500 hover:text-gray-700 cursor-pointer" />
                     </button>
                     <button
                        onClick={() =>
                           document
                              .getElementById("loginpage")
                              .classList.add("hidden")
                        }
                     >
                        <FaArrowLeft className="text-2xl text-gray-500 hover:text-gray-700 cursor-pointer" />
                     </button>
                  </div>

                  <div className="flex items-center justify-center mb-2">
                     <Link href={"/"}>
                        <Image src={Logo} alt="logo" />
                     </Link>
                  </div>
                  <h1
                     className="text-4xl font-bold mb-4 text-center text-blue-500"
                     id="menu"
                  >
                     OTP Verification
                  </h1>
                  <div className="flex flex-col items-center justify-center">
                     <p className="text-center mb-4">
                        تم إرسال رمز OTP إلى بريدك الإلكتروني. تحقق من صندوق
                        الوارد الخاص بك!
                     </p>
                     <div className="flex flex-col items-center justify-center">
                        <label
                           className="block text-gray-700 font-bold mb-2"
                           htmlFor="otp"
                        >
                           Enter OTP:
                        </label>
                        <div
                           className={`${styles.input_group} ${
                              verificationResult ? "border-rose-600" : ""
                           }`}
                        >
                           <input
                              type="text"
                              name="otp"
                              placeholder="Enter OTP"
                              className={`${styles.input_text} w-full`}
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                           />
                        </div>
                        {verificationResult && (
                           <p className="text-red-500 text-sm mt-2">
                              {verificationResult}
                           </p>
                        )}
                     </div>
                     <div className="flex justify-center mt-8">
                        <button
                           className={`${styles.button} bg-blue-500 hover:bg-blue-700 text-white`}
                           onClick={handleVerifyOtp}
                        >
                           Verify OTP
                        </button>
                     </div>
                  </div>
               </div>
            ) : (
               <div className="flex flex-col p-5 w-full max-w-lg transition-all transform bg-white rounded-3xl shadow-lg">
                  <div className="flex items-center justify-between mb-2">
                     <button
                        onClick={() =>
                           document
                              .getElementById("loginpage")
                              .classList.add("hidden")
                        }
                     >
                        <FaTimes className="text-2xl text-gray-500 hover:text-gray-700 cursor-pointer" />
                     </button>
                     <button
                        onClick={() =>
                           document
                              .getElementById("loginpage")
                              .classList.add("hidden")
                        }
                     >
                        <FaArrowLeft className="text-2xl text-gray-500 hover:text-gray-700 cursor-pointer" />
                     </button>
                  </div>

                  <div className="flex items-center justify-center mb-2">
                     <Link href={"/"}>
                        <Image src={Logo} alt="logo" />
                     </Link>
                  </div>
                  <h1
                     className="text-4xl font-bold mb-4 text-center text-blue-500"
                     id="menu"
                  >
                     تسجيل عضو جديد
                  </h1>
                  {/* form */}
                  <form className="" onSubmit={handleEmailSubmit} method="POST">
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
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                        />
                        <span className="icon flex items-center px-4">
                           <HiAtSymbol size={25} />
                        </span>
                     </div>

                     <button type="submit" className={`${styles.button} mt-8`}>
                        تسجيل
                     </button>
                  </form>
               </div>
            )}{" "}
         </div>
      </Fragment>
   );
};

export default Login;
