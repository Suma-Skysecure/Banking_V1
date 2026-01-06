"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PermissionWrapper from "@/components/PermissionWrapper";

/**
 * LegalCallPanel Component
 * 
 * Panel for managing the legal call process when a call is required
 * @param {Object} props
 * @param {boolean} props.isFinalized - Whether the process is finalized
 * @param {Function} props.onShowToast - Callback to show toast notification
 * @param {Function} props.onBrtConfirmed - Callback when BRT confirms
 * @param {Function} props.onBusinessDecisionComplete - Callback when business decision is complete
 */
export default function LegalCallPanel({
  isFinalized,
  onShowToast,
  onBrtConfirmed,
  onBusinessDecisionComplete
}) {
  const router = useRouter();
  const [brtConfirmation, setBrtConfirmation] = useState(null);
  const [legalCallNotes, setLegalCallNotes] = useState("");
  const [showBusinessApproval, setShowBusinessApproval] = useState(false);

  // Poll/Listen for BRT Status updates
  useEffect(() => {
    const checkBrtStatus = () => {
      const requests = JSON.parse(localStorage.getItem("legalRequests") || "[]");
      // Demo: Check for ID "1" (Downtown Manhattan Branch)
      const target = requests.find(r => r.id === "1");
      if (target) {
        if (target.status === "Approved") {
          setBrtConfirmation("approved");
          if (onBrtConfirmed) onBrtConfirmed(true);
        } else if (target.status === "Rejected") {
          setBrtConfirmation("rejected");
        }
      }
    };

    checkBrtStatus();

    const handleStorageChange = (e) => {
      if (e.key === "legalRequests") {
        checkBrtStatus();
      }
    };

    // Listen for custom event triggered by BRTLegalSection
    const handleCustomUpdate = () => checkBrtStatus();

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("notification-update", handleCustomUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("notification-update", handleCustomUpdate);
    };
  }, [onBrtConfirmed]);

  const handleBrtConfirmation = (decision) => {
    if (isFinalized) return;
    setBrtConfirmation(decision);
    // ... rest of existing logic
    // Update localStorage to reflect this manual change too if needed, 
    // but typically this manual button is for the Legal User simulating it if BRT isn't available?
    // For this flow, we'll keep the manual override but it won't persist to 'legalRequests' unless we want it to.

    if (onShowToast) {
      onShowToast(
        `BRT confirmation ${decision === "approved" ? "approved" : "rejected"}`,
        decision === "approved" ? "success" : "error"
      );
    }
    if (onBrtConfirmed && decision === "approved") {
      onBrtConfirmed(true);
    }
  };

  const handleLegalClearance = () => {
    if (isFinalized || brtConfirmation !== "approved") return;
    if (onShowToast) {
      onShowToast("Legal clearance granted", "success");
    }
    // Trigger business approval
    setShowBusinessApproval(true);
  };

  return (
    <div>
      {/* BRT Confirmation Section */}
      <div
        className="business-details-card"
        style={{ marginBottom: "24px", backgroundColor: "#f9fafb" }}
      >
        <div className="card-header">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="card-icon"
          >
            <path
              d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M10 6V10M10 14H10.01"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <h3 className="card-title">BRT Confirmation on Call</h3>
        </div>
        <div style={{ padding: "20px" }}>
          {brtConfirmation ? (
            <div
              style={{
                padding: "16px",
                backgroundColor: brtConfirmation === "approved" ? "#d1fae5" : "#fee2e2",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                style={{
                  color: brtConfirmation === "approved" ? "#10b981" : "#ef4444",
                }}
              >
                {brtConfirmation === "approved" ? (
                  <path
                    d="M16.7071 5.29289C17.0976 5.68342 17.0976 6.31658 16.7071 6.70711L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071L3.29289 10.7071C2.90237 10.3166 2.90237 9.68342 3.29289 9.29289C3.68342 8.90237 4.31658 8.90237 4.70711 9.29289L8 12.5858L15.2929 5.29289C15.6834 4.90237 16.3166 4.90237 16.7071 5.29289Z"
                    fill="currentColor"
                  />
                ) : (
                  <path
                    d="M5 5L15 15M15 5L5 15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                )}
              </svg>
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: brtConfirmation === "approved" ? "#065f46" : "#991b1b",
                }}
              >
                BRT {brtConfirmation === "approved" ? "Approved" : "Rejected"}
              </span>
            </div>
          ) : (
            <PermissionWrapper page="legalDueDiligence" action="approve">
              <div className="decision-actions">
                <button
                  className="decision-button reject-button"
                  onClick={() => handleBrtConfirmation("rejected")}
                  disabled={isFinalized}
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
                  Reject
                </button>
                <button
                  className="decision-button approve-button"
                  onClick={() => handleBrtConfirmation("approved")}
                  disabled={isFinalized}
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
                  Approve
                </button>
              </div>
            </PermissionWrapper>
          )}
        </div>
      </div>

      {/* Legal Clearance / Legal Call Section */}
      {brtConfirmation === "approved" && (
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
                d="M3 4C3 3.44772 3.44772 3 4 3H16C16.5523 3 17 3.44772 17 4V16C17 16.5523 16.5523 17 16 17H4C3.44772 17 3 16.5523 3 16V4Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 8L10 11L13 8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className="card-title">Legal Clearance / Legal Call</h3>
          </div>
          <div style={{ padding: "20px" }}>
            <div className="form-group">
              <label htmlFor="legalCallNotes" className="form-label">
                Legal Call Notes
              </label>
              <textarea
                id="legalCallNotes"
                className="review-comments-textarea"
                placeholder="Enter notes from the legal call..."
                value={legalCallNotes}
                onChange={(e) => setLegalCallNotes(e.target.value)}
                disabled={isFinalized}
                rows={6}
              />
            </div>

            <PermissionWrapper page="legalDueDiligence" action="approve">
              <button
                className="decision-button approve-button"
                onClick={handleLegalClearance}
                disabled={isFinalized || !legalCallNotes.trim()}
                style={{
                  marginTop: "16px",
                  opacity: isFinalized || !legalCallNotes.trim() ? 0.6 : 1,
                  cursor:
                    isFinalized || !legalCallNotes.trim()
                      ? "not-allowed"
                      : "pointer",
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
                Grant Legal Clearance
              </button>
            </PermissionWrapper>
          </div>
        </div>
      )}

      {/* Business Decision Section - Trigger BusinessApproval */}
      {showBusinessApproval && (
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
                d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M9 6L11 8L9 10M11 6L9 8L11 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3 className="card-title">Business Decision on Legal Call</h3>
          </div>
          <div style={{ padding: "20px" }}>
            <div style={{ marginBottom: "16px" }}>
              <p style={{ fontSize: "14px", color: "#6b7280", marginBottom: "16px" }}>
                Please proceed to business approval for the legal call decision.
              </p>
              <button
                className="decision-button approve-button"
                onClick={() => router.push("/business-approval")}
                style={{ width: "100%" }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="button-icon"
                >
                  <path
                    d="M10 2L12.09 8.26L18 9.27L13 14.14L14.18 20.02L10 16.77L5.82 20.02L7 14.14L2 9.27L7.91 8.26L10 2Z"
                    fill="currentColor"
                  />
                </svg>
                Proceed to Business Approval
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

