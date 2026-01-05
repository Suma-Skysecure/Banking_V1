"use client";

import DashboardTable from "@/components/DashboardTable";

/**
 * LegalDueDashboard Component
 * 
 * Displays a table of legal due diligence tasks using DashboardTable
 * @param {Array} tasks - Array of task objects with taskName, status, owner, lastUpdated
 * @param {Function} onViewDetails - Callback when viewing task details
 */
export default function LegalDueDashboard({ tasks, onViewDetails }) {
  // Transform tasks to match DashboardTable's expected format
  const transformedTasks = tasks.map((task) => ({
    id: task.id || task.taskName,
    name: task.taskName,
    stage: task.status,
    stageColor: getStatusColor(task.status),
    progress: getProgressFromStatus(task.status),
    pendingAction: task.status === "Pending" ? "active" : "inactive",
  }));

  const getProgressColor = (progress) => {
    if (progress === 100) return "green";
    if (progress >= 50) return "yellow";
    return "red";
  };

  return (
    <div className="business-details-card" style={{ marginBottom: "24px" }}>
      <div className="card-header">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="card-icon"
        >
          <path
            d="M4 4C4 3.44772 4.44772 3 5 3H15C15.5523 3 16 3.44772 16 4V16C16 16.5523 15.5523 17 15 17H5C4.44772 17 4 16.5523 4 16V4Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7 7H13M7 10H13M7 13H11"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <h3 className="card-title">Legal Due Diligence Tasks</h3>
      </div>
      <div style={{ padding: "20px" }}>
        <DashboardTable
          branches={transformedTasks}
          onViewDetails={onViewDetails}
          getProgressColor={getProgressColor}
        />
      </div>
    </div>
  );
}

// Helper function to get status color class
function getStatusColor(status) {
  switch (status) {
    case "Approved":
      return "green";
    case "Rejected":
      return "red";
    case "Pending":
      return "yellow";
    default:
      return "gray";
  }
}

// Helper function to get progress percentage from status
function getProgressFromStatus(status) {
  switch (status) {
    case "Approved":
      return 100;
    case "Rejected":
      return 0;
    case "Pending":
      return 50;
    default:
      return 0;
  }
}

