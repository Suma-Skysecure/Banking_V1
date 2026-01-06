"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import DashboardHeader from "@/components/DashboardHeader";
import PropertySummaryCard from "@/components/PropertySummaryCard";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/postLOIActivities.css";

export default function SecurityDepositPayment() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("card");

  // Property and payment data
  const propertyValue = 5800000;
  const depositPercentage = 10;
  const securityDepositAmount = (propertyValue * depositPercentage) / 100;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount * 83.5);
  };

  // Check if user is Vendor role to show Vendor Creation instead
  const isVendorRole = user?.role === "Vendor";
  const pageTitle = isVendorRole ? "Vendor Creation" : "Term Sheet Approval";
  const pageSubtitle = isVendorRole 
    ? "Create and manage vendor information" 
    : "Review and approve term sheet payments for property acquisition";

  return (
    <div className="dashboard-container">
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="dashboard-main">
          <div className="main-content">
            <PageHeader
              title={pageTitle}
              subtitle={pageSubtitle}
            />

            {/* Property Summary Card */}
            <PropertySummaryCard
              propertyName="Downtown Arts Plaza"
              address="1450 Biscayne Boulevard, Miami, FL 33132"
              propertyId="PROP-MIA-2024-002"
              propertyValue={formatCurrency(propertyValue)}
              badgeText="Pending Payment Approval"
              badgeIcon="clock"
              rightLabel="Property Value"
              showValue={true}
              mapPinColor="#ef4444"
            />

            {/* Security Deposit Payment Section */}
            <div className="business-details-card">
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
                <h3 className="card-title">Security Deposit Payment</h3>
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
                          {formatCurrency(propertyValue)}
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
                          {formatCurrency(securityDepositAmount)}
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
                      // Handle payment processing logic here
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
                    Pay Now - {formatCurrency(securityDepositAmount)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
