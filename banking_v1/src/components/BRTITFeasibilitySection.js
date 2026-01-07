"use client";

import { useState, useEffect } from "react";
import { useNotifications } from "@/contexts/NotificationContext";

const SECTIONS = [
  { id: "network", title: "Network & Connectivity" },
  { id: "hardware", title: "Hardware & Infrastructure" },
  { id: "power", title: "Power & Utilities" },
  { id: "software", title: "Software & Applications" },
  { id: "security", title: "Security & Compliance" },
  { id: "dr", title: "Business Continuity & DR" },
  { id: "compliance", title: "Regulatory & Audit Readiness" },
];

export default function ITFeasibilitySection() {
  const { createNotification } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [branches, setBranches] = useState([]);
  const [recentSubmission, setRecentSubmission] = useState(null);

  // Load data from localStorage
  useEffect(() => {
    // Define base branches (simulating database)
    const baseBranches = [
      { id: 1, name: "Downtown Manhattan Branch", location: "New York, NY", size: "5,000 sq ft", stage: "Legal Workflow" },
      { id: 2, name: "Beverly Hills Boutique", location: "Los Angeles, CA", size: "3,200 sq ft", stage: "Project Execution" },
      { id: 3, name: "Chicago River North Site", location: "Chicago, IL", size: "4,100 sq ft", stage: "Business Approval" },
      { id: 4, name: "Miami South Beach Location", location: "Miami, FL", size: "3,800 sq ft", stage: "Business Approval" },
    ];

    const statuses = JSON.parse(localStorage.getItem("itStatuses") || "{}");

    // enhance branches with status
    const enhancedBranches = baseBranches.map(b => {
      const statusData = statuses[b.id] || {};
      const status = statusData.status || "Pending IT Assessment";

      let statusColor = "gray";
      if (status === "In Progress") statusColor = "yellow";
      if (status === "Completed") statusColor = "green";
      if (status === "Pending Approval") statusColor = "orange";
      if (status === "Rejected") statusColor = "red";

      // Load assessment data if exists
      const assessmentData = JSON.parse(localStorage.getItem(`itAssessment_${b.id}`) || "null");

      return {
        ...b,
        status,
        statusColor,
        assessment: assessmentData
      };
    });

    setBranches(enhancedBranches);

    // Find most recent submission
    const submissions = enhancedBranches
      .filter(b => b.assessment && b.assessment.submitted)
      .sort((a, b) => new Date(b.assessment.submittedAt) - new Date(a.assessment.submittedAt));

    if (submissions.length > 0) {
      const latest = submissions[0];
      setRecentSubmission({
        branchName: latest.name,
        submittedBy: latest.assessment.submittedBy,
        timestamp: new Date(latest.assessment.submittedAt).toLocaleString(),
        // Collect a summary of checked items
        feasibilityItems: collectFeasibilitySummary(latest.assessment.data)
      });
    }
  }, []);

  const collectFeasibilitySummary = (data) => {
    if (!data) return [];
    const items = [];
    SECTIONS.forEach(sec => {
      if (data[sec.id]?.checks) {
        Object.entries(data[sec.id].checks).forEach(([key, value]) => {
          if (value) items.push(key);
        });
      }
    });
    return items.slice(0, 5); // Return top 5 checked items
  };

  const getStatusBadgeColor = (statusColor) => {
    const colorMap = {
      green: "bg-green-100 text-green-800 border-green-200",
      yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
      orange: "bg-orange-100 text-orange-800 border-orange-200",
      red: "bg-red-100 text-red-800 border-red-200",
      gray: "bg-gray-100 text-gray-800 border-gray-200"
    };
    return colorMap[statusColor] || colorMap.gray;
  };

  const handleStatusUpdate = (newStatus, successMessage, branchOverride = null) => {
    let targetBranch = branchOverride || selectedBranch;

    // If no selected branch (modal) and no override, try recent submission
    if (!targetBranch && recentSubmission) {
      targetBranch = branches.find(b => b.name === recentSubmission.branchName);
    }

    if (!targetBranch) return;

    const statuses = JSON.parse(localStorage.getItem("itStatuses") || "{}");
    statuses[targetBranch.id] = {
      ...statuses[targetBranch.id],
      status: newStatus,
      progress: newStatus === "Completed" ? 100 : (statuses[targetBranch.id]?.progress || 0)
    };

    localStorage.setItem("itStatuses", JSON.stringify(statuses));

    // Create Notification using Context
    createNotification(
      `BRT Team has ${newStatus === 'Completed' ? 'approved' : 'rejected'} the assessment for ${targetBranch.name}.`,
      newStatus === "Completed" ? "success" : "error",
      "/it-assessment",
      "IT team"
    );

    // Dispatch custom event for same-tab updates (existing logic)
    window.dispatchEvent(new Event("notification-update"));

    setNotification(successMessage);
    setTimeout(() => setNotification(null), 3000);

    // Update local state
    setBranches(prev => prev.map(b => {
      if (b.id === targetBranch.id) {
        let statusColor = "gray";
        if (newStatus === "In Progress") statusColor = "yellow";
        if (newStatus === "Completed") statusColor = "green";
        if (newStatus === "Pending Approval") statusColor = "orange";
        if (newStatus === "Rejected") statusColor = "red";
        return { ...b, status: newStatus, statusColor };
      }
      return b;
    }));

    if (isModalOpen) setIsModalOpen(false);
  };

  const handleApprove = (branch = null) => handleStatusUpdate("Completed", "Approved: Branch assessment marked as Completed.", branch);
  const handleDisapprove = (branch = null) => handleStatusUpdate("Rejected", "Rejected: Branch assessment returned to IT.", branch);

  const handleViewAssessment = (branch) => {
    setSelectedBranch(branch);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBranch(null);
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-sm">
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">IT Feasibility Assessment</h2>
        <p className="text-gray-600">
          Evaluate technical feasibility and infrastructure requirements for selected properties
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search branches, locations, assessments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {/* Select Branch for Assessment - Card Layout */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Branch for Assessment</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {branches.map((branch) => (
            <div
              key={branch.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white flex flex-col justify-between"
            >
              <div>
                <h4 className="text-base font-semibold text-gray-900 mb-2">{branch.name}</h4>
                <div className="space-y-1 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {branch.location}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                    {branch.size}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    {branch.stage}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${getStatusBadgeColor(branch.statusColor)}`}>
                  {branch.status}
                </div>

                <div className="flex gap-2">
                  {/* Action Buttons for Pending Approval */}
                  {branch.status === "Pending Approval" && (
                    <>
                      <button
                        onClick={() => handleApprove(branch)}
                        title="Approve"
                        className="p-1.5 rounded-full bg-green-50 text-green-600 hover:bg-green-100 border border-green-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDisapprove(branch)}
                        title="Reject"
                        className="p-1.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleViewAssessment(branch)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Assessment Submissions */}
      {recentSubmission ? (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Assessment Submissions</h3>
          <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
            <div className="mb-4">
              <h4 className="text-base font-semibold text-gray-900 mb-3">{recentSubmission.branchName}</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <div>Submitted by: <span className="font-medium">{recentSubmission.submittedBy}</span></div>
                <div>Timestamp: <span className="font-medium">{recentSubmission.timestamp}</span></div>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="text-sm font-semibold text-gray-700 mb-2">Feasibility Items Checklist (Preview):</h5>
              <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                {recentSubmission.feasibilityItems.length > 0 ? recentSubmission.feasibilityItems.map((item, index) => (
                  <li key={index}>{item}</li>
                )) : <li>No specific items checked.</li>}
                {recentSubmission.feasibilityItems.length >= 5 && <li className="text-gray-500 italic">...and more</li>}
              </ul>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => {
                  const branch = branches.find(b => b.name === recentSubmission.branchName);
                  if (branch) handleViewAssessment(branch);
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                View Full Details
              </button>

              {(() => {
                const subBranch = branches.find(b => b.name === recentSubmission.branchName);
                // Only show if NOT completed and NOT rejected
                const isActionable = subBranch && subBranch.status !== "Completed" && subBranch.status !== "Rejected";
                if (!isActionable) return null;

                return (
                  <>
                    <button
                      onClick={() => handleApprove(subBranch)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Approve
                    </button>
                    <button
                      onClick={() => handleDisapprove(subBranch)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Disapprove
                    </button>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-6 border border-gray-200 rounded-lg bg-gray-50 text-center text-gray-500">
          No recent assessment submissions found.
        </div>
      )}

      {/* Assessment Detail Modal - Dynamic Content */}
      {isModalOpen && selectedBranch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10">
              <h3 className="text-xl font-semibold text-gray-900">
                Assessment Details: {selectedBranch.name}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {selectedBranch.assessment && selectedBranch.assessment.data ? (
                <div>
                  {/* Remarks & Budget */}
                  <div className="mb-6 bg-blue-50 p-4 rounded-md border border-blue-100">
                    <h4 className="font-semibold text-blue-800 mb-2">Overall Remarks</h4>
                    <p className="text-sm text-gray-700 mb-2">{selectedBranch.assessment.overallRemarks || "No remarks provided."}</p>
                    <div className="text-sm font-bold text-gray-900">Total Budget: ₹ {
                      Object.values(selectedBranch.assessment.data).reduce((sum, sec) => sum + (Number(sec?.budget) || 0), 0).toLocaleString()
                    }</div>
                  </div>

                  {/* Dynamic Sections */}
                  <div className="space-y-6">
                    {SECTIONS.map(section => {
                      const sectionData = selectedBranch.assessment.data[section.id];
                      if (!sectionData) return null;

                      return (
                        <div key={section.id} className="border border-gray-200 rounded-md p-4">
                          <h4 className="font-semibold text-gray-800 mb-3 border-b pb-2">{section.title}</h4>

                          <div className="mb-3">
                            <h5 className="text-xs font-bold text-gray-500 uppercase mb-1">Checks</h5>
                            <div className="grid grid-cols-2 gap-2">
                              {sectionData.checks && Object.entries(sectionData.checks).map(([key, value]) => (
                                value && (
                                  <div key={key} className="flex items-center text-sm text-gray-700">
                                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {key}
                                  </div>
                                )
                              ))}
                              {(!sectionData.checks || !Object.values(sectionData.checks).some(Boolean)) && (
                                <span className="text-sm text-gray-400 italic">No items checked.</span>
                              )}
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <h5 className="text-xs font-bold text-gray-500 uppercase mb-1">Comments</h5>
                              <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">{sectionData.comment || "N/A"}</p>
                            </div>
                            <div>
                              <h5 className="text-xs font-bold text-gray-500 uppercase mb-1">Budget</h5>
                              <p className="text-sm text-gray-700 font-mono bg-gray-50 p-2 rounded">₹ {sectionData.budget || "0"}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 text-gray-500">
                  <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p>No assessment data available for this branch.</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast */}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-green-50 border border-green-200 text-green-800 px-6 py-4 rounded-lg shadow-lg flex items-center space-x-2 z-50">
          <svg
            className="w-5 h-5 text-green-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-medium">{notification}</span>
          <button
            onClick={() => setNotification(null)}
            className="ml-4 text-green-600 hover:text-green-800"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

