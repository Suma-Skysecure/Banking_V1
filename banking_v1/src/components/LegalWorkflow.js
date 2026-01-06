"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import DashboardHeader from "@/components/DashboardHeader";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/businessApproval.css";

export default function LegalWorkflow() {
  const router = useRouter();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const fileInputRef = useRef(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const multipleFileInputRef = useRef(null);
  const [isLOIUploaded, setIsLOIUploaded] = useState(false);
  
  // All restrictions removed - all users have full access

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  // Get file type extension
  const getFileExtension = (fileName) => {
    if (!fileName) return "FILE";
    const ext = fileName.split(".").pop().toUpperCase();
    return ext || "FILE";
  };

  // Check for duplicate files
  const isDuplicateFile = (newFile) => {
    return uploadedFiles.some(
      (existingFile) =>
        existingFile.name === newFile.name &&
        existingFile.size === newFile.size &&
        existingFile.lastModified === newFile.lastModified
    );
  };

  // Validate and process files
  const processFiles = (fileList) => {
    const newFiles = Array.from(fileList);
    const validFiles = [];
    const duplicates = [];

    newFiles.forEach((file) => {
      // Check for duplicates
      if (isDuplicateFile(file)) {
        duplicates.push(file.name);
        return;
      }

      // Validate file size (10MB max - optional)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        alert(`File "${file.name}" exceeds 10MB limit. Please upload a smaller file.`);
        return;
      }

      validFiles.push({
        id: Date.now() + Math.random(), // Unique ID
        file: file,
        name: file.name,
        size: file.size,
        progress: 100, // Set to 100 immediately for simplicity
      });
    });

    if (duplicates.length > 0) {
      alert(`The following files are already uploaded: ${duplicates.join(", ")}`);
    }

    if (validFiles.length > 0) {
      setUploadedFiles((prev) => [...prev, ...validFiles]);
    }
  };

  // Handle file selection from input
  const handleMultipleFileSelect = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      processFiles(selectedFiles);
    }
    // Reset input to allow selecting same file again
    if (multipleFileInputRef.current) {
      multipleFileInputRef.current.value = "";
    }
  };

  // Handle drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      processFiles(droppedFiles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Handle browse button click
  const handleBrowseClick = () => {
    multipleFileInputRef.current?.click();
  };

  // Remove file from list
  const handleRemoveFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((fileObj) => fileObj.id !== fileId));
  };

  // Check if submit is enabled (at least 3 files uploaded)
  const isSubmitEnabled = uploadedFiles.length >= 3;

  // Handle submit
  const handleSubmit = async () => {
    if (!isSubmitEnabled) {
      alert("Please upload at least 3 documents before proceeding.");
      return;
    }
    console.log("Submitting documents:", uploadedFiles);
    
    // Convert all files to base64 and store in localStorage
    try {
      const documentsToStore = [];
      
      // Process each file
      for (const fileObj of uploadedFiles) {
        const file = fileObj.file;
        const fileData = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve({
              id: fileObj.id,
              name: file.name,
              fileName: file.name,
              size: file.size,
              type: file.type,
              uploadDate: new Date().toISOString(),
              data: event.target.result, // base64 string
              status: "Verified",
            });
          };
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        
        documentsToStore.push(fileData);
      }
      
      // Store all documents in localStorage
      localStorage.setItem("uploadedLegalDocuments", JSON.stringify(documentsToStore));
      
      // Show success message
      alert(`Successfully submitted ${uploadedFiles.length} document(s)! The documents are now available in the Legal Due page.`);
    } catch (error) {
      console.error("Error processing files:", error);
      alert("Error processing files. Please try again.");
    }
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="dashboard-main">
          <div className="main-content">
            <PageHeader
              title="LOI Signing"
              subtitle="Review and sign the Letter of Intent for the approved property."
            />

            {/* Back to Business Approval Link */}
            <Link href="/business-approval" className="back-to-property-details">
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

            {/* Property Overview Card */}
            <div className="property-overview-card">
              <div className="property-overview-left">
                <h2 className="property-name-large">Downtown Arts Plaza</h2>
                <div className="property-address-large">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="map-pin-icon-large"
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
                <div className="property-status-section">
                  <div className="property-status-tag pending">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="status-icon"
                    >
                      <circle
                        cx="8"
                        cy="8"
                        r="7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M8 4V8L10.5 10.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Pending LOI Signing
                  </div>
                  <div className="submitted-date">Approved on Dec 15, 2024</div>
                </div>
              </div>
              <div className="property-overview-right">
                <div className="property-price-large">₹48,43,00,000</div>
                <div className="property-price-per-sqft-large">₹1,15,313 per sq ft</div>
              </div>
            </div>

            {/* Business Details Summary Card */}
            <div className="business-details-card">
              <div className="card-header">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="card-icon"
                >
                  <path
                    d="M2 4H14V12H2V4Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 4V12M10 4V12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <h3 className="card-title">Business Details Summary</h3>
              </div>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Property ID</span>
                  <span className="detail-value">PROP-MIA-2024-002</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Parking Spaces</span>
                  <span className="detail-value">8 Reserved</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Zoning</span>
                  <span className="detail-value">Commercial/Retail</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Property Type</span>
                  <span className="detail-value">Mixed Use</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Year Built</span>
                  <span className="detail-value">2019</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Listing Status</span>
                  <span className="detail-value">
                    <span className="status-badge active">Active</span>
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Total Area</span>
                  <span className="detail-value">4,200 sq ft</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Vendor Name</span>
                  <span className="detail-value">Biscayne Development</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Availability</span>
                  <span className="detail-value">30 days</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Floor Level</span>
                  <span className="detail-value">Ground Floor + Mezzanine</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Vendor Contact</span>
                  <span className="detail-value">+1 (305) 555-0198</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Last Inspection</span>
                  <span className="detail-value">Dec 10, 2024</span>
                </div>
              </div>
            </div>

            {/* Approval Status Card */}
            <div className="approval-grid">
              {/* LOI Signing Status Card */}
              <div className="approval-status-card">
                <div className="card-header">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="card-icon"
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path
                      d="M9 12L11 14L15 10"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h3 className="card-title">LOI Signing Status</h3>
                </div>
                <div className="current-status-section">
                  <div className="status-display">
                    <div className="status-circle pending">
                      <svg
                        width="32"
                        height="32"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="status-circle-icon"
                      >
                        <circle
                          cx="8"
                          cy="8"
                          r="7"
                          stroke="#f59e0b"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M8 4V8L10.5 10.5"
                          stroke="#f59e0b"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="status-text-section">
                      <h4 className="status-title">Pending LOI Signing</h4>
                      <span className="status-badge-inline in-progress">In Progress</span>
                    </div>
                  </div>
                </div>
                <div className="status-timeline">
                  <div className="timeline-item">
                    <div className="timeline-icon-wrapper completed">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="timeline-icon"
                      >
                        <path
                          d="M13 4L6 11L3 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-title">Property Submitted</div>
                      <div className="timeline-date">Dec 15, 2024 at 10:30 AM</div>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-icon-wrapper completed">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="timeline-icon"
                      >
                        <path
                          d="M13 4L6 11L3 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-title">Business Review</div>
                      <div className="timeline-date">Dec 15, 2024 at 11:00 AM</div>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-icon-wrapper pending">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="timeline-icon"
                      >
                        <path
                          d="M8 2V6M8 10V14M2 8H6M10 8H14"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-title">LOI Signing</div>
                      <div className="timeline-status">Awaiting signature</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* LOI Signing Decision Section */}
            <div className="decision-section-grid">
              {/* Left Column - Workflow Timeline */}
              <div className="decision-left-column">
                <div className="workflow-timeline-vertical">
                  <div className="workflow-timeline-item completed">
                    <div className="workflow-timeline-icon-wrapper completed">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="workflow-timeline-icon"
                      >
                        <path
                          d="M13 4L6 11L3 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="workflow-timeline-content">
                      <div className="workflow-timeline-title">Property Submitted</div>
                      <div className="workflow-timeline-date">Dec 15, 2024 at 10:30 AM</div>
                    </div>
                  </div>
                  <div className="workflow-timeline-connector"></div>
                  <div className="workflow-timeline-item completed">
                    <div className="workflow-timeline-icon-wrapper completed">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="workflow-timeline-icon"
                      >
                        <path
                          d="M13 4L6 11L3 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="workflow-timeline-content">
                      <div className="workflow-timeline-title">Business Review</div>
                      <div className="workflow-timeline-date">Dec 15, 2024 at 11:00 AM</div>
                    </div>
                  </div>
                  <div className="workflow-timeline-connector"></div>
                  <div className="workflow-timeline-item active">
                    <div className="workflow-timeline-icon-wrapper active">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="workflow-timeline-icon"
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
                    </div>
                    <div className="workflow-timeline-content">
                      <div className="workflow-timeline-title">LOI Signing</div>
                      <div className="workflow-timeline-status">Awaiting signature</div>
                    </div>
                  </div>
                </div>
                <div className="estimated-review-time-box">
                  <div className="info-icon-wrapper">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="info-icon"
                    >
                      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
                      <path
                        d="M10 6V10M10 14H10.01"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="info-content">
                    <div className="info-title">Estimated Processing Time</div>
                    <div className="info-text">
                      LOI signing typically takes 2-3 business days. You will be notified once the LOI is signed and ready.
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Submission Details */}
              <div className="decision-right-column">
                <div className="submission-details-card">
                  <div className="history-item">
                    <div className="history-avatar">S</div>
                    <div className="history-content">
                      <div className="history-header">
                        <span className="history-name">SRBM</span>
                        <span className="history-badge submitted">Approved</span>
                      </div>
                      <div className="history-action">Approved property for LOI signing</div>
                      <div className="history-date">Dec 15, 2024 at 11:00 AM</div>
                    </div>
                  </div>
                </div>
                <div className="current-status-indicator">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="status-dots-icon"
                  >
                    <circle cx="4" cy="10" r="1.5" fill="currentColor" />
                    <circle cx="10" cy="10" r="1.5" fill="currentColor" />
                    <circle cx="16" cy="10" r="1.5" fill="currentColor" />
                  </svg>
                  <span className="status-indicator-text">Awaiting LOI signature</span>
                </div>
              </div>
            </div>

            {/* Upload Signed LOI Card */}
            <div className="business-decision-card">
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
                <h3 className="card-title">Upload Signed LOI</h3>
              </div>

              <div className="decision-form" style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "40px 20px" }}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      console.log("File selected:", file.name);
                      
                      // Read file as base64 and store in localStorage
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const fileData = {
                          name: file.name,
                          size: file.size,
                          type: file.type,
                          uploadDate: new Date().toISOString(),
                          data: event.target.result, // base64 string
                        };
                        
                        // Store in localStorage
                        localStorage.setItem("uploadedSignedLOI", JSON.stringify(fileData));
                        
                        // Update upload status
                        setIsLOIUploaded(true);
                        
                        // Show success message
                        alert(`File "${file.name}" uploaded successfully! The document is now available in Post-LOI Activities and Legal Due pages.`);
                      };
                      reader.onerror = () => {
                        alert("Error reading file. Please try again.");
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  style={{ display: "none" }}
                />
                <button
                  className={isLOIUploaded ? "decision-button" : "decision-button approve-button"}
                  onClick={() => {
                    if (!isLOIUploaded) {
                      fileInputRef.current?.click();
                    }
                  }}
                  disabled={isLOIUploaded}
                  style={{
                    padding: "14px 32px",
                    fontSize: "16px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    backgroundColor: isLOIUploaded ? "#10b981" : undefined,
                    color: isLOIUploaded ? "#ffffff" : undefined,
                    cursor: isLOIUploaded ? "default" : "pointer",
                    opacity: isLOIUploaded ? 1 : undefined
                  }}
                >
                  {isLOIUploaded ? (
                    <>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="button-icon"
                      >
                        <path
                          d="M16.667 5L7.5 14.167L3.333 10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Uploaded
                    </>
                  ) : (
                    <>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="button-icon"
                      >
                        <path
                          d="M10 2V12M6 8L10 2L14 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2 16V17C2 18.1046 2.89543 19 4 19H16C17.1046 19 18 18.1046 18 17V16"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      Upload signed LOI
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Document Upload Card */}
            <div className="business-decision-card">
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
                <h3 className="card-title">Upload Legal Documents</h3>
              </div>

              <div className="decision-form" style={{ padding: "20px" }}>
                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ fontSize: "14px", fontWeight: "700", color: "#1f2937", textAlign: "center", margin: "0 0 16px 0", letterSpacing: "1px" }}>
                    UPLOAD FILES
                  </h4>

                  {/* Single Upload Area */}
                  <div style={{ marginBottom: "20px" }}>
                    <input
                      ref={multipleFileInputRef}
                      type="file"
                      multiple
                      onChange={handleMultipleFileSelect}
                      style={{ display: "none" }}
                    />

                    <div
                      onClick={handleBrowseClick}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      style={{
                        border: `2px dashed ${isDragging ? "#3b82f6" : "#cbd5e1"}`,
                        borderRadius: "8px",
                        padding: "40px 20px",
                        textAlign: "center",
                        cursor: "pointer",
                        transition: "all 0.3s",
                        background: isDragging ? "#eff6ff" : "white",
                        minHeight: "200px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div style={{ marginBottom: "12px" }}>
                        <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
                          <defs>
                            <linearGradient id="upload-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#9ca3af" />
                              <stop offset="100%" stopColor="#6b7280" />
                            </linearGradient>
                          </defs>
                          <rect
                            x="10"
                            y="10"
                            width="80"
                            height="80"
                            rx="8"
                            fill="url(#upload-gradient)"
                          />
                          <text
                            x="50"
                            y="60"
                            fontSize="20"
                            fontWeight="bold"
                            fill="white"
                            textAnchor="middle"
                          >
                            FILE
                          </text>
                        </svg>
                      </div>
                      <div style={{ fontSize: "14px", fontWeight: "600", color: "#6b7280", marginBottom: "8px", marginTop: "12px" }}>
                        Drag & Drop files here
                      </div>
                      <div style={{ fontSize: "12px", color: "#9ca3af", margin: "8px 0" }}>or</div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBrowseClick();
                        }}
                        style={{
                          background: "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)",
                          color: "white",
                          border: "none",
                          padding: "10px 24px",
                          borderRadius: "6px",
                          fontSize: "13px",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "all 0.2s",
                          margin: "4px 0",
                        }}
                        onMouseOver={(e) => (e.target.style.background = "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)")}
                        onMouseOut={(e) => (e.target.style.background = "linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)")}
                      >
                        Browse
                      </button>
                      <div style={{ fontSize: "11px", color: "#9ca3af", marginTop: "12px", fontStyle: "italic" }}>
                        Select multiple files (Ctrl/Cmd + Click) or drag and drop
                      </div>
                    </div>

                    {/* File List */}
                    {uploadedFiles.length > 0 && (
                      <div style={{ marginTop: "20px" }}>
                        <div style={{ marginBottom: "12px" }}>
                          <span style={{ fontSize: "13px", fontWeight: "600", color: "#6b7280" }}>
                            {uploadedFiles.length} file{uploadedFiles.length !== 1 ? "s" : ""} uploaded
                          </span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxHeight: "300px", overflowY: "auto", paddingRight: "4px" }}>
                          {uploadedFiles.map((fileObj) => (
                            <div
                              key={fileObj.id}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "12px",
                                background: "white",
                                border: "1px solid #e5e7eb",
                                borderRadius: "8px",
                                padding: "12px",
                                transition: "all 0.2s",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.borderColor = "#3b82f6";
                                e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.borderColor = "#e5e7eb";
                                e.currentTarget.style.boxShadow = "none";
                              }}
                            >
                              <div style={{ flexShrink: 0 }}>
                                <svg width="36" height="36" viewBox="0 0 100 100" fill="none">
                                  <defs>
                                    <linearGradient
                                      id={`gradient-${fileObj.id}`}
                                      x1="0%"
                                      y1="0%"
                                      x2="100%"
                                      y2="100%"
                                    >
                                      <stop offset="0%" stopColor="#3b82f6" />
                                      <stop offset="100%" stopColor="#60a5fa" />
                                    </linearGradient>
                                  </defs>
                                  <rect
                                    x="10"
                                    y="10"
                                    width="80"
                                    height="80"
                                    rx="8"
                                    fill={`url(#gradient-${fileObj.id})`}
                                  />
                                  <text
                                    x="50"
                                    y="60"
                                    fontSize="16"
                                    fontWeight="bold"
                                    fill="white"
                                    textAnchor="middle"
                                  >
                                    {getFileExtension(fileObj.name)}
                                  </text>
                                </svg>
                              </div>
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: "13px", fontWeight: "600", color: "#1f2937", marginBottom: "4px", wordBreak: "break-word", overflowWrap: "break-word" }}>
                                  {fileObj.name}
                                </div>
                                <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "6px" }}>
                                  {formatFileSize(fileObj.size)}
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "11px", fontWeight: "500", color: "#10b981" }}>
                                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                                    <circle
                                      cx="10"
                                      cy="10"
                                      r="9"
                                      stroke="#10b981"
                                      strokeWidth="2"
                                      fill="#ecfdf5"
                                    />
                                    <path
                                      d="M6 10L9 13L14 7"
                                      stroke="#10b981"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                  Uploaded
                                </div>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleRemoveFile(fileObj.id);
                                }}
                                style={{
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  color: "#ef4444",
                                  padding: "4px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  borderRadius: "4px",
                                  transition: "all 0.2s",
                                  flexShrink: 0,
                                  opacity: 0.7,
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.backgroundColor = "#fef2f2";
                                  e.target.style.opacity = "1";
                                  e.target.style.transform = "scale(1.1)";
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.backgroundColor = "transparent";
                                  e.target.style.opacity = "0.7";
                                  e.target.style.transform = "scale(1)";
                                }}
                                title="Remove file"
                              >
                                <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                                  <path
                                    d="M15 5L5 15M5 5L15 15"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div style={{ display: "flex", justifyContent: "center", marginTop: "24px" }}>
                    <button
                      className="decision-button approve-button"
                      onClick={handleSubmit}
                      disabled={!isSubmitEnabled}
                      style={{
                        padding: "14px 32px",
                        fontSize: "16px",
                        fontWeight: "600",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        opacity: isSubmitEnabled ? 1 : 0.5,
                        cursor: isSubmitEnabled ? "pointer" : "not-allowed",
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
                          d="M16 5L7 14L4 11"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Submit & Approve
                    </button>
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
