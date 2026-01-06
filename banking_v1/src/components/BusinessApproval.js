"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import DashboardHeader from "@/components/DashboardHeader";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/businessApproval.css";

export default function BusinessApproval() {
  const router = useRouter();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [reviewComments, setReviewComments] = useState("");
  
  // All restrictions removed - all users have full access

  return (
    <div className="dashboard-container">
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="dashboard-main">
          <div className="main-content">
            <PageHeader
              title="Business Approval"
              subtitle="Review and approve property based on defined business criteria."
            />

            {/* Back to Property Details Link */}
            <Link href="/property-details" className="back-to-property-details">
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
              Back to Property Details
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
                    Pending Approval
                  </div>
                  <div className="submitted-date">Submitted on Dec 15, 2024</div>
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
              {/* Business Approval Status Card */}
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
                  <h3 className="card-title">Business Approval Status</h3>
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
                      <h4 className="status-title">Pending Business Review</h4>
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
                      <div className="timeline-title">Business Review</div>
                      <div className="timeline-status">Awaiting approval</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Approval Decision Section */}
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
                          d="M8 2V6M8 10V14M2 8H6M10 8H14"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <div className="workflow-timeline-content">
                      <div className="workflow-timeline-title">Business Review</div>
                      <div className="workflow-timeline-status">Awaiting approval</div>
                    </div>
                  </div>
                  <div className="workflow-timeline-connector"></div>
                  <div className="workflow-timeline-item pending">
                    <div className="workflow-timeline-icon-wrapper pending">
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
                      <div className="workflow-timeline-status">Next step after approval</div>
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
                    <div className="info-title">Estimated Review Time</div>
                    <div className="info-text">
                      Business approval typically takes 3-5 business days. You will be notified once the review is complete.
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
                        <span className="history-badge submitted">Submitted</span>
                      </div>
                      <div className="history-action">Submitted property for business approval</div>
                      <div className="history-date">Dec 15, 2024 at 10:30 AM</div>
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
                  <span className="status-indicator-text">Awaiting final business approval decision</span>
                </div>
              </div>
            </div>

            {/* Business Approval Decision Card */}
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
                <h3 className="card-title">Business Approval Decision</h3>
              </div>

              <div className="decision-form">
                <div className="form-group">
                  <label htmlFor="reviewComments" className="form-label">
                    Review Comments
                  </label>
                  <textarea
                    id="reviewComments"
                    className="review-comments-textarea"
                    placeholder="Enter your review comments and decision rationale..."
                    value={reviewComments}
                    onChange={(e) => setReviewComments(e.target.value)}
                    rows={6}
                  />
                  {false && (
                    <div style={{ 
                      marginTop: "8px", 
                      padding: "12px", 
                      backgroundColor: "#fef3c7", 
                      borderRadius: "6px",
                      fontSize: "12px",
                      color: "#92400e",
                      fontWeight: "500"
                    }}>
                      {user?.role === "Legal Team" 
                        ? "Legal Team: View-only access for legal compliance review. Cannot approve or reject properties."
                        : "View-only access. Only Business/SRBM can approve or reject properties."}
                    </div>
                  )}
                </div>

                <div className="decision-impact-section">
                  <div className="impact-title">Decision Impact</div>
                  <div className="impact-items">
                    <div className="impact-item approve">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="impact-icon"
                      >
                        <path
                          d="M16 5L7 14L4 11"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span className="impact-text">
                        Approve: Property will proceed to LOI Signing stage and legal documentation process
                      </span>
                    </div>
                    <div className="impact-item reject">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="impact-icon"
                      >
                        <path
                          d="M5 5L15 15M15 5L5 15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="impact-text">
                        Reject: Property listing will be returned for modification or removed from consideration
                      </span>
                    </div>
                  </div>
                </div>

                <div className="decision-actions">
                  <button
                    className="decision-button reject-button"
                    onClick={() => {
                      console.log("Reject property");
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
                        d="M5 5L15 15M15 5L5 15"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                    Reject Property
                  </button>
                  <button
                    className="decision-button approve-button"
                    onClick={() => {
                      console.log("Approve property");
                      router.push("/legal-workflow");
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
                    Approve Property
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

