"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import UserProfile from "@/components/UserProfile";
import ITFeasibilityChecklist from "@/components/ITFeasibilityChecklist";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";

export default function ITAssessmentPage() {
  const router = useRouter();
  const { branchId } = useParams();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentStatus, setCurrentStatus] = useState("Pending");

  /* 🔐 Allow only IT team and BRT team */
  useEffect(() => {
    if (user && user.role !== "IT team" && user.role !== "BRT team") {
      router.push("/dashboard");
    }
  }, [user, router]);

  /* ✅ MARK AS IN PROGRESS WHEN PAGE OPENS */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("itStatuses") || "{}");

    if (stored[branchId]) {
      setCurrentStatus(stored[branchId].status || "Pending");
    }

    // Only auto-start if it's Pending and user is IT team (BRT just views)
    if ((!stored[branchId] || stored[branchId].status === "Pending") && user?.role === "IT team") {
      stored[branchId] = {
        status: "In Progress",
        progress: 20,
      };

      localStorage.setItem("itStatuses", JSON.stringify(stored));
      setCurrentStatus("In Progress");
    }
  }, [branchId, user]);

  /* ✅ UPDATE STATUS FROM CHECKLIST */
  const handleStatusUpdate = (status, progress = 100) => {
    const stored = JSON.parse(localStorage.getItem("itStatuses") || "{}");

    stored[branchId] = {
      status,
      progress,
    };

    localStorage.setItem("itStatuses", JSON.stringify(stored));
    setCurrentStatus(status);
  };

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <button
          className="header-hamburger"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>

        <button
          className="back-btn"
          onClick={() => router.push("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "#06b6d4", // Cyan color similar to screenshot
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "13px",
            fontWeight: "600"
          }}>
            IT
          </div>
          <div style={{ lineHeight: "1.2" }}>
            <div style={{ fontSize: "13px", fontWeight: "600", color: "#1f2937" }}>ITteam</div>
            <div style={{ fontSize: "11px", color: "#6b7280" }}>ITteam@kotakbank.com</div>
          </div>
        </div>
      </header>

      <div className="dashboard-content-wrapper">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main content */}
        <main className="dashboard-main">
          <div className="main-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <h1 className="page-title" style={{ marginBottom: 0 }}>
                IT Feasibility Assessment
              </h1>
              {currentStatus && (
                <span
                  style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    backgroundColor: currentStatus === 'Completed' ? '#dcfce7' : currentStatus === 'Rejected' ? '#fee2e2' : currentStatus === 'Pending Approval' ? '#ffedd5' : '#fef9c3',
                    color: currentStatus === 'Completed' ? '#166534' : currentStatus === 'Rejected' ? '#991b1b' : currentStatus === 'Pending Approval' ? '#9a3412' : '#854d0e',
                    border: '1px solid currentColor'
                  }}>
                  {currentStatus === 'Completed' ? 'Approved' : currentStatus}
                </span>
              )}
            </div>

            <ITFeasibilityChecklist
              branchId={branchId}
              onStatusUpdate={handleStatusUpdate}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
