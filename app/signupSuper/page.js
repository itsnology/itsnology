"use client";
// components/EmailVerification.js

import { useState } from "react";

const EmailVerification = () => {
  const [otpSent, setOtpSent] = useState(false);

  const [email, setEmail] = useState(""); // Define the email variable

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    // Send a request to your API route to send the OTP
    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }), // Use the defined email variable
    });

    if (response.ok) {
      const data = await response.json();
      setOtpSent(true);
      console.log(`OTP sent successfully: ${data.otp}`);
    } else {
      console.error("Failed to send email");
    }
  };
  return (
    <div>
      <h1>Email OTP Verification</h1>
      {otpSent ? (
        <p>OTP sent to your email. Check your inbox!</p>
      ) : (
        <form onSubmit={handleEmailSubmit} method="POST">
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button type="submit">Send OTP</button>
        </form>
      )}
    </div>
  );
};

export default EmailVerification;
