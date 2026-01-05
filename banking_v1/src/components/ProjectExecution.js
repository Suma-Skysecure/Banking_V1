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

export default function ProjectExecution() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [requiredDeliveryDate, setRequiredDeliveryDate] = useState("2026-01-26");
  const [installationDate, setInstallationDate] = useState("2026-02-02");
  const [deliveryInstructions, setDeliveryInstructions] = useState("Delivery to be coordinated with building management. Loading dock access required between 8 AM - 5 PM weekdays. Installation team should coordinate with fit-out contractor for optimal scheduling.");
  const [estimatedBudget, setEstimatedBudget] = useState("185000");
  const [priorityLevel, setPriorityLevel] = useState("High Priority");
  const [paymentTerms, setPaymentTerms] = useState("Net 30 Days");
  const [poGenerated, setPoGenerated] = useState(false);
  const [poSent, setPoSent] = useState(false);

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
              subtitle="Manage and track the final project execution, including material procurement and vendor management"
            />

            {/* Back to Fit Out Vendor Link */}
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
              Back to Fit Out Vendor
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
                    50% Complete
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
                    width: "50%",
                    height: "100%",
                    backgroundColor: "#f97316",
                    transition: "width 0.3s"
                  }}></div>
                </div>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px"
              }}>
                {/* Security Deployment Card */}
                <div style={{
                  backgroundColor: "#d1fae5",
                  border: "1px solid #86efac",
                  borderRadius: "8px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center"
                }}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ marginBottom: "12px" }}>
                    <path
                      d="M16 4L8 8V14C8 20 12 24 16 25C20 24 24 20 24 14V8L16 4Z"
                      stroke="#065f46"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#065f46",
                    marginBottom: "4px"
                  }}>
                    Security Deployment
                  </div>
                  <div style={{
                    fontSize: "12px",
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
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center"
                }}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ marginBottom: "12px" }}>
                    <path
                      d="M8 24H24M10 24V12L16 8L22 12V24M10 24H22M14 12V24M18 12V24"
                      stroke="#065f46"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#065f46",
                    marginBottom: "4px"
                  }}>
                    Fit Out Vendor PO
                  </div>
                  <div style={{
                    fontSize: "12px",
                    color: "#065f46"
                  }}>
                    Completed
                  </div>
                </div>

                {/* Material Vendor PO Card */}
                <div style={{
                  backgroundColor: "#fed7aa",
                  border: "1px solid #fdba74",
                  borderRadius: "8px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center"
                }}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" style={{ marginBottom: "12px" }}>
                    <path
                      d="M8 12H24M8 16H24M8 20H16"
                      stroke="#ea580c"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6 8H26C27.1046 8 28 8.89543 28 10V22C28 23.1046 27.1046 24 26 24H6C4.89543 24 4 23.1046 4 22V10C4 8.89543 4.89543 8 6 8Z"
                      stroke="#ea580c"
                      strokeWidth="2"
                    />
                  </svg>
                  <div style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#ea580c",
                    marginBottom: "4px"
                  }}>
                    Material Vendor PO
                  </div>
                  <div style={{
                    fontSize: "12px",
                    color: "#ea580c"
                  }}>
                    In Progress
                  </div>
                </div>
              </div>
            </div>

            {/* PO for Material Vendor Section */}
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
                marginBottom: "24px"
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M4 4C4 2.89543 4.89543 2 6 2H14C15.1046 2 16 2.89543 16 4V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V4Z"
                    stroke="#1e3a8a"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M6 6H14M6 10H14M6 14H10"
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
                  PO for Material Vendor
                </h3>
              </div>

              {/* Two Column Layout */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "32px"
              }}>
                {/* Left Column */}
                <div>
                  {/* Vendor Information */}
                  <div style={{
                    backgroundColor: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "20px",
                    marginBottom: "24px"
                  }}>
                    <h4 style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "16px"
                    }}>
                      Vendor Information
                    </h4>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      gap: "12px 20px",
                      alignItems: "center"
                    }}>
                      <div style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        fontWeight: "500"
                      }}>
                        Company:
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#111827"
                      }}>
                        Miami Office Supplies Inc.
                      </div>
                      <div style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        fontWeight: "500"
                      }}>
                        Account Manager:
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#111827"
                      }}>
                        Sarah Rodriguez
                      </div>
                      <div style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        fontWeight: "500"
                      }}>
                        Contact:
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#111827"
                      }}>
                        +1 (305) 555-0789
                      </div>
                      <div style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        fontWeight: "500"
                      }}>
                        Email:
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#111827"
                      }}>
                        s.rodriguez@miamiosupplies.com
                      </div>
                      <div style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        fontWeight: "500"
                      }}>
                        Category:
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#111827"
                      }}>
                        Office Furniture & Equipment
                      </div>
                    </div>
                  </div>

                  {/* Material Requirements & Specifications */}
                  <div style={{
                    backgroundColor: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "20px",
                    marginBottom: "24px"
                  }}>
                    <h4 style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "12px"
                    }}>
                      Material Requirements & Specifications
                    </h4>
                    <div style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "12px"
                    }}>
                      Office Equipment & Furniture Requirements:
                    </div>
                    <div style={{
                      fontSize: "14px",
                      color: "#111827",
                      lineHeight: "1.6"
                    }}>
                      <div style={{ marginBottom: "8px" }}>
                        <strong>1. Workstation Furniture:</strong>
                      </div>
                      <div style={{ marginLeft: "20px", marginBottom: "12px" }}>
                        <div>- 25 ergonomic office chairs (Herman Miller Aeron)</div>
                        <div>- 25 height-adjustable desks (72"x30")</div>
                        <div>- 25 monitor arms (dual monitor support)</div>
                      </div>
                    </div>
                  </div>

                  {/* Estimated Budget */}
                  <div style={{ marginBottom: "24px" }}>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "8px"
                    }}>
                      Estimated Budget
                    </label>
                    <input
                      type="text"
                      value={estimatedBudget ? `$${parseInt(estimatedBudget || 0).toLocaleString()}` : "$185,000"}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, '');
                        if (value === '') {
                          setEstimatedBudget("185000");
                        } else {
                          setEstimatedBudget(value);
                        }
                      }}
                      onBlur={(e) => {
                        if (!estimatedBudget || estimatedBudget === '') {
                          setEstimatedBudget("185000");
                        }
                      }}
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
                  <div style={{ marginBottom: "24px" }}>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "8px"
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
                        <option value="High Priority">High Priority</option>
                        <option value="Medium Priority">Medium Priority</option>
                        <option value="Low Priority">Low Priority</option>
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

                  {/* Generate Process Order / PO Generated Button */}
                  {poGenerated ? (
                    <button
                      disabled
                      style={{
                        width: "100%",
                        padding: "14px 24px",
                        backgroundColor: "#10b981",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "600",
                        cursor: "not-allowed",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        opacity: 1
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" fill="currentColor" />
                        <path
                          d="M6 10L9 13L14 7"
                          stroke="#ffffff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      PO Generated
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setPoGenerated(true);
                      }}
                      style={{
                        width: "100%",
                        padding: "14px 24px",
                        backgroundColor: "#1e3a8a",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "16px",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        transition: "background-color 0.2s"
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = "#1e40af"}
                      onMouseLeave={(e) => e.target.style.backgroundColor = "#1e3a8a"}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                        <path
                          d="M10 6V10L13 13"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Generate Process Order
                    </button>
                  )}
                </div>

                {/* Right Column */}
                <div>
                  {/* Generated Process Order Card - Only show after PO is generated */}
                  {poGenerated && (
                    <div style={{
                    backgroundColor: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "20px",
                    marginBottom: "24px",
                    position: "relative"
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "16px"
                    }}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px"
                      }}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M4 4C4 2.89543 4.89543 2 6 2H14C15.1046 2 16 2.89543 16 4V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V4Z"
                            stroke="#1e3a8a"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M6 6H14M6 10H14M6 14H10"
                            stroke="#1e3a8a"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                        <h4 style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#111827",
                          margin: 0
                        }}>
                          Generated Process Order
                        </h4>
                      </div>
                      <div style={{
                        fontSize: "18px",
                        fontWeight: "700",
                        color: "#1e3a8a"
                      }}>
                        $185,000
                      </div>
                    </div>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "auto 1fr",
                      gap: "12px 20px",
                      alignItems: "center",
                      marginBottom: "16px"
                    }}>
                      <div style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        fontWeight: "500"
                      }}>
                        PO Number:
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#111827"
                      }}>
                        PO-2024-MAT-002
                      </div>
                      <div style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        fontWeight: "500"
                      }}>
                        Date:
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#111827"
                      }}>
                        January 5, 2025
                      </div>
                      <div style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        fontWeight: "500"
                      }}>
                        Vendor:
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#111827"
                      }}>
                        Miami Office Supplies Inc.
                      </div>
                      <div style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        fontWeight: "500"
                      }}>
                        Contact:
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#111827"
                      }}>
                        Sarah Rodriguez
                      </div>
                      <div style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        fontWeight: "500"
                      }}>
                        Project:
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#111827"
                      }}>
                        Downtown Arts Plaza - Office Equipment
                      </div>
                      <div style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        fontWeight: "500"
                      }}>
                        Timeline:
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#111827"
                      }}>
                        3-4 weeks delivery
                      </div>
                      <div style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        fontWeight: "500"
                      }}>
                        Priority:
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#111827"
                      }}>
                        High
                      </div>
                    </div>
                    <div style={{
                      display: "flex",
                      gap: "12px"
                    }}>
                      <button
                        onClick={() => {
                          // Handle view full action
                          console.log("View Full PO");
                        }}
                        style={{
                          flex: 1,
                          padding: "10px 16px",
                          backgroundColor: "white",
                          color: "#1e3a8a",
                          border: "1px solid #1e3a8a",
                          borderRadius: "6px",
                          fontSize: "14px",
                          fontWeight: "600",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#eff6ff";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "white";
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M8 3C5.23858 3 3 5.23858 3 8C3 10.7614 5.23858 13 8 13C10.7614 13 13 10.7614 13 8C13 5.23858 10.7614 3 8 3Z"
                            stroke="currentColor"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M8 6V8L9.5 9.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        View Full
                      </button>
                      <button
                        onClick={() => {
                          // Handle download action
                          console.log("Download PO");
                        }}
                        style={{
                          flex: 1,
                          padding: "10px 16px",
                          backgroundColor: "white",
                          color: "#1e3a8a",
                          border: "1px solid #1e3a8a",
                          borderRadius: "6px",
                          fontSize: "14px",
                          fontWeight: "600",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          transition: "all 0.2s"
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#eff6ff";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "white";
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M8 11V2M8 11L5 8M8 11L11 8"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M2 13H14"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                        Download
                      </button>
                    </div>
                  </div>
                  )}

                  {/* Required Delivery Date */}
                  <div style={{ marginBottom: "24px" }}>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "8px"
                    }}>
                      Required Delivery Date
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="date"
                        value={requiredDeliveryDate}
                        onChange={(e) => setRequiredDeliveryDate(e.target.value)}
                        placeholder="dd-mm-yyyy"
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

                  {/* Installation Date */}
                  <div style={{ marginBottom: "24px" }}>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "8px"
                    }}>
                      Installation Date
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="date"
                        value={installationDate}
                        onChange={(e) => setInstallationDate(e.target.value)}
                        placeholder="dd-mm-yyyy"
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

                  {/* Delivery Instructions */}
                  <div style={{
                    backgroundColor: "#f9fafb",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "20px",
                    marginBottom: "24px"
                  }}>
                    <h4 style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "12px"
                    }}>
                      Delivery Instructions
                    </h4>
                    <textarea
                      value={deliveryInstructions}
                      onChange={(e) => setDeliveryInstructions(e.target.value)}
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

                  {/* Payment Terms */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "8px"
                    }}>
                      Payment Terms
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        value={paymentTerms}
                        onChange={(e) => setPaymentTerms(e.target.value)}
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
                        <option value="Net 30 Days">Net 30 Days</option>
                        <option value="Net 15 Days">Net 15 Days</option>
                        <option value="Net 45 Days">Net 45 Days</option>
                        <option value="Net 60 Days">Net 60 Days</option>
                        <option value="Due on Receipt">Due on Receipt</option>
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

              {/* Confirm and Send Out PO Button / PO Sent Successfully Button */}
              {poGenerated && (
                <button
                  onClick={() => {
                    if (!poSent) {
                      setPoSent(true);
                    }
                  }}
                  disabled={poSent}
                  style={{
                    width: "100%",
                    padding: "16px 24px",
                    backgroundColor: poSent ? "#10b981" : "#f97316",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: poSent ? "not-allowed" : "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                    marginTop: "32px",
                    transition: "background-color 0.2s",
                    boxShadow: poSent ? "0 2px 4px rgba(16, 185, 129, 0.2)" : "0 2px 4px rgba(249, 115, 22, 0.2)",
                    opacity: poSent ? 1 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (!poSent) {
                      e.target.style.backgroundColor = "#ea580c";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!poSent) {
                      e.target.style.backgroundColor = "#f97316";
                    }
                  }}
                >
                  {poSent ? (
                    <>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" fill="currentColor" />
                        <path
                          d="M6 10L9 13L14 7"
                          stroke="#ffffff"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      PO Sent Successfully
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M2 10L18 2L12 18L10 11L2 10Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="currentColor"
                        />
                      </svg>
                      Confirm and Send Out PO
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Success Banner - Show when PO is sent, appears at bottom of page */}
            {poSent && (
              <div style={{
                backgroundColor: "#f0fdf4",
                borderRadius: "12px",
                padding: "48px 24px",
                textAlign: "center",
                marginTop: "32px"
              }}>
                {/* Large Checkmark Icon */}
                <div style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "24px"
                }}>
                  <div style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    backgroundColor: "#10b981",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                      <path
                        d="M16 24L22 30L32 18"
                        stroke="white"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Success Message */}
                <h2 style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#065f46",
                  marginBottom: "12px"
                }}>
                  Material PO Sent Successfully
                </h2>
                <p style={{
                  fontSize: "16px",
                  color: "#065f46",
                  marginBottom: "32px"
                }}>
                  The Process Order has been successfully generated and sent to Miami Office Supplies Inc.
                </p>

                {/* PO Details Card */}
                <div style={{
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  padding: "24px",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                  maxWidth: "600px",
                  margin: "0 auto",
                  textAlign: "left"
                }}>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    gap: "16px 24px",
                    alignItems: "center"
                  }}>
                    <div style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827"
                    }}>
                      PO Number:
                    </div>
                    <div style={{
                      fontSize: "14px",
                      color: "#374151"
                    }}>
                      PO-2024-MAT-002
                    </div>
                    <div style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827"
                    }}>
                      Sent to:
                    </div>
                    <div style={{
                      fontSize: "14px",
                      color: "#374151"
                    }}>
                      s.rodriguez@miamiosupplies.com
                    </div>
                    <div style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827"
                    }}>
                      Next Step:
                    </div>
                    <div style={{
                      fontSize: "14px",
                      color: "#374151"
                    }}>
                      Await vendor confirmation and delivery schedule
                    </div>
                    <div style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827"
                    }}>
                      Expected Delivery:
                    </div>
                    <div style={{
                      fontSize: "14px",
                      color: "#374151"
                    }}>
                      3-4 weeks
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

