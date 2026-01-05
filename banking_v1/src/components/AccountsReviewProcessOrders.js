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

export default function AccountsReviewProcessOrders() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [reviewNotes, setReviewNotes] = useState("");
  const [authorizationCode, setAuthorizationCode] = useState("");
  const [isApproved, setIsApproved] = useState(false);

  return (
    <div className="dashboard-container">
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="dashboard-main">
          <div className="main-content">
            <PageHeader
              title="Accounts Review - Process Orders"
              subtitle="Review and process vendor payment requests for fit-out and project execution"
            />

            {/* Back to Dashboard Link */}
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
              Back to Dashboard
            </Link>

            {/* Pending Process Orders Section */}
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
                marginBottom: "16px"
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z"
                    stroke="#1e3a8a"
                    strokeWidth="2"
                    fill="none"
                  />
                  <path
                    d="M12 6V12L16 14"
                    stroke="#1e3a8a"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h2 style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#111827",
                  margin: 0
                }}>
                  Pending Process Orders for Review
                </h2>
              </div>
              <p style={{
                fontSize: "14px",
                color: "#6b7280",
                marginBottom: "20px"
              }}>
                Review vendor estimates and authorize advance payments.
              </p>

              {/* Status Bar */}
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginBottom: "24px",
                padding: "12px 16px",
                backgroundColor: "#fffbeb",
                border: "1px solid #fde68a",
                borderRadius: "6px"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "4px 12px",
                  backgroundColor: "#fbbf24",
                  color: "#ffffff",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "600"
                }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M7 4V7L9 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Awaiting Review
                </div>
                <div style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#111827"
                }}>
                  1 Process Order Pending
                </div>
              </div>

              {/* Process Order Details Card */}
              <div style={{
                backgroundColor: "#f9fafb",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "24px"
              }}>
                {/* Project Overview */}
                <div style={{
                  marginBottom: "24px",
                  paddingBottom: "24px",
                  borderBottom: "1px solid #e5e7eb"
                }}>
                  <h3 style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "8px"
                  }}>
                    Downtown Arts Plaza - Fit Out
                  </h3>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginBottom: "12px",
                    fontSize: "14px",
                    color: "#6b7280"
                  }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
                  <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "16px",
                    fontSize: "14px",
                    color: "#6b7280"
                  }}>
                    <div>
                      <span style={{ fontWeight: "500" }}>PO Number:</span> PO-2024-FIT-001
                    </div>
                    <div>
                      <span style={{ fontWeight: "500" }}>Generated:</span> Jan 5, 2025
                    </div>
                  </div>
                </div>

                {/* Vendor Details */}
                <div style={{
                  marginBottom: "24px",
                  paddingBottom: "24px",
                  borderBottom: "1px solid #e5e7eb"
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "16px"
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
                    <h4 style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#111827",
                      margin: 0
                    }}>
                      Vendor Details
                    </h4>
                  </div>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "16px"
                  }}>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        marginBottom: "4px"
                      }}>
                        Company
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#111827"
                      }}>
                        Elite Fit Out Solutions
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        marginBottom: "4px"
                      }}>
                        Project Manager
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#111827"
                      }}>
                        John Martinez
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        marginBottom: "4px"
                      }}>
                        Contact
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "#111827"
                      }}>
                        +1 (305) 555-0123
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#6b7280",
                        marginBottom: "4px"
                      }}>
                        Email
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
                </div>

                {/* Top Row: Project Timeline and Project Scope */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "24px",
                  marginBottom: "24px"
                }}>
                  {/* Project Timeline */}
                  <div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "16px"
                    }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect x="3" y="4" width="14" height="14" rx="2" stroke="#1e3a8a" strokeWidth="1.5" />
                        <path d="M3 8H17" stroke="#1e3a8a" strokeWidth="1.5" />
                        <path d="M7 2V6M13 2V6" stroke="#1e3a8a" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <h4 style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#111827",
                        margin: 0
                      }}>
                        Project Timeline
                      </h4>
                    </div>
                    <div style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: "12px"
                    }}>
                      <div>
                        <div style={{
                          fontSize: "12px",
                          color: "#6b7280",
                          marginBottom: "4px"
                        }}>
                          Start Date
                        </div>
                        <div style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#111827"
                        }}>
                          Jan 12, 2025
                        </div>
                      </div>
                      <div>
                        <div style={{
                          fontSize: "12px",
                          color: "#6b7280",
                          marginBottom: "4px"
                        }}>
                          Completion Date
                        </div>
                        <div style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#111827"
                        }}>
                          Feb 28, 2025
                        </div>
                      </div>
                      <div>
                        <div style={{
                          fontSize: "12px",
                          color: "#6b7280",
                          marginBottom: "4px"
                        }}>
                          Duration
                        </div>
                        <div style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#111827"
                        }}>
                          6-8 weeks
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Project Scope/Details */}
                  <div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "16px"
                    }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M3 4C3 2.89543 3.89543 2 5 2H15C16.1046 2 17 2.89543 17 4V16C17 17.1046 16.1046 18 15 18H5C3.89543 18 3 17.1046 3 16V4Z"
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
                        Project Scope
                      </h4>
                    </div>
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px"
                    }}>
                      {[
                        "LED lighting installation",
                        "Network cabling and IT infrastructure"
                      ].map((item, index) => (
                        <div key={index} style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px"
                        }}>
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <circle cx="10" cy="10" r="8" stroke="#10b981" strokeWidth="2" fill="#10b981" />
                            <path
                              d="M6 10L9 13L14 7"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span style={{
                            fontSize: "14px",
                            color: "#111827"
                          }}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Middle Row: Payment Breakdown and Process Order Document */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "24px",
                  marginBottom: "24px"
                }}>
                  {/* Payment Breakdown */}
                  <div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "16px"
                    }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <rect x="2" y="4" width="16" height="12" rx="2" stroke="#1e3a8a" strokeWidth="1.5" />
                        <path d="M2 8H18" stroke="#1e3a8a" strokeWidth="1.5" />
                        <circle cx="6" cy="12" r="1.5" fill="#1e3a8a" />
                        <circle cx="10" cy="12" r="1.5" fill="#1e3a8a" />
                        <circle cx="14" cy="12" r="1.5" fill="#1e3a8a" />
                      </svg>
                      <h4 style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#111827",
                        margin: 0
                      }}>
                        Payment Breakdown
                      </h4>
                    </div>
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px"
                    }}>
                      {/* Total Estimate */}
                      <div style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "6px",
                        padding: "16px"
                      }}>
                        <div style={{
                          fontSize: "12px",
                          color: "#6b7280",
                          marginBottom: "4px"
                        }}>
                          Total Estimate
                        </div>
                        <div style={{
                          fontSize: "20px",
                          fontWeight: "700",
                          color: "#1e3a8a"
                        }}>
                          $125,000
                        </div>
                      </div>
                      {/* Advance Payment */}
                      <div style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "6px",
                        padding: "16px"
                      }}>
                        <div style={{
                          fontSize: "12px",
                          color: "#6b7280",
                          marginBottom: "4px"
                        }}>
                          Advance Payment (30%)
                        </div>
                        <div style={{
                          fontSize: "20px",
                          fontWeight: "700",
                          color: "#f97316"
                        }}>
                          $37,500
                        </div>
                      </div>
                      {/* Balance on Completion */}
                      <div style={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "6px",
                        padding: "16px"
                      }}>
                        <div style={{
                          fontSize: "12px",
                          color: "#6b7280",
                          marginBottom: "4px"
                        }}>
                          Balance on Completion
                        </div>
                        <div style={{
                          fontSize: "20px",
                          fontWeight: "700",
                          color: "#1e3a8a"
                        }}>
                          $87,500
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Process Order Document */}
                  <div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "16px"
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
                        Process Order Document
                      </h4>
                    </div>
                    <div style={{
                      padding: "16px",
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px"
                    }}>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "16px"
                      }}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                            stroke="#ef4444"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14 2V8H20"
                            stroke="#ef4444"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div>
                          <div style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#111827",
                            marginBottom: "4px"
                          }}>
                            PO-2024-FIT-001.pdf
                          </div>
                          <div style={{
                            fontSize: "12px",
                            color: "#6b7280"
                          }}>
                            Generated on Jan 5, 2025
                          </div>
                          <div style={{
                            fontSize: "12px",
                            color: "#6b7280"
                          }}>
                            Size: 245 KB
                          </div>
                        </div>
                      </div>
                      <div style={{
                        display: "flex",
                        gap: "8px"
                      }}>
                        <button
                          onClick={() => {
                            console.log("View PDF");
                            // Handle view PDF action
                          }}
                          style={{
                            flex: 1,
                            padding: "8px 16px",
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
                          View
                        </button>
                        <button
                          onClick={() => {
                            console.log("Download PDF");
                            // Handle download PDF action
                          }}
                          style={{
                            flex: 1,
                            padding: "8px 16px",
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
                  </div>
                </div>

                {/* Bottom Row: Accounts Review Notes and Payment Authorization Code */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "24px",
                  marginBottom: "24px"
                }}>
                  {/* Accounts Review Notes */}
                  <div>
                    <h4 style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "12px"
                    }}>
                      Accounts Review Notes
                    </h4>
                    <textarea
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      placeholder="Add any notes or comments regarding this payment..."
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

                  {/* Payment Authorization Code */}
                  <div>
                    <h4 style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "12px"
                    }}>
                      Payment Authorization Code
                    </h4>
                    <input
                      type="text"
                      value={authorizationCode}
                      onChange={(e) => setAuthorizationCode(e.target.value)}
                      placeholder="Enter authorization code"
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        fontSize: "14px",
                        color: "#111827",
                        marginBottom: "16px"
                      }}
                    />
                    <label style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      cursor: "pointer"
                    }}>
                      <input
                        type="checkbox"
                        checked={isApproved}
                        onChange={(e) => setIsApproved(e.target.checked)}
                        style={{
                          width: "18px",
                          height: "18px",
                          cursor: "pointer"
                        }}
                      />
                      <span style={{
                        fontSize: "14px",
                        color: "#111827"
                      }}>
                        I confirm that the estimate has been reviewed and approved for advance payment
                      </span>
                    </label>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{
                  display: "flex",
                  gap: "16px",
                  marginTop: "24px"
                }}>
                  <button
                    onClick={() => {
                      console.log("Proceed to Pay Advance", "$37,500");
                      // Handle proceed to pay action
                    }}
                    style={{
                      flex: 1,
                      padding: "14px 24px",
                      backgroundColor: "#6b7280",
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
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#4b5563";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#6b7280";
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M2 8H18" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="6" cy="12" r="1.5" fill="currentColor" />
                      <circle cx="10" cy="12" r="1.5" fill="currentColor" />
                      <circle cx="14" cy="12" r="1.5" fill="currentColor" />
                    </svg>
                    Proceed to Pay Advance ($37,500)
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Are you sure you want to reject this PO?")) {
                        console.log("Reject PO");
                        // Handle reject PO action
                      }
                    }}
                    style={{
                      flex: 1,
                      padding: "14px 24px",
                      backgroundColor: "#ef4444",
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
                    onMouseEnter={(e) => e.target.style.backgroundColor = "#dc2626"}
                    onMouseLeave={(e) => e.target.style.backgroundColor = "#ef4444"}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M15 5L5 15M5 5L15 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Reject PO
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

