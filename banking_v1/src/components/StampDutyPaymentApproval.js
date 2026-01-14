"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import ToastNotification from "@/components/ToastNotification";
import PageHeader from "@/components/PageHeader";
import DashboardHeader from "@/components/DashboardHeader";
import PropertySummaryCard from "@/components/PropertySummaryCard";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/postLOIActivities.css";
import "@/css/businessApproval.css";

export default function StampDutyPaymentApproval() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [approvalStatus, setApprovalStatus] = useState("pending");
  const [comments, setComments] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [property, setProperty] = useState(null);
  const [submissionDate, setSubmissionDate] = useState(null);

  // Load property data from localStorage
  useEffect(() => {
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
  }, []);

  // Helper function to check if a value is empty/missing
  const isEmpty = (value) => {
    return value === null || value === undefined || value === "" || 
           (typeof value === "string" && value.trim() === "");
  };

  // Helper function to generate default values ONLY for missing property fields
  const generateDefaultPropertyFields = (property) => {
    if (!property) return {};
    
    const defaults = {};
    const areaMatch = (property.size || property.totalArea || "").match(/[\d,]+/);
    const areaNum = areaMatch ? parseInt(areaMatch[0].replace(/,/g, "")) : 0;
    
    if (isEmpty(property.floorLevel)) {
      if (property.type?.toLowerCase().includes("industrial")) {
        defaults.floorLevel = areaNum > 10000 ? "Ground Floor + Warehouse" : "Ground Floor";
      } else if (property.type?.toLowerCase().includes("retail")) {
        defaults.floorLevel = "Ground Floor";
      } else if (areaNum > 5000) {
        defaults.floorLevel = "Multiple Floors Available";
      } else {
        defaults.floorLevel = "Ground Floor + Mezzanine";
      }
    }
    
    if (isEmpty(property.parkingSpaces)) {
      const spaces = Math.max(2, Math.floor(areaNum / 500));
      defaults.parkingSpaces = `${spaces} Reserved Spaces`;
    }
    
    if (isEmpty(property.yearBuilt)) {
      const currentYear = new Date().getFullYear();
      const baseYear = property.type?.toLowerCase().includes("industrial") ? 2015 : 2018;
      defaults.yearBuilt = String(Math.max(baseYear, currentYear - 6));
    }
    
    if (isEmpty(property.vendorName)) {
      const address = property.address || "";
      if (address.includes("Brickell")) defaults.vendorName = "Brickell Development Group";
      else if (address.includes("Downtown")) defaults.vendorName = "Downtown Properties LLC";
      else if (address.includes("South Beach")) defaults.vendorName = "South Beach Realty Partners";
      else if (address.includes("Westside")) defaults.vendorName = "Westside Commercial Holdings";
      else if (address.includes("North Miami")) defaults.vendorName = "North Miami Development Corp";
      else if (address.includes("Eastside")) defaults.vendorName = "Eastside Business Ventures";
      else if (address.includes("Marina")) defaults.vendorName = "Marina Commercial Realty";
      else defaults.vendorName = "Miami Commercial Realty Group";
    }
    
    if (isEmpty(property.vendorContact)) {
      const areaCode = property.address?.match(/FL (\d{5})/)?.[1]?.substring(0, 3) || "305";
      const propIdNum = parseInt(String(property.id || property.propertyId || "0").replace(/\D/g, "")) || 0;
      const lastFour = String((propIdNum % 9000) + 1000).padStart(4, '0');
      defaults.vendorContact = `+1 (${areaCode}) 555-${lastFour}`;
    }
    
    if (isEmpty(property.vendorEmail)) {
      const vendorName = (property.vendorName || defaults.vendorName || "Miami Commercial Realty Group")
        .toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");
      defaults.vendorEmail = `info@${vendorName}.com`;
    }
    
    if (isEmpty(property.listingStatus)) {
      defaults.listingStatus = property.statusType === "available" ? "Active Listing" : "Pending Listing";
    }
    
    if (isEmpty(property.zoning)) {
      const type = property.type?.toLowerCase() || "";
      if (type.includes("commercial office")) defaults.zoning = "Commercial/Office";
      else if (type.includes("retail")) defaults.zoning = "Commercial/Retail";
      else if (type.includes("industrial")) defaults.zoning = "Industrial";
      else if (type.includes("mixed use")) defaults.zoning = "Mixed Use";
      else defaults.zoning = "Commercial";
    }
    
    if (isEmpty(property.lastInspection)) {
      if (property.lastInspectionDate) {
        defaults.lastInspection = new Date(property.lastInspectionDate).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
      } else {
        const months = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
        const currentDate = new Date();
        const inspectionDate = new Date(currentDate);
        inspectionDate.setMonth(currentDate.getMonth() - 2);
        defaults.lastInspection = `${months[inspectionDate.getMonth()]} ${inspectionDate.getDate()}, ${inspectionDate.getFullYear()}`;
      }
    }
    
    return defaults;
  };

  const defaultProperty = {
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
    listingStatus: "Active Listing",
    zoning: "Commercial/Retail",
    lastInspection: "December 10, 2024",
  };

  const propertyWithDefaults = property ? (() => {
    const defaults = generateDefaultPropertyFields(property);
    const merged = { ...property };
    
    Object.keys(defaults).forEach(key => {
      if (isEmpty(merged[key])) {
        merged[key] = defaults[key];
      }
    });
    
    if (isEmpty(merged.id)) {
      merged.id = merged.propertyId || `PROP-MIA-2024-${String(property.id || Date.now()).padStart(3, '0')}`;
    }
    if (isEmpty(merged.name)) merged.name = "Property";
    if (isEmpty(merged.address)) merged.address = "Address not available";
    if (isEmpty(merged.type)) merged.type = "Commercial";
    if (isEmpty(merged.totalArea) && isEmpty(merged.size)) {
      merged.totalArea = "";
    } else if (isEmpty(merged.totalArea) && !isEmpty(merged.size)) {
      merged.totalArea = merged.size;
    }
    if (isEmpty(merged.status)) merged.status = "Available";
    if (isEmpty(merged.statusType)) merged.statusType = "pending";
    if (merged.price === null || merged.price === undefined) merged.price = 0;
    if (merged.pricePerSqft === null || merged.pricePerSqft === undefined) merged.pricePerSqft = 0;
    
    return merged;
  })() : defaultProperty;
  
  const displayProperty = propertyWithDefaults;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount * 83.5);
  };

  const formatPrice = (price) => {
    if (!price && price !== 0) return "₹0";
    const inrPrice = displayProperty?.isImported && displayProperty?.priceUSD 
      ? displayProperty.priceUSD * 83.5 
      : (price * 83.5);
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(inrPrice);
  };

  const formatPricePerSqft = () => {
    if (!displayProperty) return "₹0 per sq ft";
    if (displayProperty.isImported && displayProperty.pricePerSqft) {
      return `₹${displayProperty.pricePerSqft.toLocaleString('en-IN')} per sq ft`;
    }
    if (displayProperty.pricePerSqft) {
      return `₹${(displayProperty.pricePerSqft * 83.5).toLocaleString('en-IN')} per sq ft`;
    }
    return "₹0 per sq ft";
  };

  const formatSubmissionDate = () => {
    if (!submissionDate) {
      const now = new Date();
      return now.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
    return submissionDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getAvailabilityDays = () => {
    if (!displayProperty?.status) return "Available Now";
    const match = displayProperty.status.match(/(\d+)\s*days?/i);
    return match ? `${match[1]} days` : "Available Now";
  };

  // Property and payment data
  const propertyValue = displayProperty?.price || 5800000;
  const stampDutyRate = 0.7;
  const totalStampDuty = (propertyValue * stampDutyRate) / 100;

  const handleApprove = () => {
    setApprovalStatus("approved");
    setToastMessage("Approved stamp duty and sent to Agreement execution team");
    setToastType("success");
    setShowToast(true);
  };

  const handleReject = () => {
    setApprovalStatus("rejected");
    setToastMessage("Stamp duty payment rejected");
    setToastType("error");
    setShowToast(true);
  };

  const handleUpdate = () => {
    setToastMessage("Approval status updated successfully");
    setToastType("info");
    setShowToast(true);
    console.log("Updating approval status", { status: approvalStatus, comments });
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="dashboard-main">
          <div className="main-content">
            <PageHeader
              title="Stamp Duty Payment Approval"
              subtitle="Review and approve stamp duty payment for property acquisition"
            />

            {/* Back to Dashboard Link */}
            <Link href="/dashboard" className="back-to-property-details">
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
              Back to Dashboard
            </Link>

            {/* Property Overview Card */}
            <div className="property-overview-card">
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

            {/* Property Details Summary Card */}
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
                <h3 className="card-title">Property Details Summary</h3>
              </div>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Property ID</span>
                  <span className="detail-value">{displayProperty.id}</span>
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
                  <span className="detail-value">{displayProperty.totalArea || displayProperty.size || ""}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Vendor Name</span>
                  <span className="detail-value">{displayProperty.vendorName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Availability</span>
                  <span className="detail-value">{getAvailabilityDays()}</span>
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

            {/* Stamp Duty Payment Details */}
            <div className="business-details-card" style={{ marginBottom: "24px" }}>
              <div className="card-header">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="card-icon"
                >
                  <path
                    d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM9 13L5 9L6.41421 7.58579L9 10.1716L13.5858 5.58579L15 7L9 13Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
                <h3 className="card-title">Stamp Duty Payment Details</h3>
              </div>
              <div style={{ padding: "20px" }}>
                {/* Calculation Breakdown */}
                <div style={{ marginBottom: "24px" }}>
                  <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#111827", marginBottom: "16px", marginTop: 0 }}>
                    Calculation Breakdown
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Property Value:</span>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                        {formatCurrency(propertyValue)}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Stamp Duty Rate:</span>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                        {stampDutyRate}%
                      </span>
                    </div>
                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px",
                      backgroundColor: "#dbeafe",
                      borderRadius: "6px",
                      border: "1px solid #93c5fd"
                    }}>
                      <span style={{ fontSize: "16px", fontWeight: "600", color: "#1e3a8a" }}>
                        Total Stamp Duty Amount:
                      </span>
                      <span style={{ fontSize: "18px", fontWeight: "700", color: "#1e3a8a" }}>
                        {formatCurrency(totalStampDuty)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div style={{ marginBottom: "24px" }}>
                  <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#111827", marginBottom: "16px", marginTop: 0 }}>
                    Payment Information
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Payment Status:</span>
                      <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 12px",
                        backgroundColor: "#d1fae5",
                        color: "#065f46",
                        borderRadius: "20px",
                        fontSize: "14px",
                        fontWeight: "500"
                      }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Payment Reference Number:</span>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                        SD-MIA-2024-002-4060
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Payment Date:</span>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                        December 19, 2024
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Payment Method:</span>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                        Electronic Transfer
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Paying Authority:</span>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                        Florida Department of Revenue
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="business-details-card">
              <div className="card-header">
                <h3 className="card-title">Additional Information</h3>
              </div>
              <div style={{ padding: "20px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "14px", color: "#6b7280" }}>State:</span>
                    <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                      Florida
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "14px", color: "#6b7280" }}>County:</span>
                    <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                      Miami-Dade
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "14px", color: "#6b7280" }}>Property Type:</span>
                    <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                      Commercial Office
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "14px", color: "#6b7280" }}>Transaction Type:</span>
                    <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                      Purchase
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Reference */}
            <div className="business-details-card" style={{ marginTop: "24px" }}>
              <div className="card-header">
                <h3 className="card-title">Account Reference</h3>
              </div>
              <div style={{ padding: "20px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "14px", color: "#6b7280", marginBottom: "6px" }}>
                    Account Reference
                  </label>
                  <div style={{
                    padding: "10px 12px",
                    fontSize: "14px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    backgroundColor: "#f9fafb",
                    color: "#111827"
                  }}>
                    FL-REV-ACC-789456123
                  </div>
                </div>
              </div>
            </div>

            {/* Approval Actions and Summary Section */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              marginTop: "24px"
            }}>
              {/* Approval Actions */}
              <div className="business-details-card">
                <div className="card-header">
                  <h3 className="card-title">Approval Actions</h3>
                </div>
                <div style={{ padding: "20px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {/* Action Buttons */}
                    <div style={{ display: "flex", gap: "12px" }}>
                      <button
                        onClick={handleApprove}
                        style={{
                          flex: 1,
                          padding: "12px 20px",
                          backgroundColor: approvalStatus === "approved" ? "#059669" : "#10b981",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontWeight: "600",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          transition: "background-color 0.2s",
                          boxShadow: approvalStatus === "approved" ? "0 2px 4px rgba(0,0,0,0.1)" : "none"
                        }}
                        onMouseEnter={(e) => {
                          if (approvalStatus !== "approved") {
                            e.target.style.backgroundColor = "#059669";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (approvalStatus !== "approved") {
                            e.target.style.backgroundColor = "#10b981";
                          }
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M13 4L6 11L3 8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Approve Stamp Duty by Account
                      </button>
                      <button
                        onClick={handleReject}
                        style={{
                          flex: 1,
                          padding: "12px 20px",
                          backgroundColor: approvalStatus === "rejected" ? "#dc2626" : "#ef4444",
                          color: "white",
                          border: "none",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontWeight: "600",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          transition: "background-color 0.2s",
                          boxShadow: approvalStatus === "rejected" ? "0 2px 4px rgba(0,0,0,0.1)" : "none"
                        }}
                        onMouseEnter={(e) => {
                          if (approvalStatus !== "rejected") {
                            e.target.style.backgroundColor = "#dc2626";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (approvalStatus !== "rejected") {
                            e.target.style.backgroundColor = "#ef4444";
                          }
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M12 4L4 12M4 4L12 12"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Reject Stamp Duty by Account
                      </button>
                    </div>

                    {/* Comments & Notes */}
                    <div>
                      <label style={{
                        display: "block",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#374151",
                        marginBottom: "8px"
                      }}>
                        Comments & Notes
                      </label>
                      <textarea
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="Add your comments regarding this stamp duty payment approval/rejection..."
                        style={{
                          width: "100%",
                          minHeight: "120px",
                          padding: "12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "8px",
                          backgroundColor: "white",
                          color: "#111827",
                          resize: "vertical",
                          fontFamily: "inherit"
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Approval Summary */}
              <div className="business-details-card">
                <div className="card-header">
                  <h3 className="card-title">Approval Summary</h3>
                </div>
                <div style={{ padding: "20px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Approval Status:</span>
                      <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 12px",
                        backgroundColor: approvalStatus === "approved" ? "#d1fae5" : approvalStatus === "rejected" ? "#fee2e2" : "#fef3c7",
                        color: approvalStatus === "approved" ? "#065f46" : approvalStatus === "rejected" ? "#991b1b" : "#92400e",
                        borderRadius: "20px",
                        fontSize: "14px",
                        fontWeight: "500"
                      }}>
                        {approvalStatus === "approved" ? "Approved" : approvalStatus === "rejected" ? "Rejected" : "Pending"}
                      </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Amount:</span>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                        {formatCurrency(totalStampDuty)}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Reviewed By:</span>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                        {user?.name || "James Wilson"}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Review Date:</span>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                        -
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Update Approval Status Button */}
            <div style={{ marginTop: "24px" }}>
              <button
                onClick={handleUpdate}
                style={{
                  width: "100%",
                  padding: "14px 20px",
                  backgroundColor: "#f97316",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "background-color 0.2s"
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#ea580c")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#f97316")}
              >
                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 1V3M8 13V15M15 8H13M3 8H1M13.364 2.636L11.95 4.05M4.05 11.95L2.636 13.364M13.364 13.364L11.95 11.95M4.05 4.05L2.636 2.636"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="8"
                    cy="8"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                Update Approval Status
              </button>
            </div>
          </div>
        </main>
      </div>

      <ToastNotification
        show={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

