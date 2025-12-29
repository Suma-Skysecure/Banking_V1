"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import WorkflowTimeline from "@/components/WorkflowTimeline";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/workflowTimeline.css";
import "@/css/postLOIActivities.css";

export default function AgreementRegistration() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [uploadedFile, setUploadedFile] = useState(null);
  const { user } = useAuth();
  
  // Check if user is Legal Team (view-only)
  const isLegalTeam = user?.role === "Legal Team";

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
              className="profile-arrow"
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
            {/* Workflow Timeline */}
            <WorkflowTimeline activeStage="Agreement Registration" />
            
            <PageHeader
              title="Agreement Registration"
              subtitle="Register the executed agreement and track the final steps before property integration."
            />

            {/* Back Link */}
            <Link href="/agreement-execution" className="back-to-legal-workflow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="back-arrow">
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Agreement Execution
            </Link>

            {/* Property Overview */}
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
                  <div className="loi-status-tag" style={{ backgroundColor: "#ede9fe", color: "#7c3aed" }}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M2 2H14V14H2V2Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 6H14M6 2V14M10 2V14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    Ready for Registration
                  </div>
                  <span className="property-id-text">Property ID: PROP-MIA-2024-002</span>
                </div>
              </div>
              <div className="property-overview-right">
                <div className="property-price-header">₹48,43,00,000</div>
                <div className="loi-circulated-date">Agreement Executed on Dec 24, 2024</div>
              </div>
            </div>

            {/* Agreement Registration Status */}
            <div className="agreement-status-section">
              <div className="section-header">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="section-icon">
                  <path
                    d="M13 4L6 11L3 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="section-title">Agreement Registration Status</h3>
              </div>
              <div className="status-cards-grid">
                <div className="status-card orange-bg">
                  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" className="status-card-icon">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M8 4V8L10.5 10.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="status-card-content">
                    <div className="status-card-label">Registration Status</div>
                    <div className="status-card-value orange">Pending Upload</div>
                  </div>
                </div>
                <div className="status-card blue-bg">
                  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" className="status-card-icon">
                    <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M2 6H14M5 1V3M11 1V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M4 9H6M8 9H10M4 11H6M8 11H10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    <path
                      d="M13 4L6 11L3 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="status-card-content">
                    <div className="status-card-label">Registration Date</div>
                    <div className="status-card-value blue">Dec 26, 2024</div>
                  </div>
                </div>
                <div className="status-card green-bg">
                  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" className="status-card-icon">
                    <path
                      d="M2 3H14V13H2V3Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 3V13M10 3V13M2 7H14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="status-card-content">
                    <div className="status-card-label">Registry Office</div>
                    <div className="status-card-value green">Miami-Dade</div>
                  </div>
                </div>
                <div className="status-card purple-bg">
                  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" className="status-card-icon">
                    <path
                      d="M2 2H14V14H2V2Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 6H14M6 2V14M10 2V14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M8 4L10 6L8 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="status-card-content">
                    <div className="status-card-label">Registration Fee</div>
                    <div className="status-card-value purple">₹2,42,150</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upload and Requirements Grid */}
            <div className="registration-content-grid">
              {/* Upload Signed Agreement */}
              <div className="upload-agreement-card">
                <div className="card-header">
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="card-icon">
                    <path
                      d="M8 2C6.89543 2 6 2.89543 6 4V6H4C2.89543 6 2 6.89543 2 8V12C2 13.1046 2.89543 14 4 14H12C13.1046 14 14 13.1046 14 12V8C14 6.89543 13.1046 6 12 6H10V4C10 2.89543 9.10457 2 8 2Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 10V6M8 6L6 8M8 6L10 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h3 className="card-title">Upload Signed Agreement</h3>
                </div>
                
                <div 
                  className="upload-area"
                  style={isLegalTeam ? { 
                    opacity: 0.5, 
                    cursor: "not-allowed",
                    pointerEvents: "none"
                  } : {}}
                >
                  <svg width="64" height="64" viewBox="0 0 16 16" fill="none" className="upload-icon-large">
                    <path
                      d="M2 3H14V13H2V3Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 7V11M8 11L6 9M8 11L10 9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="upload-text">Upload Signed Agreement</div>
                  <div className="upload-instructions">Drag and drop your signed agreement file here, or click to browse</div>
                  <button 
                    className="browse-files-button"
                    disabled={isLegalTeam}
                    style={isLegalTeam ? { opacity: 0.5, cursor: "not-allowed" } : {}}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="button-icon">
                      <path
                        d="M2 2H14V14H2V2Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 6H14M6 2V14M10 2V14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    Browse Files
                  </button>
                </div>
                {isLegalTeam && (
                  <div style={{ 
                    padding: "12px", 
                    color: "#6b7280", 
                    fontSize: "14px", 
                    textAlign: "center",
                    backgroundColor: "#fef3c7",
                    borderRadius: "6px",
                    marginTop: "12px"
                  }}>
                    Legal Team: View-only access. Cannot upload or edit details.
                  </div>
                )}
                
                <div className="upload-requirements-box">
                  <div className="requirements-header">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="info-icon">
                      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                      <path
                        d="M8 5V8M8 11H8.01"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <h4 className="requirements-title">Upload Requirements</h4>
                  </div>
                  <ul className="requirements-list">
                    <li>File must be in PDF format</li>
                    <li>Maximum file size: 10 MB</li>
                    <li>Agreement must contain all required signatures</li>
                    <li>Document must be notarized (if required)</li>
                  </ul>
                </div>
              </div>

              {/* Registration Requirements - Three Separate Cards */}
              <div className="requirements-cards-grid">
                {/* Required Documents Card */}
                <div className="requirement-info-card">
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="requirement-card-icon">
                    <path
                      d="M2 3H14M2 6H14M2 9H14M2 12H14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="requirement-card-content">
                    <div className="requirement-card-label">Required Documents</div>
                    <div className="document-checklist-compact">
                      <div className="document-item-compact">
                        <input 
                          type="checkbox" 
                          className="document-checkbox-compact" 
                          disabled={isLegalTeam}
                        />
                        <span className="document-name-compact">Signed Purchase Agreement</span>
                        <span className="document-status-compact pending">Pending</span>
                      </div>
                      <div className="document-item-compact">
                        <input type="checkbox" className="document-checkbox-compact" checked disabled />
                        <span className="document-name-compact">Property Title Documents</span>
                        <span className="document-status-compact verified">Verified</span>
                      </div>
                      <div className="document-item-compact">
                        <input type="checkbox" className="document-checkbox-compact" checked disabled />
                        <span className="document-name-compact">Stamp Duty Payment Receipt</span>
                        <span className="document-status-compact verified">Verified</span>
                      </div>
                      <div className="document-item-compact">
                        <input type="checkbox" className="document-checkbox-compact" checked disabled />
                        <span className="document-name-compact">Legal Compliance Certificate</span>
                        <span className="document-status-compact verified">Verified</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Registration Process Card */}
                <div className="requirement-info-card">
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="requirement-card-icon">
                    <path
                      d="M2 2H14V14H2V2Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2 6H14M6 2V14M10 2V14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="requirement-card-content">
                    <div className="requirement-card-label">Registration Process</div>
                    <div className="process-steps-compact">
                      <div className="process-step-compact active">
                        <div className="step-number-compact">1</div>
                        <div className="step-text-compact">Upload signed agreement</div>
                      </div>
                      <div className="process-step-compact">
                        <div className="step-number-compact">2</div>
                        <div className="step-text-compact">Document verification</div>
                      </div>
                      <div className="process-step-compact">
                        <div className="step-number-compact">3</div>
                        <div className="step-text-compact">Registry office submission</div>
                      </div>
                      <div className="process-step-compact">
                        <div className="step-number-compact">4</div>
                        <div className="step-text-compact">Registration confirmation</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Processing Timeline Card */}
                <div className="requirement-info-card">
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="requirement-card-icon">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path
                      d="M8 4V8L10.5 10.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="requirement-card-content">
                    <div className="requirement-card-label">Processing Timeline</div>
                    <div className="timeline-details-compact">
                      <div className="timeline-item-compact">
                        <span className="timeline-label-compact">Document Review:</span>
                        <span className="timeline-value-compact">1-2 business days</span>
                      </div>
                      <div className="timeline-item-compact">
                        <span className="timeline-label-compact">Registry Processing:</span>
                        <span className="timeline-value-compact">3-5 business days</span>
                      </div>
                      <div className="timeline-item-compact">
                        <span className="timeline-label-compact">Total Time:</span>
                        <span className="timeline-value-compact">4-7 business days</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Registration Fee Payment */}
            <div className="fee-payment-section">
              <div className="fee-payment-card">
                <div className="card-header">
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="card-icon">
                    <rect
                      x="2"
                      y="4"
                      width="12"
                      height="10"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M6 8H10M8 6V10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <h3 className="card-title">Registration Fee Payment</h3>
                </div>
                
                <div className="fee-payment-content">
                  <div className="fee-breakdown-section">
                    <h4 className="fee-section-title">Fee Breakdown:</h4>
                    <div className="fee-breakdown">
                      <div className="fee-item">
                        <span className="fee-label">Base Registration Fee:</span>
                        <span className="fee-value">₹2,08,750.00</span>
                      </div>
                      <div className="fee-item">
                        <span className="fee-label">Processing Fee:</span>
                        <span className="fee-value">₹25,050.00</span>
                      </div>
                      <div className="fee-item">
                        <span className="fee-label">Document Verification:</span>
                        <span className="fee-value">₹8,350.00</span>
                      </div>
                      <div className="fee-total">
                        <span className="fee-total-label">Total Amount:</span>
                        <span className="fee-total-value">₹2,42,150.00</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="payment-status-section">
                    <div className="payment-status-header">
                      <div className="payment-status-banner">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="status-checkmark-small">
                          <path
                            d="M13 4L6 11L3 8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="payment-status-info">
                          <span className="payment-status-label">Payment Status</span>
                          <span className="payment-status-date">Paid on Dec 24, 2024</span>
                        </div>
                      </div>
                    </div>
                    <div className="payment-completed-box">
                      <svg width="48" height="48" viewBox="0 0 16 16" fill="none" className="completed-checkmark">
                        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                        <path
                          d="M13 4L6 11L3 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="completed-text">Payment Completed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Complete Registration */}
            <div className="complete-registration-card">
              <div className="card-header">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="card-icon">
                  <path
                    d="M2 2H14V14H2V2Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 6H14M6 2V14M10 2V14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <h3 className="card-title">Complete Registration</h3>
              </div>
              
              <div className="completion-requirements-section">
                <div className="completion-subtitle">Registration Requirements:</div>
                <div className="completion-checklist">
                  <label className="completion-item">
                    <input
                      type="checkbox"
                      className="completion-checkbox"
                      disabled={true || isLegalTeam}
                    />
                    <span className="completion-text">Signed agreement uploaded and verified</span>
                  </label>
                  
                  <label className="completion-item">
                    <input
                      type="checkbox"
                      className="completion-checkbox"
                      checked
                      disabled={true || isLegalTeam}
                    />
                    <span className="completion-text">Registration fee payment completed</span>
                  </label>
                  
                  <label className="completion-item">
                    <input
                      type="checkbox"
                      className="completion-checkbox"
                      checked
                      disabled={true || isLegalTeam}
                    />
                    <span className="completion-text">All required documents submitted</span>
                  </label>
                </div>
              </div>
              
              <button 
                className="complete-registration-button" 
                disabled={true || isLegalTeam}
                style={isLegalTeam ? { opacity: 0.5, cursor: "not-allowed" } : {}}
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="button-icon">
                  <rect
                    x="2"
                    y="6"
                    width="12"
                    height="8"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M6 6V4C6 2.89543 6.89543 2 8 2C9.10457 2 10 2.89543 10 4V6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                Complete Registration
              </button>
              <div className="completion-message">
                {isLegalTeam 
                  ? "Legal Team: View-only access. Cannot complete registration." 
                  : "Please upload the signed agreement to proceed."}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

