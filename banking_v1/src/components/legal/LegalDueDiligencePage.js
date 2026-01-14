"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import DashboardHeader from "@/components/DashboardHeader";
import ToastNotification from "@/components/ToastNotification";
import NotificationDropdown from "@/components/NotificationDropdown";
import LegalDecisionPanel from "./LegalDecisionPanel";
import LegalComplianceStatus from "./LegalComplianceStatus";
import LegalDueDetailsModal from "./LegalDueDetailsModal";
import LegalDocumentsView from "./LegalDocumentsView";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/postLOIActivities.css";
import "@/css/businessApproval.css";

export default function LegalDueDiligencePage() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");
  const [uploadedLOI, setUploadedLOI] = useState(null);
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
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
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

  // State for legal due diligence process
  const [callRequired, setCallRequired] = useState(null);
  const [legalClearanceGranted, setLegalClearanceGranted] = useState(false);
  const [brtConfirmed, setBrtConfirmed] = useState(false);
  const [businessDecisionStatus, setBusinessDecisionStatus] = useState("pending");
  const [complianceConfirmed, setComplianceConfirmed] = useState(false);
  const [isFinalized, setIsFinalized] = useState(false);
  const [isAgreementsSubmitted, setIsAgreementsSubmitted] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Load saved state from localStorage
  useEffect(() => {
    try {
      const savedState = localStorage.getItem("legalProcessState");
      if (savedState) {
        const parsed = JSON.parse(savedState);
        setCallRequired(parsed.callRequired ?? null);
        setLegalClearanceGranted(parsed.legalClearanceGranted ?? false);
        setBrtConfirmed(parsed.brtConfirmed ?? false);
        setBusinessDecisionStatus(parsed.businessDecisionStatus ?? "pending");
        setComplianceConfirmed(parsed.complianceConfirmed ?? false);
        setIsFinalized(parsed.isFinalized ?? false);
        setIsAgreementsSubmitted(parsed.isAgreementsSubmitted ?? false);

      }
    } catch (e) {
      console.error("Failed to load legal process state", e);
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    const stateToSave = {
      callRequired,
      legalClearanceGranted,
      brtConfirmed,
      businessDecisionStatus,
      complianceConfirmed,
      isFinalized,
      isAgreementsSubmitted
    };
    localStorage.setItem("legalProcessState", JSON.stringify(stateToSave));
  }, [callRequired, legalClearanceGranted, brtConfirmed, businessDecisionStatus, complianceConfirmed, isFinalized, isAgreementsSubmitted]);



  // State for IT Assessment Display
  const [itAssessmentData, setItAssessmentData] = useState(null);
  const [itApprovalData, setItApprovalData] = useState(null);

  // Load IT Assessment Data
  useEffect(() => {
    const loadITData = () => {
      if (typeof window === 'undefined') return;
      const storedApprovals = JSON.parse(localStorage.getItem('itApprovals') || "[]");
      const approvedIT = storedApprovals.find(app => (app.branchId === 1 || app.branchId === "1") && app.status === 'approved');

      if (approvedIT) {
        setItApprovalData(approvedIT);
        const storedAssessments = JSON.parse(localStorage.getItem('itAssessments') || "[]");
        const assessment = storedAssessments.find(assess => (assess.branch.id === 1 || assess.branch.id === "1"));
        if (assessment) {
          setItAssessmentData(assessment);
        }
      } else {
        setItApprovalData(null);
        setItAssessmentData(null);
      }
    };

    loadITData();
    window.addEventListener('storage', loadITData);
    return () => window.removeEventListener('storage', loadITData);
  }, []);


  const handleShowToast = (message, type = "success") => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
  };

  const handleCallRequiredChange = (value) => {
    setCallRequired(value);
    if (value === "yes") {
      setBrtConfirmed(false);
      setBusinessDecisionStatus("pending");
    }
  };

  const handleGrantClearance = () => {
    setLegalClearanceGranted(true);
    setIsFinalized(true);
  };

  const handleBrtConfirmed = (confirmed) => {
    setBrtConfirmed(confirmed);
  };

  const handleBusinessDecisionComplete = (status) => {
    setBusinessDecisionStatus(status);
    if (status === "approved") {
      setComplianceConfirmed(true);
    }
  };

  const handleViewLOI = () => {
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
      // Fallback to original behavior
      window.open("/api/documents/loi", "_blank");
      alert("Opening LOI document in new window...");
    }
  };

  const handleDownloadLOI = () => {
    // Create a dummy PDF blob for download (in production, this would fetch from API)
    const blob = new Blob(["LOI Document Content"], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "LOI_Downtown_Arts_Plaza_2024.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };


  // Determine final status
  const getFinalStatus = () => {
    if (isAgreementsSubmitted) {
      return "completed";
    }
    if (isFinalized && legalClearanceGranted) {
      if (callRequired === "no") {
        return "completed";
      }
      if (callRequired === "yes" && complianceConfirmed) {
        return "completed";
      }
    }
    return "pending";
  };

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
          <NotificationDropdown />
          <div className="header-profile">
            <div className="profile-avatar">
              {user?.name
                ? user.name.split(" ").length > 1
                  ? (user.name.split(" ")[0][0] + user.name.split(" ")[1][0]).toUpperCase()
                  : user.name.substring(0, 2).toUpperCase()
                : "U"}
            </div>
            <div className="profile-info">
              <span className="profile-name">{user?.role || "User"}</span>
              <span className="profile-email">{user?.email || user?.username || ""}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="dashboard-main">
          <div className="main-content">
            <PageHeader
              title="Legal Due Diligence"
              subtitle="Step 5.2 - Legal Clearance Activities"
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

            {/* NEW: IT Assessment Section (Only if approved) */}
            {itApprovalData && (
              <div style={{ marginBottom: "24px" }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px"
                }}>
                  <div style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    backgroundColor: "#dbeafe",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M9 17V11M9 11C9 10.4477 9.44772 10 10 10H14C14.5523 10 15 10.4477 15 11M9 11H7M15 11V17M15 11H17M9 21H15C16.1046 21 17 20.1046 17 19V7C17 5.89543 16.1046 5 15 5H9C7.89543 5 7 5.89543 7 7V19C7 20.1046 7.89543 21 9 21Z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 2V5" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: 0
                  }}>
                    IT Assessment Details
                  </h3>
                </div>

                <div className="business-details-card" style={{ padding: "20px" }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "20px",
                    paddingBottom: "16px",
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
                </div>
              </div>
            )}

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
                        {uploadedLOI?.name || "LOI_Downtown_Arts_Plaza_2024.pdf"}
                      </div>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>
                        {uploadedLOI ? (
                          <>Uploaded on {formatDate(uploadedLOI.uploadDate)} • {formatFileSize(uploadedLOI.size)}</>
                        ) : (
                          <>Uploaded on Dec 18, 2024 • 2.4 MB</>
                        )}
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
                    onClick={handleViewLOI}
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
              </div>
            </div>

            {/* Legal Due Diligence Dashboard */}
            {/* Legal Documents View */}
            <LegalDocumentsView />

            {/* Legal Decision Panel */}
            <LegalDecisionPanel
              callRequired={callRequired}
              onCallRequiredChange={handleCallRequiredChange}
              onGrantClearance={handleGrantClearance}
              isFinalized={isFinalized}
              onShowToast={handleShowToast}
              onBrtConfirmed={handleBrtConfirmed}
              onBusinessDecisionComplete={handleBusinessDecisionComplete}
              onSubmitted={setIsAgreementsSubmitted}
            />

            {/* Compliance Status */}
            {(legalClearanceGranted || callRequired === "yes") && (
              <LegalComplianceStatus
                businessDecisionStatus={businessDecisionStatus}
                complianceConfirmed={complianceConfirmed}
                finalStatus={getFinalStatus()}
              />
            )}
          </div>
        </main>
      </div>

      {/* Toast Notification */}
      <ToastNotification
        show={showNotification}
        message={notificationMessage}
        type={notificationType}
        onClose={() => setShowNotification(false)}
      />

      {/* Legal Due Details Modal */}
      <LegalDueDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedTask(null);
        }}
      />
    </div>
  );
}

