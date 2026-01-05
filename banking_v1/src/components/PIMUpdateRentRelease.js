"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import PropertySummaryCard from "@/components/PropertySummaryCard";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/agreementExecution.css";

export default function PIMUpdateRentRelease() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    usefulLife: "40",
    assetTagNumber: "AT-MIA-002-2024",
    acquisitionDate: "2024-12-20",
    depreciationStartDate: "2025-01-01",
    costCenter: "Miami Operations",
    paymentFrequency: "Monthly",
    escalationRate: "3.5",
    securityDepositMonths: "6",
    tenantCategory: "Corporate Office",
    revenueRecognition: "Straight Line"
  });

  const [complianceChecklist, setComplianceChecklist] = useState({
    propertyRegistration: true,
    taxIdentification: true,
    insurancePolicies: true,
    propertyManagementAgreement: false,
    utilityConnections: true,
    tenantScreening: false,
    leaseAgreements: false,
    revenueRecognitionSetup: false
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleChecklistChange = (item) => {
    setComplianceChecklist(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handleSaveAndFinalize = () => {
    console.log("Saving and finalizing...", { formData, complianceChecklist });
    // Add save logic here
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
              SM
            </div>
            <div className="profile-info">
              <span className="profile-name">Sarah Martinez</span>
              <span className="profile-email">Accounts Manager</span>
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
              title="PIM Update & Rent Release"
              subtitle="Accounts Team - Final Property Management Updates"
            />

            {/* Property Summary Card */}
            <PropertySummaryCard
              propertyName="Downtown Arts Plaza"
              address="1450 Biscayne Boulevard, Miami, FL 33132"
              propertyId="PROP-MIA-2024-002"
              propertyValue="$5,800,000"
              badgeText="Agreement Executed"
              badgeIcon="check"
              badgeType="completed"
              rightLabel="Property Value"
              showValue={true}
              mapPinColor="#ef4444"
            />

            {/* Financial Summary Cards */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
              marginTop: "24px"
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
                  fontSize: "14px",
                  color: "#6b7280",
                  marginBottom: "8px"
                }}>
                  Security Deposit
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
                  fontSize: "14px",
                  color: "#6b7280",
                  marginBottom: "8px"
                }}>
                  Stamp Duty
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
                </div>
              </div>

              {/* Total Budget Card */}
              <div style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
              }}>
                <div style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  marginBottom: "8px"
                }}>
                  Total Budget
                </div>
                <div style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#111827",
                  marginBottom: "12px"
                }}>
                  $7,250,000
                </div>
                <div style={{
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
                </div>
              </div>
            </div>

            {/* Input Fields Section */}
            <div style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              marginTop: "32px"
            }}>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "24px"
              }}>
                {/* Left Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "8px"
                    }}>
                      Useful Life (Years)
                    </label>
                    <input
                      type="number"
                      value={formData.usefulLife}
                      onChange={(e) => handleChange("usefulLife", e.target.value)}
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

                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "8px"
                    }}>
                      Asset Tag Number
                    </label>
                    <input
                      type="text"
                      value={formData.assetTagNumber}
                      onChange={(e) => handleChange("assetTagNumber", e.target.value)}
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

                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "8px"
                    }}>
                      Acquisition Date
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="date"
                        value={formData.acquisitionDate}
                        onChange={(e) => handleChange("acquisitionDate", e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
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
                        <circle cx="8" cy="8" r="6" stroke="#6b7280" strokeWidth="1.5" />
                        <path
                          d="M8 4V8L10.5 10.5"
                          stroke="#6b7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "8px"
                    }}>
                      Depreciation Start Date
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="date"
                        value={formData.depreciationStartDate}
                        onChange={(e) => handleChange("depreciationStartDate", e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 12px",
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
                        <circle cx="8" cy="8" r="6" stroke="#6b7280" strokeWidth="1.5" />
                        <path
                          d="M8 4V8L10.5 10.5"
                          stroke="#6b7280"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "8px"
                    }}>
                      Cost Center
                    </label>
                    <select
                      value={formData.costCenter}
                      onChange={(e) => handleChange("costCenter", e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        fontSize: "14px",
                        color: "#111827",
                        backgroundColor: "#ffffff",
                        appearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 12px center",
                        paddingRight: "36px"
                      }}
                    >
                      <option value="Miami Operations">Miami Operations</option>
                      <option value="New York Operations">New York Operations</option>
                      <option value="Chicago Operations">Chicago Operations</option>
                    </select>
                  </div>
                </div>

                {/* Right Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "8px"
                    }}>
                      Payment Frequency
                    </label>
                    <select
                      value={formData.paymentFrequency}
                      onChange={(e) => handleChange("paymentFrequency", e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        fontSize: "14px",
                        color: "#111827",
                        backgroundColor: "#ffffff",
                        appearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 12px center",
                        paddingRight: "36px"
                      }}
                    >
                      <option value="Monthly">Monthly</option>
                      <option value="Quarterly">Quarterly</option>
                      <option value="Semi-Annually">Semi-Annually</option>
                      <option value="Annually">Annually</option>
                    </select>
                  </div>

                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "8px"
                    }}>
                      Escalation Rate (%)
                    </label>
                    <input
                      type="text"
                      value={formData.escalationRate}
                      onChange={(e) => handleChange("escalationRate", e.target.value)}
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

                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "8px"
                    }}>
                      Security Deposit (Months)
                    </label>
                    <input
                      type="number"
                      value={formData.securityDepositMonths}
                      onChange={(e) => handleChange("securityDepositMonths", e.target.value)}
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

                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "8px"
                    }}>
                      Tenant Category
                    </label>
                    <select
                      value={formData.tenantCategory}
                      onChange={(e) => handleChange("tenantCategory", e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        fontSize: "14px",
                        color: "#111827",
                        backgroundColor: "#ffffff",
                        appearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 12px center",
                        paddingRight: "36px"
                      }}
                    >
                      <option value="Corporate Office">Corporate Office</option>
                      <option value="Retail Space">Retail Space</option>
                      <option value="Warehouse">Warehouse</option>
                    </select>
                  </div>

                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#374151",
                      marginBottom: "8px"
                    }}>
                      Revenue Recognition
                    </label>
                    <select
                      value={formData.revenueRecognition}
                      onChange={(e) => handleChange("revenueRecognition", e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        fontSize: "14px",
                        color: "#111827",
                        backgroundColor: "#ffffff",
                        appearance: "none",
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%236b7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 12px center",
                        paddingRight: "36px"
                      }}
                    >
                      <option value="Straight Line">Straight Line</option>
                      <option value="Percentage of Completion">Percentage of Completion</option>
                      <option value="Completed Contract">Completed Contract</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Financial Summary Section */}
            <div style={{ marginTop: "32px" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "24px"
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M2 4L10 2L18 4V10C18 14 10 18 10 18C10 18 2 14 2 10V4Z"
                    stroke="#1e3a8a"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 9L9 12L14 7"
                    stroke="#1e3a8a"
                    strokeWidth="1.5"
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
                  Financial Summary
                </h2>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "24px"
              }}>
                {/* Annual Rental Income Card */}
                <div style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #bfdbfe",
                  borderRadius: "8px",
                  padding: "24px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
                }}>
                  <div style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: "#111827",
                    marginBottom: "8px"
                  }}>
                    $696,000
                  </div>
                  <div style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 12L8 4M4 8L12 8"
                        stroke="#10b981"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <path
                        d="M8 4L12 8L8 12L4 8L8 4Z"
                        stroke="#10b981"
                        strokeWidth="1.5"
                        fill="none"
                      />
                    </svg>
                    12 months
                  </div>
                  <div style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    marginTop: "4px"
                  }}>
                    Annual Rental Income
                  </div>
                </div>

                {/* ROI (Annual) Card */}
                <div style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #bfdbfe",
                  borderRadius: "8px",
                  padding: "24px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
                }}>
                  <div style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: "#111827",
                    marginBottom: "8px"
                  }}>
                    12.0%
                  </div>
                  <div style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    marginBottom: "4px"
                  }}>
                    % Expected
                  </div>
                  <div style={{
                    fontSize: "12px",
                    color: "#6b7280"
                  }}>
                    ROI (Annual)
                  </div>
                </div>

                {/* Break-even Period Card */}
                <div style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #bfdbfe",
                  borderRadius: "8px",
                  padding: "24px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
                }}>
                  <div style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: "#111827",
                    marginBottom: "8px"
                  }}>
                    8.3
                  </div>
                  <div style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="#6b7280" strokeWidth="1.5" />
                      <path
                        d="M8 4V8L10.5 10.5"
                        stroke="#6b7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Years
                  </div>
                  <div style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    marginTop: "4px"
                  }}>
                    Break-even Period
                  </div>
                </div>

                {/* Total Lease Value Card */}
                <div style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #bfdbfe",
                  borderRadius: "8px",
                  padding: "24px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
                }}>
                  <div style={{
                    fontSize: "28px",
                    fontWeight: "700",
                    color: "#111827",
                    marginBottom: "8px"
                  }}>
                    $6.96M
                  </div>
                  <div style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="#6b7280" strokeWidth="1.5" />
                      <path
                        d="M8 4V8L10.5 10.5"
                        stroke="#6b7280"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    10 years
                  </div>
                  <div style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    marginTop: "4px"
                  }}>
                    Total Lease Value
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance Checklist Section */}
            <div style={{ marginTop: "32px" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "24px"
              }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M3 18H17M4 18V4C4 2.89543 4.89543 2 6 2H14C15.1046 2 16 2.89543 16 4V18M4 18H16"
                    stroke="#ea580c"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 7L9 9L13 5"
                    stroke="#ea580c"
                    strokeWidth="1.5"
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
                  Compliance Checklist
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
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "20px"
                }}>
                  {/* Left Column */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <label style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#111827"
                    }}>
                      <input
                        type="checkbox"
                        checked={complianceChecklist.propertyRegistration}
                        onChange={() => handleChecklistChange("propertyRegistration")}
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                          accentColor: "#3b82f6"
                        }}
                      />
                      <span>Property registration completed</span>
                    </label>

                    <label style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#111827"
                    }}>
                      <input
                        type="checkbox"
                        checked={complianceChecklist.taxIdentification}
                        onChange={() => handleChecklistChange("taxIdentification")}
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                          accentColor: "#3b82f6"
                        }}
                      />
                      <span>Tax identification number assigned</span>
                    </label>

                    <label style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#111827"
                    }}>
                      <input
                        type="checkbox"
                        checked={complianceChecklist.insurancePolicies}
                        onChange={() => handleChecklistChange("insurancePolicies")}
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                          accentColor: "#3b82f6"
                        }}
                      />
                      <span>Insurance policies activated</span>
                    </label>

                    <label style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#111827"
                    }}>
                      <input
                        type="checkbox"
                        checked={complianceChecklist.propertyManagementAgreement}
                        onChange={() => handleChecklistChange("propertyManagementAgreement")}
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                          accentColor: "#3b82f6"
                        }}
                      />
                      <span>Property management agreement signed</span>
                    </label>
                  </div>

                  {/* Right Column */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <label style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#111827"
                    }}>
                      <input
                        type="checkbox"
                        checked={complianceChecklist.utilityConnections}
                        onChange={() => handleChecklistChange("utilityConnections")}
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                          accentColor: "#3b82f6"
                        }}
                      />
                      <span>Utility connections established</span>
                    </label>

                    <label style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#111827"
                    }}>
                      <input
                        type="checkbox"
                        checked={complianceChecklist.tenantScreening}
                        onChange={() => handleChecklistChange("tenantScreening")}
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                          accentColor: "#3b82f6"
                        }}
                      />
                      <span>Tenant screening completed</span>
                    </label>

                    <label style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#111827"
                    }}>
                      <input
                        type="checkbox"
                        checked={complianceChecklist.leaseAgreements}
                        onChange={() => handleChecklistChange("leaseAgreements")}
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                          accentColor: "#3b82f6"
                        }}
                      />
                      <span>Lease agreements executed</span>
                    </label>

                    <label style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                      fontSize: "14px",
                      color: "#111827"
                    }}>
                      <input
                        type="checkbox"
                        checked={complianceChecklist.revenueRecognitionSetup}
                        onChange={() => handleChecklistChange("revenueRecognitionSetup")}
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                          accentColor: "#3b82f6"
                        }}
                      />
                      <span>Revenue recognition setup complete</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Review & Confirmation Section */}
            <div style={{ marginTop: "32px" }}>
              <div style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
              }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                }}>
                  <div>
                    <h2 style={{
                      fontSize: "20px",
                      fontWeight: "600",
                      color: "#111827",
                      margin: "0 0 8px 0"
                    }}>
                      Final Review & Confirmation
                    </h2>
                    <p style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      margin: 0
                    }}>
                      Review all information and finalize the property management setup
                    </p>
                  </div>
                  <button
                    onClick={handleSaveAndFinalize}
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
                        d="M4 7V5C4 3.34315 5.34315 2 7 2H9C10.6569 2 12 3.34315 12 5V7M4 7H3C2.44772 7 2 7.44772 2 8V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V8C14 7.44772 13.5523 7 13 7H12M4 7H12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Save and Finalize
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

