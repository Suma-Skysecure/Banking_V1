"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
// import "@/css/itFeasibilityAssessment.css"; // Commented out due to resolution error - add styles inline or create the file

export default function ITFeasibilityAssessment() {
  const { user } = useAuth();
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [assessment, setAssessment] = useState({
    networkInfrastructure: false,
    securitySystems: false,
    hardwareRequirements: false,
    softwareCompatibility: false,
    dataConnectivity: false,
    powerBackup: false,
    scalability: false,
    costFeasibility: false,
    timelineFeasibility: false,
    complianceRequirements: false,
    infrastructureNeeds: "",
    budgetAllocationTeams: "",
    estimatedBudget: "",
    implementationTimeline: "",
    technicalRequirements: "",
    riskAssessment: "",
    recommendations: ""
  });
  const [submittedAssessments, setSubmittedAssessments] = useState([]);
  const [editingAssessment, setEditingAssessment] = useState(null);

  // Search functionality
  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const results = [];
    const searchTerm = query.toLowerCase().trim();

    // Search through branches
    branchesForAssessment.forEach(branch => {
      const branchAssessment = submittedAssessments.find(assess => assess.branch.id === branch.id);
      
      // Search in branch name
      if (branch.name.toLowerCase().includes(searchTerm)) {
        results.push({
          type: 'branch',
          branch: branch,
          assessment: branchAssessment,
          matchField: 'name',
          matchText: branch.name,
          highlightedText: highlightText(branch.name, searchTerm)
        });
      }
      
      // Search in location
      if (branch.location.toLowerCase().includes(searchTerm)) {
        results.push({
          type: 'branch',
          branch: branch,
          assessment: branchAssessment,
          matchField: 'location',
          matchText: branch.location,
          highlightedText: highlightText(branch.location, searchTerm)
        });
      }
      
      // Search in stage
      if (branch.stage.toLowerCase().includes(searchTerm)) {
        results.push({
          type: 'branch',
          branch: branch,
          assessment: branchAssessment,
          matchField: 'stage',
          matchText: branch.stage,
          highlightedText: highlightText(branch.stage, searchTerm)
        });
      }
      
      // Search in assessment data if it exists
      if (branchAssessment) {
        const assessmentFields = [
          { field: 'infrastructureNeeds', label: 'Infrastructure Needs' },
          { field: 'budgetAllocationTeams', label: 'Budget Allocation Teams' },
          { field: 'estimatedBudget', label: 'Estimated Budget' },
          { field: 'implementationTimeline', label: 'Implementation Timeline' },
          { field: 'technicalRequirements', label: 'Technical Requirements' },
          { field: 'riskAssessment', label: 'Risk Assessment' },
          { field: 'recommendations', label: 'Recommendations' }
        ];
        
        assessmentFields.forEach(({ field, label }) => {
          const value = branchAssessment.assessment[field];
          if (value && typeof value === 'string' && value.toLowerCase().includes(searchTerm)) {
            results.push({
              type: 'assessment',
              branch: branch,
              assessment: branchAssessment,
              matchField: field,
              matchText: `${label}: ${value}`,
              highlightedText: `${label}: ${highlightText(value, searchTerm)}`
            });
          }
        });
      }
    });

    setSearchResults(results.slice(0, 10)); // Limit to 10 results
    setShowSearchResults(true);
  };

  // Function to highlight search text
  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? `<mark key=${index}>${part}</mark>` : part
    ).join('');
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    performSearch(query);
  };

  // Handle search result selection
  const handleSearchResultClick = (result) => {
    setSelectedBranch(result.branch);
    setSearchQuery("");
    setShowSearchResults(false);
    
    // If editing existing assessment
    if (result.assessment) {
      setEditingAssessment(result.assessment);
      setAssessment(result.assessment.assessment);
    } else {
      // Reset for new assessment
      setAssessment({
        networkInfrastructure: false,
        securitySystems: false,
        hardwareRequirements: false,
        softwareCompatibility: false,
        dataConnectivity: false,
        powerBackup: false,
        scalability: false,
        costFeasibility: false,
        timelineFeasibility: false,
        complianceRequirements: false,
        infrastructureNeeds: "",
        budgetAllocationTeams: "",
        estimatedBudget: "",
        implementationTimeline: "",
        technicalRequirements: "",
        riskAssessment: "",
        recommendations: ""
      });
    }
  };

  // Load submitted assessments from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('itAssessments');
    if (stored) {
      setSubmittedAssessments(JSON.parse(stored));
    }
  }, []);

  // Sample branches for IT assessment
  const branchesForAssessment = [
    {
      id: 1,
      name: "Downtown Manhattan Branch",
      stage: "Legal Workflow",
      location: "New York, NY",
      size: "5,000 sq ft",
      currentStatus: "Pending IT Assessment"
    },
    {
      id: 2,
      name: "Chicago River North Site",
      stage: "Project Execution",
      location: "Chicago, IL",
      size: "3,200 sq ft",
      currentStatus: "IT Assessment In Progress"
    },
    {
      id: 3,
      name: "Miami South Beach Location",
      stage: "Business Approval",
      location: "Miami, FL",
      size: "4,100 sq ft",
      currentStatus: "Pending IT Assessment"
    }
  ];

  const handleBranchSelect = (branch) => {
    // Check if branch already has an assessment
    const existingAssessment = submittedAssessments.find(assess => assess.branch.id === branch.id);
    if (existingAssessment) {
      alert(`Assessment already exists for ${branch.name}. You can edit or delete the existing assessment.`);
      return;
    }

    setSelectedBranch(branch);
    // Reset assessment form
    setAssessment({
      networkInfrastructure: false,
      securitySystems: false,
      hardwareRequirements: false,
      softwareCompatibility: false,
      dataConnectivity: false,
      powerBackup: false,
      scalability: false,
      costFeasibility: false,
      timelineFeasibility: false,
      complianceRequirements: false,
      infrastructureNeeds: "",
      budgetAllocationTeams: "",
      estimatedBudget: "",
      implementationTimeline: "",
      technicalRequirements: "",
      riskAssessment: "",
      recommendations: ""
    });
  };

  const handleCheckboxChange = (field) => {
    setAssessment(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleTextChange = (field, value) => {
    setAssessment(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitAssessment = () => {
    const assessmentData = {
      id: editingAssessment ? editingAssessment.id : Date.now(),
      branch: selectedBranch,
      assessment,
      submittedBy: user.username,
      timestamp: editingAssessment ? editingAssessment.timestamp : new Date().toISOString()
    };

    let updatedAssessments;
    if (editingAssessment) {
      // Update existing assessment
      updatedAssessments = submittedAssessments.map(assess =>
        assess.id === editingAssessment.id ? assessmentData : assess
      );
      alert("IT Feasibility Assessment updated successfully!");
    } else {
      // Add new assessment
      updatedAssessments = [...submittedAssessments, assessmentData];
      alert("IT Feasibility Assessment submitted successfully!");
    }

    // Store in localStorage (simulating server storage)
    localStorage.setItem('itAssessments', JSON.stringify(updatedAssessments));
    setSubmittedAssessments(updatedAssessments);

    // Reset form and editing state
    setSelectedBranch(null);
    setEditingAssessment(null);
    setAssessment({
      networkInfrastructure: false,
      securitySystems: false,
      hardwareRequirements: false,
      softwareCompatibility: false,
      dataConnectivity: false,
      powerBackup: false,
      scalability: false,
      costFeasibility: false,
      timelineFeasibility: false,
      complianceRequirements: false,
      infrastructureNeeds: "",
      budgetAllocationTeams: "",
      estimatedBudget: "",
      implementationTimeline: "",
      technicalRequirements: "",
      riskAssessment: "",
      recommendations: ""
    });
  };

  const handleEditAssessment = (assessment) => {
    setSelectedBranch(assessment.branch);
    setAssessment(assessment.assessment);
    setEditingAssessment(assessment);
  };

  const handleDeleteAssessment = (assessmentId) => {
    if (window.confirm("Are you sure you want to delete this assessment?")) {
      const updatedAssessments = submittedAssessments.filter(assess => assess.id !== assessmentId);
      localStorage.setItem('itAssessments', JSON.stringify(updatedAssessments));
      setSubmittedAssessments(updatedAssessments);
      alert("Assessment deleted successfully!");
    }
  };

  const handleCancelEdit = () => {
    setSelectedBranch(null);
    setEditingAssessment(null);
    setAssessment({
      networkInfrastructure: false,
      securitySystems: false,
      hardwareRequirements: false,
      softwareCompatibility: false,
      dataConnectivity: false,
      powerBackup: false,
      scalability: false,
      costFeasibility: false,
      timelineFeasibility: false,
      complianceRequirements: false,
      infrastructureNeeds: "",
      budgetAllocationTeams: "",
      estimatedBudget: "",
      implementationTimeline: "",
      technicalRequirements: "",
      riskAssessment: "",
      recommendations: ""
    });
  };

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

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ color: '#333', marginBottom: '10px' }}>IT Feasibility Assessment</h1>
        <p style={{ color: '#666' }}>Evaluate technical feasibility and infrastructure requirements for selected properties</p>
        
        {/* Global Search Bar */}
        <div style={{ position: 'relative', marginTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '8px', padding: '10px', backgroundColor: '#fff' }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M17.5 17.5L12.5001 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input
              type="text"
              placeholder="Search branches, locations, assessments..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ flex: 1, border: 'none', outline: 'none', marginLeft: '10px', fontSize: '16px' }}
              onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
              onFocus={() => searchQuery && setShowSearchResults(true)}
            />
            {searchQuery && (
              <button
                style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '10px' }}
                onClick={() => {
                  setSearchQuery("");
                  setSearchResults([]);
                  setShowSearchResults(false);
                }}
                title="Clear search"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M12 4L4 12M4 4L12 12" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
          
          {/* Search Results Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 1000, maxHeight: '300px', overflowY: 'auto' }}>
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  style={{ padding: '10px', borderBottom: '1px solid #eee', cursor: 'pointer', hover: { backgroundColor: '#f5f5f5' } }}
                  onClick={() => handleSearchResultClick(result)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '5px' }}>
                    <span style={{ fontWeight: 'bold' }}>{result.branch.name}</span>
                    <span style={{ padding: '2px 8px', borderRadius: '4px', fontSize: '12px', backgroundColor: result.type === 'assessment' ? '#e3f2fd' : '#f3e5f5', color: result.type === 'assessment' ? '#1976d2' : '#7b1fa2' }}>
                      {result.type === 'assessment' ? 'Assessment' : 'Branch'}
                    </span>
                  </div>
                  <div style={{ marginBottom: '5px' }}>
                    <span style={{ fontSize: '14px', color: '#666' }}>{result.matchField}:</span>
                    <span style={{ fontSize: '14px' }} dangerouslySetInnerHTML={{ __html: result.highlightedText }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#888' }}>
                    <span>{result.branch.location}</span>
                    {result.assessment && <span style={{ color: '#4caf50', fontWeight: 'bold' }}>Assessed</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {showSearchResults && searchResults.length === 0 && searchQuery && (
            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#fff', border: '1px solid #ccc', borderRadius: '8px', padding: '10px', zIndex: 1000 }}>
              <div style={{ color: '#666' }}>No results found for "{searchQuery}"</div>
            </div>
          )}
        </div>
      </div>

      <div>
        {/* Branch Selection */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ color: '#333', marginBottom: '20px' }}>Select Branch for Assessment</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {branchesForAssessment.map(branch => {
              const hasAssessment = submittedAssessments.some(assess => assess.branch.id === branch.id);
              return (
                <div
                  key={branch.id}
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    padding: '20px',
                    backgroundColor: selectedBranch?.id === branch.id ? '#e3f2fd' : hasAssessment ? '#f5f5f5' : '#fff',
                    cursor: hasAssessment ? 'not-allowed' : 'pointer',
                    opacity: hasAssessment ? 0.7 : 1,
                    position: 'relative'
                  }}
                  onClick={() => handleBranchSelect(branch)}
                >
                  <h3 style={{ margin: '0 0 10px 0', color: '#333' }}>{branch.name}</h3>
                  <div>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Location:</strong> {branch.location}</p>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Size:</strong> {branch.size}</p>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Stage:</strong> {branch.stage}</p>
                    <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Status:</strong> {hasAssessment ? 'Assessment Completed' : branch.currentStatus}</p>
                  </div>
                  {hasAssessment && <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#4caf50', color: '#fff', padding: '2px 8px', borderRadius: '4px', fontSize: '12px' }}>✓ Assessed</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Assessment Form */}
        {selectedBranch && (
          <div style={{ marginBottom: '30px', border: '1px solid #ccc', borderRadius: '8px', padding: '20px', backgroundColor: '#fff' }}>
            <h2 style={{ color: '#333', marginBottom: '20px' }}>{editingAssessment ? 'Edit' : 'IT Assessment'} for: {selectedBranch.name}</h2>
            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '10px' }}>Feasibility Checklist</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '10px' }}>
                {assessmentItems.map(item => (
                  <label key={item.key} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={assessment[item.key]}
                      onChange={() => handleCheckboxChange(item.key)}
                      style={{ marginRight: '10px' }}
                    />
                    {item.label}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Infrastructure Needs</label>
                <textarea
                  value={assessment.infrastructureNeeds}
                  onChange={(e) => handleTextChange('infrastructureNeeds', e.target.value)}
                  placeholder="Describe the specific IT infrastructure requirements for this branch"
                  rows={4}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Budget Allocation Teams</label>
                <textarea
                  value={assessment.budgetAllocationTeams}
                  onChange={(e) => handleTextChange('budgetAllocationTeams', e.target.value)}
                  placeholder="Specify which BRT teams are responsible for budget allocation (e.g., Facilities, Operations, Finance)"
                  rows={3}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Estimated Budget (Rs.)</label>
                <input
                  type="number"
                  value={assessment.estimatedBudget}
                  onChange={(e) => handleTextChange('estimatedBudget', e.target.value)}
                  placeholder="Enter estimated IT budget"
                  min="0"
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Implementation Timeline</label>
                <input
                  type="text"
                  value={assessment.implementationTimeline}
                  onChange={(e) => handleTextChange('implementationTimeline', e.target.value)}
                  placeholder="e.g., 3-6 months, Q1 2026"
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Technical Requirements</label>
                <textarea
                  value={assessment.technicalRequirements}
                  onChange={(e) => handleTextChange('technicalRequirements', e.target.value)}
                  placeholder="Detail technical specifications and requirements"
                  rows={3}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Risk Assessment</label>
                <textarea
                  value={assessment.riskAssessment}
                  onChange={(e) => handleTextChange('riskAssessment', e.target.value)}
                  placeholder="Identify potential risks and mitigation strategies"
                  rows={3}
                  style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Additional Recommendations</label>
              <textarea
                value={assessment.recommendations}
                onChange={(e) => handleTextChange('recommendations', e.target.value)}
                placeholder="Any additional recommendations or notes"
                rows={3}
                style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleSubmitAssessment}
                style={{ padding: '10px 20px', backgroundColor: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                {editingAssessment ? 'Update Assessment' : 'Submit Assessment'}
              </button>
              <button
                onClick={editingAssessment ? handleCancelEdit : () => setSelectedBranch(null)}
                style={{ padding: '10px 20px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Submitted Assessments Display */}
        <div>
          <h2 style={{ color: '#333', marginBottom: '20px' }}>Recent Assessment Submissions</h2>
          {submittedAssessments.length === 0 ? (
            <p style={{ color: '#666' }}>No assessments submitted yet.</p>
          ) : (
            <div>
              {submittedAssessments.slice(-5).reverse().map(assess => (
                <div key={assess.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', marginBottom: '20px', backgroundColor: '#fff' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ margin: 0, color: '#333' }}>{assess.branch.name}</h3>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button
                        onClick={() => handleEditAssessment(assess)}
                        style={{ padding: '5px 10px', backgroundColor: '#1976d2', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                        title="Edit Assessment"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M11.3333 2.00001C11.5084 1.82491 11.7163 1.68601 11.9421 1.59125C12.1679 1.49649 12.4061 1.44772 12.6458 1.44772C12.8856 1.44772 13.1237 1.49649 13.3495 1.59125C13.5753 1.68601 13.7833 1.82491 13.9583 2.00001C14.1334 2.17511 14.2723 2.38307 14.3671 2.60885C14.4618 2.83463 14.5106 3.07275 14.5106 3.31251C14.5106 3.55227 14.4618 3.79039 14.3671 4.01617C14.2723 4.24195 14.1334 4.44991 13.9583 4.62501L5.04167 13.5417L2 14.5L2.95833 11.4583L11.3333 2.00001Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAssessment(assess.id)}
                        style={{ padding: '5px 10px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                        title="Delete Assessment"
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M2 4H3.33333H14" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M5.33337 4V2.66667C5.33337 2.29848 5.63185 2 6.00004 2H10C10.3682 2 10.6667 2.29848 10.6667 2.66667V4M12.6667 4V13.3333C12.6667 13.7015 12.3682 14 12 14H4.00004C3.63185 14 3.33337 13.7015 3.33337 13.3333V4H12.6667Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M6.66663 7.33333V11.3333" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M9.33337 7.33333V11.3333" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                  <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Submitted by:</strong> {assess.submittedBy}</p>
                  <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Timestamp:</strong> {new Date(assess.timestamp).toLocaleString()}</p>

                  <div>
                    <div style={{ marginBottom: '10px' }}>
                      <strong>Feasibility Items:</strong>
                      <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                        {assessmentItems.filter(item => assess.assessment[item.key]).map(item => (
                          <li key={item.key} style={{ fontSize: '14px' }}>{item.label}</li>
                        ))}
                      </ul>
                    </div>

                    {assess.assessment.infrastructureNeeds && (
                      <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Infrastructure Needs:</strong> {assess.assessment.infrastructureNeeds}</p>
                    )}

                    {assess.assessment.budgetAllocationTeams && (
                      <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Budget Allocation Teams:</strong> {assess.assessment.budgetAllocationTeams}</p>
                    )}

                    {assess.assessment.estimatedBudget && (
                      <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Estimated Budget:</strong> ${assess.assessment.estimatedBudget}</p>
                    )}

                    {assess.assessment.implementationTimeline && (
                      <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Implementation Timeline:</strong> {assess.assessment.implementationTimeline}</p>
                    )}

                    {assess.assessment.technicalRequirements && (
                      <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Technical Requirements:</strong> {assess.assessment.technicalRequirements}</p>
                    )}

                    {assess.assessment.riskAssessment && (
                      <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Risk Assessment:</strong> {assess.assessment.riskAssessment}</p>
                    )}

                    {assess.assessment.recommendations && (
                      <p style={{ margin: '5px 0', fontSize: '14px' }}><strong>Recommendations:</strong> {assess.assessment.recommendations}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}