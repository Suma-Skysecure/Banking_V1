"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import ToastNotification from "@/components/ToastNotification";
import PageHeader from "@/components/PageHeader";
import DashboardHeader from "@/components/DashboardHeader";
import PropertySummaryCard from "@/components/PropertySummaryCard";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/postLOIActivities.css";

export default function StampDutyPaymentApproval() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [approvalStatus, setApprovalStatus] = useState("pending");
  const [comments, setComments] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  // Property and payment data
  const propertyValue = 5800000;
  const stampDutyRate = 0.7;
  const totalStampDuty = (propertyValue * stampDutyRate) / 100;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount * 83.5);
  };

  const handleApprove = () => {
    setApprovalStatus("approved");
    setToastMessage("Approved stamp duty and sent to Agreement execution team");
    setToastType("success");
    setShowToast(true);
  };

  const handleReject = () => {
    setApprovalStatus("rejected");
    setToastMessage("Stamp duty payment rejected");
    setToastType("error");
    setShowToast(true);
  };

  const handleUpdate = () => {
    setToastMessage("Approval status updated successfully");
    setToastType("info");
    setShowToast(true);
    console.log("Updating approval status", { status: approvalStatus, comments });
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="dashboard-main">
          <div className="main-content">
            <PageHeader
              title="Stamp Duty Payment Approval"
              subtitle="Review and approve stamp duty payment for property acquisition"
            />

            {/* Property Summary Card */}
            <PropertySummaryCard
              propertyName="Downtown Arts Plaza"
              address="1450 Biscayne Boulevard, Miami, FL 33132"
              propertyId="PROP-MIA-2024-002"
              propertyValue={formatCurrency(propertyValue)}
              badgeText="Pending Payment Approval"
              badgeIcon="clock"
              rightLabel="Property Value"
              showValue={true}
              mapPinColor="#ef4444"
            />

            {/* Stamp Duty Payment Details */}
            <div className="business-details-card" style={{ marginBottom: "24px" }}>
              <div className="card-header">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="card-icon"
                >
                  <path
                    d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM9 13L5 9L6.41421 7.58579L9 10.1716L13.5858 5.58579L15 7L9 13Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
                <h3 className="card-title">Stamp Duty Payment Details</h3>
              </div>
              <div style={{ padding: "20px" }}>
                {/* Calculation Breakdown */}
                <div style={{ marginBottom: "24px" }}>
                  <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#111827", marginBottom: "16px", marginTop: 0 }}>
                    Calculation Breakdown
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Property Value:</span>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                        {formatCurrency(propertyValue)}
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
                        {formatCurrency(totalStampDuty)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div style={{ marginBottom: "24px" }}>
                  <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#111827", marginBottom: "16px", marginTop: 0 }}>
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
                        backgroundColor: "#d1fae5",
                        color: "#065f46",
                        borderRadius: "20px",
                        fontSize: "14px",
                        fontWeight: "500"
                      }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Payment Method:</span>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                        Electronic Transfer
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Paying Authority:</span>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                        Florida Department of Revenue
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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

            {/* Account Reference */}
            <div className="business-details-card" style={{ marginTop: "24px" }}>
              <div className="card-header">
                <h3 className="card-title">Account Reference</h3>
              </div>
              <div style={{ padding: "20px" }}>
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

            {/* Approval Actions and Summary Section */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              marginTop: "24px"
            }}>
              {/* Approval Actions */}
              <div className="business-details-card">
                <div className="card-header">
                  <h3 className="card-title">Approval Actions</h3>
                </div>
                <div style={{ padding: "20px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {/* Action Buttons */}
                    <div style={{ display: "flex", gap: "12px" }}>
                      <button
                        onClick={handleApprove}
                        style={{
                          flex: 1,
                          padding: "12px 20px",
                          backgroundColor: approvalStatus === "approved" ? "#059669" : "#10b981",
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
                          transition: "background-color 0.2s",
                          boxShadow: approvalStatus === "approved" ? "0 2px 4px rgba(0,0,0,0.1)" : "none"
                        }}
                        onMouseEnter={(e) => {
                          if (approvalStatus !== "approved") {
                            e.target.style.backgroundColor = "#059669";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (approvalStatus !== "approved") {
                            e.target.style.backgroundColor = "#10b981";
                          }
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M13 4L6 11L3 8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Approve Stamp Duty by Account
                      </button>
                      <button
                        onClick={handleReject}
                        style={{
                          flex: 1,
                          padding: "12px 20px",
                          backgroundColor: approvalStatus === "rejected" ? "#dc2626" : "#ef4444",
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
                          transition: "background-color 0.2s",
                          boxShadow: approvalStatus === "rejected" ? "0 2px 4px rgba(0,0,0,0.1)" : "none"
                        }}
                        onMouseEnter={(e) => {
                          if (approvalStatus !== "rejected") {
                            e.target.style.backgroundColor = "#dc2626";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (approvalStatus !== "rejected") {
                            e.target.style.backgroundColor = "#ef4444";
                          }
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M12 4L4 12M4 4L12 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Reject Stamp Duty by Account
                      </button>
                    </div>

                    {/* Comments & Notes */}
                    <div>
                      <label style={{
                        display: "block",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#374151",
                        marginBottom: "8px"
                      }}>
                        Comments & Notes
                      </label>
                      <textarea
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="Add your comments regarding this stamp duty payment approval/rejection..."
                        style={{
                          width: "100%",
                          minHeight: "120px",
                          padding: "12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                          backgroundColor: "white",
                          color: "#111827",
                          resize: "vertical",
                          fontFamily: "inherit"
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Approval Summary */}
              <div className="business-details-card">
                <div className="card-header">
                  <h3 className="card-title">Approval Summary</h3>
                </div>
                <div style={{ padding: "20px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Approval Status:</span>
                      <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 12px",
                        backgroundColor: approvalStatus === "approved" ? "#d1fae5" : approvalStatus === "rejected" ? "#fee2e2" : "#fef3c7",
                        color: approvalStatus === "approved" ? "#065f46" : approvalStatus === "rejected" ? "#991b1b" : "#92400e",
                        borderRadius: "20px",
                        fontSize: "14px",
                        fontWeight: "500"
                      }}>
                        {approvalStatus === "approved" ? "Approved" : approvalStatus === "rejected" ? "Rejected" : "Pending"}
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Amount:</span>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                        {formatCurrency(totalStampDuty)}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Reviewed By:</span>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                        {user?.name || "James Wilson"}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Review Date:</span>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                        -
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Update Approval Status Button */}
            <div style={{ marginTop: "24px" }}>
              <button
                onClick={handleUpdate}
                style={{
                  width: "100%",
                  padding: "14px 20px",
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
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
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
                Update Approval Status
              </button>
            </div>
          </div>
        </main>
      </div>

      <ToastNotification
        show={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

