"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import WorkflowTimeline from "@/components/WorkflowTimeline";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/workflowTimeline.css";
import "@/css/postLOIActivities.css";

export default function AgreementExecution() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const router = useRouter();

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
              <div className="profile-name">Ana Miller</div>
              <div className="profile-email">analyst@pms.com</div>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="profile-arrow">
              <path d="M4 6L8 10L12 6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </header>

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="dashboard-main">
          <div className="main-content">
            {/* Workflow Timeline */}
            <WorkflowTimeline activeStage="Agreement Execution" />
            
            {/* Page Header */}
            <PageHeader
              title="Agreement Execution"
              subtitle="Execute the final property agreement between the business and property vendor."
            />

            {/* Back Link */}
            <Link href="/post-loi-activities" className="back-to-legal-workflow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="back-arrow">
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Post-LOI Activities
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
                  <div className="loi-status-tag" style={{ backgroundColor: "#dbeafe", color: "#1e40af" }}>
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
                    Ready for Agreement Execution
                  </div>
                  <span className="property-id-text">Property ID: PROP-MIA-2024-002</span>
                </div>
              </div>
              <div className="property-overview-right">
                <div className="property-price-header">₹48,43,00,000</div>
                <div className="loi-circulated-date">Post-LOI Completed on Dec 22, 2024</div>
              </div>
            </div>

            {/* Agreement Execution Status */}
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
                <h3 className="section-title">Agreement Execution Status</h3>
              </div>
              <div className="status-cards-grid">
                <div className="status-card yellow">
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
                    <div className="status-card-label">Status</div>
                    <div className="status-card-value orange">Pending Signature</div>
                  </div>
                </div>
                <div className="status-card light-blue">
                  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" className="status-card-icon">
                    <rect x="2" y="3" width="12" height="11" rx="1" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M2 6H14M5 1V3M11 1V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M4 9H6M8 9H10M4 11H6M8 11H10" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  </svg>
                  <div className="status-card-content">
                    <div className="status-card-label">Agreement Date</div>
                    <div className="status-card-value blue">Dec 24, 2024</div>
                  </div>
                </div>
                <div className="status-card light-purple">
                  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" className="status-card-icon">
                    <circle cx="5" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="11" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M2 14C2 11 4.5 9 8 9C11.5 9 14 11 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <div className="status-card-content">
                    <div className="status-card-label">Parties Involved</div>
                    <div className="status-card-value purple">2 of 2</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Agreement Details and Terms & Clauses */}
            <div className="agreement-details-grid">
              {/* Agreement Details Card */}
              <div className="agreement-details-card">
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
                  <h3 className="card-title">Agreement Details</h3>
                </div>
                
                <div className="details-section">
                  <div className="details-subsection">
                    <h4 className="subsection-title">Financial Terms</h4>
                    <div className="detail-item">
                      <span className="detail-label">Purchase Price:</span>
                      <span className="detail-value">₹48,43,00,000</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Security Deposit Paid:</span>
                      <span className="detail-value green">₹2,42,15,000</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Stamp Duty Paid:</span>
                      <span className="detail-value green">₹33,90,100</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Balance Due at Closing:</span>
                      <span className="detail-value bold blue">₹45,66,94,900</span>
                    </div>
                  </div>
                  
                  <div className="details-subsection">
                    <h4 className="subsection-title">Key Dates</h4>
                    <div className="detail-item">
                      <span className="detail-label">Agreement Date:</span>
                      <span className="detail-value">Dec 24, 2024</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Closing Date:</span>
                      <span className="detail-value">Jan 30, 2025</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Possession Date:</span>
                      <span className="detail-value">Feb 15, 2025</span>
                    </div>
                  </div>
                  
                  <div className="details-subsection">
                    <h4 className="subsection-title">Property Details</h4>
                    <div className="detail-item">
                      <span className="detail-label">Property Size:</span>
                      <span className="detail-value">8,500 sq ft</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Property Type:</span>
                      <span className="detail-value">Commercial</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Zoning:</span>
                      <span className="detail-value">Mixed Use</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Clauses Card */}
              <div className="terms-clauses-card">
                <div className="card-header">
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="card-icon">
                    <path
                      d="M2 3H14M2 6H14M2 9H14M2 12H14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <h3 className="card-title">Terms and Clauses</h3>
                </div>
                
                <div className="clauses-list">
                  <div className="clause-card">
                    <div className="clause-card-content">
                      <div className="clause-checkmark-circle">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="clause-checkmark">
                          <path
                            d="M13 4L6 11L3 8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="clause-text-content">
                        <div className="clause-title">Closing and Possession</div>
                        <div className="clause-description">Closing shall occur on January 30, 2025. Possession will be delivered on February 15, 2025.</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="clause-card">
                    <div className="clause-card-content">
                      <div className="clause-checkmark-circle">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="clause-checkmark">
                          <path
                            d="M13 4L6 11L3 8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="clause-text-content">
                        <div className="clause-title">Representations and Warranties</div>
                        <div className="clause-description">Both parties represent they have full authority to enter into this agreement and all information provided is accurate.</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="clause-card">
                    <div className="clause-card-content">
                      <div className="clause-checkmark-circle">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="clause-checkmark">
                          <path
                            d="M13 4L6 11L3 8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="clause-text-content">
                        <div className="clause-title">Conditions Precedent</div>
                        <div className="clause-description">This agreement is subject to satisfactory completion of due diligence, financing approval, and regulatory compliance.</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="clause-card highlighted">
                    <div className="clause-card-content">
                      <div className="clause-checkmark-circle">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="clause-checkmark">
                          <path
                            d="M13 4L6 11L3 8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="clause-text-content">
                        <div className="clause-title">Default and Remedies</div>
                        <div className="clause-description">In case of default, the non-defaulting party shall have all remedies available under law including specific performance.</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="clause-card">
                    <div className="clause-card-content">
                      <div className="clause-checkmark-circle">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="clause-checkmark">
                          <path
                            d="M13 4L6 11L3 8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="clause-text-content">
                        <div className="clause-title">Dispute Resolution</div>
                        <div className="clause-description">Any disputes shall be resolved through arbitration in accordance with applicable arbitration rules.</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="clause-card">
                    <div className="clause-card-content">
                      <div className="clause-checkmark-circle">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="clause-checkmark">
                          <path
                            d="M13 4L6 11L3 8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <div className="clause-text-content">
                        <div className="clause-title">Governing Law</div>
                        <div className="clause-description">This agreement shall be governed by and construed in accordance with the laws of the State of Florida.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Digital Signatures */}
            <div className="digital-signatures-section">
              <div className="section-header">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="section-icon">
                  <path
                    d="M2 12L6 8L2 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 2L14 8L8 14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10 6L12 8L10 10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="section-title">Digital Signatures</h3>
              </div>
              
              <div className="signatures-grid">
                {/* Buyer Section */}
                <div className="signature-card">
                  <div className="signature-header">
                    <div>
                      <h4 className="signature-party-title">Buyer (Your Organization)</h4>
                      <div className="signature-entity">Property Management System Inc.</div>
                    </div>
                    <div className="signature-status-tag pending">
                      <span>Pending</span>
                    </div>
                  </div>
                  
                  <div className="signature-area unsigned">
                    <svg width="48" height="48" viewBox="0 0 16 16" fill="none" className="signature-placeholder-icon">
                      <path
                        d="M2 12L6 8L2 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 2L14 8L8 14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="signature-placeholder-text">Click below to sign digitally</div>
                  </div>
                  
                  <button 
                    className="sign-agreement-button"
                    onClick={() => router.push("/agreement-registration")}
                  >
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="button-icon">
                      <path
                        d="M2 12L6 8L2 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 2L14 8L8 14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Sign Agreement
                  </button>
                </div>

                {/* Seller Section */}
                <div className="signature-card">
                  <div className="signature-header">
                    <div>
                      <h4 className="signature-party-title">Seller (Property Vendor)</h4>
                      <div className="signature-entity">Downtown Arts Plaza LLC</div>
                    </div>
                    <div className="signature-status-tag signed">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="signed-checkmark">
                        <path
                          d="M13 4L6 11L3 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Signed</span>
                    </div>
                  </div>
                  
                  <div className="signature-area signed">
                    <div className="signature-display">
                      <svg width="120" height="60" viewBox="0 0 120 60" fill="none" className="signature-graphic">
                        <path
                          d="M10 30 Q20 20, 30 30 T50 30 T70 30 T90 30"
                          stroke="#10b981"
                          strokeWidth="2"
                          strokeLinecap="round"
                          fill="none"
                        />
                        <path
                          d="M20 40 Q30 35, 40 40 T60 40"
                          stroke="#10b981"
                          strokeWidth="2"
                          strokeLinecap="round"
                          fill="none"
                        />
                      </svg>
                    </div>
                    <div className="signature-meta">
                      <div className="signature-date">Signed on Dec 23, 2024</div>
                      <div className="signature-name">Robert Thompson - Property Owner</div>
                    </div>
                  </div>
                  
                  <button className="already-signed-button" disabled>
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="button-icon">
                      <path
                        d="M13 4L6 11L3 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Already Signed
                  </button>
                </div>
              </div>
            </div>

            {/* Agreement Documents */}
            <div className="agreement-documents-section">
              <div className="section-header">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="section-icon">
                  <path
                    d="M2 3H14V13H2V3Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 5H14M6 3V13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <h3 className="section-title">Agreement Documents</h3>
              </div>
              
              <div className="documents-grid">
                <div className="document-card">
                  <div className="document-info">
                    <svg width="32" height="32" viewBox="0 0 16 16" fill="none" className="document-icon">
                      <path
                        d="M2 2H14V14H2V2Z"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 6H14M6 2V14M10 2V14"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="document-details">
                      <div className="document-title">Purchase Agreement</div>
                      <div className="document-meta">PDF • 2.4 MB</div>
                    </div>
                  </div>
                  <button className="download-button">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="download-icon">
                      <path
                        d="M8 2V12M8 12L4 8M8 12L12 8"
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
                
                <div className="document-card">
                  <div className="document-info">
                    <svg width="32" height="32" viewBox="0 0 16 16" fill="none" className="document-icon">
                      <path
                        d="M2 2H14V14H2V2Z"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 6H14M6 2V14M10 2V14"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="document-details">
                      <div className="document-title">Term Sheet</div>
                      <div className="document-meta">PDF • 1.8 MB</div>
                    </div>
                  </div>
                  <button className="download-button">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="download-icon">
                      <path
                        d="M8 2V12M8 12L4 8M8 12L12 8"
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
                
                <div className="document-card">
                  <div className="document-info">
                    <svg width="32" height="32" viewBox="0 0 16 16" fill="none" className="document-icon">
                      <path
                        d="M2 2H14V14H2V2Z"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M2 6H14M6 2V14M10 2V14"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="document-details">
                      <div className="document-title">Legal Disclosures</div>
                      <div className="document-meta">PDF • 3.1 MB</div>
                    </div>
                  </div>
                  <button className="download-button">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="download-icon">
                      <path
                        d="M8 2V12M8 12L4 8M8 12L12 8"
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
            </div>

            {/* Complete Agreement Execution */}
            <div className="complete-agreement-section">
              <div className="section-header">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="section-icon">
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
                    d="M4 4L6 6L4 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="section-title">Complete Agreement Execution</h3>
              </div>
              
              <div className="completion-requirements-section">
                <div className="completion-subtitle">Completion Requirements:</div>
                <div className="completion-checklist">
                  <label className="completion-item">
                    <input
                      type="checkbox"
                      className="completion-checkbox"
                      disabled
                    />
                    <span className="completion-text">Buyer's digital signature completed</span>
                  </label>
                  
                  <label className="completion-item">
                    <input
                      type="checkbox"
                      className="completion-checkbox"
                      checked
                      disabled
                    />
                    <span className="completion-text">Seller's digital signature completed</span>
                  </label>
                  
                  <label className="completion-item">
                    <input
                      type="checkbox"
                      className="completion-checkbox"
                      checked
                      disabled
                    />
                    <span className="completion-text">All agreement documents reviewed</span>
                  </label>
                </div>
              </div>
              
              <button className="complete-agreement-button" disabled>
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
                Complete Agreement Execution
              </button>
              <div className="completion-message">Please sign the agreement to proceed.</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

