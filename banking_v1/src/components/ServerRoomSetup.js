"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/agreementExecution.css";
import "@/css/businessApproval.css";

export default function ServerRoomSetup() {
  const router = useRouter();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Form state
  const [hoItContactPerson, setHoItContactPerson] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [coordinationMeetingDate, setCoordinationMeetingDate] = useState("");
  const [hoApprovalStatus, setHoApprovalStatus] = useState("");
  const [approvalReferenceNumber, setApprovalReferenceNumber] = useState("");
  const [hoCoordinationNotes, setHoCoordinationNotes] = useState("");

  // Server Room Specifications state
  const [roomDimensions, setRoomDimensions] = useState("");
  const [coolingSystemType, setCoolingSystemType] = useState("");
  const [powerCapacity, setPowerCapacity] = useState("");
  const [upsBackupDuration, setUpsBackupDuration] = useState("");
  const [fireSuppressionSystem, setFireSuppressionSystem] = useState("");
  const [accessControlSystem, setAccessControlSystem] = useState("");
  const [raisedFloorHeight, setRaisedFloorHeight] = useState("");
  const [cableManagementType, setCableManagementType] = useState("");
  const [environmentalMonitoring, setEnvironmentalMonitoring] = useState({
    temperatureMonitoring: false,
    humidityMonitoring: false,
    waterLeakDetection: false,
    smokeDetection: false
  });

  const handleEnvironmentalMonitoringChange = (key) => {
    setEnvironmentalMonitoring(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // IT Infrastructure Requirements state
  const [numberOfServerRacks, setNumberOfServerRacks] = useState("");
  const [physicalServers, setPhysicalServers] = useState("");
  const [storageArrays, setStorageArrays] = useState("");
  const [coreSwitches, setCoreSwitches] = useState("");
  const [routers, setRouters] = useState("");
  const [firewalls, setFirewalls] = useState("");
  const [upsUnits, setUpsUnits] = useState("");
  const [pduUnits, setPduUnits] = useState("");
  const [generator, setGenerator] = useState("");
  const [networkBandwidth, setNetworkBandwidth] = useState("");
  const [redundancyLevel, setRedundancyLevel] = useState("");
  const [additionalInfrastructureNotes, setAdditionalInfrastructureNotes] = useState("");

  // Implementation Timeline state
  const [planningStartDate, setPlanningStartDate] = useState("");
  const [constructionStartDate, setConstructionStartDate] = useState("");
  const [equipmentDeliveryDate, setEquipmentDeliveryDate] = useState("");
  const [goLiveDate, setGoLiveDate] = useState("");

  // Documentation Upload state
  const [serverRoomLayoutPlan, setServerRoomLayoutPlan] = useState(null);
  const [technicalSpecificationsDoc, setTechnicalSpecificationsDoc] = useState(null);
  const [hoApprovalDocumentation, setHoApprovalDocumentation] = useState(null);
  const [vendorQuotations, setVendorQuotations] = useState(null);

  const handleFileUpload = (setter, e) => {
    const file = e.target.files[0];
    setter(file);
    console.log("File uploaded:", file?.name);
  };

  // Final Confirmation state
  const [verificationChecklist, setVerificationChecklist] = useState({
    hoCoordinationCompleted: false,
    serverRoomSpecsFinalized: false,
    infrastructureRequirementsConfirmed: false,
    timelineAgreed: false,
    documentationUploaded: false,
    budgetApproved: false
  });
  const [confirmationNotes, setConfirmationNotes] = useState("");

  const handleChecklistChange = (key) => {
    setVerificationChecklist(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSaveAsDraft = () => {
    console.log("Saving as draft...");
    // Implement save as draft logic
  };

  const handleConfirmAndSubmit = () => {
    console.log("Confirming and submitting server room setup...", {
      verificationChecklist,
      confirmationNotes
    });
    // Navigate to IT Link-up Confirmation page
    router.push("/it-linkup-confirmation");
  };

  const handleSubmit = () => {
    console.log("Submitting server room setup...", {
      hoItContactPerson,
      contactEmail,
      contactPhone,
      coordinationMeetingDate,
      hoApprovalStatus,
      approvalReferenceNumber,
      hoCoordinationNotes
    });
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
              CR
            </div>
            <div className="profile-info">
              <span className="profile-name">Carlos Rodriguez</span>
              <span className="profile-email">it-coordinator@pms.com</span>
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
                Server Room Setup - Head Office Coordination
              </h1>
              <p style={{
                fontSize: "16px",
                color: "#6b7280"
              }}>
                Configure IT infrastructure and server room requirements
              </p>
            </div>

            {/* Back to Project Execution Link */}
            <Link href="/delivery-status-update" className="back-to-property-details">
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
              Back to Project Execution
            </Link>

            {/* Project Overview Card */}
            <div className="property-overview-card" style={{ marginTop: "24px" }}>
              <div className="property-overview-left">
                <h2 className="property-name-large" style={{ color: "#1e3a8a" }}>
                  Downtown Arts Plaza - Server Room Setup
                </h2>
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
                  <span>1450 Biscayne Boulevard, Miami, FL 33132</span>
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginTop: "12px",
                  flexWrap: "wrap"
                }}>
                  <span style={{
                    padding: "6px 12px",
                    backgroundColor: "#dbeafe",
                    color: "#1e40af",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M4 2C3.44772 2 3 2.44772 3 3V13C3 13.5523 3.44772 14 4 14H12C12.5523 14 13 13.5523 13 13V5L9 2H4Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    IT Infrastructure Planning
                  </span>
                  <span style={{
                    fontSize: "14px",
                    color: "#6b7280"
                  }}>
                    Setup ID: SR-2025-001-HO-DTP
                  </span>
                </div>
              </div>
              <div className="property-overview-right">
                <div style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  marginBottom: "4px"
                }}>
                  Estimated Budget
                </div>
                <div style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  color: "#1e3a8a",
                  marginBottom: "4px"
                }}>
                  $45,000
                </div>
              </div>
            </div>

            {/* Head Office Coordination Form Section */}
            <div style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              marginTop: "24px"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "24px"
              }}>
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 4C2 2.89543 2.89543 2 4 2H12C13.1046 2 14 2.89543 14 4V12C14 13.1046 13.1046 14 12 14H4C2.89543 14 2 13.1046 2 12V4Z"
                    stroke="#1e40af"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 6H10M6 9H10M6 12H8"
                    stroke="#1e40af"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#111827",
                  margin: 0
                }}>
                  Head Office Coordination
                </h3>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px"
              }}>
                {/* Left Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* HO IT Contact Person */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      HO IT Contact Person <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={hoItContactPerson}
                      onChange={(e) => setHoItContactPerson(e.target.value)}
                      placeholder="Enter contact name"
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

                  {/* Contact Email */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Contact Email <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="contact@company.com"
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

                  {/* Contact Phone */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Contact Phone <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+1 (305) 555-0000"
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

                  {/* Coordination Meeting Date */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Coordination Meeting Date <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        value={coordinationMeetingDate}
                        onChange={(e) => setCoordinationMeetingDate(e.target.value)}
                        placeholder="dd-mm-yyyy"
                        style={{
                          width: "100%",
                          padding: "10px 40px 10px 12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          color: "#111827"
                        }}
                      />
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
                        <path
                          d="M4 2V4M12 2V4M2 6H14M3 2H13C13.5523 2 14 2.44772 14 3V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* HO Approval Status */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      HO Approval Status <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        value={hoApprovalStatus}
                        onChange={(e) => setHoApprovalStatus(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 40px 10px 12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          color: hoApprovalStatus ? "#111827" : "#9ca3af",
                          cursor: "pointer",
                          appearance: "none"
                        }}
                      >
                        <option value="">Select approval status</option>
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="under_review">Under Review</option>
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

                  {/* Approval Reference Number */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Approval Reference Number
                    </label>
                    <input
                      type="text"
                      value={approvalReferenceNumber}
                      onChange={(e) => setApprovalReferenceNumber(e.target.value)}
                      placeholder="HO-IT-APPR-2025-XXX"
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

                  {/* HO Coordination Notes */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      HO Coordination Notes
                    </label>
                    <textarea
                      value={hoCoordinationNotes}
                      onChange={(e) => setHoCoordinationNotes(e.target.value)}
                      placeholder="Notes from HO coordination meetings..."
                      rows="6"
                      style={{
                        width: "100%",
                        padding: "12px",
                        fontSize: "14px",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        backgroundColor: "#ffffff",
                        color: "#111827",
                        resize: "vertical",
                        fontFamily: "inherit"
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div style={{ marginTop: "32px", display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={handleSubmit}
                  style={{
                    padding: "12px 32px",
                    backgroundColor: "#10b981",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "background-color 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#059669"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#10b981"}
                >
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M13 4L6 11L3 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Submit Coordination Details
                </button>
              </div>
            </div>

            {/* Server Room Specifications Form Section */}
            <div style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              marginTop: "24px"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "24px"
              }}>
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 2C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V5L10 2H3Z"
                    stroke="#1e40af"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 8H11M5 11H9"
                    stroke="#1e40af"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#111827",
                  margin: 0
                }}>
                  Server Room Specifications
                </h3>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px"
              }}>
                {/* Left Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Room Dimensions */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Room Dimensions (sq ft) <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      type="number"
                      value={roomDimensions}
                      onChange={(e) => setRoomDimensions(e.target.value)}
                      placeholder="Enter square footage"
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

                  {/* Cooling System Type */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Cooling System Type <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        value={coolingSystemType}
                        onChange={(e) => setCoolingSystemType(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 40px 10px 12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          color: coolingSystemType ? "#111827" : "#9ca3af",
                          cursor: "pointer",
                          appearance: "none"
                        }}
                      >
                        <option value="">Select cooling system</option>
                        <option value="air_conditioning">Air Conditioning</option>
                        <option value="precision_cooling">Precision Cooling</option>
                        <option value="chilled_water">Chilled Water</option>
                        <option value="direct_expansion">Direct Expansion (DX)</option>
                        <option value="crac_units">CRAC Units</option>
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

                  {/* Power Capacity */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Power Capacity (KVA) <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={powerCapacity}
                      onChange={(e) => setPowerCapacity(e.target.value)}
                      placeholder="Enter KVA rating"
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

                  {/* UPS Backup Duration */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      UPS Backup Duration (Hours) <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={upsBackupDuration}
                      onChange={(e) => setUpsBackupDuration(e.target.value)}
                      placeholder="Enter hours"
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

                  {/* Fire Suppression System */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Fire Suppression System <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        value={fireSuppressionSystem}
                        onChange={(e) => setFireSuppressionSystem(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 40px 10px 12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          color: fireSuppressionSystem ? "#111827" : "#9ca3af",
                          cursor: "pointer",
                          appearance: "none"
                        }}
                      >
                        <option value="">Select system type</option>
                        <option value="fm200">FM-200</option>
                        <option value="novec1230">Novec 1230</option>
                        <option value="inergen">Inergen</option>
                        <option value="sprinkler">Wet/Dry Sprinkler</option>
                        <option value="pre_action">Pre-Action Sprinkler</option>
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
                </div>

                {/* Right Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Access Control System */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Access Control System <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        value={accessControlSystem}
                        onChange={(e) => setAccessControlSystem(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 40px 10px 12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          color: accessControlSystem ? "#111827" : "#9ca3af",
                          cursor: "pointer",
                          appearance: "none"
                        }}
                      >
                        <option value="">Select access control</option>
                        <option value="card_access">Card Access System</option>
                        <option value="biometric">Biometric System</option>
                        <option value="keypad">Keypad Entry</option>
                        <option value="smart_lock">Smart Lock System</option>
                        <option value="multi_factor">Multi-Factor Authentication</option>
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

                  {/* Raised Floor Height */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Raised Floor Height (inches)
                    </label>
                    <input
                      type="text"
                      value={raisedFloorHeight}
                      onChange={(e) => setRaisedFloorHeight(e.target.value)}
                      placeholder="Enter height in inches"
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

                  {/* Cable Management Type */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Cable Management Type <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        value={cableManagementType}
                        onChange={(e) => setCableManagementType(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 40px 10px 12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          color: cableManagementType ? "#111827" : "#9ca3af",
                          cursor: "pointer",
                          appearance: "none"
                        }}
                      >
                        <option value="">Select cable management</option>
                        <option value="overhead">Overhead Cable Tray</option>
                        <option value="underfloor">Underfloor Conduit</option>
                        <option value="raceway">Raceway System</option>
                        <option value="ladder">Ladder Rack</option>
                        <option value="combination">Combination System</option>
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

                  {/* Environmental Monitoring */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Environmental Monitoring <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      padding: "12px",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      backgroundColor: "#f9fafb"
                    }}>
                      <label style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: "pointer",
                        fontSize: "14px",
                        color: "#111827"
                      }}>
                        <input
                          type="checkbox"
                          checked={environmentalMonitoring.temperatureMonitoring}
                          onChange={() => handleEnvironmentalMonitoringChange("temperatureMonitoring")}
                          style={{
                            width: "18px",
                            height: "18px",
                            cursor: "pointer"
                          }}
                        />
                        Temperature Monitoring
                      </label>
                      <label style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: "pointer",
                        fontSize: "14px",
                        color: "#111827"
                      }}>
                        <input
                          type="checkbox"
                          checked={environmentalMonitoring.humidityMonitoring}
                          onChange={() => handleEnvironmentalMonitoringChange("humidityMonitoring")}
                          style={{
                            width: "18px",
                            height: "18px",
                            cursor: "pointer"
                          }}
                        />
                        Humidity Monitoring
                      </label>
                      <label style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: "pointer",
                        fontSize: "14px",
                        color: "#111827"
                      }}>
                        <input
                          type="checkbox"
                          checked={environmentalMonitoring.waterLeakDetection}
                          onChange={() => handleEnvironmentalMonitoringChange("waterLeakDetection")}
                          style={{
                            width: "18px",
                            height: "18px",
                            cursor: "pointer"
                          }}
                        />
                        Water Leak Detection
                      </label>
                      <label style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: "pointer",
                        fontSize: "14px",
                        color: "#111827"
                      }}>
                        <input
                          type="checkbox"
                          checked={environmentalMonitoring.smokeDetection}
                          onChange={() => handleEnvironmentalMonitoringChange("smokeDetection")}
                          style={{
                            width: "18px",
                            height: "18px",
                            cursor: "pointer"
                          }}
                        />
                        Smoke Detection
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div style={{ marginTop: "32px", display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={handleSubmit}
                  style={{
                    padding: "12px 32px",
                    backgroundColor: "#10b981",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "background-color 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#059669"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#10b981"}
                >
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M13 4L6 11L3 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Submit Specifications
                </button>
              </div>
            </div>

            {/* IT Infrastructure Requirements Form Section */}
            <div style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              marginTop: "24px"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "24px"
              }}>
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M3 2C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V5L10 2H3Z"
                    stroke="#1e40af"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 8H11M5 11H9"
                    stroke="#1e40af"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#111827",
                  margin: 0
                }}>
                  IT Infrastructure Requirements
                </h3>
              </div>

              {/* Equipment Categories Cards */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
                marginBottom: "24px"
              }}>
                {/* Server Equipment Card */}
                <div style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundColor: "#ffffff"
                }}>
                  <div style={{
                    backgroundColor: "#1e40af",
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M3 2C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V5L10 2H3Z"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#ffffff"
                    }}>
                      Server Equipment
                    </span>
                  </div>
                  <div style={{
                    padding: "16px",
                    backgroundColor: "#eff6ff",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                  }}>
                    <div>
                      <label style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#111827",
                        marginBottom: "6px"
                      }}>
                        Number of Server Racks <span style={{ color: "#dc2626" }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={numberOfServerRacks}
                        onChange={(e) => setNumberOfServerRacks(e.target.value)}
                        placeholder="Enter number"
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          color: "#111827"
                        }}
                      />
                    </div>
                    <div>
                      <label style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#111827",
                        marginBottom: "6px"
                      }}>
                        Physical Servers <span style={{ color: "#dc2626" }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={physicalServers}
                        onChange={(e) => setPhysicalServers(e.target.value)}
                        placeholder="Enter number"
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          color: "#111827"
                        }}
                      />
                    </div>
                    <div>
                      <label style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#111827",
                        marginBottom: "6px"
                      }}>
                        Storage Arrays (TB) <span style={{ color: "#dc2626" }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={storageArrays}
                        onChange={(e) => setStorageArrays(e.target.value)}
                        placeholder="Enter TB"
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          color: "#111827"
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Network Equipment Card */}
                <div style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundColor: "#ffffff"
                }}>
                  <div style={{
                    backgroundColor: "#059669",
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M2 4H14M2 8H14M2 12H10"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="13" cy="12" r="2" fill="#ffffff" />
                    </svg>
                    <span style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#ffffff"
                    }}>
                      Network Equipment
                    </span>
                  </div>
                  <div style={{
                    padding: "16px",
                    backgroundColor: "#ecfdf5",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                  }}>
                    <div>
                      <label style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#111827",
                        marginBottom: "6px"
                      }}>
                        Core Switches <span style={{ color: "#dc2626" }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={coreSwitches}
                        onChange={(e) => setCoreSwitches(e.target.value)}
                        placeholder="Enter number"
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          color: "#111827"
                        }}
                      />
                    </div>
                    <div>
                      <label style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#111827",
                        marginBottom: "6px"
                      }}>
                        Routers <span style={{ color: "#dc2626" }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={routers}
                        onChange={(e) => setRouters(e.target.value)}
                        placeholder="Enter number"
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          color: "#111827"
                        }}
                      />
                    </div>
                    <div>
                      <label style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#111827",
                        marginBottom: "6px"
                      }}>
                        Firewalls <span style={{ color: "#dc2626" }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={firewalls}
                        onChange={(e) => setFirewalls(e.target.value)}
                        placeholder="Enter number"
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          color: "#111827"
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Power & Backup Card */}
                <div style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundColor: "#ffffff"
                }}>
                  <div style={{
                    backgroundColor: "#7c3aed",
                    padding: "12px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}>
                    <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 2L9 6H13L10 8.5L11 12.5L8 10L5 12.5L6 8.5L3 6H7L8 2Z"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#ffffff"
                    }}>
                      Power & Backup
                    </span>
                  </div>
                  <div style={{
                    padding: "16px",
                    backgroundColor: "#f5f3ff",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                  }}>
                    <div>
                      <label style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#111827",
                        marginBottom: "6px"
                      }}>
                        UPS Units <span style={{ color: "#dc2626" }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={upsUnits}
                        onChange={(e) => setUpsUnits(e.target.value)}
                        placeholder="Enter number"
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          color: "#111827"
                        }}
                      />
                    </div>
                    <div>
                      <label style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#111827",
                        marginBottom: "6px"
                      }}>
                        PDU Units <span style={{ color: "#dc2626" }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={pduUnits}
                        onChange={(e) => setPduUnits(e.target.value)}
                        placeholder="Enter number"
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          color: "#111827"
                        }}
                      />
                    </div>
                    <div>
                      <label style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#111827",
                        marginBottom: "6px"
                      }}>
                        Generator (KVA)
                      </label>
                      <input
                        type="text"
                        value={generator}
                        onChange={(e) => setGenerator(e.target.value)}
                        placeholder="Enter KVA"
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          color: "#111827"
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section - General Requirements */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px"
              }}>
                {/* Network Bandwidth Requirements */}
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "8px"
                  }}>
                    Network Bandwidth Requirements <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      value={networkBandwidth}
                      onChange={(e) => setNetworkBandwidth(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 40px 10px 12px",
                        fontSize: "14px",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        backgroundColor: "#ffffff",
                        color: networkBandwidth ? "#111827" : "#9ca3af",
                        cursor: "pointer",
                        appearance: "none"
                      }}
                    >
                      <option value="">Select bandwidth</option>
                      <option value="100mbps">100 Mbps</option>
                      <option value="500mbps">500 Mbps</option>
                      <option value="1gbps">1 Gbps</option>
                      <option value="10gbps">10 Gbps</option>
                      <option value="100gbps">100 Gbps</option>
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

                {/* Redundancy Level */}
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "8px"
                  }}>
                    Redundancy Level <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      value={redundancyLevel}
                      onChange={(e) => setRedundancyLevel(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 40px 10px 12px",
                        fontSize: "14px",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        backgroundColor: "#ffffff",
                        color: redundancyLevel ? "#111827" : "#9ca3af",
                        cursor: "pointer",
                        appearance: "none"
                      }}
                    >
                      <option value="">Select redundancy level</option>
                      <option value="none">None</option>
                      <option value="n+1">N+1</option>
                      <option value="2n">2N</option>
                      <option value="2n+1">2N+1</option>
                      <option value="full_redundancy">Full Redundancy</option>
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

                {/* Additional Infrastructure Notes */}
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "8px"
                  }}>
                    Additional Infrastructure Notes
                  </label>
                  <textarea
                    value={additionalInfrastructureNotes}
                    onChange={(e) => setAdditionalInfrastructureNotes(e.target.value)}
                    placeholder="Any special requirements or configurations..."
                    rows="5"
                    style={{
                      width: "100%",
                      padding: "12px",
                      fontSize: "14px",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      backgroundColor: "#ffffff",
                      color: "#111827",
                      resize: "vertical",
                      fontFamily: "inherit"
                    }}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div style={{ marginTop: "32px", display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={handleSubmit}
                  style={{
                    padding: "12px 32px",
                    backgroundColor: "#10b981",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "background-color 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#059669"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#10b981"}
                >
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M13 4L6 11L3 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Submit Infrastructure Requirements
                </button>
              </div>
            </div>

            {/* Implementation Timeline Section */}
            <div style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              marginTop: "24px"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "24px"
              }}>
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 2V4M12 2V4M2 6H14M3 2H13C13.5523 2 14 2.44772 14 3V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2Z"
                    stroke="#1e40af"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#111827",
                  margin: 0
                }}>
                  Implementation Timeline
                </h3>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "20px"
              }}>
                {/* Planning Start Date */}
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "8px"
                  }}>
                    Planning Start Date <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      value={planningStartDate}
                      onChange={(e) => setPlanningStartDate(e.target.value)}
                      placeholder="dd-mm-yyyy"
                      style={{
                        width: "100%",
                        padding: "10px 40px 10px 12px",
                        fontSize: "14px",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        backgroundColor: "#ffffff",
                        color: "#111827"
                      }}
                    />
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
                      <path
                        d="M4 2V4M12 2V4M2 6H14M3 2H13C13.5523 2 14 2.44772 14 3V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Construction Start Date */}
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "8px"
                  }}>
                    Construction Start Date <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      value={constructionStartDate}
                      onChange={(e) => setConstructionStartDate(e.target.value)}
                      placeholder="dd-mm-yyyy"
                      style={{
                        width: "100%",
                        padding: "10px 40px 10px 12px",
                        fontSize: "14px",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        backgroundColor: "#ffffff",
                        color: "#111827"
                      }}
                    />
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
                      <path
                        d="M4 2V4M12 2V4M2 6H14M3 2H13C13.5523 2 14 2.44772 14 3V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Equipment Delivery Date */}
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "8px"
                  }}>
                    Equipment Delivery Date <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      value={equipmentDeliveryDate}
                      onChange={(e) => setEquipmentDeliveryDate(e.target.value)}
                      placeholder="dd-mm-yyyy"
                      style={{
                        width: "100%",
                        padding: "10px 40px 10px 12px",
                        fontSize: "14px",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        backgroundColor: "#ffffff",
                        color: "#111827"
                      }}
                    />
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
                      <path
                        d="M4 2V4M12 2V4M2 6H14M3 2H13C13.5523 2 14 2.44772 14 3V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                {/* Go-Live Date */}
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "8px"
                  }}>
                    Go-Live Date <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      value={goLiveDate}
                      onChange={(e) => setGoLiveDate(e.target.value)}
                      placeholder="dd-mm-yyyy"
                      style={{
                        width: "100%",
                        padding: "10px 40px 10px 12px",
                        fontSize: "14px",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        backgroundColor: "#ffffff",
                        color: "#111827"
                      }}
                    />
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
                      <path
                        d="M4 2V4M12 2V4M2 6H14M3 2H13C13.5523 2 14 2.44772 14 3V13C14 13.5523 13.5523 14 13 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Documentation Upload Section */}
            <div style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              marginTop: "24px"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "24px"
              }}>
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 2V14M2 8H14"
                    stroke="#1e40af"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#111827",
                  margin: 0
                }}>
                  Documentation Upload
                </h3>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "20px"
              }}>
                {/* Server Room Layout Plan */}
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "8px"
                  }}>
                    Server Room Layout Plan
                  </label>
                  <div
                    style={{
                      border: "2px dashed #d1d5db",
                      borderRadius: "8px",
                      padding: "24px",
                      textAlign: "center",
                      backgroundColor: "#f9fafb",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      position: "relative"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#3b82f6";
                      e.currentTarget.style.backgroundColor = "#eff6ff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#d1d5db";
                      e.currentTarget.style.backgroundColor = "#f9fafb";
                    }}
                  >
                    <input
                      type="file"
                      id="layout-plan-upload"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(setServerRoomLayoutPlan, e)}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        left: 0,
                        opacity: 0,
                        cursor: "pointer"
                      }}
                    />
                    <svg width="40" height="40" viewBox="0 0 16 16" fill="none" style={{ margin: "0 auto 12px", color: "#9ca3af" }}>
                      <path
                        d="M3 2C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V5L10 2H3Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "4px"
                    }}>
                      Upload floor plan and layout
                    </div>
                    <button
                      type="button"
                      onClick={() => document.getElementById("layout-plan-upload")?.click()}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "transparent",
                        color: "#1e40af",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "13px",
                        fontWeight: "600",
                        cursor: "pointer",
                        marginTop: "8px"
                      }}
                    >
                      Choose File
                    </button>
                    {serverRoomLayoutPlan && (
                      <div style={{
                        marginTop: "8px",
                        fontSize: "12px",
                        color: "#10b981",
                        fontWeight: "500"
                      }}>
                        {serverRoomLayoutPlan.name}
                      </div>
                    )}
                  </div>
                </div>

                {/* Technical Specifications Document */}
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "8px"
                  }}>
                    Technical Specifications Document
                  </label>
                  <div
                    style={{
                      border: "2px dashed #d1d5db",
                      borderRadius: "8px",
                      padding: "24px",
                      textAlign: "center",
                      backgroundColor: "#f9fafb",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      position: "relative"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#3b82f6";
                      e.currentTarget.style.backgroundColor = "#eff6ff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#d1d5db";
                      e.currentTarget.style.backgroundColor = "#f9fafb";
                    }}
                  >
                    <input
                      type="file"
                      id="tech-specs-upload"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(setTechnicalSpecificationsDoc, e)}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        left: 0,
                        opacity: 0,
                        cursor: "pointer"
                      }}
                    />
                    <svg width="40" height="40" viewBox="0 0 16 16" fill="none" style={{ margin: "0 auto 12px", color: "#9ca3af" }}>
                      <path
                        d="M3 2C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V5L10 2H3Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M5 8H11M5 10H9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "4px"
                    }}>
                      Upload technical specs
                    </div>
                    <button
                      type="button"
                      onClick={() => document.getElementById("tech-specs-upload")?.click()}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "transparent",
                        color: "#1e40af",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "13px",
                        fontWeight: "600",
                        cursor: "pointer",
                        marginTop: "8px"
                      }}
                    >
                      Choose File
                    </button>
                    {technicalSpecificationsDoc && (
                      <div style={{
                        marginTop: "8px",
                        fontSize: "12px",
                        color: "#10b981",
                        fontWeight: "500"
                      }}>
                        {technicalSpecificationsDoc.name}
                      </div>
                    )}
                  </div>
                </div>

                {/* HO Approval Documentation */}
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "8px"
                  }}>
                    HO Approval Documentation
                  </label>
                  <div
                    style={{
                      border: "2px dashed #d1d5db",
                      borderRadius: "8px",
                      padding: "24px",
                      textAlign: "center",
                      backgroundColor: "#f9fafb",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      position: "relative"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#3b82f6";
                      e.currentTarget.style.backgroundColor = "#eff6ff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#d1d5db";
                      e.currentTarget.style.backgroundColor = "#f9fafb";
                    }}
                  >
                    <input
                      type="file"
                      id="ho-approval-upload"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(setHoApprovalDocumentation, e)}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        left: 0,
                        opacity: 0,
                        cursor: "pointer"
                      }}
                    />
                    <svg width="40" height="40" viewBox="0 0 16 16" fill="none" style={{ margin: "0 auto 12px", color: "#9ca3af" }}>
                      <path
                        d="M3 2C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V5L10 2H3Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6 8L8 10L10 8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "4px"
                    }}>
                      Upload approval documents
                    </div>
                    <button
                      type="button"
                      onClick={() => document.getElementById("ho-approval-upload")?.click()}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "transparent",
                        color: "#1e40af",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "13px",
                        fontWeight: "600",
                        cursor: "pointer",
                        marginTop: "8px"
                      }}
                    >
                      Choose File
                    </button>
                    {hoApprovalDocumentation && (
                      <div style={{
                        marginTop: "8px",
                        fontSize: "12px",
                        color: "#10b981",
                        fontWeight: "500"
                      }}>
                        {hoApprovalDocumentation.name}
                      </div>
                    )}
                  </div>
                </div>

                {/* Vendor Quotations */}
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "8px"
                  }}>
                    Vendor Quotations
                  </label>
                  <div
                    style={{
                      border: "2px dashed #d1d5db",
                      borderRadius: "8px",
                      padding: "24px",
                      textAlign: "center",
                      backgroundColor: "#f9fafb",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      position: "relative"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#3b82f6";
                      e.currentTarget.style.backgroundColor = "#eff6ff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#d1d5db";
                      e.currentTarget.style.backgroundColor = "#f9fafb";
                    }}
                  >
                    <input
                      type="file"
                      id="vendor-quotes-upload"
                      accept=".pdf,.xls,.xlsx"
                      multiple
                      onChange={(e) => handleFileUpload(setVendorQuotations, e)}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        top: 0,
                        left: 0,
                        opacity: 0,
                        cursor: "pointer"
                      }}
                    />
                    <svg width="40" height="40" viewBox="0 0 16 16" fill="none" style={{ margin: "0 auto 12px", color: "#9ca3af" }}>
                      <path
                        d="M3 2C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V5L10 2H3Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 4V12M4 8H12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "4px"
                    }}>
                      Upload vendor quotes
                    </div>
                    <button
                      type="button"
                      onClick={() => document.getElementById("vendor-quotes-upload")?.click()}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "transparent",
                        color: "#1e40af",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "13px",
                        fontWeight: "600",
                        cursor: "pointer",
                        marginTop: "8px"
                      }}
                    >
                      Choose Files
                    </button>
                    {vendorQuotations && (
                      <div style={{
                        marginTop: "8px",
                        fontSize: "12px",
                        color: "#10b981",
                        fontWeight: "500"
                      }}>
                        {vendorQuotations.name || `${vendorQuotations.length} file(s) selected`}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Final Confirmation Section */}
            <div style={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              padding: "24px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
              marginTop: "24px"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "24px"
              }}>
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M13 4L6 11L3 8"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="8"
                    cy="8"
                    r="7"
                    stroke="#10b981"
                    strokeWidth="1.5"
                  />
                </svg>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#111827",
                  margin: 0
                }}>
                  Final Confirmation
                </h3>
              </div>

              {/* Verification Checklist */}
              <div style={{
                backgroundColor: "#fef9c3",
                border: "1px solid #fde047",
                borderRadius: "8px",
                padding: "20px",
                marginBottom: "24px"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "16px"
                }}>
                  <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2Z"
                      stroke="#ca8a04"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 6V9M8 11H8.01"
                      stroke="#ca8a04"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h4 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#92400e",
                    margin: 0
                  }}>
                    Verification Checklist
                  </h4>
                </div>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px"
                }}>
                  <label style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#78350f"
                  }}>
                    <input
                      type="checkbox"
                      checked={verificationChecklist.hoCoordinationCompleted}
                      onChange={() => handleChecklistChange("hoCoordinationCompleted")}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer"
                      }}
                    />
                    Head Office coordination completed and approval received
                  </label>
                  <label style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#78350f"
                  }}>
                    <input
                      type="checkbox"
                      checked={verificationChecklist.serverRoomSpecsFinalized}
                      onChange={() => handleChecklistChange("serverRoomSpecsFinalized")}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer"
                      }}
                    />
                    Server room specifications finalized and documented
                  </label>
                  <label style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#78350f"
                  }}>
                    <input
                      type="checkbox"
                      checked={verificationChecklist.infrastructureRequirementsConfirmed}
                      onChange={() => handleChecklistChange("infrastructureRequirementsConfirmed")}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer"
                      }}
                    />
                    IT infrastructure requirements confirmed with technical team
                  </label>
                  <label style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#78350f"
                  }}>
                    <input
                      type="checkbox"
                      checked={verificationChecklist.timelineAgreed}
                      onChange={() => handleChecklistChange("timelineAgreed")}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer"
                      }}
                    />
                    Implementation timeline agreed upon with all stakeholders
                  </label>
                  <label style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#78350f"
                  }}>
                    <input
                      type="checkbox"
                      checked={verificationChecklist.documentationUploaded}
                      onChange={() => handleChecklistChange("documentationUploaded")}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer"
                      }}
                    />
                    All required documentation uploaded and verified
                  </label>
                  <label style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#78350f"
                  }}>
                    <input
                      type="checkbox"
                      checked={verificationChecklist.budgetApproved}
                      onChange={() => handleChecklistChange("budgetApproved")}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer"
                      }}
                    />
                    Budget allocation approved by finance department
                  </label>
                </div>
              </div>

              {/* Confirmation Notes */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: "8px"
                }}>
                  Confirmation Notes
                </label>
                <textarea
                  value={confirmationNotes}
                  onChange={(e) => setConfirmationNotes(e.target.value)}
                  placeholder="Add any final notes or comments..."
                  rows="5"
                  style={{
                    width: "100%",
                    padding: "12px",
                    fontSize: "14px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    backgroundColor: "#ffffff",
                    color: "#111827",
                    resize: "vertical",
                    fontFamily: "inherit"
                  }}
                />
              </div>

              {/* Action Buttons */}
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "16px"
              }}>
                <button
                  onClick={handleSaveAsDraft}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#ffffff",
                    color: "#1e40af",
                    border: "2px solid #1e40af",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "all 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#eff6ff";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#ffffff";
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M3 2C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V5L10 2H3Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 6H10M6 9H10"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Save as Draft
                </button>
                <button
                  onClick={handleConfirmAndSubmit}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#f97316",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "background-color 0.2s"
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#ea580c"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#f97316"}
                >
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M13 4L6 11L3 8"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Confirm & Submit Server Room Setup
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

