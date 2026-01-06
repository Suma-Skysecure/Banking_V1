"use client";

import { useState, useEffect } from "react";
import ToastNotification from "@/components/ToastNotification";
import "@/css/businessApproval.css";

/**
 * BRTLegalSection Component
 * 
 * Legal Clearance Activities section for BRT Dashboard
 */
import LegalDocumentsView from "@/components/legal/LegalDocumentsView";

// ... existing imports

export default function BRTLegalSection() {
  const SHARED_STORAGE_KEY = "legalBrtCallStatus_PROP-MIA-2024-002";
  const ACTIVITY_ID = "1";

  // Initialize from localStorage
  const [approvalStatus, setApprovalStatus] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(SHARED_STORAGE_KEY);
      // Map the single shared status to the specific activity ID
      return saved ? { [ACTIVITY_ID]: saved } : {};
    }
    return {};
  });

  // State for IT Assessment Display
  const [itAssessmentData, setItAssessmentData] = useState(null);
  const [itApprovalData, setItApprovalData] = useState(null);

  // Load IT Assessment Data
  useEffect(() => {
    const loadITData = () => {
      if (typeof window === 'undefined') return;
      const storedApprovals = JSON.parse(localStorage.getItem('itApprovals') || "[]");
      const approvedIT = storedApprovals.find(app => (app.branchId === 1 || app.branchId === "1") && app.status === 'approved');

      if (approvedIT) {
        setItApprovalData(approvedIT);
        const storedAssessments = JSON.parse(localStorage.getItem('itAssessments') || "[]");
        const assessment = storedAssessments.find(assess => (assess.branch.id === 1 || assess.branch.id === "1"));
        if (assessment) {
          setItAssessmentData(assessment);
        }
      } else {
        setItApprovalData(null);
        setItAssessmentData(null);
      }
    };

    loadITData();
    window.addEventListener('storage', loadITData);
    return () => window.removeEventListener('storage', loadITData);
  }, []);

  // Listen for updates
  useEffect(() => {
    const handleStatusUpdate = (event) => {
      let newValue = null;
      if (event.type === 'legalBrtStatusUpdate') {
        newValue = event.detail?.status;
      } else if (event.type === 'storage' && event.key === SHARED_STORAGE_KEY) {
        newValue = event.newValue;
      }

      if (newValue !== null && newValue !== undefined) {
        setApprovalStatus(prev => ({ ...prev, [ACTIVITY_ID]: newValue }));
      }
    };

    window.addEventListener('legalBrtStatusUpdate', handleStatusUpdate);
    window.addEventListener('storage', handleStatusUpdate);

    // Initial check
    const current = localStorage.getItem(SHARED_STORAGE_KEY);
    if (current) {
      setApprovalStatus(prev => ({ ...prev, [ACTIVITY_ID]: current }));
    }

    return () => {
      window.removeEventListener('legalBrtStatusUpdate', handleStatusUpdate);
      window.removeEventListener('storage', handleStatusUpdate);
    };
  }, []);

  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");

  // Sample legal clearance activities data
  const legalActivities = [
    {
      id: "1",
      propertyName: "ABC Mall",
      propertyAddress: "123 Main St, Springfield, TX",
      document: "Legal.pdf",
      documentId: "legal-doc-1",
    },
  ];

  const getInitials = (name) => {
    if (!name) return "?";
    const words = name.split(" ");
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleApprove = (activityId) => {
    const status = "approved";
    setApprovalStatus((prev) => ({ ...prev, [activityId]: status }));
    localStorage.setItem(SHARED_STORAGE_KEY, status);
    window.dispatchEvent(new CustomEvent('legalBrtStatusUpdate', { detail: { status } }));

    setNotificationMessage("Legal clearance approved. Notification sent to Legal team.");
    setNotificationType("success");
    setShowNotification(true);
    console.log("Approved legal clearance for:", activityId);
  };

  const handleDisapprove = (activityId) => {
    const status = "rejected"; // standardized to "rejected"
    setApprovalStatus((prev) => ({ ...prev, [activityId]: status }));
    localStorage.setItem(SHARED_STORAGE_KEY, status);
    window.dispatchEvent(new CustomEvent('legalBrtStatusUpdate', { detail: { status } }));

    setNotificationMessage("Legal clearance disapproved. Notification sent to Legal team.");
    setNotificationType("error");
    setShowNotification(true);
    console.log("Disapproved legal clearance for:", activityId);
  };

  const handleViewDocument = (document, e) => {
    e.stopPropagation();
    console.log("Viewing document:", document);
    // Create a dummy PDF blob and open it in a new tab
    const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 <<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
>>
>>
>>
endobj
4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
100 700 Td
(Legal Document) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000294 00000 n 
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
398
%%EOF`;

    const blob = new Blob([pdfContent], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    // Clean up the URL after a delay
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <>
      <div className="business-details-card" style={{ marginBottom: "24px" }}>
        {/* ... existing table card ... */}
        <div className="card-header">
          {/* ... header ... */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="card-icon">
            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h3 className="card-title">Legal Clearance Activities</h3>
        </div>
        <div style={{ padding: "20px", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            {/* ... existing table code ... */}
            <thead>
              <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>PROPERTY DETAILS</th>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>DOCUMENT</th>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>VIEW DOCUMENT</th>
                <th style={{ padding: "16px", textAlign: "left", fontSize: "12px", fontWeight: "700", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em" }}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {legalActivities.map((activity) => {
                const status = approvalStatus[activity.id] || null;
                const isApproved = status === "approved";
                const isDisapproved = status === "disapproved" || status === "rejected";

                return (
                  <tr key={activity.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: "16px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{ width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "#3b82f6", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: "600", flexShrink: 0 }}>
                          {getInitials(activity.propertyName)}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: "14px", fontWeight: "600", color: "#111827", marginBottom: "4px" }}>{activity.propertyName}</div>
                          <div style={{ fontSize: "12px", color: "#6b7280" }}>{activity.propertyAddress}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <div style={{ fontSize: "14px", color: "#111827", fontWeight: "500" }}>{activity.document}</div>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <button onClick={(e) => handleViewDocument(activity, e)} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "6px", fontSize: "13px", fontWeight: "600", cursor: "pointer", transition: "background-color 0.2s" }} onMouseEnter={(e) => { e.target.style.backgroundColor = "#2563eb"; }} onMouseLeave={(e) => { e.target.style.backgroundColor = "#3b82f6"; }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 4C4 4 1.33333 6.66667 1 8C1.33333 9.33333 4 12 8 12C12 12 14.6667 9.33333 15 8C14.6667 6.66667 12 4 8 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                        View
                      </button>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                        <button onClick={() => handleDisapprove(activity.id)} disabled={isApproved} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", backgroundColor: isApproved ? "#f3f4f6" : "#ef4444", color: isApproved ? "#9ca3af" : "white", border: "none", borderRadius: "6px", fontSize: "13px", fontWeight: "600", cursor: isApproved ? "not-allowed" : "pointer", transition: "background-color 0.2s", opacity: isApproved ? 0.6 : 1 }} onMouseEnter={(e) => { if (!isApproved) { e.target.style.backgroundColor = "#dc2626"; } }} onMouseLeave={(e) => { if (!isApproved) { e.target.style.backgroundColor = "#ef4444"; } }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          </svg>
                          Disapprove
                        </button>
                        <button onClick={() => handleApprove(activity.id)} disabled={isDisapproved} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", backgroundColor: isDisapproved ? "#f3f4f6" : "#10b981", color: isDisapproved ? "#9ca3af" : "white", border: "none", borderRadius: "6px", fontSize: "13px", fontWeight: "600", cursor: isDisapproved ? "not-allowed" : "pointer", transition: "background-color 0.2s", opacity: isDisapproved ? 0.6 : 1 }} onMouseEnter={(e) => { if (!isDisapproved) { e.target.style.backgroundColor = "#059669"; } }} onMouseLeave={(e) => { if (!isDisapproved) { e.target.style.backgroundColor = "#10b981"; } }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          Approve
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* NEW: IT Assessment Section (Only if approved) */}
      {itApprovalData && (
        <div style={{ marginBottom: "24px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "16px"
          }}>
            <div style={{
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              backgroundColor: "#dbeafe",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 17V11M9 11C9 10.4477 9.44772 10 10 10H14C14.5523 10 15 10.4477 15 11M9 11H7M15 11V17M15 11H17M9 21H15C16.1046 21 17 20.1046 17 19V7C17 5.89543 16.1046 5 15 5H9C7.89543 5 7 5.89543 7 7V19C7 20.1046 7.89543 21 9 21Z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 2V5" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 style={{
              fontSize: "18px",
              fontWeight: "600",
              color: "#111827",
              margin: 0
            }}>
              IT Assessment Details
            </h3>
          </div>

          <div className="business-details-card" style={{ padding: "20px" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
              paddingBottom: "16px",
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
          </div>
        </div>
      )}

      <div style={{ marginTop: "24px" }}>
        <h4 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "16px", color: "#111827" }}>Relevant Documents</h4>
        <LegalDocumentsView documents={[
          {
            id: "img-doc-1",
            name: "image.jpg",
            fileName: "image.jpg",
            uploadDate: "2026-01-06",
            size: 7854,
            type: "image/jpeg",
            status: "Verified"
          }
        ]} />
      </div>

      {/* Toast Notification */}
      <ToastNotification
        show={showNotification}
        message={notificationMessage}
        type={notificationType}
        onClose={() => setShowNotification(false)}
      />
    </>
  );
}

