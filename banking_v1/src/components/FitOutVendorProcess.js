"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import ProjectExecutionProgress from "@/components/ProjectExecutionProgress";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/agreementExecution.css";
import "@/css/businessApproval.css";

export default function FitOutVendorProcess() {
  const router = useRouter();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [tentativeDeliveryDate, setTentativeDeliveryDate] = useState("2026-02-16");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [drawingsUploaded, setDrawingsUploaded] = useState(false);
  const [drawingsSent, setDrawingsSent] = useState(false);

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
              subtitle="Manage and track the final project execution, including security setup, vendor management, and IT infrastructure"
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
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "12px"
                }}>
                  <span style={{
                    padding: "6px 12px",
                    backgroundColor: "#dbeafe",
                    color: "#1e40af",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 2L3 5V11C3 13.2091 5.79086 16 8 16C10.2091 16 13 13.2091 13 11V5L8 2Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Project Execution Phase
                  </span>
                  <span style={{
                    fontSize: "14px",
                    color: "#6b7280"
                  }}>
                    PROJ-MIA-2024-002
                  </span>
                </div>
              </div>
              <div className="property-overview-right">
                <div style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  color: "#1e3a8a",
                  marginBottom: "4px"
                }}>
                  $5,800,000
                </div>
                <div style={{
                  fontSize: "14px",
                  color: "#6b7280"
                }}>
                  Registered on Dec 26, 2024
                </div>
              </div>
            </div>

            {/* Project Execution Progress Section */}
            <ProjectExecutionProgress activeStage="Drawings to fit-out vendor" />

            {/* Fit Out Vendor Process Section */}
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
                    d="M9 5H7C5.89543 5 5 5.89543 5 7V17C5 18.1046 5.89543 19 7 19H13C14.1046 19 15 18.1046 15 17V7C15 5.89543 14.1046 5 13 5H11"
                    stroke="#1e3a8a"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 5C9 3.89543 9.89543 3 11 3H9C10.1046 3 11 3.89543 11 5V5"
                    stroke="#1e3a8a"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 11H11M9 14H11"
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
                  Fit Out Vendor Process
                </h3>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px"
              }}>
                {/* Left Column */}
                <div>
                  {/* Budget Field */}
                  <div style={{
                    marginBottom: "24px"
                  }}>
                    <span style={{
                      fontSize: "14px",
                      color: "#6b7280"
                    }}>Budget:</span>
                    <span style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#1e3a8a",
                      marginLeft: "8px"
                    }}>$125,000</span>
                  </div>

                  {/* Upload Drawings for Vendor */}
                  <div style={{
                    backgroundColor: "#ffffff",
                    border: drawingsUploaded ? "2px solid #10b981" : "2px dashed #d1d5db",
                    borderRadius: "8px",
                    padding: "32px",
                    textAlign: "center",
                    cursor: drawingsUploaded ? "default" : "pointer",
                    transition: "all 0.2s",
                    marginBottom: "24px",
                    backgroundColor: drawingsUploaded ? "#f0fdf4" : "#ffffff"
                  }}
                  onMouseEnter={(e) => {
                    if (!drawingsUploaded && !drawingsSent) {
                      e.currentTarget.style.borderColor = "#f97316";
                      e.currentTarget.style.backgroundColor = "#fff7ed";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!drawingsUploaded && !drawingsSent) {
                      e.currentTarget.style.borderColor = "#d1d5db";
                      e.currentTarget.style.backgroundColor = "#ffffff";
                    }
                  }}
                  onClick={() => {
                    if (!drawingsUploaded && !drawingsSent) {
                      // Handle file upload
                      setDrawingsUploaded(true);
                    }
                  }}
                  >
                    {!drawingsUploaded ? (
                      <>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ margin: "0 auto 16px" }}>
                          <path
                            d="M24 8V32M24 8L16 16M24 8L32 16"
                            stroke="#f97316"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M8 32H40C42.2091 32 44 33.7909 44 36V40C44 42.2091 42.2091 44 40 44H8C5.79086 44 4 42.2091 4 40V36C4 33.7909 5.79086 32 8 32Z"
                            stroke="#f97316"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#111827",
                          marginBottom: "8px"
                        }}>
                          Click to upload drawings
                        </div>
                        <div style={{
                          fontSize: "12px",
                          color: "#6b7280"
                        }}>
                          PDF, DWG, DXF files supported
                        </div>
                      </>
                    ) : (
                      <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px"
                      }}>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                          <path
                            d="M20 24L24 28L28 24"
                            stroke="#10b981"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M24 8V28"
                            stroke="#10b981"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <circle cx="24" cy="24" r="20" stroke="#10b981" strokeWidth="2" />
                        </svg>
                        <div style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#10b981"
                        }}>
                          Drawings uploaded successfully
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  {/* Project Details */}
                  <div style={{
                    backgroundColor: "#eff6ff",
                    border: "1px solid #bfdbfe",
                    borderRadius: "8px",
                    padding: "20px",
                    marginBottom: "24px"
                  }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "16px"
                    }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="7" stroke="#1e40af" strokeWidth="1.5" />
                        <path d="M8 6V8M8 10H8.01" stroke="#1e40af" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <h4 style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#111827",
                        margin: 0
                      }}>
                        Project Details
                      </h4>
                    </div>
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px"
                    }}>
                      <div>
                        <span style={{
                          fontSize: "14px",
                          color: "#6b7280"
                        }}>Total Area:</span>
                        <span style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#111827",
                          marginLeft: "8px"
                        }}>2,500 sq ft</span>
                      </div>
                      <div>
                        <span style={{
                          fontSize: "14px",
                          color: "#6b7280"
                        }}>Work Type:</span>
                        <span style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#111827",
                          marginLeft: "8px"
                        }}>Complete Office Fit Out</span>
                      </div>
                      <div>
                        <span style={{
                          fontSize: "14px",
                          color: "#6b7280"
                        }}>Workstations:</span>
                        <span style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#111827",
                          marginLeft: "8px"
                        }}>25 Units</span>
                      </div>
                      <div>
                        <span style={{
                          fontSize: "14px",
                          color: "#6b7280"
                        }}>Conference Rooms:</span>
                        <span style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#111827",
                          marginLeft: "8px"
                        }}>3 Rooms</span>
                      </div>
                      <div>
                        <span style={{
                          fontSize: "14px",
                          color: "#6b7280"
                        }}>Special Requirements:</span>
                        <span style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#111827",
                          marginLeft: "8px"
                        }}>AV Equipment, Kitchen</span>
                      </div>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "20px"
                  }}>
                    <h4 style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "12px"
                    }}>
                      Additional Notes
                    </h4>
                    <textarea
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      placeholder="Enter any special instructions or requirements..."
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

              {/* Confirm and Submit Button */}
              {!drawingsSent && (
                <button
                  onClick={() => {
                    if (drawingsUploaded) {
                      // Redirect to Delivery Team Portal
                      router.push("/delivery-team-portal");
                    } else {
                      // If drawings not uploaded, upload them first
                      setDrawingsUploaded(true);
                    }
                  }}
                  style={{
                    width: "100%",
                    padding: "16px 24px",
                    backgroundColor: "#f97316",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "24px",
                    transition: "background-color 0.2s",
                    boxShadow: "0 2px 4px rgba(249, 115, 22, 0.2)"
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#ea580c"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#f97316"}
                >
                  Confirm and Submit
                </button>
              )}

              {/* Success Message */}
              {drawingsSent && (
                <div style={{
                  width: "100%",
                  padding: "24px",
                  backgroundColor: "#f0fdf4",
                  border: "2px solid #10b981",
                  borderRadius: "8px",
                  marginTop: "24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "16px"
                }}>
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="30" stroke="#10b981" strokeWidth="3" />
                    <path
                      d="M20 32L28 40L44 24"
                      stroke="#10b981"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#065f46",
                    textAlign: "center"
                  }}>
                    Drawings Sent Successfully
                  </div>
                  <div style={{
                    fontSize: "14px",
                    color: "#047857",
                    textAlign: "center"
                  }}>
                    The drawings have been sent to Elite Fit Out Solutions. They will review and respond shortly.
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

