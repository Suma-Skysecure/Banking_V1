"use client";

import { useState } from "react";

/**
 * Layout Design Approval Component
 * Reusable component for approving or rejecting layout designs
 */
export default function LayoutDesignApproval({
  totalCost = 473000 * 83.5, // Converted from USD to INR
  designStatus = "Pending",
  submittedBy = "Alex Thompson - Design Lead",
  submissionDate = "December 23, 2024",
  specifications = [
    "Modern open-plan layout design",
    "Energy-efficient lighting systems",
    "Premium finishing materials",
    "Flexible workspace configurations",
    "Compliance with local building codes"
  ]
}) {
  const [comments, setComments] = useState("");
  const [currentStatus, setCurrentStatus] = useState("Pending");

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleApprove = () => {
    setCurrentStatus("Approved");
    console.log("Design approved", { comments });
    // Handle approval logic here
  };

  const handleReject = () => {
    setCurrentStatus("Rejected");
    console.log("Design rejected", { comments });
    // Handle rejection logic here
  };

  const handleUpdateDecision = () => {
    console.log("Updating decision", { status: currentStatus, comments });
    // Handle update decision logic here
  };

  return (
    <div className="business-details-card" style={{ marginTop: "24px" }}>
      {/* Header */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        gap: "12px", 
        marginBottom: "24px",
        paddingBottom: "16px",
        borderBottom: "1px solid #e5e7eb"
      }}>
        <div style={{
          width: "32px",
          height: "32px",
          borderRadius: "6px",
          backgroundColor: "#1e3a8a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path
              d="M13 4L6 11L3 8"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#1e3a8a", margin: 0 }}>
          Layout Design Approval
        </h2>
      </div>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "1fr 1fr", 
        gap: "24px",
        padding: "0 20px 20px 20px"
      }}>
        {/* Left Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Design Summary Card */}
          <div style={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            padding: "20px",
            border: "1px solid #e5e7eb"
          }}>
            <h3 style={{
              fontSize: "16px",
              fontWeight: "700",
              color: "#111827",
              marginBottom: "16px",
              marginTop: 0
            }}>
              Design Summary
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "14px", color: "#6b7280" }}>Total Layout Cost:</span>
                <span style={{ fontSize: "16px", fontWeight: "600", color: "#10b981" }}>
                  {formatCurrency(totalCost)}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "14px", color: "#6b7280" }}>Design Status:</span>
                <span style={{ 
                  fontSize: "16px", 
                  fontWeight: "600", 
                  color: currentStatus === "Approved" ? "#10b981" : currentStatus === "Rejected" ? "#ef4444" : "#f59e0b"
                }}>
                  {currentStatus}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "14px", color: "#6b7280" }}>Submitted By:</span>
                <span style={{ fontSize: "14px", fontWeight: "500", color: "#111827" }}>
                  {submittedBy}
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "14px", color: "#6b7280" }}>Submission Date:</span>
                <span style={{ fontSize: "14px", fontWeight: "500", color: "#111827" }}>
                  {submissionDate}
                </span>
              </div>
            </div>
          </div>

          {/* Design Specifications Card */}
          <div style={{
            backgroundColor: "#dbeafe",
            borderRadius: "8px",
            padding: "20px",
            border: "1px solid #93c5fd"
          }}>
            <h3 style={{
              fontSize: "16px",
              fontWeight: "700",
              color: "#1e3a8a",
              marginBottom: "16px",
              marginTop: 0
            }}>
              Design Specifications
            </h3>
            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "column",
              gap: "10px"
            }}>
              {specifications.map((spec, index) => (
                <li key={index} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  fontSize: "14px",
                  color: "#374151"
                }}>
                  <span style={{ color: "#1e40af", marginTop: "4px" }}>•</span>
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Action Buttons */}
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={handleApprove}
              style={{
                flex: 1,
                padding: "12px 20px",
                backgroundColor: "#10b981",
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
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#059669")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#10b981")}
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
              Approve Design
            </button>
            <button
              onClick={handleReject}
              style={{
                flex: 1,
                padding: "12px 20px",
                backgroundColor: "#ef4444",
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
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#dc2626")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#ef4444")}
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
              Reject Design
            </button>
          </div>

          {/* Comments Section */}
          <div>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              color: "#374151",
              marginBottom: "8px"
            }}>
              Comments
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Add your approval or rejection comments here..."
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

          {/* Update Decision Button */}
          <button
            onClick={handleUpdateDecision}
            style={{
              width: "100%",
              padding: "12px 20px",
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
                strokeLinecap="round"
              />
              <circle
                cx="8"
                cy="8"
                r="3"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
            Update Decision
          </button>
        </div>
      </div>
    </div>
  );
}

