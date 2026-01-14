"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import ToastNotification from "@/components/ToastNotification";

/* ===================== IT FEASIBILITY CHECKLIST ===================== */

const SECTIONS = [
  {
    id: "network",
    title: "Network & Connectivity *",
    mandatory: true,
    items: [
      "LAN cabling completed and tested",
      "WAN connectivity provisioned",
      "Primary Internet link available",
      "Secondary / backup Internet link available",
      "Router installed and configured",
      "Network switches installed",
      "Firewall configured and tested",
      "Network security rules approved",
    ],
  },
  {
    id: "hardware",
    title: "Hardware & Infrastructure *",
    mandatory: true,
    items: [
      "User workstations provisioned",
      "Printers and peripherals installed",
      "Server hardware available",
      "Server rack / cabinet installed",
      "Data room identified and secured",
      "Hardware inventory validated",
    ],
  },
  {
    id: "power",
    title: "Power & Utilities *",
    mandatory: true,
    items: [
      "Dedicated power lines available",
      "UPS installed and tested",
      "UPS backup duration validated",
      "Generator / DG backup available",
      "Power redundancy confirmed",
      "Electrical safety compliance verified",
      "Cooling and ventilation adequate",
    ],
  },
  {
    id: "software",
    title: "Software & Applications *",
    mandatory: true,
    items: [
      "Operating systems licensed",
      "Core banking / business applications compatible",
      "Application dependencies identified",
      "Middleware / runtime installed",
      "Software version compatibility verified",
    ],
  },
  {
    id: "security",
    title: "Security & Compliance *",
    mandatory: true,
    items: [
      "Antivirus / endpoint security installed",
      "Patch management enabled",
      "Role-based access control defined",
      "User authentication mechanism configured",
      "CCTV coverage available",
      "Access control systems installed",
      "IT security policies approved",
    ],
  },
  {
    id: "dr",
    title: "Business Continuity & DR",
    mandatory: false,
    items: [
      "Backup strategy documented",
      "Backup frequency defined",
      "Backup restoration tested",
      "Disaster recovery site identified",
      "DR process documented",
    ],
  },
  {
    id: "compliance",
    title: "Regulatory & Audit Readiness",
    mandatory: false,
    items: [
      "Regulatory IT guidelines reviewed",
      "Audit requirements identified",
      "Data retention policies defined",
      "Compliance sign-off obtained",
    ],
  },
];

/* ===================== COMPONENT ===================== */

export default function ITFeasibilityChecklist({ branchId }) {
  const { user } = useAuth();

  const [branchName, setBranchName] = useState("");
  const [data, setData] = useState({});
  const [overallRemarks, setOverallRemarks] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sentToBRT, setSentToBRT] = useState(false);
  const [submittedAt, setSubmittedAt] = useState(null);
  const [submittedBy, setSubmittedBy] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [uploadedLOI, setUploadedLOI] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");

  /* ===================== LOAD ===================== */

  useEffect(() => {
    if (!branchId) return;

    // Static mapping of branch names to ensure names are displayed instead of IDs
    const BRANCH_NAMES = {
      1: "Downtown Manhattan Branch",
      2: "Beverly Hills Boutique",
      3: "Chicago River North Site",
      4: "Miami South Beach Location",
      5: "Seattle Waterfront Project",
      6: "New York Financial District",
      7: "Dallas Metroplex Branch",
      8: "Houston Energy District",
      9: "Atlanta Business Center",
      10: "Phoenix Tech Hub",
      11: "Denver Commerce Center",
      12: "Boston Financial Plaza",
      13: "San Francisco Bay Area Office",
      14: "Austin Tech Campus",
      15: "Portland Commercial Plaza",
      16: "Nashville Financial Center",
      17: "Minneapolis Retail Hub",
      18: "Charlotte Business Park",
      20: "Kansas City Office Complex",
      21: "Columbus Financial District",
      22: "Milwaukee Business Center",
      23: "Detroit Commercial Center",
      24: "Seattle Tech Park",
      25: "Phoenix Industrial Hub",
      26: "Denver Business Plaza",
      27: "Portland Commerce Center",
      28: "San Diego Office Complex",
      29: "Las Vegas Financial District",
      30: "Chicago Business Center"
    };

    const branchMap = JSON.parse(
      localStorage.getItem("branchMap") || "{}"
    );

    const saved = JSON.parse(
      localStorage.getItem(`itAssessment_${branchId}`) || "{}"
    );

    // Prefer static name, then localStorage map, then fallback
    setBranchName(BRANCH_NAMES[branchId] || branchMap[branchId] || `Branch ${branchId}`);
    setData(saved.data || {});
    setOverallRemarks(saved.overallRemarks || "");
    setSubmitted(Boolean(saved.submitted));
    setSentToBRT(Boolean(saved.sentToBRT));
    setSubmittedAt(saved.submittedAt || null);
    setSubmittedBy(saved.submittedBy || "");
  }, [branchId]);

  // Load uploaded LOI document from localStorage
  useEffect(() => {
    const storedLOI = localStorage.getItem("uploadedSignedLOI");
    if (storedLOI) {
      try {
        setUploadedLOI(JSON.parse(storedLOI));
      } catch (error) {
        console.error("Error parsing stored LOI:", error);
      }
    }
  }, []);

  /* ===================== HELPERS ===================== */

  const updateSection = (sectionId, field, value) => {
    setData((prev) => ({
      ...prev,
      [sectionId]: {
        ...(prev[sectionId] || {}),
        [field]: value,
      },
    }));
  };

  const totalBudget = useMemo(() => {
    return Object.values(data).reduce(
      (sum, sec) => sum + (Number(sec?.budget) || 0),
      0
    );
  }, [data]);

  const mandatoryCompleted = SECTIONS.filter(s => s.mandatory).every(
    s =>
      data[s.id]?.checks &&
      Object.values(data[s.id].checks).some(Boolean)
  );

  const canSubmit = mandatoryCompleted && overallRemarks.trim() !== "";

  const statusLabel = sentToBRT
    ? "Sent to BRT"
    : submitted
      ? "Submitted (65%)"
      : "Draft";

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  // Handle view document
  const handleViewDocument = () => {
    if (uploadedLOI && uploadedLOI.data) {
      // Open the document in a new window
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head><title>${uploadedLOI.name}</title></head>
            <body style="margin:0; padding:0; display:flex; justify-content:center; align-items:center; height:100vh;">
              <iframe src="${uploadedLOI.data}" style="width:100%; height:100%; border:none;"></iframe>
            </body>
          </html>
        `);
      }
    } else {
      // Fallback to original modal behavior
      setShowDocumentModal(true);
    }
  };

  /* ===================== DASHBOARD ===================== */

  const updateDashboard = (status, progress) => {
    const all = JSON.parse(localStorage.getItem("itStatuses") || "{}");
    all[branchId] = { status, progress };
    localStorage.setItem("itStatuses", JSON.stringify(all));
  };

  /* ===================== ACTIONS ===================== */

  const handleSubmit = () => {
    const payload = {
      data,
      overallRemarks,
      submitted: true,
      sentToBRT: false,
      submittedBy: user?.username || "IT User",
      submittedAt: new Date().toISOString(),
    };

    localStorage.setItem(
      `itAssessment_${branchId}`,
      JSON.stringify(payload)
    );

    updateDashboard("In Progress", 65);
    setSubmitted(true);
    setSubmittedBy(payload.submittedBy);
    setSubmittedAt(payload.submittedAt);
    setNotificationMessage("IT Assessment submitted successfully (65% complete)");
    setNotificationType("success");
    setShowNotification(true);
  };

  const handleSendToBRT = () => {
    const saved = JSON.parse(
      localStorage.getItem(`itAssessment_${branchId}`) || "{}"
    );

    saved.sentToBRT = true;
    saved.sentToBRTAt = new Date().toISOString();

    localStorage.setItem(
      `itAssessment_${branchId}`,
      JSON.stringify(saved)
    );

    updateDashboard("Pending Approval", 65);
    setSentToBRT(true);
    setNotificationMessage("Assessment sent to BRT Team for review");
    setNotificationType("success");
    setShowNotification(true);
  };

  const handleDelete = () => {
    localStorage.removeItem(`itAssessment_${branchId}`);

    const statuses = JSON.parse(localStorage.getItem("itStatuses") || "{}");
    delete statuses[branchId];
    localStorage.setItem("itStatuses", JSON.stringify(statuses));

    setData({});
    setOverallRemarks("");
    setSubmitted(false);
    setSentToBRT(false);
    setSubmittedAt(null);
    setSubmittedBy("");
    setShowDeleteConfirm(false);
    setNotificationMessage("IT Assessment deleted successfully");
    setNotificationType("success");
    setShowNotification(true);
  };

  /* ===================== UI ===================== */

  // Calculate section completion
  const getSectionProgress = (sectionId) => {
    const sectionData = data[sectionId];
    if (!sectionData?.checks) return 0;
    const checked = Object.values(sectionData.checks).filter(Boolean).length;
    const total = SECTIONS.find(s => s.id === sectionId)?.items.length || 0;
    return total > 0 ? Math.round((checked / total) * 100) : 0;
  };

  // Get section icon
  const getSectionIcon = (sectionId) => {
    const icons = {
      network: "🌐",
      hardware: "💻",
      power: "⚡",
      software: "📱",
      security: "🔒",
      dr: "🔄",
      compliance: "📋"
    };
    return icons[sectionId] || "📝";
  };

  if (!branchId) return <p style={{ padding: 24 }}>Invalid Branch</p>;

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px" }}>
      {/* Progress Summary Card */}
      <div style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "24px",
        borderRadius: "12px",
        marginBottom: "24px",
        color: "white",
        boxShadow: "0 4px 12px rgba(102, 126, 234, 0.3)"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div>
            <h2 style={{ margin: 0, fontSize: "20px", fontWeight: "600", marginBottom: "8px" }}>IT Feasibility Assessment Progress</h2>
            <p style={{ margin: 0, fontSize: "14px", opacity: 0.9 }}>Complete all mandatory sections to submit</p>
          </div>
          <div style={{
            background: "rgba(255, 255, 255, 0.2)",
            padding: "12px 20px",
            borderRadius: "8px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "28px", fontWeight: "700" }}>{totalBudget.toLocaleString('en-IN')}</div>
            <div style={{ fontSize: "12px", opacity: 0.9 }}>Total Budget (₹)</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          {SECTIONS.filter(s => s.mandatory).map(section => {
            const progress = getSectionProgress(section.id);
            const isComplete = progress === 100;
            return (
              <div key={section.id} style={{
                flex: "1",
                minWidth: "150px",
                background: "rgba(255, 255, 255, 0.15)",
                padding: "12px",
                borderRadius: "8px",
                backdropFilter: "blur(10px)"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                  <span style={{ fontSize: "12px", fontWeight: "500" }}>{section.title.replace(" *", "")}</span>
                  {isComplete && <span style={{ fontSize: "16px" }}>✓</span>}
                </div>
                <div style={{
                  height: "6px",
                  background: "rgba(255, 255, 255, 0.3)",
                  borderRadius: "3px",
                  overflow: "hidden"
                }}>
                  <div style={{
                    height: "100%",
                    width: `${progress}%`,
                    background: isComplete ? "#10b981" : "white",
                    transition: "width 0.3s ease"
                  }} />
                </div>
                <div style={{ fontSize: "11px", marginTop: "4px", opacity: 0.9 }}>{progress}% Complete</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTIONS */}
      {SECTIONS.map(section => {
        const progress = getSectionProgress(section.id);
        const isComplete = progress === 100;
        const checkedCount = data?.[section.id]?.checks ? Object.values(data[section.id].checks).filter(Boolean).length : 0;
        
        return (
          <div key={section.id} style={{
            ...card,
            borderLeft: `4px solid ${isComplete ? "#10b981" : section.mandatory ? "#3b82f6" : "#94a3b8"}`,
            position: "relative"
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: isComplete ? "#d1fae5" : section.mandatory ? "#dbeafe" : "#f1f5f9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px"
                }}>
                  {getSectionIcon(section.id)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#111827" }}>
                      {section.title}
                    </h3>
                    {isComplete && (
                      <span style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "4px",
                        padding: "4px 10px",
                        background: "#d1fae5",
                        color: "#065f46",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "600"
                      }}>
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                          <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Complete
                      </span>
                    )}
                    {section.mandatory && !isComplete && (
                      <span style={{
                        padding: "4px 10px",
                        background: "#fef3c7",
                        color: "#92400e",
                        borderRadius: "12px",
                        fontSize: "11px",
                        fontWeight: "600"
                      }}>
                        Required
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: "13px", color: "#6b7280" }}>
                    {checkedCount} of {section.items.length} items completed
                  </div>
                </div>
              </div>
              <div style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: isComplete ? "#d1fae5" : "#f3f4f6",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "600",
                color: isComplete ? "#065f46" : "#6b7280"
              }}>
                {progress}%
              </div>
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "12px",
              marginBottom: "20px"
            }}>
              {section.items.map(item => {
                const isChecked = data?.[section.id]?.checks?.[item] || false;
                return (
                  <label key={item} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px",
                    background: isChecked ? "#f0fdf4" : "#f9fafb",
                    border: `2px solid ${isChecked ? "#10b981" : "#e5e7eb"}`,
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    position: "relative"
                  }}
                  onMouseEnter={(e) => {
                    if (!isChecked) {
                      e.currentTarget.style.borderColor = "#3b82f6";
                      e.currentTarget.style.background = "#eff6ff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isChecked) {
                      e.currentTarget.style.borderColor = "#e5e7eb";
                      e.currentTarget.style.background = "#f9fafb";
                    }
                  }}
                  >
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={e =>
                          updateSection(section.id, "checks", {
                            ...(data?.[section.id]?.checks || {}),
                            [item]: e.target.checked,
                          })
                        }
                        style={{
                          width: "20px",
                          height: "20px",
                          cursor: "pointer",
                          accentColor: "#10b981"
                        }}
                      />
                      {isChecked && (
                        <div style={{
                          position: "absolute",
                          top: "2px",
                          left: "2px",
                          width: "16px",
                          height: "16px",
                          pointerEvents: "none"
                        }}>
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M13.5 4L6 11.5L2.5 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <span style={{
                      fontSize: "14px",
                      color: isChecked ? "#065f46" : "#374151",
                      fontWeight: isChecked ? "500" : "400",
                      flex: 1
                    }}>
                      {item}
                    </span>
                    {isChecked && (
                      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
                        <circle cx="8" cy="8" r="7" fill="#10b981" />
                        <path d="M5 8L7 10L11 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </label>
                );
              })}
            </div>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 200px",
              gap: "16px",
              marginTop: "20px"
            }}>
              <div>
                <label style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px"
                }}>
                  Section Comments / Risks
                </label>
                <textarea
                  placeholder="Add any comments, risks, or observations for this section..."
                  value={data?.[section.id]?.comment || ""}
                  onChange={e =>
                    updateSection(section.id, "comment", e.target.value)
                  }
                  style={{
                    ...textarea,
                    minHeight: "100px",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    padding: "12px",
                    fontSize: "14px",
                    fontFamily: "inherit",
                    resize: "vertical"
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: "block",
                  fontSize: "13px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px"
                }}>
                  Estimated Budget (₹)
                </label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={data?.[section.id]?.budget || ""}
                  onChange={e =>
                    updateSection(section.id, "budget", e.target.value)
                  }
                  style={{
                    ...input,
                    width: "100%",
                    border: "1px solid #d1d5db",
                    borderRadius: "8px",
                    padding: "12px",
                    fontSize: "14px",
                    fontFamily: "inherit"
                  }}
                />
                {data?.[section.id]?.budget && (
                  <div style={{
                    marginTop: "8px",
                    fontSize: "12px",
                    color: "#6b7280"
                  }}>
                    ₹{Number(data[section.id].budget).toLocaleString('en-IN')}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {/* OVERALL REMARKS */}
      <div style={{
        ...card,
        background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
        border: "2px solid #e2e8f0"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
          <div style={{
            width: "48px",
            height: "48px",
            borderRadius: "12px",
            background: "#dbeafe",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px"
          }}>
            📝
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#111827" }}>
              Overall IT Remarks <span style={{ color: "#dc2626" }}>*</span>
            </h3>
            <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#6b7280" }}>
              Provide comprehensive assessment remarks and recommendations
            </p>
          </div>
        </div>
        <textarea
          value={overallRemarks}
          onChange={e => setOverallRemarks(e.target.value)}
          placeholder="Enter your overall assessment, key findings, risks, and recommendations..."
          style={{
            ...textarea,
            minHeight: "120px",
            border: "1px solid #d1d5db",
            borderRadius: "8px",
            padding: "16px",
            fontSize: "14px",
            fontFamily: "inherit",
            resize: "vertical",
            background: "white"
          }}
        />
        <div style={{
          marginTop: "20px",
          padding: "16px",
          background: "white",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <div>
            <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>Total Estimated Budget</div>
            <div style={{ fontSize: "24px", fontWeight: "700", color: "#1e3a8a" }}>
              ₹ {totalBudget.toLocaleString('en-IN')}
            </div>
          </div>
          <div style={{
            padding: "8px 16px",
            background: totalBudget > 0 ? "#dbeafe" : "#f3f4f6",
            borderRadius: "8px",
            fontSize: "13px",
            fontWeight: "600",
            color: totalBudget > 0 ? "#1e40af" : "#6b7280"
          }}>
            {SECTIONS.filter(s => data[s.id]?.budget).length} sections budgeted
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        marginTop: "24px"
      }}>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          style={{
            ...button,
            background: "#fee2e2",
            color: "#dc2626",
            border: "1px solid #fecaca"
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#fecaca";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "#fee2e2";
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginRight: "8px", display: "inline" }}>
            <path d="M5.5 5.5L10.5 10.5M10.5 5.5L5.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          Delete Assessment
        </button>

        <div style={{ display: "flex", gap: "12px" }}>
          {!submitted && (
            <button
              disabled={!canSubmit}
              onClick={handleSubmit}
              style={{
                ...button,
                background: canSubmit ? "#10b981" : "#d1d5db",
                color: "white",
                cursor: canSubmit ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: canSubmit ? "0 4px 12px rgba(16, 185, 129, 0.3)" : "none"
              }}
              onMouseEnter={(e) => {
                if (canSubmit) {
                  e.target.style.background = "#059669";
                }
              }}
              onMouseLeave={(e) => {
                if (canSubmit) {
                  e.target.style.background = "#10b981";
                }
              }}
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 4L6 11.5L2.5 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Submit IT Assessment
            </button>
          )}

          {submitted && !sentToBRT && (
            <button
              onClick={handleSendToBRT}
              style={{
                ...button,
                background: "#3b82f6",
                color: "white",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#2563eb";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#3b82f6";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <path d="M2 8L6 12L14 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Send to BRT Team
            </button>
          )}
        </div>
      </div>

      {/* DOCUMENT PREVIEW MODAL */}
      {showDocumentModal && (
        <div style={modal} onClick={() => setShowDocumentModal(false)}>
          <div style={{ 
            ...modalBox, 
            width: "900px", 
            height: "85vh", 
            maxWidth: "95%", 
            display: "flex", 
            flexDirection: "column",
            padding: 0,
            overflow: "hidden"
          }} onClick={e => e.stopPropagation()}>
            <div style={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              padding: "20px 24px",
              borderBottom: "1px solid #e5e7eb",
              background: "#f9fafb"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "8px",
                  background: "#fee2e2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M14 2V8H20" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "600", color: "#111827" }}>
                    LOI_{branchName.replace(/\s+/g, '_')}_2024.pdf
                  </h3>
                  <p style={{ margin: "4px 0 0 0", fontSize: "12px", color: "#6b7280" }}>
                    Letter of Intent Document
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowDocumentModal(false)} 
                style={{ 
                  background: "none", 
                  border: "none", 
                  fontSize: "24px", 
                  cursor: "pointer", 
                  color: "#6b7280",
                  width: "32px",
                  height: "32px",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#f3f4f6";
                  e.target.style.color = "#111827";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "none";
                  e.target.style.color = "#6b7280";
                }}
              >
                ×
              </button>
            </div>
            <div style={{ 
              flex: 1, 
              backgroundColor: "#f9fafb", 
              padding: "24px", 
              overflowY: "auto"
            }}>
              <div style={{ 
                backgroundColor: "white", 
                width: "100%", 
                minHeight: "100%", 
                padding: "60px", 
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                borderRadius: "8px"
              }}>
                <h1 style={{ textAlign: "center", marginBottom: "40px", color: "#333" }}>LETTER OF INTENT</h1>
                <p style={{ textAlign: "right", marginBottom: "40px" }}>Date: December 18, 2024</p>

                <p><strong>To:</strong> Property Management<br /><strong>Re:</strong> Lease Proposal for {branchName}</p>

                <br />
                <p>Dear Sir/Madam,</p>
                <p>This Letter of Intent ("LOI") outlines the basic terms and conditions under which <strong>Banking_V1</strong> ("Tenant") proposes to lease the property located at <strong>{branchName}</strong> ("Premises").</p>

                <h4 style={{ marginTop: "30px" }}>1. PREMISES</h4>
                <p>Approximately 5,000 sq. ft. of retail space located on the ground floor.</p>

                <h4 style={{ marginTop: "30px" }}>2. USE</h4>
                <p>The Premises shall be used for a retail banking branch.</p>

                <h4 style={{ marginTop: "30px" }}>3. TERM</h4>
                <p>The initial term of the lease shall be ten (10) years.</p>

                <h4 style={{ marginTop: "30px" }}>4. RENT</h4>
                <p>Base rent shall be $50.00 per square foot annually.</p>

                <h4 style={{ marginTop: "30px" }}>5. IT INFRASTRUCTURE</h4>
                <p>Landlord shall provide dedicated conduit for Tenant's telecommunications and data lines. Tenant shall have the right to install a supplementary HVAC unit for the server room.</p>

                <br /><br />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "50px" }}>
                  <div>
                    <hr style={{ width: "200px", margin: "0 0 10px 0" }} />
                    <p>Authorized Signature<br /><strong>Tenant</strong></p>
                  </div>
                  <div>
                    <hr style={{ width: "200px", margin: "0 0 10px 0" }} />
                    <p>Authorized Signature<br /><strong>Landlord</strong></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRM */}
      {showDeleteConfirm && (
        <div style={modal} onClick={() => setShowDeleteConfirm(false)}>
          <div style={modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ marginBottom: "20px" }}>
              <div style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "#fee2e2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px"
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 9V13M12 17H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "600", color: "#111827", marginBottom: "8px" }}>
                Confirm Delete
              </h3>
              <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
                Are you sure you want to delete this IT assessment? This action cannot be undone.
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button 
                onClick={() => setShowDeleteConfirm(false)} 
                style={{
                  ...button,
                  background: "#f3f4f6",
                  color: "#374151"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#e5e7eb";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#f3f4f6";
                }}
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete} 
                style={{
                  ...button,
                  background: "#dc2626",
                  color: "white"
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "#b91c1c";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "#dc2626";
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      <ToastNotification
        show={showNotification}
        message={notificationMessage}
        type={notificationType}
        onClose={() => setShowNotification(false)}
      />
    </div>
  );
}

/* ===================== STYLES ===================== */

const card = {
  background: "#fff",
  padding: "24px",
  borderRadius: "12px",
  marginBottom: "24px",
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  border: "1px solid #e5e7eb",
  transition: "all 0.2s"
};

const checkItem = { display: "block", marginBottom: 6 };

const textarea = {
  width: "100%",
  marginTop: 10,
  padding: 8,
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "14px",
  fontFamily: "inherit",
  resize: "vertical"
};

const input = {
  marginTop: 10,
  padding: 6,
  width: 220,
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "14px",
  fontFamily: "inherit"
};

const button = {
  padding: "12px 24px",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center"
};

const badge = {
  background: "#e3f2fd",
  color: "#1976d2",
  padding: "6px 12px",
  borderRadius: 14,
  height: "fit-content",
};

const modal = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  backdropFilter: "blur(4px)"
};

const modalBox = {
  background: "#fff",
  padding: "24px",
  borderRadius: "12px",
  width: 320,
  boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
};
