"use client";

import { useState, useMemo } from "react";

/**
 * Site Measurement Details Component
 * Reusable component with editable building specifications that update measured dimensions
 */
export default function SiteMeasurementDetails() {
  const [buildingSqFt, setBuildingSqFt] = useState(12500);
  const [floorLevel, setFloorLevel] = useState("12th Floor");
  const [parkingSpaces, setParkingSpaces] = useState(25);
  const [amenities, setAmenities] = useState("HVAC, Security");
  const [condition, setCondition] = useState("Excellent");
  const [commonArea, setCommonArea] = useState(1700);
  const [height, setHeight] = useState(14);
  const [measurementDate, setMeasurementDate] = useState("Dec 21, 2024");

  // Calculate measured dimensions based on building specifications
  const measuredDimensions = useMemo(() => {
    const totalArea = buildingSqFt;
    const usableArea = totalArea - commonArea;
    
    return {
      totalArea,
      usableArea: Math.max(0, usableArea), // Ensure non-negative
      commonArea,
      height,
    };
  }, [buildingSqFt, commonArea, height]);

  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  return (
    <div style={{ marginTop: "24px" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
        <div style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          backgroundColor: "#1e3a8a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }}>
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path
              d="M11.5 10.5L15 14M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7Z"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h2 style={{ fontSize: "24px", fontWeight: "700", color: "#1e3a8a", margin: 0 }}>
          Site Measurement Details
        </h2>
      </div>

      {/* Measured Dimensions Card */}
      <div style={{
        backgroundColor: "#dbeafe",
        borderRadius: "8px",
        padding: "24px",
        marginBottom: "24px",
        border: "1px solid #93c5fd"
      }}>
        <h3 style={{
          fontSize: "18px",
          fontWeight: "700",
          color: "#1e3a8a",
          marginBottom: "20px",
          marginTop: 0
        }}>
          Measured Dimensions
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "14px", color: "#374151", fontWeight: "500" }}>Total Area:</span>
            <span style={{ fontSize: "16px", color: "#1e3a8a", fontWeight: "600" }}>
              {formatNumber(measuredDimensions.totalArea)} sq ft
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "14px", color: "#374151", fontWeight: "500" }}>Usable Area:</span>
            <span style={{ fontSize: "16px", color: "#1e3a8a", fontWeight: "600" }}>
              {formatNumber(measuredDimensions.usableArea)} sq ft
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "14px", color: "#374151", fontWeight: "500" }}>Common Area:</span>
            <span style={{ fontSize: "16px", color: "#1e3a8a", fontWeight: "600" }}>
              {formatNumber(measuredDimensions.commonArea)} sq ft
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "14px", color: "#374151", fontWeight: "500" }}>Height:</span>
            <span style={{ fontSize: "16px", color: "#1e3a8a", fontWeight: "600" }}>
              {height} ft
            </span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "14px", color: "#374151", fontWeight: "500" }}>Measurement Date:</span>
            <span style={{ fontSize: "16px", color: "#1e3a8a", fontWeight: "600" }}>
              {measurementDate}
            </span>
          </div>
        </div>
      </div>

      {/* Building Specifications Card */}
      <div style={{
        backgroundColor: "#d1fae5",
        borderRadius: "8px",
        padding: "24px",
        border: "1px solid #86efac"
      }}>
        <h3 style={{
          fontSize: "18px",
          fontWeight: "700",
          color: "#1e3a8a",
          marginBottom: "20px",
          marginTop: 0
        }}>
          Building Specifications
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Building Sq.Ft */}
          <div>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              color: "#374151",
              marginBottom: "8px"
            }}>
              Building Sq.Ft
            </label>
            <input
              type="number"
              value={buildingSqFt}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                setBuildingSqFt(value);
              }}
              style={{
                width: "100%",
                padding: "10px 12px",
                fontSize: "14px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                backgroundColor: "white",
                color: "#111827"
              }}
              min="0"
            />
          </div>

          {/* Floor Level */}
          <div>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              color: "#374151",
              marginBottom: "8px"
            }}>
              Floor Level
            </label>
            <input
              type="text"
              value={floorLevel}
              onChange={(e) => setFloorLevel(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                fontSize: "14px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                backgroundColor: "white",
                color: "#111827"
              }}
            />
          </div>

          {/* Parking Spaces */}
          <div>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              color: "#374151",
              marginBottom: "8px"
            }}>
              Parking Spaces
            </label>
            <input
              type="number"
              value={parkingSpaces}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                setParkingSpaces(value);
              }}
              style={{
                width: "100%",
                padding: "10px 12px",
                fontSize: "14px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                backgroundColor: "white",
                color: "#111827"
              }}
              min="0"
            />
          </div>

          {/* Amenities */}
          <div>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              color: "#374151",
              marginBottom: "8px"
            }}>
              Amenities
            </label>
            <input
              type="text"
              value={amenities}
              onChange={(e) => setAmenities(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                fontSize: "14px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                backgroundColor: "white",
                color: "#111827"
              }}
            />
          </div>

          {/* Condition */}
          <div>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              color: "#374151",
              marginBottom: "8px"
            }}>
              Condition
            </label>
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 12px",
                fontSize: "14px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                backgroundColor: "white",
                color: "#111827",
                cursor: "pointer",
                appearance: "none",
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
                paddingRight: "36px"
              }}
            >
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>

          {/* Common Area - Editable to affect Usable Area calculation */}
          <div>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              color: "#374151",
              marginBottom: "8px"
            }}>
              Common Area (sq ft)
            </label>
            <input
              type="number"
              value={commonArea}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                setCommonArea(value);
              }}
              style={{
                width: "100%",
                padding: "10px 12px",
                fontSize: "14px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                backgroundColor: "white",
                color: "#111827"
              }}
              min="0"
            />
          </div>

          {/* Height - Editable to update Measured Dimensions */}
          <div>
            <label style={{
              display: "block",
              fontSize: "14px",
              fontWeight: "500",
              color: "#374151",
              marginBottom: "8px"
            }}>
              Height (ft)
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                setHeight(value);
              }}
              style={{
                width: "100%",
                padding: "10px 12px",
                fontSize: "14px",
                border: "1px solid #d1d5db",
                borderRadius: "6px",
                backgroundColor: "white",
                color: "#111827"
              }}
              min="0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

