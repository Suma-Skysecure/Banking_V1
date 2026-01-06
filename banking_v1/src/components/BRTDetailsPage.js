"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/Sidebar";
import NotificationDropdown from "@/components/NotificationDropdown";
import UserProfile from "@/components/UserProfile";
import BRTLegalSection from "@/components/BRTLegalSection";
import BRTITFeasibilitySection from "@/components/BRTITFeasibilitySection";
import "@/css/branchTracker.css";

/**
 * BRTDetailsPage Component
 * 
 * Details page showing both Legal and IT Feasibility sections
 * Reuses BRTLegalSection and BRTITFeasibilitySection components
 */
export default function BRTDetailsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("legal");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="dashboard-container">
      {/* Top Header Bar */}
      <header className="dashboard-header">
        <button
          className="header-hamburger"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="hamburger-icon"
          >
            <path
              d="M3 5H17M3 10H17M3 15H17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div className="header-search" style={{ flex: 1, maxWidth: "400px", display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            onClick={() => router.push("/dashboard")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              backgroundColor: "transparent",
              color: "#1e3a8a",
              border: "1px solid #1e3a8a",
              borderRadius: "6px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#1e3a8a";
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#1e3a8a";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back
          </button>
          <div style={{ fontSize: "18px", fontWeight: "700", color: "#1e3a8a" }}>
            BRT Details
          </div>
        </div>
        <div className="header-actions">
          <NotificationDropdown />
          <UserProfile variant="header" showLogout={true} />
        </div>
      </header>

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content Area */}
        <main className="dashboard-main">
          <div className="main-content">
            {/* Tabs */}
            <div style={{ 
              marginBottom: "24px", 
              borderBottom: "1px solid #e5e7eb" 
            }}>
              <div style={{ display: "flex", gap: "32px" }}>
                <button
                  onClick={() => setActiveTab("legal")}
                  style={{
                    padding: "16px 4px",
                    borderBottom: activeTab === "legal" ? "2px solid #3b82f6" : "2px solid transparent",
                    fontSize: "14px",
                    fontWeight: activeTab === "legal" ? "600" : "500",
                    color: activeTab === "legal" ? "#3b82f6" : "#6b7280",
                    background: "none",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== "legal") {
                      e.target.style.color = "#374151";
                      e.target.style.borderBottomColor = "#d1d5db";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== "legal") {
                      e.target.style.color = "#6b7280";
                      e.target.style.borderBottomColor = "transparent";
                    }
                  }}
                >
                  Legal Clearance
                </button>
                <button
                  onClick={() => setActiveTab("it-feasibility")}
                  style={{
                    padding: "16px 4px",
                    borderBottom: activeTab === "it-feasibility" ? "2px solid #3b82f6" : "2px solid transparent",
                    fontSize: "14px",
                    fontWeight: activeTab === "it-feasibility" ? "600" : "500",
                    color: activeTab === "it-feasibility" ? "#3b82f6" : "#6b7280",
                    background: "none",
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== "it-feasibility") {
                      e.target.style.color = "#374151";
                      e.target.style.borderBottomColor = "#d1d5db";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== "it-feasibility") {
                      e.target.style.color = "#6b7280";
                      e.target.style.borderBottomColor = "transparent";
                    }
                  }}
                >
                  IT Feasibility
                </button>
              </div>
            </div>

            {/* Tab Content - Reusing existing components */}
            <div>
              {activeTab === "legal" && <BRTLegalSection />}
              {activeTab === "it-feasibility" && <BRTITFeasibilitySection />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

