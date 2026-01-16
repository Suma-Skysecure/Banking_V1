"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import DashboardHeader from "@/components/DashboardHeader";
import PropertySummaryCard from "@/components/PropertySummaryCard";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/agreementExecution.css";
import "@/css/businessApproval.css";
import LegalDocumentsView from "@/components/legal/LegalDocumentsView";

export default function AgreementExecution() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [legalDocuments, setLegalDocuments] = useState([]);
  const [itAssessmentData, setItAssessmentData] = useState(null);
  const [itApprovalData, setItApprovalData] = useState(null);
  const [itChecklistAssessment, setItChecklistAssessment] = useState(null);
  const [property, setProperty] = useState(null);
  const [submissionDate, setSubmissionDate] = useState(null);
  
  // Modal states
  const [showLayoutModal, setShowLayoutModal] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [showITModal, setShowITModal] = useState(false);
  
  // Data states
  const [layoutDesignDocument, setLayoutDesignDocument] = useState(null);
  const [vendorDetails, setVendorDetails] = useState(null);

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

  useEffect(() => {
    // Check if property is ready for agreement
    const checkStatus = () => {
      // 1. Check Legal/Agreement Readiness
      const branches = JSON.parse(localStorage.getItem("agreementReadyBranches") || "[]");
      const downtownBranch = branches.find(b => b.id === "PROP-MIA-2024-002");
      setIsReady(!!downtownBranch);

      if (downtownBranch && downtownBranch.documents) {
        setLegalDocuments(downtownBranch.documents);
      } else {
        // Also check uploadedLegalDocuments as fallback
        const uploadedDocs = JSON.parse(localStorage.getItem("uploadedLegalDocuments") || "[]");
        setLegalDocuments(uploadedDocs);
      }

      // 2. Check IT Assessment Status
      // Look for approved IT assessment for Branch ID 1 (Downtown Manhattan) as proxy
      const storedApprovals = JSON.parse(localStorage.getItem('itApprovals') || "[]");
      const approvedIT = storedApprovals.find(app => (app.branchId === 1 || app.branchId === "1") && app.status === 'approved');

      if (approvedIT) {
        setItApprovalData(approvedIT);

        // Also fetch the assessment details
        const storedAssessments = JSON.parse(localStorage.getItem('itAssessments') || "[]");
        const assessment = storedAssessments.find(assess => (assess.branch.id === 1 || assess.branch.id === "1")); // forcing ID 1 match
        if (assessment) {
          setItAssessmentData(assessment);
        }
      } else {
        setItApprovalData(null);
        setItAssessmentData(null);
      }

      // 3. Load IT Checklist Assessment (from ITFeasibilityChecklist component)
      const checklistData = JSON.parse(localStorage.getItem('itAssessment_1') || "{}");
      if (checklistData && checklistData.data && Object.keys(checklistData.data).length > 0) {
        setItChecklistAssessment(checklistData);
      }
    };

    checkStatus();

    // Listen for updates
    window.addEventListener('agreementBranchesUpdated', checkStatus);
    window.addEventListener('storage', checkStatus);
    
    // Listen for IT assessment updates
    const handleITAssessmentUpdate = (e) => {
      if (e.key === 'itAssessment_1' || !e.key) {
        const checklistData = JSON.parse(localStorage.getItem('itAssessment_1') || "{}");
        if (checklistData && checklistData.data && Object.keys(checklistData.data).length > 0) {
          setItChecklistAssessment(checklistData);
        }
      }
    };
    
    window.addEventListener('storage', handleITAssessmentUpdate);
    
    return () => {
      window.removeEventListener('agreementBranchesUpdated', checkStatus);
      window.removeEventListener('storage', checkStatus);
      window.removeEventListener('storage', handleITAssessmentUpdate);
    };
  }, []);

  // Load layout design document
  useEffect(() => {
    try {
      const storedLayout = localStorage.getItem("layoutDesignDocument");
      if (storedLayout) {
        setLayoutDesignDocument(JSON.parse(storedLayout));
      }
    } catch (error) {
      console.error("Error loading layout design document:", error);
    }
  }, []);

  // Load vendor details
  useEffect(() => {
    try {
      const storedVendor = localStorage.getItem("vendorCreationData");
      if (storedVendor) {
        setVendorDetails(JSON.parse(storedVendor));
      }
    } catch (error) {
      console.error("Error loading vendor details:", error);
    }
    
    // Listen for vendor data updates
    const handleVendorUpdate = () => {
      const storedVendor = localStorage.getItem("vendorCreationData");
      if (storedVendor) {
        setVendorDetails(JSON.parse(storedVendor));
      }
    };
    
    window.addEventListener("vendorDataUpdated", handleVendorUpdate);
    window.addEventListener("storage", (e) => {
      if (e.key === "vendorCreationData") {
        handleVendorUpdate();
      }
    });
    
    return () => {
      window.removeEventListener("vendorDataUpdated", handleVendorUpdate);
    };
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

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  // Handle view document
  const handleViewDocument = (documentData) => {
    if (documentData && documentData.data) {
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head><title>${documentData.name || documentData.fileName || "Document"}</title></head>
            <body style="margin:0; padding:0; display:flex; justify-content:center; align-items:center; height:100vh;">
              <iframe src="${documentData.data}" style="width:100%; height:100%; border:none;"></iframe>
            </body>
          </html>
        `);
      }
    }
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="dashboard-main">
          <div className="main-content">
            <PageHeader
              title="Agreement Registration"
              subtitle="Finalize and execute property acquisition agreement"
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

            {/* Cards Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "24px",
              marginTop: "24px"
            }}>
              {/* Site Measurement Card */}
              <div style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px"
                }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    backgroundColor: "#fed7aa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M3 18H17M4 18V8L10 3L16 8V18M4 18H16M8 13V18M12 13V18"
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 6L14 8L12 10M8 6L6 8L8 10"
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: 0
                  }}>
                    Site Measurement
                  </h3>
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <h4 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: "0 0 12px 0"
                  }}>
                    Layout Design
                  </h4>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px"
                  }}>
                    <span style={{ fontSize: "14px", color: "#6b7280" }}>Status:</span>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "4px 12px",
                      backgroundColor: "#d1fae5",
                      color: "#065f46",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "600"
                    }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M13 4L6 11L3 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Approved
                    </span>
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "14px",
                    color: "#6b7280"
                  }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="#ef4444" strokeWidth="1.5" />
                      <path
                        d="M8 4V8L10.5 10.5"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Approved on: December 18, 2024
                  </div>
                </div>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                    backgroundColor: "#1e3a8a",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                    marginTop: "16px"
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e40af")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#1e3a8a")}
                  onClick={() => setShowLayoutModal(true)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 4C4 2.89543 4.89543 2 6 2H14C15.1046 2 16 2.89543 16 4V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V4Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M6 6H14M6 10H14M6 14H10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  View Layout Design Document
                </button>
              </div>

              {/* Vendor Card */}
              <div style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px"
                }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    backgroundColor: "#fed7aa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z"
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10 12C5.58172 12 2 15.5817 2 20H18C18 15.5817 14.4183 12 10 12Z"
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: 0
                  }}>
                    Vendor
                  </h3>
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <div style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    marginBottom: "8px"
                  }}>
                    Vendor Name:
                  </div>
                  <div style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "12px"
                  }}>
                    Biscayne Development Group
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px"
                  }}>
                    <span style={{ fontSize: "14px", color: "#6b7280" }}>Status:</span>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "4px 12px",
                      backgroundColor: "#d1fae5",
                      color: "#065f46",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "600"
                    }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M13 4L6 11L3 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Approved
                    </span>
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "14px",
                    color: "#6b7280"
                  }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="#ef4444" strokeWidth="1.5" />
                      <path
                        d="M8 4V8L10.5 10.5"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Created on: December 17, 2024
                  </div>
                </div>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                    backgroundColor: "#1e3a8a",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                    marginTop: "16px"
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e40af")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#1e3a8a")}
                  onClick={() => setShowVendorModal(true)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 4C5.5 4 3 6.5 3 9C3 11 5 13 8 13C11 13 13 11 13 9C13 6.5 10.5 4 8 4Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="8"
                      cy="9"
                      r="2"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                  View Vendor Details
                </button>
              </div>

              {/* Legal Due Card */}
              <div style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px"
                }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    backgroundColor: "#fed7aa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M3 4H17M3 8H17M3 12H17M3 16H17"
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M6 2V6M14 2V6"
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: 0
                  }}>
                    Legal Due
                  </h3>
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <h4 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: "0 0 12px 0"
                  }}>
                    Legal Clearance
                  </h4>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px"
                  }}>
                    <span style={{ fontSize: "14px", color: "#6b7280" }}>Status:</span>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "4px 12px",
                      backgroundColor: "#d1fae5",
                      color: "#065f46",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "600"
                    }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M13 4L6 11L3 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Cleared
                    </span>
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "14px",
                    color: "#6b7280"
                  }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="#ef4444" strokeWidth="1.5" />
                      <path
                        d="M8 4V8L10.5 10.5"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Cleared on: December 16, 2024
                  </div>
                </div>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                    backgroundColor: "#1e3a8a",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                    marginTop: "16px"
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e40af")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#1e3a8a")}
                  onClick={() => setShowLegalModal(true)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 4C4 2.89543 4.89543 2 6 2H14C15.1046 2 16 2.89543 16 4V16C16 17.1046 15.1046 18 14 18H6C4.89543 18 4 17.1046 4 16V4Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M6 6H14M6 10H14M6 14H10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  View Legal Documents
                </button>
              </div>

              {/* IT Team Card */}
              <div style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px"
                }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    backgroundColor: "#fed7aa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 2V6M10 14V18M2 10H6M14 10H18"
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                      <circle cx="10" cy="10" r="3" stroke="#ea580c" strokeWidth="1.5" />
                    </svg>
                  </div>
                  <h3 style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: 0
                  }}>
                    IT Team
                  </h3>
                </div>
                <div style={{ marginBottom: "12px" }}>
                  <h4 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: "0 0 12px 0"
                  }}>
                    IT Assessment
                  </h4>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px"
                  }}>
                    <span style={{ fontSize: "14px", color: "#6b7280" }}>Status:</span>
                    <span style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "4px 12px",
                      backgroundColor: "#d1fae5",
                      color: "#065f46",
                      borderRadius: "20px",
                      fontSize: "12px",
                      fontWeight: "600"
                    }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M13 4L6 11L3 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Completed
                    </span>
                  </div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "14px",
                    color: "#6b7280"
                  }}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="8" cy="8" r="6" stroke="#ef4444" strokeWidth="1.5" />
                      <path
                        d="M8 4V8L10.5 10.5"
                        stroke="#ef4444"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Completed on: December 15, 2024
                  </div>
                </div>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 20px",
                    backgroundColor: "#1e3a8a",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background-color 0.2s",
                    marginTop: "16px"
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e40af")}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = "#1e3a8a")}
                  onClick={() => setShowITModal(true)}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M2 12L6 8L9 11L14 6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 6H14V10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  View IT Assessment
                </button>
              </div>
            </div>

            {/* Timesheet & Payment Status Section */}
            <div style={{ marginTop: "32px" }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "24px"
              }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  backgroundColor: "#fed7aa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="10" cy="10" r="8" stroke="#ea580c" strokeWidth="1.5" />
                    <path
                      d="M10 6V10L13 13"
                      stroke="#ea580c"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2 style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#111827",
                  margin: 0
                }}>
                  Timesheet & Payment Status
                </h2>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "24px"
              }}>
                {/* Security Deposit Card */}
                <div style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "24px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "16px"
                  }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      backgroundColor: "#fed7aa",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M10 2L4 5V9C4 13 7 16 10 17C13 16 16 13 16 9V5L10 2Z"
                          stroke="#ea580c"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 8V12M8 10H12"
                          stroke="#ea580c"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <h3 style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#111827",
                      margin: 0
                    }}>
                      Security Deposit
                    </h3>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <div style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      marginBottom: "4px"
                    }}>
                      Amount:
                    </div>
                    <div style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      color: "#111827",
                      marginBottom: "12px"
                    }}>
                      $580,000
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "8px"
                    }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Status:</span>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "4px 12px",
                        backgroundColor: "#d1fae5",
                        color: "#065f46",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "600"
                      }}>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M13 4L6 11L3 8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Payment Completed
                      </span>
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "14px",
                      color: "#6b7280"
                    }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6" stroke="#ef4444" strokeWidth="1.5" />
                        <path
                          d="M8 4V8L10.5 10.5"
                          stroke="#ef4444"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Completed on: December 20, 2024
                    </div>
                  </div>
                </div>

                {/* Stamp Duty Card */}
                <div style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "24px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "16px"
                  }}>
                    <div style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "8px",
                      backgroundColor: "#fed7aa",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <circle cx="10" cy="7" r="3" stroke="#ea580c" strokeWidth="1.5" />
                        <path
                          d="M4 18C4 15 6.5 13 10 13C13.5 13 16 15 16 18"
                          stroke="#ea580c"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <h3 style={{
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#111827",
                      margin: 0
                    }}>
                      Stamp Duty
                    </h3>
                  </div>
                  <div style={{ marginBottom: "16px" }}>
                    <div style={{
                      fontSize: "14px",
                      color: "#6b7280",
                      marginBottom: "4px"
                    }}>
                      Amount:
                    </div>
                    <div style={{
                      fontSize: "28px",
                      fontWeight: "700",
                      color: "#111827",
                      marginBottom: "12px"
                    }}>
                      $40,600
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "8px"
                    }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Status:</span>
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "4px 12px",
                        backgroundColor: "#d1fae5",
                        color: "#065f46",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "600"
                      }}>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M13 4L6 11L3 8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Approved
                      </span>
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "14px",
                      color: "#6b7280"
                    }}>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <circle cx="8" cy="8" r="6" stroke="#ef4444" strokeWidth="1.5" />
                        <path
                          d="M8 4V8L10.5 10.5"
                          stroke="#ef4444"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Approved on: December 19, 2024
                    </div>
                  </div>
                </div>
              </div>
            </div>



            {/* NEW: Legal Documents Section */}
            {legalDocuments.length > 0 && (
              <div style={{ marginTop: "32px" }}>
                <LegalDocumentsView documents={legalDocuments} />
              </div>
            )}

            {/* NEW: IT Assessment Section (Only if approved) */}
            {itApprovalData && (
              <div style={{ marginTop: "32px" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "24px"
                }}>
                  <div style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "8px",
                    backgroundColor: "#dbeafe",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M9 17V11M9 11C9 10.4477 9.44772 10 10 10H14C14.5523 10 15 10.4477 15 11M9 11H7M15 11V17M15 11H17M9 21H15C16.1046 21 17 20.1046 17 19V7C17 5.89543 16.1046 5 15 5H9C7.89543 5 7 5.89543 7 7V19C7 20.1046 7.89543 21 9 21Z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 2V5" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h2 style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: 0
                  }}>
                    IT Assessment & Feasibility
                  </h2>
                </div>

                <div style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "24px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
                }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                    paddingBottom: "20px",
                    borderBottom: "1px solid #e5e7eb"
                  }}>
                    <div>
                      <h3 style={{ fontSize: "16px", fontWeight: "600", color: "#111827", margin: "0 0 4px 0" }}>Assessment Status</h3>
                      <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>Verified by BRT Team</p>
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "6px 12px",
                      backgroundColor: "#d1fae5",
                      color: "#065f46",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: "600"
                    }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      BRT Approved
                    </div>
                  </div>

                  {itAssessmentData && (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                      <div>
                        <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>Infrastructure Needs</h4>
                        <p style={{ fontSize: "14px", color: "#4b5563", backgroundColor: "#f9fafb", padding: "12px", borderRadius: "6px", border: "1px solid #e5e7eb", margin: 0 }}>
                          {itAssessmentData.assessment.infrastructureNeeds || "N/A"}
                        </p>
                      </div>
                      <div>
                        <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>Estimated Budget</h4>
                        <p style={{ fontSize: "14px", color: "#4b5563", backgroundColor: "#f9fafb", padding: "12px", borderRadius: "6px", border: "1px solid #e5e7eb", margin: 0 }}>
                          ${itAssessmentData.assessment.estimatedBudget || "N/A"}
                        </p>
                      </div>
                      <div>
                        <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>Technical Requirements</h4>
                        <p style={{ fontSize: "14px", color: "#4b5563", backgroundColor: "#f9fafb", padding: "12px", borderRadius: "6px", border: "1px solid #e5e7eb", margin: 0 }}>
                          {itAssessmentData.assessment.technicalRequirements || "N/A"}
                        </p>
                      </div>
                      <div>
                        <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>Implementation Timeline</h4>
                        <p style={{ fontSize: "14px", color: "#4b5563", backgroundColor: "#f9fafb", padding: "12px", borderRadius: "6px", border: "1px solid #e5e7eb", margin: 0 }}>
                          {itAssessmentData.assessment.implementationTimeline || "N/A"}
                        </p>
                      </div>
                      <div>
                        <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>Budget Allocation Teams</h4>
                        <p style={{ fontSize: "14px", color: "#4b5563", backgroundColor: "#f9fafb", padding: "12px", borderRadius: "6px", border: "1px solid #e5e7eb", margin: 0 }}>
                          {itAssessmentData.assessment.budgetAllocationTeams || "N/A"}
                        </p>
                      </div>
                      <div>
                        <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>Risk Assessment</h4>
                        <p style={{ fontSize: "14px", color: "#4b5563", backgroundColor: "#f9fafb", padding: "12px", borderRadius: "6px", border: "1px solid #e5e7eb", margin: 0 }}>
                          {itAssessmentData.assessment.riskAssessment || "N/A"}
                        </p>
                      </div>
                      <div style={{ gridColumn: "span 2" }}>
                        <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "8px" }}>Additional Recommendations</h4>
                        <p style={{ fontSize: "14px", color: "#4b5563", backgroundColor: "#f9fafb", padding: "12px", borderRadius: "6px", border: "1px solid #e5e7eb", margin: 0 }}>
                          {itAssessmentData.assessment.recommendations || "N/A"}
                        </p>
                      </div>
                    </div>
                  )}

                  <div style={{ marginTop: "24px" }}>
                    <h4 style={{ fontSize: "14px", fontWeight: "600", color: "#374151", marginBottom: "12px" }}>Approval Checklist</h4>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
                      {Object.entries(itApprovalData.approvals).filter(([k, v]) => v).map(([key, value]) => (
                        <div key={key} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "#4b5563" }}>
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                            <circle cx="10" cy="10" r="8" fill="#d1fae5" />
                            <path d="M6 10L9 13L14 8" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                          <span style={{ textTransform: "capitalize" }}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Ready to Proceed Section */}
            <div style={{ marginTop: "32px" }}>
              <div style={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
              }}>
                <h2 style={{
                  fontSize: "20px",
                  fontWeight: "600",
                  color: "#111827",
                  margin: "0 0 12px 0"
                }}>
                  Ready to Proceed
                </h2>
                <p style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  margin: "0 0 24px 0",
                  lineHeight: "1.5"
                }}>
                  All prerequisites have been completed. You can now register the agreement.
                </p>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
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
                  onClick={() => {
                    console.log("Proceed to Register Agreement");
                  }}
                >
                  <span>Proceed to Register Agreement</span>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 12L10 8L6 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Layout Design Document Modal */}
      {showLayoutModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          backdropFilter: "blur(4px)"
        }} onClick={() => setShowLayoutModal(false)}>
          <div style={{
            background: "#fff",
            borderRadius: "12px",
            width: "90%",
            maxWidth: "800px",
            maxHeight: "90vh",
            overflow: "auto",
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
          }} onClick={e => e.stopPropagation()}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 24px",
              borderBottom: "1px solid #e5e7eb"
            }}>
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#111827" }}>
                Layout Design Document
              </h3>
              <button onClick={() => setShowLayoutModal(false)} style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#6b7280"
              }}>×</button>
            </div>
            <div style={{ padding: "24px" }}>
              {layoutDesignDocument ? (
                <div>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "16px",
                    backgroundColor: "#f9fafb",
                    borderRadius: "8px",
                    marginBottom: "16px"
                  }}>
                    <div style={{
                      width: "48px",
                      height: "48px",
                      backgroundColor: "#fee2e2",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M14 2V8H20" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: "16px", fontWeight: "600", color: "#111827", marginBottom: "4px" }}>
                        {layoutDesignDocument.name || layoutDesignDocument.fileName || "Layout Design Document"}
                      </div>
                      <div style={{ fontSize: "14px", color: "#6b7280" }}>
                        {formatFileSize(layoutDesignDocument.size)} • {formatDate(layoutDesignDocument.uploadDate)}
                      </div>
                    </div>
                    {layoutDesignDocument.data && (
                      <button onClick={() => handleViewDocument(layoutDesignDocument)} style={{
                        padding: "10px 20px",
                        backgroundColor: "#1e3a8a",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer"
                      }}>
                        View Document
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#6b7280"
                }}>
                  <p>No layout design document uploaded yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Vendor Details Modal */}
      {showVendorModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          backdropFilter: "blur(4px)"
        }} onClick={() => setShowVendorModal(false)}>
          <div style={{
            background: "#fff",
            borderRadius: "12px",
            width: "90%",
            maxWidth: "900px",
            maxHeight: "90vh",
            overflow: "auto",
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
          }} onClick={e => e.stopPropagation()}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 24px",
              borderBottom: "1px solid #e5e7eb"
            }}>
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#111827" }}>
                Vendor Details
              </h3>
              <button onClick={() => setShowVendorModal(false)} style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#6b7280"
              }}>×</button>
            </div>
            <div style={{ padding: "24px" }}>
              {vendorDetails ? (
                <div style={{ display: "grid", gap: "20px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Vendor Type</div>
                      <div style={{ fontSize: "16px", fontWeight: "600", color: "#111827" }}>
                        {vendorDetails.vendorType || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Legal Name</div>
                      <div style={{ fontSize: "16px", fontWeight: "600", color: "#111827" }}>
                        {vendorDetails.legalName || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>PAN Number</div>
                      <div style={{ fontSize: "16px", fontWeight: "600", color: "#111827" }}>
                        {vendorDetails.panNumber || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>GST Number</div>
                      <div style={{ fontSize: "16px", fontWeight: "600", color: "#111827" }}>
                        {vendorDetails.gstNumber || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Bank Account Number</div>
                      <div style={{ fontSize: "16px", fontWeight: "600", color: "#111827" }}>
                        {vendorDetails.bankAccountNumber || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>IFSC Code</div>
                      <div style={{ fontSize: "16px", fontWeight: "600", color: "#111827" }}>
                        {vendorDetails.ifscCode || "N/A"}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Registered Address</div>
                    <div style={{ fontSize: "16px", fontWeight: "500", color: "#111827" }}>
                      {vendorDetails.registeredAddress || "N/A"}
                    </div>
                  </div>
                  {vendorDetails.documents && Object.keys(vendorDetails.documents).length > 0 && (
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: "600", color: "#111827", marginBottom: "12px" }}>
                        Uploaded Documents
                      </div>
                      <div style={{ display: "grid", gap: "12px" }}>
                        {Object.entries(vendorDetails.documents).map(([category, docs]) => (
                          docs && docs.length > 0 && (
                            <div key={category} style={{
                              padding: "12px",
                              backgroundColor: "#f9fafb",
                              borderRadius: "8px"
                            }}>
                              <div style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "8px", textTransform: "capitalize" }}>
                                {category.replace(/([A-Z])/g, ' $1').trim()}
                              </div>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                {docs.map((doc, idx) => (
                                  <div key={idx} style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    padding: "8px 12px",
                                    backgroundColor: "white",
                                    borderRadius: "6px",
                                    border: "1px solid #e5e7eb"
                                  }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#6b7280" strokeWidth="1.5" />
                                    </svg>
                                    <span style={{ fontSize: "13px", color: "#374151" }}>
                                      {doc.name || doc.fileName || `Document ${idx + 1}`}
                                    </span>
                                    {doc.data && (
                                      <button onClick={() => handleViewDocument(doc)} style={{
                                        padding: "4px 8px",
                                        backgroundColor: "#1e3a8a",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "4px",
                                        fontSize: "11px",
                                        cursor: "pointer"
                                      }}>
                                        View
                                      </button>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#6b7280"
                }}>
                  <p>No vendor details available yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Legal Documents Modal */}
      {showLegalModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          backdropFilter: "blur(4px)"
        }} onClick={() => setShowLegalModal(false)}>
          <div style={{
            background: "#fff",
            borderRadius: "12px",
            width: "90%",
            maxWidth: "900px",
            maxHeight: "90vh",
            overflow: "auto",
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
          }} onClick={e => e.stopPropagation()}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 24px",
              borderBottom: "1px solid #e5e7eb"
            }}>
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#111827" }}>
                Legal Documents
              </h3>
              <button onClick={() => setShowLegalModal(false)} style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#6b7280"
              }}>×</button>
            </div>
            <div style={{ padding: "24px" }}>
              {legalDocuments && legalDocuments.length > 0 ? (
                <div style={{ display: "grid", gap: "16px" }}>
                  {legalDocuments.map((doc, idx) => (
                    <div key={doc.id || idx} style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      padding: "16px",
                      backgroundColor: "#f9fafb",
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb"
                    }}>
                      <div style={{
                        width: "48px",
                        height: "48px",
                        backgroundColor: "#fee2e2",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M14 2V8H20" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "16px", fontWeight: "600", color: "#111827", marginBottom: "4px" }}>
                          {doc.name || doc.fileName || `Legal Document ${idx + 1}`}
                        </div>
                        <div style={{ fontSize: "14px", color: "#6b7280" }}>
                          {formatFileSize(doc.size)} • {formatDate(doc.uploadDate)} • {doc.status || "Verified"}
                        </div>
                      </div>
                      {doc.data && (
                        <button onClick={() => handleViewDocument(doc)} style={{
                          padding: "10px 20px",
                          backgroundColor: "#1e3a8a",
                          color: "white",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "14px",
                          fontWeight: "600",
                          cursor: "pointer"
                        }}>
                          View Document
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#6b7280"
                }}>
                  <p>No legal documents uploaded yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* IT Assessment Modal */}
      {showITModal && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 9999,
          backdropFilter: "blur(4px)"
        }} onClick={() => setShowITModal(false)}>
          <div style={{
            background: "#fff",
            borderRadius: "12px",
            width: "90%",
            maxWidth: "1000px",
            maxHeight: "90vh",
            overflow: "auto",
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
          }} onClick={e => e.stopPropagation()}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 24px",
              borderBottom: "1px solid #e5e7eb",
              position: "sticky",
              top: 0,
              background: "#fff",
              zIndex: 10
            }}>
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#111827" }}>
                IT Assessment Details
              </h3>
              <button onClick={() => setShowITModal(false)} style={{
                background: "none",
                border: "none",
                fontSize: "24px",
                cursor: "pointer",
                color: "#6b7280"
              }}>×</button>
            </div>
            <div style={{ padding: "24px" }}>
              {itChecklistAssessment && itChecklistAssessment.data ? (
                <div style={{ display: "grid", gap: "24px" }}>
                  {/* Assessment Status Header */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px",
                    backgroundColor: "#f9fafb",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb"
                  }}>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: "600", color: "#111827", marginBottom: "4px" }}>
                        Assessment Status
                      </div>
                      <div style={{ fontSize: "13px", color: "#6b7280" }}>
                        {itChecklistAssessment.submitted ? (itChecklistAssessment.sentToBRT ? "Sent to BRT Team" : "Submitted") : "Draft"}
                        {itChecklistAssessment.submittedBy && ` • Submitted by: ${itChecklistAssessment.submittedBy}`}
                      </div>
                      {itChecklistAssessment.submittedAt && (
                        <div style={{ fontSize: "12px", color: "#9ca3af", marginTop: "4px" }}>
                          Submitted on: {formatDate(itChecklistAssessment.submittedAt)}
                        </div>
                      )}
                    </div>
                    {itApprovalData?.status === "approved" && (
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 12px",
                        backgroundColor: "#d1fae5",
                        color: "#065f46",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "600"
                      }}>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        BRT Approved
                      </div>
                    )}
                  </div>

                  {/* Checklist Sections */}
                  <div>
                    <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#111827", marginBottom: "16px" }}>
                      IT Feasibility Checklist Sections
                    </h4>
                    <div style={{ display: "grid", gap: "16px" }}>
                      {Object.entries(itChecklistAssessment.data).map(([sectionId, sectionData]) => {
                        if (!sectionData || (!sectionData.checks && !sectionData.comment && !sectionData.budget)) return null;
                        
                        const sectionTitles = {
                          network: "Network & Connectivity",
                          hardware: "Hardware & Infrastructure",
                          power: "Power & Utilities",
                          software: "Software & Applications",
                          security: "Security & Compliance",
                          dr: "Business Continuity & DR",
                          compliance: "Regulatory & Audit Readiness"
                        };

                        const checkedItems = sectionData.checks ? Object.entries(sectionData.checks).filter(([_, checked]) => checked).map(([item]) => item) : [];
                        const totalBudget = Object.values(itChecklistAssessment.data).reduce((sum, sec) => sum + (Number(sec?.budget) || 0), 0);

                        return (
                          <div key={sectionId} style={{
                            padding: "16px",
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            border: "1px solid #e5e7eb",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                          }}>
                            <h5 style={{ 
                              fontSize: "15px", 
                              fontWeight: "600", 
                              color: "#111827", 
                              marginBottom: "12px",
                              paddingBottom: "8px",
                              borderBottom: "1px solid #e5e7eb"
                            }}>
                              {sectionTitles[sectionId] || sectionId}
                            </h5>

                            {/* Checked Items */}
                            {checkedItems.length > 0 && (
                              <div style={{ marginBottom: "12px" }}>
                                <div style={{ fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "8px", textTransform: "uppercase" }}>
                                  Completed Items ({checkedItems.length})
                                </div>
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "8px" }}>
                                  {checkedItems.map((item, idx) => (
                                    <div key={idx} style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "8px",
                                      padding: "8px 12px",
                                      backgroundColor: "#f0fdf4",
                                      borderRadius: "6px",
                                      fontSize: "13px",
                                      color: "#065f46"
                                    }}>
                                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                                        <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                      {item}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Comments and Budget */}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 180px", gap: "12px" }}>
                              {sectionData.comment && (
                                <div>
                                  <div style={{ fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>Comments</div>
                                  <div style={{ 
                                    fontSize: "13px", 
                                    color: "#374151", 
                                    padding: "10px",
                                    backgroundColor: "#f9fafb",
                                    borderRadius: "6px",
                                    border: "1px solid #e5e7eb",
                                    minHeight: "60px",
                                    whiteSpace: "pre-wrap"
                                  }}>
                                    {sectionData.comment}
                                  </div>
                                </div>
                              )}
                              {sectionData.budget && (
                                <div>
                                  <div style={{ fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>Budget (₹)</div>
                                  <div style={{ 
                                    fontSize: "16px", 
                                    fontWeight: "600",
                                    color: "#1e40af", 
                                    padding: "10px",
                                    backgroundColor: "#eff6ff",
                                    borderRadius: "6px",
                                    border: "1px solid #dbeafe",
                                    textAlign: "center"
                                  }}>
                                    ₹{Number(sectionData.budget).toLocaleString('en-IN')}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Overall Remarks */}
                  {itChecklistAssessment.overallRemarks && (
                    <div style={{
                      padding: "16px",
                      backgroundColor: "#fef3c7",
                      borderRadius: "8px",
                      border: "1px solid #fcd34d"
                    }}>
                      <div style={{ fontSize: "14px", fontWeight: "600", color: "#92400e", marginBottom: "8px" }}>
                        Overall IT Remarks
                      </div>
                      <div style={{ 
                        fontSize: "14px", 
                        color: "#78350f", 
                        whiteSpace: "pre-wrap",
                        lineHeight: "1.6"
                      }}>
                        {itChecklistAssessment.overallRemarks}
                      </div>
                    </div>
                  )}

                  {/* Total Budget Summary */}
                  {(() => {
                    const totalBudget = Object.values(itChecklistAssessment.data).reduce((sum, sec) => sum + (Number(sec?.budget) || 0), 0);
                    if (totalBudget > 0) {
                      return (
                        <div style={{
                          padding: "16px",
                          backgroundColor: "#dbeafe",
                          borderRadius: "8px",
                          border: "1px solid #93c5fd",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}>
                          <div style={{ fontSize: "14px", fontWeight: "600", color: "#1e40af" }}>
                            Total Estimated Budget
                          </div>
                          <div style={{ fontSize: "20px", fontWeight: "700", color: "#1e3a8a" }}>
                            ₹{totalBudget.toLocaleString('en-IN')}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
              ) : itAssessmentData ? (
                <div style={{ display: "grid", gap: "20px" }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: "16px",
                    borderBottom: "1px solid #e5e7eb"
                  }}>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: "600", color: "#111827", marginBottom: "4px" }}>
                        Assessment Status
                      </div>
                      <div style={{ fontSize: "13px", color: "#6b7280" }}>
                        {itApprovalData?.status === "approved" ? "BRT Approved" : "Pending"}
                      </div>
                    </div>
                    {itApprovalData?.status === "approved" && (
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "6px 12px",
                        backgroundColor: "#d1fae5",
                        color: "#065f46",
                        borderRadius: "20px",
                        fontSize: "13px",
                        fontWeight: "600"
                      }}>
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M13 4L6 11L3 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Approved
                      </div>
                    )}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div>
                      <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Infrastructure Needs</div>
                      <div style={{ fontSize: "14px", color: "#111827", padding: "12px", backgroundColor: "#f9fafb", borderRadius: "6px" }}>
                        {itAssessmentData.assessment?.infrastructureNeeds || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Estimated Budget</div>
                      <div style={{ fontSize: "14px", color: "#111827", padding: "12px", backgroundColor: "#f9fafb", borderRadius: "6px" }}>
                        {itAssessmentData.assessment?.estimatedBudget ? `$${itAssessmentData.assessment.estimatedBudget}` : "N/A"}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Technical Requirements</div>
                      <div style={{ fontSize: "14px", color: "#111827", padding: "12px", backgroundColor: "#f9fafb", borderRadius: "6px" }}>
                        {itAssessmentData.assessment?.technicalRequirements || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Implementation Timeline</div>
                      <div style={{ fontSize: "14px", color: "#111827", padding: "12px", backgroundColor: "#f9fafb", borderRadius: "6px" }}>
                        {itAssessmentData.assessment?.implementationTimeline || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Budget Allocation Teams</div>
                      <div style={{ fontSize: "14px", color: "#111827", padding: "12px", backgroundColor: "#f9fafb", borderRadius: "6px" }}>
                        {itAssessmentData.assessment?.budgetAllocationTeams || "N/A"}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Risk Assessment</div>
                      <div style={{ fontSize: "14px", color: "#111827", padding: "12px", backgroundColor: "#f9fafb", borderRadius: "6px" }}>
                        {itAssessmentData.assessment?.riskAssessment || "N/A"}
                      </div>
                    </div>
                    <div style={{ gridColumn: "span 2" }}>
                      <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Additional Recommendations</div>
                      <div style={{ fontSize: "14px", color: "#111827", padding: "12px", backgroundColor: "#f9fafb", borderRadius: "6px" }}>
                        {itAssessmentData.assessment?.recommendations || "N/A"}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{
                  textAlign: "center",
                  padding: "40px",
                  color: "#6b7280"
                }}>
                  <p>No IT assessment data available yet.</p>
                  <p style={{ fontSize: "13px", marginTop: "8px" }}>Please complete the IT Feasibility Assessment first.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

