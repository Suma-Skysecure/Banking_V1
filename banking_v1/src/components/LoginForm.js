"use client";

/**
 * Login Page Component
 * 
 * Access: All Users
 * All roles (Business/SRBM, Admin/Ops, Legal Team, IT, Accounts, Project/Facilities) 
 * can log in using their credentials.
 * 
 * No content is editable, as this is just for authentication.
 */

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { validateCredentials, getRoleFromUsername } from "@/config/credentials";
import "@/css/loginPage.css";

const ROLES = [
  "SRBM",
  "Business",
  "Site measurement",
  "Legal due",
  "IT team",
  "BRT",
  "Agreement execution",
  "Project execution",
  "Vendor",
  "Account",
];

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Auto-select role when username changes (only if role is empty)
  useEffect(() => {
    if (username.trim() && !role) {
      const autoRole = getRoleFromUsername(username.trim());
      if (autoRole) {
        setRole(autoRole);
        setErrorMessage(""); // Clear error when role is auto-selected
      }
    }
  }, [username, role]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors
    
    // Validate that username and password are filled
    if (!username.trim() || !password.trim()) {
      setErrorMessage("Please enter both username and password.");
      return;
    }
    
    // Validate credentials
    const userData = validateCredentials(username.trim(), password);
    
    if (!userData) {
      setErrorMessage("Invalid username or password. Please try again.");
      return;
    }
    
    // Validate that role is selected
    if (!role) {
      setErrorMessage("Please select your role.");
      return;
    }
    
    // Validate that selected role matches the role from credentials (case-insensitive)
    if (role.toLowerCase().trim() !== userData.role.toLowerCase().trim()) {
      setErrorMessage(`Role mismatch. The email "${username}" is associated with "${userData.role}" role. Please select the correct role.`);
      return;
    }
    
    // All validations passed - store role and username in sessionStorage for 2FA page
    sessionStorage.setItem("pending_role", role);
    sessionStorage.setItem("pending_username", userData.username);
    
    // Redirect to 2FA
    router.push("/two-factor");
  };
  
  // Handle username change
  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    setErrorMessage(""); // Clear error when username changes
  };
  
  // Clear error when role changes
  const handleRoleChange = (e) => {
    setRole(e.target.value);
    setErrorMessage(""); // Clear error when role changes
  };

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

        {/* Right Panel - Login Form */}
        <div className="login-right-panel">
          <div className="login-form-container">
            <h2 className="login-welcome">Welcome Back</h2>
            <p className="login-instructions">
              Please enter your credentials to access your account.
            </p>

            <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <div className="input-wrapper">
                  <svg
                    className="input-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z"
                      fill="#9CA3AF"
                    />
                    <path
                      d="M8 10C4.68629 10 2 12.6863 2 16H14C14 12.6863 11.3137 10 8 10Z"
                      fill="#9CA3AF"
                    />
                  </svg>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-input"
                    placeholder="Enter your username"
                    value={username}
                    onChange={handleUsernameChange}
                    autoComplete="off"
                    autoCapitalize="off"
                    autoCorrect="off"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <div className="form-label-row">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <a href="#" className="forgot-password">
                    Forgot password?
                  </a>
                </div>
                <div className="input-wrapper">
                  <svg
                    className="input-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 6V4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4V6H2V14H14V6H12ZM5 4C5 2.89543 5.89543 2 8 2C10.1046 2 11 2.89543 11 4V6H5V4ZM13 13H3V7H13V13Z"
                      fill="#9CA3AF"
                    />
                  </svg>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <div className="input-wrapper">
                  <svg
                    className="input-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z"
                      fill="#9CA3AF"
                    />
                    <path
                      d="M8 10C4.68629 10 2 12.6863 2 16H14C14 12.6863 11.3137 10 8 10Z"
                      fill="#9CA3AF"
                    />
                  </svg>
                  <select
                    id="role"
                    name="role"
                    className="form-input"
                    value={role}
                    onChange={handleRoleChange}
                    required
                    style={{ appearance: "none", paddingRight: "40px" }}
                  >
                    <option value="">Select your role</option>
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <svg
                    className="input-icon"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    style={{ position: "absolute", right: "12px", pointerEvents: "none" }}
                  >
                    <path
                      d="M4 6L8 10L12 6"
                      stroke="#9CA3AF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {errorMessage && (
                <div className="error-message">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    style={{ marginRight: "8px", flexShrink: 0 }}
                  >
                    <circle cx="8" cy="8" r="7" stroke="#dc2626" strokeWidth="1.5" fill="#fee2e2" />
                    <path d="M8 4V9M8 11H8.01" stroke="#dc2626" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="8" cy="12" r="0.5" fill="#dc2626" />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}

              <button type="submit" className="login-button">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}