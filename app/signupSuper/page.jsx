"use client";
import { useState } from "react";

const EmailVerification = () => {
   const [otpSent, setOtpSent] = useState(false);
   const [email, setEmail] = useState("");
   const [otp, setOtp] = useState("");
   const [verificationResult, setVerificationResult] = useState("");

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
         setVerificationResult("OTP verified successfully yay");
      } else {
         setVerificationResult("Incorrect OTP");
      }
   };

   return (
      <div>
         <h1>Email OTP Verification</h1>
         {otpSent ? (
            <>
               <p>OTP sent to your email. Check your inbox!</p>
               <label>
                  Enter OTP:
                  <input
                     type="text"
                     value={otp}
                     onChange={(e) => setOtp(e.target.value)}
                  />
               </label>
               <button onClick={handleVerifyOtp}>Verify OTP</button>
               <p>{verificationResult}</p>
            </>
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
