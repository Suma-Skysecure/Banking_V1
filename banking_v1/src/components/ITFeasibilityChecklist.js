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

  /* ===================== LOAD (CLIENT SAFE) ===================== */

  useEffect(() => {
    if (!branchId) return;

    const branchMap = JSON.parse(
      localStorage.getItem("branchMap") || "{}"
    );

    const saved = JSON.parse(
      localStorage.getItem(`itAssessment_${branchId}`) || "{}"
    );

    setBranchName(branchMap[branchId] || `Branch ${branchId}`);
    setData(saved.data || {});
    setOverallRemarks(saved.overallRemarks || "");
    setSubmitted(Boolean(saved.submitted));
    setSentToBRT(Boolean(saved.sentToBRT));
  }, [branchId]);

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
    (s) =>
      data[s.id]?.checks &&
      Object.values(data[s.id].checks).some(Boolean)
  );

  const canSubmit =
    mandatoryCompleted && overallRemarks.trim() !== "";

  /* ===================== DASHBOARD UPDATE ===================== */

  const updateDashboard = (status, progress) => {
    const all = JSON.parse(localStorage.getItem("itStatuses") || "{}");
    all[branchId] = { status, progress };
    localStorage.setItem("itStatuses", JSON.stringify(all));
  };

  /* ===================== ACTIONS ===================== */

  const handleSubmit = () => {
    localStorage.setItem(
      `itAssessment_${branchId}`,
      JSON.stringify({
        data,
        overallRemarks,
        submitted: true,
        sentToBRT: false,
        submittedBy: user?.username || "IT User",
        submittedAt: new Date().toISOString(),
      })
    );

    updateDashboard("In Progress", 65);
    setSubmitted(true);
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

  /* ===================== UI ===================== */

  if (!branchId) return <p style={{ padding: 24 }}>Invalid Branch</p>;

  return (
    <div style={{ maxWidth: 1100, margin: "auto", padding: 24 }}>
      <h1>IT Feasibility Assessment</h1>
      <p><b>Branch:</b> {branchName}</p>

      {SECTIONS.map((section) => (
        <div key={section.id} style={card}>
          <h3>{section.title}</h3>

          {section.items.map((item) => (
            <label key={item} style={checkItem}>
              <input
                type="checkbox"
                checked={data?.[section.id]?.checks?.[item] || false}
                onChange={(e) =>
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
            onChange={(e) =>
              updateSection(section.id, "comment", e.target.value)
            }
            style={textarea}
          />

          <input
            type="number"
            placeholder="Estimated budget ₹"
            value={data?.[section.id]?.budget || ""}
            onChange={(e) =>
              updateSection(section.id, "budget", e.target.value)
            }
            style={input}
          />
        </div>
      ))}

      <div style={card}>
        <h3>Overall IT Remarks *</h3>
        <textarea
          value={overallRemarks}
          onChange={(e) => setOverallRemarks(e.target.value)}
          style={textarea}
        />
        <h4>Total Estimated Budget: ₹ {totalBudget.toLocaleString()}</h4>
      </div>

      <div style={{ textAlign: "right" }}>
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
