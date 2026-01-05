"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import PropertySummaryCard from "@/components/PropertySummaryCard";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/agreementExecution.css";
import "@/css/businessApproval.css";

export default function LegalVerification() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [checklist, setChecklist] = useState({
    contractTermsReviewed: true,
    vendorCredentialsVerified: false,
    complianceConfirmed: false,
    insuranceCoverageVerified: false,
    paymentTermsApproved: false
  });
  const [reviewNotes, setReviewNotes] = useState("");
  const [riskAssessment, setRiskAssessment] = useState("");
  const [recommendation, setRecommendation] = useState("");

  const handleChecklistChange = (item) => {
    setChecklist(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleSaveReview = () => {
    console.log("Saving review...", { checklist, reviewNotes, riskAssessment, recommendation });
  };

  const handleRequestRevisions = () => {
    console.log("Requesting revisions...");
  };

  const handleRejectSubmission = () => {
    console.log("Rejecting submission...");
  };

  const handleSendForConfirmation = () => {
    console.log("Sending for confirmation...");
  };

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
              <span className="profile-email">legal@pms.com</span>
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
              title="Legal Verification"
              subtitle="Review and verify project execution details and agreements"
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
                      backgroundColor: "#fef3c7",
                      color: "#92400e",
                      border: "1px solid #fde68a",
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
                    Legal Verification Required
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
                  Submitted on Dec 26, 2024
                </div>
              </div>
            </div>

            {/* Verification Status Card */}
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
                    d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM8.5 9.5L11 12L15.5 7.5"
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
                  Verification Status
                </h3>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "20px"
              }}>
                {/* Security Deployment - Verified */}
                <div style={{
                  backgroundColor: "#d1fae5",
                  border: "1px solid #86efac",
                  borderRadius: "8px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center"
                }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ marginBottom: "12px" }}>
                    <circle cx="24" cy="24" r="22" fill="#10b981" />
                    <path
                      d="M16 24L22 30L32 18"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#065f46",
                    marginBottom: "4px"
                  }}>
                    Security Deployment
                  </div>
                  <div style={{
                    fontSize: "14px",
                    color: "#065f46"
                  }}>
                    Verified
                  </div>
                </div>

                {/* Final Confirmation - Awaiting */}
                <div style={{
                  backgroundColor: "#f3f4f6",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center"
                }}>
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ marginBottom: "12px" }}>
                    <circle cx="24" cy="24" r="22" stroke="#6b7280" strokeWidth="2" />
                    <path
                      d="M24 12V24L30 30"
                      stroke="#6b7280"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#6b7280",
                    marginBottom: "4px"
                  }}>
                    Final Confirmation
                  </div>
                  <div style={{
                    fontSize: "14px",
                    color: "#6b7280"
                  }}>
                    Awaiting
                  </div>
                </div>
              </div>
            </div>

            {/* Security Deployment Details Card */}
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
                    d="M10 2L4 5V9C4 13 7 16 10 17C13 16 16 13 16 9V5L10 2Z"
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
                  Security Deployment Details
                </h3>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "32px"
              }}>
                {/* Left Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div>
                    <div style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontWeight: "500"
                    }}>
                      Company Name
                    </div>
                    <div style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#111827"
                    }}>
                      SecureGuard Solutions LLC
                    </div>
                  </div>

                  <div>
                    <div style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontWeight: "500"
                    }}>
                      Phone Number
                    </div>
                    <div style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#111827"
                    }}>
                      (305) 555-0123
                    </div>
                  </div>

                  <div>
                    <div style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontWeight: "500"
                    }}>
                      Number of Guards
                    </div>
                    <div style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#111827"
                    }}>
                      4 Guards
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
                      Security Agreement
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 12px",
                      backgroundColor: "#d1fae5",
                      borderRadius: "6px",
                      border: "1px solid #86efac"
                    }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M4 4C4 2.89543 4.89543 2 6 2H14C15.1046 2 16 2.89543 16 4V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V4Z"
                          stroke="#065f46"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M6 6H14M6 10H14M6 14H10"
                          stroke="#065f46"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#065f46",
                        flex: 1
                      }}>
                        Security_Agreement_PROJ-MIA-2024-002.pdf
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div>
                    <div style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontWeight: "500"
                    }}>
                      Contact Person
                    </div>
                    <div style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#111827"
                    }}>
                      Michael Rodriguez
                    </div>
                  </div>

                  <div>
                    <div style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontWeight: "500"
                    }}>
                      Contract Value
                    </div>
                    <div style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#111827"
                    }}>
                      $85,000
                    </div>
                  </div>

                  <div>
                    <div style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      marginBottom: "6px",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      fontWeight: "500"
                    }}>
                      Deployment Date
                    </div>
                    <div style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#111827"
                    }}>
                      Jan 15, 2025
                    </div>
                  </div>

                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "8px"
                  }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 2V6M8 10V14M2 8H6M10 8H14"
                        stroke="#10b981"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#10b981"
                    }}>
                      Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal Review & Verification Card */}
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
                    d="M10 2L4 5V9C4 13 7 16 10 17C13 16 16 13 16 9V5L10 2Z"
                    stroke="#1e3a8a"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 8L10 10L12 8"
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
                  Legal Review & Verification
                </h3>
              </div>

              {/* Document Verification Checklist */}
              <div style={{ marginBottom: "24px" }}>
                <h4 style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: "16px"
                }}>
                  Document Verification Checklist
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <label style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#111827"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <input
                        type="checkbox"
                        checked={checklist.contractTermsReviewed}
                        onChange={() => handleChecklistChange("contractTermsReviewed")}
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                          accentColor: "#3b82f6"
                        }}
                      />
                      <span>Contract terms and conditions reviewed</span>
                    </div>
                    {checklist.contractTermsReviewed && (
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="10" r="8" fill="#10b981" />
                        <path
                          d="M7 10L9 12L13 8"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </label>

                  <label style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#111827"
                  }}>
                    <input
                      type="checkbox"
                      checked={checklist.vendorCredentialsVerified}
                      onChange={() => handleChecklistChange("vendorCredentialsVerified")}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                        accentColor: "#3b82f6",
                        marginRight: "12px"
                      }}
                    />
                    <span>Vendor credentials and licenses verified</span>
                  </label>

                  <label style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#111827"
                  }}>
                    <input
                      type="checkbox"
                      checked={checklist.complianceConfirmed}
                      onChange={() => handleChecklistChange("complianceConfirmed")}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                        accentColor: "#3b82f6",
                        marginRight: "12px"
                      }}
                    />
                    <span>Compliance with legal requirements confirmed</span>
                  </label>

                  <label style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#111827"
                  }}>
                    <input
                      type="checkbox"
                      checked={checklist.insuranceCoverageVerified}
                      onChange={() => handleChecklistChange("insuranceCoverageVerified")}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                        accentColor: "#3b82f6",
                        marginRight: "12px"
                      }}
                    />
                    <span>Insurance coverage adequacy verified</span>
                  </label>

                  <label style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#111827"
                  }}>
                    <input
                      type="checkbox"
                      checked={checklist.paymentTermsApproved}
                      onChange={() => handleChecklistChange("paymentTermsApproved")}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer",
                        accentColor: "#3b82f6",
                        marginRight: "12px"
                      }}
                    />
                    <span>Payment terms and schedules approved</span>
                  </label>
                </div>
              </div>

              {/* Legal Review Notes */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{
                  display: "block",
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: "12px"
                }}>
                  Legal Review Notes
                </label>
                <textarea
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Enter legal review notes and observations..."
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

              {/* Risk Assessment and Recommendation */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "20px"
              }}>
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "12px"
                  }}>
                    Risk Assessment
                  </label>
                  <select
                    value={riskAssessment}
                    onChange={(e) => setRiskAssessment(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "14px",
                      color: riskAssessment ? "#111827" : "#9ca3af",
                      backgroundColor: "#ffffff",
                      appearance: "none",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 12px center",
                      paddingRight: "36px"
                    }}
                  >
                    <option value="">Select risk level</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>

                <div>
                  <label style={{
                    display: "block",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "12px"
                  }}>
                    Recommendation
                  </label>
                  <select
                    value={recommendation}
                    onChange={(e) => setRecommendation(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "14px",
                      color: recommendation ? "#111827" : "#9ca3af",
                      backgroundColor: "#ffffff",
                      appearance: "none",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "right 12px center",
                      paddingRight: "36px"
                    }}
                  >
                    <option value="">Select recommendation</option>
                    <option value="Approve">Approve</option>
                    <option value="Approve with Conditions">Approve with Conditions</option>
                    <option value="Request Revisions">Request Revisions</option>
                    <option value="Reject">Reject</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Final Actions Card */}
            <div style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              marginTop: "24px"
            }}>
              <h3 style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#111827",
                margin: "0 0 20px 0"
              }}>
                Final Actions
              </h3>
              <div style={{
                display: "flex",
                gap: "16px",
                flexWrap: "wrap"
              }}>
                <button
                  onClick={handleSaveReview}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 24px",
                    backgroundColor: "#6b7280",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background-color 0.2s"
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#4b5563")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#6b7280")}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M2 2H11.5L14 4.5V14C14 14.5523 13.5523 15 13 15H3C2.44772 15 2 14.5523 2 14V2Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 15V10H11V15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 2V6H14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Save Review
                </button>

                <button
                  onClick={handleRequestRevisions}
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
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 2L2 6V12L8 16L14 12V6L8 2Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 6V10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M5 8L11 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Request Revisions
                </button>

                <button
                  onClick={handleRejectSubmission}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 24px",
                    backgroundColor: "#ef4444",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background-color 0.2s"
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#dc2626")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#ef4444")}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M5 5L11 11M11 5L5 11"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Reject Submission
                </button>

                <button
                  onClick={handleSendForConfirmation}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 24px",
                    backgroundColor: "#64748b",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background-color 0.2s"
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#475569")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#64748b")}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M2 8L14 2M14 2L10 14M14 2L8 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Send for Confirmation
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

