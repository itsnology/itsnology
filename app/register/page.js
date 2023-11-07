"use client";
import RegisterForm from "@/components/RegisterForm";

import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

export default function Register() {
   const [token, setToken] = useState(null);

   useEffect(() => {
      const user = window.sessionStorage.getItem("Token");
      setToken(user);
      console.log(user);
   }, []);

   if (token) redirect("/");

   return <RegisterForm />;
}
