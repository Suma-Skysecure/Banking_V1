"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import WorkflowTimeline from "@/components/WorkflowTimeline";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/workflowTimeline.css";
import "@/css/postLOIActivities.css";

export default function FinalConfirmation() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
            <WorkflowTimeline activeStage="Final Launch" />
            
            <div className="final-confirmation-header">
              <div className="final-confirmation-title-section">
                <h1 className="final-confirmation-title">Final Confirmation and Closure</h1>
                <div className="final-confirmation-subtitle">Downtown Arts Plaza - 1450 Biscayne Boulevard, Miami, FL 33132</div>
              </div>
              <div className="completed-badge">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="badge-checkmark">
                  <path
                    d="M13 4L6 11L3 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Completed
              </div>
            </div>

            {/* Success Banner */}
            <div className="success-banner">
              <div className="success-icon-circle">
                <svg width="64" height="64" viewBox="0 0 16 16" fill="none" className="success-checkmark">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2" />
                  <path
                    d="M13 4L6 11L3 8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h2 className="success-title">Project Successfully Completed!</h2>
              <p className="success-message">All execution tasks have been completed. Review the summary below and close the project.</p>
            </div>

            {/* Main Content Grid */}
            <div className="final-confirmation-grid">
              {/* Left Column */}
              <div className="final-confirmation-left">
                {/* Project Completion Summary */}
                <div className="summary-section">
                  <h3 className="summary-section-title">Project Completion Summary</h3>
                  <div className="summary-cards-grid">
                    <div className="summary-card">
                      <div className="summary-card-label">Total Tasks</div>
                      <div className="summary-card-value blue">12</div>
                    </div>
                    <div className="summary-card">
                      <div className="summary-card-label">Completion Rate</div>
                      <div className="summary-card-value green">100%</div>
                    </div>
                    <div className="summary-card">
                      <div className="summary-card-label">Project Duration</div>
                      <div className="summary-card-value blue">45 Days</div>
                    </div>
                    <div className="summary-card">
                      <div className="summary-card-label">Total Budget Used</div>
                      <div className="summary-card-value blue">₹74,48,200</div>
                    </div>
                  </div>
                </div>

                {/* Completed Milestones */}
                <div className="milestones-section">
                  <h3 className="milestones-section-title">Completed Milestones</h3>
                  <div className="milestones-list">
                    <div className="milestone-item">
                      <svg width="24" height="24" viewBox="0 0 16 16" fill="none" className="milestone-checkmark">
                        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                        <path
                          d="M13 4L6 11L3 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="milestone-content">
                        <div className="milestone-name">Vendor Setup</div>
                        <div className="milestone-date">Completed on Jan 25, 2024</div>
                      </div>
                    </div>
                    <div className="milestone-item">
                      <svg width="24" height="24" viewBox="0 0 16 16" fill="none" className="milestone-checkmark">
                        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                        <path
                          d="M13 4L6 11L3 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="milestone-content">
                        <div className="milestone-name">Security Guard Deployment</div>
                        <div className="milestone-date">Completed on Feb 5, 2024</div>
                      </div>
                    </div>
                    <div className="milestone-item">
                      <svg width="24" height="24" viewBox="0 0 16 16" fill="none" className="milestone-checkmark">
                        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                        <path
                          d="M13 4L6 11L3 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="milestone-content">
                        <div className="milestone-name">Infrastructure Setup</div>
                        <div className="milestone-date">Completed on Feb 20, 2024</div>
                      </div>
                    </div>
                    <div className="milestone-item">
                      <svg width="24" height="24" viewBox="0 0 16 16" fill="none" className="milestone-checkmark">
                        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                        <path
                          d="M13 4L6 11L3 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="milestone-content">
                        <div className="milestone-name">Final Launch Preparation</div>
                        <div className="milestone-date">Completed on Mar 1, 2024</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="final-confirmation-right">
                {/* Registration Status */}
                <div className="registration-status-section">
                  <h3 className="registration-section-title">Registration Status</h3>
                  <div className="registration-status-card">
                    <div className="status-info-item">
                      <span className="status-info-label">Current Status:</span>
                      <span className="status-badge completed">Completed</span>
                    </div>
                    <div className="status-info-item">
                      <span className="status-info-label">Tasks Completed:</span>
                      <span className="status-info-value">12 of 12</span>
                    </div>
                    <div className="status-info-item">
                      <span className="status-info-label">Expected Completion:</span>
                      <span className="status-info-value">Mar 1, 2024</span>
                    </div>
                    <div className="status-info-item">
                      <span className="status-info-label">Registration Fee:</span>
                      <span className="status-info-value">₹7,09,750</span>
                    </div>
                  </div>
                </div>

                {/* Registration Officer */}
                <div className="registration-officer-section">
                  <h3 className="registration-section-title">Registration Officer</h3>
                  <div className="officer-list">
                    <div className="officer-item">
                      <div className="officer-avatar">SJ</div>
                      <div className="officer-info">
                        <div className="officer-name">Sarah Johnson</div>
                        <div className="officer-email">sarah@regoffice.com</div>
                      </div>
                    </div>
                    <div className="officer-item">
                      <div className="officer-avatar">MC</div>
                      <div className="officer-info">
                        <div className="officer-name">Michael Chen</div>
                        <div className="officer-email">michael@regoffice.com</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* All Tasks Completed Section */}
            <div className="all-tasks-section">
              <h3 className="all-tasks-title">All Tasks Completed</h3>
              <div className="tasks-completed-list">
                <div className="task-completed-item">
                  <input type="checkbox" className="task-completed-checkbox" checked disabled />
                  <div className="task-completed-content">
                    <div className="task-completed-name">Vendor Setup Completion</div>
                    <div className="task-completed-description">All vendors registered and contracts signed</div>
                  </div>
                  <div className="task-completed-badge">Completed</div>
                </div>
                <div className="task-completed-item">
                  <input type="checkbox" className="task-completed-checkbox" checked disabled />
                  <div className="task-completed-content">
                    <div className="task-completed-name">Security Guard Deployment</div>
                    <div className="task-completed-description">24/7 security personnel deployed on site</div>
                  </div>
                  <div className="task-completed-badge">Completed</div>
                </div>
                <div className="task-completed-item">
                  <input type="checkbox" className="task-completed-checkbox" checked disabled />
                  <div className="task-completed-content">
                    <div className="task-completed-name">Utility Connections</div>
                    <div className="task-completed-description">Water, electricity, and internet setup complete</div>
                  </div>
                  <div className="task-completed-badge">Completed</div>
                </div>
                <div className="task-completed-item">
                  <input type="checkbox" className="task-completed-checkbox" checked disabled />
                  <div className="task-completed-content">
                    <div className="task-completed-name">Signage Installation</div>
                    <div className="task-completed-description">Company signage and branding installed</div>
                  </div>
                  <div className="task-completed-badge">Completed</div>
                </div>
                <div className="task-completed-item">
                  <input type="checkbox" className="task-completed-checkbox" checked disabled />
                  <div className="task-completed-content">
                    <div className="task-completed-name">Final Inspection</div>
                    <div className="task-completed-description">Property inspection and approval completed</div>
                  </div>
                  <div className="task-completed-badge">Completed</div>
                </div>
              </div>
            </div>

            {/* Vendor Payments Summary */}
            <div className="vendor-payments-section">
              <h3 className="vendor-payments-title">Vendor Payments Summary</h3>
              <div className="vendor-payments-list">
                <div className="vendor-payment-item">
                  <div className="vendor-payment-left">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="vendor-payment-icon">
                      <path
                        d="M3 21H21V3H3V21Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 9H21M9 3V21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                      <rect x="6" y="6" width="3" height="3" fill="currentColor" />
                      <rect x="12" y="6" width="3" height="3" fill="currentColor" />
                      <rect x="6" y="12" width="3" height="3" fill="currentColor" />
                      <rect x="12" y="12" width="3" height="3" fill="currentColor" />
                    </svg>
                    <div className="vendor-payment-info">
                      <div className="vendor-payment-name">ABC Construction Co.</div>
                      <div className="vendor-payment-service">Infrastructure work</div>
                    </div>
                  </div>
                  <div className="vendor-payment-right">
                    <div className="vendor-payment-amount">₹37,57,500</div>
                    <div className="vendor-payment-date">Paid: Jan 28, 2024</div>
                    <div className="vendor-payment-badge">Paid</div>
                  </div>
                </div>

                <div className="vendor-payment-item">
                  <div className="vendor-payment-left">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="vendor-payment-icon">
                      <path
                        d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="vendor-payment-info">
                      <div className="vendor-payment-name">SecureGuard Services</div>
                      <div className="vendor-payment-service">Security personnel</div>
                    </div>
                  </div>
                  <div className="vendor-payment-right">
                    <div className="vendor-payment-amount">₹10,43,750</div>
                    <div className="vendor-payment-date">Paid: Feb 3, 2024</div>
                    <div className="vendor-payment-badge">Paid</div>
                  </div>
                </div>

                <div className="vendor-payment-item">
                  <div className="vendor-payment-left">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="vendor-payment-icon">
                      <path
                        d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="vendor-payment-info">
                      <div className="vendor-payment-name">PowerGrid Utilities</div>
                      <div className="vendor-payment-service">Electrical connections</div>
                    </div>
                  </div>
                  <div className="vendor-payment-right">
                    <div className="vendor-payment-amount">₹6,84,700</div>
                    <div className="vendor-payment-date">Paid: Feb 15, 2024</div>
                    <div className="vendor-payment-badge">Paid</div>
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

