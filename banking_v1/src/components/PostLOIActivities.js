"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import WorkflowTimeline from "@/components/WorkflowTimeline";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/workflowTimeline.css";
import "@/css/postLOIActivities.css";

export default function PostLOIActivities() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [vendorName, setVendorName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [measurementStatus, setMeasurementStatus] = useState("Scheduled");
  const [measurementNotes, setMeasurementNotes] = useState("");
  const [termSheetApprovalStatus, setTermSheetApprovalStatus] = useState("Pending Review");
  const [termSheetComments, setTermSheetComments] = useState("");
  const [stampDutyPaymentStatus, setStampDutyPaymentStatus] = useState("Calculation Complete");
  const [paymentReference, setPaymentReference] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [securityDepositPaymentMethod, setSecurityDepositPaymentMethod] = useState("Wire Transfer");
  const [bankDetails, setBankDetails] = useState("");
  const [securityDepositPaymentStatus, setSecurityDepositPaymentStatus] = useState("Pending Initiation");
  const [transactionReference, setTransactionReference] = useState("");
  const [securityDepositPaymentDate, setSecurityDepositPaymentDate] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [siteMeasurementCompleted, setSiteMeasurementCompleted] = useState(true);
  const [vendorProfileCompleted, setVendorProfileCompleted] = useState(false);
  const [termSheetCompleted, setTermSheetCompleted] = useState(false);
  const [stampDutyCompleted, setStampDutyCompleted] = useState(false);
  const [securityDepositCompleted, setSecurityDepositCompleted] = useState(false);
  
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
            {/* Workflow Timeline */}
            <WorkflowTimeline activeStage="Post-LOI Activities" />
            
            <PageHeader
              title="Post-LOI Activities"
              subtitle="Track further activities after LOI signing completion."
            />

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
                  <div className="loi-status-tag circulated">
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
                    LOI Circulated
                  </div>
                  <span className="property-id-text">Property ID: PROP-MIA-2024-002</span>
                </div>
              </div>
              <div className="property-overview-right">
                <div className="property-price-header">₹48,43,00,000</div>
                <div className="loi-circulated-date">LOI Circulated on Dec 18, 2024</div>
              </div>
            </div>

            {/* Post-LOI Progress Tracker */}
            <div className="post-loi-tracker-card">
              <div className="tracker-header">
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
                <h3 className="tracker-title">Post-LOI Progress Tracker</h3>
              </div>
              <div className="post-loi-stages-container">
                {/* Site Measurement */}
                <div className="post-loi-stage">
                  <div className="post-loi-stage-connector"></div>
                  <div className="post-loi-stage-icon pending">
                    <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M2 2V14H14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 6H14M6 10H14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="post-loi-stage-content">
                    <div className="post-loi-stage-name">Site Measurement</div>
                    <div className="post-loi-stage-status">Pending</div>
                    <span className="post-loi-stage-badge pending">Not Started</span>
                  </div>
                </div>

                {/* Vendor Creation */}
                <div className="post-loi-stage">
                  <div className="post-loi-stage-connector"></div>
                  <div className="post-loi-stage-icon pending">
                    <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
                      <circle
                        cx="8"
                        cy="6"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M2 14C2 11 4.5 9 8 9C11.5 9 14 11 14 14"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="post-loi-stage-content">
                    <div className="post-loi-stage-name">Vendor Creation</div>
                    <div className="post-loi-stage-status">Pending</div>
                    <span className="post-loi-stage-badge pending">Not Started</span>
                  </div>
                </div>

                {/* Term Sheet */}
                <div className="post-loi-stage">
                  <div className="post-loi-stage-connector"></div>
                  <div className="post-loi-stage-icon pending">
                    <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
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
                  <div className="post-loi-stage-content">
                    <div className="post-loi-stage-name">Term Sheet</div>
                    <div className="post-loi-stage-status">Pending</div>
                    <span className="post-loi-stage-badge pending">Not Started</span>
                  </div>
                </div>

                {/* Stamp Duty */}
                <div className="post-loi-stage">
                  <div className="post-loi-stage-connector"></div>
                  <div className="post-loi-stage-icon pending">
                    <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 2L10 6L14 7L11 10L11.5 14L8 12L4.5 14L5 10L2 7L6 6L8 2Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="post-loi-stage-content">
                    <div className="post-loi-stage-name">Stamp Duty</div>
                    <div className="post-loi-stage-status">Pending</div>
                    <span className="post-loi-stage-badge pending">Not Started</span>
                  </div>
                </div>

                {/* Security Deposit */}
                <div className="post-loi-stage">
                  <div className="post-loi-stage-icon pending">
                    <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 1L10 5L14 6L11 9L11.5 13L8 11L4.5 13L5 9L2 6L6 5L8 1Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="post-loi-stage-content">
                    <div className="post-loi-stage-name">Security Deposit</div>
                    <div className="post-loi-stage-status">Pending</div>
                    <span className="post-loi-stage-badge pending">Not Started</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Task Details Grid */}
            <div className="task-details-grid">
              {/* Site Measurement Details */}
              <div className="task-details-card">
                <div className="task-header">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="task-icon"
                  >
                    <path
                      d="M2 2V14H14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 6H14M6 10H14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <h3 className="task-title">Site Measurement</h3>
                </div>
                <div className="scheduled-box">
                  <div className="scheduled-content">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="clock-icon"
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
                    <div className="scheduled-info">
                      <div className="scheduled-label">Measurement Scheduled</div>
                      <div className="scheduled-date">Dec 20, 2024 at 10:00 AM</div>
                    </div>
                  </div>
                  <span className="scheduled-badge pending">Pending</span>
                </div>
                <div className="task-details-section">
                  <div className="detail-group">
                    <label className="detail-label">Surveyor Details</label>
                    <input
                      type="text"
                      className="form-input"
                      value="Miami Property Surveyors LLC"
                      readOnly
                    />
                  </div>
                  <div className="detail-group">
                    <label htmlFor="measurementStatus" className="detail-label">
                      Measurement Status
                    </label>
                    <div className="custom-select-wrapper">
                      <select
                        id="measurementStatus"
                        className="form-input custom-select"
                        value={measurementStatus}
                        onChange={(e) => setMeasurementStatus(e.target.value)}
                      >
                        <option value="Scheduled">Scheduled</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="On Hold">On Hold</option>
                      </select>
                      <span className="select-arrow"></span>
                    </div>
                  </div>
                  <div className="detail-group">
                    <label htmlFor="measurementNotes" className="detail-label">
                      Notes
                    </label>
                    <textarea
                      id="measurementNotes"
                      className="form-textarea"
                      placeholder="Add measurement notes..."
                      value={measurementNotes}
                      onChange={(e) => setMeasurementNotes(e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
                <button className="mark-complete-button">
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="button-icon">
                    <path
                      d="M13 4L6 11L3 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Mark as Complete
                </button>
              </div>

              {/* Vendor Creation Details */}
              <div className="task-details-card">
                <div className="task-header">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="task-icon"
                  >
                    <circle
                      cx="8"
                      cy="6"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M2 14C2 11 4.5 9 8 9C11.5 9 14 11 14 14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <h3 className="task-title">Vendor Creation</h3>
                </div>
                <div className="task-form">
                  <div className="form-group">
                    <label htmlFor="vendorName" className="form-label">
                      Vendor Name
                    </label>
                    <input
                      type="text"
                      id="vendorName"
                      className="form-input"
                      placeholder="Enter vendor company name"
                      value={vendorName}
                      onChange={(e) => setVendorName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactPerson" className="form-label">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      id="contactPerson"
                      className="form-input"
                      placeholder="Contact name"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phoneNumber"
                      className="form-input"
                      placeholder="Phone"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="emailAddress" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="emailAddress"
                      className="form-input"
                      placeholder="vendor@email.com"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="businessAddress" className="form-label">
                      Business Address
                    </label>
                    <textarea
                      id="businessAddress"
                      className="form-textarea"
                      placeholder="Enter complete business address"
                      value={businessAddress}
                      onChange={(e) => setBusinessAddress(e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
                <button className="create-vendor-button">
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="button-icon">
                    <path
                      d="M8 2V14M2 8H14"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  Create Vendor Profile
                </button>
              </div>
            </div>

            {/* Term Sheet and Stamp Duty Approval Grid */}
            <div className="task-details-grid">
              {/* Term Sheet Approval */}
              <div className="task-details-card">
                <div className="task-header">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="task-icon"
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
                  <h3 className="task-title">Term Sheet Approval</h3>
                </div>
                <div className="approval-details-section">
                  <div className="approval-detail-item">
                    <span className="approval-detail-label">Purchase Price:</span>
                    <span className="approval-detail-value">₹48,43,00,000</span>
                  </div>
                  <div className="approval-detail-item">
                    <span className="approval-detail-label">Security Deposit:</span>
                    <span className="approval-detail-value">₹2,42,15,000</span>
                  </div>
                  <div className="approval-detail-item">
                    <span className="approval-detail-label">Closing Date:</span>
                    <span className="approval-detail-value">Jan 30, 2025</span>
                  </div>
                  <div className="approval-detail-item">
                    <span className="approval-detail-label">Possession Date:</span>
                    <span className="approval-detail-value">Feb 15, 2025</span>
                  </div>
                </div>
                <div className="task-form">
                  <div className="form-group">
                    <label htmlFor="termSheetApprovalStatus" className="form-label">
                      Approval Status
                    </label>
                    <div className="custom-select-wrapper">
                      <select
                        id="termSheetApprovalStatus"
                        className="form-input custom-select"
                        value={termSheetApprovalStatus}
                        onChange={(e) => setTermSheetApprovalStatus(e.target.value)}
                      >
                        <option value="Pending Review">Pending Review</option>
                        <option value="Under Review">Under Review</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                      <span className="select-arrow"></span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="termSheetComments" className="form-label">
                      Approval Comments
                    </label>
                    <textarea
                      id="termSheetComments"
                      className="form-textarea"
                      placeholder="Add approval comments or modifications needed..."
                      value={termSheetComments}
                      onChange={(e) => setTermSheetComments(e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
                <button className="approve-term-sheet-button">
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="button-icon">
                    <path
                      d="M4 7V13M4 7C3.5 7 3 6.5 3 6V5C3 4.5 3.5 4 4 4H6C6.5 4 7 3.5 7 3V2C7 1.5 7.5 1 8 1C8.5 1 9 1.5 9 2V3C9 3.5 9.5 4 10 4H12C12.5 4 13 4.5 13 5V6C13 6.5 12.5 7 12 7V13C12 13.5 11.5 14 11 14H5C4.5 14 4 13.5 4 13V7Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Approve Term Sheet
                </button>
              </div>

              {/* Stamp Duty Approval */}
              <div className="task-details-card">
                <div className="task-header">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="task-icon"
                  >
                    <path
                      d="M8 2L10 6L14 7L11 10L11.5 14L8 12L4.5 14L5 10L2 7L6 6L8 2Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h3 className="task-title">Stamp Duty Approval</h3>
                </div>
                <div className="stamp-duty-details-box">
                  <div className="stamp-duty-detail-item">
                    <span className="stamp-duty-label">Property Value:</span>
                    <span className="stamp-duty-value">₹48,43,00,000</span>
                  </div>
                  <div className="stamp-duty-detail-item">
                    <span className="stamp-duty-label">Stamp Duty Rate:</span>
                    <span className="stamp-duty-value">0.7%</span>
                  </div>
                  <div className="stamp-duty-detail-item">
                    <span className="stamp-duty-label">Total Stamp Duty:</span>
                    <span className="stamp-duty-value bold">₹33,90,100</span>
                  </div>
                </div>
                <div className="task-form">
                  <div className="form-group">
                    <label htmlFor="stampDutyPaymentStatus" className="form-label">
                      Payment Status
                    </label>
                    <div className="custom-select-wrapper">
                      <select
                        id="stampDutyPaymentStatus"
                        className="form-input custom-select"
                        value={stampDutyPaymentStatus}
                        onChange={(e) => setStampDutyPaymentStatus(e.target.value)}
                      >
                        <option value="Calculation Complete">Calculation Complete</option>
                        <option value="Payment Pending">Payment Pending</option>
                        <option value="Payment Received">Payment Received</option>
                        <option value="Payment Verified">Payment Verified</option>
                      </select>
                      <span className="select-arrow"></span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="paymentReference" className="form-label">
                      Payment Reference
                    </label>
                    <input
                      type="text"
                      id="paymentReference"
                      className="form-input"
                      placeholder="Enter payment reference number"
                      value={paymentReference}
                      onChange={(e) => setPaymentReference(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="paymentDate" className="form-label">
                      Payment Date
                    </label>
                    <div className="date-input-wrapper">
                      <input
                        type="text"
                        id="paymentDate"
                        className="form-input date-input"
                        placeholder="dd-mm-yyyy"
                        value={paymentDate}
                        onChange={(e) => setPaymentDate(e.target.value)}
                      />
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="calendar-icon"
                      >
                        <rect
                          x="2"
                          y="3"
                          width="12"
                          height="11"
                          rx="1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M2 6H14M5 1V3M11 1V3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M4 9H6M8 9H10M4 11H6M8 11H10"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <button className="finalize-stamp-duty-button">
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="button-icon">
                    <path
                      d="M13 4L6 11L3 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Finalize Stamp Duty
                </button>
              </div>
            </div>

            {/* Security Deposit Payment */}
            <div className="security-deposit-card">
              <div className="task-header">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="task-icon security-deposit-icon"
                >
                  <path
                    d="M8 1L2 3V7C2 10 4 12.5 8 15C12 12.5 14 10 14 7V3L8 1Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="currentColor"
                  />
                </svg>
                <h3 className="task-title">Security Deposit Payment</h3>
              </div>
              
              <div className="security-deposit-content">
                {/* Left Column */}
                <div className="security-deposit-left">
                  <div className="security-deposit-summary-box">
                    <div className="security-deposit-summary-item">
                      <span className="security-deposit-summary-label">Security Deposit Amount:</span>
                      <span className="security-deposit-summary-value">₹2,42,15,000</span>
                    </div>
                    <div className="security-deposit-summary-item">
                      <span className="security-deposit-summary-label">Percentage of Property Value:</span>
                      <span className="security-deposit-summary-value">5%</span>
                    </div>
                    <div className="security-deposit-summary-item">
                      <span className="security-deposit-summary-label">Due Date:</span>
                      <span className="security-deposit-summary-value">Jan 15, 2025</span>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="securityDepositPaymentMethod" className="form-label">
                      Payment Method
                    </label>
                    <div className="custom-select-wrapper">
                      <select
                        id="securityDepositPaymentMethod"
                        className="form-input custom-select"
                        value={securityDepositPaymentMethod}
                        onChange={(e) => setSecurityDepositPaymentMethod(e.target.value)}
                      >
                        <option value="Wire Transfer">Wire Transfer</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="Check">Check</option>
                        <option value="Cash">Cash</option>
                      </select>
                      <span className="select-arrow"></span>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="bankDetails" className="form-label">
                      Bank Details
                    </label>
                    <textarea
                      id="bankDetails"
                      className="form-textarea"
                      placeholder="Enter bank account details for payment"
                      value={bankDetails}
                      onChange={(e) => setBankDetails(e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
                
                {/* Right Column */}
                <div className="security-deposit-right">
                  <div className="form-group">
                    <label htmlFor="securityDepositPaymentStatus" className="form-label">
                      Payment Status
                    </label>
                    <div className="custom-select-wrapper">
                      <select
                        id="securityDepositPaymentStatus"
                        className="form-input custom-select"
                        value={securityDepositPaymentStatus}
                        onChange={(e) => setSecurityDepositPaymentStatus(e.target.value)}
                      >
                        <option value="Pending Initiation">Pending Initiation</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Failed">Failed</option>
                      </select>
                      <span className="select-arrow"></span>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="transactionReference" className="form-label">
                      Transaction Reference
                    </label>
                    <input
                      type="text"
                      id="transactionReference"
                      className="form-input"
                      placeholder="Enter transaction reference"
                      value={transactionReference}
                      onChange={(e) => setTransactionReference(e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="securityDepositPaymentDate" className="form-label">
                      Payment Date
                    </label>
                    <div className="date-input-wrapper">
                      <input
                        type="text"
                        id="securityDepositPaymentDate"
                        className="form-input date-input"
                        placeholder="dd-mm-yyyy"
                        value={securityDepositPaymentDate}
                        onChange={(e) => setSecurityDepositPaymentDate(e.target.value)}
                      />
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="calendar-icon"
                      >
                        <rect
                          x="2"
                          y="3"
                          width="12"
                          height="11"
                          rx="1"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                        <path
                          d="M2 6H14M5 1V3M11 1V3"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M4 9H6M8 9H10M4 11H6M8 11H10"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="additionalNotes" className="form-label">
                      Additional Notes
                    </label>
                    <textarea
                      id="additionalNotes"
                      className="form-textarea"
                      placeholder="Add any additional payment notes..."
                      value={additionalNotes}
                      onChange={(e) => setAdditionalNotes(e.target.value)}
                      rows={4}
                    />
                  </div>
                  
                  <button className="process-security-deposit-button">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="button-icon">
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
                    Process Security Deposit
                  </button>
                </div>
              </div>
            </div>

            {/* Complete All Activities */}
            <div className="complete-activities-card">
              <div className="task-header">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="task-icon"
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
                  <path
                    d="M4 4L6 6L4 8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="task-title">Complete All Activities</h3>
              </div>
              
              <div className="completion-requirements-section">
                <div className="completion-subtitle">Completion Requirements:</div>
                <div className="completion-checklist">
                  <label className="completion-item">
                    <input
                      type="checkbox"
                      checked={siteMeasurementCompleted}
                      onChange={(e) => setSiteMeasurementCompleted(e.target.checked)}
                      className="completion-checkbox"
                    />
                    <span className="completion-text">Site measurement completed and verified</span>
                  </label>
                  
                  <label className="completion-item">
                    <input
                      type="checkbox"
                      checked={vendorProfileCompleted}
                      onChange={(e) => setVendorProfileCompleted(e.target.checked)}
                      className="completion-checkbox"
                    />
                    <span className="completion-text">Vendor profile created and approved</span>
                  </label>
                  
                  <label className="completion-item">
                    <input
                      type="checkbox"
                      checked={termSheetCompleted}
                      onChange={(e) => setTermSheetCompleted(e.target.checked)}
                      className="completion-checkbox"
                    />
                    <span className="completion-text">Term sheet reviewed and approved</span>
                  </label>
                  
                  <label className="completion-item">
                    <input
                      type="checkbox"
                      checked={stampDutyCompleted}
                      onChange={(e) => setStampDutyCompleted(e.target.checked)}
                      className="completion-checkbox"
                    />
                    <span className="completion-text">Stamp duty payment finalized and documented</span>
                  </label>
                  
                  <label className="completion-item">
                    <input
                      type="checkbox"
                      checked={securityDepositCompleted}
                      onChange={(e) => setSecurityDepositCompleted(e.target.checked)}
                      className="completion-checkbox"
                    />
                    <span className="completion-text">Security deposit payment processed and confirmed</span>
                  </label>
                </div>
              </div>
              
              <button 
                className="proceed-to-agreement-button"
                onClick={() => router.push("/agreement-execution")}
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="button-icon">
                  <path
                    d="M6 3L11 8L6 13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Proceed to Agreement Execution
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

