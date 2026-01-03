"use client";

/**
 * Reusable Property Summary Card Component
 * Optimized for performance with memoization-ready structure
 * 
 * @param {Object} props
 * @param {string} props.propertyName - Property name
 * @param {string} props.address - Property address
 * @param {string} props.propertyId - Property ID
 * @param {string|number} props.propertyValue - Property value (formatted string or number)
 * @param {string} props.badgeText - Badge text (e.g., "Pending Payment Approval")
 * @param {string} props.badgeIcon - Badge icon type ("clock" | "star" | "check")
 * @param {string} props.badgeType - Badge type ("pending" | "completed" | "available")
 * @param {string} props.rightLabel - Label below the value (e.g., "LOI Circulated on...")
 * @param {boolean} props.showValue - Whether to show property value section
 * @param {string} props.mapPinColor - Color for map pin icon (default: "#ef4444")
 */
export default function PropertySummaryCard({
  propertyName = "Downtown Arts Plaza",
  address = "1450 Biscayne Boulevard, Miami, FL 33132",
  propertyId = "PROP-MIA-2024-002",
  propertyValue = "₹48,43,00,000",
  badgeText = "Pending Payment Approval",
  badgeIcon = "clock",
  badgeType = "pending",
  rightLabel = "",
  showValue = true,
  mapPinColor = "#ef4444",
}) {
  const getBadgeStyle = () => {
    switch (badgeType) {
      case "completed":
        return {
          backgroundColor: "#d1fae5",
          color: "#065f46",
          border: "1px solid #86efac",
        };
      case "available":
        return {
          backgroundColor: "#d1fae5",
          color: "#065f46",
          border: "1px solid #86efac",
        };
      case "pending":
      default:
        return {
          backgroundColor: "#dbeafe",
          color: "#1e40af",
          border: "1px solid #93c5fd",
        };
    }
  };
  const getBadgeIcon = () => {
    switch (badgeIcon) {
      case "clock":
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="status-icon">
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
            <path
              d="M8 4V8L10.5 10.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "star":
        return (
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 2V6M8 10V14M2 8H6M10 8H14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        );
      case "check":
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M13 4L6 11L3 8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="property-overview-card" style={{ marginBottom: "24px" }}>
      <div className="property-overview-left">
        <h2 className="property-name-large" style={{ color: "#1e3a8a" }}>
          {propertyName}
        </h2>
        <div className="property-address-large">
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            className="map-pin-icon-large"
          >
            <path
              d="M8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z"
              fill={mapPinColor}
            />
            <path
              d="M8 1C5.23858 1 3 3.23858 3 6C3 10 8 15 8 15C8 15 13 10 13 6C13 3.23858 10.7614 1 8 1Z"
              stroke={mapPinColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{address}</span>
        </div>
        <div className="property-status-section" style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "12px", marginTop: "12px" }}>
          <div
            className={`property-status-tag ${badgeType}`}
            style={{
              ...getBadgeStyle(),
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: "500"
            }}
          >
            {getBadgeIcon()}
            {badgeText}
          </div>
          <div className="property-id-text" style={{ fontSize: "14px", color: "#6b7280" }}>
            Property ID: {propertyId}
          </div>
        </div>
      </div>
      {showValue && (
        <div className="property-overview-right">
          <div className="property-price-header" style={{ color: "#1e3a8a", fontSize: "32px", fontWeight: "700", marginBottom: "4px" }}>
            {propertyValue}
          </div>
          {rightLabel && (
            <div className="loi-circulated-date" style={{ fontSize: "14px", color: "#6b7280" }}>
              {rightLabel}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

