"use client";

import Link from "next/link";
import "@/css/workflowTimeline.css";

export default function WorkflowTimeline({ activeStage = "Property Search" }) {
  const stages = [
    {
      id: "property-search",
      name: "Property Search",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 10C21 16.6274 12 22 12 22C12 22 3 16.6274 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
          <path
            d="M15 7L17 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
      href: "/property-search",
      color: "gray",
    },
    {
      id: "business-approval",
      name: "Business Approval",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
          <path d="M8 10H16M8 14H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      ),
      color: "gray",
    },
    {
      id: "legal-workflow",
      name: "Legal Workflow",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M8 4L4 8V20H16V4H8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 8H8V4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 12H14M10 16H14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M6 20V22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
      color: "gray",
    },
    {
      id: "post-loi",
      name: "Post-LOI Activities",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M9 15L11 17L15 13"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 18H8"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
      color: "gray",
    },
    {
      id: "agreement-execution",
      name: "Agreement Execution",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M8 12C8 12 10 14 12 14C14 14 16 12 16 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      ),
      color: "gray",
    },
    {
      id: "agreement-registration",
      name: "Agreement Registration",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M8 4L4 8V20H16V4H8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 8H8V4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 12H14M10 16H14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M6 20V22"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
      color: "gray",
    },
    {
      id: "project-execution",
      name: "Project Execution",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M8 20L8 14L4 12L8 10L8 4L12 6L16 4L16 10L20 12L16 14L16 20L12 18L8 20Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 8V16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
      href: "/project-execution",
      color: "gray",
    },
    {
      id: "final-launch",
      name: "Final Launch",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M5 17L12 2L19 17M5 17H19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5 17L12 22L19 17"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="17" r="2" fill="currentColor" />
        </svg>
      ),
      color: "gray",
    },
  ];

  const getStageStatus = (stage, index) => {
    const activeIndex = stages.findIndex((s) => s.name === activeStage);
    
    if (stage.name === activeStage) {
      return "active";
    }
    if (index < activeIndex) {
      return "completed";
    }
    return "pending";
  };

  return (
    <div className="workflow-timeline">
      <div className="timeline-container">
        {stages.map((stage, index) => {
          const status = getStageStatus(stage, index);
          const isLast = index === stages.length - 1;
          const isActive = status === "active";
          const isCompleted = status === "completed";

          // Determine colors based on status
          let iconColor, labelColor;
          if (isActive) {
            iconColor = "orange";
            labelColor = "orange";
          } else if (isCompleted) {
            iconColor = "blue";
            labelColor = "blue";
          } else {
            iconColor = "gray";
            labelColor = "gray";
          }

          const StageContent = (
            <div className={`timeline-stage ${status}`}>
              <div className={`stage-icon ${iconColor} ${status}`}>
                {stage.icon}
              </div>
              <div className={`stage-label ${labelColor} ${status}`}>
                {stage.name}
              </div>
            </div>
          );

          return (
            <div key={stage.id} className="timeline-item">
              {stage.href ? (
                <Link href={stage.href} className="timeline-link">
                  {StageContent}
                </Link>
              ) : (
                StageContent
              )}
              {!isLast && (
                <div className={`timeline-connector ${isActive || isCompleted ? "active" : ""}`}></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

