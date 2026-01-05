"use client";

import { useState } from "react";
import PermissionWrapper from "@/components/PermissionWrapper";
import LegalCallPanel from "./LegalCallPanel";
import DocumentUploadModal from "@/components/DocumentUploadModal";

/**
 * LegalDecisionPanel Component
 * 
 * Panel for making the initial decision on whether a call is required
 * @param {Object} props
 * @param {string} props.callRequired - Current value: "yes", "no", or null
 * @param {Function} props.onCallRequiredChange - Callback when call requirement changes
 * @param {Function} props.onGrantClearance - Callback when granting legal clearance (no call)
 * @param {boolean} props.isFinalized - Whether the process is finalized
 * @param {Function} props.onShowToast - Callback to show toast notification
 * @param {Function} props.onBrtConfirmed - Callback when BRT confirms
 * @param {Function} props.onBusinessDecisionComplete - Callback when business decision is complete
 */
export default function LegalDecisionPanel({
  callRequired,
  onCallRequiredChange,
  onGrantClearance,
  isFinalized,
  onShowToast,
  onBrtConfirmed,
  onBusinessDecisionComplete,
}) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const handleCallRequiredChange = (value) => {
    if (isFinalized) return;
    onCallRequiredChange(value);
  };

  const handleGrantClearance = () => {
    if (isFinalized) return;
    onGrantClearance();
    if (onShowToast) {
      onShowToast("Legal clearance granted successfully", "success");
    }
  };

  const handleUploadDocuments = () => {
    setIsUploadModalOpen(true);
  };

  const handleUploadSubmit = (uploadedFiles) => {
    console.log("Legal documents uploaded:", uploadedFiles);
    setIsUploadModalOpen(false);
    if (onShowToast) {
      onShowToast("Legal documents uploaded successfully", "success");
    }
  };

  return (
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
            d="M10 6V10M10 14H10.01"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <h3 className="card-title">Legal Decision</h3>
      </div>
      <div style={{ padding: "20px" }}>
        <div className="form-group">
          <label className="form-label">Is Call Required?</label>
          <div style={{ display: "flex", gap: "24px", marginTop: "12px" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: isFinalized ? "not-allowed" : "pointer",
                opacity: isFinalized ? 0.6 : 1,
              }}
            >
              <input
                type="radio"
                name="callRequired"
                value="yes"
                checked={callRequired === "yes"}
                onChange={() => handleCallRequiredChange("yes")}
                disabled={isFinalized}
                style={{
                  width: "18px",
                  height: "18px",
                  cursor: isFinalized ? "not-allowed" : "pointer",
                }}
              />
              <span style={{ fontSize: "14px", fontWeight: "500" }}>Yes</span>
            </label>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: isFinalized ? "not-allowed" : "pointer",
                opacity: isFinalized ? 0.6 : 1,
              }}
            >
              <input
                type="radio"
                name="callRequired"
                value="no"
                checked={callRequired === "no"}
                onChange={() => handleCallRequiredChange("no")}
                disabled={isFinalized}
                style={{
                  width: "18px",
                  height: "18px",
                  cursor: isFinalized ? "not-allowed" : "pointer",
                }}
              />
              <span style={{ fontSize: "14px", fontWeight: "500" }}>No</span>
            </label>
          </div>
        </div>

        {callRequired === "no" && (
          <div style={{ marginTop: "24px" }}>
            <PermissionWrapper page="legalDueDiligence" action="approve">
              <button
                className="decision-button approve-button"
                onClick={handleGrantClearance}
                disabled={isFinalized}
                style={{
                  opacity: isFinalized ? 0.6 : 1,
                  cursor: isFinalized ? "not-allowed" : "pointer",
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
        )}

        {callRequired === "yes" && (
          <div style={{ marginTop: "24px" }}>
            <LegalCallPanel
              isFinalized={isFinalized}
              onShowToast={onShowToast}
              onBrtConfirmed={onBrtConfirmed}
              onBusinessDecisionComplete={onBusinessDecisionComplete}
            />
          </div>
        )}

        {/* Legal Documents Upload Section - Always show when a selection is made */}
        {callRequired && (callRequired === "yes" || callRequired === "no") && (
          <div style={{ 
            marginTop: "32px", 
            paddingTop: "24px", 
            borderTop: "2px solid #e5e7eb",
            backgroundColor: "#f9fafb",
            padding: "24px",
            borderRadius: "8px",
            marginLeft: "-20px",
            marginRight: "-20px",
            marginBottom: "-20px"
          }}>
            <div style={{ marginBottom: "16px" }}>
              <h4 style={{ 
                fontSize: "18px", 
                fontWeight: "700", 
                color: "#1e3a8a",
                marginBottom: "8px",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 2V8H20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Final Agreements
              </h4>
              <p style={{ 
                fontSize: "14px", 
                color: "#6b7280",
                margin: 0
              }}>
                Upload legal documents and final agreements for submission
              </p>
            </div>
            <button
              onClick={handleUploadDocuments}
              disabled={isFinalized}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 28px",
                backgroundColor: "#1e3a8a",
                color: "white",
                border: "none",
                borderRadius: "8px",
                fontSize: "15px",
                fontWeight: "600",
                cursor: isFinalized ? "not-allowed" : "pointer",
                opacity: isFinalized ? 0.6 : 1,
                transition: "all 0.2s",
                boxShadow: isFinalized ? "none" : "0 2px 4px rgba(30, 58, 138, 0.2)",
                width: "100%",
                justifyContent: "center"
              }}
              onMouseEnter={(e) => {
                if (!isFinalized) {
                  e.target.style.backgroundColor = "#1e40af";
                  e.target.style.boxShadow = "0 4px 8px rgba(30, 58, 138, 0.3)";
                  e.target.style.transform = "translateY(-1px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isFinalized) {
                  e.target.style.backgroundColor = "#1e3a8a";
                  e.target.style.boxShadow = "0 2px 4px rgba(30, 58, 138, 0.2)";
                  e.target.style.transform = "translateY(0)";
                }
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 10L12 15L17 10"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 15V3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Upload Legal Documents
            </button>
          </div>
        )}
      </div>

      {/* Document Upload Modal */}
      <DocumentUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSubmit={handleUploadSubmit}
      />
    </div>
  );
}

