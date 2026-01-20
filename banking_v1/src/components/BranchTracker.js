"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import DashboardTable from "@/components/DashboardTable";
import UserProfile from "@/components/UserProfile";
import NotificationDropdown from "@/components/NotificationDropdown";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/contexts/NotificationContext";
import { filterBranchesByRole } from "@/config/roleStageMapping";
import ToastNotification from "@/components/ToastNotification";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";

// All available branches - in production, this would come from an API
// Empty array - only branches created by users will be shown
const ALL_BRANCHES = [];

export default function BranchTracker() {
  const router = useRouter();
  const { user } = useAuth();
  const { createNotification } = useNotifications();
  const [viewMode, setViewMode] = useState("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [cityFilter, setCityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [customBranches, setCustomBranches] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [branchToDelete, setBranchToDelete] = useState(null);

  // Load custom branches from localStorage on mount and listen for updates
  useEffect(() => {
    const loadCustomBranches = () => {
      const savedBranches = localStorage.getItem("customBranches");
      if (savedBranches) {
        try {
          setCustomBranches(JSON.parse(savedBranches));
        } catch (error) {
          console.error("Error loading custom branches:", error);
        }
      }
    };

    // Initial load
    loadCustomBranches();

    // Listen for storage changes (cross-tab updates)
    const handleStorageChange = (e) => {
      if (e.key === "customBranches") {
        loadCustomBranches();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Listen for custom events (same-tab updates)
    const handleBranchUpdate = () => {
      loadCustomBranches();
    };

    window.addEventListener("customBranchesUpdated", handleBranchUpdate);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("customBranchesUpdated", handleBranchUpdate);
    };
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

  const handleDeleteClick = useCallback((branch) => {
    // Open delete confirmation modal
    setBranchToDelete(branch);
    setShowDeleteConfirm(true);
  }, []);

  const confirmDelete = useCallback(() => {
    if (!branchToDelete) return;

    // Remove from custom branches (SRBM dashboard)
    const updatedBranches = customBranches.filter(b => b.id !== branchToDelete.id);
    setCustomBranches(updatedBranches);
    localStorage.setItem("customBranches", JSON.stringify(updatedBranches));

    // Also remove from BRT branches
    const brtBranches = JSON.parse(localStorage.getItem("brtBranches") || "[]");
    const updatedBRTBranches = brtBranches.filter(b => b.id !== branchToDelete.id);
    localStorage.setItem("brtBranches", JSON.stringify(updatedBRTBranches));

    // Dispatch custom event to notify BRTDashboard (for same-tab updates)
    window.dispatchEvent(new Event("brtBranchUpdated"));
    window.dispatchEvent(new Event("customBranchesUpdated"));

    // Show success toast notification
    setToastMessage(`Branch "${branchToDelete.name}" deleted successfully.`);
    setToastType("success");
    setShowToast(true);

    // Close modal and reset
    setShowDeleteConfirm(false);
    setBranchToDelete(null);
  }, [branchToDelete, customBranches]);

  const cancelDelete = useCallback(() => {
    setShowDeleteConfirm(false);
    setBranchToDelete(null);
  }, []);

  const handleViewDetails = (e, branch) => {
    e.preventDefault();
    
    // For Vendor role, always route to vendor creation page
    if (user?.role === "Vendor") {
      router.push("/vendor-creation");
      return;
    }
    
    // For Site measurement role, always route to Post-LOI activities page
    if (user?.role === "Site measurement") {
      router.push("/post-loi-activities");
      return;
    }
    
    // For Legal due role, always route to legal-due page
    if (user?.role === "Legal due" || user?.role === "Legaldue" || user?.role === "Legal Team") {
      router.push("/legal-due");
      return;
    }
    
    // For Agreement execution role, always route to agreement-execution page
    if (user?.role === "Agreement execution") {
      router.push("/agreement-execution");
      return;
    }
    
    // For SRBM role, route to Property Search page
    if (user?.role === "SRBM") {
      router.push("/property-search");
      return;
    }
    
    // Get the route based on the branch stage for other roles
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
    
    // Save to localStorage for SRBM dashboard
    localStorage.setItem("customBranches", JSON.stringify(updatedBranches));

    // Also save branch for BRT dashboard
    const brtBranches = JSON.parse(localStorage.getItem("brtBranches") || "[]");
    const brtBranch = {
      ...branch,
      stage: "Pending",
      stageColor: "yellow",
      progress: 20, // Set progress to 20% for BRT
    };
    const updatedBRTBranches = [...brtBranches, brtBranch];
    localStorage.setItem("brtBranches", JSON.stringify(updatedBRTBranches));

    // Dispatch custom event to notify BRTDashboard (for same-tab updates)
    window.dispatchEvent(new Event("brtBranchUpdated"));

    // Create notifications for all teams
    const branchInfo = `New branch "${newBranch.locationName}" created in ${newBranch.city}`;
    
    // Notification for BRT team
    createNotification(
      branchInfo,
      "info",
      "/brt-dashboard",
      "BRT"
    );

    // Notification for Site measurement team
    createNotification(
      branchInfo,
      "info",
      "/dashboard",
      "Site measurement"
    );

    // Notification for Vendor team
    createNotification(
      branchInfo,
      "info",
      "/dashboard",
      "Vendor"
    );

    // Notification for Account team (singular as used in codebase)
    createNotification(
      branchInfo,
      "info",
      "/dashboard",
      "Account"
    );

    // Notification for Legal Due team (primary role name)
    createNotification(
      branchInfo,
      "info",
      "/dashboard",
      "Legal due"
    );

    // Notification for IT team
    createNotification(
      branchInfo,
      "info",
      "/dashboard",
      "IT team"
    );

    // Notification for Agreement Execution team
    createNotification(
      branchInfo,
      "info",
      "/dashboard",
      "Agreement execution"
    );

    // Show toast notification
    setToastMessage(`Branch "${newBranch.locationName}" created successfully in ${newBranch.city}`);
    setToastType("success");
    setShowToast(true);
  }, [customBranches, createNotification]);

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
      // For Legal Team, show all branches from SRBM (customBranches) regardless of current stage
      // Display them with stage "Legal Clearance" and 50% progress
      filteredBranches = customBranches.filter(branch => 
        branch.stage !== "Completed" && branch.stage !== "On Hold"
      ).map(branch => ({
        ...branch,
        stage: "Legal Clearance", // Override stage to show as Legal Clearance
        stageColor: "yellow", // Set stage color for Legal Clearance
        progress: 50 // Set progress to 50% for Legal due users
      }));
    } else if (user.role === "Agreement execution") {
      // For Agreement execution, show all branches from SRBM (customBranches) regardless of current stage
      // Display them with stage "Agreement Execution" and 70% progress
      filteredBranches = customBranches.filter(branch => 
        branch.stage !== "Completed" && branch.stage !== "On Hold"
      ).map(branch => ({
        ...branch,
        stage: "Agreement Execution", // Override stage to show as Agreement Execution
        stageColor: "yellow", // Set stage color for Agreement Execution
        progress: 70 // Set progress to 70% for Agreement execution users
      }));
    } else if (user.role === "Vendor") {
      // For Vendor, show all branches from SRBM (customBranches) regardless of current stage
      // Display them with stage "Vendor Creation" and 30% progress
      filteredBranches = customBranches.filter(branch => 
        branch.stage !== "Completed" && branch.stage !== "On Hold"
      ).map(branch => ({
        ...branch,
        stage: "Vendor Creation", // Override stage to show as Vendor Creation
        stageColor: "orange", // Set stage color for Vendor Creation
        progress: 30 // Set progress to 30% for Vendor users
      }));
    } else if (user.role === "Site measurement") {
      // For Site measurement, show all branches from SRBM (customBranches) regardless of current stage
      // Display them with stage "Site Measurement" and 35% progress
      filteredBranches = customBranches.filter(branch => 
        branch.stage !== "Completed" && branch.stage !== "On Hold"
      ).map(branch => ({
        ...branch,
        stage: "Site Measurement", // Override stage to show as Site Measurement
        stageColor: "orange", // Set stage color for Site Measurement
        progress: 35 // Set progress to 35% for Site measurement users
      }));
    } else if (user.role === "Account") {
      // For Account, show 3 rows with same city/area but different stages and progress
      // Get the first branch from customBranches (or use a default)
      const firstBranch = customBranches.find(branch => 
        branch.stage !== "Completed" && branch.stage !== "On Hold"
      ) || { city: "Mumbai", name: "Bandra", id: "default-account-1" };
      
      // Create 3 rows with different stages and progress
      filteredBranches = [
        {
          ...firstBranch,
          id: `${firstBranch.id || "account"}-budget`,
          stage: "Budget approval",
          stageColor: "yellow",
          progress: 40
        },
        {
          ...firstBranch,
          id: `${firstBranch.id || "account"}-stampduty`,
          stage: "Stampduty approval",
          stageColor: "orange",
          progress: 45
        },
        {
          ...firstBranch,
          id: `${firstBranch.id || "account"}-advance`,
          stage: "Advance to fit_out Vendor",
          stageColor: "blue",
          progress: 50
        }
      ];
    } else if (user.role === "SRBM") {
      // SRBM sees only Property Search stage branches
      filteredBranches = filterBranchesByRole(allBranches, user.role);
    } else {
      // For other roles (Project execution)
      // Show all branches created by SRBM (from customBranches) regardless of current stage
      // This ensures all teams can see dynamic data from SRBM dashboard
      filteredBranches = customBranches.filter(branch => 
        branch.stage !== "Completed" && branch.stage !== "On Hold"
      );
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
                {user?.role === "SRBM" && (
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
              onDelete={user?.role === "SRBM" ? handleDeleteClick : undefined}
              showDelete={user?.role === "SRBM"}
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

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div 
          className="modal-overlay" 
          onClick={cancelDelete}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            backdropFilter: "blur(4px)"
          }}
        >
          <div 
            className="modal-container" 
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "30px",
              maxWidth: "400px",
              width: "90%",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
            }}
          >
            <div style={{ marginBottom: "20px", textAlign: "center" }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "#fee2e2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px auto"
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" 
                    stroke="#dc2626" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                  />
                </svg>
              </div>
              <h3 style={{ 
                margin: 0, 
                fontSize: "18px", 
                fontWeight: "600", 
                color: "#111827", 
                marginBottom: "8px" 
              }}>
                Confirm Delete
              </h3>
              <p style={{ 
                margin: 0, 
                fontSize: "14px", 
                color: "#6b7280" 
              }}>
                Are you sure you want to delete branch <strong>"{branchToDelete?.name}"</strong>? This action cannot be undone.
              </p>
            </div>
            <div style={{ 
              display: "flex", 
              gap: "12px", 
              justifyContent: "flex-end" 
            }}>
              <button
                onClick={cancelDelete}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#f3f4f6",
                  color: "#374151",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "background-color 0.2s"
                }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = "#e5e7eb"; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = "#f3f4f6"; }}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#dc2626",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "background-color 0.2s"
                }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = "#b91c1c"; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = "#dc2626"; }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <ToastNotification
        show={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
        duration={3000}
      />
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