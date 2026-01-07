"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import DashboardHeader from "@/components/DashboardHeader";
import PropertySummaryCard from "@/components/PropertySummaryCard";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/agreementExecution.css";
import LegalDocumentsView from "@/components/legal/LegalDocumentsView";

export default function AgreementExecution() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [legalDocuments, setLegalDocuments] = useState([]);
  const [itAssessmentData, setItAssessmentData] = useState(null);
  const [itApprovalData, setItApprovalData] = useState(null);

  useEffect(() => {
    // Check if property is ready for agreement
    const checkStatus = () => {
      // 1. Check Legal/Agreement Readiness
      const branches = JSON.parse(localStorage.getItem("agreementReadyBranches") || "[]");
      const downtownBranch = branches.find(b => b.id === "PROP-MIA-2024-002");
      setIsReady(!!downtownBranch);

      if (downtownBranch && downtownBranch.documents) {
        setLegalDocuments(downtownBranch.documents);
      } else {
        setLegalDocuments([]);
      }

      // 2. Check IT Assessment Status
      // Look for approved IT assessment for Branch ID 1 (Downtown Manhattan) as proxy
      const storedApprovals = JSON.parse(localStorage.getItem('itApprovals') || "[]");
      const approvedIT = storedApprovals.find(app => (app.branchId === 1 || app.branchId === "1") && app.status === 'approved');

      if (approvedIT) {
        setItApprovalData(approvedIT);

        // Also fetch the assessment details
        const storedAssessments = JSON.parse(localStorage.getItem('itAssessments') || "[]");
        const assessment = storedAssessments.find(assess => (assess.branch.id === 1 || assess.branch.id === "1")); // forcing ID 1 match
        if (assessment) {
          setItAssessmentData(assessment);
        }
      } else {
        setItApprovalData(null);
        setItAssessmentData(null);
      }
    };

    checkStatus();

    // Listen for updates
    window.addEventListener('agreementBranchesUpdated', checkStatus);
    window.addEventListener('storage', checkStatus);
    return () => {
      window.removeEventListener('agreementBranchesUpdated', checkStatus);
      window.removeEventListener('storage', checkStatus);
    };
  }, []);

  return (
    <div className="dashboard-container">
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
              badgeText={isReady ? "Ready for Agreement Registration" : "Pending Legal Due Diligence"}
              badgeIcon={isReady ? "check" : "clock"}
              badgeType={isReady ? "completed" : "pending"}
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
              {/* Site Measurement Card */}
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
                    Site Measurement
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

              {/* Vendor Card */}
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
                        d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z"
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 12C5.58172 12 2 15.5817 2 20H18C18 15.5817 14.4183 12 10 12Z"
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
                    Vendor
                  </h3>
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <div style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    marginBottom: "8px"
                  }}>
                    Vendor Name:
                  </div>
                  <div style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "12px"
                  }}>
                    Biscayne Development Group
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
                    Created on: December 17, 2024
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
                    console.log("View Vendor Details");
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 4C5.5 4 3 6.5 3 9C3 11 5 13 8 13C11 13 13 11 13 9C13 6.5 10.5 4 8 4Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="8"
                      cy="9"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  View Vendor Details
                </button>
              </div>

              {/* Legal Due Card */}
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
                        d="M3 4H17M3 8H17M3 12H17M3 16H17"
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M6 2V6M14 2V6"
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
                    Legal Due
                  </h3>
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <h4 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: "0 0 12px 0"
                  }}>
                    Legal Clearance
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
                      Cleared
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
                    Cleared on: December 16, 2024
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
                    console.log("View Legal Documents");
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
                  View Legal Documents
                </button>
              </div>

              {/* IT Team Card */}
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
                        d="M10 2V6M10 14V18M2 10H6M14 10H18"
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <circle cx="10" cy="10" r="3" stroke="#ea580c" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <h3 style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: 0
                  }}>
                    IT Team
                  </h3>
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <h4 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: "0 0 12px 0"
                  }}>
                    IT Assessment
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
                      Completed
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
                    Completed on: December 15, 2024
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
                    console.log("View IT Assessment");
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
                  View IT Assessment
                </button>
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

            {/* NEW: Legal Documents Section */}
            {legalDocuments.length > 0 && (
              <div style={{ marginTop: "32px" }}>
                <LegalDocumentsView documents={legalDocuments} />
              </div>
            )}

            {/* NEW: IT Assessment Section (Only if approved) */}
            {itApprovalData && (
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
                    backgroundColor: "#dbeafe",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9 17V11M9 11C9 10.4477 9.44772 10 10 10H14C14.5523 10 15 10.4477 15 11M9 11H7M15 11V17M15 11H17M9 21H15C16.1046 21 17 20.1046 17 19V7C17 5.89543 16.1046 5 15 5H9C7.89543 5 7 5.89543 7 7V19C7 20.1046 7.89543 21 9 21Z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 2V5" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h2 style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: 0
                  }}>
                    IT Assessment & Feasibility
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
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                    paddingBottom: "20px",
                    borderBottom: "1px solid #e5e7eb"
                  }}>
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#111827", margin: "0 0 4px 0" }}>Assessment Status</h3>
                      <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>Verified by BRT Team</p>
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 12px",
                      backgroundColor: "#d1fae5",
                      color: "#065f46",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: "600"
                    }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      BRT Approved
                    </div>
                  </div>

                  {itAssessmentData && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                      <div>
                        <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>Infrastructure Needs</h4>
                        <p style={{ fontSize: "14px", color: "#4b5563", backgroundColor: "#f9fafb", padding: "12px", borderRadius: "6px", border: "1px solid #e5e7eb", margin: 0 }}>
                          {itAssessmentData.assessment.infrastructureNeeds || "N/A"}
                        </p>
                      </div>
                      <div>
                        <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>Estimated Budget</h4>
                        <p style={{ fontSize: "14px", color: "#4b5563", backgroundColor: "#f9fafb", padding: "12px", borderRadius: "6px", border: "1px solid #e5e7eb", margin: 0 }}>
                          ${itAssessmentData.assessment.estimatedBudget || "N/A"}
                        </p>
                      </div>
                      <div>
                        <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>Technical Requirements</h4>
                        <p style={{ fontSize: "14px", color: "#4b5563", backgroundColor: "#f9fafb", padding: "12px", borderRadius: "6px", border: "1px solid #e5e7eb", margin: 0 }}>
                          {itAssessmentData.assessment.technicalRequirements || "N/A"}
                        </p>
                      </div>
                      <div>
                        <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>Implementation Timeline</h4>
                        <p style={{ fontSize: "14px", color: "#4b5563", backgroundColor: "#f9fafb", padding: "12px", borderRadius: "6px", border: "1px solid #e5e7eb", margin: 0 }}>
                          {itAssessmentData.assessment.implementationTimeline || "N/A"}
                        </p>
                      </div>
                      <div>
                        <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>Budget Allocation Teams</h4>
                        <p style={{ fontSize: "14px", color: "#4b5563", backgroundColor: "#f9fafb", padding: "12px", borderRadius: "6px", border: "1px solid #e5e7eb", margin: 0 }}>
                          {itAssessmentData.assessment.budgetAllocationTeams || "N/A"}
                        </p>
                      </div>
                      <div>
                        <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>Risk Assessment</h4>
                        <p style={{ fontSize: "14px", color: "#4b5563", backgroundColor: "#f9fafb", padding: "12px", borderRadius: "6px", border: "1px solid #e5e7eb", margin: 0 }}>
                          {itAssessmentData.assessment.riskAssessment || "N/A"}
                        </p>
                      </div>
                      <div style={{ gridColumn: "span 2" }}>
                        <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>Additional Recommendations</h4>
                        <p style={{ fontSize: "14px", color: "#4b5563", backgroundColor: "#f9fafb", padding: "12px", borderRadius: "6px", border: "1px solid #e5e7eb", margin: 0 }}>
                          {itAssessmentData.assessment.recommendations || "N/A"}
                        </p>
                      </div>
                    </div>
                  )}

                  <div style={{ marginTop: "24px" }}>
                    <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "12px" }}>Approval Checklist</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
                      {Object.entries(itApprovalData.approvals).filter(([k, v]) => v).map(([key, value]) => (
                        <div key={key} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#4b5563" }}>
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                            <circle cx="10" cy="10" r="8" fill="#d1fae5" />
                            <path d="M6 10L9 13L14 8" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span style={{ textTransform: "capitalize" }}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

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

