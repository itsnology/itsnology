"use Client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiAtSymbol } from "react-icons/hi";
import Logo from "@pics/icons/Logo.png";
import styles from "@styles/Form.module.css";

const AdminLogin = ({ login }) => {
  const [buttonClicked, setButtonClicked] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonClicked(true);
    console.log(email);
    console.log(password);
    console.log("Admin email from env:", process.env.AdminEmail);
    console.log("Admin password from env:", process.env.AdminPassword);
    if (!email || !password) {
      setError("All fields are necessary.");
      setButtonClicked(false);
      return;
    }

    try {
      // Assuming process.env.AdminEmail and process.env.AdminPassword are set correctly
      if (email == "metiriabdou@gmail.com" && password == "abdou1830") {
        login();
        // Perform your logic for successful login
        console.log("Login successful");
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Error during login: ", error);
    } finally {
      setButtonClicked(false);
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
        className="text-4xl font-bold mb-4 text-center text-blue-500"
        id="menu"
      >
        تسجيل عضو جديد
      </h1>

      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full sm:w-1/2">
        <div>
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
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
              required
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
        </div>
        <div>
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            كلمة المرور
          </label>
          <div
            className={`${styles.input_group} ${
              error && !password ? "border-rose-600" : ""
            }`}
          >
            <input
              type="password"
              name="password"
              placeholder="كلمة المرور"
              className={styles.input_text}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="icon flex items-center px-4">
              <HiAtSymbol size={25} />
            </span>
          </div>
        </div>
        <div className="input-button">
          <button
            type="submit"
            className={`${styles.button} mt-8`}
            onClick={handleSubmit}
            disabled={buttonClicked}
          >
            {buttonClicked ? "إنتظر قليلا..." : "تسجيل"}
          </button>
        </div>
        {error && <span className="text-rose-500">{error}</span>}
      </form>
    </div>
  );
};

export default AdminLogin;
