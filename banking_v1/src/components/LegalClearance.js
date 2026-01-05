"use client";

import { useState } from "react";
import LegalDocumentsView from "@/components/legal/LegalDocumentsView";
import ToastNotification from "@/components/ToastNotification";
import "@/css/businessApproval.css";

/**
 * LegalClearance Component
 * 
 * BRT Legal Clearance dashboard view - Review documents and approve/disapprove
 */
export default function LegalClearance() {
  const [approvalStatus, setApprovalStatus] = useState(null); // null, "approved", "disapproved"
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");
  const [callConfirmed, setCallConfirmed] = useState(false);

  const handleApprove = () => {
    setApprovalStatus("approved");
    setCallConfirmed(true);
    setNotificationMessage("Legal clearance approved and call confirmed successfully");
    setNotificationType("success");
    setShowNotification(true);
    console.log("Legal clearance approved");
  };

  const handleDisapprove = () => {
    setApprovalStatus("disapproved");
    setCallConfirmed(false);
    setNotificationMessage("Legal clearance disapproved");
    setNotificationType("error");
    setShowNotification(true);
    console.log("Legal clearance disapproved");
  };

  return (
    <div>
      {/* Documents Section */}
      <LegalDocumentsView />

      {/* Approval Section */}
      <div className="business-details-card" style={{ marginBottom: "24px" }}>
        <div className="card-header">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            className="card-icon"
          >
            <path
              d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h3 className="card-title">Legal Clearance Decision</h3>
        </div>
        <div style={{ padding: "20px" }}>
          <p style={{ color: "#6b7280", fontSize: "14px", marginBottom: "24px" }}>
            Review the uploaded legal documents above. If everything is in order, approve to confirm the call. Otherwise, disapprove.
          </p>

          {/* Status Display */}
          {approvalStatus && (
            <div style={{ 
              marginBottom: "24px",
              padding: "16px",
              borderRadius: "8px",
              backgroundColor: approvalStatus === "approved" ? "#d1fae5" : "#fee2e2",
              border: `1px solid ${approvalStatus === "approved" ? "#10b981" : "#ef4444"}`,
              display: "flex",
              alignItems: "center",
              gap: "12px"
            }}>
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                {approvalStatus === "approved" ? (
                  <path
                    d="M13 4L6 11L3 8"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : (
                  <path
                    d="M5 5L11 11M11 5L5 11"
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>
              <span style={{ 
                fontSize: "14px", 
                fontWeight: "600",
                color: approvalStatus === "approved" ? "#065f46" : "#991b1b"
              }}>
                {approvalStatus === "approved" 
                  ? "Legal Clearance Approved - Call Confirmed" 
                  : "Legal Clearance Disapproved"}
              </span>
            </div>
          )}

          {/* Decision Buttons */}
          <div className="decision-actions">
            <button
              className="decision-button reject-button"
              onClick={handleDisapprove}
              disabled={approvalStatus === "approved"}
              style={{
                opacity: approvalStatus === "approved" ? 0.5 : 1,
                cursor: approvalStatus === "approved" ? "not-allowed" : "pointer",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="button-icon"
              >
                <path
                  d="M5 5L15 15M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              Disapprove
            </button>
            <button
              className="decision-button approve-button"
              onClick={handleApprove}
              disabled={approvalStatus === "disapproved"}
              style={{
                opacity: approvalStatus === "disapproved" ? 0.5 : 1,
                cursor: approvalStatus === "disapproved" ? "not-allowed" : "pointer",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="button-icon"
              >
                <path
                  d="M16.7071 5.29289C17.0976 5.68342 17.0976 6.31658 16.7071 6.70711L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071L3.29289 10.7071C2.90237 10.3166 2.90237 9.68342 3.29289 9.29289C3.68342 8.90237 4.31658 8.90237 4.70711 9.29289L8 12.5858L15.2929 5.29289C15.6834 4.90237 16.3166 4.90237 16.7071 5.29289Z"
                  fill="currentColor"
                />
              </svg>
              Approve & Confirm Call
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <ToastNotification
        show={showNotification}
        message={notificationMessage}
        type={notificationType}
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
}

