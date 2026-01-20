"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import DashboardTable from "@/components/DashboardTable";
import UserProfile from "@/components/UserProfile";
import NotificationDropdown from "@/components/NotificationDropdown";
import { useAuth } from "@/contexts/AuthContext";
import { filterBranchesByRole } from "@/config/roleStageMapping";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";

// All available branches - in production, this would come from an API
// Empty array - only branches created by users will be shown
const ALL_BRANCHES = [];

export default function BranchTracker() {
  const router = useRouter();
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [cityFilter, setCityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [customBranches, setCustomBranches] = useState([]);

  // Load custom branches from localStorage on mount
  useEffect(() => {
    const savedBranches = localStorage.getItem("customBranches");
    if (savedBranches) {
      try {
        setCustomBranches(JSON.parse(savedBranches));
      } catch (error) {
        console.error("Error loading custom branches:", error);
      }
    }
  }, []);

  // Map stage names to routes - static mapping for optimal performance
  const getStageRoute = useCallback((stage) => {
    const stageRouteMap = {
      "Property Search": "/property-search",
      "Business Approval": "/business-approval",
      "Legal Workflow": "/legal-workflow",
      "Legal Clearance": "/legal-due",
      "Project Execution": "/project-execution",
      "Security guard deployment": "/legal-verification",
      "PO to material vendor for Bought out Items": "/project-execution",
      "Drawings to fit-out vendor": "/fit-out-vendor-process",
      "PO to fit-out vendor": "/fit-out-vendor-po",
      "Site Update": "/project-execution",
      "Application for telephone connection": "/telephonic-connection-setup",
      "Site Measurement": "/post-loi-activities",
      "Agreement Execution": "/agreement-execution",
      "Agreement Registration": "/agreement-registration",
      "Agreement to Account": "/pim-update-rent-release",
      "Advance to fit_out Vendor": "/accounts-review-process-orders",
      "Post-LOI Activities": "/post-loi-activities",
      "Layout Design": "/post-loi-layout-design",
      "TSA (Stamp duty)": "/term-sheet-approval",
      "TSA (Security Deposit)": "/security-deposit-payment",
      "Vendor": "/vendor-creation",
      "Budget approval": "/budget-approval",
      "Stampduty approval": "/stamp-duty-payment-approval",
      "On Hold": null, // No redirect for On Hold
      "Completed": null, // No redirect for Completed
    };
    return stageRouteMap[stage] || null;
  }, []);

  const handleDelete = useCallback((branch) => {
    if (window.confirm(`Are you sure you want to delete "${branch.name}"?`)) {
      // In a real app, this would call an API
      alert(`Branch "${branch.name}" deleted successfully.`);
      // For demo, we could remove from local state, but since it's static, just show alert
    }
  }, []);

  const handleViewDetails = (e, branch) => {
    e.preventDefault();
    // Get the route based on the branch stage
    const route = getStageRoute(branch.stage);
    if (route) {
      router.push(route);
    }
  };

  // Handle new branch creation
  const handleBranchCreated = useCallback((newBranch) => {
    // Generate a unique ID (using timestamp + random number)
    const branchId = Date.now() + Math.floor(Math.random() * 1000);
    const branch = {
      id: branchId,
      name: newBranch.locationName,
      city: newBranch.city,
      stage: "Property Search",
      stageColor: "orange",
      progress: 0,
      pendingAction: "yellow",
      category: "business",
      numberOfBranches: newBranch.numberOfBranches,
      createdAt: new Date().toISOString(),
    };

    // Add to custom branches
    const updatedBranches = [...customBranches, branch];
    setCustomBranches(updatedBranches);
    
    // Save to localStorage
    localStorage.setItem("customBranches", JSON.stringify(updatedBranches));
  }, [customBranches]);

  // Filter branches based on user role using role-to-stage mapping
  // Each role will only see branches in stages assigned to them
  // Optimized with useMemo to prevent unnecessary re-filtering
  const branches = useMemo(() => {
    if (!user?.role) {
      // If no user role, return empty array (don't show all branches)
      return [];
    }

    // Merge static branches with custom branches
    const allBranches = [...ALL_BRANCHES, ...customBranches];
    let filteredBranches = allBranches;

    // For IT team, show only branches pending IT assessment
    if (user.role === "IT team") {
      // Branches that need IT assessment - those not completed and in relevant stages
      filteredBranches = allBranches.filter(branch =>
        branch.stage !== "Completed" &&
        branch.stage !== "On Hold" &&
        ["Property Search", "Business Approval", "Legal Workflow", "Project Execution", "Agreement Execution"].includes(branch.stage)
      );
    } else if (user.role === "Legal due" || user.role === "Legaldue" || user.role === "Legal Team") {
      // For Legal Team, show branches in Legal Clearance stage
      filteredBranches = allBranches.filter(branch =>
        branch.stage === "Legal Clearance"
      );
    } else {
      filteredBranches = filterBranchesByRole(allBranches, user.role);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filteredBranches = filteredBranches.filter(branch =>
        branch.name.toLowerCase().includes(query) ||
        branch.stage.toLowerCase().includes(query) ||
        branch.category?.toLowerCase().includes(query)
      );
    }

    return filteredBranches;
  }, [user?.role, searchQuery, customBranches]);

  const getProgressColor = useCallback((progress) => {
    if (progress === 100) return "green";
    if (progress >= 50) return "yellow";
    return "yellow";
  }, []);

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
          <NotificationDropdown />
          <UserProfile variant="header" showLogout={false} />
        </div>
      </header>

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content Area */}
        <main className="dashboard-main">
          <div className="main-content">
            <h1 className="page-title">{user?.role === "IT team" ? "IT Feasibility" : "Branch Tracker"}</h1>

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
                {user?.role !== "IT team" && (
                  <button
                    className="add-branch-btn"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <span>+</span> Add New Branch
                  </button>
                )}
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
          onBranchCreated={handleBranchCreated}
        />
      )}
    </div>
  );
}

// Create New Branch Modal Component
function CreateBranchModal({ onClose, onBranchCreated }) {
  const { user } = useAuth();
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
    
    // Call the callback to create the branch
    if (onBranchCreated) {
      onBranchCreated(formData);
    }
    
    // Reset form
    setFormData({
      city: "",
      locationName: "",
      numberOfBranches: "",
    });
    
    // Close modal
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Check if user is SRBM
  const isSRBM = user?.role === "SRBM";

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
            {isSRBM ? (
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter city name"
                required
              />
            ) : (
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
            )}
          </div>

          <div className="form-field">
            <label className="form-label">
              Area <span className="required-asterisk">*</span>
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