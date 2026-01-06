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
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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
        <div className="header-search">
          <svg
            className="search-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M11.5 10.5L15 14M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7Z"
              stroke="#6b7280"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search branch..."
            className="header-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="search-btn"
            title="Search branches"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M11.5 10.5L15 14M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="header-actions">
          {/* Trash Icon */}
          <button className="header-icon-btn" title="Delete Notifications">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>

          {/* Star Icon */}
          <button className="header-icon-btn" title="Favorites">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#6b7280" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </button>

          <button className="header-icon-btn notification-btn" onClick={() => setShowNotifications(!showNotifications)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="#6b7280" stroke="none">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <span className="notification-badge">3</span>
          </button>
          <UserProfile variant="header" />
        </div>

        {/* Notification Dropdown */}
        {showNotifications && (
          <div className="notification-dropdown">
            <div className="notification-header">
              <h4>Notifications</h4>
            </div>
            <div className="notification-list">
              <div className="notification-item" onClick={() => { setShowNotifications(false); }}>
                <div className="notification-icon">🔔</div>
                <div className="notification-content">
                  <div className="notification-title">New branch pending IT Feasibility</div>
                  <div className="notification-time">2 hours ago</div>
                </div>
              </div>
              <div className="notification-item" onClick={() => { setShowNotifications(false); }}>
                <div className="notification-icon">✅</div>
                <div className="notification-content">
                  <div className="notification-title">IT assessment approved</div>
                  <div className="notification-time">1 day ago</div>
                </div>
              </div>
              <div className="notification-item" onClick={() => { setShowNotifications(false); }}>
                <div className="notification-icon">❌</div>
                <div className="notification-content">
                  <div className="notification-title">IT assessment marked not feasible</div>
                  <div className="notification-time">3 days ago</div>
                </div>
              </div>
            </div>
          </div>
        )}
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
