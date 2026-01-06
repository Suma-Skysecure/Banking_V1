"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import DashboardHeader from "@/components/DashboardHeader";
import PropertySummaryCard from "@/components/PropertySummaryCard";
import SiteMeasurementDetails from "@/components/SiteMeasurementDetails";
import LayoutDesignSection from "@/components/LayoutDesignSection";
import LayoutDesignApproval from "@/components/LayoutDesignApproval";
import ToastNotification from "@/components/ToastNotification";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/postLOIActivities.css";
import "@/css/businessApproval.css";

export default function PostLOIActivities() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [uploadedLOI, setUploadedLOI] = useState(null);

  // TSA (Stamp Duty) state
  const propertyValue = 5800000;
  const stampDutyRate = 0.7;
  const totalStampDuty = (propertyValue * stampDutyRate) / 100;
  
  // TSA (Security Deposit) state
  const depositPercentage = 10;
  const securityDepositAmount = (propertyValue * depositPercentage) / 100;
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Format currency helper
  const formatCurrencyTSA = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount * 83.5);
  };

  // Load uploaded LOI document from localStorage
  useEffect(() => {
    const storedLOI = localStorage.getItem("uploadedSignedLOI");
    if (storedLOI) {
      try {
        setUploadedLOI(JSON.parse(storedLOI));
      } catch (error) {
        console.error("Error parsing stored LOI:", error);
      }
    }
  }, []);

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "short", 
      day: "numeric" 
    });
  };

  // Handle view document
  const handleViewDocument = () => {
    if (uploadedLOI && uploadedLOI.data) {
      // Open the document in a new window
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head><title>${uploadedLOI.name}</title></head>
            <body style="margin:0; padding:0; display:flex; justify-content:center; align-items:center; height:100vh;">
              <iframe src="${uploadedLOI.data}" style="width:100%; height:100%; border:none;"></iframe>
            </body>
          </html>
        `);
      }
    } else {
      console.log("View document");
    }
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="dashboard-main">
          <div className="main-content">
            <PageHeader
              title="Post-LOI Activities"
              subtitle="Accounts Team - Payment Approvals"
            />

            {/* Property Summary Card */}
            <PropertySummaryCard
              propertyName="Downtown Arts Plaza"
              address="1450 Biscayne Boulevard, Miami, FL 33132"
              propertyId="PROP-MIA-2024-002"
              propertyValue={new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(5800000 * 83.5)}
              badgeText="Pending Payment Approval"
              badgeIcon="clock"
              rightLabel="LOI Circulated on Dec 18, 2024"
              showValue={true}
              mapPinColor="#ef4444"
            />

            {/* LOI Document Card */}
            <div className="business-details-card" style={{ marginBottom: "24px" }}>
              <div className="card-header">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="card-icon"
                >
                  <path
                    d="M2 4H14V12H2V4Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 4V12M10 4V12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <h3 className="card-title">LOI Document</h3>
              </div>
              <div style={{ padding: "20px" }}>
                {uploadedLOI ? (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px",
                    backgroundColor: "#f9fafb",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#fee2e2",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
                          <path
                            d="M16 13H8M16 17H8M10 9H8"
                            stroke="#ef4444"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "14px", fontWeight: "600", color: "#111827", marginBottom: "4px" }}>
                          {uploadedLOI.name}
                        </div>
                        <div style={{ fontSize: "12px", color: "#6b7280" }}>
                          Uploaded on {formatDate(uploadedLOI.uploadDate)} • {formatFileSize(uploadedLOI.size)}
                        </div>
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
                        flexShrink: 0
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e40af")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "#1e3a8a")}
                      onClick={handleViewDocument}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M8 4C4 4 1.33333 6.66667 1 8C1.33333 9.33333 4 12 8 12C12 12 14.6667 9.33333 15 8C14.6667 6.66667 12 4 8 4Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="8"
                          cy="8"
                          r="2"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                      View Document
                    </button>
                  </div>
                ) : (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "40px 20px",
                    backgroundColor: "#f9fafb",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    color: "#6b7280",
                    fontSize: "14px"
                  }}>
                    No LOI document uploaded yet. Please upload a signed LOI document from the Legal Workflow page.
                  </div>
                )}
              </div>
            </div>

            {/* Site Measurement Details */}
            <SiteMeasurementDetails />

            {/* Layout Design Section */}
            <LayoutDesignSection />

            {/* Layout Design Approval */}
            <LayoutDesignApproval showOnlyUpdateButton={true} />

            {/* TSA (Stamp Duty) Section */}
            <div className="business-details-card" style={{ marginTop: "24px", marginBottom: "24px" }}>
              <div className="card-header">
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "#f97316",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "12px"
                }}>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z"
                      fill="white"
                    />
                    <path
                      d="M8 10C4.68629 10 2 12.6863 2 16H14C14 12.6863 11.3137 10 8 10Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <h3 className="card-title">TSA (Stamp Duty)</h3>
              </div>
              <div style={{ padding: "20px" }}>
                {/* Calculation Breakdown */}
                <div style={{ marginBottom: "24px" }}>
                  <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#111827", marginBottom: "16px" }}>
                    Calculation Breakdown
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Property Value:</span>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                        {formatCurrencyTSA(propertyValue)}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Stamp Duty Rate:</span>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                        {stampDutyRate}%
                      </span>
                    </div>
                    <div style={{ 
                      display: "flex", 
                      justifyContent: "space-between", 
                      alignItems: "center",
                      padding: "12px",
                      backgroundColor: "#dbeafe",
                      borderRadius: "6px",
                      border: "1px solid #93c5fd"
                    }}>
                      <span style={{ fontSize: "16px", fontWeight: "600", color: "#1e3a8a" }}>
                        Total Stamp Duty Amount:
                      </span>
                      <span style={{ fontSize: "18px", fontWeight: "700", color: "#1e3a8a" }}>
                        {formatCurrencyTSA(totalStampDuty)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div style={{ marginBottom: "24px" }}>
                  <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#111827", marginBottom: "16px" }}>
                    Payment Information
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Payment Status:</span>
                      <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 12px",
                        backgroundColor: "#fef3c7",
                        color: "#92400e",
                        borderRadius: "20px",
                        fontSize: "14px",
                        fontWeight: "500"
                      }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                          <path
                            d="M8 4V8L10.5 10.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Payment Initiated
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Payment Reference Number:</span>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                        SD-MIA-2024-002-4060
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Payment Date:</span>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                        December 19, 2024
                      </span>
                    </div>
                  </div>
                </div>

                {/* Additional Information and Payment Details */}
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "1fr 1fr", 
                  gap: "24px",
                  marginBottom: "24px"
                }}>
                  {/* Additional Information */}
                  <div className="business-details-card">
                    <div className="card-header">
                      <h3 className="card-title">Additional Information</h3>
                    </div>
                    <div style={{ padding: "20px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "14px", color: "#6b7280" }}>State:</span>
                          <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                            Florida
                          </span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "14px", color: "#6b7280" }}>County:</span>
                          <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                            Miami-Dade
                          </span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "14px", color: "#6b7280" }}>Property Type:</span>
                          <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                            Commercial Office
                          </span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "14px", color: "#6b7280" }}>Transaction Type:</span>
                          <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                            Purchase
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="business-details-card">
                    <div className="card-header">
                      <h3 className="card-title">Payment Details</h3>
                    </div>
                    <div style={{ padding: "20px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "14px", color: "#6b7280", marginBottom: "6px" }}>
                            Payment Date
                          </label>
                          <div style={{
                            padding: "10px 12px",
                            fontSize: "14px",
                            border: "1px solid #d1d5db",
                            borderRadius: "6px",
                            backgroundColor: "#f9fafb",
                            color: "#111827"
                          }}>
                            December 19, 2024
                          </div>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "14px", color: "#6b7280", marginBottom: "6px" }}>
                            Payment Method
                          </label>
                          <div style={{
                            padding: "10px 12px",
                            fontSize: "14px",
                            border: "1px solid #d1d5db",
                            borderRadius: "6px",
                            backgroundColor: "#f9fafb",
                            color: "#111827"
                          }}>
                            Electronic Transfer
                          </div>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "14px", color: "#6b7280", marginBottom: "6px" }}>
                            Paying Authority
                          </label>
                          <div style={{
                            padding: "10px 12px",
                            fontSize: "14px",
                            border: "1px solid #d1d5db",
                            borderRadius: "6px",
                            backgroundColor: "#f9fafb",
                            color: "#111827"
                          }}>
                            Florida Department of Revenue
                          </div>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "14px", color: "#6b7280", marginBottom: "6px" }}>
                            Account Reference
                          </label>
                          <div style={{
                            padding: "10px 12px",
                            fontSize: "14px",
                            border: "1px solid #d1d5db",
                            borderRadius: "6px",
                            backgroundColor: "#f9fafb",
                            color: "#111827"
                          }}>
                            FL-REV-ACC-789456123
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Stamp Duty for Account Button */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    onClick={() => {
                      console.log("Submitting stamp duty for account");
                      setNotificationMessage("Stamp duty submitted successfully");
                      setShowNotification(true);
                    }}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#f97316",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      transition: "background-color 0.2s"
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#ea580c")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#f97316")}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 1V3M8 13V15M15 8H13M3 8H1M13.364 2.636L11.95 4.05M4.05 11.95L2.636 13.364M13.364 13.364L11.95 11.95M4.05 4.05L2.636 2.636"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <circle
                        cx="8"
                        cy="8"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                    Submit Stamp Duty for Account
                  </button>
                </div>
              </div>
            </div>

            {/* TSA (Security Deposit) Section */}
            <div className="business-details-card" style={{ marginTop: "24px", marginBottom: "24px" }}>
              <div className="card-header">
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "#f97316",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "12px"
                }}>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 1L3 4V8C3 11.866 8 15 8 15C8 15 13 11.866 13 8V4L8 1Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="card-title">TSA (Security Deposit)</h3>
              </div>
              <div style={{ padding: "20px" }}>
                <div style={{ 
                  display: "grid", 
                  gridTemplateColumns: "1fr 1fr", 
                  gap: "24px"
                }}>
                  {/* Deposit Details (Left Column) */}
                  <div>
                    <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#111827", marginBottom: "20px" }}>
                      Deposit Details
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "14px", color: "#6b7280" }}>Property Value:</span>
                        <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                          {formatCurrencyTSA(propertyValue)}
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "14px", color: "#6b7280" }}>Deposit Percentage:</span>
                        <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                          {depositPercentage}%
                        </span>
                      </div>
                      <div style={{ 
                        display: "flex", 
                        justifyContent: "space-between", 
                        alignItems: "center",
                        padding: "12px",
                        backgroundColor: "#dbeafe",
                        borderRadius: "6px",
                        border: "1px solid #93c5fd"
                      }}>
                        <span style={{ fontSize: "16px", fontWeight: "600", color: "#1e3a8a" }}>
                          Security Deposit Amount:
                        </span>
                        <span style={{ fontSize: "20px", fontWeight: "700", color: "#1e3a8a" }}>
                          {formatCurrencyTSA(securityDepositAmount)}
                        </span>
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "14px", color: "#6b7280", marginBottom: "6px" }}>
                          Due Date
                        </label>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "10px 12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#f9fafb",
                          color: "#111827"
                        }}>
                          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M2 4H14V12H2V4Z"
                              stroke="#6b7280"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6 2V6M10 2V6M2 8H14"
                              stroke="#6b7280"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                          December 31, 2024
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Select Payment Method (Right Column) */}
                  <div>
                    <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#111827", marginBottom: "20px" }}>
                      Select Payment Method
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <label style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "16px",
                        border: paymentMethod === "upi" ? "2px solid #1e3a8a" : "1px solid #d1d5db",
                        borderRadius: "8px",
                        backgroundColor: paymentMethod === "upi" ? "#f0f9ff" : "white",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={paymentMethod === "upi"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          style={{ width: "18px", height: "18px", cursor: "pointer" }}
                        />
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M17 2H7C5.89543 2 5 2.89543 5 4V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V4C19 2.89543 18.1046 2 17 2Z"
                            stroke={paymentMethod === "upi" ? "#1e3a8a" : "#6b7280"}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 18H12.01"
                            stroke={paymentMethod === "upi" ? "#1e3a8a" : "#6b7280"}
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span style={{ fontSize: "14px", fontWeight: "500", color: "#111827", flex: 1 }}>
                          Pay by UPI
                        </span>
                      </label>

                      <label style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "16px",
                        border: paymentMethod === "card" ? "2px solid #1e3a8a" : "1px solid #d1d5db",
                        borderRadius: "8px",
                        backgroundColor: paymentMethod === "card" ? "#f0f9ff" : "white",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          style={{ width: "18px", height: "18px", cursor: "pointer" }}
                        />
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M2 8H22M4 16H20M3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8Z"
                            stroke={paymentMethod === "card" ? "#1e3a8a" : "#6b7280"}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span style={{ fontSize: "14px", fontWeight: "500", color: "#111827", flex: 1 }}>
                          Pay by Credit/Debit Card
                        </span>
                      </label>

                      <label style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "16px",
                        border: paymentMethod === "netbanking" ? "2px solid #1e3a8a" : "1px solid #d1d5db",
                        borderRadius: "8px",
                        backgroundColor: paymentMethod === "netbanking" ? "#f0f9ff" : "white",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="netbanking"
                          checked={paymentMethod === "netbanking"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          style={{ width: "18px", height: "18px", cursor: "pointer" }}
                        />
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M3 7H21M5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7M5 7C5 5.89543 5.89543 5 7 5H17C18.1046 5 19 5.89543 19 7M9 12H15"
                            stroke={paymentMethod === "netbanking" ? "#1e3a8a" : "#6b7280"}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span style={{ fontSize: "14px", fontWeight: "500", color: "#111827", flex: 1 }}>
                          Net Banking
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Pay Now Button */}
                <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={() => {
                      console.log("Processing payment", { amount: securityDepositAmount, method: paymentMethod });
                      setNotificationMessage("Security deposit payment processed successfully");
                      setShowNotification(true);
                    }}
                    style={{
                      padding: "14px 32px",
                      backgroundColor: "#1e3a8a",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontWeight: "600",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      transition: "background-color 0.2s"
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e40af")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#1e3a8a")}
                  >
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 1L3 4V8C3 11.866 8 15 8 15C8 15 13 11.866 13 8V4L8 1Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Pay Now - {formatCurrencyTSA(securityDepositAmount)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Toast Notification */}
      <ToastNotification
        show={showNotification}
        message={notificationMessage}
        type="success"
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
}

