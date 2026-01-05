"use client";

import "@/css/businessApproval.css";
import "@/css/propertyDetails.css";

/**
 * LegalDueDetailsModal Component
 * 
 * Modal that displays site details when viewing Legal Due Diligence Review details
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Function to close modal
 */
export default function LegalDueDetailsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  // Sample property data
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

  const formatPrice = (price) => {
    // Convert USD to INR (assuming 1 USD = 83.5 INR)
    const priceInINR = price * 83.5;
    return `₹${priceInINR.toLocaleString('en-IN')}`;
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

  return (
    <div
      className="document-upload-modal-overlay"
      onClick={onClose}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10000,
        padding: "20px",
      }}
    >
      <div
        className="document-upload-modal"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          width: "90%",
          maxWidth: "1200px",
          maxHeight: "90vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: "24px",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#1e3a8a",
              margin: 0,
            }}
          >
            Legal Due Diligence Review Details
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "6px",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f3f4f6")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div
          style={{
            padding: "24px",
            overflowY: "auto",
            flex: 1,
          }}
        >
          {/* Property Overview */}
          <div className="property-overview-card" style={{ marginBottom: "24px" }}>
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
      </div>
    </div>
  );
}

