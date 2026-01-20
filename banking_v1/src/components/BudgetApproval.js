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

export default function BudgetApproval() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [comments, setComments] = useState("");
  const [budgetStatus, setBudgetStatus] = useState("Pending Approval");
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
    }).format(amount);
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

  const propertyValue = displayProperty?.price || 5800000;
  const layoutCost = 473000;
  const perSqFtCost = layoutCost / 12500;

  const handleApprove = () => {
    setBudgetStatus("Approved");
    setToastMessage("Budget approval is successful");
    setToastType("success");
    setShowToast(true);
    console.log("Budget approved", { comments });
  };

  const handleReject = () => {
    setBudgetStatus("Rejected");
    setToastMessage("Budget has been rejected");
    setToastType("error");
    setShowToast(true);
    console.log("Budget rejected", { comments });
  };

  const handleUpdateDecision = () => {
    setToastMessage("Decision updated successfully");
    setToastType("info");
    setShowToast(true);
    console.log("Updating decision", { status: budgetStatus, comments });
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="dashboard-main">
          <div className="main-content">
            <PageHeader
              title="Budget Approval"
              subtitle="Layout Measurement Budget Review"
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

            {/* Layout Measurement Details Section */}
            <div style={{ marginTop: "24px" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px"
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 21H21M5 21V7L12 3L19 7V21M5 21H19M9 9V21M15 9V21"
                    stroke="#1e3a8a"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 3V7M17 3V7"
                    stroke="#1e3a8a"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                <h2 style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#111827",
                  margin: 0
                }}>
                  Layout Measurement Details
                </h2>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px"
              }}>
                {/* Site Measurement Card */}
                <div style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  overflow: "hidden"
                }}>
                  <div style={{
                    backgroundColor: "#dbeafe",
                    padding: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                  }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="8" stroke="#1e40af" strokeWidth="1.5" />
                      <circle cx="10" cy="10" r="3" fill="#1e40af" />
                    </svg>
                    <h3 style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#1e40af",
                      margin: 0
                    }}>
                      Site Measurement
                    </h3>
                  </div>
                  <div style={{ padding: "20px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      <div>
                        <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                          Total Area
                        </div>
                        <div style={{ fontSize: "16px", fontWeight: "600", color: "#111827" }}>
                          12,500 sq ft
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                          Usable Area
                        </div>
                        <div style={{ fontSize: "16px", fontWeight: "600", color: "#111827" }}>
                          10,800 sq ft
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                          Common Area
                        </div>
                        <div style={{ fontSize: "16px", fontWeight: "600", color: "#111827" }}>
                          1,700 sq ft
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                          Height
                        </div>
                        <div style={{ fontSize: "16px", fontWeight: "600", color: "#111827" }}>
                          14 ft
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                          Measurement Date
                        </div>
                        <div style={{ fontSize: "16px", fontWeight: "600", color: "#111827" }}>
                          Dec 21, 2024
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Building Specifications Card */}
                <div style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  overflow: "hidden"
                }}>
                  <div style={{
                    backgroundColor: "#d1fae5",
                    padding: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                  }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M3 18H17M4 18V8L10 3L16 8V18M4 18H16M8 13V18M12 13V18"
                        stroke="#065f46"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h3 style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#065f46",
                      margin: 0
                    }}>
                      Building Specifications
                    </h3>
                  </div>
                  <div style={{ padding: "20px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      <div>
                        <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                          Building Sq.Ft
                        </div>
                        <div style={{ fontSize: "16px", fontWeight: "600", color: "#111827" }}>
                          12,500 sq ft
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                          Floor Level
                        </div>
                        <div style={{ fontSize: "16px", fontWeight: "600", color: "#111827" }}>
                          12th Floor
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                          Parking Spaces
                        </div>
                        <div style={{ fontSize: "16px", fontWeight: "600", color: "#111827" }}>
                          25 spaces
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                          Amenities
                        </div>
                        <div style={{ fontSize: "16px", fontWeight: "600", color: "#111827" }}>
                          HVAC, Security
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                          Condition
                        </div>
                        <div style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#065f46"
                        }}>
                          Excellent
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Layout Cost Estimate Card */}
                <div style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  overflow: "hidden"
                }}>
                  <div style={{
                    backgroundColor: "#fed7aa",
                    padding: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                  }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 2V6M10 14V18M18 10H14M6 10H2M15.6569 4.34315L13.1213 6.87868M6.87868 13.1213L4.34315 15.6569M15.6569 15.6569L13.1213 13.1213M6.87868 6.87868L4.34315 4.34315"
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <circle cx="10" cy="10" r="3" stroke="#ea580c" strokeWidth="1.5" />
                    </svg>
                    <h3 style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#ea580c",
                      margin: 0
                    }}>
                      Layout Cost Estimate
                    </h3>
                  </div>
                  <div style={{ padding: "20px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      <div>
                        <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                          Design Cost
                        </div>
                        <div style={{ fontSize: "16px", fontWeight: "600", color: "#111827" }}>
                          ₹45,000
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                          Materials
                        </div>
                        <div style={{ fontSize: "16px", fontWeight: "600", color: "#111827" }}>
                          ₹180,000
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                          Labor
                        </div>
                        <div style={{ fontSize: "16px", fontWeight: "600", color: "#111827" }}>
                          ₹120,000
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                          Equipment
                        </div>
                        <div style={{ fontSize: "16px", fontWeight: "600", color: "#111827" }}>
                          ₹85,000
                        </div>
                      </div>
                      <div>
                        <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                          Contingency (10%)
                        </div>
                        <div style={{ fontSize: "16px", fontWeight: "600", color: "#111827" }}>
                          ₹43,000
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Total Budget Information */}
            <div style={{
              backgroundColor: "#1e3a8a",
              borderRadius: "8px",
              padding: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "white",
              marginTop: "24px"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8C11 7.44772 11.4477 7 12 7Z"
                    fill="white"
                  />
                </svg>
                <h3 style={{ fontSize: "18px", fontWeight: "600", margin: 0 }}>₹ Total Budget Information</h3>
              </div>
              <div style={{ display: "flex", gap: "48px", alignItems: "center" }}>
                <div>
                  <div style={{ fontSize: "14px", opacity: 0.9, marginBottom: "4px" }}>Layout Cost</div>
                  <div style={{ fontSize: "20px", fontWeight: "700" }}>₹473,000</div>
                </div>
                <div>
                  <div style={{ fontSize: "14px", opacity: 0.9, marginBottom: "4px" }}>Per Sq.Ft Cost</div>
                  <div style={{ fontSize: "20px", fontWeight: "700" }}>₹37.84</div>
                </div>
                <div>
                  <div style={{ fontSize: "14px", opacity: 0.9, marginBottom: "4px" }}>Project Timeline</div>
                  <div style={{ fontSize: "20px", fontWeight: "700" }}>8 Weeks</div>
                </div>
                <div>
                  <div style={{ fontSize: "14px", opacity: 0.9, marginBottom: "4px" }}>Start Date</div>
                  <div style={{ fontSize: "20px", fontWeight: "700" }}>Jan 15, 2025</div>
                </div>
              </div>
            </div>

            {/* Budget Approval Decision */}
            <div className="business-details-card" style={{ marginTop: "24px" }}>
              <div className="card-header">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="card-icon"
                >
                  <path
                    d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM8.5 9.5L11 12L15.5 7.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="card-title">Budget Approval Decision</h3>
              </div>
              <div style={{ padding: "20px" }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "24px"
                }}>
                  {/* Left Column - Approval Summary & Budget Breakdown */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    {/* Approval Summary */}
                    <div style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      padding: "20px"
                    }}>
                      <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#111827", marginBottom: "16px", marginTop: 0 }}>
                        Approval Summary
                      </h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "14px", color: "#6b7280" }}>Total Layout Budget:</span>
                          <span style={{ fontSize: "16px", fontWeight: "600", color: "#111827" }}>₹473,000</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "14px", color: "#6b7280" }}>Budget Status:</span>
                          <span style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#f97316",
                            backgroundColor: "#fff7ed",
                            padding: "4px 12px",
                            borderRadius: "6px"
                          }}>
                            {budgetStatus}
                          </span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "14px", color: "#6b7280" }}>Submitted By:</span>
                          <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>Michael Chen - Project Manager</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "14px", color: "#6b7280" }}>Submission Date:</span>
                          <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>December 22, 2024</span>
                        </div>
                      </div>
                    </div>

                    {/* Budget Breakdown */}
                    <div style={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      padding: "20px"
                    }}>
                      <div style={{
                        backgroundColor: "#eff6ff",
                        padding: "12px 16px",
                        borderRadius: "6px",
                        marginBottom: "16px"
                      }}>
                        <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#1e40af", margin: 0 }}>
                          Budget Breakdown
                        </h4>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "14px", color: "#6b7280" }}>Design & Planning:</span>
                          <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>9.5%</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "14px", color: "#6b7280" }}>Materials & Supplies:</span>
                          <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>38.1%</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "14px", color: "#6b7280" }}>Labor & Installation:</span>
                          <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>25.4%</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "14px", color: "#6b7280" }}>Equipment & Technology:</span>
                          <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>18.0%</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "14px", color: "#6b7280" }}>Contingency:</span>
                          <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>9.0%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Decision & Comments */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    {/* Decision Buttons */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      <button
                        onClick={handleApprove}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          padding: "12px 24px",
                          backgroundColor: "#10b981",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "14px",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "background-color 0.2s"
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#059669")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#10b981")}
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M16.7071 5.29289C17.0976 5.68342 17.0976 6.31658 16.7071 6.70711L8.70711 14.7071C8.31658 15.0976 7.68342 15.0976 7.29289 14.7071L3.29289 10.7071C2.90237 10.3166 2.90237 9.68342 3.29289 9.29289C3.68342 8.90237 4.31658 8.90237 4.70711 9.29289L8 12.5858L15.2929 5.29289C15.6834 4.90237 16.3166 4.90237 16.7071 5.29289Z"
                            fill="currentColor"
                          />
                        </svg>
                        Approve Budget
                      </button>
                      <button
                        onClick={handleReject}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          padding: "12px 24px",
                          backgroundColor: "#ef4444",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "14px",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "background-color 0.2s"
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#dc2626")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#ef4444")}
                      >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <path
                            d="M5 5L15 15M15 5L5 15"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        Reject Budget
                      </button>
                    </div>

                    {/* Comments Section */}
                    <div>
                      <label style={{
                        display: "block",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#374151",
                        marginBottom: "8px"
                      }}>
                        Comments
                      </label>
                      <textarea
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                        placeholder="Add your approval or rejection comments here..."
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

                    {/* Update Decision Button */}
                    <button
                      onClick={handleUpdateDecision}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        padding: "12px 24px",
                        backgroundColor: "#f97316",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "background-color 0.2s"
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#ea580c")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "#f97316")}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M10 3V1M10 3C7.23858 3 5 5.23858 5 8C5 10.7614 7.23858 13 10 13M10 3C12.7614 3 15 5.23858 15 8C15 10.7614 12.7614 13 10 13M10 13V19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      Update Decision
                    </button>
                  </div>
                </div>
              </div>
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

