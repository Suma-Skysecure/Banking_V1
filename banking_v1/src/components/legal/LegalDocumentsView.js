"use client";

import { useState, useEffect } from "react";

/**
 * LegalDocumentsView Component
 * 
 * Displays legal documents in a card interface with view and download options
 */
export default function LegalDocumentsView() {
  const [legalDocuments, setLegalDocuments] = useState([]);

  // Load uploaded legal documents from localStorage
  useEffect(() => {
    const storedDocuments = localStorage.getItem("uploadedLegalDocuments");
    if (storedDocuments) {
      try {
        const parsed = JSON.parse(storedDocuments);
        setLegalDocuments(parsed);
      } catch (error) {
        console.error("Error parsing stored legal documents:", error);
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

  const handleViewDocument = (document) => {
    if (document.data) {
      // Open the document in a new window
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head><title>${document.fileName}</title></head>
            <body style="margin:0; padding:0; display:flex; justify-content:center; align-items:center; height:100vh;">
              <iframe src="${document.data}" style="width:100%; height:100%; border:none;"></iframe>
            </body>
          </html>
        `);
      }
    } else {
      // Fallback to original behavior
      console.log("Viewing document:", document);
      window.open(`/api/documents/${document.id}`, "_blank");
    }
  };

  const handleDownloadDocument = (doc) => {
    if (doc.data) {
      // Convert base64 to blob and download
      const byteCharacters = atob(doc.data.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: doc.type || "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = doc.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      // Fallback to original behavior
      console.log("Downloading document:", doc);
      const blob = new Blob([`${doc.name} Content`], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = doc.fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const getDocumentIcon = (documentName, fileName) => {
    // Different icon colors for different document types
    const nameToCheck = (documentName || fileName || "").toLowerCase();
    if (nameToCheck.includes("id") || nameToCheck.includes("identity")) {
      return "#3b82f6"; // Blue for ID
    } else if (nameToCheck.includes("tax")) {
      return "#10b981"; // Green for Tax
    } else if (nameToCheck.includes("deed")) {
      return "#f59e0b"; // Orange for Deed
    } else if (nameToCheck.includes("encumbrance")) {
      return "#8b5cf6"; // Purple for Encumbrance
    } else if (nameToCheck.includes("title")) {
      return "#ef4444"; // Red for Title
    } else if (nameToCheck.includes("pdf")) {
      return "#ef4444"; // Red for PDF
    } else if (nameToCheck.includes("doc")) {
      return "#3b82f6"; // Blue for DOC
    }
    return "#6b7280"; // Default gray
  };

  return (
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
            d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14 2V8H20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h3 className="card-title">Legal Documents</h3>
      </div>
      <div style={{ padding: "20px" }}>
        {legalDocuments.length > 0 ? (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "16px"
          }}>
            {legalDocuments.map((document) => {
            const iconColor = getDocumentIcon(document.name, document.fileName);
            // Extract a clean display name from fileName (remove extension and format)
            const getDisplayName = () => {
              if (document.name) return document.name;
              if (document.fileName) {
                // Remove extension and format the name
                const nameWithoutExt = document.fileName.replace(/\.[^/.]+$/, "");
                // Replace underscores and hyphens with spaces, then capitalize words
                return nameWithoutExt
                  .replace(/[_-]/g, " ")
                  .split(" ")
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                  .join(" ");
              }
              return "Document";
            };
            const displayName = getDisplayName();
            return (
              <div
                key={document.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "16px",
                  backgroundColor: "#f9fafb",
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#1e3a8a";
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(30, 58, 138, 0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#e5e7eb";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Document Header */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginBottom: "12px" }}>
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: `${iconColor}15`,
                      borderRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                        stroke={iconColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 2V8H20"
                        stroke={iconColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ 
                      fontSize: "14px", 
                      fontWeight: "600", 
                      color: "#111827", 
                      marginBottom: "4px" 
                    }}>
                      {displayName}
                    </div>
                    <div style={{ 
                      fontSize: "12px", 
                      color: "#6b7280",
                      marginBottom: "8px"
                    }}>
                      {document.fileName}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                      <div style={{ 
                        fontSize: "11px", 
                        color: "#6b7280" 
                      }}>
                        {document.uploadDate ? formatDate(document.uploadDate) : document.uploadedDate || "N/A"}
                      </div>
                      <span style={{ color: "#d1d5db" }}>•</span>
                      <div style={{ 
                        fontSize: "11px", 
                        color: "#6b7280" 
                      }}>
                        {document.size ? formatFileSize(document.size) : document.fileSize || "N/A"}
                      </div>
                      <span style={{ color: "#d1d5db" }}>•</span>
                      <div style={{ 
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "#10b981"
                      }}>
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                          <circle
                            cx="8"
                            cy="8"
                            r="6"
                            stroke="#10b981"
                            strokeWidth="1.5"
                            fill="#ecfdf5"
                          />
                          <path
                            d="M5 8L7 10L11 6"
                            stroke="#10b981"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {document.status || "Verified"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ 
                  display: "flex", 
                  gap: "8px", 
                  marginTop: "12px",
                  borderTop: "1px solid #e5e7eb",
                  paddingTop: "12px"
                }}>
                  <button
                    onClick={() => handleViewDocument(document)}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      padding: "8px 12px",
                      backgroundColor: "#1e3a8a",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e40af")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#1e3a8a")}
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
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
                  <button
                    onClick={() => handleDownloadDocument(document)}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      padding: "8px 12px",
                      backgroundColor: "#10b981",
                      color: "white",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#059669")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#10b981")}
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 12L4 8H6.5V2H9.5V8H12L8 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 14H14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    Download
                  </button>
                </div>
              </div>
            );
          })}
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
            fontSize: "14px",
            textAlign: "center"
          }}>
            No legal documents uploaded yet. Please upload documents from the Legal Workflow page and click "Submit & Approve".
          </div>
        )}
      </div>
    </div>
  );
}

