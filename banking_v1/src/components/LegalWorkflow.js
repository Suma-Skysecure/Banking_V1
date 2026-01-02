"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";

export default function LegalFlow() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ===== LOI STATE =====
  const [loi, setLoi] = useState({
    loiNumber: "LOI-2024-001234",
    generatedOn: new Date().toLocaleDateString(),
    status: "Generated",
    fileName: "LOI_Downtown_Arts_Plaza_2024.pdf",
  });

  // ===== STAMP DUTY STATE =====
  const [stampDuty] = useState({
    stampDutyNumber: "SD-2024-001234",
    fileName: "Stamp_Duty_2024_001234.pdf",
    url: "/documents/stamp-duty-2024-001234.pdf", // Mock URL - replace with actual API data
  });

  // ===== WORKFLOW STATE =====
  const [legalDueDiligenceStatus, setLegalDueDiligenceStatus] = useState("Completed"); // Starts as completed
  const [legalCallRequired, setLegalCallRequired] = useState(null); // null = not decided yet
  const [currentStep, setCurrentStep] = useState("decision"); // decision, brt-confirmation, legal-call, business-decision, compliance, legal-clearance, final-agreements

  // ===== WORKFLOW STATE FOR CALL REQUIRED PATH =====
  const [brtConfirmed, setBrtConfirmed] = useState(false);
  const [legalCallNotes, setLegalCallNotes] = useState("");
  const [businessDecision, setBusinessDecision] = useState(""); // "approve" | "reject" | ""
  const [businessDecisionComments, setBusinessDecisionComments] = useState("");
  const [complianceStatus, setComplianceStatus] = useState(""); // "compliant" | "non-compliant" | ""
  const [complianceNotes, setComplianceNotes] = useState("");

  // ===== WORKFLOW STATE FOR NO CALL PATH =====
  const [legalClearanceStatus, setLegalClearanceStatus] = useState(""); // "approved" | "pending" | ""

  // ===== FINAL AGREEMENT STATUS =====
  const [finalAgreementStatus, setFinalAgreementStatus] = useState("Pending");

  // ===== LEGAL DOCUMENT WORKFLOW STATE =====
  const [documents, setDocuments] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [lastActionMessage, setLastActionMessage] = useState("");

  // ===== PDF MODAL STATE =====
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showLegalDocumentPdfModal, setShowLegalDocumentPdfModal] = useState(false);
  const [selectedLegalDocument, setSelectedLegalDocument] = useState(null);

  // ===== NOTIFICATION STATE =====
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New LOI Generated",
      message: "LOI-2024-001234 has been generated and requires review",
      time: "2 minutes ago",
      unread: true
    },
    {
      id: 2,
      title: "Document Approved",
      message: "Stamp Duty certificate has been approved",
      time: "1 hour ago",
      unread: true
    },
    {
      id: 3,
      title: "Legal Review Required",
      message: "Property ABC Mall requires legal clearance",
      time: "3 hours ago",
      unread: true
    },
    {
      id: 4,
      title: "Workflow Completed",
      message: "Legal clearance workflow for XYZ Plaza is complete",
      time: "1 day ago",
      unread: false
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  // Handle marking all notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      unread: false
    })));
  };

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotificationDropdown && !event.target.closest('.notification-wrapper')) {
        setShowNotificationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotificationDropdown]);

  // Check if LOI exists (workflow enabled)
  const isWorkflowEnabled = loi && loi.loiNumber;

  // LOI Handlers - Fixed to ensure they work
  const handleViewLOI = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPdfModal(true);
  };

  // Close PDF Modal
  const handleClosePdfModal = () => {
    setShowPdfModal(false);
  };

  // Legal Documents Modal Handlers
  const handleViewLegalDocuments = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // If documents exist, open the PDF viewer with the first document
    if (documents && documents.length > 0) {
      setSelectedLegalDocument(documents[0]);
      setShowLegalDocumentPdfModal(true);
    } else {
      // Show message if no documents available
      if (typeof window !== "undefined") {
        window.alert("No legal documents available to view.");
      }
    }
  };

  const handleDownloadLOI = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== "undefined") {
      // Simulate download
      const link = document.createElement("a");
      link.href = "#";
      link.download = loi.fileName;
      link.click();
      window.alert(`Download initiated for:\n\nLOI Number: ${loi.loiNumber}\nFile: ${loi.fileName}`);
    }
  };

  // ===== STAMP DUTY HANDLER =====
  const handleViewStampDuty = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Navigate to view-only stamp duty page
    router.push("/legal-workflow/stamp-duty");
  };

  const renderLOIStatusBadge = (status) => {
    const statusMap = {
      Generated: { bg: "#dbeafe", color: "#1d4ed8", label: "Generated" },
      Circulated: { bg: "#fed7aa", color: "#ea580c", label: "Circulated" },
      Approved: { bg: "#dcfce7", color: "#166534", label: "Approved" },
    };
    const style = statusMap[status] || statusMap.Generated;
    return (
      <span
        className="loi-status-badge"
        style={{ background: style.bg, color: style.color }}
      >
        {style.label}
      </span>
    );
  };

  // Workflow handlers
  const handleDecisionSubmit = () => {
    if (legalCallRequired === null) {
      alert("Please select whether a legal call is required.");
      return;
    }

    if (legalCallRequired) {
      setCurrentStep("brt-confirmation");
    } else {
      setCurrentStep("legal-clearance");
    }
  };

  const handleBrtConfirmation = () => {
    if (!brtConfirmed) {
      alert("Please confirm BRT approval before proceeding.");
      return;
    }
    setCurrentStep("legal-call");
  };

  const handleLegalCallSubmit = () => {
    if (!legalCallNotes.trim()) {
      alert("Please provide notes from the legal call.");
      return;
    }
    setCurrentStep("business-decision");
  };

  const handleBusinessDecisionSubmit = () => {
    if (!businessDecision) {
      alert("Please make a business decision.");
      return;
    }
    setCurrentStep("compliance");
  };

  const handleComplianceSubmit = () => {
    if (!complianceStatus) {
      alert("Please confirm compliance status.");
      return;
    }
    setCurrentStep("final-agreements");
  };

  const handleLegalClearanceSubmit = () => {
    if (!legalClearanceStatus) {
      alert("Please confirm legal clearance status.");
      return;
    }
    setCurrentStep("final-agreements");
  };

  // Simulate a file upload and add to local state
  const handleSimulatedUpload = () => {
    if (isUploading || !isWorkflowEnabled) return;

    setIsUploading(true);
    setLastActionMessage("");

    // Array of property-related document names
    const propertyDocuments = [
      "Owner_ID_Proof.pdf",
      "Sales_Deed.pdf",
      "Encumbrance_Certificate.pdf",
      "Property_Tax_Receipt.pdf"
    ];

    // Get a random document name or let user enter custom
    const randomDocName = propertyDocuments[Math.floor(Math.random() * propertyDocuments.length)];

    const nameFromUser =
      typeof window !== "undefined"
        ? window.prompt(
            "Enter legal document name (e.g., Owner_ID_Proof.pdf, Sales_Deed.pdf):",
            randomDocName
          )
        : null;

    const now = new Date();
    const newDoc = {
      id: Date.now(),
      fileName:
        nameFromUser && nameFromUser.trim()
          ? nameFromUser.trim()
          : randomDocName,
      fileType: "PDF",
      fileSize: "1.2 MB",
      uploadedDate: now.toLocaleDateString(),
      status: "Uploaded",
    };

    setTimeout(() => {
      setDocuments((prev) => [newDoc, ...prev]);
      setIsUploading(false);
      setLastActionMessage(`"${newDoc.fileName}" uploaded successfully.`);
    }, 900);
  };

  const handleView = (doc) => {
    setSelectedLegalDocument(doc);
    setShowLegalDocumentPdfModal(true);
  };

  const handleCloseLegalDocumentPdfModal = () => {
    setShowLegalDocumentPdfModal(false);
    setSelectedLegalDocument(null);
  };

  const handleDownload = (doc) => {
    if (typeof window !== "undefined") {
      window.alert(`Download simulated for:\n\n${doc.fileName}`);
    }
  };

  const handleStatusChange = (docId, nextStatus) => {
    setLastActionMessage("");

    if (nextStatus === "Rejected" && typeof window !== "undefined") {
      const confirmReject = window.confirm(
        "Are you sure you want to mark this document as Rejected?"
      );
      if (!confirmReject) return;
    }

    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === docId ? { ...doc, status: nextStatus } : doc
      )
    );
    setLastActionMessage(`Status updated to "${nextStatus}".`);
  };

  const renderStatusBadge = (status) => {
    const normalized = status.toLowerCase().replace(/\s+/g, "-");
    return (
      <span className={`status-badge status-${normalized}`}>
        {status}
      </span>
    );
  };

  const renderWorkflowStatusBadge = (status) => {
    const statusMap = {
      Pending: { bg: "#e5e7eb", color: "#374151", label: "Pending" },
      "In Progress": { bg: "#dbeafe", color: "#1d4ed8", label: "In Progress" },
      Completed: { bg: "#dcfce7", color: "#166534", label: "Completed" },
    };
    const style = statusMap[status] || statusMap.Pending;
    return (
      <span
        className="workflow-status-badge"
        style={{ background: style.bg, color: style.color }}
      >
        {style.label}
      </span>
    );
  };

  const statusOptions = ["Uploaded", "In Review", "Approved", "Rejected"];

  return (
    <div className="dashboard-container">
      {/* ================= HEADER ================= */}
      <header className="dashboard-header">
        <button
          className="header-hamburger"
          onClick={() => setSidebarOpen((p) => !p)}
        >
          ☰
        </button>

        <div className="header-search">
          <input placeholder="Search branch..." />
        </div>

        <div className="header-right-section">
          {/* Notification Icon */}
          <div className="notification-wrapper">
            <button
              className="header-notification-btn"
              onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
              aria-label="Notifications"
            >
              <svg
                className="notification-icon"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 2C11.1 2 12 2.9 12 4V5.09C14.2 5.57 16 7.47 16 9.77V14L18 16V17H2V16L4 14V9.77C4 7.47 5.8 5.57 8 5.09V4C8 2.9 8.9 2 10 2ZM10 18C11.1 18 12 17.1 12 16H8C8 17.1 8.9 18 10 18Z"
                  fill="currentColor"
                />
              </svg>
              {unreadCount > 0 && (
                <span className="notification-badge">{unreadCount}</span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotificationDropdown && (
              <div className="notification-dropdown">
                <div className="notification-dropdown-header">
                  <h4>Notifications</h4>
                  <button
                    className="notification-close"
                    onClick={() => setShowNotificationDropdown(false)}
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>
                <div className="notification-list">
                  {notifications.length === 0 ? (
                    <div className="notification-empty">
                      <p>No notifications</p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`notification-item ${notification.unread ? 'unread' : ''}`}
                        onClick={() => {
                          // Handle notification click
                          console.log('Notification clicked:', notification.id);
                        }}
                      >
                        {notification.unread && <div className="notification-dot"></div>}
                        <div className="notification-content">
                          <p className="notification-title">{notification.title}</p>
                          <p className="notification-message">{notification.message}</p>
                          <p className="notification-time">{notification.time}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {notifications.length > 0 && (
                  <div className="notification-footer">
                    <button 
                      className="btn tertiary" 
                      onClick={handleMarkAllAsRead}
                      disabled={unreadCount === 0}
                    >
                      Mark all as read
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Profile Section */}
          <div className="header-profile">
            <div className="profile-avatar">AM</div>
            <div>
              <div className="profile-name">Ana Miller</div>
              <div className="profile-email">analyst@pms.com</div>
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} />

        {/* ================= MAIN ================= */}
        <main className="dashboard-main">
          <PageHeader
            title="Legal Clearance Activities"
            subtitle="Review legal requirements, track documents, and finalize agreements"
          />

          {/* ================= LOI DOCUMENT CARD SECTION ================= */}
          <div className="card loi-document-card">
            <div className="loi-document-header">
              <div className="loi-document-title">
                <svg 
                  className="loi-document-icon" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                  <path 
                    d="M16 13H8" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M16 17H8" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M10 9H9H8" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                <h3>LOI Document</h3>
              </div>
            </div>

            {loi && loi.loiNumber ? (
              <div className="loi-document-content">
                <div className="loi-document-item">
                  <div className="loi-pdf-icon-wrapper">
                    <div className="loi-pdf-icon">
                      <span className="loi-pdf-text">PDF</span>
                    </div>
                  </div>
                  <div className="loi-document-info">
                    <div className="loi-document-name">{loi.fileName || "LOI_Downtown_Arts_Plaza_2024.pdf"}</div>
                    <div className="loi-document-meta">
                      Uploaded on {loi.generatedOn || "Dec 18, 2024"} • 2.4 MB
                    </div>
                  </div>
                  <button 
                    type="button"
                    className="btn loi-view-btn" 
                    onClick={handleViewLOI}
                  >
                    <svg 
                      className="loi-eye-icon" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 20 20" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M10 3C5 3 1.73 7.11 1 10C1.73 12.89 5 17 10 17C15 17 18.27 12.89 19 10C18.27 7.11 15 3 10 3ZM10 15C7.24 15 5 12.76 5 10C5 7.24 7.24 5 10 5C12.76 5 15 7.24 15 10C15 12.76 12.76 15 10 15ZM10 7C8.34 7 7 8.34 7 10C7 11.66 8.34 13 10 13C11.66 13 13 11.66 13 10C13 8.34 11.66 7 10 7Z" 
                        fill="currentColor"
                      />
                    </svg>
                    View Document
                  </button>
                </div>
              </div>
            ) : (
              <div className="loi-empty-state">
                <div className="loi-empty-icon">📄</div>
                <h4>No LOI Generated</h4>
                <p>LOI must be generated before legal clearance activities can begin.</p>
              </div>
            )}
          </div>

          {/* ================= LEGAL DOCUMENTS CARD SECTION ================= */}
          <div className="card legal-documents-card">
            <div className="legal-documents-header">
              <div className="legal-documents-title">
                <svg 
                  className="legal-documents-icon" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
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
                  <path 
                    d="M16 13H8" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M16 17H8" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M10 9H9H8" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
                <h3>Legal Documents</h3>
              </div>
            </div>

            {documents && documents.length > 0 ? (
              <div className="legal-documents-content">
                <div className="legal-documents-item">
                  <div className="legal-documents-pdf-icon-wrapper">
                    <div className="legal-documents-pdf-icon">
                      <span className="legal-documents-pdf-text">PDF</span>
                    </div>
                  </div>
                  <div className="legal-documents-info">
                    <div className="legal-documents-name">
                      {documents.length} {documents.length === 1 ? 'Document' : 'Documents'} Uploaded
                    </div>
                    <div className="legal-documents-meta">
                      Latest: {documents[0]?.uploadedDate || "N/A"} • {documents[0]?.fileSize || "N/A"}
                    </div>
                  </div>
                  <button 
                    type="button"
                    className="btn legal-documents-view-btn" 
                    onClick={handleViewLegalDocuments}
                    disabled={!documents || documents.length === 0}
                    style={(!documents || documents.length === 0) ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
                  >
                    <svg 
                      className="legal-documents-eye-icon" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 20 20" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M10 3C5 3 1.73 7.11 1 10C1.73 12.89 5 17 10 17C15 17 18.27 12.89 19 10C18.27 7.11 15 3 10 3ZM10 15C7.24 15 5 12.76 5 10C5 7.24 7.24 5 10 5C12.76 5 15 7.24 15 10C15 12.76 12.76 15 10 15ZM10 7C8.34 7 7 8.34 7 10C7 11.66 8.34 13 10 13C11.66 13 13 11.66 13 10C13 8.34 11.66 7 10 7Z" 
                        fill="currentColor"
                      />
                    </svg>
                    View Legal Documents
                  </button>
                </div>
              </div>
            ) : (
              <div className="legal-documents-empty-state">
                <div className="legal-documents-empty-icon">📄</div>
                <h4>No Legal Documents</h4>
                <p>No legal documents available to view.</p>
              </div>
            )}
          </div>

          {/* ================= LEGAL WORKFLOW SECTION ================= */}
          {isWorkflowEnabled ? (
            <>
              {/* Legal Due Diligence - Always shown as completed */}
              <div className="card workflow-step-card">
                <div className="workflow-step-header">
                  <div className="workflow-step-title">
                    <span className="step-number">1</span>
                    <div>
                      <h4>Legal Due Diligence</h4>
                      <p>Review and verify all legal requirements and documentation.</p>
                    </div>
                  </div>
                  <div className="workflow-step-status">
                    {renderWorkflowStatusBadge(legalDueDiligenceStatus)}
                  </div>
                </div>
              </div>

              {/* Decision Point: Is a legal call required? */}
              {currentStep === "decision" && (
                <div className="card">
                  <h3>Is a legal call required for this engagement?</h3>

                  <div className="info-box">
                    A legal call may be required if contract terms need clarification,
                    regulatory exposure exists, or there are jurisdictional concerns.
                  </div>

                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        name="legalCall"
                        checked={legalCallRequired === true}
                        onChange={() => setLegalCallRequired(true)}
                      />
                      <div>
                        <strong>Yes, a legal call is required</strong>
                        <p>The engagement needs details clarified.</p>
                      </div>
                    </label>

                    <label className="radio-option">
                      <input
                        type="radio"
                        name="legalCall"
                        checked={legalCallRequired === false}
                        onChange={() => setLegalCallRequired(false)}
                      />
                      <div>
                        <strong>No, a legal call is not required</strong>
                        <p>Standard terms are used with no jurisdiction concerns.</p>
                      </div>
                    </label>
                  </div>

                  <div className="action-row">
                    <Link href="/business-approval" className="btn secondary">
                      Previous
                    </Link>
                    <button className="btn primary" onClick={handleDecisionSubmit}>
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {/* PATH 1: CALL REQUIRED - BRT Confirmation */}
              {legalCallRequired === true && currentStep === "brt-confirmation" && (
                <div className="card workflow-step-card">
                  <div className="workflow-step-header">
                    <div className="workflow-step-title">
                      <span className="step-number">2</span>
                      <div>
                        <h4>BRT Confirmation on Call</h4>
                        <p>Confirm with BRT (Business Review Team) that a legal call is necessary for this engagement.</p>
                      </div>
                    </div>
                  </div>

                  <div className="workflow-section">
                    <label className="workflow-checkbox-label">
                      <input
                        type="checkbox"
                        checked={brtConfirmed}
                        onChange={(e) => setBrtConfirmed(e.target.checked)}
                      />
                      <div>
                        <strong>BRT has confirmed that a legal call is required</strong>
                        <p>I have verified with the Business Review Team that this engagement requires legal consultation.</p>
                      </div>
                    </label>
                  </div>

                  <div className="action-row">
                    <button
                      className="btn secondary"
                      onClick={() => setCurrentStep("decision")}
                    >
                      Back
                    </button>
                    <button
                      className="btn primary"
                      onClick={handleBrtConfirmation}
                      disabled={!brtConfirmed}
                    >
                      Continue to Legal Call
                    </button>
                  </div>
                </div>
              )}

              {/* PATH 1: CALL REQUIRED - Legal Clearance / Legal Call */}
              {legalCallRequired === true && currentStep === "legal-call" && (
                <div className="card workflow-step-card">
                  <div className="workflow-step-header">
                    <div className="workflow-step-title">
                      <span className="step-number">3</span>
                      <div>
                        <h4>Legal Clearance / Legal Call</h4>
                        <p>Conduct the legal call and document the outcomes.</p>
                      </div>
                    </div>
                  </div>

                  <div className="workflow-section">
                    <label className="workflow-label">
                      <strong>Legal Call Notes</strong>
                      <textarea
                        className="workflow-textarea"
                        rows={6}
                        placeholder="Enter notes from the legal call, including key discussion points, decisions made, and any action items..."
                        value={legalCallNotes}
                        onChange={(e) => setLegalCallNotes(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="action-row">
                    <button
                      className="btn secondary"
                      onClick={() => setCurrentStep("brt-confirmation")}
                    >
                      Back
                    </button>
                    <button
                      className="btn primary"
                      onClick={handleLegalCallSubmit}
                      disabled={!legalCallNotes.trim()}
                    >
                      Continue to Business Decision
                    </button>
                  </div>
                </div>
              )}

              {/* PATH 1: CALL REQUIRED - Business Decision on Legal Call */}
              {legalCallRequired === true && currentStep === "business-decision" && (
                <div className="card workflow-step-card">
                  <div className="workflow-step-header">
                    <div className="workflow-step-title">
                      <span className="step-number">4</span>
                      <div>
                        <h4>Business Decision on Legal Call</h4>
                        <p>Make a business decision based on the legal call outcomes.</p>
                      </div>
                    </div>
                  </div>

                  <div className="workflow-section">
                    <label className="workflow-label">
                      <strong>Business Decision</strong>
                      <div className="radio-group">
                        <label className="radio-option">
                          <input
                            type="radio"
                            name="businessDecision"
                            value="approve"
                            checked={businessDecision === "approve"}
                            onChange={(e) => setBusinessDecision(e.target.value)}
                          />
                          <div>
                            <strong>Approve</strong>
                            <p>Proceed with the engagement as discussed in the legal call.</p>
                          </div>
                        </label>
                        <label className="radio-option">
                          <input
                            type="radio"
                            name="businessDecision"
                            value="reject"
                            checked={businessDecision === "reject"}
                            onChange={(e) => setBusinessDecision(e.target.value)}
                          />
                          <div>
                            <strong>Reject</strong>
                            <p>Do not proceed with the engagement based on legal call findings.</p>
                          </div>
                        </label>
                      </div>
                    </label>

                    <label className="workflow-label">
                      <strong>Decision Comments</strong>
                      <textarea
                        className="workflow-textarea"
                        rows={4}
                        placeholder="Provide additional comments or rationale for your decision..."
                        value={businessDecisionComments}
                        onChange={(e) => setBusinessDecisionComments(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="action-row">
                    <button
                      className="btn secondary"
                      onClick={() => setCurrentStep("legal-call")}
                    >
                      Back
                    </button>
                    <button
                      className="btn primary"
                      onClick={handleBusinessDecisionSubmit}
                      disabled={!businessDecision}
                    >
                      Continue to Compliance
                    </button>
                  </div>
                </div>
              )}

              {/* PATH 1: CALL REQUIRED - Compliance of Business Decision */}
              {legalCallRequired === true && currentStep === "compliance" && (
                <div className="card workflow-step-card">
                  <div className="workflow-step-header">
                    <div className="workflow-step-title">
                      <span className="step-number">5</span>
                      <div>
                        <h4>Compliance of Business Decision</h4>
                        <p>Verify that the business decision aligns with compliance requirements.</p>
                      </div>
                    </div>
                  </div>

                  <div className="workflow-section">
                    <label className="workflow-label">
                      <strong>Compliance Status</strong>
                      <div className="radio-group">
                        <label className="radio-option">
                          <input
                            type="radio"
                            name="complianceStatus"
                            value="compliant"
                            checked={complianceStatus === "compliant"}
                            onChange={(e) => setComplianceStatus(e.target.value)}
                          />
                          <div>
                            <strong>Compliant</strong>
                            <p>The business decision meets all compliance requirements.</p>
                          </div>
                        </label>
                        <label className="radio-option">
                          <input
                            type="radio"
                            name="complianceStatus"
                            value="non-compliant"
                            checked={complianceStatus === "non-compliant"}
                            onChange={(e) => setComplianceStatus(e.target.value)}
                          />
                          <div>
                            <strong>Non-Compliant</strong>
                            <p>Additional actions required to ensure compliance.</p>
                          </div>
                        </label>
                      </div>
                    </label>

                    <label className="workflow-label">
                      <strong>Compliance Notes</strong>
                      <textarea
                        className="workflow-textarea"
                        rows={4}
                        placeholder="Document compliance verification details and any required actions..."
                        value={complianceNotes}
                        onChange={(e) => setComplianceNotes(e.target.value)}
                      />
                    </label>
                  </div>

                  <div className="action-row">
                    <button
                      className="btn secondary"
                      onClick={() => setCurrentStep("business-decision")}
                    >
                      Back
                    </button>
                    <button
                      className="btn primary"
                      onClick={handleComplianceSubmit}
                      disabled={!complianceStatus}
                    >
                      Continue to Final Agreements
                    </button>
                  </div>
                </div>
              )}

              {/* PATH 2: NO CALL REQUIRED - Legal Clearance */}
              {legalCallRequired === false && currentStep === "legal-clearance" && (
                <div className="card workflow-step-card">
                  <div className="workflow-step-header">
                    <div className="workflow-step-title">
                      <span className="step-number">2</span>
                      <div>
                        <h4>Legal Clearance</h4>
                        <p>Since no legal call is required, proceed directly with legal clearance verification.</p>
                      </div>
                    </div>
                  </div>

                  <div className="workflow-section">
                    <label className="workflow-label">
                      <strong>Legal Clearance Status</strong>
                      <div className="radio-group">
                        <label className="radio-option">
                          <input
                            type="radio"
                            name="legalClearanceStatus"
                            value="approved"
                            checked={legalClearanceStatus === "approved"}
                            onChange={(e) => setLegalClearanceStatus(e.target.value)}
                          />
                          <div>
                            <strong>Approved</strong>
                            <p>Legal clearance granted. Standard terms are acceptable.</p>
                          </div>
                        </label>
                        <label className="radio-option">
                          <input
                            type="radio"
                            name="legalClearanceStatus"
                            value="pending"
                            checked={legalClearanceStatus === "pending"}
                            onChange={(e) => setLegalClearanceStatus(e.target.value)}
                          />
                          <div>
                            <strong>Pending Review</strong>
                            <p>Additional review required before approval.</p>
                          </div>
                        </label>
                      </div>
                    </label>
                  </div>

                  <div className="success-box">
                    ✔ Based on your input, the steps involving a legal call are skipped.
                  </div>

                  <div className="action-row">
                    <button
                      className="btn secondary"
                      onClick={() => setCurrentStep("decision")}
                    >
                      Back
                    </button>
                    <button
                      className="btn primary"
                      onClick={handleLegalClearanceSubmit}
                      disabled={!legalClearanceStatus}
                    >
                      Continue to Final Agreements
                    </button>
                  </div>
                </div>
              )}

              {/* FINAL STEP: Providing Final Agreements for Execution */}
              {currentStep === "final-agreements" && (
                <div className="card completed-card">
                  <h4>✔ Legal Clearance Workflow Completed</h4>
                  <p>
                    {legalCallRequired
                      ? "All legal call requirements have been processed. Business decision and compliance verification completed."
                      : "Legal clearance has been granted. Standard terms are acceptable and no deviations are required."}
                    {" "}Ensure all required agreements above are marked as{" "}
                    <strong>Approved</strong> before final execution.
                  </p>

                  {legalCallRequired && (
                    <div className="workflow-summary">
                      <h5>Workflow Summary:</h5>
                      <ul className="checklist">
                        <li>✔ BRT Confirmation: {brtConfirmed ? "Confirmed" : "Pending"}</li>
                        <li>✔ Legal Call: {legalCallNotes ? "Completed" : "Pending"}</li>
                        <li>✔ Business Decision: {businessDecision ? businessDecision.charAt(0).toUpperCase() + businessDecision.slice(1) : "Pending"}</li>
                        <li>✔ Compliance Status: {complianceStatus ? complianceStatus.charAt(0).toUpperCase() + complianceStatus.slice(1) : "Pending"}</li>
                      </ul>
                    </div>
                  )}

                  {!legalCallRequired && (
                    <ul className="checklist">
                      <li>✔ Standard contract used</li>
                      <li>✔ No deviations from standard terms</li>
                      <li>✔ Jurisdiction pre-approved</li>
                      <li>✔ Legal Clearance: {legalClearanceStatus ? legalClearanceStatus.charAt(0).toUpperCase() + legalClearanceStatus.slice(1) : "Pending"}</li>
                    </ul>
                  )}

                  <button className="btn primary full" onClick={() => {
                    if (typeof window !== "undefined") {
                      window.alert("Final Agreements ready for execution!");
                    }
                  }}>
                    Provide Final Agreements for Execution →
                  </button>
                </div>
              )}

              {/* UPLOAD SECTION (Available after decision) */}
              {currentStep !== "decision" && (
                <div className="card legal-upload-section">
                  <div className="legal-upload-header">
                    <div>
                      <h3>Upload Legal Documents</h3>
                      <p className="legal-upload-subtitle">
                        Add engagement letters, agreements, and supporting legal
                        documentation. This is a simulated upload for demo purposes.
                      </p>
                    </div>

                    <button
                      className="btn primary"
                      onClick={handleSimulatedUpload}
                      disabled={isUploading}
                    >
                      {isUploading ? "Uploading..." : "Upload Legal Document"}
                    </button>
                  </div>

                  {lastActionMessage && (
                    <div className="legal-feedback legal-feedback-success">
                      {lastActionMessage}
                    </div>
                  )}

                  {isUploading && (
                    <div className="legal-feedback legal-feedback-neutral">
                      Simulating upload and validation...
                    </div>
                  )}
                </div>
              )}

              {/* DOCUMENT TABLE SECTION (Available after decision) */}
              {currentStep !== "decision" && (
                <div className="card">
                  <div className="legal-doc-header">
                    <h3>Legal Document Tracker</h3>
                    <p className="legal-doc-subtitle">
                      Monitor the status of all legal documents associated with this
                      engagement. Update statuses as reviews progress.
                    </p>
                  </div>

                  {documents.length === 0 ? (
                    <div className="legal-empty-state">
                      <div className="legal-empty-icon">📄</div>
                      <h4>No legal documents uploaded yet</h4>
                      <p>
                        Use the <strong>"Upload Legal Document"</strong> button above
                        to add agreements and supporting materials. Uploaded files
                        will appear here with their status and actions.
                      </p>
                    </div>
                  ) : (
                    <div className="legal-table-wrapper">
                      <table className="legal-doc-table">
                        <thead>
                          <tr>
                            <th>File Name</th>
                            <th>File Type</th>
                            <th>Size</th>
                            <th>Uploaded Date</th>
                            <th>Status</th>
                            <th className="legal-actions-col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {documents.map((doc) => (
                            <tr key={doc.id}>
                              <td className="legal-file-name">{doc.fileName}</td>
                              <td>{doc.fileType}</td>
                              <td>{doc.fileSize}</td>
                              <td>{doc.uploadedDate}</td>
                              <td>{renderStatusBadge(doc.status)}</td>
                              <td>
                                <div className="legal-row-actions">
                                  <button
                                    className="btn tertiary"
                                    onClick={() => handleView(doc)}
                                    disabled={isUploading}
                                  >
                                    View
                                  </button>
                                  <button
                                    className="btn tertiary"
                                    onClick={() => handleDownload(doc)}
                                    disabled={isUploading}
                                  >
                                    Download
                                  </button>
                                  <select
                                    className="status-select"
                                    value={doc.status}
                                    onChange={(e) =>
                                      handleStatusChange(doc.id, e.target.value)
                                    }
                                    disabled={isUploading}
                                  >
                                    {statusOptions.map((option) => (
                                      <option key={option} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="card workflow-card workflow-disabled">
              <div className="workflow-header">
                <h3>Legal Workflow</h3>
                <div className="workflow-locked-message">
                  <span className="lock-icon">🔒</span>
                  Legal workflow will start after LOI generation
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ================= PDF MODAL ================= */}
      {showPdfModal && (
        <div className="pdf-modal-overlay" onClick={handleClosePdfModal}>
          <div className="pdf-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="pdf-modal-header">
              <h3>LOI Document - {loi.fileName}</h3>
              <button 
                className="pdf-modal-close" 
                onClick={handleClosePdfModal}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="pdf-modal-body">
              <object
                data={`/documents/Standard_LOI.pdf#toolbar=1&navpanes=1&scrollbar=1`}
                type="application/pdf"
                className="pdf-viewer"
                title="LOI Document"
              >
                <iframe
                  src={`/documents/Standard_LOI.pdf#toolbar=1&navpanes=1&scrollbar=1`}
                  className="pdf-viewer"
                  title="LOI Document"
                  frameBorder="0"
                  style={{ width: '100%', height: '100%', border: 'none' }}
                />
                <div className="pdf-fallback-message">
                  <p>Unable to display PDF file.</p>
                  <p>Please use the buttons below to view or download the document.</p>
                </div>
              </object>
              <div className="pdf-modal-actions">
                <button 
                  className="btn secondary" 
                  onClick={handleClosePdfModal}
                >
                  Close
                </button>
                <button 
                  className="btn secondary" 
                  onClick={() => {
                    window.open(`/documents/Standard_LOI.pdf`, '_blank');
                  }}
                >
                  Open in New Tab
                </button>
                <button 
                  className="btn primary" 
                  onClick={handleDownloadLOI}
                >
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= LEGAL DOCUMENT PDF VIEWER MODAL ================= */}
      {showLegalDocumentPdfModal && selectedLegalDocument && (
        <div className="pdf-modal-overlay" onClick={handleCloseLegalDocumentPdfModal}>
          <div className="pdf-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="pdf-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                <h3>Legal Document - {selectedLegalDocument.fileName}</h3>
                {documents.length > 1 && (
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>
                    ({documents.findIndex(d => d.id === selectedLegalDocument.id) + 1} of {documents.length})
                  </span>
                )}
              </div>
              <button 
                className="pdf-modal-close" 
                onClick={handleCloseLegalDocumentPdfModal}
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <div className="pdf-modal-body">
              <object
                data={`/documents/${selectedLegalDocument.fileName}#toolbar=1&navpanes=1&scrollbar=1`}
                type="application/pdf"
                className="pdf-viewer"
                title={selectedLegalDocument.fileName}
              >
                <iframe
                  src={`/documents/${selectedLegalDocument.fileName}#toolbar=1&navpanes=1&scrollbar=1`}
                  className="pdf-viewer"
                  title={selectedLegalDocument.fileName}
                  frameBorder="0"
                  style={{ width: '100%', height: '100%', border: 'none' }}
                />
                <div className="pdf-fallback-message">
                  <p>Unable to display PDF file.</p>
                  <p>Please use the button below to open the document in a new tab.</p>
                </div>
              </object>
              <div className="pdf-modal-actions">
                {documents.length > 1 && (
                  <>
                    <button 
                      className="btn secondary" 
                      onClick={() => {
                        const currentIndex = documents.findIndex(d => d.id === selectedLegalDocument.id);
                        const prevIndex = currentIndex > 0 ? currentIndex - 1 : documents.length - 1;
                        setSelectedLegalDocument(documents[prevIndex]);
                      }}
                      disabled={documents.length <= 1}
                    >
                      ← Previous
                    </button>
                    <button 
                      className="btn secondary" 
                      onClick={() => {
                        const currentIndex = documents.findIndex(d => d.id === selectedLegalDocument.id);
                        const nextIndex = currentIndex < documents.length - 1 ? currentIndex + 1 : 0;
                        setSelectedLegalDocument(documents[nextIndex]);
                      }}
                      disabled={documents.length <= 1}
                    >
                      Next →
                    </button>
                  </>
                )}
                <button 
                  className="btn secondary" 
                  onClick={handleCloseLegalDocumentPdfModal}
                >
                  Close
                </button>
                <button 
                  className="btn secondary" 
                  onClick={() => {
                    window.open(`/documents/${selectedLegalDocument.fileName}`, '_blank');
                  }}
                >
                  Open in New Tab
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= GLOBAL STYLES ================= */}
      <style jsx global>{`
        .dashboard-container {
          min-height: 100vh;
          background: #f8fafc;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
        }

        .header-hamburger {
          font-size: 18px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .header-search input {
          padding: 6px 10px;
          border-radius: 6px;
          border: 1px solid #d1d5db;
        }

        .header-right-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .header-profile {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .profile-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #6366f1;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        /* ===== NOTIFICATION STYLES ===== */
        .notification-wrapper {
          position: relative;
        }

        .header-notification-btn {
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          padding: 8px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.15s ease;
        }

        .header-notification-btn:hover {
          background: #f3f4f6;
        }

        .notification-icon {
          color: #6b7280;
          width: 20px;
          height: 20px;
        }

        .notification-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          background: #ef4444;
          color: #ffffff;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 600;
          border: 2px solid #ffffff;
        }

        .notification-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 360px;
          max-height: 500px;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          border: 1px solid #e5e7eb;
          animation: slideDown 0.2s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .notification-dropdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .notification-dropdown-header h4 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: #111827;
        }

        .notification-close {
          background: none;
          border: none;
          font-size: 24px;
          color: #6b7280;
          cursor: pointer;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: background-color 0.15s ease;
        }

        .notification-close:hover {
          background: #f3f4f6;
        }

        .notification-list {
          max-height: 400px;
          overflow-y: auto;
          padding: 8px 0;
        }

        .notification-item {
          display: flex;
          gap: 12px;
          padding: 12px 20px;
          cursor: pointer;
          transition: background-color 0.15s ease;
          border-left: 3px solid transparent;
        }

        .notification-item:hover {
          background: #f9fafb;
        }

        .notification-item.unread {
          background: #eff6ff;
          border-left-color: #2563eb;
        }

        .notification-item.unread:hover {
          background: #dbeafe;
        }

        .notification-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #2563eb;
          margin-top: 6px;
          flex-shrink: 0;
        }

        .notification-content {
          flex: 1;
          min-width: 0;
        }

        .notification-title {
          margin: 0 0 4px 0;
          font-size: 14px;
          font-weight: 600;
          color: #111827;
        }

        .notification-message {
          margin: 0 0 4px 0;
          font-size: 13px;
          color: #6b7280;
          line-height: 1.4;
        }

        .notification-time {
          margin: 0;
          font-size: 12px;
          color: #9ca3af;
        }

        .notification-empty {
          padding: 40px 20px;
          text-align: center;
          color: #6b7280;
        }

        .notification-empty p {
          margin: 0;
        }

        .notification-footer {
          padding: 12px 20px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
        }

        .notification-footer .btn.tertiary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          background: #f3f4f6;
        }

        .notification-footer .btn.tertiary:disabled:hover {
          background: #f3f4f6;
        }

        .dashboard-content-wrapper {
          display: flex;
        }

        .dashboard-main {
          flex: 1;
          padding: 24px;
        }

        .card {
          background: #ffffff;
          padding: 24px;
          border-radius: 12px;
          margin-bottom: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .info-box {
          background: #eff6ff;
          padding: 12px;
          border-radius: 8px;
          margin: 16px 0;
          font-size: 14px;
        }

        .radio-group {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .radio-option {
          display: flex;
          gap: 12px;
          cursor: pointer;
        }

        .radio-option input {
          margin-top: 4px;
        }

        .success-box {
          margin-top: 16px;
          padding: 12px;
          background: #ecfdf5;
          border-radius: 8px;
          color: #065f46;
          font-size: 14px;
        }

        /* ===== LOI DOCUMENT CARD ===== */
        .loi-document-card {
          border: 1px solid #e5e7eb;
        }

        .loi-document-header {
          margin-bottom: 20px;
        }

        .loi-document-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .loi-document-icon {
          color: #1e40af;
          flex-shrink: 0;
        }

        .loi-document-title h3 {
          margin: 0;
          color: #1e40af;
          font-size: 18px;
          font-weight: 600;
        }

        .loi-document-content {
          margin-top: 16px;
        }

        .loi-document-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: #ffffff;
        }

        .loi-pdf-icon-wrapper {
          flex-shrink: 0;
        }

        .loi-pdf-icon {
          width: 48px;
          height: 56px;
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);
        }

        .loi-pdf-text {
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .loi-document-info {
          flex: 1;
          min-width: 0;
        }

        .loi-document-name {
          font-size: 15px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 4px;
          word-break: break-word;
        }

        .loi-document-meta {
          font-size: 13px;
          color: #9ca3af;
        }

        .loi-view-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #1e40af;
          color: #ffffff;
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: background-color 0.15s ease, box-shadow 0.15s ease;
          flex-shrink: 0;
        }

        .loi-view-btn:hover {
          background: #1e3a8a;
          box-shadow: 0 4px 10px rgba(30, 64, 175, 0.25);
        }

        .loi-eye-icon {
          width: 18px;
          height: 18px;
          color: #ffffff;
        }

        /* ===== LEGAL DOCUMENTS CARD ===== */
        .legal-documents-card {
          border: 1px solid #e5e7eb;
        }

        .legal-documents-header {
          margin-bottom: 20px;
        }

        .legal-documents-title {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .legal-documents-icon {
          color: #1e40af;
          flex-shrink: 0;
        }

        .legal-documents-title h3 {
          margin: 0;
          color: #1e40af;
          font-size: 18px;
          font-weight: 600;
        }

        .legal-documents-content {
          margin-top: 16px;
        }

        .legal-documents-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: #ffffff;
        }

        .legal-documents-pdf-icon-wrapper {
          flex-shrink: 0;
        }

        .legal-documents-pdf-icon {
          width: 48px;
          height: 56px;
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);
        }

        .legal-documents-pdf-text {
          color: #ffffff;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .legal-documents-info {
          flex: 1;
          min-width: 0;
        }

        .legal-documents-name {
          font-size: 15px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 4px;
          word-break: break-word;
        }

        .legal-documents-meta {
          font-size: 13px;
          color: #9ca3af;
        }

        .legal-documents-view-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #1e40af;
          color: #ffffff;
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: background-color 0.15s ease, box-shadow 0.15s ease;
          flex-shrink: 0;
        }

        .legal-documents-view-btn:hover {
          background: #1e3a8a;
          box-shadow: 0 4px 10px rgba(30, 64, 175, 0.25);
        }

        .legal-documents-eye-icon {
          width: 18px;
          height: 18px;
          color: #ffffff;
        }

        .legal-documents-empty-state {
          padding: 32px;
          text-align: center;
          color: #6b7280;
        }

        .legal-documents-empty-icon {
          font-size: 48px;
          margin-bottom: 12px;
        }

        .legal-documents-empty-state h4 {
          margin: 0 0 8px 0;
          color: #111827;
        }

        /* ===== LEGAL DOCUMENTS MODAL ===== */
        .legal-documents-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .legal-documents-modal-content {
          background: #ffffff;
          border-radius: 12px;
          width: 90%;
          max-width: 900px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .legal-documents-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .legal-documents-modal-header h3 {
          margin: 0;
          color: #111827;
          font-size: 18px;
          font-weight: 600;
        }

        .legal-documents-modal-close {
          background: none;
          border: none;
          font-size: 32px;
          color: #6b7280;
          cursor: pointer;
          line-height: 1;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: background-color 0.15s ease, color 0.15s ease;
        }

        .legal-documents-modal-close:hover {
          background: #f3f4f6;
          color: #111827;
        }

        .legal-documents-modal-body {
          flex: 1;
          overflow-y: auto;
          padding: 20px 24px;
        }

        .legal-documents-modal-empty {
          padding: 60px 20px;
          text-align: center;
          color: #6b7280;
        }

        .legal-documents-modal-empty-icon {
          font-size: 64px;
          margin-bottom: 16px;
        }

        .legal-documents-modal-empty h4 {
          margin: 0 0 8px 0;
          color: #111827;
          font-size: 18px;
        }

        .legal-documents-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .legal-documents-list-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: #ffffff;
          transition: box-shadow 0.15s ease, border-color 0.15s ease;
        }

        .legal-documents-list-item:hover {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          border-color: #d1d5db;
        }

        .legal-documents-list-pdf-icon {
          flex-shrink: 0;
        }

        .legal-documents-list-pdf-icon-inner {
          width: 40px;
          height: 48px;
          background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 4px rgba(220, 38, 38, 0.2);
        }

        .legal-documents-list-pdf-text {
          color: #ffffff;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        .legal-documents-list-info {
          flex: 1;
          min-width: 0;
        }

        .legal-documents-list-name {
          font-size: 15px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 6px;
          word-break: break-word;
        }

        .legal-documents-list-meta {
          font-size: 13px;
          color: #9ca3af;
          margin-bottom: 8px;
        }

        .legal-documents-list-status {
          margin-top: 4px;
        }

        .legal-documents-list-actions {
          display: flex;
          gap: 8px;
          flex-shrink: 0;
        }

        .legal-documents-modal-actions {
          display: flex;
          justify-content: flex-end;
          padding: 16px 24px;
          border-top: 1px solid #e5e7eb;
          background: #f9fafb;
        }

        /* ===== LOI SECTION (Legacy - kept for compatibility) ===== */
        .loi-card {
          border-left: 4px solid #2563eb;
        }

        .loi-header {
          margin-bottom: 20px;
        }

        .loi-header h3 {
          margin: 0 0 4px 0;
          color: #111827;
        }

        .loi-subtitle {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
        }

        .loi-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .loi-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .loi-info-item label {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }

        .loi-value {
          font-size: 16px;
          color: #111827;
          font-weight: 500;
        }

        .loi-status-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
        }

        .loi-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .loi-empty-state {
          padding: 32px;
          text-align: center;
          color: #6b7280;
        }

        .loi-empty-icon {
          font-size: 48px;
          margin-bottom: 12px;
        }

        .loi-empty-state h4 {
          margin: 0 0 8px 0;
          color: #111827;
        }

        /* ===== WORKFLOW SECTION ===== */
        .workflow-card {
          position: relative;
        }

        .workflow-card.workflow-disabled {
          opacity: 0.6;
          pointer-events: none;
        }

        .workflow-header {
          margin-bottom: 20px;
        }

        .workflow-header h3 {
          margin: 0 0 8px 0;
          color: #111827;
        }

        .workflow-locked-message {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px;
          background: #fef3c7;
          border-radius: 8px;
          color: #92400e;
          font-size: 14px;
          margin-top: 12px;
        }

        .lock-icon {
          font-size: 18px;
        }

        .workflow-steps {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .workflow-step-card {
          padding: 20px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          background: #f9fafb;
        }

        .workflow-step-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
          gap: 16px;
        }

        .workflow-step-title {
          display: flex;
          gap: 12px;
          flex: 1;
        }

        .step-number {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #2563eb;
          color: white;
          font-weight: bold;
          font-size: 14px;
          flex-shrink: 0;
        }

        .workflow-step-title h4 {
          margin: 0 0 4px 0;
          color: #111827;
          font-size: 16px;
        }

        .workflow-step-title p {
          margin: 0;
          font-size: 14px;
          color: #6b7280;
        }

        .workflow-step-status {
          flex-shrink: 0;
        }

        .workflow-status-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 600;
        }

        .workflow-section {
          margin: 20px 0;
        }

        .workflow-label {
          display: block;
          margin-bottom: 12px;
        }

        .workflow-label strong {
          display: block;
          margin-bottom: 8px;
          color: #111827;
          font-size: 14px;
        }

        .workflow-textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 14px;
          font-family: inherit;
          resize: vertical;
          min-height: 100px;
        }

        .workflow-textarea:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .workflow-checkbox-label {
          display: flex;
          gap: 12px;
          cursor: pointer;
          padding: 12px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          transition: background-color 0.15s ease;
        }

        .workflow-checkbox-label:hover {
          background-color: #f9fafb;
        }

        .workflow-checkbox-label input {
          margin-top: 4px;
        }

        .workflow-summary {
          margin: 20px 0;
          padding: 16px;
          background: #f9fafb;
          border-radius: 8px;
        }

        .workflow-summary h5 {
          margin: 0 0 12px 0;
          color: #111827;
          font-size: 16px;
        }

        .completed-card {
          background: #f8fafc;
        }

        .checklist {
          list-style: none;
          padding: 0;
          margin-top: 12px;
          color: #065f46;
        }

        .checklist li {
          margin-bottom: 6px;
        }

        /* ===== BUTTONS ===== */
        .btn {
          padding: 10px 18px;
          border-radius: 8px;
          font-size: 14px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
          transition: background-color 0.15s ease, box-shadow 0.15s ease,
            color 0.15s ease, transform 0.05s ease;
        }

        .btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }

        .btn.primary {
          background: #2563eb;
          color: white;
        }

        .btn.primary:hover:not(:disabled) {
          background: #1d4ed8;
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25);
        }

        .btn.secondary {
          background: #e5e7eb;
          color: #111827;
        }

        .btn.secondary:hover:not(:disabled) {
          background: #d1d5db;
        }

        .btn.tertiary {
          background: #f3f4f6;
          color: #111827;
          padding: 6px 10px;
          font-size: 13px;
        }

        .btn.tertiary:hover:not(:disabled) {
          background: #e5e7eb;
        }

        .btn.full {
          width: 100%;
          margin-top: 12px;
        }

        .action-row {
          display: flex;
          justify-content: space-between;
          margin-top: 24px;
        }

        /* ===== LEGAL UPLOAD SECTION ===== */
        .legal-upload-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .legal-upload-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          flex-wrap: wrap;
        }

        .legal-upload-subtitle {
          font-size: 14px;
          color: #6b7280;
          margin-top: 4px;
          max-width: 520px;
        }

        .legal-feedback {
          margin-top: 8px;
          padding: 10px 12px;
          border-radius: 8px;
          font-size: 13px;
        }

        .legal-feedback-success {
          background: #ecfdf5;
          color: #065f46;
        }

        .legal-feedback-neutral {
          background: #eff6ff;
          color: #1d4ed8;
        }

        /* ===== LEGAL DOC TABLE ===== */
        .legal-doc-header h3 {
          margin: 0;
        }

        .legal-doc-subtitle {
          font-size: 14px;
          color: #6b7280;
          margin-top: 4px;
        }

        .legal-empty-state {
          padding: 24px;
          text-align: center;
          color: #6b7280;
        }

        .legal-empty-icon {
          font-size: 32px;
          margin-bottom: 8px;
        }

        .legal-table-wrapper {
          margin-top: 16px;
          overflow-x: auto;
        }

        .legal-doc-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 14px;
        }

        .legal-doc-table th,
        .legal-doc-table td {
          padding: 10px 12px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
          white-space: nowrap;
        }

        .legal-doc-table th {
          font-weight: 600;
          color: #4b5563;
          background: #f9fafb;
        }

        .legal-doc-table tbody tr:hover {
          background: #f9fafb;
        }

        .legal-file-name {
          font-weight: 500;
          color: #111827;
        }

        .legal-actions-col {
          width: 1%;
        }

        .legal-row-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .status-select {
          border-radius: 6px;
          border: 1px solid #d1d5db;
          padding: 6px 8px;
          font-size: 13px;
          background: #ffffff;
          cursor: pointer;
        }

        .status-select:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* ===== STATUS BADGES ===== */
        .status-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 500;
        }

        .status-uploaded {
          background: #e5e7eb;
          color: #374151;
        }

        .status-in-review {
          background: #dbeafe;
          color: #1d4ed8;
        }

        .status-approved {
          background: #dcfce7;
          color: #166534;
        }

        .status-rejected {
          background: #fee2e2;
          color: #b91c1c;
        }

        @media (max-width: 768px) {
          .dashboard-main {
            padding: 16px;
          }

          .loi-info-grid {
            grid-template-columns: 1fr;
          }

          .workflow-step-header {
            flex-direction: column;
          }

          .loi-document-item {
            flex-direction: column;
            align-items: flex-start;
          }

          .loi-view-btn {
            width: 100%;
            justify-content: center;
          }

          .notification-dropdown {
            width: calc(100vw - 40px);
            right: -10px;
            max-width: 360px;
          }

          .header-right-section {
            gap: 12px;
          }

          .legal-documents-item {
            flex-direction: column;
            align-items: flex-start;
          }

          .legal-documents-view-btn {
            width: 100%;
            justify-content: center;
          }

          .legal-documents-modal-content {
            width: 95%;
            max-height: 95vh;
          }

          .legal-documents-list-item {
            flex-direction: column;
            align-items: flex-start;
          }

          .legal-documents-list-actions {
            width: 100%;
            justify-content: flex-start;
          }
        }

        /* ===== PDF MODAL STYLES ===== */
        .pdf-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .pdf-modal-content {
          background: #ffffff;
          border-radius: 12px;
          width: 90%;
          max-width: 1200px;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .pdf-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .pdf-modal-header h3 {
          margin: 0;
          color: #111827;
          font-size: 18px;
          font-weight: 600;
        }

        .pdf-modal-close {
          background: none;
          border: none;
          font-size: 32px;
          color: #6b7280;
          cursor: pointer;
          line-height: 1;
          padding: 0;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: background-color 0.15s ease, color 0.15s ease;
        }

        .pdf-modal-close:hover {
          background: #f3f4f6;
          color: #111827;
        }

        .pdf-modal-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .pdf-viewer {
          width: 100%;
          flex: 1;
          border: none;
          min-height: 600px;
        }

        .pdf-fallback-message {
          padding: 40px;
          text-align: center;
          color: #6b7280;
        }

        .pdf-fallback-message p {
          margin: 8px 0;
        }

        .pdf-modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
          padding: 16px 24px;
          border-top: 1px solid #e5e7eb;
          background: #f9fafb;
        }

        @media (max-width: 768px) {
          .pdf-modal-content {
            width: 95%;
            max-height: 95vh;
          }

          .pdf-modal-header {
            padding: 16px;
          }

          .pdf-modal-header h3 {
            font-size: 16px;
          }

          .pdf-viewer {
            min-height: 400px;
          }

          .pdf-modal-actions {
            flex-direction: column;
            padding: 12px 16px;
          }

          .pdf-modal-actions .btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}