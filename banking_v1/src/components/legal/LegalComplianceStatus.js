"use client";

/**
 * LegalComplianceStatus Component
 * 
 * Displays the compliance status and final status badge
 * @param {Object} props
 * @param {string} props.businessDecisionStatus - Status of business decision: "pending", "approved", "rejected"
 * @param {boolean} props.complianceConfirmed - Whether compliance is confirmed
 * @param {string} props.finalStatus - Final status: "pending", "completed", "rejected"
 */
export default function LegalComplianceStatus({
  businessDecisionStatus,
  complianceConfirmed,
  finalStatus,
}) {
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: {
        label: "Pending",
        color: "#f59e0b",
        bgColor: "#fef3c7",
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle
              cx="8"
              cy="8"
              r="7"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path
              d="M8 4V8L10.5 10.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
      approved: {
        label: "Approved",
        color: "#10b981",
        bgColor: "#d1fae5",
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle
              cx="8"
              cy="8"
              r="7"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M5 8L7 10L11 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
      rejected: {
        label: "Rejected",
        color: "#ef4444",
        bgColor: "#fee2e2",
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle
              cx="8"
              cy="8"
              r="7"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M5 5L11 11M11 5L5 11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ),
      },
      completed: {
        label: "Completed",
        color: "#10b981",
        bgColor: "#d1fae5",
        icon: (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle
              cx="8"
              cy="8"
              r="7"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M5 8L7 10L11 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
    };

    const config = statusConfig[status] || statusConfig.pending;
    return (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          padding: "6px 12px",
          borderRadius: "6px",
          backgroundColor: config.bgColor,
          color: config.color,
          fontSize: "12px",
          fontWeight: "600",
        }}
      >
        {config.icon}
        {config.label}
      </div>
    );
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
            d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />
          <path
            d="M10 6V10M10 14H10.01"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
        <h3 className="card-title">Compliance Status</h3>
      </div>
      <div style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Business Decision Status */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px",
              backgroundColor: "#f9fafb",
              borderRadius: "6px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "4px",
                }}
              >
                Business Decision Status
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                }}
              >
                Status of business decision on legal call
              </div>
            </div>
            {getStatusBadge(businessDecisionStatus || "pending")}
          </div>

          {/* Compliance Confirmation */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px",
              backgroundColor: "#f9fafb",
              borderRadius: "6px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "4px",
                }}
              >
                Compliance Confirmation
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                }}
              >
                Compliance of business decision
              </div>
            </div>
            {getStatusBadge(complianceConfirmed ? "approved" : "pending")}
          </div>

          {/* Final Status */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px",
              backgroundColor: finalStatus === "completed" ? "#d1fae5" : "#fef3c7",
              borderRadius: "8px",
              border: `2px solid ${finalStatus === "completed" ? "#10b981" : "#f59e0b"}`,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#111827",
                  marginBottom: "4px",
                }}
              >
                Final Status
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                }}
              >
                Ready for Final Agreements Execution
              </div>
            </div>
            {getStatusBadge(finalStatus || "pending")}
          </div>
        </div>
      </div>
    </div>
  );
}

