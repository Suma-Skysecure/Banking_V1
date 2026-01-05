"use client";

/**
 * Reusable Project Execution Progress Component
 * 
 * Displays all project execution stages with the active stage highlighted in orange
 * @param {string} activeStage - The currently active stage (highlighted in orange)
 * 
 * Available stages:
 * - "Security guard deployment"
 * - "PO to material vendor for Bought out Items"
 * - "Drawings to fit-out vendor"
 * - "PO to fit-out vendor"
 * - "Site Update"
 * - "Application for telephone connection"
 */
export default function ProjectExecutionProgress({ activeStage = "" }) {
  // Define all stages with their display names and icons
  const stages = [
    {
      key: "Security guard deployment",
      displayName: "Security Deployment",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L6 5V11C6 15 9 18 12 19C15 18 18 15 18 11V5L12 2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: "PO to material vendor for Bought out Items",
      displayName: "Material Vendor",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M8 12L12 16L16 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 2V16"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: "Drawings to fit-out vendor",
      displayName: "Fit Out Vendor Process",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 12H15M9 16H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: "PO to fit-out vendor",
      displayName: "Fit Out Vendor PO",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M9 12H15M9 16H15M9 5H7C5.89543 5 5 5.89543 5 7V19C5 20.1046 5.89543 21 7 21H17C18.1046 21 19 20.1046 19 19V7C19 5.89543 18.1046 5 17 5H15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: "Site Update",
      displayName: "Site Update",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 8V12L15 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: "Application for telephone connection",
      displayName: "Telephonic Connection",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M22 16.92V19.92C22 20.88 21.12 21.76 20.16 21.76C9.6 21.76 1.24 13.4 1.24 2.84C1.24 1.88 2.12 1 3.08 1H6.08"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21.84 1.84L18.64 5.04M21.84 1.84L18.64 5.04M21.84 1.84L18.64 5.04"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  // Determine if a stage is active
  const isActive = (stageKey) => {
    return activeStage && activeStage.toLowerCase() === stageKey.toLowerCase();
  };

  // Get styles for a stage card
  const getCardStyles = (stageKey) => {
    const active = isActive(stageKey);
    return {
      backgroundColor: active ? "#fff7ed" : "#fef2f2",
      border: active ? "2px solid #f97316" : "1px solid #fecaca",
      borderRadius: "8px",
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      boxShadow: active ? "0 2px 8px rgba(249, 115, 22, 0.2)" : "none",
    };
  };

  // Get icon color for a stage
  const getIconColor = (stageKey) => {
    return isActive(stageKey) ? "#f97316" : "#dc2626";
  };

  // Get text color for stage name
  const getTextColor = (stageKey) => {
    return isActive(stageKey) ? "#f97316" : "#dc2626";
  };

  // Get status text color
  const getStatusColor = (stageKey) => {
    return isActive(stageKey) ? "#c2410c" : "#991b1b";
  };

  return (
    <div style={{
      backgroundColor: "#ffffff",
      border: "1px solid #e5e7eb",
      borderRadius: "8px",
      padding: "24px",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      marginTop: "24px"
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "20px"
      }}>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path
            d="M2 16L6 12L10 16L18 8"
            stroke="#1e3a8a"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 8H18V14"
            stroke="#1e3a8a"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h3 style={{
          fontSize: "18px",
          fontWeight: "600",
          color: "#111827",
          margin: 0
        }}>
          Project Execution Progress
        </h3>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px"
        }}>
          <span style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#111827"
          }}>
            Overall Progress
          </span>
          <span style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "#f97316"
          }}>
            0% Complete
          </span>
        </div>
        <div style={{
          width: "100%",
          height: "8px",
          backgroundColor: "#e5e7eb",
          borderRadius: "4px",
          overflow: "hidden"
        }}>
          <div style={{
            width: "0%",
            height: "100%",
            backgroundColor: "#f97316",
            transition: "width 0.3s"
          }}></div>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gap: "16px"
      }}>
        {stages.map((stage) => (
          <div
            key={stage.key}
            style={getCardStyles(stage.key)}
          >
            <div style={{ color: getIconColor(stage.key), marginBottom: "8px" }}>
              {stage.icon}
            </div>
            <div style={{
              fontSize: "12px",
              fontWeight: "600",
              color: getTextColor(stage.key),
              marginTop: "4px"
            }}>
              {stage.displayName}
            </div>
            <div style={{
              fontSize: "11px",
              color: getStatusColor(stage.key),
              marginTop: "4px"
            }}>
              Pending
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

