"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import ToastNotification from "@/components/ToastNotification";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/contexts/NotificationContext";
import "@/css/propertyDetails.css";
import "@/css/branchTracker.css";

export default function PropertyDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const { createNotification } = useNotifications();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [property, setProperty] = useState(null);

  // Helper function to generate default values for missing property fields
  const generateDefaultPropertyFields = (property) => {
    if (!property) return {};
    
    // Extract area number from size string (e.g., "3,500 sq ft" -> 3500)
    const areaMatch = (property.size || property.totalArea || "").match(/[\d,]+/);
    const areaNum = areaMatch ? parseInt(areaMatch[0].replace(/,/g, "")) : 0;
    
    // Generate property ID if missing
    const propertyId = property.propertyId || property.id || `PROP-${Date.now()}`;
    
    // Generate floor level based on property type and area
    const getFloorLevel = () => {
      if (property.floorLevel) return property.floorLevel;
      if (property.type?.toLowerCase().includes("industrial")) {
        return areaNum > 10000 ? "Ground Floor + Warehouse" : "Ground Floor";
      }
      if (property.type?.toLowerCase().includes("retail")) {
        return "Ground Floor";
      }
      if (areaNum > 5000) {
        return "Multiple Floors Available";
      }
      return "Ground Floor + Mezzanine";
    };
    
    // Generate parking spaces based on area
    const getParkingSpaces = () => {
      if (property.parkingSpaces) return property.parkingSpaces;
      const spaces = Math.max(2, Math.floor(areaNum / 500));
      return `${spaces} Reserved Spaces`;
    };
    
    // Generate year built based on property type
    const getYearBuilt = () => {
      if (property.yearBuilt) return property.yearBuilt;
      const currentYear = new Date().getFullYear();
      const baseYear = property.type?.toLowerCase().includes("industrial") ? 2015 : 2018;
      return String(Math.max(baseYear, currentYear - 6));
    };
    
    // Generate vendor name based on property location/name
    const getVendorName = () => {
      if (property.vendorName) return property.vendorName;
      const address = property.address || "";
      if (address.includes("Brickell")) return "Brickell Development Group";
      if (address.includes("Downtown")) return "Downtown Properties LLC";
      if (address.includes("South Beach")) return "South Beach Realty Partners";
      if (address.includes("Westside")) return "Westside Commercial Holdings";
      if (address.includes("North Miami")) return "North Miami Development Corp";
      if (address.includes("Eastside")) return "Eastside Business Ventures";
      return "Miami Commercial Realty Group";
    };
    
    // Generate vendor contact
    const getVendorContact = () => {
      if (property.vendorContact) return property.vendorContact;
      const areaCode = property.address?.match(/FL (\d{5})/)?.[1]?.substring(0, 3) || "305";
      // Generate deterministic contact number based on property ID
      const propIdNum = parseInt(String(property.id || property.propertyId || "0").replace(/\D/g, "")) || 0;
      const lastFour = String((propIdNum % 9000) + 1000).padStart(4, '0');
      return `+1 (${areaCode}) 555-${lastFour}`;
    };
    
    // Generate vendor email based on vendor name
    const getVendorEmail = () => {
      if (property.vendorEmail) return property.vendorEmail;
      const vendorName = getVendorName().toLowerCase().replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");
      return `info@${vendorName}.com`;
    };
    
    // Generate listing status
    const getListingStatus = () => {
      if (property.listingStatus) return property.listingStatus;
      return property.statusType === "available" ? "Active Listing" : "Pending Listing";
    };
    
    // Generate zoning based on property type
    const getZoning = () => {
      if (property.zoning) return property.zoning;
      const type = property.type?.toLowerCase() || "";
      if (type.includes("commercial office")) return "Commercial/Office";
      if (type.includes("retail")) return "Commercial/Retail";
      if (type.includes("industrial")) return "Industrial";
      if (type.includes("mixed use")) return "Mixed Use";
      return "Commercial";
    };
    
    // Generate last inspection date
    const getLastInspection = () => {
      if (property.lastInspection) return property.lastInspection;
      if (property.lastInspectionDate) {
        return new Date(property.lastInspectionDate).toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        });
      }
      const months = ["January", "February", "March", "April", "May", "June", 
                      "July", "August", "September", "October", "November", "December"];
      const currentDate = new Date();
      const inspectionDate = new Date(currentDate);
      inspectionDate.setMonth(currentDate.getMonth() - 2);
      return `${months[inspectionDate.getMonth()]} ${inspectionDate.getDate()}, ${inspectionDate.getFullYear()}`;
    };
    
    return {
      floorLevel: getFloorLevel(),
      parkingSpaces: getParkingSpaces(),
      yearBuilt: getYearBuilt(),
      vendorName: getVendorName(),
      vendorContact: getVendorContact(),
      vendorEmail: getVendorEmail(),
      listingStatus: getListingStatus(),
      zoning: getZoning(),
      lastInspection: getLastInspection(),
    };
  };

  // Default property data - fallback if no imported data
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
    vendorEmail: "info@biscaynedev.com",
    listingStatus: "Active Listing",
    zoning: "Commercial/Retail",
    lastInspection: "December 10, 2024",
  };

  // Load property data from localStorage or use default
  useEffect(() => {
    const isImported = searchParams?.get("isImported") === "true";
    const propertyId = searchParams?.get("propertyId");

    try {
      // Try to get property data from localStorage (works for both imported and regular properties)
      const selectedPropertyData = localStorage.getItem("selectedProperty");
      if (selectedPropertyData) {
        const selectedProperty = JSON.parse(selectedPropertyData);
        
        // Check if this is the property we're looking for
        // Match by propertyId or id, handling both string and number formats
        const propId = selectedProperty.propertyId || selectedProperty.id;
        const searchPropId = propertyId;
        
        // If we have a propertyId in the URL, try to match it
        // If no propertyId in URL, just use the stored property (for backward compatibility)
        if (!searchPropId || (propId && propId.toString() === searchPropId.toString())) {
          // Format the property data to match the expected structure
          let formattedProperty;
          
          // Generate default values for missing fields
          const defaultFields = generateDefaultPropertyFields(selectedProperty);
          
          if (isImported && selectedProperty.isImported) {
            // Format imported property data
            formattedProperty = {
              id: selectedProperty.propertyId || selectedProperty.id,
              name: selectedProperty.name || "",
              address: selectedProperty.address || "",
              status: selectedProperty.status || "Available",
              statusType: selectedProperty.statusType || "pending",
              // Price from Excel is in INR, convert to USD equivalent for consistency
              price: selectedProperty.priceUSD || (selectedProperty.price ? selectedProperty.price / 83.5 : 0),
              // Price per sqft from Excel is already in INR
              pricePerSqft: selectedProperty.pricePerSqft || 0,
              type: selectedProperty.type || "",
              totalArea: selectedProperty.size || `${selectedProperty.totalArea || 0} sq ft`,
              floorLevel: selectedProperty.floorLevel || defaultFields.floorLevel,
              parkingSpaces: selectedProperty.parkingSpaces || defaultFields.parkingSpaces,
              yearBuilt: selectedProperty.yearBuilt || defaultFields.yearBuilt,
              vendorName: selectedProperty.vendorName || defaultFields.vendorName,
              vendorContact: selectedProperty.vendorContact || defaultFields.vendorContact,
              vendorEmail: selectedProperty.vendorEmail || defaultFields.vendorEmail,
              listingStatus: selectedProperty.listingStatus || defaultFields.listingStatus,
              zoning: selectedProperty.zoning || defaultFields.zoning,
              lastInspection: selectedProperty.lastInspectionDate 
                ? new Date(selectedProperty.lastInspectionDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : defaultFields.lastInspection,
              siteInspection: selectedProperty.siteInspection || "",
              dueDiligence: selectedProperty.dueDiligence || "",
              isImported: true,
            };
          } else {
            // Format regular property data
            formattedProperty = {
              id: selectedProperty.id ? `PROP-MIA-2024-${String(selectedProperty.id).padStart(3, '0')}` : `PROP-${Date.now()}`,
              name: selectedProperty.name || "",
              address: selectedProperty.address || "",
              status: selectedProperty.status || "Available",
              statusType: selectedProperty.statusType || "pending",
              // Regular properties have price in USD, keep as is
              price: selectedProperty.price || 0,
              // Regular properties have pricePerSqft in USD
              pricePerSqft: selectedProperty.pricePerSqft || 0,
              type: selectedProperty.type || "",
              totalArea: selectedProperty.size || "",
              floorLevel: selectedProperty.floorLevel || defaultFields.floorLevel,
              parkingSpaces: selectedProperty.parkingSpaces || defaultFields.parkingSpaces,
              yearBuilt: selectedProperty.yearBuilt || defaultFields.yearBuilt,
              vendorName: selectedProperty.vendorName || defaultFields.vendorName,
              vendorContact: selectedProperty.vendorContact || defaultFields.vendorContact,
              vendorEmail: selectedProperty.vendorEmail || defaultFields.vendorEmail,
              listingStatus: selectedProperty.listingStatus || defaultFields.listingStatus,
              zoning: selectedProperty.zoning || defaultFields.zoning,
              lastInspection: selectedProperty.lastInspection || defaultFields.lastInspection,
              siteInspection: selectedProperty.siteInspection || "",
              dueDiligence: selectedProperty.dueDiligence || "",
              isImported: false,
            };
          }
          
          setProperty(formattedProperty);
          return;
        }
      }
    } catch (error) {
      console.error("Error parsing property data:", error);
    }

    // Use default property if no property data found
    setProperty(defaultProperty);
  }, [searchParams]);

  // Get required actions based on property data
  const getRequiredActions = () => {
    if (!property) return [];
    
    const actions = [];
    
    // Site Inspection
    if (property.siteInspection || property.isImported) {
      actions.push({
        id: 1,
        title: "Site Inspection",
        description: property.siteInspection 
          ? property.siteInspection 
          : "Schedule and complete physical site inspection with technical team (Available after business approval).",
        icon: "magnify",
        available: false,
      });
    }
    
    // Due Diligence
    if (property.dueDiligence || property.isImported) {
      actions.push({
        id: 2,
        title: "Due Diligence Review",
        description: property.dueDiligence 
          ? property.dueDiligence 
          : "Complete comprehensive due diligence assessment including financial and structural review (Available after business approval).",
        icon: "document",
        available: false,
      });
    }
    
    // Default actions if no specific actions from Excel
    if (actions.length === 0) {
      actions.push(
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
        }
      );
    }
    
    return actions;
  };

  const requiredActions = getRequiredActions();

  const formatPrice = (price) => {
    if (!price && price !== 0) return "₹0";
    // For imported properties, price is stored as USD equivalent, so convert to INR
    // For regular properties, price is already in USD, so convert to INR
    const inrPrice = price * 83.5;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(inrPrice);
  };

  // Show loading state if property is not loaded yet
  if (!property) {
    return (
      <div className="dashboard-container">
        <div style={{ padding: "40px", textAlign: "center" }}>Loading property details...</div>
      </div>
    );
  }

  return (
    <>
      <ToastNotification
        show={showNotification}
        message="Successfully initiated property for business approval"
        type="success"
        onClose={() => setShowNotification(false)}
        duration={3000}
      />
      <div className="dashboard-container">
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
                  {property.isImported && property.pricePerSqft
                    ? `₹${property.pricePerSqft.toLocaleString('en-IN')} per sq ft`
                    : `₹${(property.pricePerSqft * 83.5).toLocaleString('en-IN')} per sq ft`}
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
                    <span className="info-value">{property.id || "N/A"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Property Type:</span>
                    <span className="info-value">{property.type || "N/A"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Total Area:</span>
                    <span className="info-value">{property.totalArea || "N/A"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Floor Level:</span>
                    <span className="info-value">{property.floorLevel || "N/A"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Parking Spaces:</span>
                    <span className="info-value">{property.parkingSpaces || "N/A"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Year Built:</span>
                    <span className="info-value">{property.yearBuilt || "N/A"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Vendor Name:</span>
                    <span className="info-value">{property.vendorName || "N/A"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Vendor Contact:</span>
                    <span className="info-value">{property.vendorContact || "N/A"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Vendor Email:</span>
                    <span className="info-value">{property.vendorEmail || "N/A"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Listing Status:</span>
                    <span className="info-value">
                      <span className="status-badge active">{property.listingStatus || "N/A"}</span>
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Zoning:</span>
                    <span className="info-value">{property.zoning || "N/A"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Last Inspection:</span>
                    <span className="info-value">{property.lastInspection || "N/A"}</span>
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
                    
                    // Store property data in localStorage for Business Approval, Legal Workflow, and Dashboard
                    if (property) {
                      localStorage.setItem("propertyForBusinessApproval", JSON.stringify(property));
                      // Also store submission timestamp
                      localStorage.setItem("propertySubmissionDate", new Date().toISOString());
                    }
                    
                    // Create notification for business approval - target Business role
                    const notificationMessage = property?.name
                      ? `Property "${property.name}" has been submitted for business approval`
                      : "Property has been submitted for business approval";
                    
                    // Create notification targeted to Business role
                    createNotification(notificationMessage, "info", "/business-approval", "Business");
                    
                    // Show success notification for SRBM users
                    if (user?.role === "SRBM") {
                      setShowNotification(true);
                      // Don't redirect automatically - let user see the notification
                      // They can navigate manually if needed
                    } else {
                      // For other roles, redirect immediately
                      router.push("/business-approval");
                    }
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
    </>
  );
}

