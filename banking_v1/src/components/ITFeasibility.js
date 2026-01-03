"use client";

import { useState } from "react";

export default function ITFeasibility() {
  const [searchQuery, setSearchQuery] = useState("");
  const [notification, setNotification] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hardcoded branch data with assessment details
  const branches = [
    {
      id: 1,
      name: "Downtown Manhattan Branch",
      location: "New York, NY",
      size: "5,000 sq ft",
      stage: "Legal Workflow",
      status: "Assessment Completed",
      statusColor: "green",
      assessment: {
        requirements: {
          networkInfrastructure: true,
          securitySystems: true,
          hardwareRequirements: true,
          scalability: true,
          dataConnectivity: false,
          powerBackup: false,
          softwareCompatibility: false,
          costFeasibility: false,
          timelineFeasibility: false,
          complianceRequirements: false
        },
        infrastructureNeeds: "USB NEEDED",
        budgetAllocationTeams: "OPERATIONS",
        estimatedBudget: "323223",
        implementationTimeline: "3 MONTHS",
        technicalRequirements: "DDSFDVSSDAVDADA",
        riskAssessment: "DACD",
        additionalRecommendations: ""
      }
    },
    {
      id: 2,
      name: "Chicago River North Site",
      location: "Chicago, IL",
      size: "3,200 sq ft",
      stage: "Project Execution",
      status: "IT Assessment In Progress",
      statusColor: "yellow",
      assessment: {
        requirements: {
          networkInfrastructure: true,
          securitySystems: false,
          hardwareRequirements: true,
          scalability: false,
          dataConnectivity: true,
          powerBackup: true,
          softwareCompatibility: false,
          costFeasibility: false,
          timelineFeasibility: false,
          complianceRequirements: false
        },
        infrastructureNeeds: "Network setup required",
        budgetAllocationTeams: "IT TEAM",
        estimatedBudget: "250000",
        implementationTimeline: "2 MONTHS",
        technicalRequirements: "Standard network infrastructure",
        riskAssessment: "Low risk",
        additionalRecommendations: ""
      }
    },
    {
      id: 3,
      name: "Miami South Beach Location",
      location: "Miami, FL",
      size: "4,100 sq ft",
      stage: "Business Approval",
      status: "Pending IT Assessment",
      statusColor: "gray",
      assessment: {
        requirements: {
          networkInfrastructure: false,
          securitySystems: false,
          hardwareRequirements: false,
          scalability: false,
          dataConnectivity: false,
          powerBackup: false,
          softwareCompatibility: false,
          costFeasibility: false,
          timelineFeasibility: false,
          complianceRequirements: false
        },
        infrastructureNeeds: "",
        budgetAllocationTeams: "",
        estimatedBudget: "",
        implementationTimeline: "",
        technicalRequirements: "",
        riskAssessment: "",
        additionalRecommendations: ""
      }
    }
  ];

  // Hardcoded assessment submission data
  const recentSubmission = {
    branchName: "Downtown Manhattan Branch",
    submittedBy: "itteam@kotakbank.com",
    timestamp: "2/1/2026, 11:52:22 AM",
    feasibilityItems: [
      "Network Infrastructure",
      "Security Systems",
      "Power Backup",
      "Server Room Availability"
    ]
  };

  const getStatusBadgeColor = (statusColor) => {
    const colorMap = {
      green: "bg-green-100 text-green-800 border-green-200",
      yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
      gray: "bg-gray-100 text-gray-800 border-gray-200"
    };
    return colorMap[statusColor] || colorMap.gray;
  };

  const handleApprove = () => {
    setNotification("Notification sent to IT team");
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDisapprove = () => {
    setNotification("Notification sent to IT team");
    setTimeout(() => setNotification(null), 3000);
  };

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
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
            >
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
              <div className="flex items-center justify-between mt-3">
                <div className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${getStatusBadgeColor(branch.statusColor)}`}>
                  {branch.status}
                </div>
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
          ))}
        </div>
      </div>

      {/* Recent Assessment Submissions */}
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
            <h5 className="text-sm font-semibold text-gray-700 mb-2">Feasibility Items:</h5>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {recentSubmission.feasibilityItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
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
              View
            </button>
            <button
              onClick={handleApprove}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Approve
            </button>
            <button
              onClick={handleDisapprove}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Disapprove
            </button>
          </div>
        </div>
      </div>

      {/* Assessment Detail Modal */}
      {isModalOpen && selectedBranch && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-900">
                Edit for: {selectedBranch.name}
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
              {/* Requirements Checkboxes */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Requirements
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedBranch.assessment.requirements.networkInfrastructure}
                      readOnly
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Network Infrastructure</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedBranch.assessment.requirements.securitySystems}
                      readOnly
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Security Systems</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedBranch.assessment.requirements.hardwareRequirements}
                      readOnly
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Hardware Requirements</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedBranch.assessment.requirements.scalability}
                      readOnly
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Scalability & Future Growth</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedBranch.assessment.requirements.dataConnectivity}
                      readOnly
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Data Connectivity</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedBranch.assessment.requirements.powerBackup}
                      readOnly
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Power Backup Systems</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedBranch.assessment.requirements.softwareCompatibility}
                      readOnly
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Software Compatibility</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedBranch.assessment.requirements.costFeasibility}
                      readOnly
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Cost Feasibility</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedBranch.assessment.requirements.timelineFeasibility}
                      readOnly
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Timeline Feasibility</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedBranch.assessment.requirements.complianceRequirements}
                      readOnly
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Compliance Requirements</span>
                  </label>
                </div>
              </div>

              {/* Infrastructure Needs */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Infrastructure Needs
                </label>
                <textarea
                  value={selectedBranch.assessment.infrastructureNeeds}
                  readOnly
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Budget Allocation Teams */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Allocation Teams
                </label>
                <textarea
                  value={selectedBranch.assessment.budgetAllocationTeams}
                  readOnly
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Estimated Budget and Implementation Timeline */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Budget ($)
                  </label>
                  <input
                    type="text"
                    value={selectedBranch.assessment.estimatedBudget}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Implementation Timeline
                  </label>
                  <input
                    type="text"
                    value={selectedBranch.assessment.implementationTimeline}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Technical Requirements */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technical Requirements
                </label>
                <textarea
                  value={selectedBranch.assessment.technicalRequirements}
                  readOnly
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Risk Assessment */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Risk Assessment
                </label>
                <textarea
                  value={selectedBranch.assessment.riskAssessment}
                  readOnly
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              {/* Additional Recommendations */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Recommendations
                </label>
                <textarea
                  value={selectedBranch.assessment.additionalRecommendations}
                  placeholder="Any additional recommendations or notes"
                  readOnly
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
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

