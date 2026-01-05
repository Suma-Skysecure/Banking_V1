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

export default function DeliveryTeamPortal() {
  const router = useRouter();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Form state
  const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("19-01-2026");
  const [deliveryPersonName, setDeliveryPersonName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [vehicleDetails, setVehicleDetails] = useState("");
  const [estimatedDeliveryTime, setEstimatedDeliveryTime] = useState("");
  const [numberOfShipments, setNumberOfShipments] = useState("1");
  const [deliveryTimelineDetails, setDeliveryTimelineDetails] = useState("");
  const [confirmationChecked, setConfirmationChecked] = useState(true);

  // Documents data
  const documents = [
    { name: "Floor Plan Layout", size: "2.4 MB", date: "Jan 5, 2025" },
    { name: "Electrical Drawings", size: "1.8 MB", date: "Jan 5, 2025" },
    { name: "Furniture Specifications", size: "3.1 MB", date: "Jan 5, 2025" },
    { name: "Material Specifications", size: "1.5 MB", date: "Jan 5, 2025" },
    { name: "3D Renderings", size: "5.2 MB", date: "Jan 5, 2025" },
    { name: "Safety Guidelines", size: "890 KB", date: "Jan 5, 2025" },
  ];

  const totalSize = "14.8 MB";

  const handleDownloadAll = () => {
    console.log("Downloading all documents...");
    // Implement download all functionality
  };

  const handleDownload = (documentName) => {
    console.log(`Downloading ${documentName}...`);
    // Implement individual download functionality
  };

  const handleConfirmDelivery = () => {
    console.log("Confirming delivery details...", {
      expectedDeliveryDate,
      deliveryPersonName,
      contactNumber,
      vehicleDetails,
      estimatedDeliveryTime,
      numberOfShipments,
      deliveryTimelineDetails,
    });
    // Navigate to Delivery Status Update page
    router.push("/delivery-status-update");
  };

  const handleSaveDraft = () => {
    console.log("Saving draft...");
    // Implement save draft functionality
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
              <span className="profile-email">delivery@pms.com</span>
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
                Delivery Team Portal
              </h1>
              <p style={{
                fontSize: "16px",
                color: "#6b7280"
              }}>
                Review project details and confirm delivery timeline.
              </p>
            </div>

            {/* Back to Project Execution Link */}
            <Link href="/fit-out-vendor-process" className="back-to-property-details">
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
                  Downtown Arts Plaza - Fit Out Delivery
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
                    backgroundColor: "#fff7ed",
                    color: "#c2410c",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path
                        d="M8 2L3 5V11C3 13.2091 5.79086 16 8 16C10.2091 16 13 13.2091 13 11V5L8 2Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Awaiting Delivery Confirmation
                  </span>
                  <span style={{
                    fontSize: "14px",
                    color: "#6b7280"
                  }}>
                    Request ID: FO-DTP-2024-002
                  </span>
                </div>
              </div>
              <div className="property-overview-right">
                <div style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  marginBottom: "4px"
                }}>
                  Project Budget
                </div>
                <div style={{
                  fontSize: "32px",
                  fontWeight: "700",
                  color: "#1e3a8a",
                  marginBottom: "4px"
                }}>
                  $125,000
                </div>
              </div>
            </div>

            {/* Project Details Section */}
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
                  <circle cx="8" cy="8" r="7" stroke="#1e40af" strokeWidth="1.5" />
                  <path d="M8 6V8M8 10H8.01" stroke="#1e40af" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <h3 style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#111827",
                  margin: 0
                }}>
                  Project Details
                </h3>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "32px"
              }}>
                {/* Vendor Information */}
                <div>
                  <h4 style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#6b7280",
                    marginBottom: "16px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}>
                    Vendor Information
                  </h4>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                  }}>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#9ca3af",
                        marginBottom: "4px"
                      }}>
                        Company
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#111827"
                      }}>
                        Elite Fit Out Solutions
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#9ca3af",
                        marginBottom: "4px"
                      }}>
                        Project Manager
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#111827"
                      }}>
                        John Martinez
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#9ca3af",
                        marginBottom: "4px"
                      }}>
                        Contact
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#111827"
                      }}>
                        +1 (305) 555-0123
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#9ca3af",
                        marginBottom: "4px"
                      }}>
                        Email
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#111827"
                      }}>
                        j.martinez@elitefitout.com
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scope of Work */}
                <div>
                  <h4 style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#6b7280",
                    marginBottom: "16px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}>
                    Scope of Work
                  </h4>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                  }}>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#9ca3af",
                        marginBottom: "4px"
                      }}>
                        Total Area
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#111827"
                      }}>
                        2,500 sq ft
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#9ca3af",
                        marginBottom: "4px"
                      }}>
                        Work Type
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#111827"
                      }}>
                        Complete Office Fit Out
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#9ca3af",
                        marginBottom: "4px"
                      }}>
                        Workstations
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#111827"
                      }}>
                        25 Units
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#9ca3af",
                        marginBottom: "4px"
                      }}>
                        Conference Rooms
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#111827"
                      }}>
                        3 Rooms
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#9ca3af",
                        marginBottom: "4px"
                      }}>
                        Special Items
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#111827"
                      }}>
                        AV Equipment, Kitchen
                      </div>
                    </div>
                  </div>
                </div>

                {/* Request Details */}
                <div>
                  <h4 style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#6b7280",
                    marginBottom: "16px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}>
                    Request Details
                  </h4>
                  <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px"
                  }}>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#9ca3af",
                        marginBottom: "4px"
                      }}>
                        Request Date
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#111827"
                      }}>
                        Jan 5, 2025
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#9ca3af",
                        marginBottom: "4px"
                      }}>
                        Requested By
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#111827"
                      }}>
                        Ana Miller
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#9ca3af",
                        marginBottom: "4px"
                      }}>
                        Tentative Date
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#dc2626"
                      }}>
                        Feb 16, 2025
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#9ca3af",
                        marginBottom: "4px"
                      }}>
                        Status
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#f97316"
                      }}>
                        Pending Confirmation
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Notes Section */}
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
                marginBottom: "16px"
              }}>
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 2C3.44772 2 3 2.44772 3 3V13C3 13.5523 3.44772 14 4 14H12C12.5523 14 13 13.5523 13 13V5L9 2H4Z"
                    stroke="#1e40af"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 2V5H13"
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
                  Additional Notes
                </h3>
              </div>
              <p style={{
                fontSize: "14px",
                color: "#4b5563",
                lineHeight: "1.6",
                margin: 0
              }}>
                All materials to be delivered in original packaging. Workstations require assembly on-site. AV equipment installation to be coordinated with IT team. Kitchen appliances must meet energy efficiency standards.
              </p>
            </div>

            {/* Project Documents Section */}
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
                    d="M4 2C3.44772 2 3 2.44772 3 3V13C3 13.5523 3.44772 14 4 14H12C12.5523 14 13 13.5523 13 13V5L9 2H4Z"
                    stroke="#1e40af"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 2V5H13"
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
                  Project Documents
                </h3>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "24px",
                marginBottom: "24px"
              }}>
                {documents.map((doc, index) => (
                  <div
                    key={index}
                    style={{
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      padding: "16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px"
                    }}
                  >
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px"
                    }}>
                      <div style={{
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#fee2e2",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <svg width="24" height="24" viewBox="0 0 16 16" fill="none">
                          <path
                            d="M4 2C3.44772 2 3 2.44772 3 3V13C3 13.5523 3.44772 14 4 14H12C12.5523 14 13 13.5523 13 13V5L9 2H4Z"
                            fill="#dc2626"
                          />
                          <path
                            d="M9 2V5H13"
                            stroke="white"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
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
                          PDF • {doc.size}
                        </div>
                      </div>
                    </div>
                    <div style={{
                      fontSize: "12px",
                      color: "#9ca3af",
                      marginTop: "4px"
                    }}>
                      Uploaded {doc.date}
                    </div>
                    <button
                      onClick={() => handleDownload(doc.name)}
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#ffffff",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#1e40af",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "6px"
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#eff6ff";
                        e.target.style.borderColor = "#3b82f6";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#ffffff";
                        e.target.style.borderColor = "#d1d5db";
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M8 2V10M8 10L5 7M8 10L11 7"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2 12V13C2 14.1046 2.89543 15 4 15H12C13.1046 15 14 14.1046 14 13V12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Download
                    </button>
                  </div>
                ))}
              </div>

              {/* Download All Button */}
              <button
                onClick={handleDownloadAll}
                style={{
                  width: "100%",
                  padding: "12px 24px",
                  backgroundColor: "#1e40af",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "background-color 0.2s"
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "#1e3a8a"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "#1e40af"}
              >
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 2V10M8 10L5 7M8 10L11 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12V13C2 14.1046 2.89543 15 4 15H12C13.1046 15 14 14.1046 14 13V12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Download All Documents ({totalSize})
              </button>
            </div>

            {/* Delivery Confirmation Form Section */}
            <div style={{
              backgroundColor: "#ffffff",
              border: "1px solid #bfdbfe",
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
                    d="M2 4L8 1L14 4V11C14 13.2091 11.3137 15 8 15C4.68629 15 2 13.2091 2 11V4Z"
                    stroke="#1e40af"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 1V15"
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
                  Delivery Confirmation
                </h3>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px"
              }}>
                {/* Left Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Expected Delivery Date */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Expected Delivery Date <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        value={expectedDeliveryDate}
                        onChange={(e) => setExpectedDeliveryDate(e.target.value)}
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
                    <p style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      marginTop: "4px",
                      margin: "4px 0 0 0"
                    }}>
                      Select the confirmed delivery date for all materials
                    </p>
                  </div>

                  {/* Delivery Person Name */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Delivery Person Name <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={deliveryPersonName}
                      onChange={(e) => setDeliveryPersonName(e.target.value)}
                      placeholder="Enter full name"
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

                  {/* Contact Number */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Contact Number <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      type="tel"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      placeholder="+1 (___) ___-____"
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

                  {/* Vehicle Details */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Vehicle Details
                    </label>
                    <input
                      type="text"
                      value={vehicleDetails}
                      onChange={(e) => setVehicleDetails(e.target.value)}
                      placeholder="Vehicle type and registration number"
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
                  {/* Estimated Delivery Time */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Estimated Delivery Time <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <select
                      value={estimatedDeliveryTime}
                      onChange={(e) => setEstimatedDeliveryTime(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        fontSize: "14px",
                        border: "1px solid #d1d5db",
                        borderRadius: "6px",
                        backgroundColor: "#ffffff",
                        color: estimatedDeliveryTime ? "#111827" : "#9ca3af",
                        cursor: "pointer"
                      }}
                    >
                      <option value="">Select time slot</option>
                      <option value="08:00-10:00">08:00 - 10:00</option>
                      <option value="10:00-12:00">10:00 - 12:00</option>
                      <option value="12:00-14:00">12:00 - 14:00</option>
                      <option value="14:00-16:00">14:00 - 16:00</option>
                      <option value="16:00-18:00">16:00 - 18:00</option>
                    </select>
                  </div>

                  {/* Number of Shipments */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Number of Shipments
                    </label>
                    <input
                      type="number"
                      value={numberOfShipments}
                      onChange={(e) => setNumberOfShipments(e.target.value)}
                      min="1"
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
                    <p style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      marginTop: "4px",
                      margin: "4px 0 0 0"
                    }}>
                      If materials arrive in multiple shipments
                    </p>
                  </div>

                  {/* Delivery Timeline Details */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Delivery Timeline Details <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <textarea
                      value={deliveryTimelineDetails}
                      onChange={(e) => setDeliveryTimelineDetails(e.target.value)}
                      placeholder="Provide detailed timeline including setup and installation schedule..."
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
            </div>

            {/* Important Delivery Instructions */}
            <div style={{
              backgroundColor: "#fef3c7",
              border: "1px solid #fcd34d",
              borderRadius: "8px",
              padding: "20px",
              marginTop: "24px"
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px"
              }}>
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2Z"
                    stroke="#d97706"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 6V9M8 11H8.01"
                    stroke="#d97706"
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
                  Important Delivery Instructions
                </h4>
              </div>
              <ul style={{
                margin: 0,
                paddingLeft: "20px",
                fontSize: "14px",
                color: "#78350f",
                lineHeight: "1.8",
                listStyle: "disc"
              }}>
                <li>Coordinate with site manager 24 hours before delivery</li>
                <li>Ensure all materials are properly labeled and packaged</li>
                <li>Delivery access available only during business hours (8 AM - 6 PM)</li>
                <li>Loading dock reservation required for large shipments</li>
                <li>All delivery personnel must sign in at security desk</li>
              </ul>
            </div>

            {/* Confirmation Checkbox */}
            <div style={{ marginTop: "24px" }}>
              <label style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "12px",
                cursor: "pointer"
              }}>
                <input
                  type="checkbox"
                  checked={confirmationChecked}
                  onChange={(e) => setConfirmationChecked(e.target.checked)}
                  style={{
                    width: "18px",
                    height: "18px",
                    marginTop: "2px",
                    cursor: "pointer",
                    flexShrink: 0
                  }}
                />
                <span style={{
                  fontSize: "14px",
                  color: "#4b5563",
                  lineHeight: "1.6"
                }}>
                  I confirm that all delivery details are accurate and I have reviewed the project requirements and documentation. I understand that any changes to the delivery schedule must be communicated at least 48 hours in advance.
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: "flex",
              gap: "16px",
              marginTop: "32px",
              paddingBottom: "32px"
            }}>
              <button
                onClick={handleConfirmDelivery}
                disabled={!confirmationChecked}
                style={{
                  flex: 1,
                  padding: "14px 24px",
                  backgroundColor: confirmationChecked ? "#f97316" : "#d1d5db",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: confirmationChecked ? "pointer" : "not-allowed",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  transition: "background-color 0.2s"
                }}
                onMouseEnter={(e) => {
                  if (confirmationChecked) {
                    e.target.style.backgroundColor = "#ea580c";
                  }
                }}
                onMouseLeave={(e) => {
                  if (confirmationChecked) {
                    e.target.style.backgroundColor = "#f97316";
                  }
                }}
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
                Confirm Delivery Details
              </button>
              <button
                onClick={handleSaveDraft}
                style={{
                  padding: "14px 32px",
                  backgroundColor: "#ffffff",
                  color: "#1e40af",
                  border: "2px solid #1e40af",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
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
                    d="M3 8V13C3 13.5523 3.44772 14 4 14H12C12.5523 14 13 13.5523 13 13V8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 6L8 3L11 6"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 3V10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Save as Draft
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

