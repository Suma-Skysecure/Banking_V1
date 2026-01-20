"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import DashboardHeader from "@/components/DashboardHeader";
import { useAuth } from "@/contexts/AuthContext";
import ToastNotification from "@/components/ToastNotification";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/agreementExecution.css";
import "@/css/businessApproval.css";
import { useNotifications } from "@/contexts/NotificationContext";

export default function VendorCreation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { createNotification } = useNotifications();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [property, setProperty] = useState(null);
  const [submissionDate, setSubmissionDate] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");

  // Use existing project data - default vendor information
  const defaultVendorData = {
    vendorName: "Biscayne Development Group",
    vendorType: "Landlord (Property Owner)",
    purpose: "New Branch Setup"
  };

  // Form state
  const [vendorType, setVendorType] = useState(defaultVendorData.vendorType);
  const [legalName, setLegalName] = useState(defaultVendorData.vendorName);
  const [panNumber, setPanNumber] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [registeredAddress, setRegisteredAddress] = useState("");
  const [loiDocument, setLoiDocument] = useState(null);

  // Document state management
  const [uploadedDocuments, setUploadedDocuments] = useState({
    panCard: [],
    bankDetails: [],
    gstOthers: [],
    addressProof: []
  });
  const [viewDocumentModal, setViewDocumentModal] = useState({ open: false, category: null, documents: [] });
  const fileInputRefs = {
    panCard: useRef(null),
    bankDetails: useRef(null),
    gstOthers: useRef(null),
    addressProof: useRef(null)
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

  // Load LOI document from localStorage on component mount
  useEffect(() => {
    try {
      const storedLOI = localStorage.getItem("uploadedSignedLOI");
      if (storedLOI) {
        const loiData = JSON.parse(storedLOI);
        setLoiDocument(loiData);
      }
    } catch (error) {
      console.error("Error loading LOI document from localStorage:", error);
    }
  }, []);

  // Load documents from localStorage on component mount
  useEffect(() => {
    try {
      const storedDocuments = localStorage.getItem(`vendorDocuments_${legalName || 'default'}`);
      if (storedDocuments) {
        const parsed = JSON.parse(storedDocuments);
        setUploadedDocuments(parsed);
      }
    } catch (error) {
      console.error("Error loading documents from localStorage:", error);
    }
  }, [legalName]);

  // Save documents to localStorage whenever they change (for draft saving)
  // Note: File objects are stored separately and converted to base64 only on submit
  useEffect(() => {
    if (legalName) {
      // Store document metadata only (File objects can't be serialized)
      const documentMetadata = {};
      for (const [category, files] of Object.entries(uploadedDocuments)) {
        documentMetadata[category] = files.map(doc => ({
          id: doc.id,
          name: doc.name,
          size: doc.size,
          type: doc.type,
          uploadDate: doc.uploadDate
        }));
      }
      localStorage.setItem(`vendorDocuments_${legalName}`, JSON.stringify(documentMetadata));
    }
  }, [uploadedDocuments, legalName]);

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
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
    
    // Extract area number from size string (e.g., "3,500 sq ft" -> 3500)
    const areaMatch = (property.size || property.totalArea || "").match(/[\d,]+/);
    const areaNum = areaMatch ? parseInt(areaMatch[0].replace(/,/g, "")) : 0;
    
    // Only generate floor level if missing
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
    
    // Only generate parking spaces if missing
    if (isEmpty(property.parkingSpaces)) {
      const spaces = Math.max(2, Math.floor(areaNum / 500));
      defaults.parkingSpaces = `${spaces} Reserved Spaces`;
    }
    
    // Only generate year built if missing
    if (isEmpty(property.yearBuilt)) {
      const currentYear = new Date().getFullYear();
      const baseYear = property.type?.toLowerCase().includes("industrial") ? 2015 : 2018;
      defaults.yearBuilt = String(Math.max(baseYear, currentYear - 6));
    }
    
    // Only generate vendor name if missing
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
    
    // Only generate vendor contact if missing
    if (isEmpty(property.vendorContact)) {
      const areaCode = property.address?.match(/FL (\d{5})/)?.[1]?.substring(0, 3) || "305";
      const propIdNum = parseInt(String(property.id || property.propertyId || "0").replace(/\D/g, "")) || 0;
      const lastFour = String((propIdNum % 9000) + 1000).padStart(4, '0');
      defaults.vendorContact = `+1 (${areaCode}) 555-${lastFour}`;
    }
    
    // Only generate vendor email if missing
    if (isEmpty(property.vendorEmail)) {
      const vendorName = (property.vendorName || defaults.vendorName || "Miami Commercial Realty Group")
        .toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");
      defaults.vendorEmail = `info@${vendorName}.com`;
    }
    
    // Only generate listing status if missing
    if (isEmpty(property.listingStatus)) {
      defaults.listingStatus = property.statusType === "available" ? "Active Listing" : "Pending Listing";
    }
    
    // Only generate zoning if missing
    if (isEmpty(property.zoning)) {
      const type = property.type?.toLowerCase() || "";
      if (type.includes("commercial office")) defaults.zoning = "Commercial/Office";
      else if (type.includes("retail")) defaults.zoning = "Commercial/Retail";
      else if (type.includes("industrial")) defaults.zoning = "Industrial";
      else if (type.includes("mixed use")) defaults.zoning = "Mixed Use";
      else defaults.zoning = "Commercial";
    }
    
    // Only generate last inspection if missing
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

  // Default property if none loaded
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

  // Generate defaults ONLY for missing fields and merge with property data
  const propertyWithDefaults = property ? (() => {
    const defaults = generateDefaultPropertyFields(property);
    const merged = { ...property };
    
    // Only apply defaults for fields that are truly missing/empty
    Object.keys(defaults).forEach(key => {
      if (isEmpty(merged[key])) {
        merged[key] = defaults[key];
      }
    });
    
    // Ensure essential fields are present (only if missing)
    if (isEmpty(merged.id)) {
      merged.id = merged.propertyId || `PROP-MIA-2024-${String(property.id || Date.now()).padStart(3, '0')}`;
    }
    if (isEmpty(merged.name)) {
      merged.name = "Property";
    }
    if (isEmpty(merged.address)) {
      merged.address = "Address not available";
    }
    if (isEmpty(merged.type)) {
      merged.type = "Commercial";
    }
    if (isEmpty(merged.totalArea) && isEmpty(merged.size)) {
      merged.totalArea = "";
    } else if (isEmpty(merged.totalArea) && !isEmpty(merged.size)) {
      merged.totalArea = merged.size;
    }
    if (isEmpty(merged.status)) {
      merged.status = "Available";
    }
    if (isEmpty(merged.statusType)) {
      merged.statusType = "pending";
    }
    if (merged.price === null || merged.price === undefined) {
      merged.price = 0;
    }
    if (merged.pricePerSqft === null || merged.pricePerSqft === undefined) {
      merged.pricePerSqft = 0;
    }
    
    return merged;
  })() : defaultProperty;
  
  const displayProperty = propertyWithDefaults;

  // Format price for display
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

  // Format price per sqft
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

  // Format submission date
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

  // Extract availability days from status
  const getAvailabilityDays = () => {
    if (!displayProperty?.status) return "Available Now";
    const match = displayProperty.status.match(/(\d+)\s*days?/i);
    return match ? `${match[1]} days` : "Available Now";
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

  const handleDocumentUpload = (e, category) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const fileObjects = files.map(file => ({
        id: Date.now() + Math.random(),
        file: file,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadDate: new Date().toISOString()
      }));

      setUploadedDocuments(prev => ({
        ...prev,
        [category]: [...prev[category], ...fileObjects]
      }));
    }
    // Reset input
    if (fileInputRefs[category]?.current) {
      fileInputRefs[category].current.value = "";
    }
  };

  const handleViewDocuments = (category) => {
    setViewDocumentModal({
      open: true,
      category: category,
      documents: uploadedDocuments[category] || []
    });
  };

  const handleRemoveDocument = (category, docId) => {
    // Update uploaded documents state
    setUploadedDocuments(prev => ({
      ...prev,
      [category]: prev[category].filter(doc => doc.id !== docId)
    }));

    // Update modal documents if modal is open for this category
    setViewDocumentModal(prevModal => {
      if (prevModal.open && prevModal.category === category) {
        return {
          ...prevModal,
          documents: prevModal.documents.filter(doc => doc.id !== docId)
        };
      }
      return prevModal;
    });
  };

  const handleViewDocument = (doc) => {
    // Create a temporary URL for the file and open it in a new tab
    const url = URL.createObjectURL(doc.file);
    window.open(url, '_blank');
    // Clean up the URL after a delay to allow the browser to load it
    setTimeout(() => URL.revokeObjectURL(url), 100);
  };

  const handleValidateIFSC = () => {
    console.log("Validating IFSC code:", ifscCode);
    // Implement IFSC validation logic
  };

  const handleSaveDraft = async () => {
    console.log("Saving as draft...");
    
    // Convert File objects to base64 for storage
    const convertDocumentsForStorage = async (docs) => {
      const convertedDocs = {};
      for (const [category, files] of Object.entries(docs)) {
        convertedDocs[category] = await Promise.all(
          files.map(async (doc) => {
            if (doc.file instanceof File) {
              // Convert File to base64
              return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  resolve({
                    id: doc.id,
                    name: doc.name,
                    size: doc.size,
                    type: doc.type,
                    uploadDate: doc.uploadDate,
                    data: reader.result // base64 data URL
                  });
                };
                reader.readAsDataURL(doc.file);
              });
            }
            // Already converted or has data
            return doc;
          })
        );
      }
      return convertedDocs;
    };

    // Convert documents before saving
    const convertedDocuments = await convertDocumentsForStorage(uploadedDocuments);

    // Save vendor data to localStorage
    const vendorData = {
      vendorType,
      legalName,
      panNumber,
      gstNumber,
      bankAccountNumber,
      ifscCode,
      registeredAddress,
      purpose: defaultVendorData.purpose,
      submittedDate: new Date().toISOString(),
      submittedBy: user?.name || user?.email || "Vendor",
      documents: convertedDocuments
    };
    localStorage.setItem("vendorCreationData", JSON.stringify(vendorData));

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("vendorDataUpdated"));

    setNotificationMessage("Draft saved successfully!");
    setNotificationType("success");
    setShowNotification(true);
  };

  const handleSubmitForVerification = async () => {
    console.log("Submitting for verification...");

    // Convert File objects to base64 for storage
    const convertDocumentsForStorage = async (docs) => {
      const convertedDocs = {};
      for (const [category, files] of Object.entries(docs)) {
        convertedDocs[category] = await Promise.all(
          files.map(async (doc) => {
            if (doc.file instanceof File) {
              // Convert File to base64
              return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  resolve({
                    id: doc.id,
                    name: doc.name,
                    size: doc.size,
                    type: doc.type,
                    uploadDate: doc.uploadDate,
                    data: reader.result // base64 data URL
                  });
                };
                reader.readAsDataURL(doc.file);
              });
            }
            // Already converted or has data
            return doc;
          })
        );
      }
      return convertedDocs;
    };

    // Convert documents before saving
    const convertedDocuments = await convertDocumentsForStorage(uploadedDocuments);

    // Save vendor data to localStorage
    const vendorData = {
      vendorType,
      legalName,
      panNumber,
      gstNumber,
      bankAccountNumber,
      ifscCode,
      registeredAddress,
      purpose: defaultVendorData.purpose,
      submittedDate: new Date().toISOString(),
      submittedBy: user?.name || user?.email || "Vendor",
      documents: convertedDocuments
    };
    localStorage.setItem("vendorCreationData", JSON.stringify(vendorData));

    // Dispatch custom event to notify other components
    window.dispatchEvent(new Event("vendorDataUpdated"));

    // Send notification to Site Measurement Team
    createNotification(
      `New Vendor "${legalName}" Created`,
      "info",
      "/post-loi-activities",
      "Site measurement"
    );

    // Send notification to Agreement execution team when Vendor creates vendor
    if (user?.role === "Vendor") {
      createNotification(
        `Vendor "${legalName}" has been created`,
        "info",
        "/agreement-execution",
        "Agreement execution"
      );
    }

    // Show success notification
    setNotificationMessage("Vendor created and submitted for verification. Notification sent to Site Measurement Team.");
    setNotificationType("success");
    setShowNotification(true);
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="dashboard-main">
          <div className="main-content">
            <PageHeader
              title="Vendor Creation"
              subtitle="Create vendor profile for the approved property."
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

            {/* LOI Document Section - Only show for Vendor role and when LOI document exists */}
            {user?.role === "Vendor" && loiDocument && (
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
                    borderRadius: "6px",
                    backgroundColor: "#1e3a8a",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path
                        d="M3 2.5C2.72386 2.5 2.5 2.72386 2.5 3V15C2.5 15.2761 2.72386 15.5 3 15.5H15C15.2761 15.5 15.5 15.2761 15.5 15V5.5L11 2.5H3Z"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11 2.5V5.5H15.5"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4 8H14M4 11H14"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <h2 style={{
                    fontSize: "20px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: 0
                  }}>
                    LOI Document
                  </h2>
                </div>

                {/* LOI Document Card */}
                <div style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "20px",
                  boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px"
                }}>
                  {/* Document Icon */}
                  <div style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "6px",
                    backgroundColor: "#fee2e2",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                        stroke="#dc2626"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 2V8H20"
                        stroke="#dc2626"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 11H16M8 14H16"
                        stroke="#dc2626"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  {/* Document Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "4px"
                    }}>
                      {loiDocument.name || "Standard_LOI_1.pdf"}
                    </div>
                    <div style={{
                      fontSize: "14px",
                      color: "#6b7280"
                    }}>
                      {loiDocument.uploadDate
                        ? `Uploaded on ${new Date(loiDocument.uploadDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                        : "Uploaded on Jan 6, 2026"} • {formatFileSize(loiDocument.size || 113680)}
                    </div>
                  </div>

                  {/* View Document Button */}
                  <button
                    onClick={() => {
                      // Open the LOI document in a new tab
                      if (loiDocument.data) {
                        const blob = dataURLToBlob(loiDocument.data);
                        const url = URL.createObjectURL(blob);
                        window.open(url, '_blank');
                        setTimeout(() => URL.revokeObjectURL(url), 100);
                      }
                    }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "10px 20px",
                      backgroundColor: "#1e3a8a",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "600",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                      flexShrink: 0
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = "#1d4ed8"}
                    onMouseLeave={(e) => e.target.style.backgroundColor = "#1e3a8a"}
                  >
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path
                        d="M9 3C5.68629 3 3 5.68629 3 9C3 12.3137 5.68629 15 9 15C12.3137 15 15 12.3137 15 9C15 5.68629 12.3137 3 9 3Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 12C10.6569 12 12 10.6569 12 9C12 7.34315 10.6569 6 9 6C7.34315 6 6 7.34315 6 9C6 10.6569 7.34315 12 9 12Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5.63604 5.63604L3.51472 3.51472M12.364 5.63604L14.4853 3.51472M5.63604 12.364L3.51472 14.4853M12.364 12.364L14.4853 14.4853"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                    View Document
                  </button>
                </div>
              </div>
            )}

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
              marginTop: "24px"
            }}>
              {/* Left Panel: Vendor Details */}
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
                  marginBottom: "24px"
                }}>
                  Vendor Details
                </h2>

                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px"
                }}>
                  {/* Vendor Type */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Vendor Type
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        value={vendorType}
                        onChange={(e) => setVendorType(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 40px 10px 12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          color: "#111827",
                          cursor: "pointer",
                          appearance: "none"
                        }}
                      >
                        <option value="Landlord (Property Owner)">Landlord (Property Owner)</option>
                        <option value="Fit-out Vendor">Fit-out Vendor</option>
                        <option value="Material Vendor">Material Vendor</option>
                        <option value="Service Provider">Service Provider</option>
                        <option value="Consultant">Consultant</option>
                      </select>
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 16 16"
                        fill="none"
                        style={{
                          position: "absolute",
                          right: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          pointerEvents: "none",
                          color: "#6b7280"
                        }}
                      >
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  {/* Legal Name */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Legal Name <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={legalName}
                      onChange={(e) => setLegalName(e.target.value)}
                      placeholder="Enter legal name"
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        fontSize: "14px",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        backgroundColor: "#ffffff",
                        color: "#111827"
                      }}
                    />
                  </div>

                  {/* PAN Number */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      PAN Number <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={panNumber}
                      onChange={(e) => setPanNumber(e.target.value)}
                      placeholder="Enter PAN number"
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        fontSize: "14px",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        backgroundColor: "#ffffff",
                        color: "#111827"
                      }}
                    />
                  </div>

                  {/* GST Number */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      GST Number (if applicable)
                    </label>
                    <input
                      type="text"
                      value={gstNumber}
                      onChange={(e) => setGstNumber(e.target.value)}
                      placeholder="Enter GST number"
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        fontSize: "14px",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        backgroundColor: "#ffffff",
                        color: "#111827"
                      }}
                    />
                  </div>

                  {/* Bank Account Number */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Bank Account Number <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={bankAccountNumber}
                      onChange={(e) => setBankAccountNumber(e.target.value)}
                      placeholder="Enter account number"
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        fontSize: "14px",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        backgroundColor: "#ffffff",
                        color: "#111827"
                      }}
                    />
                  </div>

                  {/* IFSC Code */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      IFSC Code <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <input
                        type="text"
                        value={ifscCode}
                        onChange={(e) => setIfscCode(e.target.value)}
                        placeholder="Enter IFSC code"
                        style={{
                          flex: 1,
                          padding: "10px 12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          color: "#111827"
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleValidateIFSC}
                        style={{
                          padding: "10px 20px",
                          backgroundColor: "#1e40af",
                          color: "#ffffff",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "14px",
                          fontWeight: "600",
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                          transition: "background-color 0.2s"
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = "#1e3a8a"}
                        onMouseLeave={(e) => e.target.style.backgroundColor = "#1e40af"}
                      >
                        Validate
                      </button>
                    </div>
                  </div>

                  {/* Registered Address */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Registered Address <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <div
                      style={{
                        border: "2px dashed #d1d5db",
                        borderRadius: "8px",
                        padding: "20px",
                        backgroundColor: "#f9fafb",
                        position: "relative",
                        minHeight: "120px"
                      }}
                    >
                      <textarea
                        value={registeredAddress}
                        onChange={(e) => setRegisteredAddress(e.target.value)}
                        placeholder="Enter registered address"
                        rows="4"
                        style={{
                          width: "100%",
                          padding: "12px",
                          fontSize: "14px",
                          border: "none",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          color: "#111827",
                          resize: "vertical",
                          fontFamily: "inherit"
                        }}
                      />
                      <input
                        type="file"
                        id="address-doc-upload"
                        ref={fileInputRefs.addressProof}
                        accept=".pdf,.jpg,.jpeg,.png"
                        multiple
                        onChange={(e) => handleDocumentUpload(e, "addressProof")}
                        style={{ display: "none" }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRefs.addressProof.current?.click()}
                      style={{
                        display: "inline-block",
                        marginTop: "8px",
                        fontSize: "14px",
                        color: "#1e40af",
                        fontWeight: "500",
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                        padding: 0
                      }}
                    >
                      + Add Documents
                    </button>
                    {/* Display uploaded address proof documents */}
                    {uploadedDocuments.addressProof && uploadedDocuments.addressProof.length > 0 && (
                      <div style={{ marginTop: "12px" }}>
                        <div style={{
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#111827",
                          marginBottom: "8px"
                        }}>
                          Uploaded Documents ({uploadedDocuments.addressProof.length})
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {uploadedDocuments.addressProof.map((doc) => (
                            <div
                              key={doc.id}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "10px 12px",
                                backgroundColor: "#f9fafb",
                                borderRadius: "6px",
                                border: "1px solid #e5e7eb"
                              }}
                            >
                              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                                  <path
                                    d="M3 2C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V5L10 2H3Z"
                                    stroke="#6b7280"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <span style={{ fontSize: "14px", color: "#111827" }}>{doc.name}</span>
                              </div>
                              <button
                                onClick={() => handleRemoveDocument("addressProof", doc.id)}
                                style={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                  color: "#ef4444",
                                  cursor: "pointer",
                                  padding: "4px"
                                }}
                              >
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                  <path
                                    d="M12 4L4 12M4 4L12 12"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Panel: Vendor Request Summary */}
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
                  marginBottom: "24px"
                }}>
                  Vendor Request Summary
                </h2>

                {/* Vendor Information Card */}
                <div style={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "20px",
                  marginBottom: "24px"
                }}>
                  <div style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "12px"
                  }}>
                    {defaultVendorData.vendorName}
                  </div>
                  <div style={{
                    display: "flex",
                    gap: "8px",
                    flexWrap: "wrap"
                  }}>
                    <span style={{
                      padding: "4px 12px",
                      backgroundColor: "#fbbf24",
                      color: "#ffffff",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "600"
                    }}>
                      IN REVIEW
                    </span>
                    <span style={{
                      padding: "4px 12px",
                      backgroundColor: "#f97316",
                      color: "#ffffff",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: "600"
                    }}>
                      MEDIUM
                    </span>
                  </div>
                </div>

                {/* Vendor Details */}
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px"
                }}>
                  <div>
                    <div style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      marginBottom: "4px"
                    }}>
                      Vendor Name
                    </div>
                    <div style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#111827"
                    }}>
                      {defaultVendorData.vendorName}
                    </div>
                  </div>

                  <div>
                    <div style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      marginBottom: "4px"
                    }}>
                      Vendor Type
                    </div>
                    <div style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#111827"
                    }}>
                      {defaultVendorData.vendorType}
                    </div>
                  </div>

                  <div>
                    <div style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      marginBottom: "4px"
                    }}>
                      Purpose
                    </div>
                    <div style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "#111827"
                    }}>
                      {defaultVendorData.purpose}
                    </div>
                  </div>

                  <div>
                    <div style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      marginBottom: "8px"
                    }}>
                      Documents
                    </div>
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px"
                    }}>
                      <div
                        onClick={() => handleViewDocuments("panCard")}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "8px 12px",
                          backgroundColor: "#f9fafb",
                          borderRadius: "6px",
                          cursor: "pointer",
                          transition: "background-color 0.2s"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f3f4f6"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f9fafb"}
                      >
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px"
                        }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M3 2C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V5L10 2H3Z"
                              stroke="#6b7280"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span style={{
                            fontSize: "14px",
                            color: "#111827"
                          }}>
                            PAN Card {uploadedDocuments.panCard.length > 0 && `(${uploadedDocuments.panCard.length})`}
                          </span>
                        </div>
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
                      <div
                        onClick={() => handleViewDocuments("bankDetails")}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "8px 12px",
                          backgroundColor: "#f9fafb",
                          borderRadius: "6px",
                          cursor: "pointer",
                          transition: "background-color 0.2s"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f3f4f6"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f9fafb"}
                      >
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px"
                        }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M3 2C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V5L10 2H3Z"
                              stroke="#6b7280"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span style={{
                            fontSize: "14px",
                            color: "#111827"
                          }}>
                            Bank Details {uploadedDocuments.bankDetails.length > 0 && `(${uploadedDocuments.bankDetails.length})`}
                          </span>
                        </div>
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
                      <div
                        onClick={() => handleViewDocuments("gstOthers")}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "8px 12px",
                          backgroundColor: "#f9fafb",
                          borderRadius: "6px",
                          cursor: "pointer",
                          transition: "background-color 0.2s"
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f3f4f6"}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#f9fafb"}
                      >
                        <div style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px"
                        }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                              d="M3 2C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V5L10 2H3Z"
                              stroke="#6b7280"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <span style={{
                            fontSize: "14px",
                            color: "#111827"
                          }}>
                            GST, Others ({uploadedDocuments.gstOthers.length})
                          </span>
                        </div>
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
                    <button
                      type="button"
                      onClick={() => {
                        const allDocs = [...uploadedDocuments.panCard, ...uploadedDocuments.bankDetails, ...uploadedDocuments.gstOthers];
                        setViewDocumentModal({ open: true, category: "all", documents: allDocs });
                      }}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        marginTop: "8px",
                        fontSize: "14px",
                        color: "#1e40af",
                        fontWeight: "500",
                        backgroundColor: "transparent",
                        border: "none",
                        cursor: "pointer",
                        padding: 0
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 11C9.65685 11 11 9.65685 11 8C11 6.34315 9.65685 5 8 5C6.34315 5 5 6.34315 5 8C5 9.65685 6.34315 11 8 11Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 5V8L10 10"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      View All
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "16px",
              marginTop: "32px",
              paddingTop: "24px",
              borderTop: "1px solid #e5e7eb"
            }}>
              <Link
                href="/dashboard"
                style={{
                  padding: "12px 24px",
                  backgroundColor: "#ffffff",
                  color: "#374151",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  textDecoration: "none",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#f9fafb";
                  e.currentTarget.style.borderColor = "#9ca3af";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#ffffff";
                  e.currentTarget.style.borderColor = "#d1d5db";
                }}
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M10 12L6 8L10 4"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Back
              </Link>
              <div style={{
                display: "flex",
                gap: "16px"
              }}>
                <button
                  onClick={handleSaveDraft}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#fbbf24",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background-color 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#f59e0b"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#fbbf24"}
                >
                  Save Draft
                </button>
                <button
                  onClick={handleSubmitForVerification}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "rgb(220, 38, 38)",
                    color: "rgb(255, 255, 255)",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background-color 0.2s"
                  }}
                >
                  Create Vendor
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

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
                {viewDocumentModal.category === "all" && "All Documents"}
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

            {/* Upload Section - Only show if not viewing "all" documents */}
            {viewDocumentModal.category !== "all" && (
              <div style={{ marginBottom: "24px" }}>
                <input
                  type="file"
                  id={`modal-upload-${viewDocumentModal.category}`}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  multiple
                  onChange={(e) => {
                    const files = Array.from(e.target.files);
                    if (files.length > 0 && viewDocumentModal.category) {
                      const fileObjects = files.map(file => ({
                        id: Date.now() + Math.random(),
                        file: file,
                        name: file.name,
                        size: file.size,
                        type: file.type,
                        uploadDate: new Date().toISOString()
                      }));

                      // Update uploaded documents state
                      setUploadedDocuments(prev => ({
                        ...prev,
                        [viewDocumentModal.category]: [...(prev[viewDocumentModal.category] || []), ...fileObjects]
                      }));

                      // Update modal documents
                      setViewDocumentModal(prev => ({
                        ...prev,
                        documents: [...(prev.documents || []), ...fileObjects]
                      }));

                      // Reset input
                      e.target.value = "";
                    }
                  }}
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  onClick={() => document.getElementById(`modal-upload-${viewDocumentModal.category}`)?.click()}
                  style={{
                    width: "100%",
                    padding: "16px",
                    backgroundColor: "#f3f4f6",
                    border: "2px dashed #d1d5db",
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#e5e7eb";
                    e.currentTarget.style.borderColor = "#9ca3af";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#f3f4f6";
                    e.currentTarget.style.borderColor = "#d1d5db";
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 5V19M5 12H19"
                      stroke="#6b7280"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#374151"
                  }}>
                    Click to upload or drag and drop files
                  </span>
                  <span style={{
                    fontSize: "12px",
                    color: "#9ca3af"
                  }}>
                    PDF, JPG, PNG, DOC, DOCX (Max 10MB per file)
                  </span>
                </button>
              </div>
            )}

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
                <p style={{ fontSize: "14px", margin: 0, color: "#9ca3af" }}>
                  Use the upload area above to add documents
                </p>
              </div>
            ) : (
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px"
              }}>
                {viewDocumentModal.documents.map((doc) => (
                  <div
                    key={doc.id}
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
                          {doc.name}
                        </div>
                        <div style={{
                          fontSize: "12px",
                          color: "#6b7280"
                        }}>
                          {formatFileSize(doc.size)} • {new Date(doc.uploadDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div style={{
                      display: "flex",
                      gap: "8px"
                    }}>
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
                      {viewDocumentModal.category !== "all" && (
                        <button
                          onClick={() => {
                            handleRemoveDocument(viewDocumentModal.category, doc.id);
                          }}
                          style={{
                            padding: "8px 16px",
                            backgroundColor: "#dc2626",
                            color: "#ffffff",
                            border: "none",
                            borderRadius: "6px",
                            fontSize: "14px",
                            fontWeight: "500",
                            cursor: "pointer",
                            transition: "background-color 0.2s"
                          }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = "#b91c1c"}
                          onMouseLeave={(e) => e.target.style.backgroundColor = "#dc2626"}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <ToastNotification
        show={showNotification}
        message={notificationMessage}
        type={notificationType}
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
}

