"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { useAuth } from "@/contexts/AuthContext";
import { filterBranchesByRole } from "@/config/roleStageMapping";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";

/* ===================== DASHBOARD ===================== */

export default function ITAssessmentDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [itStatuses, setItStatuses] = useState({});
  const [customBranches, setCustomBranches] = useState([]);

  // Filters State
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedDate, setSelectedDate] = useState("");

  // Load custom branches from localStorage on mount
  useEffect(() => {
    const loadBranches = () => {
      const savedBranches = localStorage.getItem("customBranches");
      if (savedBranches) {
        try {
          const branches = JSON.parse(savedBranches);
          // Filter branches for IT team stages
          const itStages = ["Property Search", "Business Approval", "Legal Workflow", "Project Execution", "Agreement Execution"];
          const filteredBranches = branches.filter(branch =>
            branch.stage && itStages.includes(branch.stage) &&
            branch.stage !== "Completed" &&
            branch.stage !== "On Hold"
          );
          setCustomBranches(filteredBranches);
        } catch (error) {
          console.error("Error loading custom branches:", error);
        }
      }
    };

    loadBranches();

    // Listen for storage changes
    const handleStorageChange = (e) => {
      if (e.key === "customBranches") {
        loadBranches();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Also listen for custom events (for same-tab updates)
    const handleBranchUpdate = () => {
      loadBranches();
    };

    window.addEventListener("customBranchesUpdated", handleBranchUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("customBranchesUpdated", handleBranchUpdate);
    };
  }, []);

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

  /* ===================== UNIQUE CITIES ===================== */
  const uniqueCities = useMemo(() => {
    const cities = customBranches.map(b => b.city || "");
    return ["All Cities", ...new Set(cities.filter(c => c))];
  }, [customBranches]);

  /* ===================== BUILD DISPLAY DATA ===================== */
  const branches = useMemo(() => {
    return customBranches.filter((branch) => {
      const stored = itStatuses[branch.id] || {};
      const status = stored.status || "Pending";

      // Filter Logic
      const matchCity = selectedCity === "All Cities" || (branch.city && branch.city === selectedCity);
      const matchStatus = selectedStatus === "All Statuses" || status === selectedStatus;
      const matchDate = !selectedDate || (branch.createdAt && new Date(branch.createdAt).toISOString().split('T')[0] === selectedDate);

      return matchCity && matchStatus && matchDate;
    }).map((branch) => {
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
        displayStage = "BRT Rejected - Redo Assessment";
        displayStageColor = "red";
      }

      return {
        ...branch,
        status,
        progress: progress || branch.progress || 0,
        displayStage,
        displayStageColor,
        category: branch.category || "",
      };
    });
  }, [customBranches, itStatuses, selectedCity, selectedStatus, selectedDate]);

  /* ===================== ACCESS CONTROL ===================== */
  if (user?.role !== "IT team" && user?.role !== "BRT" && user?.role !== "BRT team") return null;

  /* ===================== ACTIONS ===================== */

  const handleView = (branchId) => {
    // Force full page load to ensure data freshness
    window.location.href = `/it/assessment/${branchId}`;
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
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="dashboard-main">
          <div className="main-content">
            <h1 className="page-title">IT Feasibility Assessment</h1>

            {/* Controls Bar */}
            <div className="controls-bar">
              <div className="filters-group">
                <label className="filter-label">
                  City:
                  <select
                    className="filter-select"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    {uniqueCities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </label>

                <label className="filter-label">
                  Status:
                  <select
                    className="filter-select"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="All Statuses">All Statuses</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending Approval">Pending Approval</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </label>

                <label className="filter-label">
                  Date:
                  <input
                    type="date"
                    className="filter-date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </label>
              </div>
            </div>

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
                          <div className="branch-name">{b.name || "N/A"}</div>
                          <div className="branch-category">{b.category || b.city || ""}</div>
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

                        {(user.role === "BRT" || user.role === "BRT team") && (
                          <>
                            <span
                              className="view-details-link"
                              onClick={() => handleView(b.id)}
                              style={{ marginRight: '10px' }}
                            >
                              View
                            </span>
                            {b.status === "Pending Approval" && (
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
