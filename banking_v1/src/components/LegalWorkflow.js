"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import { useAuth } from "@/contexts/AuthContext";
import PermissionWrapper from "@/components/PermissionWrapper";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/legalWorkflow.css";

export default function LegalWorkflow() {
  const router = useRouter();
  const { user, canUpload } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // All restrictions removed - all users have full access
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: 1,
      name: "LOI_Draft_Downtown_Arts_Plaza.pdf",
      size: 2.4,
      date: new Date("2024-12-16").toISOString(),
      type: "pdf",
    },
    {
      id: 2,
      name: "Property_Inspection_Report.docx",
      size: 1.8,
      date: new Date("2024-12-15").toISOString(),
      type: "doc",
    },
    {
      id: 3,
      name: "Business_Approval_Document.pdf",
      size: 1.2,
      date: new Date("2024-12-16").toISOString(),
      type: "pdf",
    },
  ]);
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  // Get file type from extension
  const getFileType = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();
    if (ext === "pdf") return "pdf";
    if (["doc", "docx"].includes(ext)) return "doc";
    return "pdf";
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Process files
  const handleFiles = (files) => {
    const validFiles = files.filter((file) => {
      const ext = file.name.split(".").pop().toLowerCase();
      const validTypes = ["pdf", "doc", "docx"];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (!validTypes.includes(ext)) {
        alert(`${file.name} is not a valid file type. Please upload PDF, DOC, or DOCX files.`);
        return false;
      }

      if (file.size > maxSize) {
        alert(`${file.name} exceeds the maximum file size of 10MB.`);
        return false;
      }

      return true;
    });

    const newFiles = validFiles.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size / (1024 * 1024), // Convert to MB
      date: new Date().toISOString(),
      type: getFileType(file.name),
      file: file, // Store the actual file object
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  // Handle file delete
  const handleDeleteFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  // Handle upload area click
  const handleUploadClick = () => {
    if (canUpload("legalWorkflow")) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <button
          className="header-hamburger"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="hamburger-icon">
            <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="header-search">
          <input
            type="text"
            placeholder="Search branch..."
            className="header-search-input"
          />
        </div>
        <div className="header-actions">
          <button className="header-icon-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 2C10.5523 2 11 2.44772 11 3V4H15C15.5523 4 16 4.44772 16 5C16 5.55228 15.5523 6 15 6H5C4.44772 6 4 5.55228 4 5C4 4.44772 4.44772 4 5 4H9V3C9 2.44772 9.44772 2 10 2Z"
                fill="#6b7280"
              />
              <path
                d="M5 8H15L14.4 15.2C14.3 16.8 13 18 11.4 18H8.6C7 18 5.7 16.8 5.6 15.2L5 8Z"
                fill="#6b7280"
              />
            </svg>
          </button>
          <div className="header-profile">
            <div className="profile-avatar">AM</div>
            <div className="profile-info">
              <span className="profile-name">Ana Miller</span>
              <span className="profile-email">analyst@pms.com</span>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="dropdown-chevron"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="#6b7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </header>

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="dashboard-main">
          <div className="main-content">
            <PageHeader
              title="Legal Workflow - LOI Signing"
              subtitle="Formalize the Letter of Intent for the approved property."
            />

            {/* Back to Business Approval Link */}
            <Link href="/business-approval" className="back-to-business-approval">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="back-arrow"
              >
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Business Approval
            </Link>

            {/* Property Overview Header */}
            <div className="property-overview-header">
              <div className="property-overview-left">
                <h2 className="property-name-header">Downtown Arts Plaza</h2>
                <div className="property-address-header">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="map-pin-icon-header"
                  >
                    <path
                      d="M8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z"
                      fill="#ef4444"
                    />
                    <path
                      d="M8 1C5.23858 1 3 3.23858 3 6C3 10 8 15 8 15C8 15 13 10 13 6C13 3.23858 10.7614 1 8 1Z"
                      stroke="#ef4444"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>1450 Biscayne Boulevard, Miami, FL 33132</span>
                </div>
                <div className="property-status-row">
                  <div className="loi-status-tag">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M14 2H2V14H14V2Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 2V14M10 2V14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    LOI In Progress
                  </div>
                  <span className="property-id-text">Property ID: PROP-MIA-2024-002</span>
                </div>
              </div>
              <div className="property-overview-right">
                <div className="property-price-header">₹48,43,00,000</div>
                <div className="approval-date">Approved on Dec 16, 2024</div>
              </div>
            </div>

            {/* LOI Status Tracker */}
            <div className="loi-status-tracker-card">
              <div className="loi-tracker-header">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="tracker-icon"
                >
                  <path
                    d="M2 3H14V13H2V3Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 3V13M10 3V13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <h3 className="tracker-title">LOI Status Tracker</h3>
              </div>
              <div className="loi-stages-container">
                {/* Draft Created */}
                <div className="loi-stage">
                  <div className="loi-stage-connector completed"></div>
                  <div className="loi-stage-icon completed">
                    <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M13 4L6 11L3 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="loi-stage-content">
                    <div className="loi-stage-name">Draft Created</div>
                    <div className="loi-stage-date">Dec 16, 2024</div>
                    <span className="loi-stage-status completed">Completed</span>
                  </div>
                </div>

                {/* Signing */}
                <div className="loi-stage">
                  <div className="loi-stage-connector pending"></div>
                  <div className="loi-stage-icon current">
                    <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 2V6M8 10V14M2 8H6M10 8H14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="loi-stage-content">
                    <div className="loi-stage-name">Signing</div>
                    <div className="loi-stage-date">In Progress</div>
                    <span className="loi-stage-status current">Current Stage</span>
                  </div>
                </div>

                {/* Circulated */}
                <div className="loi-stage">
                  <div className="loi-stage-connector pending"></div>
                  <div className="loi-stage-icon pending">
                    <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M2 8L6 4L10 8M6 4V12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="loi-stage-content">
                    <div className="loi-stage-name">Circulated</div>
                    <div className="loi-stage-date">Pending</div>
                    <span className="loi-stage-status pending">Not Started</span>
                  </div>
                </div>

                {/* Finalized */}
                <div className="loi-stage">
                  <div className="loi-stage-icon pending">
                    <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M13 4L6 11L3 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="loi-stage-content">
                    <div className="loi-stage-name">Finalized</div>
                    <div className="loi-stage-date">Pending</div>
                    <span className="loi-stage-status pending">Not Started</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Document Upload and LOI Details Grid */}
            <div className="loi-content-grid">
              {/* Document Upload Card */}
              <div className="document-upload-card">
                <div className="upload-header">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="upload-icon"
                  >
                    <path
                      d="M8 2V10M4 6L8 2L12 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 10V14C2 14.5523 2.44772 15 3 15H13C13.5523 15 14 14.5523 14 14V10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h3 className="upload-title">Document Upload</h3>
                </div>
                <PermissionWrapper page="legalWorkflow" action="upload">
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileSelect}
                    style={{ display: "none" }}
                  />
                  <div
                    className={`upload-area ${isDragging ? "dragging" : ""}`}
                    onClick={handleUploadClick}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    style={{ cursor: canUpload("legalWorkflow") ? "pointer" : "not-allowed", opacity: canUpload("legalWorkflow") ? 1 : 0.5 }}
                  >
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="upload-icon-large"
                    >
                      <path
                        d="M14 2H2V14H14V2Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 2V14M10 2V14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M8 6V10M6 8H10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="upload-text">Click to upload or drag and drop</div>
                    <div className="upload-file-types">PDF, DOC, DOCX (Max 10MB)</div>
                  </div>
                </PermissionWrapper>
                {!canUpload("legalWorkflow") && (
                  <div style={{ padding: "12px", color: "#6b7280", fontSize: "14px", textAlign: "center" }}>
                    Only Admin/Ops can upload documents
                  </div>
                )}
                <div className="uploaded-files-list">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="uploaded-file-item">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 16 16"
                        fill="none"
                        className={`file-icon ${file.type}`}
                      >
                        <path
                          d="M14 2H2V14H14V2Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M6 2V14M10 2V14"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="file-info">
                        <span className="file-name">{file.name}</span>
                        <span className="file-meta">
                          {file.size.toFixed(1)} MB • {formatDate(file.date)}
                        </span>
                      </div>
                      <PermissionWrapper page="legalWorkflow" action="upload">
                        <button
                          className="file-delete-btn"
                          aria-label="Delete file"
                          onClick={() => handleDeleteFile(file.id)}
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M4 4L12 12M12 4L4 12"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </PermissionWrapper>
                    </div>
                  ))}
                  {uploadedFiles.length === 0 && (
                    <div style={{ padding: "20px", textAlign: "center", color: "#6b7280" }}>
                      No documents uploaded yet
                    </div>
                  )}
                </div>
              </div>

              {/* LOI Details Card */}
              <div className="loi-details-card">
                <div className="loi-details-header">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="loi-details-icon"
                  >
                    <path
                      d="M14 2H2V14H14V2Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 2V14M10 2V14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <h3 className="loi-details-title">LOI Details</h3>
                </div>
                <div className="loi-details-list">
                  <div className="loi-detail-item">
                    <span className="loi-detail-label">LOI Number</span>
                    <span className="loi-detail-value">LOI-2024-MIA-002</span>
                  </div>
                  <div className="loi-detail-item">
                    <span className="loi-detail-label">Draft Date</span>
                    <span className="loi-detail-value">Dec 16, 2024</span>
                  </div>
                  <div className="loi-detail-item">
                    <span className="loi-detail-label">Validity Period</span>
                    <span className="loi-detail-value">30 Days</span>
                  </div>
                  <div className="loi-detail-item">
                    <span className="loi-detail-label">Expiry Date</span>
                    <span className="loi-detail-value">Jan 15, 2025</span>
                  </div>
                  <div className="loi-detail-item">
                    <span className="loi-detail-label">Proposed Price</span>
                    <span className="loi-detail-value bold">₹48,43,00,000</span>
                  </div>
                  <div className="loi-detail-item">
                    <span className="loi-detail-label">Earnest Money</span>
                    <span className="loi-detail-value">₹2,42,15,000 (5%)</span>
                  </div>
                  <div className="loi-detail-item">
                    <span className="loi-detail-label">Legal Team</span>
                    <span className="loi-detail-value">Smith & Associates</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Section */}
            <div className="actions-card">
              <div className="actions-header">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="actions-icon"
                >
                  <path
                    d="M14 10L18 6M18 6L14 2M18 6H6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 18L6 14M6 14L10 10M6 14H18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="actions-title">Actions</h3>
              </div>
              <div className="actions-buttons">
                <button 
                  className="action-button provide-documents-btn"
                >
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="button-icon">
                    <path
                      d="M14 2H2V14H14V2Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 2V14M10 2V14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>Provide Documents to Legal</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="arrow-icon">
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  className="action-button circulate-loi-btn"
                  onClick={() => {
                    console.log("Circulating LOI");
                    // Navigation removed
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="button-icon">
                    <path
                      d="M2 8L6 4L10 8M6 4V12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Circulate LOI</span>
                </button>
              </div>
              <div className="next-steps-section">
                <div className="next-step-item">
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="step-arrow">
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="step-content">
                    <div className="step-title">Provide Documents to Legal:</div>
                    <div className="step-description">Submit all uploaded documents to the legal team for review and verification</div>
                  </div>
                </div>
                <div className="next-step-item">
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="step-arrow">
                    <path
                      d="M6 4L10 8L6 12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="step-content">
                    <div className="step-title">Circulate LOI:</div>
                    <div className="step-description">Once signed, circulate the LOI to all stakeholders and proceed to Post-LOI Activities</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

