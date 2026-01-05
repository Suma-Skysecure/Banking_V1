"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import DashboardHeader from "@/components/DashboardHeader";
import ToastNotification from "@/components/ToastNotification";
import LegalDueDashboard from "./LegalDueDashboard";
import LegalDecisionPanel from "./LegalDecisionPanel";
import LegalComplianceStatus from "./LegalComplianceStatus";
import LegalDueDetailsModal from "./LegalDueDetailsModal";
import LegalDocumentsView from "./LegalDocumentsView";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/postLOIActivities.css";
import "@/css/businessApproval.css";

export default function LegalDueDiligencePage() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");
  const [uploadedLOI, setUploadedLOI] = useState(null);

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

  // State for legal due diligence process
  const [callRequired, setCallRequired] = useState(null);
  const [legalClearanceGranted, setLegalClearanceGranted] = useState(false);
  const [brtConfirmed, setBrtConfirmed] = useState(false);
  const [businessDecisionStatus, setBusinessDecisionStatus] = useState("pending");
  const [complianceConfirmed, setComplianceConfirmed] = useState(false);
  const [isFinalized, setIsFinalized] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Sample tasks data
  const [tasks, setTasks] = useState([
    {
      id: "1",
      taskName: "Legal Due Diligence Review",
      status: "Pending",
      owner: "Legal Team",
      lastUpdated: "Dec 18, 2024",
    },
  ]);

  const handleShowToast = (message, type = "success") => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
  };

  const handleCallRequiredChange = (value) => {
    setCallRequired(value);
    if (value === "yes") {
      setBrtConfirmed(false);
      setBusinessDecisionStatus("pending");
    }
  };

  const handleGrantClearance = () => {
    setLegalClearanceGranted(true);
    setIsFinalized(true);
    // Update task status
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === "1" ? { ...task, status: "Approved" } : task
      )
    );
  };

  const handleBrtConfirmed = (confirmed) => {
    setBrtConfirmed(confirmed);
  };

  const handleBusinessDecisionComplete = (status) => {
    setBusinessDecisionStatus(status);
    if (status === "approved") {
      setComplianceConfirmed(true);
    }
  };

  const handleViewLOI = () => {
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
      // Fallback to original behavior
      window.open("/api/documents/loi", "_blank");
      alert("Opening LOI document in new window...");
    }
  };

  const handleDownloadLOI = () => {
    // Create a dummy PDF blob for download (in production, this would fetch from API)
    const blob = new Blob(["LOI Document Content"], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "LOI_Downtown_Arts_Plaza_2024.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleViewDetails = (e, task) => {
    e.preventDefault();
    console.log("View details clicked for task:", task);
    
    // Check if this is the "Legal Due Diligence Review" task
    // The task object from DashboardTable has 'name' property (from transformed task)
    // Also check the original task data to find the first task
    const taskName = task.name || "";
    const taskId = task.id || "";
    
    const isLegalDueDiligenceReview = 
      taskName === "Legal Due Diligence Review" || 
      taskId === "1" || 
      taskId === "Legal Due Diligence Review" ||
      taskName.includes("Legal Due Diligence Review") ||
      taskName.includes("Legal Due Diligence");
    
    if (isLegalDueDiligenceReview) {
      console.log("Opening Legal Due Details Modal for task:", task);
      setSelectedTask(task);
      setIsDetailsModalOpen(true);
    } else {
      console.log("Task is not Legal Due Diligence Review:", task);
    }
  };

  // Determine final status
  const getFinalStatus = () => {
    if (isFinalized && legalClearanceGranted) {
      if (callRequired === "no") {
        return "completed";
      }
      if (callRequired === "yes" && complianceConfirmed) {
        return "completed";
      }
    }
    return "pending";
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="dashboard-main">
          <div className="main-content">
            <PageHeader
              title="Legal Due Diligence"
              subtitle="Step 5.2 - Legal Clearance Activities"
            />

            {/* LOI Document Card */}
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
                <h3 className="card-title">LOI Document</h3>
              </div>
              <div style={{ padding: "20px" }}>
                {uploadedLOI ? (
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
                        backgroundColor: "#fee2e2",
                        borderRadius: "6px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0
                      }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                            stroke="#ef4444"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M14 2V8H20"
                            stroke="#ef4444"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M16 13H8M16 17H8M10 9H8"
                            stroke="#ef4444"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: "14px", fontWeight: "600", color: "#111827", marginBottom: "4px" }}>
                          {uploadedLOI.name}
                        </div>
                        <div style={{ fontSize: "12px", color: "#6b7280" }}>
                          Uploaded on {formatDate(uploadedLOI.uploadDate)} • {formatFileSize(uploadedLOI.size)}
                        </div>
                      </div>
                    </div>
                    <button
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px 20px",
                        backgroundColor: "#1e3a8a",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "14px",
                        fontWeight: "600",
                        cursor: "pointer",
                        transition: "background-color 0.2s",
                        flexShrink: 0
                      }}
                      onMouseEnter={(e) => (e.target.style.backgroundColor = "#1e40af")}
                      onMouseLeave={(e) => (e.target.style.backgroundColor = "#1e3a8a")}
                      onClick={handleViewLOI}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M8 4C4 4 1.33333 6.66667 1 8C1.33333 9.33333 4 12 8 12C12 12 14.6667 9.33333 15 8C14.6667 6.66667 12 4 8 4Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <circle
                          cx="8"
                          cy="8"
                          r="2"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                      View Document
                    </button>
                  </div>
                ) : (
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "40px 20px",
                    backgroundColor: "#f9fafb",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    color: "#6b7280",
                    fontSize: "14px"
                  }}>
                    No LOI document uploaded yet. Please upload a signed LOI document from the Legal Workflow page.
                  </div>
                )}
              </div>
            </div>

            {/* Legal Due Diligence Dashboard */}
            <LegalDueDashboard tasks={tasks} onViewDetails={handleViewDetails} />

            {/* Legal Documents View */}
            <LegalDocumentsView />

            {/* Legal Decision Panel */}
            <LegalDecisionPanel
              callRequired={callRequired}
              onCallRequiredChange={handleCallRequiredChange}
              onGrantClearance={handleGrantClearance}
              isFinalized={isFinalized}
              onShowToast={handleShowToast}
              onBrtConfirmed={handleBrtConfirmed}
              onBusinessDecisionComplete={handleBusinessDecisionComplete}
            />

            {/* Compliance Status */}
            {(legalClearanceGranted || callRequired === "yes") && (
              <LegalComplianceStatus
                businessDecisionStatus={businessDecisionStatus}
                complianceConfirmed={complianceConfirmed}
                finalStatus={getFinalStatus()}
              />
            )}
          </div>
        </main>
      </div>

      {/* Toast Notification */}
      <ToastNotification
        show={showNotification}
        message={notificationMessage}
        type={notificationType}
        onClose={() => setShowNotification(false)}
      />

      {/* Legal Due Details Modal */}
      <LegalDueDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedTask(null);
        }}
      />
    </div>
  );
}

