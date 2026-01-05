"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import DashboardHeader from "@/components/DashboardHeader";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/agreementExecution.css";
import "@/css/businessApproval.css";

export default function ITLinkupConfirmation() {
  const router = useRouter();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Form state
  const [primaryIspProvider, setPrimaryIspProvider] = useState("");
  const [connectionType, setConnectionType] = useState("");
  const [bandwidthSpeed, setBandwidthSpeed] = useState("");
  const [uploadSpeed, setUploadSpeed] = useState("");
  const [latency, setLatency] = useState("");
  const [packetLoss, setPacketLoss] = useState("");
  const [connectionStatus, setConnectionStatus] = useState("");
  const [testDuration, setTestDuration] = useState("");

  // Network Availability Confirmation state
  const [switchStatus, setSwitchStatus] = useState("");
  const [routerStatus, setRouterStatus] = useState("");
  const [dhcpService, setDhcpService] = useState("");
  const [firewallStatus, setFirewallStatus] = useState("");
  const [vpnAccess, setVpnAccess] = useState("");
  const [accessControl, setAccessControl] = useState("");
  const [dnsResolution, setDnsResolution] = useState("");
  const [ntpSync, setNtpSync] = useState("");
  const [monitoringAgent, setMonitoringAgent] = useState("");
  const [networkUptime, setNetworkUptime] = useState("");
  const [redundancyStatus, setRedundancyStatus] = useState("");

  // Head Office Connectivity Verification state
  const [hoConnectionMethod, setHoConnectionMethod] = useState("");
  const [hoIpAddress, setHoIpAddress] = useState("");
  const [pingResponseTime, setPingResponseTime] = useState("");
  const [dataTransferSpeed, setDataTransferSpeed] = useState("");
  const [applicationConnectivity, setApplicationConnectivity] = useState({
    erpSystemAccess: false,
    emailServerAccess: false,
    fileServerAccess: false,
    databaseConnectivity: false,
    backupSystemAccess: false
  });
  const [connectionQuality, setConnectionQuality] = useState("");
  const [securityValidation, setSecurityValidation] = useState("");

  const handleApplicationConnectivityChange = (key) => {
    setApplicationConnectivity(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Testing Results & Documentation state
  const [testReportFiles, setTestReportFiles] = useState(null);
  const [networkTopologyDiagram, setNetworkTopologyDiagram] = useState(null);
  const [testSummaryNotes, setTestSummaryNotes] = useState("");
  const [issuesIdentified, setIssuesIdentified] = useState("");
  const [recommendations, setRecommendations] = useState("");

  const handleTestReportUpload = (e) => {
    const files = e.target.files;
    setTestReportFiles(files);
    console.log("Test report files uploaded:", files);
  };

  const handleTopologyDiagramUpload = (e) => {
    const file = e.target.files[0];
    setNetworkTopologyDiagram(file);
    console.log("Network topology diagram uploaded:", file);
  };

  // Final IT Confirmation state
  const [itLinkupChecklist, setItLinkupChecklist] = useState({
    internetConnectivityTested: false,
    localNetworkAvailabilityConfirmed: false,
    hoConnectivityEstablished: false,
    securityProtocolsValidated: false,
    testDocumentationCompleted: false,
    criticalApplicationsTested: false
  });
  const [itSpecialistName, setItSpecialistName] = useState("Marcus Johnson");
  const [confirmationDate, setConfirmationDate] = useState("");
  const [signature, setSignature] = useState(null);

  const handleChecklistChange = (key) => {
    setItLinkupChecklist(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSaveAsDraft = () => {
    console.log("Saving as draft...");
    // Implement save as draft logic
  };

  const handleRejectAndRetest = () => {
    console.log("Rejecting and requesting retest...");
    // Implement reject and retest logic
  };

  const handleConfirmAndProceed = () => {
    console.log("Confirming IT link-up and proceeding...");
    // Implement confirm and proceed logic
  };

  const handleSignDocument = () => {
    console.log("Opening signature pad...");
    // Implement signature functionality
    setSignature("signed");
  };

  const handleSubmit = () => {
    console.log("Submitting IT link-up confirmation...", {
      primaryIspProvider,
      connectionType,
      bandwidthSpeed,
      uploadSpeed,
      latency,
      packetLoss,
      connectionStatus,
      testDuration
    });
    // Implement submission logic
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
                IT Link-up Confirmation
              </h1>
              <p style={{
                fontSize: "16px",
                color: "#6b7280"
              }}>
                Verify network connectivity and system integration
              </p>
            </div>

            {/* Back to Server Room Setup Link */}
            <Link href="/server-room-setup" className="back-to-property-details">
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
              Back to Server Room Setup
            </Link>

            {/* Project Overview Card */}
            <div className="property-overview-card" style={{ marginTop: "24px" }}>
              <div className="property-overview-left">
                <h2 className="property-name-large" style={{ color: "#1e3a8a" }}>
                  Downtown Arts Plaza - IT Link-up Verification
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
                    backgroundColor: "#d1fae5",
                    color: "#059669",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M2 4H14M2 8H14M2 12H10"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="13" cy="12" r="2" fill="currentColor" />
                    </svg>
                    Network Testing Phase
                  </span>
                  <span style={{
                    fontSize: "14px",
                    color: "#6b7280"
                  }}>
                    Test ID: IT-LNK-2025-001-DTP
                  </span>
                </div>
              </div>
              <div className="property-overview-right">
                <div style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  marginBottom: "4px"
                }}>
                  Testing Started
                </div>
                <div style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#1e40af",
                  marginBottom: "4px"
                }}>
                  Jan 15, 2025
                </div>
              </div>
            </div>

            {/* Internet Connectivity Tests Form Section */}
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
                    d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2Z"
                    stroke="#1e40af"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 6V10M8 4H8.01"
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
                  Internet Connectivity Tests
                </h3>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px"
              }}>
                {/* Left Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Primary ISP Provider */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Primary ISP Provider <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={primaryIspProvider}
                      onChange={(e) => setPrimaryIspProvider(e.target.value)}
                      placeholder="Enter ISP name"
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

                  {/* Connection Type */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Connection Type <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        value={connectionType}
                        onChange={(e) => setConnectionType(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 40px 10px 12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          color: connectionType ? "#111827" : "#9ca3af",
                          cursor: "pointer",
                          appearance: "none"
                        }}
                      >
                        <option value="">Select connection type</option>
                        <option value="fiber">Fiber Optic</option>
                        <option value="ethernet">Ethernet</option>
                        <option value="cable">Cable</option>
                        <option value="dsl">DSL</option>
                        <option value="wireless">Wireless</option>
                        <option value="satellite">Satellite</option>
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

                  {/* Bandwidth Speed */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Bandwidth Speed (Mbps) <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={bandwidthSpeed}
                      onChange={(e) => setBandwidthSpeed(e.target.value)}
                      placeholder="Enter speed in Mbps"
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

                  {/* Upload Speed */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Upload Speed (Mbps) <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={uploadSpeed}
                      onChange={(e) => setUploadSpeed(e.target.value)}
                      placeholder="Enter upload speed"
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
                </div>

                {/* Right Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Latency */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Latency (ms) <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={latency}
                      onChange={(e) => setLatency(e.target.value)}
                      placeholder="Enter latency"
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

                  {/* Packet Loss */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Packet Loss (%) <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={packetLoss}
                      onChange={(e) => setPacketLoss(e.target.value)}
                      placeholder="Enter packet loss percentage"
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

                  {/* Connection Status */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Connection Status <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        value={connectionStatus}
                        onChange={(e) => setConnectionStatus(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 40px 10px 12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          color: connectionStatus ? "#111827" : "#9ca3af",
                          cursor: "pointer",
                          appearance: "none"
                        }}
                      >
                        <option value="">Select status</option>
                        <option value="stable">Stable</option>
                        <option value="unstable">Unstable</option>
                        <option value="intermittent">Intermittent</option>
                        <option value="down">Down</option>
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

                  {/* Test Duration */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Test Duration (Hours) <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={testDuration}
                      onChange={(e) => setTestDuration(e.target.value)}
                      placeholder="Enter test duration"
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
                  Submit Connectivity Test
                </button>
              </div>
            </div>

            {/* Network Availability Confirmation Section */}
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
                    d="M2 4H14M2 8H14M2 12H10"
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
                  Network Availability Confirmation
                </h3>
              </div>

              {/* Three Cards */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "20px",
                marginBottom: "24px"
              }}>
                {/* Local Network Card */}
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
                      <path
                        d="M2 4H14M2 8H14M2 12H10"
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
                      Local Network
                    </span>
                  </div>
                  <div style={{
                    padding: "16px",
                    backgroundColor: "#eff6ff",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                  }}>
                    {/* Switch Status */}
                    <div>
                      <label style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#111827",
                        marginBottom: "6px"
                      }}>
                        Switch Status <span style={{ color: "#dc2626" }}>*</span>
                      </label>
                      <div style={{ position: "relative" }}>
                        <select
                          value={switchStatus}
                          onChange={(e) => setSwitchStatus(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "8px 32px 8px 12px",
                            fontSize: "13px",
                            border: "1px solid #d1d5db",
                            borderRadius: "6px",
                            backgroundColor: "#ffffff",
                            color: switchStatus ? "#111827" : "#9ca3af",
                            cursor: "pointer",
                            appearance: "none"
                          }}
                        >
                          <option value="">Select status</option>
                          <option value="operational">Operational</option>
                          <option value="degraded">Degraded</option>
                          <option value="down">Down</option>
                        </select>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          style={{
                            position: "absolute",
                            right: "10px",
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
                    {/* Router Status */}
                    <div>
                      <label style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#111827",
                        marginBottom: "6px"
                      }}>
                        Router Status <span style={{ color: "#dc2626" }}>*</span>
                      </label>
                      <div style={{ position: "relative" }}>
                        <select
                          value={routerStatus}
                          onChange={(e) => setRouterStatus(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "8px 32px 8px 12px",
                            fontSize: "13px",
                            border: "1px solid #d1d5db",
                            borderRadius: "6px",
                            backgroundColor: "#ffffff",
                            color: routerStatus ? "#111827" : "#9ca3af",
                            cursor: "pointer",
                            appearance: "none"
                          }}
                        >
                          <option value="">Select status</option>
                          <option value="operational">Operational</option>
                          <option value="degraded">Degraded</option>
                          <option value="down">Down</option>
                        </select>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          style={{
                            position: "absolute",
                            right: "10px",
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
                    {/* DHCP Service */}
                    <div>
                      <label style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#111827",
                        marginBottom: "6px"
                      }}>
                        DHCP Service <span style={{ color: "#dc2626" }}>*</span>
                      </label>
                      <div style={{ position: "relative" }}>
                        <select
                          value={dhcpService}
                          onChange={(e) => setDhcpService(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "8px 32px 8px 12px",
                            fontSize: "13px",
                            border: "1px solid #d1d5db",
                            borderRadius: "6px",
                            backgroundColor: "#ffffff",
                            color: dhcpService ? "#111827" : "#9ca3af",
                            cursor: "pointer",
                            appearance: "none"
                          }}
                        >
                          <option value="">Select status</option>
                          <option value="operational">Operational</option>
                          <option value="degraded">Degraded</option>
                          <option value="down">Down</option>
                        </select>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          style={{
                            position: "absolute",
                            right: "10px",
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
                </div>

                {/* Security Systems Card */}
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
                        d="M8 2L2 5V9C2 12 5 14.5 8 15C11 14.5 14 12 14 9V5L8 2Z"
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
                      Security Systems
                    </span>
                  </div>
                  <div style={{
                    padding: "16px",
                    backgroundColor: "#ecfdf5",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                  }}>
                    {/* Firewall Status */}
                    <div>
                      <label style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#111827",
                        marginBottom: "6px"
                      }}>
                        Firewall Status <span style={{ color: "#dc2626" }}>*</span>
                      </label>
                      <div style={{ position: "relative" }}>
                        <select
                          value={firewallStatus}
                          onChange={(e) => setFirewallStatus(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "8px 32px 8px 12px",
                            fontSize: "13px",
                            border: "1px solid #d1d5db",
                            borderRadius: "6px",
                            backgroundColor: "#ffffff",
                            color: firewallStatus ? "#111827" : "#9ca3af",
                            cursor: "pointer",
                            appearance: "none"
                          }}
                        >
                          <option value="">Select status</option>
                          <option value="operational">Operational</option>
                          <option value="degraded">Degraded</option>
                          <option value="down">Down</option>
                        </select>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          style={{
                            position: "absolute",
                            right: "10px",
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
                    {/* VPN Access */}
                    <div>
                      <label style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#111827",
                        marginBottom: "6px"
                      }}>
                        VPN Access <span style={{ color: "#dc2626" }}>*</span>
                      </label>
                      <div style={{ position: "relative" }}>
                        <select
                          value={vpnAccess}
                          onChange={(e) => setVpnAccess(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "8px 32px 8px 12px",
                            fontSize: "13px",
                            border: "1px solid #d1d5db",
                            borderRadius: "6px",
                            backgroundColor: "#ffffff",
                            color: vpnAccess ? "#111827" : "#9ca3af",
                            cursor: "pointer",
                            appearance: "none"
                          }}
                        >
                          <option value="">Select status</option>
                          <option value="operational">Operational</option>
                          <option value="degraded">Degraded</option>
                          <option value="down">Down</option>
                        </select>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          style={{
                            position: "absolute",
                            right: "10px",
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
                    {/* Access Control */}
                    <div>
                      <label style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#111827",
                        marginBottom: "6px"
                      }}>
                        Access Control <span style={{ color: "#dc2626" }}>*</span>
                      </label>
                      <div style={{ position: "relative" }}>
                        <select
                          value={accessControl}
                          onChange={(e) => setAccessControl(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "8px 32px 8px 12px",
                            fontSize: "13px",
                            border: "1px solid #d1d5db",
                            borderRadius: "6px",
                            backgroundColor: "#ffffff",
                            color: accessControl ? "#111827" : "#9ca3af",
                            cursor: "pointer",
                            appearance: "none"
                          }}
                        >
                          <option value="">Select status</option>
                          <option value="operational">Operational</option>
                          <option value="degraded">Degraded</option>
                          <option value="down">Down</option>
                        </select>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          style={{
                            position: "absolute",
                            right: "10px",
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
                </div>

                {/* System Services Card */}
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
                        d="M3 2C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V5L10 2H3Z"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="5" cy="7" r="1" fill="#ffffff" />
                      <circle cx="11" cy="7" r="1" fill="#ffffff" />
                      <circle cx="5" cy="11" r="1" fill="#ffffff" />
                      <circle cx="11" cy="11" r="1" fill="#ffffff" />
                    </svg>
                    <span style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#ffffff"
                    }}>
                      System Services
                    </span>
                  </div>
                  <div style={{
                    padding: "16px",
                    backgroundColor: "#f5f3ff",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px"
                  }}>
                    {/* DNS Resolution */}
                    <div>
                      <label style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#111827",
                        marginBottom: "6px"
                      }}>
                        DNS Resolution <span style={{ color: "#dc2626" }}>*</span>
                      </label>
                      <div style={{ position: "relative" }}>
                        <select
                          value={dnsResolution}
                          onChange={(e) => setDnsResolution(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "8px 32px 8px 12px",
                            fontSize: "13px",
                            border: "1px solid #d1d5db",
                            borderRadius: "6px",
                            backgroundColor: "#ffffff",
                            color: dnsResolution ? "#111827" : "#9ca3af",
                            cursor: "pointer",
                            appearance: "none"
                          }}
                        >
                          <option value="">Select status</option>
                          <option value="operational">Operational</option>
                          <option value="degraded">Degraded</option>
                          <option value="down">Down</option>
                        </select>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          style={{
                            position: "absolute",
                            right: "10px",
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
                    {/* NTP Sync */}
                    <div>
                      <label style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#111827",
                        marginBottom: "6px"
                      }}>
                        NTP Sync <span style={{ color: "#dc2626" }}>*</span>
                      </label>
                      <div style={{ position: "relative" }}>
                        <select
                          value={ntpSync}
                          onChange={(e) => setNtpSync(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "8px 32px 8px 12px",
                            fontSize: "13px",
                            border: "1px solid #d1d5db",
                            borderRadius: "6px",
                            backgroundColor: "#ffffff",
                            color: ntpSync ? "#111827" : "#9ca3af",
                            cursor: "pointer",
                            appearance: "none"
                          }}
                        >
                          <option value="">Select status</option>
                          <option value="operational">Operational</option>
                          <option value="degraded">Degraded</option>
                          <option value="down">Down</option>
                        </select>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          style={{
                            position: "absolute",
                            right: "10px",
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
                    {/* Monitoring Agent */}
                    <div>
                      <label style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: "600",
                        color: "#111827",
                        marginBottom: "6px"
                      }}>
                        Monitoring Agent <span style={{ color: "#dc2626" }}>*</span>
                      </label>
                      <div style={{ position: "relative" }}>
                        <select
                          value={monitoringAgent}
                          onChange={(e) => setMonitoringAgent(e.target.value)}
                          style={{
                            width: "100%",
                            padding: "8px 32px 8px 12px",
                            fontSize: "13px",
                            border: "1px solid #d1d5db",
                            borderRadius: "6px",
                            backgroundColor: "#ffffff",
                            color: monitoringAgent ? "#111827" : "#9ca3af",
                            cursor: "pointer",
                            appearance: "none"
                          }}
                        >
                          <option value="">Select status</option>
                          <option value="operational">Operational</option>
                          <option value="degraded">Degraded</option>
                          <option value="down">Down</option>
                        </select>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          style={{
                            position: "absolute",
                            right: "10px",
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
                </div>
              </div>

              {/* Fields Below Cards */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px"
              }}>
                {/* Network Uptime */}
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "8px"
                  }}>
                    Network Uptime (%) <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={networkUptime}
                    onChange={(e) => setNetworkUptime(e.target.value)}
                    placeholder="Enter uptime percentage"
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

                {/* Redundancy Status */}
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "8px"
                  }}>
                    Redundancy Status <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <select
                      value={redundancyStatus}
                      onChange={(e) => setRedundancyStatus(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 40px 10px 12px",
                        fontSize: "14px",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        backgroundColor: "#ffffff",
                        color: redundancyStatus ? "#111827" : "#9ca3af",
                        cursor: "pointer",
                        appearance: "none"
                      }}
                    >
                      <option value="">Select redundancy status</option>
                      <option value="active_active">Active-Active</option>
                      <option value="active_passive">Active-Passive</option>
                      <option value="none">None</option>
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
                  Submit Network Availability
                </button>
              </div>
            </div>

            {/* Head Office Connectivity Verification Section */}
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
                    d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2Z"
                    stroke="#1e40af"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 2V8L11 10"
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
                  Head Office Connectivity Verification
                </h3>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px"
              }}>
                {/* Left Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* HO Connection Method */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      HO Connection Method <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        value={hoConnectionMethod}
                        onChange={(e) => setHoConnectionMethod(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 40px 10px 12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          color: hoConnectionMethod ? "#111827" : "#9ca3af",
                          cursor: "pointer",
                          appearance: "none"
                        }}
                      >
                        <option value="">Select connection method</option>
                        <option value="mpls">MPLS</option>
                        <option value="vpn">VPN</option>
                        <option value="leased_line">Leased Line</option>
                        <option value="site_to_site_vpn">Site-to-Site VPN</option>
                        <option value="sd_wan">SD-WAN</option>
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

                  {/* HO IP Address */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      HO IP Address <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={hoIpAddress}
                      onChange={(e) => setHoIpAddress(e.target.value)}
                      placeholder="Enter HO IP address"
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

                  {/* Ping Response Time */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Ping Response Time (ms) <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={pingResponseTime}
                      onChange={(e) => setPingResponseTime(e.target.value)}
                      placeholder="Enter ping time"
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

                  {/* Data Transfer Speed */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Data Transfer Speed (Mbps) <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={dataTransferSpeed}
                      onChange={(e) => setDataTransferSpeed(e.target.value)}
                      placeholder="Enter transfer speed"
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
                </div>

                {/* Right Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Application Connectivity */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Application Connectivity <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                      padding: "16px",
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
                          checked={applicationConnectivity.erpSystemAccess}
                          onChange={() => handleApplicationConnectivityChange("erpSystemAccess")}
                          style={{
                            width: "18px",
                            height: "18px",
                            cursor: "pointer"
                          }}
                        />
                        ERP System Access
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
                          checked={applicationConnectivity.emailServerAccess}
                          onChange={() => handleApplicationConnectivityChange("emailServerAccess")}
                          style={{
                            width: "18px",
                            height: "18px",
                            cursor: "pointer"
                          }}
                        />
                        Email Server Access
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
                          checked={applicationConnectivity.fileServerAccess}
                          onChange={() => handleApplicationConnectivityChange("fileServerAccess")}
                          style={{
                            width: "18px",
                            height: "18px",
                            cursor: "pointer"
                          }}
                        />
                        File Server Access
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
                          checked={applicationConnectivity.databaseConnectivity}
                          onChange={() => handleApplicationConnectivityChange("databaseConnectivity")}
                          style={{
                            width: "18px",
                            height: "18px",
                            cursor: "pointer"
                          }}
                        />
                        Database Connectivity
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
                          checked={applicationConnectivity.backupSystemAccess}
                          onChange={() => handleApplicationConnectivityChange("backupSystemAccess")}
                          style={{
                            width: "18px",
                            height: "18px",
                            cursor: "pointer"
                          }}
                        />
                        Backup System Access
                      </label>
                    </div>
                  </div>

                  {/* Connection Quality */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Connection Quality <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        value={connectionQuality}
                        onChange={(e) => setConnectionQuality(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 40px 10px 12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          color: connectionQuality ? "#111827" : "#9ca3af",
                          cursor: "pointer",
                          appearance: "none"
                        }}
                      >
                        <option value="">Select quality</option>
                        <option value="excellent">Excellent</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                        <option value="poor">Poor</option>
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

                  {/* Security Validation */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Security Validation <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        value={securityValidation}
                        onChange={(e) => setSecurityValidation(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 40px 10px 12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          color: securityValidation ? "#111827" : "#9ca3af",
                          cursor: "pointer",
                          appearance: "none"
                        }}
                      >
                        <option value="">Select validation status</option>
                        <option value="validated">Validated</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                        <option value="not_applicable">Not Applicable</option>
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
                  Submit HO Connectivity Verification
                </button>
              </div>
            </div>

            {/* Testing Results & Documentation Section */}
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
                    d="M2 12L6 8L9 11L14 4"
                    stroke="#1e40af"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 4H14V14H2V4Z"
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
                  Testing Results & Documentation
                </h3>
              </div>

              {/* File Upload Sections */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginBottom: "24px"
              }}>
                {/* Test Report Upload */}
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "8px"
                  }}>
                    Test Report Upload
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
                      id="test-report-upload"
                      accept=".pdf,.doc,.docx,.xls,.xlsx"
                      multiple
                      onChange={handleTestReportUpload}
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
                        d="M5 8H11M8 5V11"
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
                      Upload network test reports
                    </div>
                    <button
                      type="button"
                      onClick={() => document.getElementById("test-report-upload")?.click()}
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
                    {testReportFiles && (
                      <div style={{
                        marginTop: "8px",
                        fontSize: "12px",
                        color: "#10b981",
                        fontWeight: "500"
                      }}>
                        {testReportFiles.length} file(s) selected
                      </div>
                    )}
                  </div>
                </div>

                {/* Network Topology Diagram */}
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "8px"
                  }}>
                    Network Topology Diagram
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
                      id="topology-diagram-upload"
                      accept=".pdf,.jpg,.jpeg,.png,.svg"
                      onChange={handleTopologyDiagramUpload}
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
                      <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="12" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" />
                      <circle cx="8" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
                      <path
                        d="M5.5 5.5L6.5 10.5M9.5 5.5L7.5 10.5"
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
                      Upload network topology
                    </div>
                    <button
                      type="button"
                      onClick={() => document.getElementById("topology-diagram-upload")?.click()}
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
                    {networkTopologyDiagram && (
                      <div style={{
                        marginTop: "8px",
                        fontSize: "12px",
                        color: "#10b981",
                        fontWeight: "500"
                      }}>
                        {networkTopologyDiagram.name}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Text Areas */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "20px"
              }}>
                {/* Test Summary Notes */}
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "8px"
                  }}>
                    Test Summary Notes
                  </label>
                  <textarea
                    value={testSummaryNotes}
                    onChange={(e) => setTestSummaryNotes(e.target.value)}
                    placeholder="Summarize key findings from connectivity tests..."
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

                {/* Issues Identified */}
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "8px"
                  }}>
                    Issues Identified
                  </label>
                  <textarea
                    value={issuesIdentified}
                    onChange={(e) => setIssuesIdentified(e.target.value)}
                    placeholder="List any issues or concerns identified during testing..."
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

                {/* Recommendations */}
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "8px"
                  }}>
                    Recommendations
                  </label>
                  <textarea
                    value={recommendations}
                    onChange={(e) => setRecommendations(e.target.value)}
                    placeholder="Provide recommendations for optimization or issue resolution..."
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
                  Submit Testing Results
                </button>
              </div>
            </div>

            {/* Final IT Confirmation Section */}
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
                  Final IT Confirmation
                </h3>
              </div>

              {/* IT Link-up Verification Checklist */}
              <div style={{
                backgroundColor: "#f0fdf4",
                border: "1px solid #86efac",
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
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M13 4L6 11L3 8"
                      stroke="#16a34a"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="8"
                      cy="8"
                      r="7"
                      stroke="#16a34a"
                      strokeWidth="1.5"
                    />
                  </svg>
                  <h4 style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#15803d",
                    margin: 0
                  }}>
                    IT Link-up Verification Checklist
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
                    color: "#166534"
                  }}>
                    <input
                      type="checkbox"
                      checked={itLinkupChecklist.internetConnectivityTested}
                      onChange={() => handleChecklistChange("internetConnectivityTested")}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer"
                      }}
                    />
                    Internet connectivity tested and verified as stable
                  </label>
                  <label style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#166534"
                  }}>
                    <input
                      type="checkbox"
                      checked={itLinkupChecklist.localNetworkAvailabilityConfirmed}
                      onChange={() => handleChecklistChange("localNetworkAvailabilityConfirmed")}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer"
                      }}
                    />
                    Local network availability confirmed and operational
                  </label>
                  <label style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#166534"
                  }}>
                    <input
                      type="checkbox"
                      checked={itLinkupChecklist.hoConnectivityEstablished}
                      onChange={() => handleChecklistChange("hoConnectivityEstablished")}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer"
                      }}
                    />
                    Head Office connectivity established and verified
                  </label>
                  <label style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#166534"
                  }}>
                    <input
                      type="checkbox"
                      checked={itLinkupChecklist.securityProtocolsValidated}
                      onChange={() => handleChecklistChange("securityProtocolsValidated")}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer"
                      }}
                    />
                    Security protocols validated and functioning
                  </label>
                  <label style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#166534"
                  }}>
                    <input
                      type="checkbox"
                      checked={itLinkupChecklist.testDocumentationCompleted}
                      onChange={() => handleChecklistChange("testDocumentationCompleted")}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer"
                      }}
                    />
                    All test documentation completed and uploaded
                  </label>
                  <label style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    cursor: "pointer",
                    fontSize: "14px",
                    color: "#166534"
                  }}>
                    <input
                      type="checkbox"
                      checked={itLinkupChecklist.criticalApplicationsTested}
                      onChange={() => handleChecklistChange("criticalApplicationsTested")}
                      style={{
                        width: "20px",
                        height: "20px",
                        cursor: "pointer"
                      }}
                    />
                    Critical business applications tested and accessible
                  </label>
                </div>
              </div>

              {/* IT Specialist Name and Confirmation Date */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
                marginBottom: "24px"
              }}>
                {/* IT Specialist Name */}
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "8px"
                  }}>
                    IT Specialist Name <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <input
                    type="text"
                    value={itSpecialistName}
                    onChange={(e) => setItSpecialistName(e.target.value)}
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

                {/* Confirmation Date */}
                <div>
                  <label style={{
                    display: "block",
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "8px"
                  }}>
                    Confirmation Date <span style={{ color: "#dc2626" }}>*</span>
                  </label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      value={confirmationDate}
                      onChange={(e) => setConfirmationDate(e.target.value)}
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

              {/* IT Specialist Signature */}
              <div style={{ marginBottom: "24px" }}>
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#111827",
                  marginBottom: "8px"
                }}>
                  IT Specialist Signature <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <div
                  style={{
                    border: "2px dashed #d1d5db",
                    borderRadius: "8px",
                    padding: "40px",
                    textAlign: "center",
                    backgroundColor: "#f9fafb",
                    minHeight: "200px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative"
                  }}
                >
                  {signature ? (
                    <div style={{
                      fontSize: "14px",
                      color: "#10b981",
                      fontWeight: "500"
                    }}>
                      Document Signed
                    </div>
                  ) : (
                    <>
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" style={{ marginBottom: "16px", color: "#9ca3af" }}>
                        <path
                          d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        marginBottom: "16px"
                      }}>
                        Digital signature area
                      </div>
                      <button
                        type="button"
                        onClick={handleSignDocument}
                        style={{
                          padding: "10px 24px",
                          backgroundColor: "#1e40af",
                          color: "#ffffff",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "14px",
                          fontWeight: "600",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          transition: "background-color 0.2s"
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = "#1e3a8a"}
                        onMouseLeave={(e) => e.target.style.backgroundColor = "#1e40af"}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M8 2L2 6V10C2 12 5 14 8 15C11 14 14 12 14 10V6L8 2Z"
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
                        Sign Document
                      </button>
                    </>
                  )}
                </div>
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
                  onClick={handleRejectAndRetest}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#dc2626",
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
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#b91c1c"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#dc2626"}
                >
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M12 4L4 12M4 4L12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Reject & Request Retest
                </button>
                <button
                  onClick={handleConfirmAndProceed}
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
                  Confirm IT Link-up & Proceed
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

