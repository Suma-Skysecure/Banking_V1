"use client";

/**
 * Reusable Dashboard Table Component
 * 
 * Displays a table of branches/properties with role-based filtering
 * @param {Array} branches - Array of branch objects to display
 * @param {Function} onViewDetails - Callback function when "View Details" is clicked
 * @param {Function} getProgressColor - Function to get progress bar color
 * @param {string} viewDetailsText - Custom text for the view details link (default: "View Details")
 * @param {Function} onDelete - Optional callback function when delete is clicked
 * @param {boolean} showDelete - Whether to show the delete column (default: false)
 * @param {string} actionType - Type of action button: "link" or "button" (default: "link")
 * @param {Function} onAddProperty - Optional callback function for "Add Property" button
 * @param {string} addPropertyText - Custom text for the add property button (default: "Add Property")
 * @param {boolean} showAddProperty - Whether to show the "ADD" column (default: false)
 */
export default function DashboardTable({ branches, onViewDetails, getProgressColor, viewDetailsText = "View Details", onDelete, showDelete = false, actionType = "link", onAddProperty, addPropertyText = "Add Property", showAddProperty = false }) {
  if (!branches || branches.length === 0) {
    return (
      <div className="table-container">
        <div style={{ textAlign: "center", padding: "40px", color: "#6b7280" }}>
          No branches found for your role.
        </div>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="branch-table">
        <thead>
          <tr>
            <th>CITY</th>
            <th>AREA</th>
            <th>CURRENT STAGE</th>
            <th>OVERALL PROGRESS</th>
            <th>PENDING ACTION</th>
            <th>ACTIONS</th>
            {showAddProperty && <th>ADD</th>}
            {showDelete && <th>DELETE</th>}
          </tr>
        </thead>
        <tbody>
          {branches.map((branch) => (
            <tr key={branch.id}>
              <td className="branch-name">{branch.city || "N/A"}</td>
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
                {actionType === "button" ? (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onViewDetails && onViewDetails(e, branch);
                    }}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#3b82f6",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#2563eb";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#3b82f6";
                    }}
                  >
                    {viewDetailsText}
                  </button>
                ) : (
                  <button
                    onClick={(e) => onViewDetails(e, branch)}
                    className="view-details-link"
                  >
                    {viewDetailsText}
                  </button>
                )}
              </td>
              {showAddProperty && (
                <td>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onAddProperty && onAddProperty(e, branch);
                    }}
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#3b82f6",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#2563eb";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#3b82f6";
                    }}
                  >
                    {addPropertyText}
                  </button>
                </td>
              )}
              {showDelete && (
                <td>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onDelete && onDelete(branch);
                    }}
                    className="delete-btn"
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#ef4444",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "background-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#dc2626";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#ef4444";
                    }}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

