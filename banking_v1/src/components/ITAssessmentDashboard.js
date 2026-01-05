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
  { id: 1, name: "Downtown Manhattan Branch", category: "business", city: "New York", date: "2023-10-15" },
  { id: 2, name: "Beverly Hills Boutique", category: "retail", city: "Los Angeles", date: "2023-11-02" },
  { id: 3, name: "Chicago River North Site", category: "business", city: "Chicago", date: "2023-09-28" },
  { id: 4, name: "Miami South Beach Location", category: "business", city: "Miami", date: "2023-12-10" },
  { id: 5, name: "Seattle Waterfront Project", category: "commercial", city: "Seattle", date: "2024-01-05" },
  { id: 6, name: "New York Financial District", category: "business", city: "New York", date: "2023-10-20" },
];

/* ===================== DASHBOARD ===================== */

export default function ITAssessmentDashboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [itStatuses, setItStatuses] = useState({});

  // Filters State
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedDate, setSelectedDate] = useState("");
  const [viewMode, setViewMode] = useState("List"); // List or Kanban

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
    const cities = ALL_BRANCHES.map(b => b.city);
    return ["All Cities", ...new Set(cities)];
  }, []);

  /* ===================== BUILD DISPLAY DATA ===================== */
  const branches = useMemo(() => {
    return ALL_BRANCHES.filter((branch) => {
      const stored = itStatuses[branch.id] || {};
      const status = stored.status || "Pending";

      // Filter Logic
      const matchCity = selectedCity === "All Cities" || branch.city === selectedCity;
      const matchStatus = selectedStatus === "All Statuses" || status === selectedStatus;
      const matchDate = !selectedDate || branch.date === selectedDate;

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
  }, [itStatuses, selectedCity, selectedStatus, selectedDate]);

  /* ===================== ACCESS CONTROL ===================== */
  if (user?.role !== "IT team" && user?.role !== "BRT team") return null;

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

              <div className="view-controls">
                <button
                  className={`view-btn ${viewMode === "List" ? "active" : ""}`}
                  onClick={() => setViewMode("List")}
                >
                  List
                </button>
                <button
                  className={`view-btn ${viewMode === "Kanban" ? "active" : ""}`}
                  onClick={() => setViewMode("Kanban")}
                >
                  Kanban
                </button>
                <button className="add-branch-btn">
                  <span>+</span> Add New Branch
                </button>
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
