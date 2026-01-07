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
  onGrantClearance,
  onRejectClearance,
  onBusinessDecisionComplete
}) {
  const router = useRouter();
  const SHARED_STORAGE_KEY = "legalBrtCallStatus_PROP-MIA-2024-002";
  const NOTES_STORAGE_KEY = "legalCallNotes_PROP-MIA-2024-002";
  const BUSINESS_APPROVAL_STORAGE_KEY = "legalShowBusinessApproval_PROP-MIA-2024-002";

  // Initialize from localStorage to check for saved status
  const [brtConfirmation, setBrtConfirmation] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(SHARED_STORAGE_KEY) || null;
    }
    return null;
  });

  // Listen for updates from other components
  useEffect(() => {
    const handleStatusUpdate = (event) => {
      let newValue = null;

      if (event.type === 'legalBrtStatusUpdate') {
        newValue = event.detail?.status;
      } else if (event.type === 'storage' && event.key === SHARED_STORAGE_KEY) {
        newValue = event.newValue;
      }

      if (newValue !== null && newValue !== undefined) {
        setBrtConfirmation(newValue);
      }
    };

    window.addEventListener('legalBrtStatusUpdate', handleStatusUpdate);
    window.addEventListener('storage', handleStatusUpdate);

    // Polling interval to ensure synchronization
    const intervalId = setInterval(() => {
      const current = localStorage.getItem(SHARED_STORAGE_KEY);
      if (current && current !== brtConfirmation) {
        setBrtConfirmation(current);
      }
    }, 1000);

    return () => {
      window.removeEventListener('legalBrtStatusUpdate', handleStatusUpdate);
      window.removeEventListener('storage', handleStatusUpdate);
      clearInterval(intervalId);
    };
  }, [brtConfirmation]); // Add dependency on brtConfirmation to avoid stale closures in interval if needed, though with functional state update it's better.



  const [legalCallNotes, setLegalCallNotes] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(NOTES_STORAGE_KEY) || "";
    }
    return "";
  });

  const [showBusinessApproval, setShowBusinessApproval] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(BUSINESS_APPROVAL_STORAGE_KEY) === "true";
    }
    return false;
  });

  // Save notes whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(NOTES_STORAGE_KEY, legalCallNotes);
    }
  }, [legalCallNotes]);

  const handleBrtConfirmation = (decision) => {
    if (isFinalized) return;
    setBrtConfirmation(decision);

    // Save to localStorage
    localStorage.setItem(SHARED_STORAGE_KEY, decision);

    // Dispatch custom event for real-time update
    window.dispatchEvent(new CustomEvent('legalBrtStatusUpdate', {
      detail: { status: decision }
    }));

    if (onShowToast) {
      const statusText = decision === "approved" ? "accepted" : "rejected";
      onShowToast(
        `BRT has ${statusText} of viewed document and called`,
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

    // Call parent handler to update overall status and isFinalized
    if (onGrantClearance) {
      onGrantClearance();
    }

    // Trigger business approval and persist
    setShowBusinessApproval(true);
    localStorage.setItem(BUSINESS_APPROVAL_STORAGE_KEY, "true");
  };

  const handleLegalRejection = () => {
    if (isFinalized || (brtConfirmation !== "rejected" && brtConfirmation !== "disapproved")) return;

    if (onShowToast) {
      onShowToast("Legal clearance rejected", "error");
    }

    // Call parent handler to update overall status and isFinalized
    if (onRejectClearance) {
      onRejectClearance();
    }
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
                {brtConfirmation === "approved" ? "BRT Approved the Call" : "BRT Rejected the Call"}
              </span>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: "16px", padding: "12px", border: "1px solid #e5e7eb", borderRadius: "6px", display: "flex", alignItems: "center", gap: "10px", backgroundColor: "#fff" }}>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#f59e0b" }}></div>
                <span style={{ fontSize: "14px", fontWeight: "500", color: "#374151" }}>Status: <strong>Pending Confirmation</strong></span>
              </div>
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
            </>
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
              {!isFinalized && brtConfirmation === "approved" && !showBusinessApproval && (
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
              )}
              {(isFinalized || showBusinessApproval) && brtConfirmation === "approved" && (
                <div style={{
                  marginTop: "16px",
                  padding: "12px",
                  backgroundColor: "#d1fae5",
                  color: "#065f46",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "600",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M16.7071 5.29289L8.70711 14.7071L3.29289 10.7071" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Legal Clearance Granted
                </div>
              )}

              {!isFinalized && (brtConfirmation === "rejected" || brtConfirmation === "disapproved") && (
                <button
                  className="decision-button reject-button"
                  onClick={handleLegalRejection}
                  style={{ marginTop: "16px" }}
                >
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="button-icon">
                    <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Register Legal Disapproval
                </button>
              )}

              {isFinalized && (brtConfirmation === "rejected" || brtConfirmation === "disapproved") && (
                <div style={{
                  marginTop: "16px",
                  padding: "12px",
                  backgroundColor: "#fee2e2",
                  color: "#991b1b",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "600",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px"
                }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Legal Clearance Rejected
                </div>
              )}
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

