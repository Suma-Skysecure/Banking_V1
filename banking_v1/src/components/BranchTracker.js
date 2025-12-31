"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import DashboardTable from "@/components/DashboardTable";
import UserProfile from "@/components/UserProfile";
import { useAuth } from "@/contexts/AuthContext";
import { filterBranchesByRole } from "@/config/roleStageMapping";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";

// All available branches - in production, this would come from an API
const ALL_BRANCHES = [
  {
    id: 1,
    name: "Downtown Manhattan Branch",
    stage: "Legal Workflow",
    stageColor: "blue",
    progress: 45,
    pendingAction: "red",
    category: "business",
  },
  {
    id: 2,
    name: "Beverly Hills Boutique",
    stage: "Completed",
    stageColor: "green",
    progress: 100,
    pendingAction: "green",
    category: "retail",
  },
  {
    id: 3,
    name: "Chicago River North Site",
    stage: "Project Execution",
    stageColor: "purple",
    progress: 80,
    pendingAction: "green",
    category: "business",
  },
  {
    id: 4,
    name: "Miami South Beach Location",
    stage: "Business Approval",
    stageColor: "yellow",
    progress: 65,
    pendingAction: "yellow",
    category: "business",
  },
  {
    id: 5,
    name: "Seattle Waterfront Project",
    stage: "On Hold",
    stageColor: "grey",
    progress: 20,
    pendingAction: "grey",
    category: "commercial",
  },
  {
    id: 6,
    name: "New York Financial District",
    stage: "Property Search",
    stageColor: "orange",
    progress: 30,
    pendingAction: "yellow",
    category: "business",
  },
];

export default function BranchTracker() {
  const router = useRouter();
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [cityFilter, setCityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Map stage names to routes - static mapping for optimal performance
  const getStageRoute = (stage) => {
    const stageRouteMap = {
      "Property Search": "/property-search",
      "Business Approval": "/business-approval",
      "Legal Workflow": "/legal-workflow",
      "Project Execution": "/project-execution",
      "Agreement Execution": "/agreement-execution",
      "Agreement Registration": "/agreement-registration",
      "Post-LOI Activities": "/post-loi-activities",
      "On Hold": null, // No redirect for On Hold
      "Completed": null, // No redirect for Completed
    };
    return stageRouteMap[stage] || null;
  };

  const handleViewDetails = (e, branch) => {
    e.preventDefault();
    // Redirect to current stage page based on branch stage
    const route = getStageRoute(branch?.stage);
    if (route) {
      router.push(route);
    }
  };

  // Filter branches based on user role using role-to-stage mapping
  // Each role will only see branches in stages assigned to them
  // Optimized with useMemo to prevent unnecessary re-filtering
  const branches = useMemo(() => {
    if (!user?.role) {
      // If no user role, return empty array (don't show all branches)
      return [];
    }
    return filterBranchesByRole(ALL_BRANCHES, user.role);
  }, [user?.role]);

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
          <UserProfile variant="header" showLogout={false} />
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
                <button 
                  className="add-branch-btn"
                  onClick={() => setIsModalOpen(true)}
                >
                  <span>+</span> Add New Branch
                </button>
              </div>
            </div>

            {/* Branch Table - Reusable Component */}
            <DashboardTable 
              branches={branches}
              onViewDetails={handleViewDetails}
              getProgressColor={getProgressColor}
            />

            {/* Pagination */}
            <div className="pagination-container">
              <div className="pagination-info">
                Showing 1 to {Math.min(branches.length, 5)} of {branches.length} entries
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

      {/* Create New Branch Modal */}
      {isModalOpen && (
        <CreateBranchModal 
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

// Create New Branch Modal Component
function CreateBranchModal({ onClose }) {
  const [formData, setFormData] = useState({
    city: "",
    locationName: "",
    numberOfBranches: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveDraft = () => {
    // Handle save draft logic here
    console.log("Saving draft:", formData);
    // You can add logic to save to localStorage or state
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Submitting form:", formData);
    // You can add API call or state update here
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Create New Branch</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15 5L5 15M5 5L15 15"
                stroke="#6b7280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-field">
            <label className="form-label">
              City <span className="required-asterisk">*</span>
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Select City</option>
              <option value="manhattan">Manhattan</option>
              <option value="beverly">Beverly Hills</option>
              <option value="chicago">Chicago</option>
              <option value="miami">Miami</option>
              <option value="seattle">Seattle</option>
            </select>
          </div>

          <div className="form-field">
            <label className="form-label">
              Location Name <span className="required-asterisk">*</span>
            </label>
            <input
              type="text"
              name="locationName"
              value={formData.locationName}
              onChange={handleChange}
              className="form-input"
              placeholder="e.g., Downtown Manhattan Branch"
              required
            />
          </div>

          <div className="form-field">
            <label className="form-label">
              Number of Branches <span className="required-asterisk">*</span>
            </label>
            <input
              type="number"
              name="numberOfBranches"
              value={formData.numberOfBranches}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter number of branches"
              min="1"
              required
            />
          </div>

          <div className="form-info-box">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 1C4.13401 1 1 4.13401 1 8C1 11.866 4.13401 15 8 15C11.866 15 15 11.866 15 8C15 4.13401 11.866 1 8 1ZM8 11.5C7.58579 11.5 7.25 11.1642 7.25 10.75C7.25 10.3358 7.58579 10 8 10C8.41421 10 8.75 10.3358 8.75 10.75C8.75 11.1642 8.41421 11.5 8 11.5ZM7.25 8.75V5.25C7.25 4.83579 7.58579 4.5 8 4.5C8.41421 4.5 8.75 4.83579 8.75 5.25V8.75C8.75 9.16421 8.41421 9.5 8 9.5C7.58579 9.5 7.25 9.16421 7.25 8.75Z"
                fill="#1e40af"
              />
            </svg>
            <span>All fields marked with * are mandatory</span>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn-save-draft"
              onClick={handleSaveDraft}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 2H11.5L14 4.5V14C14 14.5523 13.5523 15 13 15H3C2.44772 15 2 14.5523 2 14V2Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 15V10H11V15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2 2V6H14"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Save Draft
            </button>
            <button type="submit" className="btn-submit">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 8L14 1M14 1L9.5 14M14 1L1 8L9.5 14"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
