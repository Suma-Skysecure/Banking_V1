"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/agreementExecution.css";
import "@/css/businessApproval.css";

export default function VendorCreation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  // Save documents to localStorage whenever they change
  useEffect(() => {
    if (legalName) {
      localStorage.setItem(`vendorDocuments_${legalName}`, JSON.stringify(uploadedDocuments));
    }
  }, [uploadedDocuments, legalName]);

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
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

  const handleSaveDraft = () => {
    console.log("Saving as draft...");
    // Implement save as draft logic
  };

  const handleSubmitForVerification = () => {
    console.log("Submitting for verification...");
    // Implement submission logic
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
          <button className="header-icon-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 2C11.1046 2 12 2.89543 12 4C12 5.10457 11.1046 6 10 6C8.89543 6 8 5.10457 8 4C8 2.89543 8.89543 2 10 2Z"
                fill="#6b7280"
              />
              <path
                d="M4 8C4 6.89543 6.68629 6 10 6C13.3137 6 16 6.89543 16 8V12C16 13.1046 13.3137 14 10 14C6.68629 14 4 13.1046 4 12V8Z"
                fill="#6b7280"
              />
              <path
                d="M7 14V15C7 16.6569 8.34315 18 10 18C11.6569 18 13 16.6569 13 15V14"
                stroke="#6b7280"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <div className="header-profile" style={{ cursor: "pointer" }}>
            <div className="profile-avatar" style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "600",
              fontSize: "16px"
            }}>
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="profile-info">
              <span className="profile-name">{user?.name || "User"}</span>
              <span className="profile-email">{user?.email || "user@pms.com"}</span>
            </div>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: "8px" }}>
              <path
                d="M4 6L8 10L12 6"
                stroke="#6b7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </header>

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="dashboard-main">
          <div className="main-content">
            <div style={{ marginBottom: "24px" }}>
              <h1 style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#111827",
                marginBottom: "8px"
              }}>
                Vendor Creation for New Branch
              </h1>
              <p style={{
                fontSize: "16px",
                color: "#6b7280"
              }}>
                Fill in the details to create vendor in ERP system for new branch setup.
              </p>
            </div>

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
                          fontFamily: "inherit",
                          marginBottom: "12px"
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => document.getElementById("address-doc-upload")?.click()}
                        style={{
                          padding: "8px 16px",
                          backgroundColor: "#f3f4f6",
                          color: "#374151",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          fontSize: "13px",
                          fontWeight: "500",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px"
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M8 2V14M2 8H14"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Upload Documents
                      </button>
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
                    backgroundColor: "#dc2626",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "background-color 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#b91c1c"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#dc2626"}
                >
                  Submit for Verification
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
    </div>
  );
}

