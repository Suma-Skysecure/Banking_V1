"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import PropertySummaryCard from "@/components/PropertySummaryCard";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/agreementExecution.css";

export default function AgreementExecution() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
              JW
            </div>
            <div className="profile-info">
              <span className="profile-name">James Wilson</span>
              <span className="profile-email">Legal Manager</span>
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
              title="Agreement Registration"
              subtitle="Finalize and execute property acquisition agreement"
            />

            {/* Property Summary Card */}
            <PropertySummaryCard
              propertyName="Downtown Arts Plaza"
              address="1450 Biscayne Boulevard, Miami, FL 33132"
              propertyId="PROP-MIA-2024-002"
              propertyValue="$5,800,000"
              badgeText="Ready for Agreement Registration"
              badgeIcon="check"
              badgeType="completed"
              rightLabel="Property Value"
              showValue={true}
              mapPinColor="#ef4444"
            />

            {/* Cards Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "24px",
              marginTop: "24px"
            }}>
              {/* Site Management Card */}
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
                  marginBottom: "16px"
                }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    backgroundColor: "#fed7aa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M3 18H17M4 18V8L10 3L16 8V18M4 18H16M8 13V18M12 13V18"
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 6L14 8L12 10M8 6L6 8L8 10"
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: 0
                  }}>
                    Site Management
                  </h3>
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <h4 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: "0 0 12px 0"
                  }}>
                    Layout Design
                  </h4>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px"
                  }}>
                    <span style={{ fontSize: "14px", color: "#6b7280" }}>Status:</span>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "4px 12px",
                      backgroundColor: "#d1fae5",
                      color: "#065f46",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "600"
                    }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M13 4L6 11L3 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Approved
                    </span>
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "14px",
                    color: "#6b7280"
                  }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="#ef4444" strokeWidth="1.5" />
                      <path
                        d="M8 4V8L10.5 10.5"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Approved on: December 18, 2024
                  </div>
                </div>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                    backgroundColor: "#1e3a8a",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                    marginTop: "16px"
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e40af")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#1e3a8a")}
                  onClick={() => {
                    console.log("View Layout Design Document");
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 4C4 2.89543 4.89543 2 6 2H14C15.1046 2 16 2.89543 16 4V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V4Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M6 6H14M6 10H14M6 14H10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  View Layout Design Document
                </button>
              </div>

              {/* Overall Budget Card */}
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
                  marginBottom: "16px"
                }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    backgroundColor: "#fed7aa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 2V18M8 6H12C12.5523 6 13 6.44772 13 7C13 7.55228 12.5523 8 12 8H8C7.44772 8 7 8.44772 7 9C7 9.55228 7.44772 10 8 10H12C12.5523 10 13 10.4477 13 11C13 11.5523 12.5523 12 12 12H8"
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: 0
                  }}>
                    Overall Budget
                  </h3>
                </div>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "20px"
                }}>
                  <div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "8px"
                    }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Status:</span>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "4px 12px",
                        backgroundColor: "#d1fae5",
                        color: "#065f46",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "600"
                      }}>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M13 4L6 11L3 8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Approved
                      </span>
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "14px",
                      color: "#6b7280",
                      marginBottom: "12px"
                    }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6" stroke="#ef4444" strokeWidth="1.5" />
                        <path
                          d="M8 4V8L10.5 10.5"
                          stroke="#ef4444"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Approved on: December 18, 2024
                    </div>
                    <div>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Total Budget:</span>
                      <span style={{
                        fontSize: "24px",
                        fontWeight: "700",
                        color: "#111827",
                        marginLeft: "8px"
                      }}>
                        $7,250,000
                      </span>
                    </div>
                  </div>
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 20px",
                      backgroundColor: "#1e3a8a",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "background-color 0.2s"
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e40af")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#1e3a8a")}
                    onClick={() => {
                      console.log("See Budget Details");
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M2 12L6 8L9 11L14 6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 6H14V10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    See Budget Details
                  </button>
                </div>
              </div>
            </div>

            {/* Timesheet & Payment Status Section */}
            <div style={{ marginTop: "32px" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "24px"
              }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  backgroundColor: "#fed7aa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="#ea580c" strokeWidth="1.5" />
                    <path
                      d="M10 6V10L13 13"
                      stroke="#ea580c"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#111827",
                  margin: 0
                }}>
                  Timesheet & Payment Status
                </h2>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "24px"
              }}>
                {/* Security Deposit Card */}
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
                    marginBottom: "16px"
                  }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      backgroundColor: "#fed7aa",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 2L4 5V9C4 13 7 16 10 17C13 16 16 13 16 9V5L10 2Z"
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 8V12M8 10H12"
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    </div>
                    <h3 style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#111827",
                      margin: 0
                    }}>
                      Security Deposit
                    </h3>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <div style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      marginBottom: "4px"
                    }}>
                      Amount:
                    </div>
                    <div style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      color: "#111827",
                      marginBottom: "12px"
                    }}>
                      $580,000
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "8px"
                    }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Status:</span>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "4px 12px",
                        backgroundColor: "#d1fae5",
                        color: "#065f46",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "600"
                      }}>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M13 4L6 11L3 8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Payment Completed
                      </span>
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "14px",
                      color: "#6b7280"
                    }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6" stroke="#ef4444" strokeWidth="1.5" />
                        <path
                          d="M8 4V8L10.5 10.5"
                          stroke="#ef4444"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Completed on: December 20, 2024
                    </div>
                  </div>
                </div>

                {/* Stamp Duty Card */}
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
                    marginBottom: "16px"
                  }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      backgroundColor: "#fed7aa",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="7" r="3" stroke="#ea580c" strokeWidth="1.5" />
                        <path
                          d="M4 18C4 15 6.5 13 10 13C13.5 13 16 15 16 18"
                          stroke="#ea580c"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <h3 style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#111827",
                      margin: 0
                    }}>
                      Stamp Duty
                    </h3>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <div style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      marginBottom: "4px"
                    }}>
                      Amount:
                    </div>
                    <div style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      color: "#111827",
                      marginBottom: "12px"
                    }}>
                      $40,600
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "8px"
                    }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Status:</span>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "4px 12px",
                        backgroundColor: "#d1fae5",
                        color: "#065f46",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "600"
                      }}>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M13 4L6 11L3 8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Approved
                      </span>
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "14px",
                      color: "#6b7280"
                    }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6" stroke="#ef4444" strokeWidth="1.5" />
                        <path
                          d="M8 4V8L10.5 10.5"
                          stroke="#ef4444"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Approved on: December 19, 2024
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Property Details Summary Section */}
            <div style={{ marginTop: "32px" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "24px"
              }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  backgroundColor: "#fed7aa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M3 18H17M4 18V8L10 3L16 8V18M4 18H16M8 13V18M12 13V18"
                      stroke="#ea580c"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#111827",
                  margin: 0
                }}>
                  Property Details Summary
                </h2>
              </div>

              <div style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
              }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "24px"
                }}>
                  <div>
                    <div style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontWeight: "500"
                    }}>
                      Property Name
                    </div>
                    <div style={{
                      fontSize: "16px",
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
                      marginBottom: "8px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontWeight: "500"
                    }}>
                      Location
                    </div>
                    <div style={{
                      fontSize: "16px",
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
                      marginBottom: "8px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontWeight: "500"
                    }}>
                      Property Value
                    </div>
                    <div style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#111827"
                    }}>
                      $5,800,000
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontWeight: "500"
                    }}>
                      Property Type
                    </div>
                    <div style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#111827"
                    }}>
                      Commercial Space
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontWeight: "500"
                    }}>
                      Size
                    </div>
                    <div style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#111827"
                    }}>
                      12,500 sq ft
                    </div>
                  </div>
                  <div>
                    <div style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      marginBottom: "8px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontWeight: "500"
                    }}>
                      Vendor
                    </div>
                    <div style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#111827"
                    }}>
                      Miami Properties Inc.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Ready to Proceed Section */}
            <div style={{ marginTop: "32px" }}>
              <div style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
              }}>
                <h2 style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#111827",
                  margin: "0 0 12px 0"
                }}>
                  Ready to Proceed
                </h2>
                <p style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  margin: "0 0 24px 0",
                  lineHeight: "1.5"
                }}>
                  All prerequisites have been completed. You can now register the agreement.
                </p>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 24px",
                    backgroundColor: "#f97316",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background-color 0.2s"
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#ea580c")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#f97316")}
                  onClick={() => {
                    console.log("Proceed to Register Agreement");
                  }}
                >
                  <span>Proceed to Register Agreement</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 12L10 8L6 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

