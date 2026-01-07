"use client";

import { useState, useEffect } from "react";
import PermissionWrapper from "@/components/PermissionWrapper";
import LegalCallPanel from "./LegalCallPanel";
import DocumentUploadModal from "@/components/DocumentUploadModal";
import { useNotifications } from "@/contexts/NotificationContext";

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
  onRejectClearance,
  isFinalized,
  onShowToast,
  onBrtConfirmed,
  onBusinessDecisionComplete,
  onSubmitted,
}) {
  const { createNotification } = useNotifications();
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);



  const handleCallRequiredChange = (value) => {
    if (isFinalized) return;

    // Check if value is actually changing to avoid unnecessary resets
    if (value === callRequired) return;

    onCallRequiredChange(value);

    if (value === 'yes') {
      // Reset any previous BRT confirmation/rejection only if changing from 'no' or null
      // Do not reset if we are just re-initializing or if it was already yes (though the guard above handles that)
      const SHARED_STORAGE_KEY = "legalBrtCallStatus_PROP-MIA-2024-002";
      // Commented out to prevent losing status on toggle, as per user request for persistence
      // localStorage.removeItem(SHARED_STORAGE_KEY);

      createNotification(
        "Legal Team has requested for a call.",
        "warning",
        "/brt-details",
        "BRT"
      );
    }
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

    // Convert uploaded files to the format expected by LegalDocumentsView
    const formattedDocuments = uploadedFiles.map((fileObj, index) => {
      const file = fileObj.file || fileObj;
      return {
        id: fileObj.id || `doc-${Date.now()}-${index}`,
        name: fileObj.name || file.name?.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " "),
        fileName: file.name || fileObj.fileName,
        uploadDate: new Date().toISOString().split('T')[0],
        size: file.size || fileObj.size || 0,
        type: file.type || fileObj.type || "application/pdf",
        status: "Verified",
        data: fileObj.data || null // Base64 data if available
      };
    });

    // Get existing documents from localStorage
    const existingDocuments = JSON.parse(localStorage.getItem("uploadedLegalDocuments") || "[]");

    // Merge new documents with existing ones (avoid duplicates)
    const allDocuments = [...existingDocuments];
    formattedDocuments.forEach(newDoc => {
      const exists = allDocuments.some(existing => existing.id === newDoc.id || existing.fileName === newDoc.fileName);
      if (!exists) {
        allDocuments.push(newDoc);
      }
    });

    // Save to localStorage
    localStorage.setItem("uploadedLegalDocuments", JSON.stringify(allDocuments));

    // Dispatch custom events
    window.dispatchEvent(new CustomEvent('legalDocumentsUpdated'));

    setIsUploadModalOpen(false);
    if (onShowToast) {
      onShowToast(`Successfully uploaded ${uploadedFiles.length} legal document(s). Please click 'Submit' to finalize.`, "success");
    }
  };

  const handleSubmit = () => {
    // Get documents to include in submission
    const allDocuments = JSON.parse(localStorage.getItem("uploadedLegalDocuments") || "[]");

    if (allDocuments.length === 0) {
      if (onShowToast) onShowToast("No documents uploaded to submit.", "error");
      return;
    }

    // Save branch status for Agreement Execution
    const submittedBranch = {
      id: "PROP-MIA-2024-002",
      name: "Downtown Arts Plaza",
      location: "Miami, FL 33132",
      status: "Ready for Agreement Registration",
      submittedDate: new Date().toISOString(),
      documents: allDocuments
    };

    // Get existing branches or init empty array
    const existingBranches = JSON.parse(localStorage.getItem("agreementReadyBranches") || "[]");
    const updatedBranches = existingBranches.filter(b => b.id !== submittedBranch.id);
    updatedBranches.push(submittedBranch);
    localStorage.setItem("agreementReadyBranches", JSON.stringify(updatedBranches));

    // Dispatch custom events
    window.dispatchEvent(new Event('agreementBranchesUpdated'));

    setIsSubmitted(true);
    if (onSubmitted) onSubmitted(true);

    if (onShowToast) {
      onShowToast("Submitted to Agreement Execution", "success");
    }
  };

  const handleViewDocuments = () => {
    // Scroll to the Legal Documents section
    const legalDocumentsSection = document.querySelector('[data-section="legal-documents"]');

    if (legalDocumentsSection) {
      legalDocumentsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Add a slight highlight effect
      legalDocumentsSection.style.transition = 'box-shadow 0.3s';
      legalDocumentsSection.style.boxShadow = '0 0 0 3px rgba(30, 58, 138, 0.3)';
      setTimeout(() => {
        legalDocumentsSection.style.boxShadow = '';
      }, 2000);
    } else {
      // Fallback: scroll to any element with "Legal Documents" text
      const elements = Array.from(document.querySelectorAll('*')).filter(el =>
        el.textContent && el.textContent.includes('Legal Documents')
      );
      if (elements.length > 0) {
        elements[0].scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
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
              {!isFinalized ? (
                <button
                  className="decision-button approve-button"
                  onClick={handleGrantClearance}
                  style={{
                    cursor: "pointer",
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
              ) : (
                <div style={{
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
            </PermissionWrapper>
          </div>
        )}

        {callRequired === "yes" && (
          <div style={{ marginTop: "24px" }}>
            <LegalCallPanel
              isFinalized={isFinalized}
              onShowToast={onShowToast}
              onBrtConfirmed={onBrtConfirmed}
              onGrantClearance={onGrantClearance}
              onRejectClearance={onRejectClearance}
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
            <div style={{ display: "flex", gap: "12px", width: "100%" }}>
              <button
                onClick={handleUploadDocuments}
                disabled={isFinalized || isSubmitted}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "14px 28px",
                  backgroundColor: (isFinalized || isSubmitted) ? "#9ca3af" : "#1e3a8a",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: (isFinalized || isSubmitted) ? "not-allowed" : "pointer",
                  opacity: (isFinalized || isSubmitted) ? 0.6 : 1,
                  transition: "all 0.2s",
                  boxShadow: (isFinalized || isSubmitted) ? "none" : "0 2px 4px rgba(30, 58, 138, 0.2)",
                  flex: 1,
                  justifyContent: "center"
                }}
                onMouseEnter={(e) => {
                  if (!isFinalized && !isSubmitted) {
                    e.target.style.backgroundColor = "#1e40af";
                    e.target.style.boxShadow = "0 4px 8px rgba(30, 58, 138, 0.3)";
                    e.target.style.transform = "translateY(-1px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isFinalized && !isSubmitted) {
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
                {isSubmitted ? "Documents Submitted" : "Upload Legal Documents"}
              </button>

              {!isSubmitted && (
                <button
                  onClick={handleSubmit}
                  disabled={isFinalized}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "14px 28px",
                    backgroundColor: "#f59e0b",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "15px",
                    fontWeight: "600",
                    cursor: isFinalized ? "not-allowed" : "pointer",
                    transition: "all 0.2s",
                    boxShadow: "0 2px 4px rgba(245, 158, 11, 0.2)",
                    flex: 1,
                    justifyContent: "center"
                  }}
                  onMouseEnter={(e) => {
                    if (!isFinalized) {
                      e.target.style.backgroundColor = "#d97706";
                      e.target.style.boxShadow = "0 4px 8px rgba(245, 158, 11, 0.3)";
                      e.target.style.transform = "translateY(-1px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isFinalized) {
                      e.target.style.backgroundColor = "#f59e0b";
                      e.target.style.boxShadow = "0 2px 4px rgba(245, 158, 11, 0.2)";
                      e.target.style.transform = "translateY(0)";
                    }
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12L10 17L20 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Submit to Execution
                </button>
              )}

              <button
                onClick={handleViewDocuments}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  padding: "14px 28px",
                  backgroundColor: "#10b981",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "15px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  boxShadow: "0 2px 4px rgba(16, 185, 129, 0.2)",
                  flex: 1,
                  justifyContent: "center"
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#059669";
                  e.target.style.boxShadow = "0 4px 8px rgba(16, 185, 129, 0.3)";
                  e.target.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#10b981";
                  e.target.style.boxShadow = "0 2px 4px rgba(16, 185, 129, 0.2)";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                View Documents
              </button>
            </div>
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

