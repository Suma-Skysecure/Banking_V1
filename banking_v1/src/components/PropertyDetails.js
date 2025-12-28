"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import "@/css/propertyDetails.css";
import "@/css/branchTracker.css";

export default function PropertyDetails() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Property data - in real app, this would come from route params or API
  const property = {
    id: "PROP-MIA-2024-002",
    name: "Downtown Arts Plaza",
    address: "1450 Biscayne Boulevard, Miami, FL 33132",
    status: "Available in 30 days",
    statusType: "pending",
    price: 5800000,
    pricePerSqft: 1381,
    type: "Mixed Use",
    totalArea: "4,200 sq ft",
    floorLevel: "Ground Floor + Mezzanine",
    parkingSpaces: "8 Reserved Spaces",
    yearBuilt: "2019",
    vendorName: "Biscayne Development Group",
    vendorContact: "+1 (305) 555-0198",
    vendorEmail: "info@biscaynedev.com",
    listingStatus: "Active Listing",
    zoning: "Commercial/Retail",
    lastInspection: "December 10, 2024",
  };

  const requiredActions = [
    {
      id: 1,
      title: "Site Inspection",
      description: "Schedule and complete physical site inspection with technical team (Available after business approval).",
      icon: "magnify",
      available: false,
    },
    {
      id: 2,
      title: "Due Diligence Review",
      description: "Complete comprehensive due diligence assessment including financial and structural review (Available after business approval).",
      icon: "document",
      available: false,
    },
  ];

  const formatPrice = (price) => {
    const inrPrice = price * 83.5;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(inrPrice);
  };

  return (
    <div className="dashboard-container">
      {/* Top Header Bar */}
      <header className="dashboard-header">
        <button
          className="header-hamburger"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="hamburger-icon"
          >
            <path
              d="M3 5H17M3 10H17M3 15H17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div className="header-logo">
          <div className="logo-text">PMS</div>
          <div className="logo-subtext">Property Management</div>
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
          <div className="header-user-profile">
            <div className="header-user-avatar">AM</div>
            <div className="header-user-info">
              <div className="header-user-name">Ana Miller</div>
              <div className="header-user-email">analyst@pms.com</div>
            </div>
            <svg
              className="header-user-chevron"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="#6b7280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </header>

      <div className="dashboard-content-wrapper">
        {/* Left Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content Area */}
        <main className="dashboard-main">
          <div className="main-content">
            {/* Page Header */}
            <div className="property-details-header">
              <h1 className="page-title">Property Details</h1>
              <p className="page-subtitle">
                Review detailed information about the selected property for approval.
              </p>
            </div>

            {/* Back Link */}
            <Link href="/property-search" className="back-link">
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
              Back to Property Search
            </Link>

            {/* Property Overview */}
            <div className="property-overview-card">
              <div className="property-overview-left">
                <h2 className="property-name-large">{property.name}</h2>
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
                  <span>{property.address}</span>
                </div>
                <div className={`property-status-tag ${property.statusType}`}>
                  {property.statusType === "pending" ? (
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
                        r="6"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                      <path
                        d="M8 4V8L10 10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="status-icon"
                    >
                      <path
                        d="M13 4L6 11L3 8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  {property.status}
                </div>
              </div>
              <div className="property-overview-right">
                <div className="property-price-large">{formatPrice(property.price)}</div>
                <div className="property-price-per-sqft-large">
                  ₹{(property.pricePerSqft * 83.5).toLocaleString('en-IN')} per sq ft
                </div>
              </div>
            </div>

            {/* Property Information and Required Actions */}
            <div className="property-details-grid">
              {/* Left Column - Property Information */}
              <div className="property-info-card">
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
                      stroke="#1e3a8a"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 4V12M10 4V12"
                      stroke="#1e3a8a"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <h3 className="card-title">Property Information</h3>
                </div>
                <div className="info-list">
                  <div className="info-item">
                    <span className="info-label">Property ID:</span>
                    <span className="info-value">{property.id}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Property Type:</span>
                    <span className="info-value">{property.type}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Total Area:</span>
                    <span className="info-value">{property.totalArea}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Floor Level:</span>
                    <span className="info-value">{property.floorLevel}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Parking Spaces:</span>
                    <span className="info-value">{property.parkingSpaces}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Year Built:</span>
                    <span className="info-value">{property.yearBuilt}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Vendor Name:</span>
                    <span className="info-value">{property.vendorName}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Vendor Contact:</span>
                    <span className="info-value">{property.vendorContact}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Vendor Email:</span>
                    <span className="info-value">{property.vendorEmail}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Listing Status:</span>
                    <span className="info-value">
                      <span className="status-badge active">{property.listingStatus}</span>
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Zoning:</span>
                    <span className="info-value">{property.zoning}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Last Inspection:</span>
                    <span className="info-value">{property.lastInspection}</span>
                  </div>
                </div>
              </div>

              {/* Right Column - Required Actions */}
              <div className="required-actions-card">
                <div className="card-header">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="card-icon"
                  >
                    <path
                      d="M2 3H14V13H2V3Z"
                      stroke="#1e3a8a"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 6H11M5 9H11M5 12H8"
                      stroke="#1e3a8a"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <h3 className="card-title">Required Actions</h3>
                </div>
                <div className="actions-list">
                  {requiredActions.map((action) => (
                    <div
                      key={action.id}
                      className={`action-card ${action.available ? "available" : "disabled"}`}
                    >
                      <div className="action-icon-wrapper">
                        {action.icon === "checkmark" && (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                            <path
                              d="M9 12L11 14L15 10"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                        {action.icon === "hammer" && (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path
                              d="M15 2L12 5L15 8"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M3 10L12 19L21 10"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                        {action.icon === "magnify" && (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle
                              cx="11"
                              cy="11"
                              r="8"
                              stroke="currentColor"
                              strokeWidth="2"
                            />
                            <path
                              d="M21 21L16.65 16.65"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        )}
                        {action.icon === "document" && (
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
                              d="M8 12H16M10 16H14"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <circle cx="12" cy="9" r="1.5" fill="currentColor" />
                          </svg>
                        )}
                      </div>
                      <div className="action-content">
                        <h4 className="action-title">{action.title}</h4>
                        <p className="action-description">{action.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Submit Button */}
                <button
                  className="submit-approval-button"
                  onClick={() => {
                    console.log("Submitting property for business approval");
                    router.push("/business-approval");
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="submit-icon"
                  >
                    <path
                      d="M18 2L9 11L2 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18 2L12 18L9 11L2 6L18 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Submit for Business Approval
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

