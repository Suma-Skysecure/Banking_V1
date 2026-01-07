"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";

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
    alert("IT Assessment submitted (65%)");
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
    alert("Sent to BRT Team");
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

    alert("IT Assessment deleted successfully");
  };

  /* ===================== UI ===================== */

  if (!branchId) return <p style={{ padding: 24 }}>Invalid Branch</p>;

  return (
    <div style={{ maxWidth: 1100, margin: "auto", padding: 24 }}>
      {/* HEADER REMOVED AS REQUESTED */}

      {/* POST-LOI ACTIVITY HEADER */}
      {/* Header removed */}

      {/* BRANCH DETAILS HEADER CARD */}
      <div style={{ ...card, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h2 style={{ color: "#1e3a8a", fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>{branchName}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#6b7280", marginBottom: "16px" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <span style={{ fontSize: "14px" }}>1450 Biscayne Boulevard, Miami, FL 33132</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "6px", backgroundColor: "#eff6ff", color: "#1e40af", padding: "4px 12px", borderRadius: "100px", fontSize: "13px", fontWeight: "600" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              Pending Payment Approval
            </span>
            <span style={{ color: "#6b7280", fontSize: "13px" }}>Property ID: PROP-MIA-2024-002</span>
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ color: "#1e3a8a", fontSize: "24px", fontWeight: "700", marginBottom: "4px" }}>₹ 48,43,00,000</div>
          <div style={{ color: "#6b7280", fontSize: "12px" }}>LOI Circulated on Dec 18, 2024</div>
        </div>
      </div>

      {/* BUSINESS DETAILS SUMMARY */}
      <div style={card}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="3" x2="9" y2="21"></line>
          </svg>
          <h3 style={{ margin: 0, color: "#1e3a8a", fontSize: "16px", fontWeight: "600" }}>Business Details Summary</h3>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
          {/* Row 1 */}
          <div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#9ca3af", marginBottom: "4px", textTransform: "uppercase" }}>PROPERTY ID</div>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>PROP-MIA-2024-002</div>
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#9ca3af", marginBottom: "4px", textTransform: "uppercase" }}>PARKING SPACES</div>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>8 Reserved</div>
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#9ca3af", marginBottom: "4px", textTransform: "uppercase" }}>ZONING</div>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>Commercial/Retail</div>
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#9ca3af", marginBottom: "4px", textTransform: "uppercase" }}>PROPERTY TYPE</div>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>Mixed Use</div>
          </div>

          {/* Row 2 */}
          <div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#9ca3af", marginBottom: "4px", textTransform: "uppercase" }}>YEAR BUILT</div>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>2019</div>
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#9ca3af", marginBottom: "4px", textTransform: "uppercase" }}>LISTING STATUS</div>
            <div style={{ display: "inline-block", backgroundColor: "#d1fae5", color: "#065f46", fontSize: "12px", fontWeight: "600", padding: "2px 8px", borderRadius: "4px" }}>Active</div>
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#9ca3af", marginBottom: "4px", textTransform: "uppercase" }}>TOTAL AREA</div>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>4,200 sq ft</div>
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#9ca3af", marginBottom: "4px", textTransform: "uppercase" }}>VENDOR NAME</div>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>Biscayne Development</div>
          </div>

          {/* Row 3 */}
          <div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#9ca3af", marginBottom: "4px", textTransform: "uppercase" }}>AVAILABILITY</div>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>30 days</div>
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#9ca3af", marginBottom: "4px", textTransform: "uppercase" }}>FLOOR LEVEL</div>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>Ground Floor + Mezzanine</div>
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#9ca3af", marginBottom: "4px", textTransform: "uppercase" }}>VENDOR CONTACT</div>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>+1 (305) 555-0198</div>
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: "700", color: "#9ca3af", marginBottom: "4px", textTransform: "uppercase" }}>LAST INSPECTION</div>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#374151" }}>Dec 10, 2024</div>
          </div>
        </div>
      </div>
      <div style={card}>
        <h3>LOI Document</h3>
        {uploadedLOI ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px", border: "1px solid #e0e0e0", borderRadius: "8px", backgroundColor: "#f9fafb" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <div style={{ width: "40px", height: "40px", backgroundColor: "#ffebee", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "#f44336" }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              </div>
              <div>
                <div style={{ fontWeight: "600", color: "#333", marginBottom: "4px" }}>{uploadedLOI.name}</div>
                <div style={{ fontSize: "12px", color: "#666" }}>
                  Uploaded on {formatDate(uploadedLOI.uploadDate)} • {formatFileSize(uploadedLOI.size)}
                </div>
              </div>
            </div>
            <button
              onClick={handleViewDocument}
              style={{ padding: "8px 16px", backgroundColor: "#1e40af", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: "500" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              View Document
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px", border: "1px solid #e0e0e0", borderRadius: "8px", backgroundColor: "#f9fafb", color: "#666", fontSize: "14px", textAlign: "center" }}>
            No LOI document uploaded yet. Please upload a signed LOI document from the Legal Workflow page.
          </div>
        )}
      </div>

      {/* SECTIONS */}
      {SECTIONS.map(section => (
        <div key={section.id} style={card}>
          <h3>{section.title}</h3>

          {section.items.map(item => (
            <label key={item} style={checkItem}>
              <input
                type="checkbox"
                checked={data?.[section.id]?.checks?.[item] || false}
                onChange={e =>
                  updateSection(section.id, "checks", {
                    ...(data?.[section.id]?.checks || {}),
                    [item]: e.target.checked,
                  })
                }
              />
              {item}
            </label>
          ))}

          <textarea
            placeholder="Section comments / risks"
            value={data?.[section.id]?.comment || ""}
            onChange={e =>
              updateSection(section.id, "comment", e.target.value)
            }
            style={textarea}
          />

          <input
            type="number"
            placeholder="Estimated budget ₹"
            value={data?.[section.id]?.budget || ""}
            onChange={e =>
              updateSection(section.id, "budget", e.target.value)
            }
            style={input}
          />
        </div>
      ))}

      {/* OVERALL */}
      <div style={card}>
        <h3>Overall IT Remarks *</h3>
        <textarea
          value={overallRemarks}
          onChange={e => setOverallRemarks(e.target.value)}
          style={textarea}
        />
        <h4>Total Estimated Budget: ₹ {totalBudget.toLocaleString()}</h4>
      </div>

      {/* ACTIONS */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          style={{ ...button, background: "#f44336" }}
        >
          Delete Assessment
        </button>

        <div>
          {!submitted && (
            <button
              disabled={!canSubmit}
              onClick={handleSubmit}
              style={{
                ...button,
                background: canSubmit ? "#4caf50" : "#ccc",
              }}
            >
              Submit IT Assessment
            </button>
          )}

          {submitted && !sentToBRT && (
            <button
              onClick={handleSendToBRT}
              style={{ ...button, background: "#1976d2" }}
            >
              Send to BRT Team
            </button>
          )}
        </div>
      </div>

      {/* DOCUMENT PREVIEW MODAL */}
      {showDocumentModal && (
        <div style={modal} onClick={() => setShowDocumentModal(false)}>
          <div style={{ ...modalBox, width: "800px", height: "80vh", maxWidth: "90%", display: "flex", flexDirection: "column" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid #eee", paddingBottom: "15px" }}>
              <h3 style={{ margin: 0 }}>LOI_{branchName.replace(/\s+/g, '_')}_2024.pdf</h3>
              <button onClick={() => setShowDocumentModal(false)} style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#666" }}>×</button>
            </div>
            <div style={{ flex: 1, backgroundColor: "#f5f5f5", borderRadius: "8px", padding: "40px", overflowY: "auto", border: "1px solid #ddd" }}>
              <div style={{ backgroundColor: "white", width: "100%", minHeight: "800px", padding: "60px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
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
        <div style={modal}>
          <div style={modalBox}>
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this IT assessment?</p>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={handleDelete} style={{ ...button, background: "#f44336" }}>
                Yes, Delete
              </button>
              <button onClick={() => setShowDeleteConfirm(false)} style={button}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===================== STYLES ===================== */

const card = {
  background: "#fff",
  padding: 20,
  borderRadius: 10,
  marginBottom: 20,
  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
};

const checkItem = { display: "block", marginBottom: 6 };

const textarea = {
  width: "100%",
  marginTop: 10,
  padding: 8,
};

const input = {
  marginTop: 10,
  padding: 6,
  width: 220,
};

const button = {
  padding: "12px 24px",
  color: "#fff",
  border: "none",
  borderRadius: 6,
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
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
};

const modalBox = {
  background: "#fff",
  padding: 20,
  borderRadius: 10,
  width: 320,
};
