"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import DashboardHeader from "@/components/DashboardHeader";
import ToastNotification from "@/components/ToastNotification";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/contexts/NotificationContext";
import * as XLSX from "xlsx";
import "@/css/pageHeader.css";
import "@/css/branchTracker.css";
import "@/css/propertySearch.css";

export default function PropertySearch() {
  const router = useRouter();
  const { user } = useAuth();
  const { createNotification } = useNotifications();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [selectedProperties, setSelectedProperties] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [importedFiles, setImportedFiles] = useState([]);
  const [importedProperties, setImportedProperties] = useState([]);
  const fileInputRef = useRef(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");
  const [isAddPropertyModalOpen, setIsAddPropertyModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [propertyFormData, setPropertyFormData] = useState({
    propertyId: "",
    name: "",
    area: "",
    addressLine: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    type: "",
    totalArea: "",
    availability: "",
    price: "",
    pricePerSqft: "",
    floorLevel: "",
    parkingSpaces: "",
    yearBuilt: "",
    vendorName: "",
    vendorContact: "",
    vendorEmail: "",
    listingStatus: "",
    zoning: "",
    lastInspection: "",
    requiredActions: "",
    dueDiligence: "",
  });
  
  // Load imported properties from localStorage on component mount
  useEffect(() => {
    try {
      const storedProperties = localStorage.getItem("importedProperties");
      if (storedProperties) {
        const parsedProperties = JSON.parse(storedProperties);
        setImportedProperties(parsedProperties);
      }
    } catch (error) {
      console.error("Error loading imported properties from localStorage:", error);
    }
  }, []);
  
  // Check user roles - BRT can perform actions, SRBM can initiate listing
  const isBRT = user?.role === "BRT";
  const isSRBM = user?.role === "SRBM";
  const canPerformActions = isBRT; // Only BRT can perform actions (import, export, add, delete)
  const canSelectProperties = isBRT || isSRBM; // Both BRT and SRBM can select properties

  // Get file type from extension
  const getFileType = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();
    if (ext === "pdf") return "pdf";
    if (["doc", "docx"].includes(ext)) return "doc";
    if (["xls", "xlsx"].includes(ext)) return "xls";
    if (["ppt", "pptx"].includes(ext)) return "ppt";
    if (["mhtml"].includes(ext)) return "mhtml";
    if (["svg"].includes(ext)) return "svg";
    if (["csv"].includes(ext)) return "csv";
    if (["jpg", "jpeg", "png"].includes(ext)) return "image";
    if (["txt"].includes(ext)) return "txt";
    return "file";
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Handle file selection
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  // Handle drag over
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle drag leave
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Parse Excel file and extract property data
  const parseExcelFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          if (jsonData.length < 2) {
            reject(new Error("Excel file must have at least a header row and one data row"));
            return;
          }

          // Get headers from first row
          const headers = jsonData[0].map(h => h ? h.toString().trim() : "");
          
          // Map headers to expected property fields
          const headerMap = {
            "Property ID": "propertyId",
            "Property Name": "name",
            "Address Line": "addressLine",
            "City": "city",
            "State": "state",
            "Country": "country",
            "Pincode": "pincode",
            "Property Type": "type",
            "Total Area (sq ft)": "totalArea",
            "Availability": "status",
            "Price (INR)": "price",
            "Price Per Sq Ft (INR)": "pricePerSqft",
            "Floor Level": "floorLevel",
            "Parking Spaces": "parkingSpaces",
            "Year Built": "yearBuilt",
            "Vendor Name": "vendorName",
            "Vendor Contact": "vendorContact",
            "Vendor Email": "vendorEmail",
            "Listing Status": "listingStatus",
            "Zoning": "zoning",
            "Last Inspection Date": "lastInspectionDate",
            "Required Action - Site Inspection": "siteInspection",
            "Required Action - Due Diligence": "dueDiligence"
          };

          // Parse data rows
          const properties = [];
          for (let i = 1; i < jsonData.length; i++) {
            const row = jsonData[i];
            if (!row || row.every(cell => !cell || cell.toString().trim() === "")) {
              continue; // Skip empty rows
            }

            const property = { isImported: true };
            
            headers.forEach((header, index) => {
              const mappedKey = headerMap[header];
              if (mappedKey && row[index] !== undefined && row[index] !== null) {
                let value = row[index];
                
                // Convert to appropriate types
                if (mappedKey === "price" || mappedKey === "pricePerSqft") {
                  value = typeof value === "string" 
                    ? parseFloat(value.replace(/[^0-9.]/g, "")) 
                    : parseFloat(value) || 0;
                } else if (mappedKey === "totalArea") {
                  value = typeof value === "string" 
                    ? parseFloat(value.replace(/[^0-9.]/g, "")) 
                    : parseFloat(value) || 0;
                } else {
                  value = value.toString().trim();
                }
                
                property[mappedKey] = value;
              }
            });

            // Build full address
            if (property.addressLine || property.city || property.state) {
              const addressParts = [
                property.addressLine,
                property.city,
                property.state,
                property.country,
                property.pincode
              ].filter(Boolean);
              property.address = addressParts.join(", ");
            }

            // Format total area
            if (property.totalArea) {
              property.size = `${property.totalArea.toLocaleString('en-IN')} sq ft`;
            }

            // Determine status type
            if (property.status) {
              property.statusType = property.status.toLowerCase().includes("available now") 
                ? "available" 
                : "pending";
            }

            // Generate a unique ID if not present
            property.id = property.propertyId || `imported-${Date.now()}-${i}`;
            
            // Convert price from INR to USD equivalent (assuming 83.5 conversion rate)
            if (property.price) {
              property.priceUSD = property.price / 83.5;
            }

            properties.push(property);
          }

          resolve(properties);
        } catch (error) {
          reject(error);
        }
      };

      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsArrayBuffer(file);
    });
  };

  // Process files and auto-submit
  const handleFiles = async (files) => {
    // Filter for Excel files only
    const excelFiles = files.filter(file => {
      const ext = file.name.split(".").pop().toLowerCase();
      return ["xls", "xlsx"].includes(ext);
    });

    if (excelFiles.length === 0) {
      alert("Please upload an Excel file (.xls or .xlsx)");
      return;
    }

    // Limit to maximum 5 files
    if (excelFiles.length > 5) {
      alert("You can upload a maximum of 5 Excel files at a time. Please select up to 5 files.");
      return;
    }

    try {
      // Process all Excel files and collect all properties
      let allNewProperties = [];
      
      for (const file of excelFiles) {
        const properties = await parseExcelFile(file);
        if (properties.length > 0) {
          allNewProperties = [...allNewProperties, ...properties];
        }
      }
      
      if (allNewProperties.length === 0) {
        alert("No property data found in the Excel file(s).");
        return;
      }

      // Append new properties to existing ones (keep previous data)
      setImportedProperties(prevProperties => {
        const updatedProperties = [...prevProperties, ...allNewProperties];
        
        // Store in localStorage for PropertyDetails access
        localStorage.setItem("importedProperties", JSON.stringify(updatedProperties));
        
        return updatedProperties;
      });

      // Show success message and close modal
      const fileCount = excelFiles.length;
      const propertyCount = allNewProperties.length;
      setNotificationMessage(`Successfully imported ${propertyCount} property/properties from ${fileCount} Excel file(s)! Previous data has been preserved.`);
      setShowNotification(true);
      setIsImportModalOpen(false);
      setIsDragging(false);
      setImportedFiles([]);
    } catch (error) {
      console.error("Error parsing Excel file:", error);
      alert(`Error parsing Excel file: ${error.message}`);
    }
  };

  // Submit files (kept for backward compatibility, but Excel parsing is now in handleFiles)
  const handleSubmitFiles = (files) => {
    console.log("Submitting files:", files);
    // This function is now mainly for non-Excel files
    // Excel files are handled directly in handleFiles
  };

  // Handle file delete
  const handleDeleteFile = (fileId) => {
    setImportedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  // Handle upload area click
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // Open import modal
  const handleImportClick = () => {
    setIsImportModalOpen(true);
  };

  // Close import modal
  const handleCloseModal = () => {
    setIsImportModalOpen(false);
    setIsDragging(false);
  };

  // Removed static properties - only showing properties added by BRT

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log("Search filters:", { location, propertyType, priceRange });
  };

  const togglePropertySelection = (propertyId) => {
    setSelectedProperties((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const formatPrice = (price) => {
    const inrPrice = price * 83.5;
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(inrPrice);
  };

  const handleInitiateListing = () => {
    if (selectedProperties.length > 0) {
      console.log("Initiating listing for properties:", selectedProperties);
      
      // Get selected property names for the notification
      const selectedProps = importedProperties.filter(prop => 
        selectedProperties.includes(prop.id)
      );
      const propertyNames = selectedProps.map(prop => prop.name).join(", ");
      const propertyCount = selectedProperties.length;
      
      // Store the first selected property data for Business Approval, Legal Workflow, and Dashboard
      // If multiple properties are selected, we'll use the first one
      if (selectedProps.length > 0) {
        const propertyForApproval = selectedProps[0];
        // Store property data in localStorage for Business Approval, Legal Workflow, and Dashboard
        localStorage.setItem("propertyForBusinessApproval", JSON.stringify(propertyForApproval));
        // Also store submission timestamp
        localStorage.setItem("propertySubmissionDate", new Date().toISOString());
      }
      
      // Create notification for business approval - target Business role
      const notificationMessage = propertyCount === 1
        ? `Property "${propertyNames}" has been initiated for business approval`
        : `${propertyCount} properties have been initiated for business approval`;
      
      // Create notification targeted to Business role
      createNotification(notificationMessage, "info", "/business-approval", "Business");
      
      // Show success notification for SRBM users
      if (user?.role === "SRBM") {
        setNotificationMessage("Successfully initiated property for business approval");
        setShowNotification(true);
        // Don't redirect automatically - let user see the notification
        // They can navigate manually if needed
      } else {
        // For other roles, redirect immediately
        router.push("/business-approval");
      }
    }
  };

  // Handle notification click - navigate to the link if available
  const handleNotificationClick = (notification) => {
    if (notification.link) {
      router.push(notification.link);
    }
  };

  // Handle property deletion
  const handleDeleteProperty = (propertyId) => {
    setPropertyToDelete(propertyId);
    setShowDeleteConfirm(true);
  };

  // Confirm property deletion
  const confirmDeleteProperty = () => {
    if (propertyToDelete) {
      // Get property name for notification
      const property = importedProperties.find(prop => prop.id === propertyToDelete);
      const propertyName = property?.name || "Property";
      
      // Remove from imported properties
      const updatedProperties = importedProperties.filter(prop => prop.id !== propertyToDelete);
      setImportedProperties(updatedProperties);
      
      // Update localStorage
      localStorage.setItem("importedProperties", JSON.stringify(updatedProperties));
      
      // Also remove from selected properties if it was selected
      setSelectedProperties(prev => prev.filter(id => id !== propertyToDelete));
      
      // Show success notification
      setNotificationMessage(`Property "${propertyName}" deleted successfully`);
      setShowNotification(true);
    }
    setShowDeleteConfirm(false);
    setPropertyToDelete(null);
  };

  // Cancel property deletion
  const cancelDeleteProperty = () => {
    setShowDeleteConfirm(false);
    setPropertyToDelete(null);
  };

  // Handle property form input changes
  const handlePropertyFormChange = (e) => {
    const { name, value } = e.target;
    setPropertyFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle add property form submission
  const handleAddPropertySubmit = (e) => {
    e.preventDefault();
    
    // Generate a unique ID for the new property
    const newPropertyId = Date.now();
    
    // Determine statusType based on availability
    const statusType = propertyFormData.availability === "Available Now" ? "available" : "pending";
    
    // Format size for display
    const formattedSize = propertyFormData.totalArea 
      ? `${parseFloat(propertyFormData.totalArea).toLocaleString('en-IN')} sq ft`
      : propertyFormData.totalArea || "";

    // Calculate price and pricePerSqft
    const price = propertyFormData.price ? parseFloat(propertyFormData.price) : 0;
    const totalAreaNum = propertyFormData.totalArea ? parseFloat(propertyFormData.totalArea) : 0;
    const calculatedPricePerSqft = totalAreaNum > 0 && price > 0 
      ? price / totalAreaNum 
      : 0;
    const pricePerSqft = propertyFormData.pricePerSqft 
      ? parseFloat(propertyFormData.pricePerSqft) 
      : calculatedPricePerSqft;

    // Create property object
    const newProperty = {
      id: newPropertyId,
      propertyId: propertyFormData.propertyId || `PROP-${newPropertyId}`,
      name: propertyFormData.name || propertyFormData.propertyId || `Property ${newPropertyId}`, // Ensure name is always set
      area: propertyFormData.area,
      addressLine: propertyFormData.addressLine,
      city: propertyFormData.city,
      state: propertyFormData.state,
      country: propertyFormData.country,
      pincode: propertyFormData.pincode,
      type: propertyFormData.type,
      totalArea: propertyFormData.totalArea,
      size: formattedSize, // For display in property card
      availability: propertyFormData.availability,
      status: propertyFormData.availability,
      statusType: statusType, // For styling in property card
      price: price,
      pricePerSqft: pricePerSqft,
      floorLevel: propertyFormData.floorLevel,
      parkingSpaces: propertyFormData.parkingSpaces,
      yearBuilt: propertyFormData.yearBuilt,
      vendorName: propertyFormData.vendorName,
      vendorContact: propertyFormData.vendorContact,
      vendorEmail: propertyFormData.vendorEmail,
      listingStatus: propertyFormData.listingStatus,
      zoning: propertyFormData.zoning,
      lastInspection: propertyFormData.lastInspection,
      requiredActions: propertyFormData.requiredActions,
      dueDiligence: propertyFormData.dueDiligence,
      address: `${propertyFormData.addressLine}, ${propertyFormData.city}, ${propertyFormData.state} ${propertyFormData.pincode}`,
      isImported: false,
      createdAt: new Date().toISOString(),
    };

    // Add to imported properties (or create a new properties list)
    const updatedProperties = [...importedProperties, newProperty];
    setImportedProperties(updatedProperties);
    
    // Save to localStorage
    localStorage.setItem("importedProperties", JSON.stringify(updatedProperties));

    // Reset form
    setPropertyFormData({
      propertyId: "",
      name: "",
      area: "",
      addressLine: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      type: "",
      totalArea: "",
      availability: "",
      price: "",
      pricePerSqft: "",
      floorLevel: "",
      parkingSpaces: "",
      yearBuilt: "",
      vendorName: "",
      vendorContact: "",
      vendorEmail: "",
      listingStatus: "",
      zoning: "",
      lastInspection: "",
      requiredActions: "",
      dueDiligence: "",
    });

    // Close modal
    setIsAddPropertyModalOpen(false);

    // Show success notification
    setNotificationMessage(`Property "${newProperty.name}" added successfully`);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  // Export selected properties to Excel
  const handleExportProperties = () => {
    if (selectedProperties.length === 0) {
      setNotificationMessage("Please select at least one property to export.");
      setNotificationType("error");
      setShowNotification(true);
      return;
    }

    // Get all properties (regular + imported)
    // Filter selected properties (only from BRT-added properties)
    const selectedProps = importedProperties.filter(prop => 
      selectedProperties.includes(prop.id)
    );

    if (selectedProps.length === 0) {
      setNotificationMessage("No properties found to export.");
      setNotificationType("error");
      setShowNotification(true);
      return;
    }

    // Prepare data in the import format
    const exportData = selectedProps.map(prop => {
      // Parse address components
      let addressLine = "";
      let city = "";
      let state = "";
      let country = "";
      let pincode = "";

      if (prop.address) {
        const addressParts = prop.address.split(",").map(part => part.trim());
        addressLine = addressParts[0] || "";
        
        if (addressParts.length > 1) {
          city = addressParts[1] || "";
        }
        
        // Handle state and zip code (format: "FL 33131" or "State, Country, Pincode")
        if (addressParts.length > 2) {
          const stateZipPart = addressParts[2];
          // Try to extract state and zip (e.g., "FL 33131")
          const stateZipMatch = stateZipPart.match(/^([A-Z]{2})\s+(\d{5}(?:-\d{4})?)$/);
          if (stateZipMatch) {
            state = stateZipMatch[1];
            pincode = stateZipMatch[2];
          } else {
            // If no zip, just use as state
            state = stateZipPart;
          }
        }
        
        if (addressParts.length > 3) {
          country = addressParts[3] || "";
        }
        
        if (addressParts.length > 4) {
          pincode = addressParts[4] || pincode;
        }
      }

      // For imported properties, use existing data
      if (prop.isImported) {
        // For imported properties, price is already in INR (original from Excel)
        // If priceUSD exists, it means we converted it, so we need to convert back
        // Otherwise, use the original price directly
        const priceInINR = prop.price 
          ? (prop.priceUSD ? prop.priceUSD * 83.5 : prop.price)
          : "";
        
        return {
          "Property ID": prop.propertyId || prop.id || "",
          "Property Name": prop.name || "",
          "Address Line": prop.addressLine || addressLine,
          "City": prop.city || city,
          "State": prop.state || state,
          "Country": prop.country || country,
          "Pincode": prop.pincode || pincode,
          "Property Type": prop.type || "",
          "Total Area (sq ft)": prop.totalArea || (prop.size ? parseFloat(prop.size.replace(/[^0-9.]/g, "")) : ""),
          "Availability": prop.status || "",
          "Price (INR)": priceInINR,
          "Price Per Sq Ft (INR)": prop.pricePerSqft || "",
          "Floor Level": prop.floorLevel || "",
          "Parking Spaces": prop.parkingSpaces || "",
          "Year Built": prop.yearBuilt || "",
          "Vendor Name": prop.vendorName || "",
          "Vendor Contact": prop.vendorContact || "",
          "Vendor Email": prop.vendorEmail || "",
          "Listing Status": prop.listingStatus || "",
          "Zoning": prop.zoning || "",
          "Last Inspection Date": prop.lastInspectionDate || "",
          "Required Action - Site Inspection": prop.siteInspection || "",
          "Required Action - Due Diligence": prop.dueDiligence || "",
        };
      }

      // For regular properties, convert and format data
      const totalArea = prop.size ? parseFloat(prop.size.replace(/[^0-9.]/g, "")) : "";
      const priceInINR = prop.price ? prop.price * 83.5 : "";
      const pricePerSqftInINR = prop.pricePerSqft ? prop.pricePerSqft * 83.5 : "";

      return {
        "Property ID": `PROP-${prop.id}`,
        "Property Name": prop.name || "",
        "Address Line": addressLine,
        "City": city,
        "State": state,
        "Country": country,
        "Pincode": pincode,
        "Property Type": prop.type || "",
        "Total Area (sq ft)": totalArea,
        "Availability": prop.status || "",
        "Price (INR)": priceInINR,
        "Price Per Sq Ft (INR)": pricePerSqftInINR,
        "Floor Level": "",
        "Parking Spaces": "",
        "Year Built": "",
        "Vendor Name": "",
        "Vendor Contact": "",
        "Vendor Email": "",
        "Listing Status": "",
        "Zoning": "",
        "Last Inspection Date": "",
        "Required Action - Site Inspection": "",
        "Required Action - Due Diligence": "",
      };
    });

    // Create workbook and worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Properties");

    // Generate Excel file and download
    const fileName = `Properties_Export_${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(workbook, fileName);

    // Show success toast notification
    setNotificationMessage(`Successfully exported ${selectedProps.length} property/properties to Excel!`);
    setNotificationType("success");
    setShowNotification(true);
  };

  return (
    <>
      <ToastNotification
        show={showNotification}
        message={notificationMessage || "Successfully initiated property for business approval"}
        type={notificationType}
        onClose={() => setShowNotification(false)}
        duration={3000}
      />
      <div className="dashboard-container">
      <DashboardHeader 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen}
      />

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content Area */}
        <main className="dashboard-main">
          <div className="main-content">
            <PageHeader
              title="Property Search"
              subtitle="Search and select properties based on business requirements."
            />
            
            {/* Property Search Content */}
            <div className="property-search-content">
              {/* Search Filters Section */}
              <section className="search-filters-section">
                <div className="section-header">
                  <h2 className="section-title">Search Filters</h2>
                  <p className="section-subtitle">
                    Apply filters to find properties matching business requirements
                  </p>
                </div>
                <form onSubmit={handleSearch} className="filters-form">
                  <div className="filters-row">
                    <div className="filter-group">
                      <label htmlFor="location" className="filter-label">
                        Location
                      </label>
                      <select
                        id="location"
                        className="filter-select"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        disabled={!canPerformActions}
                      >
                        <option value="">Select Location</option>
                        <option value="miami">Miami, FL</option>
                        <option value="new-york">New York, NY</option>
                        <option value="san-francisco">San Francisco, CA</option>
                        <option value="chicago">Chicago, IL</option>
                        <option value="boston">Boston, MA</option>
                        <option value="seattle">Seattle, WA</option>
                        <option value="los-angeles">Los Angeles, CA</option>
                      </select>
                    </div>
                    <div className="filter-group">
                      <label htmlFor="property-type" className="filter-label">
                        Property Type
                      </label>
                      <select
                        id="property-type"
                        className="filter-select"
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                        disabled={!canPerformActions}
                      >
                        <option value="all">All Types</option>
                        <option value="commercial-office">Commercial Office</option>
                        <option value="retail">Retail</option>
                        <option value="industrial">Industrial</option>
                        <option value="mixed-use">Mixed Use</option>
                      </select>
                    </div>
                    <div className="filter-group">
                      <label htmlFor="price-range" className="filter-label">
                        Price Range
                      </label>
                      <select
                        id="price-range"
                        className="filter-select"
                        value={priceRange}
                        onChange={(e) => setPriceRange(e.target.value)}
                        disabled={!canPerformActions}
                      >
                        <option value="all">All Prices</option>
                        <option value="0-2m">₹0 - ₹16.7 Cr</option>
                        <option value="2m-5m">₹16.7 Cr - ₹41.75 Cr</option>
                        <option value="5m-10m">₹41.75 Cr - ₹83.5 Cr</option>
                        <option value="10m+">₹83.5 Cr+</option>
                      </select>
                    </div>
                    <button 
                      type="submit" 
                      className="search-button"
                      disabled={!canPerformActions}
                      title={!canPerformActions ? "Only BRT can initiate property search" : ""}
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="search-icon"
                      >
                        <path
                          d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19 19L14.65 14.65"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Search Properties
                    </button>
                  </div>
                </form>
              </section>

              {/* Available Properties Section */}
              <section className="available-properties-section">
                <div className="section-header-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div className="section-header">
                    <h2 className="section-title">Available Properties</h2>
                    <p className="section-subtitle">
                      Properties matching your search criteria
                    </p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1, gap: "12px" }}>
                    {isBRT && (
                      <button
                        onClick={handleImportClick}
                        title="Import properties from Excel"
                        style={{
                          padding: "10px 24px",
                          backgroundColor: "#f97316",
                          color: "#ffffff",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "14px",
                          fontWeight: "600",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          transition: "background-color 0.2s",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "#ea580c";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "#f97316";
                        }}
                      >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M8 2V10M4 6L8 2L12 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2 12V13C2 14.1046 2.89543 15 4 15H12C13.1046 15 14 14.1046 14 13V12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      Import
                    </button>
                    )}
                    {isBRT && (
                      <button
                        onClick={handleExportProperties}
                        disabled={selectedProperties.length === 0}
                        title={selectedProperties.length === 0 ? "Please select properties to export" : ""}
                      style={{
                        padding: "10px 24px",
                        backgroundColor: selectedProperties.length === 0 ? "#9ca3af" : "#3b82f6",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: selectedProperties.length === 0 ? "not-allowed" : "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        transition: "background-color 0.2s",
                        opacity: selectedProperties.length === 0 ? 0.6 : 1,
                      }}
                      onMouseOver={(e) => {
                        if (selectedProperties.length > 0) {
                          e.target.style.backgroundColor = "#2563eb";
                        }
                      }}
                      onMouseOut={(e) => {
                        if (selectedProperties.length > 0) {
                          e.target.style.backgroundColor = "#3b82f6";
                        }
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M8 10V2M4 6L8 2L12 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2 12V13C2 14.1046 2.89543 15 4 15H12C13.1046 15 14 14.1046 14 13V12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      Export
                    </button>
                    )}
                    {isBRT && (
                      <button
                        onClick={() => {
                          setIsAddPropertyModalOpen(true);
                        }}
                        style={{
                          padding: "10px 24px",
                          backgroundColor: "#3b82f6",
                          color: "#ffffff",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "14px",
                          fontWeight: "600",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          transition: "background-color 0.2s",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "#2563eb";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "#3b82f6";
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 3V13M3 8H13"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Add Property
                      </button>
                    )}
                  </div>
                  <div className="properties-summary">
                    <span className="properties-count">{importedProperties.length} Properties Found</span>
                    {isSRBM && (
                      <button
                        className="initiate-button"
                        onClick={handleInitiateListing}
                        disabled={selectedProperties.length === 0}
                        title={selectedProperties.length === 0 ? "Please select properties" : ""}
                        style={{
                          opacity: selectedProperties.length === 0 ? 0.5 : 1,
                          cursor: selectedProperties.length === 0 ? "not-allowed" : "pointer"
                        }}
                      >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        className="checkbox-icon"
                      >
                        <path
                          d="M16 2H4C2.89543 2 2 2.89543 2 4V16C2 17.1046 2.89543 18 4 18H16C17.1046 18 18 17.1046 18 16V4C18 2.89543 17.1046 2 16 2Z"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7 10L9 12L13 8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Initiate Property Listing for Business Approval
                    </button>
                    )}
                  </div>
                </div>

                <div className="properties-list">
                  {/* Combine regular properties and imported properties */}
                  {importedProperties.map((property) => (
                    <div key={property.id} className="property-card">
                      <div className="property-card-left">
                        <input
                          type="checkbox"
                          id={`property-${property.id}`}
                          className="property-checkbox"
                          checked={selectedProperties.includes(property.id)}
                          onChange={() => togglePropertySelection(property.id)}
                          disabled={!canSelectProperties}
                          title={!canSelectProperties ? "Please login to select properties" : ""}
                        />
                        <div className="property-info">
                          <h3 className="property-name">{property.name}</h3>
                          <div className="property-address">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              className="map-pin-icon"
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
                          <div className="property-details">
                            <span className="property-detail-item">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="detail-icon"
                              >
                                <path
                                  d="M2 4H14V12H2V4Z"
                                  stroke="#6b7280"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M6 4V12M10 4V12"
                                  stroke="#6b7280"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                              </svg>
                              {property.type}
                            </span>
                            <span className="property-detail-item">
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="detail-icon"
                              >
                                <path
                                  d="M2 2V14H14"
                                  stroke="#6b7280"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M6 6H14M6 10H14"
                                  stroke="#6b7280"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                              </svg>
                              {property.size}
                            </span>
                            <span className={`property-detail-item ${property.statusType === "available" ? "available" : "pending"}`}>
                              {property.statusType === "available" ? (
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  className="detail-icon"
                                >
                                  <path
                                    d="M13 4L6 11L3 8"
                                    stroke="#10b981"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  width="16"
                                  height="16"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  className="detail-icon"
                                >
                                  <circle
                                    cx="8"
                                    cy="8"
                                    r="6"
                                    stroke="#f59e0b"
                                    strokeWidth="1.5"
                                  />
                                  <path
                                    d="M8 4V8L10 10"
                                    stroke="#f59e0b"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                  />
                                </svg>
                              )}
                              {property.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="property-card-right">
                          <div className="property-pricing">
                          <div className="property-price">
                            {property.isImported && property.price 
                              ? formatPrice(property.priceUSD || property.price / 83.5)
                              : property.price 
                                ? `₹${parseFloat(property.price).toLocaleString('en-IN')}`
                                : "₹0"}
                          </div>
                          <div className="property-price-per-sqft">
                            {property.isImported && property.pricePerSqft
                              ? `₹${property.pricePerSqft.toLocaleString('en-IN')}/sq ft`
                              : property.pricePerSqft && property.pricePerSqft > 0
                                ? `₹${parseFloat(property.pricePerSqft).toLocaleString('en-IN')}/sq ft`
                                : property.totalArea && property.price
                                  ? `₹${Math.round(property.price / parseFloat(property.totalArea)).toLocaleString('en-IN')}/sq ft`
                                  : ""}
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          {false ? (
                            <div
                              className="view-details-button"
                              style={{ 
                                opacity: 0.5, 
                                cursor: "not-allowed",
                                pointerEvents: "none"
                              }}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="eye-icon"
                              >
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
                              View Property Details
                            </div>
                          ) : (
                            <Link
                              href={`/property-details?propertyId=${property.id}&isImported=${property.isImported ? 'true' : 'false'}`}
                              className="view-details-button"
                              onClick={() => {
                                // Store the selected property data in localStorage for PropertyDetails
                                // Store all property data (both imported and regular) so PropertyDetails can access it
                                localStorage.setItem("selectedProperty", JSON.stringify(property));
                              }}
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                className="eye-icon"
                              >
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
                              View Property Details
                            </Link>
                          )}
                          {canPerformActions && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleDeleteProperty(property.id);
                              }}
                              style={{
                                padding: "8px",
                                backgroundColor: "transparent",
                                color: "#ef4444",
                                border: "1px solid #ef4444",
                                borderRadius: "6px",
                                cursor: "pointer",
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.2s",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.backgroundColor = "#ef4444";
                                e.target.style.color = "#ffffff";
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.backgroundColor = "transparent";
                                e.target.style.color = "#ef4444";
                              }}
                              title="Delete Property"
                            >
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M2 4H14M12.6667 4V13.3333C12.6667 14 12 14.6667 11.3333 14.6667H4.66667C4 14.6667 3.33333 14 3.33333 13.3333V4M5.33333 4V2.66667C5.33333 2 6 1.33333 6.66667 1.33333H9.33333C10 1.33333 10.6667 2 10.6667 2.66667V4"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M6.66667 7.33333V11.3333M9.33333 7.33333V11.3333"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>

      {/* Import Modal */}
      {isImportModalOpen && (
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
          onClick={handleCloseModal}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              padding: "24px",
              width: "90%",
              maxWidth: "600px",
              maxHeight: "80vh",
              overflow: "auto",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#1e3a8a",
                margin: "0 0 24px 0",
                textAlign: "center",
              }}
            >
              Upload Document
            </h2>

            <input
              ref={fileInputRef}
              type="file"
              accept=".xls,.xlsx"
              multiple
              onChange={handleFileSelect}
              style={{ display: "none" }}
            />

            <div
              onClick={handleUploadClick}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              style={{
                border: `2px dashed ${isDragging ? "#3b82f6" : "#93c5fd"}`,
                borderRadius: "8px",
                padding: "60px 40px",
                textAlign: "center",
                cursor: "pointer",
                backgroundColor: isDragging ? "#eff6ff" : "#ffffff",
                transition: "all 0.2s",
                marginBottom: "24px",
                minHeight: "300px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                style={{ margin: "0 auto 20px", color: "#3b82f6" }}
              >
                <path
                  d="M12 4V16M8 8L12 4L16 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4 18H20"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <rect
                  x="2"
                  y="18"
                  width="20"
                  height="4"
                  rx="1"
                  fill="currentColor"
                  opacity="0.3"
                />
              </svg>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "12px",
                }}
              >
                Drag & drop files here
              </div>
              <div style={{ fontSize: "14px", color: "#6b7280", marginBottom: "24px" }}>
                Upload Excel files (.xls, .xlsx) with property data
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleUploadClick();
                }}
                style={{
                  padding: "10px 24px",
                  backgroundColor: "#3b82f6",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#2563eb")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#3b82f6")}
              >
                Browse Files
              </button>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "24px",
              }}
            >
              <button
                onClick={handleCloseModal}
                style={{
                  padding: "10px 24px",
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) => (e.target.style.backgroundColor = "#e5e7eb")}
                onMouseOut={(e) => (e.target.style.backgroundColor = "#f3f4f6")}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Property Modal */}
      {isAddPropertyModalOpen && (
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
            padding: "20px",
          }}
          onClick={() => setIsAddPropertyModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              width: "90%",
              maxWidth: "900px",
              maxHeight: "90vh",
              overflow: "auto",
              padding: "24px",
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
              <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#1e3a8a", margin: 0 }}>
                Add New Property
              </h2>
              <button
                onClick={() => setIsAddPropertyModalOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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

            <form onSubmit={handleAddPropertySubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>
                    Property Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={propertyFormData.name}
                    onChange={handlePropertyFormChange}
                    required
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>
                    Property ID
                  </label>
                  <input
                    type="text"
                    name="propertyId"
                    value={propertyFormData.propertyId}
                    onChange={handlePropertyFormChange}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>
                    Area *
                  </label>
                  <input
                    type="text"
                    name="area"
                    value={propertyFormData.area}
                    onChange={handlePropertyFormChange}
                    required
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={propertyFormData.city}
                    onChange={handlePropertyFormChange}
                    required
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>
                    Address Line *
                  </label>
                  <input
                    type="text"
                    name="addressLine"
                    value={propertyFormData.addressLine}
                    onChange={handlePropertyFormChange}
                    required
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={propertyFormData.state}
                    onChange={handlePropertyFormChange}
                    required
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={propertyFormData.country}
                    onChange={handlePropertyFormChange}
                    required
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={propertyFormData.pincode}
                    onChange={handlePropertyFormChange}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>
                    Property Type *
                  </label>
                  <select
                    name="type"
                    value={propertyFormData.type}
                    onChange={handlePropertyFormChange}
                    required
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  >
                    <option value="">Select Type</option>
                    <option value="Commercial Office">Commercial Office</option>
                    <option value="Retail">Retail</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Mixed Use">Mixed Use</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>
                    Total Area (sq ft) *
                  </label>
                  <input
                    type="text"
                    name="totalArea"
                    value={propertyFormData.totalArea}
                    onChange={handlePropertyFormChange}
                    required
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>
                    Availability *
                  </label>
                  <select
                    name="availability"
                    value={propertyFormData.availability}
                    onChange={handlePropertyFormChange}
                    required
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  >
                    <option value="">Select Availability</option>
                    <option value="Available Now">Available Now</option>
                    <option value="Available in 30 days">Available in 30 days</option>
                    <option value="Available in 45 days">Available in 45 days</option>
                    <option value="Available in 60 days">Available in 60 days</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>
                    Price (INR) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={propertyFormData.price}
                    onChange={handlePropertyFormChange}
                    required
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>
                    Price Per Sq Ft (INR)
                  </label>
                  <input
                    type="number"
                    name="pricePerSqft"
                    value={propertyFormData.pricePerSqft}
                    onChange={handlePropertyFormChange}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>
                    Floor Level
                  </label>
                  <input
                    type="text"
                    name="floorLevel"
                    value={propertyFormData.floorLevel}
                    onChange={handlePropertyFormChange}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>
                    Parking Spaces
                  </label>
                  <input
                    type="text"
                    name="parkingSpaces"
                    value={propertyFormData.parkingSpaces}
                    onChange={handlePropertyFormChange}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>
                    Year Built
                  </label>
                  <input
                    type="text"
                    name="yearBuilt"
                    value={propertyFormData.yearBuilt}
                    onChange={handlePropertyFormChange}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>
                    Vendor Name
                  </label>
                  <input
                    type="text"
                    name="vendorName"
                    value={propertyFormData.vendorName}
                    onChange={handlePropertyFormChange}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>
                    Vendor Contact
                  </label>
                  <input
                    type="text"
                    name="vendorContact"
                    value={propertyFormData.vendorContact}
                    onChange={handlePropertyFormChange}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>
                    Vendor Email
                  </label>
                  <input
                    type="email"
                    name="vendorEmail"
                    value={propertyFormData.vendorEmail}
                    onChange={handlePropertyFormChange}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>
                    Listing Status
                  </label>
                  <input
                    type="text"
                    name="listingStatus"
                    value={propertyFormData.listingStatus}
                    onChange={handlePropertyFormChange}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>
                    Zoning
                  </label>
                  <input
                    type="text"
                    name="zoning"
                    value={propertyFormData.zoning}
                    onChange={handlePropertyFormChange}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>
                    Last Inspection
                  </label>
                  <input
                    type="date"
                    name="lastInspection"
                    value={propertyFormData.lastInspection}
                    onChange={handlePropertyFormChange}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "14px",
                    }}
                  />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>
                    Required Actions
                  </label>
                  <textarea
                    name="requiredActions"
                    value={propertyFormData.requiredActions}
                    onChange={handlePropertyFormChange}
                    rows={3}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "14px",
                      resize: "vertical",
                    }}
                  />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#6b7280", marginBottom: "4px" }}>
                    Required Action - Due Diligence
                  </label>
                  <textarea
                    name="dueDiligence"
                    value={propertyFormData.dueDiligence}
                    onChange={handlePropertyFormChange}
                    rows={3}
                    style={{
                      width: "100%",
                      padding: "8px 12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      fontSize: "14px",
                      resize: "vertical",
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px", gap: "12px" }}>
                <button
                  type="button"
                  onClick={() => setIsAddPropertyModalOpen(false)}
                  style={{
                    padding: "10px 24px",
                    backgroundColor: "#6b7280",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "10px 24px",
                    backgroundColor: "#3b82f6",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "14px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Add Property
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
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
          onClick={cancelDeleteProperty}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
              padding: "24px",
              maxWidth: "400px",
              width: "90%",
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ marginBottom: "20px" }}>
              <h3
                style={{
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: "8px",
                }}
              >
                Confirm Delete
              </h3>
              <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
                Are you sure you want to delete this property?
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button
                onClick={cancelDeleteProperty}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#e5e7eb";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#f3f4f6";
                }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteProperty}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#dc2626",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#b91c1c";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#dc2626";
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

