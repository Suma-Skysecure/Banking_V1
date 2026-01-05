"use client";

import { memo } from "react";

/**
 * Reusable Dashboard Table Component
 * 
 * Displays a table of branches/properties with role-based filtering
 * @param {Array} branches - Array of branch objects to display
 * @param {Function} onViewDetails - Callback function when "View Details" is clicked
 * @param {Function} getProgressColor - Function to get progress bar color
<<<<<<< HEAD
 * @param {string} viewDetailsText - Custom text for the view details link (default: "View Details")
 */
export default function DashboardTable({ branches, onViewDetails, getProgressColor, viewDetailsText = "View Details" }) {
=======
 * @param {Object} user - User object to determine role
 * @param {Function} onDelete - Callback function when delete is clicked
 */
const DashboardTable = memo(({ branches, onViewDetails, getProgressColor, user, onDelete }) => {
>>>>>>> 271c475d40527afb6c6438579f940b3b4f58ff86
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
<<<<<<< HEAD
                <button
                  onClick={(e) => onViewDetails(e, branch)}
                  className="view-details-link"
                >
                  {viewDetailsText}
                </button>
=======
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button
                    onClick={(e) => onViewDetails(e, branch)}
                    className="view-details-link"
                  >
                    View Details
                  </button>
                  {user?.role === "IT team" && (
                    <button
                      onClick={() => onDelete(branch)}
                      className="delete-btn"
                      title="Delete"
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 4H3.33333H14M5.33337 4V2.66667C5.33337 2.29848 5.63185 2 6.00004 2H10C10.3682 2 10.6667 2.29848 10.6667 2.66667V4M12.6667 4V13.3333C12.6667 13.7015 12.3682 14 12 14H4.00004C3.63185 14 3.33337 13.7015 3.33337 13.3333V4H12.6667Z" stroke="#f44336" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6.66663 7.33333V11.3333" stroke="#f44336" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M9.33337 7.33333V11.3333" stroke="#f44336" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  )}
                </div>
>>>>>>> 271c475d40527afb6c6438579f940b3b4f58ff86
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

DashboardTable.displayName = 'DashboardTable';

export default DashboardTable;

