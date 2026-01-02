"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import PropertySummaryCard from "@/components/PropertySummaryCard";
import LayoutDesignSection from "@/components/LayoutDesignSection";
import LayoutDesignApproval from "@/components/LayoutDesignApproval";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/postLOIActivities.css";

export default function PostLOILayoutDesign() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
                d="M10 2C10.5523 2 11 2.44772 11 3V4H15C15.5523 4 16 4.44772 16 5C16 5.55228 15.5523 6 15 6H5C4.44772 6 4 5.55228 4 5C4 4.44772 4.44772 4 5 4H9V3C9 2.44772 9.44772 2 10 2Z"
                fill="#6b7280"
              />
              <path
                d="M5 8H15L14.4 15.2C14.3 16.8 13 18 11.4 18H8.6C7 18 5.7 16.8 5.6 15.2L5 8Z"
                fill="#6b7280"
              />
            </svg>
          </button>
          <div className="header-profile">
            <div className="profile-avatar">
              {user?.name ? (user.name.split(" ").length > 1 
                ? (user.name.split(" ")[0][0] + user.name.split(" ")[1][0]).toUpperCase()
                : user.name.substring(0, 2).toUpperCase())
                : "U"}
            </div>
            <div className="profile-info">
              <span className="profile-name">{user?.role || "User"}</span>
              <span className="profile-email">{user?.email || user?.username || ""}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="dashboard-main">
          <div className="main-content">
            <PageHeader
              title="POST LOI - Layout Design"
              subtitle="Layout Design Team - Design Approvals"
            />

            {/* Property Summary Card */}
            <PropertySummaryCard
              propertyName="Downtown Arts Plaza"
              address="1450 Biscayne Boulevard, Miami, FL 33132"
              propertyId="PROP-MIA-2024-002"
              propertyValue={new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(5800000 * 83.5)}
              badgeText="Layout Design Pending"
              badgeIcon="clock"
              rightLabel="Layout Design Requested on Dec 18, 2024"
              showValue={true}
              mapPinColor="#ef4444"
            />

            {/* Layout Design Section */}
            <LayoutDesignSection />

            {/* Layout Design Approval */}
            <LayoutDesignApproval />
          </div>
        </main>
      </div>
    </div>
  );
}

