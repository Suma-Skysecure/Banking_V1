"use client";

import { useState, useRef, useMemo } from "react";

/**
 * Layout Design Section Component
 * Includes Layout Design Document upload and Layout Cost Estimate
 */
export default function LayoutDesignSection() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Cost estimate state (values in INR)
  const [designCost, setDesignCost] = useState(45000 * 83.5); // Converted from USD to INR
  const [materialsCost, setMaterialsCost] = useState(180000 * 83.5);
  const [laborCost, setLaborCost] = useState(120000 * 83.5);
  const [equipmentCost, setEquipmentCost] = useState(85000 * 83.5);
  const [contingencyPercent, setContingencyPercent] = useState(10);

  // Calculate total cost
  const totalCost = useMemo(() => {
    const subtotal = designCost + materialsCost + laborCost + equipmentCost;
    const contingency = (subtotal * contingencyPercent) / 100;
    return subtotal + contingency;
  }, [designCost, materialsCost, laborCost, equipmentCost, contingencyPercent]);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }
      // Validate file type
      const validTypes = ["application/pdf", "image/jpeg", "image/png", "application/acad", "application/x-dwg"];
      const validExtensions = [".pdf", ".dwg", ".jpg", ".jpeg", ".png"];
      const fileExtension = "." + file.name.split(".").pop().toLowerCase();
      
      if (!validTypes.includes(file.type) && !validExtensions.includes(fileExtension)) {
        alert("Invalid file format. Accepted formats: PDF, DWG, JPG, PNG");
        return;
      }
      setUploadedFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }
      const validTypes = ["application/pdf", "image/jpeg", "image/png", "application/acad", "application/x-dwg"];
      const validExtensions = [".pdf", ".dwg", ".jpg", ".jpeg", ".png"];
      const fileExtension = "." + file.name.split(".").pop().toLowerCase();
      
      if (!validTypes.includes(file.type) && !validExtensions.includes(fileExtension)) {
        alert("Invalid file format. Accepted formats: PDF, DWG, JPG, PNG");
        return;
      }
      setUploadedFile(file);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div style={{ marginTop: "24px" }}>
      {/* Layout Design Document Card */}
      <div className="business-details-card" style={{ marginBottom: "24px" }}>
        <div className="card-header">
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            className="card-icon"
          >
            <path
              d="M2 4H14V12H2V4Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 4V12M10 4V12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <h3 className="card-title">Layout Design Document</h3>
        </div>
        <div style={{ padding: "20px" }}>
          {!uploadedFile ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              style={{
                border: "2px dashed #a78bfa",
                borderRadius: "8px",
                padding: "60px 20px",
                backgroundColor: "#f3e8ff",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.2s",
                borderColor: isDragging ? "#8b5cf6" : "#a78bfa",
                backgroundColor: isDragging ? "#ede9fe" : "#f3e8ff"
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                style={{ margin: "0 auto 16px", color: "#8b5cf6" }}
              >
                <path
                  d="M7 18C4.23858 18 2 15.7614 2 13C2 10.2386 4.23858 8 7 8C7.33962 8 7.67015 8.03046 7.98922 8.08686C8.92719 5.16229 11.5142 3 14.5 3C18.0899 3 21 5.91015 21 9.5C21 12.0899 18.0899 15 14.5 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 12V21M12 21L9 18M12 21L15 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div style={{ fontSize: "16px", fontWeight: "600", color: "#1e3a8a", marginBottom: "12px" }}>
                Upload Layout Design
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  fileInputRef.current?.click();
                }}
                style={{
                  padding: "10px 24px",
                  backgroundColor: "#f97316",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "background-color 0.2s"
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#ea580c")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#f97316")}
              >
                Choose File
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.dwg,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                style={{ display: "none" }}
              />
              <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "12px" }}>
                Accepted formats: PDF, DWG, JPG, PNG (Max 10MB)
              </div>
            </div>
          ) : (
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px",
              backgroundColor: "#f9fafb",
              borderRadius: "8px",
              border: "1px solid #e5e7eb"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "#f3e8ff",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0
                }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                      stroke="#8b5cf6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14 2V8H20"
                      stroke="#8b5cf6"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "14px", fontWeight: "600", color: "#111827", marginBottom: "4px" }}>
                    {uploadedFile.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "#6b7280" }}>
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                </div>
              </div>
              <button
                onClick={handleRemoveFile}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#ef4444",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "background-color 0.2s"
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#dc2626")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "#ef4444")}
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Layout Cost Estimate Card */}
      <div className="business-details-card">
        <div className="card-header">
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            className="card-icon"
          >
            <path
              d="M8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M8 4V8L10.5 10.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <h3 className="card-title">Layout Cost Estimate</h3>
        </div>
        <div style={{ padding: "20px" }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
            marginBottom: "24px"
          }}>
            {/* Left Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "8px"
                }}>
                  Design Cost
                </label>
                <input
                  type="number"
                  value={designCost}
                  onChange={(e) => setDesignCost(parseInt(e.target.value) || 0)}
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
              <div>
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "8px"
                }}>
                  Materials Cost
                </label>
                <input
                  type="number"
                  value={materialsCost}
                  onChange={(e) => setMaterialsCost(parseInt(e.target.value) || 0)}
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
              <div>
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "8px"
                }}>
                  Labor Cost
                </label>
                <input
                  type="number"
                  value={laborCost}
                  onChange={(e) => setLaborCost(parseInt(e.target.value) || 0)}
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

            {/* Right Column */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div>
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "8px"
                }}>
                  Equipment Cost
                </label>
                <input
                  type="number"
                  value={equipmentCost}
                  onChange={(e) => setEquipmentCost(parseInt(e.target.value) || 0)}
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
              <div>
                <label style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "8px"
                }}>
                  Contingency ({contingencyPercent}%)
                </label>
                <input
                  type="number"
                  value={((designCost + materialsCost + laborCost + equipmentCost) * contingencyPercent / 100).toFixed(0)}
                  readOnly
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: "14px",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    backgroundColor: "#f9fafb",
                    color: "#111827"
                  }}
                />
              </div>
            </div>
          </div>

          {/* Total Cost Display */}
          <div style={{
            backgroundColor: "#1e3a8a",
            borderRadius: "8px",
            padding: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span style={{ fontSize: "18px", fontWeight: "700", color: "white" }}>
              Total Layout Cost:
            </span>
            <span style={{ fontSize: "24px", fontWeight: "700", color: "white" }}>
              {formatCurrency(totalCost)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

