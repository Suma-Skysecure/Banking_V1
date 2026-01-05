"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import DashboardHeader from "@/components/DashboardHeader";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/agreementExecution.css";
import "@/css/businessApproval.css";

export default function FitOutVendorPO() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expectedStartDate, setExpectedStartDate] = useState("2026-01-12");
  const [expectedCompletion, setExpectedCompletion] = useState("2026-02-23");
  const [initialQuote, setInitialQuote] = useState("Office fit-out for 2,500 sq ft space including:\n- Reception area design and furniture\n- 25 workstations with ergonomic chairs\n- 3 conference rooms with AV equipment\n- Kitchen and break room setup\n- LED lighting installation\n- Network cabling and IT infrastructure");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [estimatedBudget, setEstimatedBudget] = useState("125000");
  const [timeline, setTimeline] = useState("6-8 weeks");
  const [poGenerated, setPoGenerated] = useState(false);
  const [poSent, setPoSent] = useState(false);

  return (
    <div className="dashboard-container">
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
                gridTemplateColumns: "repeat(2, 1fr)",
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
                  backgroundColor: "#e9d5ff",
                  border: "1px solid #c084fc",
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
                      stroke="#7c3aed"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#7c3aed",
                    marginBottom: "4px"
                  }}>
                    Fit Out Vendor PO
                  </div>
                  <div style={{
                    fontSize: "12px",
                    color: "#7c3aed"
                  }}>
                    In Progress
                  </div>
                </div>
              </div>
            </div>

            {/* PO for Fit Out Vendors Section */}
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
                  PO for Fit Out Vendors
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
                        Elite Fit Out Solutions
                      </div>
                      <div style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        fontWeight: "500"
                      }}>
                        Project Manager:
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#111827"
                      }}>
                        John Martinez
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
                        +1 (305) 555-0123
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
                        j.martinez@elitefitout.com
                      </div>
                    </div>
                  </div>

                  {/* Initial Quote/Requirements */}
                  <div style={{ marginBottom: "24px" }}>
                    <label style={{
                      display: "block",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "12px"
                    }}>
                      Initial Quote/Requirements
                    </label>
                    <textarea
                      value={initialQuote}
                      onChange={(e) => setInitialQuote(e.target.value)}
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

                  {/* Estimated Budget and Timeline */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "20px",
                    marginBottom: "24px"
                  }}>
                    <div>
                      <div style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        fontWeight: "500",
                        marginBottom: "4px"
                      }}>
                        Estimated Budget:
                      </div>
                      <div style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#111827"
                      }}>
                        ${parseInt(estimatedBudget || 0).toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        fontWeight: "500",
                        marginBottom: "4px"
                      }}>
                        Timeline:
                      </div>
                      <div style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#111827"
                      }}>
                        {timeline}
                      </div>
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
                          textAlign: "right"
                        }}>
                          <div style={{
                            fontSize: "18px",
                            fontWeight: "700",
                            color: "#1e3a8a"
                          }}>
                            ${parseInt(estimatedBudget || 0).toLocaleString()}
                          </div>
                          <div style={{
                            fontSize: "12px",
                            color: "#6b7280"
                          }}>
                            Estimated Value
                          </div>
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
                          PO-2024-FIT-001
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
                          Elite Fit Out Solutions
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
                          John Martinez
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
                          Downtown Arts Plaza - Office Fit Out
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
                          {timeline}
                        </div>
                      </div>
                      <div style={{
                        display: "flex",
                        gap: "12px"
                      }}>
                        <button
                          onClick={() => {
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

                  {/* Expected Start Date */}
                  <div style={{ marginBottom: "24px" }}>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "8px"
                    }}>
                      Expected Start Date
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="date"
                        value={expectedStartDate}
                        onChange={(e) => setExpectedStartDate(e.target.value)}
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

                  {/* Expected Completion */}
                  <div style={{ marginBottom: "24px" }}>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "8px"
                    }}>
                      Expected Completion
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="date"
                        value={expectedCompletion}
                        onChange={(e) => setExpectedCompletion(e.target.value)}
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

                  {/* Special Instructions */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "12px"
                    }}>
                      Special Instructions
                    </label>
                    <textarea
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="Any special instructions or notes for the vendor..."
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
                    Process Order Sent Successfully
                  </h2>
                  <p style={{
                    fontSize: "16px",
                    color: "#065f46",
                    marginBottom: "32px"
                  }}>
                    The Process Order has been successfully generated and sent to Elite Fit Out Solutions.
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
                        PO-2024-FIT-001
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
                        j.martinez@elitefitout.com
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
                        Await vendor confirmation and project timeline
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

