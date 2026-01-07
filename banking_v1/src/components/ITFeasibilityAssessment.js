"use client";

import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/contexts/NotificationContext";

/* ===================== CHECKLIST ===================== */

const SECTIONS = [
  {
    id: "network",
    title: "Network & Connectivity *",
    items: [
      "LAN / WAN cabling completed",
      "Primary Internet available",
      "Backup Internet available",
      "Firewall configured",
    ],
  },
  {
    id: "hardware",
    title: "Hardware & Power *",
    items: [
      "Workstations provisioned",
      "Server / data room ready",
      "UPS installed",
      "Cooling & ventilation adequate",
    ],
  },
  {
    id: "software",
    title: "Software & Security *",
    items: [
      "Operating system licensed",
      "Core application compatible",
      "Antivirus installed",
      "Access control configured",
    ],
  },
  {
    id: "dr",
    title: "Business Continuity & DR",
    items: [
      "Backup strategy defined",
      "Backup tested",
      "Disaster recovery plan available",
    ],
  },
];

/* ===================== COMPONENT ===================== */

export default function ITFeasibilityAssessment({ params }) {
  const { user } = useAuth();
  const { createNotification } = useNotifications();

  // ✅ SAFE branchId
  const branchId = params?.branchId ?? null;

  const [branchName, setBranchName] = useState("");
  const [data, setData] = useState({});
  const [overallComment, setOverallComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sentToBRT, setSentToBRT] = useState(false);

  /* ===================== LOAD (CLIENT ONLY) ===================== */

  useEffect(() => {
    if (!branchId) return;

    // ✅ localStorage ONLY inside useEffect
    const assessment = JSON.parse(
      window.localStorage.getItem(`itAssessment_${branchId}`) || "{}"
    );

    const branchMap = JSON.parse(
      window.localStorage.getItem("branchMap") || "{}"
    );

    setBranchName(branchMap[branchId] || `Branch ${branchId}`);
    setData(assessment.data || {});
    setOverallComment(assessment.overallComment || "");
    setSubmitted(Boolean(assessment.submitted));
    setSentToBRT(Boolean(assessment.sentToBRT));
  }, [branchId]);

  /* ===================== HELPERS ===================== */

  const updateField = (sectionId, field, value) => {
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

  const hasChecklist = Object.values(data).some(
    (sec) => sec?.checks && Object.values(sec.checks).some(Boolean)
  );

  const canSubmit = hasChecklist && overallComment.trim() !== "";

  /* ===================== DASHBOARD SYNC ===================== */

  const updateDashboard = (status, progress) => {
    const all = JSON.parse(
      window.localStorage.getItem("itStatuses") || "{}"
    );
    all[branchId] = { status, progress };
    window.localStorage.setItem("itStatuses", JSON.stringify(all));
  };

  /* ===================== ACTIONS ===================== */

  const handleSubmit = () => {
    window.localStorage.setItem(
      `itAssessment_${branchId}`,
      JSON.stringify({
        data,
        overallComment,
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
      window.localStorage.getItem(`itAssessment_${branchId}`) || "{}"
    );

    saved.sentToBRT = true;
    saved.sentToBRTAt = new Date().toISOString();

    window.localStorage.setItem(
      `itAssessment_${branchId}`,
      JSON.stringify(saved)
    );

    updateDashboard("Pending Approval", 65);
    setSentToBRT(true);

    createNotification(
      `IT Team has updated the assessment form for ${branchName} and sent it for BRT approval`,
      "info",
      "/brt-details",
      "BRT"
    );

    alert("Sent to BRT Team");
  };

  /* ===================== UI ===================== */

  if (!branchId) {
    return <p style={{ padding: 24 }}>Invalid Branch</p>;
  }

  return (
    <div style={page}>
      <div style={header}>
        <div>
          <h1>IT Feasibility Assessment</h1>
          <p>
            Branch: <b>{branchName}</b>
          </p>
        </div>
        {submitted && <span style={badge}>Submitted</span>}
      </div>

      {SECTIONS.map((section) => (
        <div key={section.id} style={card}>
          <h3>{section.title}</h3>

          {section.items.map((item) => (
            <label key={item} style={checkItem}>
              <input
                type="checkbox"
                checked={data?.[section.id]?.checks?.[item] || false}
                onChange={(e) =>
                  updateField(section.id, "checks", {
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
              updateField(section.id, "comment", e.target.value)
            }
            style={textarea}
          />

          <input
            type="number"
            placeholder="Estimated budget ₹"
            value={data?.[section.id]?.budget || ""}
            onChange={(e) =>
              updateField(section.id, "budget", e.target.value)
            }
            style={input}
          />
        </div>
      ))}

      <div style={card}>
        <h3>
          Overall IT Remarks <span style={{ color: "red" }}>*</span>
        </h3>
        <textarea
          value={overallComment}
          onChange={(e) => setOverallComment(e.target.value)}
          style={textarea}
        />
        <h4>Total Budget: ₹ {totalBudget.toLocaleString()}</h4>
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

const page = { maxWidth: 1100, margin: "auto", padding: 24 };

const header = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 20,
};

const badge = {
  background: "#e3f2fd",
  color: "#1976d2",
  padding: "6px 12px",
  borderRadius: 14,
};

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
