"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import UserProfile from "@/components/UserProfile";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";

/* ===================== BRANCH DATA ===================== */

const ALL_BRANCHES = [
  { id: 1, name: "Downtown Manhattan Branch", category: "business" },
  { id: 2, name: "Beverly Hills Boutique", category: "retail" },
  { id: 3, name: "Chicago River North Site", category: "business" },
  { id: 4, name: "Miami South Beach Location", category: "business" },
  { id: 5, name: "Seattle Waterfront Project", category: "commercial" },
  { id: 6, name: "New York Financial District", category: "business" },
];

/* ===================== DASHBOARD ===================== */

export default function ITAssessmentDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [itStatuses, setItStatuses] = useState({});

  /* ===================== LOAD STATUS (CORRECT) ===================== */
  useEffect(() => {
    const loadStatuses = () => {
      const stored = localStorage.getItem("itStatuses");
      setItStatuses(stored ? JSON.parse(stored) : {});
    };

    // Initial load
    loadStatuses();

    // Reload when user navigates back from assessment
    window.addEventListener("focus", loadStatuses);

    return () => window.removeEventListener("focus", loadStatuses);
  }, []);

  /* ===================== ACCESS CONTROL ===================== */
  if (user?.role !== "IT team" && user?.role !== "BRT team") return null;

  /* ===================== BUILD DISPLAY DATA ===================== */
  const branches = useMemo(() => {
    return ALL_BRANCHES.map((branch) => {
      const stored = itStatuses[branch.id] || {};
      const status = stored.status || "Pending";
      const progress = typeof stored.progress === "number" ? stored.progress : 0;

      let displayStage = "Pending IT Assessment";
      let displayStageColor = "blue";

      if (status === "In Progress") {
        displayStage = "IT Assessment In Progress";
        displayStageColor = "yellow";
      }

      if (status === "Completed") {
        displayStage = "IT Assessment Completed";
        displayStageColor = "green";
      }

      if (status === "Pending Approval") {
        displayStage = "Pending BRT Approval";
        displayStageColor = "orange";
      }

      if (status === "Rejected") {
        displayStage = "IT Assessment Rejected";
        displayStageColor = "red";
      }

      return {
        ...branch,
        status,
        progress,
        displayStage,
        displayStageColor,
      };
    });
  }, [itStatuses]);

  /* ===================== ACTIONS ===================== */

  const handleView = (branchId) => {
    router.push(`/it/assessment/${branchId}`);
  };

  const handleApprove = (branchId) => {
    if (!confirm("Approve IT assessment?")) return;

    const updated = {
      ...itStatuses,
      [branchId]: { status: "Completed", progress: 100 },
    };

    setItStatuses(updated);
    localStorage.setItem("itStatuses", JSON.stringify(updated));
  };

  const handleReject = (branchId) => {
    if (!confirm("Reject IT assessment?")) return;

    const prevProgress = itStatuses[branchId]?.progress || 50;

    const updated = {
      ...itStatuses,
      [branchId]: { status: "Rejected", progress: prevProgress },
    };

    setItStatuses(updated);
    localStorage.setItem("itStatuses", JSON.stringify(updated));
  };

  /* ===================== UI ===================== */

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <button
          className="header-hamburger"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
        <UserProfile variant="header" />
      </header>

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="dashboard-main">
          <div className="main-content">
            <h1 className="page-title">IT Feasibility Assessment</h1>

            <div className="table-container">
              <table className="branch-table">
                <thead>
                  <tr>
                    <th>Branch Name</th>
                    <th>Stage</th>
                    <th>Progress</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {branches.map((b) => (
                    <tr key={b.id}>
                      <td>
                        <div className="branch-info">
                          <div className="branch-name">{b.name}</div>
                          <div className="branch-category">{b.category}</div>
                        </div>
                      </td>

                      <td>
                        <span className={`stage-badge ${b.displayStageColor}`}>
                          {b.displayStage}
                        </span>
                      </td>

                      <td>
                        <div className="progress-container">
                          <div className="progress-bar-wrapper">
                            <div
                              className={`progress-bar ${b.displayStageColor}`}
                              style={{ width: `${b.progress}%` }}
                            />
                          </div>
                          <span className="progress-text">{b.progress}%</span>
                        </div>
                      </td>

                      <td>
                        <span className={`status-badge ${b.displayStageColor}`}>
                          {b.status}
                        </span>
                      </td>

                      <td>
                        {user.role === "IT team" && (
                          <span
                            className="view-details-link"
                            onClick={() => handleView(b.id)}
                          >
                            View
                          </span>
                        )}

                        {user.role === "BRT team" && (
                          <>
                            <button
                              className="action-btn approve-btn"
                              onClick={() => handleApprove(b.id)}
                            >
                              Approve
                            </button>
                            <button
                              className="action-btn reject-btn"
                              onClick={() => handleReject(b.id)}
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}
