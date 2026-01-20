"use client";

import { useState, useEffect } from "react";
import ToastNotification from "@/components/ToastNotification";
import "@/css/businessApproval.css";

/**
 * BRTBusinessApprovalSection Component
 * 
 * Business Approval section for BRT Details Page
 */
export default function BRTBusinessApprovalSection() {
  const [property, setProperty] = useState(null);
  const [submissionDate, setSubmissionDate] = useState(null);
  const [reviewComments, setReviewComments] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  // Load property data from localStorage
  useEffect(() => {
    const loadPropertyData = () => {
      if (typeof window === 'undefined') return;
      try {
        const propertyData = localStorage.getItem("propertyForBusinessApproval");
        const submissionDateData = localStorage.getItem("propertySubmissionDate");
        
        if (propertyData) {
          const parsedProperty = JSON.parse(propertyData);
          setProperty(parsedProperty);
        }
        
        if (submissionDateData) {
          setSubmissionDate(new Date(submissionDateData));
        }
      } catch (error) {
        console.error("Error loading property data:", error);
      }
    };

    loadPropertyData();
    
    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === "propertyForBusinessApproval" || e.key === "propertySubmissionDate") {
        loadPropertyData();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Format price for display
  const formatPrice = (price) => {
    if (!price && price !== 0) return "₹0";
    const inrPrice = property?.isImported && property?.priceUSD 
      ? property.priceUSD * 83.5 
      : (price * 83.5);
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(inrPrice);
  };

  // Format price per sqft
  const formatPricePerSqft = () => {
    if (!property) return "₹0/sq ft";
    const price = property.price || 0;
    const totalArea = property.totalArea ? parseFloat(property.totalArea.replace(/[^0-9.]/g, '')) : 0;
    const pricePerSqft = totalArea > 0 ? (price * 83.5) / totalArea : 0;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(pricePerSqft) + "/sq ft";
  };

  // Format submission date
  const formatSubmissionDate = () => {
    if (!submissionDate) return "N/A";
    return submissionDate.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Generate default property fields
  const generateDefaultPropertyFields = (prop) => {
    return {
      parkingSpaces: prop.parkingSpaces || "N/A",
      zoning: prop.zoning || "Commercial",
      type: prop.type || "Office Space",
      yearBuilt: prop.yearBuilt || "2020",
      listingStatus: prop.listingStatus || "Active",
      totalArea: prop.totalArea || prop.size || "N/A",
      vendorName: prop.vendorName || "N/A",
      vendorContact: prop.vendorContact || "N/A",
      floorLevel: prop.floorLevel || "Ground Floor",
      lastInspection: prop.lastInspection || "N/A",
    };
  };

  if (!property) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#6b7280" }}>
        <p>No property data available for business approval.</p>
      </div>
    );
  }

  const defaultFields = generateDefaultPropertyFields(property);
  const displayProperty = { ...property, ...defaultFields };

  return (
    <>
      {showToast && (
        <ToastNotification
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Property Overview Card */}
      <div className="property-overview-card" style={{ marginBottom: "24px" }}>
        <div className="property-overview-left">
          <h2 className="property-name-large">{displayProperty.name}</h2>
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
            <span>{displayProperty.address}</span>
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
            <div className="submitted-date">Submitted on {formatSubmissionDate()}</div>
          </div>
        </div>
        <div className="property-overview-right">
          <div className="property-price-large">{formatPrice(displayProperty.price)}</div>
          <div className="property-price-per-sqft-large">{formatPricePerSqft()}</div>
        </div>
      </div>

      {/* Business Details Summary Card */}
      <div className="business-details-card" style={{ marginBottom: "24px" }}>
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
          <h3 className="card-title">Property Details Summary</h3>
        </div>
        <div className="details-grid">
          <div className="detail-item">
            <span className="detail-label">Property ID</span>
            <span className="detail-value">{displayProperty.id || displayProperty.propertyId || "N/A"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Parking Spaces</span>
            <span className="detail-value">{displayProperty.parkingSpaces}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Zoning</span>
            <span className="detail-value">{displayProperty.zoning}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Property Type</span>
            <span className="detail-value">{displayProperty.type}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Year Built</span>
            <span className="detail-value">{displayProperty.yearBuilt}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Listing Status</span>
            <span className="detail-value">
              <span className="status-badge active">{displayProperty.listingStatus}</span>
            </span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Total Area</span>
            <span className="detail-value">{displayProperty.totalArea || displayProperty.size || "N/A"}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Vendor Name</span>
            <span className="detail-value">{displayProperty.vendorName}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Floor Level</span>
            <span className="detail-value">{displayProperty.floorLevel}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Vendor Contact</span>
            <span className="detail-value">{displayProperty.vendorContact}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Last Inspection</span>
            <span className="detail-value">{displayProperty.lastInspection}</span>
          </div>
        </div>
      </div>

      {/* Approval Status Card */}
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
      </div>
    </>
  );
}
