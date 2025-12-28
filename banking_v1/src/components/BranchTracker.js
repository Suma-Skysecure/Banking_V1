"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import WorkflowTimeline from "@/components/WorkflowTimeline";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";

export default function BranchTracker() {
  const [viewMode, setViewMode] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [cityFilter, setCityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const branches = [
    {
      id: 1,
      name: "Downtown Manhattan Branch",
      stage: "Legal Workflow",
      stageColor: "blue",
      progress: 45,
      pendingAction: "red",
    },
    {
      id: 2,
      name: "Beverly Hills Boutique",
      stage: "Completed",
      stageColor: "green",
      progress: 100,
      pendingAction: "green",
    },
    {
      id: 3,
      name: "Chicago River North Site",
      stage: "Project Execution",
      stageColor: "purple",
      progress: 80,
      pendingAction: "green",
    },
    {
      id: 4,
      name: "Miami South Beach Location",
      stage: "Business Approval",
      stageColor: "yellow",
      progress: 65,
      pendingAction: "yellow",
    },
    {
      id: 5,
      name: "Seattle Waterfront Project",
      stage: "On Hold",
      stageColor: "grey",
      progress: 20,
      pendingAction: "grey",
    },
  ];

  const getProgressColor = (progress) => {
    if (progress === 100) return "green";
    if (progress >= 50) return "orange";
    return "grey";
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
          <button className="header-icon-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 2L12.5 7.5L18.5 8.5L14 12.5L15 18.5L10 15.5L5 18.5L6 12.5L1.5 8.5L7.5 7.5L10 2Z"
                fill="#6b7280"
              />
            </svg>
          </button>
          <div className="header-profile">
            <div className="profile-avatar">AW</div>
          </div>
        </div>
      </header>

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content Area */}
        <main className="dashboard-main">
          <div className="main-content">
            <h1 className="page-title">Branch Tracker</h1>

            {/* Filters and Controls */}
            <div className="controls-bar">
              <div className="filters-group">
                <label className="filter-label">
                  City:
                  <select
                    className="filter-select"
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                  >
                    <option value="all">All Cities</option>
                    <option value="manhattan">Manhattan</option>
                    <option value="beverly">Beverly Hills</option>
                    <option value="chicago">Chicago</option>
                    <option value="miami">Miami</option>
                    <option value="seattle">Seattle</option>
                  </select>
                </label>
                <label className="filter-label">
                  Status:
                  <select
                    className="filter-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="all">All Statuses</option>
                    <option value="legal">Legal Workflow</option>
                    <option value="completed">Completed</option>
                    <option value="execution">Project Execution</option>
                    <option value="approval">Business Approval</option>
                    <option value="hold">On Hold</option>
                  </select>
                </label>
                <label className="filter-label">
                  Date:
                  <input
                    type="date"
                    className="filter-date"
                    placeholder="dd-mm-yyyy"
                  />
                </label>
              </div>
              <div className="view-controls">
                <button
                  className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                  onClick={() => setViewMode("list")}
                >
                  List
                </button>
                <button
                  className={`view-btn ${viewMode === "kanban" ? "active" : ""}`}
                  onClick={() => setViewMode("kanban")}
                >
                  Kanban
                </button>
                <button className="add-branch-btn">
                  <span>+</span> Add New Branch
                </button>
              </div>
            </div>

            {/* Branch Table */}
            <div className="table-container">
              <table className="branch-table">
                <thead>
                  <tr>
                    <th>BRANCH NAME</th>
                    <th>CURRENT STAGE</th>
                    <th>OVERALL PROGRESS</th>
                    <th>PENDING ACTION</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {branches.map((branch) => (
                    <tr key={branch.id}>
                      <td className="branch-name">{branch.name}</td>
                      <td>
                        <span className={`stage-badge ${branch.stageColor}`}>
                          {branch.stage}
                        </span>
                      </td>
                      <td>
                        <div className="progress-container">
                          <div className="progress-bar-wrapper">
                            <div
                              className={`progress-bar ${getProgressColor(branch.progress)}`}
                              style={{ width: `${branch.progress}%` }}
                            ></div>
                          </div>
                          <span className="progress-text">{branch.progress}%</span>
                        </div>
                      </td>
                      <td>
                        <div
                          className={`action-dot ${branch.pendingAction}`}
                        ></div>
                      </td>
                      <td>
                        <a href="#" className="view-details-link">
                          View Details
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="pagination-container">
              <div className="pagination-info">
                Showing 1 to 5 of 25 entries
              </div>
              <div className="pagination-controls">
                <button
                  className="pagination-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  &lt;&lt; Prev
                </button>
                <button
                  className={`pagination-btn ${currentPage === 1 ? "active" : ""}`}
                  onClick={() => setCurrentPage(1)}
                >
                  1
                </button>
                <button
                  className={`pagination-btn ${currentPage === 2 ? "active" : ""}`}
                  onClick={() => setCurrentPage(2)}
                >
                  2
                </button>
                <button
                  className={`pagination-btn ${currentPage === 3 ? "active" : ""}`}
                  onClick={() => setCurrentPage(3)}
                >
                  3
                </button>
                <button
                  className="pagination-btn"
                  disabled={currentPage === 3}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next &gt;&gt;
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
