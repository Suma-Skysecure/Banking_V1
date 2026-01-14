"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import DashboardHeader from "@/components/DashboardHeader";
import PropertySummaryCard from "@/components/PropertySummaryCard";
import SiteMeasurementDetails from "@/components/SiteMeasurementDetails";
import LayoutDesignSection from "@/components/LayoutDesignSection";
import LayoutDesignApproval from "@/components/LayoutDesignApproval";
import ToastNotification from "@/components/ToastNotification";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/postLOIActivities.css";
import "@/css/businessApproval.css";
import { useNotifications } from "@/contexts/NotificationContext";

export default function PostLOIActivities() {
  const { user } = useAuth();
  const { createNotification } = useNotifications();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [uploadedLOI, setUploadedLOI] = useState(null);
  const [property, setProperty] = useState(null);
  const [submissionDate, setSubmissionDate] = useState(null);
  const [vendorData, setVendorData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [viewDocumentModal, setViewDocumentModal] = useState({ open: false, category: null, documents: [] });

  // Format currency helper
  const formatCurrencyTSA = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount * 83.5);
  };

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

  // Load vendor data from localStorage and listen for updates
  useEffect(() => {
    const loadVendorData = () => {
      try {
        const storedVendorData = localStorage.getItem("vendorCreationData");
        if (storedVendorData) {
          const parsedVendorData = JSON.parse(storedVendorData);
          setVendorData(parsedVendorData);
        }
      } catch (error) {
        console.error("Error loading vendor data:", error);
      }
    };

    // Load initially
    loadVendorData();

    // Listen for storage changes (when vendor updates data in another tab/window)
    const handleStorageChange = (e) => {
      if (e.key === "vendorCreationData") {
        loadVendorData();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Also listen for custom events (for same-tab updates)
    const handleCustomStorage = () => {
      loadVendorData();
    };

    window.addEventListener("vendorDataUpdated", handleCustomStorage);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("vendorDataUpdated", handleCustomStorage);
    };
  }, []);

  // Load uploaded LOI document from localStorage
  useEffect(() => {
    const storedLOI = localStorage.getItem("uploadedSignedLOI");
    if (storedLOI) {
      try {
        setUploadedLOI(JSON.parse(storedLOI));
      } catch (error) {
        console.error("Error parsing stored LOI:", error);
      }
    }
  }, []);

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  // Handle view documents
  const handleViewDocuments = (category) => {
    if (vendorData?.documents?.[category]) {
      setViewDocumentModal({
        open: true,
        category: category,
        documents: vendorData.documents[category] || []
      });
    }
  };

  // Handle view document
  const handleViewDocument = (doc) => {
    if (doc.data) {
      // If document has data URL, open it
      const blob = dataURLToBlob(doc.data);
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } else if (doc.file) {
      // If document has file object, open it
      const url = URL.createObjectURL(doc.file);
      window.open(url, '_blank');
      setTimeout(() => URL.revokeObjectURL(url), 100);
    }
  };

  // Convert data URL to Blob
  const dataURLToBlob = (dataURL) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

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

  // TSA (Stamp Duty) state - use property price if available
  const propertyValue = displayProperty?.price || 5800000;
  const stampDutyRate = 0.7;
  const totalStampDuty = (propertyValue * stampDutyRate) / 100;

  // TSA (Security Deposit) state
  const depositPercentage = 10;
  const securityDepositAmount = (propertyValue * depositPercentage) / 100;

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

  // Handle view LOI document
  const handleViewLOIDocument = () => {
    if (uploadedLOI && uploadedLOI.data) {
      // Open the document in a new window
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head><title>${uploadedLOI.name}</title></head>
            <body style="margin:0; padding:0; display:flex; justify-content:center; align-items:center; height:100vh;">
              <iframe src="${uploadedLOI.data}" style="width:100%; height:100%; border:none;"></iframe>
            </body>
          </html>
        `);
      }
    } else {
      console.log("View document");
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
              title="Post-LOI Activities"
              subtitle="Accounts Team - Payment Approvals"
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

            {/* LOI Document Card */}
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
                <h3 className="card-title">LOI Document</h3>
              </div>
              <div style={{ padding: "20px" }}>
                {uploadedLOI ? (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px",
                    backgroundColor: "#f9fafb",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#fee2e2",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                            stroke="#ef4444"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14 2V8H20"
                            stroke="#ef4444"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16 13H8M16 17H8M10 9H8"
                            stroke="#ef4444"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "14px", fontWeight: "600", color: "#111827", marginBottom: "4px" }}>
                          {uploadedLOI.name}
                        </div>
                        <div style={{ fontSize: "12px", color: "#6b7280" }}>
                          Uploaded on {formatDate(uploadedLOI.uploadDate)} • {formatFileSize(uploadedLOI.size)}
                        </div>
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
                        flexShrink: 0
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e40af")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "#1e3a8a")}
                      onClick={handleViewLOIDocument}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M8 4C4 4 1.33333 6.66667 1 8C1.33333 9.33333 4 12 8 12C12 12 14.6667 9.33333 15 8C14.6667 6.66667 12 4 8 4Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="8"
                          cy="8"
                          r="2"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                      View Document
                    </button>
                  </div>
                ) : (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "40px 20px",
                    backgroundColor: "#f9fafb",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    color: "#6b7280",
                    fontSize: "14px"
                  }}>
                    No LOI document uploaded yet. Please upload a signed LOI document from the Legal Workflow page.
                  </div>
                )}
              </div>
            </div>

            {/* Site Measurement Details */}
            <SiteMeasurementDetails />

            {/* Layout Design Section */}
            <LayoutDesignSection />

            {/* Layout Design Approval */}
            <LayoutDesignApproval showOnlyUpdateButton={true} />

            {/* TSA (Stamp Duty) Section */}
            <div className="business-details-card" style={{ marginTop: "24px", marginBottom: "24px" }}>
              <div className="card-header">
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "#f97316",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "12px"
                }}>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z"
                      fill="white"
                    />
                    <path
                      d="M8 10C4.68629 10 2 12.6863 2 16H14C14 12.6863 11.3137 10 8 10Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <h3 className="card-title">TSA (Stamp Duty)</h3>
              </div>
              <div style={{ padding: "20px" }}>
                {/* Calculation Breakdown */}
                <div style={{ marginBottom: "24px" }}>
                  <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#111827", marginBottom: "16px" }}>
                    Calculation Breakdown
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "14px", color: "#6b7280" }}>Property Value:</span>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                        {formatCurrencyTSA(propertyValue)}
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
                        {formatCurrencyTSA(totalStampDuty)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Information */}
                <div style={{ marginBottom: "24px" }}>
                  <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#111827", marginBottom: "16px" }}>
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
                        backgroundColor: "#fef3c7",
                        color: "#92400e",
                        borderRadius: "20px",
                        fontSize: "14px",
                        fontWeight: "500"
                      }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                          <path
                            d="M8 4V8L10.5 10.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Payment Initiated
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
                  </div>
                </div>

                {/* Additional Information and Payment Details */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "24px",
                  marginBottom: "24px"
                }}>
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

                  {/* Payment Details */}
                  <div className="business-details-card">
                    <div className="card-header">
                      <h3 className="card-title">Payment Details</h3>
                    </div>
                    <div style={{ padding: "20px" }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        <div>
                          <label style={{ display: "block", fontSize: "14px", color: "#6b7280", marginBottom: "6px" }}>
                            Payment Date
                          </label>
                          <div style={{
                            padding: "10px 12px",
                            fontSize: "14px",
                            border: "1px solid #d1d5db",
                            borderRadius: "6px",
                            backgroundColor: "#f9fafb",
                            color: "#111827"
                          }}>
                            December 19, 2024
                          </div>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "14px", color: "#6b7280", marginBottom: "6px" }}>
                            Payment Method
                          </label>
                          <div style={{
                            padding: "10px 12px",
                            fontSize: "14px",
                            border: "1px solid #d1d5db",
                            borderRadius: "6px",
                            backgroundColor: "#f9fafb",
                            color: "#111827"
                          }}>
                            Electronic Transfer
                          </div>
                        </div>
                        <div>
                          <label style={{ display: "block", fontSize: "14px", color: "#6b7280", marginBottom: "6px" }}>
                            Paying Authority
                          </label>
                          <div style={{
                            padding: "10px 12px",
                            fontSize: "14px",
                            border: "1px solid #d1d5db",
                            borderRadius: "6px",
                            backgroundColor: "#f9fafb",
                            color: "#111827"
                          }}>
                            Florida Department of Revenue
                          </div>
                        </div>
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
                  </div>
                </div>

                {/* Submit Stamp Duty for Account Button */}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    onClick={() => {
                      console.log("Submitting stamp duty for account");

                      // Notify Accounts Team
                      createNotification(
                        "Stamp Duty submitted for approval",
                        "info",
                        "/accounts-approval", // Assuming a route exists or generic
                        "Account"
                      );

                      setNotificationMessage("Stamp duty submitted successfully");
                      setShowNotification(true);
                    }}
                    style={{
                      padding: "10px 20px",
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
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
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
                    Submit Stamp Duty for Account
                  </button>
                </div>
              </div>
            </div>

            {/* Vendor Details Section - View Only (Created by Vendor, Viewed by Site Measurement Team) */}
            {vendorData && (
              <div className="business-details-card" style={{ marginTop: "24px", marginBottom: "24px" }}>
                <div className="card-header">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="card-icon"
                  >
                    <path
                      d="M8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z"
                      fill="currentColor"
                    />
                    <path
                      d="M8 1C5.23858 1 3 3.23858 3 6C3 10 8 15 8 15C8 15 13 10 13 6C13 3.23858 10.7614 1 8 1Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    <h3 className="card-title">Vendor Details</h3>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "4px 12px",
                      backgroundColor: "#dbeafe",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "#1e40af"
                    }}>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M8 2V8M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                      Created by Vendor
                    </div>
                  </div>
                </div>
                <div style={{ padding: "20px" }}>
                  {/* Info Banner */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px 16px",
                    backgroundColor: "#eff6ff",
                    border: "1px solid #93c5fd",
                    borderRadius: "8px",
                    marginBottom: "24px"
                  }}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <circle cx="10" cy="10" r="9" stroke="#2563eb" strokeWidth="1.5" />
                      <path
                        d="M10 6V10M10 14H10.01"
                        stroke="#2563eb"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span style={{ fontSize: "14px", color: "#1e40af", fontWeight: "500" }}>
                      This information was created by the Vendor and is being viewed by the Site Measurement Team
                    </span>
                  </div>

                  {/* Vendor Details Grid */}
                  <div className="details-grid">
                    <div className="detail-item">
                      <span className="detail-label">Vendor Type</span>
                      <span className="detail-value">{vendorData.vendorType || "N/A"}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Legal Name</span>
                      <span className="detail-value">{vendorData.legalName || "N/A"}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">PAN Number</span>
                      <span className="detail-value">{vendorData.panNumber || "N/A"}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">GST Number</span>
                      <span className="detail-value">{vendorData.gstNumber || "Not provided"}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Bank Account Number</span>
                      <span className="detail-value">{vendorData.bankAccountNumber || "N/A"}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">IFSC Code</span>
                      <span className="detail-value">{vendorData.ifscCode || "N/A"}</span>
                    </div>
                    <div className="detail-item" style={{ gridColumn: "1 / -1" }}>
                      <span className="detail-label">Registered Address</span>
                      <span className="detail-value" style={{ whiteSpace: "pre-wrap" }}>
                        {vendorData.registeredAddress || "N/A"}
                      </span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Purpose</span>
                      <span className="detail-value">{vendorData.purpose || "N/A"}</span>
                    </div>
                    {vendorData.submittedDate && (
                      <div className="detail-item">
                        <span className="detail-label">Submitted Date</span>
                        <span className="detail-value">
                          {new Date(vendorData.submittedDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true
                          })}
                        </span>
                      </div>
                    )}
                    {vendorData.submittedBy && (
                      <div className="detail-item">
                        <span className="detail-label">Submitted By</span>
                        <span className="detail-value">{vendorData.submittedBy}</span>
                      </div>
                    )}
                  </div>

                  {/* Documents Summary */}
                  {vendorData.documents && (
                    <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid #e5e7eb" }}>
                      <h4 style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#111827",
                        marginBottom: "16px"
                      }}>
                        Uploaded Documents
                      </h4>
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div
                          onClick={() => handleViewDocuments("panCard")}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "12px",
                            backgroundColor: "#f9fafb",
                            borderRadius: "6px",
                            cursor: "pointer",
                            transition: "background-color 0.2s"
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f3f4f6"}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f9fafb"}
                        >
                          <span style={{ fontSize: "14px", color: "#6b7280" }}>PAN Card Documents</span>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                              {vendorData.documents.panCard?.length || 0} file(s)
                            </span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path
                                d="M6 12L10 8L6 4"
                                stroke="#6b7280"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        <div
                          onClick={() => handleViewDocuments("bankDetails")}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "12px",
                            backgroundColor: "#f9fafb",
                            borderRadius: "6px",
                            cursor: "pointer",
                            transition: "background-color 0.2s"
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f3f4f6"}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f9fafb"}
                        >
                          <span style={{ fontSize: "14px", color: "#6b7280" }}>Bank Details Documents</span>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                              {vendorData.documents.bankDetails?.length || 0} file(s)
                            </span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path
                                d="M6 12L10 8L6 4"
                                stroke="#6b7280"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        <div
                          onClick={() => handleViewDocuments("gstOthers")}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "12px",
                            backgroundColor: "#f9fafb",
                            borderRadius: "6px",
                            cursor: "pointer",
                            transition: "background-color 0.2s"
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f3f4f6"}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f9fafb"}
                        >
                          <span style={{ fontSize: "14px", color: "#6b7280" }}>GST & Other Documents</span>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                              {vendorData.documents.gstOthers?.length || 0} file(s)
                            </span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path
                                d="M6 12L10 8L6 4"
                                stroke="#6b7280"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                        <div
                          onClick={() => handleViewDocuments("addressProof")}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "12px",
                            backgroundColor: "#f9fafb",
                            borderRadius: "6px",
                            cursor: "pointer",
                            transition: "background-color 0.2s"
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f3f4f6"}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f9fafb"}
                        >
                          <span style={{ fontSize: "14px", color: "#6b7280" }}>Address Proof Documents</span>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                              {vendorData.documents.addressProof?.length || 0} file(s)
                            </span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                              <path
                                d="M6 12L10 8L6 4"
                                stroke="#6b7280"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TSA (Security Deposit) Section */}
            <div className="business-details-card" style={{ marginTop: "24px", marginBottom: "24px" }}>
              <div className="card-header">
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  backgroundColor: "#f97316",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "12px"
                }}>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 1L3 4V8C3 11.866 8 15 8 15C8 15 13 11.866 13 8V4L8 1Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="card-title">TSA (Security Deposit)</h3>
              </div>
              <div style={{ padding: "20px" }}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "24px"
                }}>
                  {/* Deposit Details (Left Column) */}
                  <div>
                    <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#111827", marginBottom: "20px" }}>
                      Deposit Details
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "14px", color: "#6b7280" }}>Property Value:</span>
                        <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                          {formatCurrencyTSA(propertyValue)}
                        </span>
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "14px", color: "#6b7280" }}>Deposit Percentage:</span>
                        <span style={{ fontSize: "14px", fontWeight: "600", color: "#111827" }}>
                          {depositPercentage}%
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
                          Security Deposit Amount:
                        </span>
                        <span style={{ fontSize: "20px", fontWeight: "700", color: "#1e3a8a" }}>
                          {formatCurrencyTSA(securityDepositAmount)}
                        </span>
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "14px", color: "#6b7280", marginBottom: "6px" }}>
                          Due Date
                        </label>
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "10px 12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#f9fafb",
                          color: "#111827"
                        }}>
                          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M2 4H14V12H2V4Z"
                              stroke="#6b7280"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6 2V6M10 2V6M2 8H14"
                              stroke="#6b7280"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                          December 31, 2024
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Select Payment Method (Right Column) */}
                  <div>
                    <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#111827", marginBottom: "20px" }}>
                      Select Payment Method
                    </h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <label style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "16px",
                        border: paymentMethod === "upi" ? "2px solid #1e3a8a" : "1px solid #d1d5db",
                        borderRadius: "8px",
                        backgroundColor: paymentMethod === "upi" ? "#f0f9ff" : "white",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={paymentMethod === "upi"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          style={{ width: "18px", height: "18px", cursor: "pointer" }}
                        />
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M17 2H7C5.89543 2 5 2.89543 5 4V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V4C19 2.89543 18.1046 2 17 2Z"
                            stroke={paymentMethod === "upi" ? "#1e3a8a" : "#6b7280"}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12 18H12.01"
                            stroke={paymentMethod === "upi" ? "#1e3a8a" : "#6b7280"}
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                        <span style={{ fontSize: "14px", fontWeight: "500", color: "#111827", flex: 1 }}>
                          Pay by UPI
                        </span>
                      </label>

                      <label style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "16px",
                        border: paymentMethod === "card" ? "2px solid #1e3a8a" : "1px solid #d1d5db",
                        borderRadius: "8px",
                        backgroundColor: paymentMethod === "card" ? "#f0f9ff" : "white",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          style={{ width: "18px", height: "18px", cursor: "pointer" }}
                        />
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M2 8H22M4 16H20M3 8V16C3 17.1046 3.89543 18 5 18H19C20.1046 18 21 17.1046 21 16V8C21 6.89543 20.1046 6 19 6H5C3.89543 6 3 6.89543 3 8Z"
                            stroke={paymentMethod === "card" ? "#1e3a8a" : "#6b7280"}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span style={{ fontSize: "14px", fontWeight: "500", color: "#111827", flex: 1 }}>
                          Pay by Credit/Debit Card
                        </span>
                      </label>

                      <label style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        padding: "16px",
                        border: paymentMethod === "netbanking" ? "2px solid #1e3a8a" : "1px solid #d1d5db",
                        borderRadius: "8px",
                        backgroundColor: paymentMethod === "netbanking" ? "#f0f9ff" : "white",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="netbanking"
                          checked={paymentMethod === "netbanking"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          style={{ width: "18px", height: "18px", cursor: "pointer" }}
                        />
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M3 7H21M5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7M5 7C5 5.89543 5.89543 5 7 5H17C18.1046 5 19 5.89543 19 7M9 12H15"
                            stroke={paymentMethod === "netbanking" ? "#1e3a8a" : "#6b7280"}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span style={{ fontSize: "14px", fontWeight: "500", color: "#111827", flex: 1 }}>
                          Net Banking
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Pay Now Button */}
                <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={() => {
                      console.log("Processing payment", { amount: securityDepositAmount, method: paymentMethod });
                      setNotificationMessage("Security deposit payment processed successfully");
                      setShowNotification(true);
                    }}
                    style={{
                      padding: "14px 32px",
                      backgroundColor: "#1e3a8a",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontWeight: "600",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      transition: "background-color 0.2s"
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e40af")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "#1e3a8a")}
                  >
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 1L3 4V8C3 11.866 8 15 8 15C8 15 13 11.866 13 8V4L8 1Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Pay Now - {formatCurrencyTSA(securityDepositAmount)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Toast Notification */}
      <ToastNotification
        show={showNotification}
        message={notificationMessage}
        type="success"
        onClose={() => setShowNotification(false)}
      />

      {/* Document View Modal */}
      {viewDocumentModal.open && (
        <div
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
            zIndex: 1000,
          }}
          onClick={() => setViewDocumentModal({ open: false, category: null, documents: [] })}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              padding: "24px",
              width: "90%",
              maxWidth: "700px",
              maxHeight: "80vh",
              overflow: "auto",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "24px"
            }}>
              <h2 style={{
                fontSize: "20px",
                fontWeight: "600",
                color: "#111827",
                margin: 0
              }}>
                {viewDocumentModal.category === "panCard" && "PAN Card Documents"}
                {viewDocumentModal.category === "bankDetails" && "Bank Details Documents"}
                {viewDocumentModal.category === "gstOthers" && "GST & Other Documents"}
                {viewDocumentModal.category === "addressProof" && "Address Proof Documents"}
              </h2>
              <button
                onClick={() => setViewDocumentModal({ open: false, category: null, documents: [] })}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="#6b7280"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {viewDocumentModal.documents.length === 0 ? (
              <div style={{
                textAlign: "center",
                padding: "40px",
                color: "#6b7280"
              }}>
                <svg
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ margin: "0 auto 16px", opacity: 0.5 }}
                >
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
                </svg>
                <p style={{ fontSize: "16px", margin: 0, marginBottom: "8px" }}>No documents uploaded yet</p>
              </div>
            ) : (
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}>
                {viewDocumentModal.documents.map((doc, index) => (
                  <div
                    key={doc.id || index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "16px",
                      backgroundColor: "#f9fafb",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      transition: "all 0.2s"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f3f4f6";
                      e.currentTarget.style.borderColor = "#d1d5db";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "#f9fafb";
                      e.currentTarget.style.borderColor = "#e5e7eb";
                    }}
                  >
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      flex: 1
                    }}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                          stroke="#3b82f6"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 2V8H20"
                          stroke="#3b82f6"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#111827",
                          marginBottom: "4px"
                        }}>
                          {doc.name || `Document ${index + 1}`}
                        </div>
                        <div style={{
                          fontSize: "12px",
                          color: "#6b7280"
                        }}>
                          {formatFileSize(doc.size)} • {doc.uploadDate ? new Date(doc.uploadDate).toLocaleDateString() : "Unknown date"}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleViewDocument(doc)}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#1e40af",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "background-color 0.2s"
                      }}
                      onMouseEnter={(e) => e.target.style.backgroundColor = "#1e3a8a"}
                      onMouseLeave={(e) => e.target.style.backgroundColor = "#1e40af"}
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

