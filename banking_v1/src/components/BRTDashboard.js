"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/Sidebar";
import NotificationDropdown from "@/components/NotificationDropdown";
import UserProfile from "@/components/UserProfile";
import DashboardTable from "@/components/DashboardTable";
import "@/css/branchTracker.css";

/**
 * BRTDashboard Component
 * 
 * Dashboard for BRT users showing BRT confirmation items
 */
export default function BRTDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // BRT Confirmation items - only BRT-related data
  const brtConfirmations = [
    {
      id: 1,
      name: "BRT Confirmation",
      stage: "Pending",
      stageColor: "yellow",
      progress: 50,
      pendingAction: "active",
    },
  ];

  const handleViewDetails = (e, item) => {
    e.preventDefault();
    // Navigate to BRT Details page with Legal and IT Feasibility sections
    router.push("/brt-details");
  };

  const getProgressColor = (progress) => {
    if (progress === 100) return "green";
    if (progress >= 50) return "yellow";
    return "red";
  };

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
        <div className="header-search" style={{ flex: 1, maxWidth: "400px" }}>
          <div style={{ fontSize: "18px", fontWeight: "700", color: "#1e3a8a" }}>
            BRT Dashboard
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
            {/* Page Header */}
            <div style={{ marginBottom: "24px" }}>
              <h1 style={{ fontSize: "32px", fontWeight: "700", color: "#1e3a8a", margin: "0 0 8px 0" }}>
                Branch Tracker
              </h1>
              <p style={{ fontSize: "16px", color: "#6b7280", margin: 0 }}>
                Manage BRT confirmation activities
              </p>
            </div>

            {/* BRT Confirmations Table */}
            <div className="business-details-card" style={{ marginBottom: "24px" }}>
              <div className="card-header">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="card-icon"
                >
                  <path
                    d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="card-title">BRT Confirmations</h3>
              </div>
              <div style={{ padding: "20px" }}>
                <DashboardTable
                  branches={brtConfirmations}
                  onViewDetails={handleViewDetails}
                  getProgressColor={getProgressColor}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
