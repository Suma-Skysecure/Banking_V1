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

  /* 🔐 Allow only IT team */
  useEffect(() => {
    if (user && user.role !== "IT team") {
      router.push("/dashboard");
    }
  }, [user, router]);

  /* ✅ MARK AS IN PROGRESS WHEN PAGE OPENS */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("itStatuses") || "{}");

    if (!stored[branchId] || stored[branchId].status === "Pending") {
      stored[branchId] = {
        status: "In Progress",
        progress: 20,
      };

      localStorage.setItem("itStatuses", JSON.stringify(stored));
    }
  }, [branchId]);

  /* ✅ UPDATE STATUS FROM CHECKLIST */
  const handleStatusUpdate = (status, progress = 100) => {
    const stored = JSON.parse(localStorage.getItem("itStatuses") || "{}");

    stored[branchId] = {
      status,
      progress,
    };

    localStorage.setItem("itStatuses", JSON.stringify(stored));
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

        <UserProfile variant="header" showLogout={false} />
      </header>

      <div className="dashboard-content-wrapper">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main content */}
        <main className="dashboard-main">
          <div className="main-content">
            <h1 className="page-title">
              IT Feasibility Assessment
            </h1>

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
