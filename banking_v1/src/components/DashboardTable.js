"use client";

/**
 * Reusable Dashboard Table Component
 * 
 * Displays a table of branches/properties with role-based filtering
 * @param {Array} branches - Array of branch objects to display
 * @param {Function} onViewDetails - Callback function when "View Details" is clicked
 * @param {Function} getProgressColor - Function to get progress bar color
 * @param {string} viewDetailsText - Custom text for the view details link (default: "View Details")
 */
export default function DashboardTable({ branches, onViewDetails, getProgressColor, viewDetailsText = "View Details" }) {
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
                <button
                  onClick={(e) => onViewDetails(e, branch)}
                  className="view-details-link"
                >
                  {viewDetailsText}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

