"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import DashboardHeader from "@/components/DashboardHeader";
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
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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

