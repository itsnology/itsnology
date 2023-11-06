"use client";
import { useState, useEffect } from "react";
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
import { FaRedo } from "react-icons/fa"; // Import the icon from react-icons

const Login = () => {
   const [otpSent, setOtpSent] = useState(false);
   const [email, setEmail] = useState("");
   const [otp, setOtp] = useState("");
   const [verificationResult, setVerificationResult] = useState("");
   const [showOtpInput, setShowOtpInput] = useState(false);
   const [counter, setCounter] = useState(30);

   useEffect(() => {
      let intervalId;
      if (counter > 0 && showOtpInput) {
         intervalId = setInterval(() => {
            setCounter((prevCounter) => prevCounter - 1);
         }, 1000);
      } else if (counter === 0) {
         // Delete the OTP from local storage when the counter reaches 0
         localStorage.removeItem("otp");
      }
      return () => clearInterval(intervalId);
   }, [counter, showOtpInput]);

   const handleResendOtp = async () => {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000);

      // Save the generated OTP to local storage
      localStorage.setItem("otp", generatedOtp);
      setShowOtpInput(true);
      setCounter(60);

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
      setShowOtpInput(true);
      setCounter(60);

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

   const checkuser = async () => {
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
      } else {
         router.push("/register");
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
                     رمز التحقق
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
                           ادخل الرمز
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
                        <div className="flex justify-center mt-4">
                           {counter > 0 ? (
                              <button
                                 className={`px-4 py-4 mx-4 bg-gray-500 hover:bg-gray-700 text-white cursor-not-allowed flex items-center`}
                                 disabled
                              >
                                 ({counter})
                              </button>
                           ) : (
                              <button
                                 className={`px-4 py-4 mx-4 bg-gray-500 hover:bg-gray-700 text-white flex items-center`}
                                 onClick={handleResendOtp}
                              >
                                 <FaRedo className="mr-2" />
                              </button>
                           )}

                           <button
                              className={` bg-blue-500 hover:bg-blue-700 text-white px-16 py-4`}
                              onClick={handleVerifyOtp}
                           >
                              التحقق
                           </button>
                        </div>
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
