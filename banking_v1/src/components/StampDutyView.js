"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import { useState } from "react";

export default function StampDutyView() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const containerRef = useRef(null);

  // Disable right-click, context menu, and keyboard shortcuts
  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    const handleKeyDown = (e) => {
      // Disable common save/download shortcuts
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "s" || e.key === "S" || e.key === "p" || e.key === "P")
      ) {
        e.preventDefault();
        return false;
      }
      // Disable F12, Ctrl+Shift+I (DevTools)
      if (e.key === "F12" || ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "I")) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleBack = () => {
    router.push("/legal-workflow");
  };

  return (
    <div className="dashboard-container">
      {/* ================= HEADER ================= */}
      <header className="dashboard-header">
        <button
          className="header-hamburger"
          onClick={() => setSidebarOpen((p) => !p)}
        >
          ☰
        </button>

        <div className="header-search">
          <input placeholder="Search branch..." />
        </div>

        {/* Profile section removed - no user information displayed */}
      </header>

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} />

        {/* ================= MAIN ================= */}
        <main className="dashboard-main">
          <PageHeader
            title="Stamp Duty Paper - View Only"
            subtitle="Confidential document - Viewing only. Download and save are disabled."
          />

          {/* ================= BACK BUTTON ================= */}
          <div style={{ marginBottom: "16px" }}>
            <button
              type="button"
              className="btn secondary"
              onClick={handleBack}
            >
              ← Back to Legal Workflow
            </button>
          </div>

          {/* ================= DOCUMENT VIEWER ================= */}
          <div className="card" ref={containerRef}>
            <div
              style={{
                position: "relative",
                width: "100%",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                overflow: "auto",
                background: "#ffffff",
                padding: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                maxHeight: "calc(100vh - 350px)",
              }}
            >
              {/* Stamp Duty Certificate Image */}
              <img
                src="/assets/legal/stamp-duty-certificate..png"
                alt="Stamp Duty Certificate"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  display: "block",
                  userSelect: "none",
                  pointerEvents: "none",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                }}
                onContextMenu={(e) => e.preventDefault()}
                onDragStart={(e) => e.preventDefault()}
                draggable={false}
                onError={(e) => {
                  console.error("Image failed to load. Check the path:", e.target.src);
                  e.target.style.display = "none";
                }}
              />

              {/* Overlay message for view-only */}
              <div
                style={{
                  position: "sticky",
                  top: "10px",
                  right: "10px",
                  float: "right",
                  background: "rgba(37, 99, 235, 0.9)",
                  color: "white",
                  padding: "8px 12px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: "600",
                  pointerEvents: "none",
                  zIndex: 10,
                  margin: "10px",
                }}
              >
                VIEW ONLY - Confidential
              </div>
            </div>

            {/* Security Notice */}
            <div
              style={{
                marginTop: "16px",
                padding: "12px",
                background: "#fef3c7",
                border: "1px solid #fbbf24",
                borderRadius: "8px",
                fontSize: "13px",
                color: "#92400e",
              }}
            >
              <strong>Security Notice:</strong> This document is confidential. Right-click, download, and save functions are disabled. Please do not attempt to capture or share this document.
            </div>
          </div>
        </main>
      </div>

      {/* ================= STYLES ================= */}
      <style jsx global>{`
        .dashboard-container {
          min-height: 100vh;
          background: #f8fafc;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 20px;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
        }

        .header-hamburger {
          font-size: 18px;
          background: none;
          border: none;
          cursor: pointer;
        }

        .header-search input {
          padding: 6px 10px;
          border-radius: 6px;
          border: 1px solid #d1d5db;
        }

        .dashboard-content-wrapper {
          display: flex;
        }

        .dashboard-main {
          flex: 1;
          padding: 24px;
        }

        .card {
          background: #ffffff;
          padding: 24px;
          border-radius: 12px;
          margin-bottom: 24px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .btn {
          padding: 10px 18px;
          border-radius: 8px;
          font-size: 14px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
          transition: background-color 0.15s ease, box-shadow 0.15s ease,
            color 0.15s ease, transform 0.05s ease;
        }

        .btn.secondary {
          background: #e5e7eb;
          color: #111827;
        }

        .btn.secondary:hover {
          background: #d1d5db;
        }

        @media (max-width: 768px) {
          .dashboard-main {
            padding: 16px;
          }image.png
        }
      `}</style>
    </div>
  );
}