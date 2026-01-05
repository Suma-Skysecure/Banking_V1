"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/agreementExecution.css";
import "@/css/businessApproval.css";

export default function TelephonicConnectionSetup() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [serviceProvider, setServiceProvider] = useState("");
  const [connectionType, setConnectionType] = useState("");
  const [bandwidthRequired, setBandwidthRequired] = useState("");
  const [installationDatePreference, setInstallationDatePreference] = useState("2026-01-19");
  const [contractDuration, setContractDuration] = useState("");
  const [numberOfPhoneLines, setNumberOfPhoneLines] = useState("5");
  const [priorityLevel, setPriorityLevel] = useState("Standard");
  const [additionalRequirements, setAdditionalRequirements] = useState("");

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <button
          className="header-hamburger"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="hamburger-icon">
            <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="header-search">
          <input
            type="text"
            placeholder="Search branch..."
            className="header-search-input"
          />
        </div>
        <div className="header-actions">
          <button className="header-icon-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 2C11.1046 2 12 2.89543 12 4C12 5.10457 11.1046 6 10 6C8.89543 6 8 5.10457 8 4C8 2.89543 8.89543 2 10 2Z"
                fill="#6b7280"
              />
              <path
                d="M4 8C4 6.89543 6.68629 6 10 6C13.3137 6 16 6.89543 16 8V12C16 13.1046 13.3137 14 10 14C6.68629 14 4 13.1046 4 12V8Z"
                fill="#6b7280"
              />
              <path
                d="M7 14V15C7 16.6569 8.34315 18 10 18C11.6569 18 13 16.6569 13 15V14"
                stroke="#6b7280"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="header-profile" style={{ cursor: "pointer" }}>
            <div className="profile-avatar" style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #8b5cf6, #ec4899)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "600",
              fontSize: "16px"
            }}>
              AM
            </div>
            <div className="profile-info">
              <span className="profile-name">Ana Miller</span>
              <span className="profile-email">analyst@pms.com</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: "8px" }}>
              <path
                d="M4 6L8 10L12 6"
                stroke="#6b7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </header>

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="dashboard-main">
          <div className="main-content">
            <PageHeader
              title="Project Execution"
              subtitle="Manage and track the final project execution, including security setup, vendor management, and IT infrastructure."
            />

            {/* Back to Agreement Registration Link */}
            <Link href="/dashboard" className="back-to-property-details">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="back-arrow"
              >
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Agreement Registration
            </Link>

            {/* Project Overview Card */}
            <div className="property-overview-card" style={{ marginTop: "24px" }}>
              <div className="property-overview-left">
                <h2 className="property-name-large" style={{ color: "#1e3a8a" }}>
                  Downtown Arts Plaza
                </h2>
                <div className="property-address-large">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="map-pin-icon-large"
                  >
                    <path
                      d="M8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z"
                      fill="#ef4444"
                    />
                    <path
                      d="M8 1C5.23858 1 3 3.23858 3 6C3 10 8 15 8 15C8 15 13 10 13 6C13 3.23858 10.7614 1 8 1Z"
                      stroke="#ef4444"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>1450 Biscayne Boulevard, Miami, FL 33132</span>
                </div>
                <div className="property-status-section" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "12px", marginTop: "12px" }}>
                  <div
                    className="property-status-tag"
                    style={{
                      backgroundColor: "#dbeafe",
                      color: "#1e40af",
                      border: "1px solid #93c5fd",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 12px",
                      borderRadius: "20px",
                      fontSize: "14px",
                      fontWeight: "500"
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 2L10 6L14 7L11 10L11.5 14L8 12L4.5 14L5 10L2 7L6 6L8 2Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Project Execution Phase
                  </div>
                  <div className="property-id-text" style={{ fontSize: "14px", color: "#6b7280" }}>
                    Project ID: PROJ-MIA-2024-002
                  </div>
                </div>
              </div>
              <div className="property-overview-right">
                <div className="property-price-header" style={{ color: "#1e3a8a", fontSize: "32px", fontWeight: "700", marginBottom: "4px" }}>
                  $5,800,000
                </div>
                <div className="loi-circulated-date" style={{ fontSize: "14px", color: "#6b7280" }}>
                  Registered on Dec 26, 2024
                </div>
              </div>
            </div>

            {/* Project Execution Progress Section */}
            <div style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              marginTop: "24px"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px"
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M2 16L6 12L10 16L18 8"
                    stroke="#1e3a8a"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8H18V14"
                    stroke="#1e3a8a"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#111827",
                  margin: 0
                }}>
                  Project Execution Progress
                </h3>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px"
                }}>
                  <span style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827"
                  }}>
                    Overall Progress
                  </span>
                  <span style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#f97316"
                  }}>
                    80% Complete
                  </span>
                </div>
                <div style={{
                  width: "100%",
                  height: "8px",
                  backgroundColor: "#e5e7eb",
                  borderRadius: "4px",
                  overflow: "hidden"
                }}>
                  <div style={{
                    width: "80%",
                    height: "100%",
                    backgroundColor: "#f97316",
                    transition: "width 0.3s"
                  }}></div>
                </div>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "16px"
              }}>
                {/* Security Deployment Card */}
                <div style={{
                  backgroundColor: "#d1fae5",
                  border: "1px solid #86efac",
                  borderRadius: "8px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center"
                }}>
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" style={{ marginBottom: "8px" }}>
                    <path
                      d="M16 4L8 8V14C8 20 12 24 16 25C20 24 24 20 24 14V8L16 4Z"
                      stroke="#065f46"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#065f46",
                    marginBottom: "4px"
                  }}>
                    Security Deployment
                  </div>
                  <div style={{
                    fontSize: "11px",
                    color: "#065f46"
                  }}>
                    Completed
                  </div>
                </div>

                {/* Material Vendor Card */}
                <div style={{
                  backgroundColor: "#d1fae5",
                  border: "1px solid #86efac",
                  borderRadius: "8px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center"
                }}>
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" style={{ marginBottom: "8px" }}>
                    <path
                      d="M8 12H24M8 16H24M8 20H16"
                      stroke="#065f46"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6 8H26C27.1046 8 28 8.89543 28 10V22C28 23.1046 27.1046 24 26 24H6C4.89543 24 4 23.1046 4 22V10C4 8.89543 4.89543 8 6 8Z"
                      stroke="#065f46"
                      strokeWidth="2"
                    />
                  </svg>
                  <div style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#065f46",
                    marginBottom: "4px"
                  }}>
                    Material Vendor
                  </div>
                  <div style={{
                    fontSize: "11px",
                    color: "#065f46"
                  }}>
                    Completed
                  </div>
                </div>

                {/* Fit Out Vendor Process Card */}
                <div style={{
                  backgroundColor: "#d1fae5",
                  border: "1px solid #86efac",
                  borderRadius: "8px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center"
                }}>
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" style={{ marginBottom: "8px" }}>
                    <path
                      d="M6 8H26C27.1046 8 28 8.89543 28 10V22C28 23.1046 27.1046 24 26 24H6C4.89543 24 4 23.1046 4 22V10C4 8.89543 4.89543 8 6 8Z"
                      stroke="#065f46"
                      strokeWidth="2"
                    />
                    <path
                      d="M10 14H22M10 18H18"
                      stroke="#065f46"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#065f46",
                    marginBottom: "4px"
                  }}>
                    Fit Out Vendor Process
                  </div>
                  <div style={{
                    fontSize: "11px",
                    color: "#065f46"
                  }}>
                    Completed
                  </div>
                </div>

                {/* Fit Out Vendor PO Card */}
                <div style={{
                  backgroundColor: "#d1fae5",
                  border: "1px solid #86efac",
                  borderRadius: "8px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center"
                }}>
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" style={{ marginBottom: "8px" }}>
                    <path
                      d="M8 24H24M10 24V12L16 8L22 12V24M10 24H22M14 12V24M18 12V24"
                      stroke="#065f46"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#065f46",
                    marginBottom: "4px"
                  }}>
                    Fit Out Vendor PO
                  </div>
                  <div style={{
                    fontSize: "11px",
                    color: "#065f46"
                  }}>
                    Completed
                  </div>
                </div>

                {/* Telephonic Connection Card */}
                <div style={{
                  backgroundColor: "#dbeafe",
                  border: "1px solid #93c5fd",
                  borderRadius: "8px",
                  padding: "16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center"
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ marginBottom: "8px" }}>
                    <path
                      d="M22 16.92V19.92C22 20.52 21.52 21 20.92 21C9.4 21 0 11.6 0 0.08C0 -0.52 0.48 -1 1.08 -1H4.08C4.68 -1 5.16 -0.52 5.16 0.08C5.16 1.08 5.28 2.08 5.52 3.04C5.64 3.52 5.56 4.04 5.24 4.44L3.64 6.64C4.88 9.28 6.72 11.12 9.36 12.36L11.56 10.76C11.96 10.44 12.48 10.36 12.96 10.48C13.92 10.72 14.92 10.84 15.92 10.84C16.52 10.84 17 11.32 17 11.92V14.92C17 15.52 16.52 16 15.92 16Z"
                      stroke="#1e40af"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div style={{
                    fontSize: "12px",
                    fontWeight: "600",
                    color: "#1e40af",
                    marginBottom: "4px"
                  }}>
                    Telephonic Connection
                  </div>
                  <div style={{
                    fontSize: "11px",
                    color: "#1e40af"
                  }}>
                    In Progress
                  </div>
                </div>
              </div>
            </div>

            {/* Telephonic Connection Setup and Location Details */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              marginTop: "24px"
            }}>
              {/* Telephonic Connection Setup Card */}
              <div style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "24px"
                }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M18 2L16 4C18 6 19 8 19 10L20 11C21.1046 11 22 11.8954 22 13C22 14.1046 21.1046 15 20 15L17 18C15.8954 18 15 17.1046 15 16C15 14.8954 15.8954 14 17 14L19 12C19 10 18 8 16 6L14 4C12.8954 4 12 3.10457 12 2C12 0.895431 12.8954 0 14 0L18 0C19.1046 0 20 0.895431 20 2C20 3.10457 19.1046 4 18 4L16 6C17 7 17.5 8 17.5 9L18.5 10C19.6046 10 20.5 10.8954 20.5 12C20.5 13.1046 19.6046 14 18.5 14L17.5 15C16.3954 15 15.5 14.1046 15.5 13C15.5 11.8954 16.3954 11 17.5 11L18.5 10C18.5 9 18 8 17 7L15 5C13.8954 5 13 4.10457 13 3C13 1.89543 13.8954 1 15 1L18 1C19.1046 1 20 1.89543 20 3C20 4.10457 19.1046 5 18 5L16 7C15 6 14.5 5 14.5 4L13.5 3C12.3954 3 11.5 2.10457 11.5 1C11.5 -0.104569 12.3954 -1 13.5 -1L17.5 -1C18.6046 -1 19.5 -0.104569 19.5 1C19.5 2.10457 18.6046 3 17.5 3L16.5 4C16.5 5 17 6 18 7L20 9C21.1046 9 22 9.89543 22 11C22 12.1046 21.1046 13 20 13L17 16C15.8954 16 15 15.1046 15 14C15 12.8954 15.8954 12 17 12L20 9C20 7 19 5 17 3L15 1C13.8954 1 13 0.104569 13 -1C13 -2.10457 13.8954 -3 15 -3L19 -3C20.1046 -3 21 -2.10457 21 -1C21 0.104569 20.1046 1 19 1L17 3C18 4 18.5 5 18.5 6L19.5 7C20.6046 7 21.5 7.89543 21.5 9C21.5 10.1046 20.6046 11 19.5 11L18.5 12C17.3954 12 16.5 11.1046 16.5 10C16.5 8.89543 17.3954 8 18.5 8L19.5 7C19.5 6 19 5 18 4L16 2C14.8954 2 14 1.10457 14 0C14 -1.10457 14.8954 -2 16 -2L20 -2C21.1046 -2 22 -1.10457 22 0C22 1.10457 21.1046 2 20 2L18 2Z"
                      stroke="#1e3a8a"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h3 style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: 0
                  }}>
                    Telephonic Connection Setup
                  </h3>
                </div>

                {/* Service Provider */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "8px"
                  }}>
                    Service Provider
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      value={serviceProvider}
                      onChange={(e) => setServiceProvider(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        paddingRight: "36px",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        fontSize: "14px",
                        color: "#111827",
                        backgroundColor: "white",
                        appearance: "none",
                        cursor: "pointer"
                      }}
                    >
                      <option value="">Select Service Provider</option>
                      <option value="AT&T">AT&T</option>
                      <option value="Verizon">Verizon</option>
                      <option value="T-Mobile">T-Mobile</option>
                      <option value="Comcast">Comcast</option>
                      <option value="Spectrum">Spectrum</option>
                    </select>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none"
                      }}
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="#6b7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Connection Type */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "8px"
                  }}>
                    Connection Type
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      value={connectionType}
                      onChange={(e) => setConnectionType(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        paddingRight: "36px",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        fontSize: "14px",
                        color: "#111827",
                        backgroundColor: "white",
                        appearance: "none",
                        cursor: "pointer"
                      }}
                    >
                      <option value="">Select Connection Type</option>
                      <option value="Landline">Landline</option>
                      <option value="VoIP">VoIP</option>
                      <option value="Fiber">Fiber</option>
                      <option value="DSL">DSL</option>
                      <option value="Cable">Cable</option>
                    </select>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none"
                      }}
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="#6b7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Bandwidth Required */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "8px"
                  }}>
                    Bandwidth Required
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      value={bandwidthRequired}
                      onChange={(e) => setBandwidthRequired(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        paddingRight: "36px",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        fontSize: "14px",
                        color: "#111827",
                        backgroundColor: "white",
                        appearance: "none",
                        cursor: "pointer"
                      }}
                    >
                      <option value="">Select Bandwidth</option>
                      <option value="100 Mbps">100 Mbps</option>
                      <option value="250 Mbps">250 Mbps</option>
                      <option value="500 Mbps">500 Mbps</option>
                      <option value="1 Gbps">1 Gbps</option>
                      <option value="10 Gbps">10 Gbps</option>
                    </select>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none"
                      }}
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="#6b7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Installation Date Preference */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "8px"
                  }}>
                    Installation Date Preference
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="date"
                      value={installationDatePreference}
                      onChange={(e) => setInstallationDatePreference(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        paddingRight: "36px",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        fontSize: "14px",
                        color: "#111827"
                      }}
                    />
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none"
                      }}
                    >
                      <rect x="3" y="4" width="10" height="10" rx="1" stroke="#6b7280" strokeWidth="1.5" />
                      <path d="M3 7H13" stroke="#6b7280" strokeWidth="1.5" />
                      <path d="M6 2V5M10 2V5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>

                {/* Contract Duration */}
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151",
                    marginBottom: "8px"
                  }}>
                    Contract Duration
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      value={contractDuration}
                      onChange={(e) => setContractDuration(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        paddingRight: "36px",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        fontSize: "14px",
                        color: "#111827",
                        backgroundColor: "white",
                        appearance: "none",
                        cursor: "pointer"
                      }}
                    >
                      <option value="">Select Duration</option>
                      <option value="1 year">1 year</option>
                      <option value="2 years">2 years</option>
                      <option value="3 years">3 years</option>
                      <option value="5 years">5 years</option>
                    </select>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none"
                      }}
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="#6b7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Location Details Card */}
              <div>
                <div style={{
                  backgroundColor: "#eff6ff",
                  border: "1px solid #bfdbfe",
                  borderRadius: "8px",
                  padding: "24px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  marginBottom: "24px"
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px"
                  }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M3 4C3 2.89543 3.89543 2 5 2H15C16.1046 2 17 2.89543 17 4V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V4Z"
                        stroke="#1e3a8a"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M5 6H15M5 10H15M5 14H10"
                        stroke="#1e3a8a"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <h3 style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#111827",
                      margin: 0
                    }}>
                      Location Details
                    </h3>
                  </div>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                  }}>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        marginBottom: "4px"
                      }}>
                        Property
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#111827"
                      }}>
                        Downtown Arts Plaza
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        marginBottom: "4px"
                      }}>
                        Address
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#111827"
                      }}>
                        1450 Biscayne Boulevard
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        marginBottom: "4px"
                      }}>
                        Suite
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#111827"
                      }}>
                        Suite 1205
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        marginBottom: "4px"
                      }}>
                        City
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#111827"
                      }}>
                        Miami, FL 33132
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        marginBottom: "4px"
                      }}>
                        Floor
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#111827"
                      }}>
                        12th Floor
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        marginBottom: "4px"
                      }}>
                        Contact Person
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#111827"
                      }}>
                        Ana Miller
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        marginBottom: "4px"
                      }}>
                        Phone
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#111827"
                      }}>
                        +1 (305) 555-0987
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Requirements */}
                <div style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "24px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  marginBottom: "24px"
                }}>
                  <h4 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "12px"
                  }}>
                    Additional Requirements
                  </h4>
                  <textarea
                    value={additionalRequirements}
                    onChange={(e) => setAdditionalRequirements(e.target.value)}
                    placeholder="Enter any special requirements like static IP, phone lines, security features, etc."
                    style={{
                      width: "100%",
                      minHeight: "120px",
                      padding: "12px",
                      fontSize: "14px",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      backgroundColor: "white",
                      color: "#111827",
                      resize: "vertical",
                      fontFamily: "inherit"
                    }}
                  />
                </div>

                {/* Number of Phone Lines */}
                <div style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "24px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  marginBottom: "24px"
                }}>
                  <label style={{
                    display: "block",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "12px"
                  }}>
                    Number of Phone Lines
                  </label>
                  <input
                    type="number"
                    value={numberOfPhoneLines}
                    onChange={(e) => setNumberOfPhoneLines(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "14px",
                      color: "#111827"
                    }}
                  />
                </div>

                {/* Priority Level */}
                <div style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "24px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
                }}>
                  <label style={{
                    display: "block",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "12px"
                  }}>
                    Priority Level
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      value={priorityLevel}
                      onChange={(e) => setPriorityLevel(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        paddingRight: "36px",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        fontSize: "14px",
                        color: "#111827",
                        backgroundColor: "white",
                        appearance: "none",
                        cursor: "pointer"
                      }}
                    >
                      <option value="Standard">Standard</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none"
                      }}
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="#6b7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Quote Button */}
            <button
              onClick={() => {
                console.log("Generate Quote");
                // Handle generate quote action
              }}
              style={{
                width: "100%",
                padding: "16px 24px",
                backgroundColor: "#1e3a8a",
                color: "#ffffff",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                marginTop: "32px",
                transition: "background-color 0.2s",
                boxShadow: "0 2px 4px rgba(30, 58, 138, 0.2)"
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = "#1e40af"}
              onMouseLeave={(e) => e.target.style.backgroundColor = "#1e3a8a"}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7 7H13M7 10H13M7 13H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Generate Quote
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

