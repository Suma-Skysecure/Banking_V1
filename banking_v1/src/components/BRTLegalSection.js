"use client";

import { useState } from "react";
import ToastNotification from "@/components/ToastNotification";
import "@/css/businessApproval.css";

/**
 * BRTLegalSection Component
 * 
 * Legal Clearance Activities section for BRT Dashboard
 */
export default function BRTLegalSection() {
  const [approvalStatus, setApprovalStatus] = useState({});
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
    setApprovalStatus((prev) => ({
      ...prev,
      [activityId]: "approved",
    }));
    setNotificationMessage("Legal clearance approved. Notification sent to Legal team.");
    setNotificationType("success");
    setShowNotification(true);
    console.log("Approved legal clearance for:", activityId);
  };

  const handleDisapprove = (activityId) => {
    setApprovalStatus((prev) => ({
      ...prev,
      [activityId]: "disapproved",
    }));
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
          <h3 className="card-title">Legal Clearance Activities</h3>
        </div>
        <div style={{ padding: "20px", overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#6b7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  PROPERTY DETAILS
                </th>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#6b7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  DOCUMENT
                </th>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#6b7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  VIEW DOCUMENT
                </th>
                <th
                  style={{
                    padding: "16px",
                    textAlign: "left",
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#6b7280",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {legalActivities.map((activity) => {
                const status = approvalStatus[activity.id] || null;
                const isApproved = status === "approved";
                const isDisapproved = status === "disapproved";

                return (
                  <tr
                    key={activity.id}
                    style={{
                      borderBottom: "1px solid #e5e7eb",
                    }}
                  >
                    <td style={{ padding: "16px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "12px",
                        }}
                      >
                        <div
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "50%",
                            backgroundColor: "#3b82f6",
                            color: "white",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "16px",
                            fontWeight: "600",
                            flexShrink: 0,
                          }}
                        >
                          {getInitials(activity.propertyName)}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "600",
                              color: "#111827",
                              marginBottom: "4px",
                            }}
                          >
                            {activity.propertyName}
                          </div>
                          <div
                            style={{
                              fontSize: "12px",
                              color: "#6b7280",
                            }}
                          >
                            {activity.propertyAddress}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <div
                        style={{
                          fontSize: "14px",
                          color: "#111827",
                          fontWeight: "500",
                        }}
                      >
                        {activity.document}
                      </div>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <button
                        onClick={(e) => handleViewDocument(activity, e)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "8px 16px",
                          backgroundColor: "#3b82f6",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "13px",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "background-color 0.2s",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "#2563eb";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "#3b82f6";
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                        >
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
                        View
                      </button>
                    </td>
                    <td style={{ padding: "16px" }}>
                      <div
                        style={{
                          display: "flex",
                          gap: "8px",
                          alignItems: "center",
                        }}
                      >
                        <button
                          onClick={() => handleDisapprove(activity.id)}
                          disabled={isApproved}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "8px 16px",
                            backgroundColor: isApproved ? "#f3f4f6" : "#ef4444",
                            color: isApproved ? "#9ca3af" : "white",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "13px",
                            fontWeight: "600",
                            cursor: isApproved ? "not-allowed" : "pointer",
                            transition: "background-color 0.2s",
                            opacity: isApproved ? 0.6 : 1,
                          }}
                          onMouseEnter={(e) => {
                            if (!isApproved) {
                              e.target.style.backgroundColor = "#dc2626";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isApproved) {
                              e.target.style.backgroundColor = "#ef4444";
                            }
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M4 4L12 12M12 4L4 12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                          Disapprove
                        </button>
                        <button
                          onClick={() => handleApprove(activity.id)}
                          disabled={isDisapproved}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            padding: "8px 16px",
                            backgroundColor: isDisapproved
                              ? "#f3f4f6"
                              : "#10b981",
                            color: isDisapproved ? "#9ca3af" : "white",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "13px",
                            fontWeight: "600",
                            cursor: isDisapproved ? "not-allowed" : "pointer",
                            transition: "background-color 0.2s",
                            opacity: isDisapproved ? 0.6 : 1,
                          }}
                          onMouseEnter={(e) => {
                            if (!isDisapproved) {
                              e.target.style.backgroundColor = "#059669";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!isDisapproved) {
                              e.target.style.backgroundColor = "#10b981";
                            }
                          }}
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M13 4L6 11L3 8"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
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

