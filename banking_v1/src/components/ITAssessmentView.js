"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { useNotifications } from "@/contexts/NotificationContext";
import "@/css/itFeasibilityAssessment.css";

export default function ITAssessmentView({ branchId }) {
  const { user } = useAuth();
  const { createNotification } = useNotifications();
  const router = useRouter();
  const [branch, setBranch] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [approvals, setApprovals] = useState({});
  const [loading, setLoading] = useState(true);
  const [isApproved, setIsApproved] = useState(false);

  // Role-based access control - only BRT team can access for approvals
  if (!user || user.role !== "BRT") {
    return (
      <div style={{ textAlign: "center", padding: "100px", color: "#6b7280" }}>
        <h2>Access Denied</h2>
        <p>You do not have permission to access this page. Only BRT team members can approve IT assessments.</p>
      </div>
    );
  }

  // Branches data (same as in dashboard)
  const branchesData = [
    {
      id: 1,
      name: "Downtown Manhattan Branch",
      stage: "Legal Workflow",
      location: "New York, NY",
      size: "5,000 sq ft",
      city: "New York",
      status: "Pending IT Assessment"
    },
    {
      id: 2,
      name: "Chicago River North Site",
      stage: "Project Execution",
      location: "Chicago, IL",
      size: "3,200 sq ft",
      city: "Chicago",
      status: "IT Assessment In Progress"
    },
    {
      id: 3,
      name: "Miami South Beach Location",
      stage: "Business Approval",
      location: "Miami, FL",
      size: "4,100 sq ft",
      city: "Miami",
      status: "Pending IT Assessment"
    },
    {
      id: 4,
      name: "Seattle Waterfront Project",
      stage: "Project Execution",
      location: "Seattle, WA",
      size: "6,500 sq ft",
      city: "Seattle",
      status: "IT Assessment In Progress"
    }
  ];

  useEffect(() => {
    // Find the branch by ID
    const foundBranch = branchesData.find(b => b.id === parseInt(branchId));
    if (foundBranch) {
      setBranch(foundBranch);
    }

    // Load existing assessment from localStorage if available
    const storedAssessments = localStorage.getItem('itAssessments');
    if (storedAssessments) {
      const assessments = JSON.parse(storedAssessments);
      const existingAssessment = assessments.find(assess => assess.branch.id === parseInt(branchId));
      if (existingAssessment) {
        setAssessment(existingAssessment);
        // Initialize approvals based on existing assessment
        const initialApprovals = {};
        assessmentItems.forEach(item => {
          initialApprovals[item.key] = existingAssessment.assessment[item.key] || false;
        });
        setApprovals(initialApprovals);
      }
    }

    // Check if already approved
    const storedApprovals = localStorage.getItem('itApprovals');
    if (storedApprovals) {
      const approvalsList = JSON.parse(storedApprovals);
      const existingApproval = approvalsList.find(app => app.branchId === parseInt(branchId));
      if (existingApproval) {
        setApprovals(existingApproval.approvals);
        setIsApproved(true);
      }
    }

    setLoading(false);
  }, [branchId]);

  const assessmentItems = [
    { key: 'networkInfrastructure', label: 'Network Infrastructure' },
    { key: 'securitySystems', label: 'Security Systems' },
    { key: 'hardwareRequirements', label: 'Hardware Requirements' },
    { key: 'softwareCompatibility', label: 'Software Compatibility' },
    { key: 'dataConnectivity', label: 'Data Connectivity' },
    { key: 'powerBackup', label: 'Power Backup Systems' },
    { key: 'scalability', label: 'Scalability & Future Growth' },
    { key: 'costFeasibility', label: 'Cost Feasibility' },
    { key: 'timelineFeasibility', label: 'Timeline Feasibility' },
    { key: 'complianceRequirements', label: 'Compliance Requirements' }
  ];

  const handleApprovalChange = (key) => {
    setApprovals(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSubmitApprovals = () => {
    // Determine if assessment is approved or rejected based on checklist items
    const totalItems = assessmentItems.length;
    const approvedItems = Object.values(approvals).filter(Boolean).length;
    const isFullyApproved = approvedItems === totalItems;

    // Here you could save the approvals to localStorage or send to server
    const approvalData = {
      branchId: parseInt(branchId),
      approvals,
      approvedBy: user.username,
      timestamp: new Date().toISOString(),
      status: isFullyApproved ? 'approved' : 'rejected'
    };

    // Store approvals in localStorage
    const storedApprovals = localStorage.getItem('itApprovals') || '[]';
    const approvalsList = JSON.parse(storedApprovals);
    const existingIndex = approvalsList.findIndex(app => app.branchId === parseInt(branchId));

    if (existingIndex >= 0) {
      approvalsList[existingIndex] = approvalData;
    } else {
      approvalsList.push(approvalData);
    }

    localStorage.setItem('itApprovals', JSON.stringify(approvalsList));

    // Show appropriate notification
    if (isFullyApproved) {
      createNotification(
        `BRT has approved the IT assessment form for ${branch?.name || "the branch"}`,
        "success",
        "/it-assessment",
        "IT team"
      );
      alert("BRT Approved: IT Assessment has been approved!");
    } else {
      createNotification(
        `BRT has rejected the IT assessment form for ${branch?.name || "the branch"}`,
        "error",
        "/it-assessment",
        "IT team"
      );
      alert("BRT Rejected: IT Assessment requires revisions!");
    }

    setIsApproved(true);
    router.push('/dashboard');
  };

  const handleBack = () => {
    // Force refresh dashboard data before navigation
    localStorage.setItem('forceDashboardRefresh', Date.now().toString());
    router.push('/dashboard');
    // Trigger refresh after navigation
    setTimeout(() => {
      window.dispatchEvent(new Event('focus'));
    }, 100);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "100px" }}>
        <p>Loading assessment...</p>
      </div>
    );
  }

  if (!branch) {
    return (
      <div style={{ textAlign: "center", padding: "100px", color: "#6b7280" }}>
        <h2>Branch Not Found</h2>
        <p>The requested branch could not be found.</p>
        <button
          onClick={handleBack}
          style={{ padding: '10px 20px', backgroundColor: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '20px' }}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '30px' }}>
        <button
          onClick={() => {
            router.push('/dashboard');
            // Trigger refresh after navigation
            setTimeout(() => {
              window.dispatchEvent(new Event('focus'));
            }, 100);
          }}
          style={{ padding: '8px 16px', backgroundColor: '#f5f5f5', color: '#333', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', marginBottom: '20px' }}
        >
          ← Back to Dashboard
        </button>
        <h1 style={{ color: '#333', marginBottom: '10px' }}>IT Feasibility Assessment - {branch.name}</h1>
        <div style={{ marginBottom: '20px', padding: '10px', borderRadius: '6px', backgroundColor: assessment ? '#fff3cd' : '#f8d7da', border: `1px solid ${assessment ? '#ffc107' : '#f44336'}` }}>
          <strong>Status: </strong>
          <span style={{ color: assessment ? '#ff9800' : '#f44336' }}>
            {assessment ? 'IT Assessment Submitted - Under Review' : 'No Assessment Submitted Yet'}
          </span>
        </div>
        <p style={{ color: '#666' }}>Review and approve IT feasibility checklist items</p>
      </div>

      {/* Branch Details */}
      <div style={{ marginBottom: '30px', border: '1px solid #ccc', borderRadius: '8px', padding: '20px', backgroundColor: '#f9f9f9' }}>
        <h2 style={{ color: '#333', marginBottom: '15px' }}>Branch Details</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <strong>Location:</strong> {branch.location}
          </div>
          <div>
            <strong>Size:</strong> {branch.size}
          </div>
          <div>
            <strong>Current Stage:</strong> {branch.stage}
          </div>
          <div>
            <strong>Status:</strong> {branch.status}
          </div>
        </div>
      </div>

      {/* Assessment Form (if exists) */}
      {assessment && (
        <div style={{ marginBottom: '30px', border: '1px solid #ccc', borderRadius: '8px', padding: '20px', backgroundColor: '#fff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ color: '#333', margin: '0' }}>Submitted Assessment Details</h2>
            {(() => {
              const totalItems = assessmentItems.length;
              const approvedItems = Object.values(approvals).filter(Boolean).length;
              const isFullyApproved = approvedItems === totalItems;
              const isPartiallyApproved = approvedItems > 0 && approvedItems < totalItems;

              if (isFullyApproved) {
                return <span style={{ color: '#4caf50', fontWeight: 'bold', fontSize: '16px' }}>✓ BRT Approved</span>;
              } else if (isPartiallyApproved) {
                return <span style={{ color: '#ff9800', fontWeight: 'bold', fontSize: '16px' }}>⚠ BRT Partially Approved</span>;
              } else {
                return <span style={{ color: '#f44336', fontWeight: 'bold', fontSize: '16px' }}>✗ BRT Rejected</span>;
              }
            })()}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Infrastructure Needs</label>
              <p style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
                {assessment.assessment.infrastructureNeeds || 'Not specified'}
              </p>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Budget Allocation Teams</label>
              <p style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
                {assessment.assessment.budgetAllocationTeams || 'Not specified'}
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Estimated Budget</label>
              <p style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
                {assessment.assessment.estimatedBudget ? `$${assessment.assessment.estimatedBudget}` : 'Not specified'}
              </p>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Implementation Timeline</label>
              <p style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
                {assessment.assessment.implementationTimeline || 'Not specified'}
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Technical Requirements</label>
              <p style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
                {assessment.assessment.technicalRequirements || 'Not specified'}
              </p>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Risk Assessment</label>
              <p style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
                {assessment.assessment.riskAssessment || 'Not specified'}
              </p>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Additional Recommendations</label>
            <p style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#f9f9f9' }}>
              {assessment.assessment.recommendations || 'Not specified'}
            </p>
          </div>
        </div>
      )}

      {/* IT Feasibility Checklist Approval */}
      <div style={{ marginBottom: '30px', border: '1px solid #ccc', borderRadius: '8px', padding: '20px', backgroundColor: '#fff' }}>
        <h2 style={{ color: '#333', marginBottom: '20px' }}>IT Feasibility Checklist Approval</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>Check the boxes below to approve each feasibility item:</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '15px' }}>
          {assessmentItems.map(item => (
            <label key={item.key} style={{ display: 'flex', alignItems: 'center', padding: '10px', border: '1px solid #e0e0e0', borderRadius: '6px', backgroundColor: approvals[item.key] ? '#e8f5e8' : '#fff', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={approvals[item.key] || false}
                onChange={() => handleApprovalChange(item.key)}
                style={{ marginRight: '10px', transform: 'scale(1.2)' }}
              />
              <span style={{ fontWeight: '500' }}>{item.label}</span>
              {approvals[item.key] && (
                <span style={{ marginLeft: 'auto', color: '#4caf50', fontWeight: 'bold' }}>✓ Approved</span>
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '30px', padding: '20px', borderTop: '1px solid #e0e0e0' }}>
        <button
          onClick={handleBack}
          style={{ padding: '10px 20px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmitApprovals}
          disabled={Object.keys(approvals).length === 0}
          style={{
            padding: '10px 20px',
            backgroundColor: Object.keys(approvals).length === 0 ? '#ccc' : '#1976d2',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: Object.keys(approvals).length === 0 ? 'not-allowed' : 'pointer',
            fontWeight: 'bold'
          }}
        >
          Submit Approvals
        </button>
      </div>
    </div>
  );
}