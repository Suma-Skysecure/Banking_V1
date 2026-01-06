"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/twoFactorAuth.css";

export default function TwoFactorAuth() {
  const router = useRouter();
  const { login } = useAuth();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = [...otp];
      for (let i = 0; i < pastedData.length && i < 6; i++) {
        newOtp[i] = pastedData[i];
      }
      setOtp(newOtp);
      // Focus the next empty input or the last one
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join("");
    
    // Static validation - accept any 6-digit OTP
    if (otpValue.length === 6) {
      console.log("OTP entered:", otpValue);
      
      // Get user data from sessionStorage
      const pendingRole = sessionStorage.getItem("pending_role");
      const pendingUsername = sessionStorage.getItem("pending_username");
      
      if (pendingRole && pendingUsername) {
        // Login the user using AuthContext
        login(pendingUsername, "", pendingRole);
        
        // Clear sessionStorage
        sessionStorage.removeItem("pending_role");
        sessionStorage.removeItem("pending_username");
      }
      
      // Redirect to dashboard
      router.push("/dashboard");
    }
  };

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left Panel - Branding */}
        <div className="login-left-panel">
          <div className="login-overlay">
            <h1 className="login-title">Branch Management System</h1>
            <p className="login-tagline">
              Streamlining every step of your business journey, from acquisition to launch.
            </p>
            <p className="login-copyright">
              ©2025 Business Management Inc. All rights reserved.
            </p>
          </div>
        </div>

        {/* Right Panel - Two-Factor Authentication Form */}
        <div className="login-right-panel">
          <div className="login-form-container">
            <h2 className="login-welcome">Welcome Back</h2>
            <p className="login-instructions">
              Please enter your credentials to access your account.
            </p>

            <div className="two-factor-section">
              <h3 className="two-factor-heading">Two-Factor Authentication</h3>
              <p className="two-factor-description">
                An OTP has been sent to your registered device. Please enter it below.
              </p>

              <form onSubmit={handleSubmit} className="otp-form">
                <div className="otp-inputs-container">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength="1"
                      className="otp-input"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={handlePaste}
                      autoComplete="off"
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="login-button"
                  disabled={otp.join("").length !== 6}
                >
                  Verify & Proceed
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
