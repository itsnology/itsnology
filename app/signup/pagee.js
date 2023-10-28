"use client";
import { useState } from "react";

const Signup = () => {
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [otp, setOtp] = useState("");

   const handleSubmit = (e) => {
      e.preventDefault();
      // Generate random 4-digit OTP code
      const newOtp = Math.floor(1000 + Math.random() * 9000);
      setOtp(newOtp);
   };

   return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2 fontgl">
         <h1
            className="text-4xl font-bold  mt-16 mb-4 text-center text-blue-500"
            id="menu"
         >
            تسجيل عضو جديد
         </h1>
         <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
         >
            <div className="mb-4">
               <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="username"
               >
                  الإسم بالكامل
               </label>
               <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
               />
            </div>
            <div className="mb-4">
               <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="email"
               >
                  البريد الإلكتروني
               </label>
               <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
               />
            </div>
            <div className="mb-4">
               <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="password"
               >
                  كلمة المرور
               </label>
               <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
            </div>
            <div className="flex items-center justify-between">
               <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
               >
                  تسجيل
               </button>
            </div>
         </form>
         {otp && (
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
               <p className="text-gray-700 font-bold mb-2">OTP Code:</p>
               <p className="text-gray-700 font-bold text-4xl">{otp}</p>
            </div>
         )}
      </div>
   );
};

export default Signup;
