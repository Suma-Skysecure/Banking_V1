"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import ToastNotification from "@/components/ToastNotification";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/agreementExecution.css";
import "@/css/businessApproval.css";

export default function DeliveryStatusUpdate() {
  const router = useRouter();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  
  // Form state
  const [actualDeliveryDate, setActualDeliveryDate] = useState("05-01-2026");
  const [actualDeliveryTime, setActualDeliveryTime] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [receivedBy, setReceivedBy] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState("");
  const [uploadedPhotos, setUploadedPhotos] = useState([]);

  // Payment form state
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDate, setPaymentDate] = useState("05-01-2026");
  const [transactionReference, setTransactionReference] = useState("");
  const [paymentNotes, setPaymentNotes] = useState("");
  const [paymentReceipt, setPaymentReceipt] = useState(null);

  // Completion Verification state
  const [allItemsDelivered, setAllItemsDelivered] = useState(false);
  const [qualityVerified, setQualityVerified] = useState(false);
  const [installationComplete, setInstallationComplete] = useState(false);
  const [clientSatisfied, setClientSatisfied] = useState(false);
  const [finalVerification, setFinalVerification] = useState(false);

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedPhotos(files);
    console.log("Photos uploaded:", files);
  };

  const handlePaymentReceiptUpload = (e) => {
    const file = e.target.files[0];
    setPaymentReceipt(file);
    console.log("Payment receipt uploaded:", file);
  };

  const handleSubmit = () => {
    console.log("Submitting delivery confirmation...", {
      actualDeliveryDate,
      actualDeliveryTime,
      deliveryStatus,
      receivedBy,
      deliveryNotes,
      uploadedPhotos
    });
    // Implement submission logic
  };

  const handlePaymentSubmit = () => {
    console.log("Submitting payment details...", {
      paymentStatus,
      paymentAmount,
      paymentMethod,
      paymentDate,
      transactionReference,
      paymentNotes,
      paymentReceipt
    });
    // Implement payment submission logic
  };

  const handleUpdateDeliveryStatus = () => {
    console.log("Updating delivery status...", {
      allItemsDelivered,
      qualityVerified,
      installationComplete,
      clientSatisfied,
      finalVerification
    });
    // Show success notification
    setShowNotification(true);
  };

  const handleProceedToNextStep = () => {
    console.log("Proceeding to next step...");
    // Navigate to Server Room Setup page
    router.push("/server-room-setup");
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
                Delivery Status Update
              </h1>
              <p style={{
                fontSize: "16px",
                color: "#6b7280"
              }}>
                Update delivery completion and payment details
              </p>
            </div>

            {/* Back to Delivery Portal Link */}
            <Link href="/delivery-team-portal" className="back-to-property-details">
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
              Back to Delivery Portal
            </Link>

            {/* Project Overview Card */}
            <div className="property-overview-card" style={{ marginTop: "24px" }}>
              <div className="property-overview-left">
                <h2 className="property-name-large" style={{ color: "#1e3a8a" }}>
                  Downtown Arts Plaza - Delivery Complete
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
                    color: "#065f46",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
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
                    Delivery Completed
                  </span>
                  <span style={{
                    fontSize: "14px",
                    color: "#6b7280"
                  }}>
                    Confirmation ID: DC-2025-001-FO-DTP
                  </span>
                </div>
              </div>
              <div className="property-overview-right">
                <div style={{
                  fontSize: "14px",
                  color: "#6b7280",
                  marginBottom: "4px"
                }}>
                  Total Project Value
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

            {/* Delivery Summary Section */}
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
                  Delivery Summary
                </h3>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "32px"
              }}>
                {/* Scheduled Details */}
                <div>
                  <h4 style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#6b7280",
                    marginBottom: "16px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}>
                    Scheduled Details
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
                        Expected Date
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#111827"
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
                        Time Slot
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#111827"
                      }}>
                        10:00 AM - 12:00 PM
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#9ca3af",
                        marginBottom: "4px"
                      }}>
                        Delivery Person
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#111827"
                      }}>
                        Miguel Santos
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
                        +1 (305) 555-0187
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Items */}
                <div>
                  <h4 style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#6b7280",
                    marginBottom: "16px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px"
                  }}>
                    Delivery Items
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
                        Conference Tables
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#111827"
                      }}>
                        3 Units
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#9ca3af",
                        marginBottom: "4px"
                      }}>
                        AV Equipment
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#111827"
                      }}>
                        Complete Set
                      </div>
                    </div>
                    <div>
                      <div style={{
                        fontSize: "12px",
                        color: "#9ca3af",
                        marginBottom: "4px"
                      }}>
                        Kitchen Appliances
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#111827"
                      }}>
                        5 Units
                      </div>
                    </div>
                  </div>
                </div>

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
                        Invoice ID
                      </div>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#111827"
                      }}>
                        EFS-2025-0089
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actual Delivery Confirmation Form Section */}
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
                  Actual Delivery Confirmation
                </h3>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px"
              }}>
                {/* Left Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Actual Delivery Date */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Actual Delivery Date <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        value={actualDeliveryDate}
                        onChange={(e) => setActualDeliveryDate(e.target.value)}
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
                      Date when delivery was actually completed
                    </p>
                  </div>

                  {/* Actual Delivery Time */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Actual Delivery Time <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        value={actualDeliveryTime}
                        onChange={(e) => setActualDeliveryTime(e.target.value)}
                        placeholder="--:--"
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
                        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M8 4V8L10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>

                  {/* Delivery Status */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Delivery Status <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        value={deliveryStatus}
                        onChange={(e) => setDeliveryStatus(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 40px 10px 12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          color: deliveryStatus ? "#111827" : "#9ca3af",
                          cursor: "pointer",
                          appearance: "none"
                        }}
                      >
                        <option value="">Select delivery status</option>
                        <option value="completed">Completed</option>
                        <option value="partial">Partially Completed</option>
                        <option value="delayed">Delayed</option>
                        <option value="rescheduled">Rescheduled</option>
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

                  {/* Received By */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Received By <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={receivedBy}
                      onChange={(e) => setReceivedBy(e.target.value)}
                      placeholder="Name of person who received delivery"
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
                  {/* Delivery Notes */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Delivery Notes
                    </label>
                    <textarea
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      placeholder="Any issues, delays, or special notes about the delivery..."
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

                  {/* Upload Delivery Photos */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Upload Delivery Photos
                    </label>
                    <div
                      style={{
                        border: "2px dashed #d1d5db",
                        borderRadius: "8px",
                        padding: "32px",
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
                        id="photo-upload"
                        multiple
                        accept="image/*"
                        onChange={handleFileUpload}
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
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ margin: "0 auto 16px", color: "#9ca3af" }}>
                        <path
                          d="M7 16C4.23858 16 2 13.7614 2 11C2 8.23858 4.23858 6 7 6C7.33312 6 7.66021 6.03141 7.97822 6.09117M9.75773 6.09117C10.0968 5.52447 10.5484 5.02693 11.0854 4.63007C11.6314 4.22754 12.2615 3.93011 12.9442 3.75685C13.627 3.58359 14.3468 3.53882 15.0539 3.6257C15.7611 3.71258 16.4415 3.92914 17.0607 4.26219C17.6798 4.59524 18.2262 5.03851 18.6701 5.56736C19.1141 6.09621 19.4477 6.70114 19.653 7.35194C19.8583 8.00273 19.9316 8.68808 19.8688 9.36719C19.806 10.0463 19.6084 10.707 19.2868 11.3162C18.9653 11.9254 18.5259 12.4722 17.9921 12.9277"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15 13L12 10M12 10L9 13M12 10V21"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#111827",
                        marginBottom: "8px"
                      }}>
                        Drag and drop photos or click to browse
                      </div>
                      <button
                        type="button"
                        onClick={() => document.getElementById("photo-upload")?.click()}
                        style={{
                          padding: "10px 24px",
                          backgroundColor: "#1e40af",
                          color: "#ffffff",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "14px",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "background-color 0.2s",
                          marginTop: "8px"
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = "#1e3a8a"}
                        onMouseLeave={(e) => e.target.style.backgroundColor = "#1e40af"}
                      >
                        Choose Files
                      </button>
                      {uploadedPhotos.length > 0 && (
                        <div style={{
                          marginTop: "12px",
                          fontSize: "12px",
                          color: "#10b981",
                          fontWeight: "500"
                        }}>
                          {uploadedPhotos.length} file(s) selected
                        </div>
                      )}
                    </div>
                    <p style={{
                      fontSize: "12px",
                      color: "#6b7280",
                      marginTop: "8px",
                      margin: "8px 0 0 0"
                    }}>
                      Upload photos of delivered items and installation
                    </p>
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
                  Submit Confirmation
                </button>
              </div>
            </div>

            {/* Payment Details Update Form Section */}
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
                    d="M8 1V15M3 6L8 1L13 6"
                    stroke="#1e40af"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 10H6M10 10H14"
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
                  Payment Details Update
                </h3>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px"
              }}>
                {/* Left Column */}
                <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Payment Summary */}
                  <div style={{
                    backgroundColor: "#eff6ff",
                    border: "1px solid #bfdbfe",
                    borderRadius: "8px",
                    padding: "20px"
                  }}>
                    <h4 style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "16px"
                    }}>
                      Payment Summary
                    </h4>
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px"
                    }}>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}>
                        <span style={{
                          fontSize: "14px",
                          color: "#6b7280"
                        }}>
                          Total Contract Value:
                        </span>
                        <span style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#111827"
                        }}>
                          $125,000.00
                        </span>
                      </div>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}>
                        <span style={{
                          fontSize: "14px",
                          color: "#6b7280"
                        }}>
                          Advance Paid:
                        </span>
                        <span style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#111827"
                        }}>
                          $37,500.00
                        </span>
                      </div>
                      <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "12px",
                        borderTop: "1px solid #bfdbfe"
                      }}>
                        <span style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#111827"
                        }}>
                          Balance Due:
                        </span>
                        <span style={{
                          fontSize: "16px",
                          fontWeight: "700",
                          color: "#1e40af"
                        }}>
                          $87,500.00
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Status */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Payment Status <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        value={paymentStatus}
                        onChange={(e) => setPaymentStatus(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 40px 10px 12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          color: paymentStatus ? "#111827" : "#9ca3af",
                          cursor: "pointer",
                          appearance: "none"
                        }}
                      >
                        <option value="">Select payment status</option>
                        <option value="pending">Pending</option>
                        <option value="partial">Partial Payment</option>
                        <option value="completed">Completed</option>
                        <option value="overdue">Overdue</option>
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

                  {/* Payment Amount */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Payment Amount <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <span style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#6b7280"
                      }}>
                        $
                      </span>
                      <input
                        type="text"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        placeholder="0.00"
                        style={{
                          width: "100%",
                          padding: "10px 12px 10px 28px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          color: "#111827"
                        }}
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Payment Method <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "10px 40px 10px 12px",
                          fontSize: "14px",
                          border: "1px solid #d1d5db",
                          borderRadius: "6px",
                          backgroundColor: "#ffffff",
                          color: paymentMethod ? "#111827" : "#9ca3af",
                          cursor: "pointer",
                          appearance: "none"
                        }}
                      >
                        <option value="">Select payment method</option>
                        <option value="bank_transfer">Bank Transfer</option>
                        <option value="check">Check</option>
                        <option value="credit_card">Credit Card</option>
                        <option value="cash">Cash</option>
                        <option value="wire_transfer">Wire Transfer</option>
                        <option value="online_payment">Online Payment</option>
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
                  {/* Payment Date */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Payment Date <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        value={paymentDate}
                        onChange={(e) => setPaymentDate(e.target.value)}
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

                  {/* Transaction Reference */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Transaction Reference
                    </label>
                    <input
                      type="text"
                      value={transactionReference}
                      onChange={(e) => setTransactionReference(e.target.value)}
                      placeholder="Enter transaction ID or reference number"
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

                  {/* Payment Notes */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Payment Notes
                    </label>
                    <textarea
                      value={paymentNotes}
                      onChange={(e) => setPaymentNotes(e.target.value)}
                      placeholder="Additional notes about payment processing..."
                      rows="4"
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

                  {/* Upload Payment Receipt */}
                  <div>
                    <label style={{
                      display: "block",
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#111827",
                      marginBottom: "8px"
                    }}>
                      Upload Payment Receipt
                    </label>
                    <div
                      style={{
                        border: "2px dashed #d1d5db",
                        borderRadius: "8px",
                        padding: "32px",
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
                        id="receipt-upload"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handlePaymentReceiptUpload}
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
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" style={{ margin: "0 auto 16px", color: "#9ca3af" }}>
                        <path
                          d="M4 4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4H4Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 10H16M8 14H16M6 6H18"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#111827",
                        marginBottom: "8px"
                      }}>
                        Upload payment receipt or confirmation
                      </div>
                      <button
                        type="button"
                        onClick={() => document.getElementById("receipt-upload")?.click()}
                        style={{
                          padding: "10px 24px",
                          backgroundColor: "#1e40af",
                          color: "#ffffff",
                          border: "none",
                          borderRadius: "6px",
                          fontSize: "14px",
                          fontWeight: "600",
                          cursor: "pointer",
                          transition: "background-color 0.2s",
                          marginTop: "8px"
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = "#1e3a8a"}
                        onMouseLeave={(e) => e.target.style.backgroundColor = "#1e40af"}
                      >
                        Choose File
                      </button>
                      {paymentReceipt && (
                        <div style={{
                          marginTop: "12px",
                          fontSize: "12px",
                          color: "#10b981",
                          fontWeight: "500"
                        }}>
                          {paymentReceipt.name}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div style={{ marginTop: "32px", display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={handlePaymentSubmit}
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
                  Update Payment Details
                </button>
              </div>
            </div>

            {/* Completion Verification Section */}
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
                  Completion Verification
                </h3>
              </div>

              {/* Verification Steps Cards */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "16px",
                marginBottom: "24px"
              }}>
                {/* All Items Delivered */}
                <div style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "12px"
                }}>
                  <input
                    type="checkbox"
                    checked={allItemsDelivered}
                    onChange={(e) => setAllItemsDelivered(e.target.checked)}
                    style={{
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                      alignSelf: "flex-start"
                    }}
                  />
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ color: "#f97316" }}>
                    <path
                      d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 21V11C16 9.89543 15.1046 9 14 9H10C8.89543 9 8 9.89543 8 11V21"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M2 11L12 2L22 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827"
                  }}>
                    All Items Delivered
                  </div>
                </div>

                {/* Quality Verified */}
                <div style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "12px"
                }}>
                  <input
                    type="checkbox"
                    checked={qualityVerified}
                    onChange={(e) => setQualityVerified(e.target.checked)}
                    style={{
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                      alignSelf: "flex-start"
                    }}
                  />
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ color: "#f97316" }}>
                    <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827"
                  }}>
                    Quality Verified
                  </div>
                </div>

                {/* Installation Complete */}
                <div style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "12px"
                }}>
                  <input
                    type="checkbox"
                    checked={installationComplete}
                    onChange={(e) => setInstallationComplete(e.target.checked)}
                    style={{
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                      alignSelf: "flex-start"
                    }}
                  />
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ color: "#f97316" }}>
                    <path
                      d="M14.7 6.3C15.1 5.9 15.1 5.3 14.7 4.9C14.3 4.5 13.7 4.5 13.3 4.9L7 11.2L4.7 8.9C4.3 8.5 3.7 8.5 3.3 8.9C2.9 9.3 2.9 9.9 3.3 10.3L6.3 13.3C6.7 13.7 7.3 13.7 7.7 13.3L14.7 6.3Z"
                      fill="currentColor"
                    />
                    <path
                      d="M20 14L17 11M17 11L20 8M17 11H3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827"
                  }}>
                    Installation Complete
                  </div>
                </div>

                {/* Client Satisfied */}
                <div style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "12px"
                }}>
                  <input
                    type="checkbox"
                    checked={clientSatisfied}
                    onChange={(e) => setClientSatisfied(e.target.checked)}
                    style={{
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                      alignSelf: "flex-start"
                    }}
                  />
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ color: "#f97316" }}>
                    <path
                      d="M7 22V11L2 13V4L13 1V12L18 10V19L7 22Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7 12L13 9V20L7 22V12Z"
                      fill="currentColor"
                      fillOpacity="0.3"
                    />
                  </svg>
                  <div style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#111827"
                  }}>
                    Client Satisfied
                  </div>
                </div>
              </div>

              {/* Final Verification Required */}
              <div style={{
                backgroundColor: "#fef9c3",
                border: "1px solid #fde047",
                borderRadius: "8px",
                padding: "20px",
                marginBottom: "24px"
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px"
                }}>
                  <svg width="24" height="24" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0, marginTop: "2px" }}>
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
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "#92400e",
                      marginBottom: "12px"
                    }}>
                      Final Verification Required
                    </div>
                    <label style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      cursor: "pointer"
                    }}>
                      <input
                        type="checkbox"
                        checked={finalVerification}
                        onChange={(e) => setFinalVerification(e.target.checked)}
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                          marginTop: "2px",
                          flexShrink: 0
                        }}
                      />
                      <span style={{
                        fontSize: "14px",
                        color: "#78350f",
                        lineHeight: "1.6"
                      }}>
                        I confirm that the delivery has been completed successfully, all items have been verified for quality and completeness, payment details have been updated accurately, and the client has signed off on the installation. This project phase is ready to proceed to the next step.
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px"
              }}>
                <button
                  onClick={handleUpdateDeliveryStatus}
                  disabled={!finalVerification}
                  style={{
                    padding: "14px 24px",
                    backgroundColor: finalVerification ? "#f3f4f6" : "#f9fafb",
                    color: finalVerification ? "#374151" : "#9ca3af",
                    border: `1px solid ${finalVerification ? "#d1d5db" : "#e5e7eb"}`,
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: finalVerification ? "pointer" : "not-allowed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "all 0.2s",
                    opacity: finalVerification ? 1 : 0.6
                  }}
                  onMouseEnter={(e) => {
                    if (finalVerification) {
                      e.target.style.backgroundColor = "#e5e7eb";
                      e.target.style.borderColor = "#9ca3af";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (finalVerification) {
                      e.target.style.backgroundColor = "#f3f4f6";
                      e.target.style.borderColor = "#d1d5db";
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
                  Update Delivery Status
                </button>
                <button
                  onClick={handleProceedToNextStep}
                  disabled={!finalVerification}
                  style={{
                    padding: "14px 24px",
                    backgroundColor: finalVerification ? "#f3f4f6" : "#f9fafb",
                    color: finalVerification ? "#374151" : "#9ca3af",
                    border: `1px solid ${finalVerification ? "#d1d5db" : "#e5e7eb"}`,
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: finalVerification ? "pointer" : "not-allowed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "all 0.2s",
                    opacity: finalVerification ? 1 : 0.6
                  }}
                  onMouseEnter={(e) => {
                    if (finalVerification) {
                      e.target.style.backgroundColor = "#e5e7eb";
                      e.target.style.borderColor = "#9ca3af";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (finalVerification) {
                      e.target.style.backgroundColor = "#f3f4f6";
                      e.target.style.borderColor = "#d1d5db";
                    }
                  }}
                >
                  Proceed to Next Step
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 12L10 8L6 4"
                      stroke="currentColor"
                      strokeWidth="2"
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

      {/* Toast Notification */}
      <ToastNotification
        show={showNotification}
        message="Delivery status updated successfully"
        type="success"
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
}

