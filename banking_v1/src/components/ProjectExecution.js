"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import PageHeader from "@/components/PageHeader";
import WorkflowTimeline from "@/components/WorkflowTimeline";
import "@/css/branchTracker.css";
import "@/css/pageHeader.css";
import "@/css/workflowTimeline.css";
import "@/css/postLOIActivities.css";

export default function ProjectExecution() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Security Requirements State
  const [securityRequirements, setSecurityRequirements] = useState({
    vendorSelection: true,
    backgroundVerification: false,
    siteAssessment: false,
    deployPersonnel: false,
  });

  // Procurement Tasks State
  const [procurementTasks, setProcurementTasks] = useState({
    officeFurniture: false,
    itHardware: false,
    securitySystems: false,
    utilitiesSetup: false,
    interiorRenovation: false,
  });

  // IT Infrastructure State
  const [itInfrastructure, setItInfrastructure] = useState({
    serverRoom: false,
    networkInfrastructure: false,
    softwareSystems: false,
    securityIntegration: false,
    backupRecovery: false,
    userAccess: false,
  });

  // Launch Activities State
  const [launchActivities, setLaunchActivities] = useState({
    assetTagging: false,
    atmInstallation: false,
    staffTraining: false,
    complianceVerification: false,
    grandOpening: false,
  });

  // Project Requirements State
  const [projectRequirements, setProjectRequirements] = useState({
    securityDeployment: false,
    materialProcurement: false,
    itFacilitySetup: false,
    locationLaunch: false,
  });

  // Handler functions
  const handleSecurityChange = (key) => {
    setSecurityRequirements(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleProcurementChange = (key) => {
    setProcurementTasks(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleItInfrastructureChange = (key) => {
    setItInfrastructure(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLaunchActivitiesChange = (key) => {
    setLaunchActivities(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Check if all security requirements are completed
  const isSecurityComplete = Object.values(securityRequirements).every(value => value === true);
  
  // Check if all procurement tasks are completed
  const isProcurementComplete = Object.values(procurementTasks).every(value => value === true);
  
  // Check if all IT infrastructure tasks are completed
  const isItInfrastructureComplete = Object.values(itInfrastructure).every(value => value === true);
  
  // Check if all launch activities are completed
  const isLaunchActivitiesComplete = Object.values(launchActivities).every(value => value === true);

  // Calculate completion counts
  const securityCompletedCount = Object.values(securityRequirements).filter(v => v).length;
  const procurementCompletedCount = Object.values(procurementTasks).filter(v => v).length;
  const itInfrastructureCompletedCount = Object.values(itInfrastructure).filter(v => v).length;
  const launchActivitiesCompletedCount = Object.values(launchActivities).filter(v => v).length;

  // Automatically update project requirements when sections are complete
  useEffect(() => {
    setProjectRequirements(prev => ({
      ...prev,
      securityDeployment: isSecurityComplete,
    }));
  }, [isSecurityComplete]);

  useEffect(() => {
    setProjectRequirements(prev => ({
      ...prev,
      materialProcurement: isProcurementComplete,
    }));
  }, [isProcurementComplete]);

  useEffect(() => {
    setProjectRequirements(prev => ({
      ...prev,
      itFacilitySetup: isItInfrastructureComplete,
    }));
  }, [isItInfrastructureComplete]);

  useEffect(() => {
    setProjectRequirements(prev => ({
      ...prev,
      locationLaunch: isLaunchActivitiesComplete,
    }));
  }, [isLaunchActivitiesComplete]);

  // Check if all project requirements are complete
  const isAllProjectRequirementsComplete = Object.values(projectRequirements).every(value => value === true);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <button
          className="header-hamburger"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="hamburger-icon">
            <path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        <div className="header-search">
          <input
            type="text"
            placeholder="Search branch..."
            className="header-search-input"
          />
        </div>
        <div className="header-actions">
          <button className="header-icon-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 2C10.5523 2 11 2.44772 11 3V4H15C15.5523 4 16 4.44772 16 5C16 5.55228 15.5523 6 15 6H5C4.44772 6 4 5.55228 4 5C4 4.44772 4.44772 4 5 4H9V3C9 2.44772 9.44772 2 10 2Z"
                fill="#6b7280"
              />
              <path
                d="M5 8H15L14.4 15.2C14.3 16.8 13 18 11.4 18H8.6C7 18 5.7 16.8 5.6 15.2L5 8Z"
                fill="#6b7280"
              />
            </svg>
          </button>
          <div className="header-profile">
            <div className="profile-avatar">AM</div>
            <div className="profile-info">
              <span className="profile-name">Ana Miller</span>
              <span className="profile-email">analyst@pms.com</span>
            </div>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="profile-arrow"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="#6b7280"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </header>

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="dashboard-main">
          <div className="main-content">
            {/* Workflow Timeline */}
            <WorkflowTimeline activeStage="Project Execution" />
            
            <PageHeader
              title="Project Execution"
              subtitle="Manage and track the final project execution, including security setup, vendor management, and IT infrastructure."
            />

            {/* Back Link */}
            <Link href="/agreement-registration" className="back-to-legal-workflow">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="back-arrow">
                <path
                  d="M10 12L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Back to Agreement Registration
            </Link>

            {/* Property Overview */}
            <div className="property-overview-header">
              <div className="property-overview-left">
                <h2 className="property-name-header">Downtown Arts Plaza</h2>
                <div className="property-address-header">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="map-pin-icon-header"
                  >
                    <path
                      d="M8 8C9.10457 8 10 7.10457 10 6C10 4.89543 9.10457 4 8 4C6.89543 4 6 4.89543 6 6C6 7.10457 6.89543 8 8 8Z"
                      fill="#ef4444"
                    />
                    <path
                      d="M8 1C5.23858 1 3 3.23858 3 6C3 10 8 15 8 15C8 15 13 10 13 6C13 3.23858 10.7614 1 8 1Z"
                      stroke="#ef4444"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>1450 Biscayne Boulevard, Miami, FL 33132</span>
                </div>
                <div className="property-status-row">
                  <div className="loi-status-tag" style={{ backgroundColor: "#dbeafe", color: "#1e40af" }}>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M8 2L10 6L14 6L11 9L12 13L8 11L4 13L5 9L2 6L6 6L8 2Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Project Execution Phase
                  </div>
                  <span className="property-id-text">Project ID: PROJ-MIA-2024-002</span>
                </div>
              </div>
              <div className="property-overview-right">
                <div className="property-price-header">₹48,43,00,000</div>
                <div className="loi-circulated-date">Registered on Dec 26, 2024</div>
              </div>
            </div>

            {/* Project Execution Progress */}
            <div className="project-execution-section">
              <div className="section-header">
                <h3 className="section-title">Project Execution Progress</h3>
              </div>

              {/* Overall Progress */}
              <div className="overall-progress-card">
                <div className="progress-header">
                  <span className="progress-label">Overall Progress</span>
                  <span className="progress-percentage">5% Complete</span>
                </div>
                <div className="progress-bar-container">
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: "5%" }}></div>
                  </div>
                </div>
              </div>

              {/* Workflow Stages */}
              <div className="workflow-stages-grid">
                <div className="workflow-stage-card orange-bg">
                  <div className="stage-icon-container">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="stage-icon">
                      <path
                        d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 8V12M12 12L10 14M12 12L14 14"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <div className="stage-content">
                    <div className="stage-name">Security Deployment</div>
                    <div className="stage-status orange">In Progress</div>
                  </div>
                </div>

                <div className="workflow-stage-card red-bg">
                  <div className="stage-icon-container">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="stage-icon">
                      <path
                        d="M3 3H7L9 19H21L23 7H9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="10" cy="21" r="2" stroke="currentColor" strokeWidth="2" />
                      <circle cx="19" cy="21" r="2" stroke="currentColor" strokeWidth="2" />
                      <path
                        d="M9 7H23M9 11H21M9 15H19"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="stage-content">
                    <div className="stage-name">Material Procurement</div>
                    <div className="stage-status red">Pending</div>
                  </div>
                </div>

                <div className="workflow-stage-card purple-bg">
                  <div className="stage-icon-container">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="stage-icon">
                      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                      <path d="M6 8H18M6 12H18M6 16H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="9" cy="10" r="1" fill="currentColor" />
                      <circle cx="9" cy="14" r="1" fill="currentColor" />
                    </svg>
                  </div>
                  <div className="stage-content">
                    <div className="stage-name">IT & Facility Setup</div>
                    <div className="stage-status purple">Pending</div>
                  </div>
                </div>

                <div className="workflow-stage-card gray-bg">
                  <div className="stage-icon-container">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="stage-icon">
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
                  </div>
                  <div className="stage-content">
                    <div className="stage-name">Location Launch</div>
                    <div className="stage-status gray">Pending</div>
                  </div>
                </div>
              </div>

              {/* Detailed Panels */}
              <div className="execution-panels-grid">
                {/* Security Guard Deployment Panel */}
                <div className="execution-panel">
                  <div className="panel-header">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="panel-icon">
                      <path
                        d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <h4 className="panel-title">Security Guard Deployment</h4>
                  </div>

                  <div className="panel-section">
                    <div className="panel-section-header">
                      <span className="section-title-small">Security Requirements</span>
                      <span className="completion-status orange">{securityCompletedCount}/4 Complete</span>
                    </div>
                    <div className="requirements-checklist">
                      <label className="requirement-item">
                        <input 
                          type="checkbox" 
                          className="requirement-checkbox" 
                          checked={securityRequirements.vendorSelection}
                          onChange={() => handleSecurityChange('vendorSelection')}
                        />
                        <span className="requirement-text">Security vendor selection and contract signing</span>
                      </label>
                      <label className="requirement-item">
                        <input 
                          type="checkbox" 
                          className="requirement-checkbox"
                          checked={securityRequirements.backgroundVerification}
                          onChange={() => handleSecurityChange('backgroundVerification')}
                        />
                        <span className="requirement-text">Security guard background verification</span>
                      </label>
                      <label className="requirement-item">
                        <input 
                          type="checkbox" 
                          className="requirement-checkbox"
                          checked={securityRequirements.siteAssessment}
                          onChange={() => handleSecurityChange('siteAssessment')}
                        />
                        <span className="requirement-text">Site security assessment and planning</span>
                      </label>
                      <label className="requirement-item">
                        <input 
                          type="checkbox" 
                          className="requirement-checkbox"
                          checked={securityRequirements.deployPersonnel}
                          onChange={() => handleSecurityChange('deployPersonnel')}
                        />
                        <span className="requirement-text">Deploy security personnel to site</span>
                      </label>
                    </div>
                  </div>

                  <div className="vendor-details-box">
                    <div className="box-header">Security Vendor Details</div>
                    <div className="vendor-info">
                      <div className="vendor-item">
                        <span className="vendor-label">Vendor:</span>
                        <span className="vendor-value">SecureGuard Solutions</span>
                      </div>
                      <div className="vendor-item">
                        <span className="vendor-label">Contract Value:</span>
                        <span className="vendor-value">₹37,57,500/year</span>
                      </div>
                      <div className="vendor-item">
                        <span className="vendor-label">Deployment Date:</span>
                        <span className="vendor-value">Jan 15, 2025</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Material Procurement Panel */}
                <div className="execution-panel">
                  <div className="panel-header">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="panel-icon">
                      <path
                        d="M3 3H7L9 19H21L23 7H9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <circle cx="10" cy="21" r="2" stroke="currentColor" strokeWidth="2" />
                      <circle cx="19" cy="21" r="2" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    <h4 className="panel-title">Material Procurement</h4>
                  </div>

                  <div className="panel-section">
                    <div className="panel-section-header">
                      <span className="section-title-small">Procurement Tasks</span>
                      <span className="completion-status red">{procurementCompletedCount}/5 Complete</span>
                    </div>
                    <div className="requirements-checklist">
                      <label className="requirement-item">
                        <input 
                          type="checkbox" 
                          className="requirement-checkbox"
                          checked={procurementTasks.officeFurniture}
                          onChange={() => handleProcurementChange('officeFurniture')}
                        />
                        <span className="requirement-text">Office furniture and equipment procurement</span>
                      </label>
                      <label className="requirement-item">
                        <input 
                          type="checkbox" 
                          className="requirement-checkbox"
                          checked={procurementTasks.itHardware}
                          onChange={() => handleProcurementChange('itHardware')}
                        />
                        <span className="requirement-text">IT hardware and networking equipment</span>
                      </label>
                      <label className="requirement-item">
                        <input 
                          type="checkbox" 
                          className="requirement-checkbox"
                          checked={procurementTasks.securitySystems}
                          onChange={() => handleProcurementChange('securitySystems')}
                        />
                        <span className="requirement-text">Security systems and cameras installation</span>
                      </label>
                      <label className="requirement-item">
                        <input 
                          type="checkbox" 
                          className="requirement-checkbox"
                          checked={procurementTasks.utilitiesSetup}
                          onChange={() => handleProcurementChange('utilitiesSetup')}
                        />
                        <span className="requirement-text">Utilities setup and connection</span>
                      </label>
                      <label className="requirement-item">
                        <input 
                          type="checkbox" 
                          className="requirement-checkbox"
                          checked={procurementTasks.interiorRenovation}
                          onChange={() => handleProcurementChange('interiorRenovation')}
                        />
                        <span className="requirement-text">Interior renovation and branding</span>
                      </label>
                    </div>
                  </div>

                  <div className="budget-allocation-box">
                    <div className="box-header">Budget Allocation</div>
                    <div className="budget-info">
                      <div className="budget-item">
                        <span className="budget-label">Total Budget:</span>
                        <span className="budget-value">₹2,08,75,000</span>
                      </div>
                      <div className="budget-item">
                        <span className="budget-label">Allocated:</span>
                        <span className="budget-value">₹70,97,500</span>
                      </div>
                      <div className="budget-item">
                        <span className="budget-label">Remaining:</span>
                        <span className="budget-value">₹1,37,77,500</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* IT and Facility Setup & Location Launch Panels */}
              <div className="execution-panels-grid">
                {/* IT and Facility Setup Panel */}
                <div className="execution-panel">
                  <div className="panel-header">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="panel-icon">
                      <rect x="2" y="4" width="20" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                      <path d="M6 8H18M6 12H18M6 16H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="9" cy="10" r="1" fill="currentColor" />
                      <circle cx="9" cy="14" r="1" fill="currentColor" />
                      <path d="M2 8H6M18 8H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <h4 className="panel-title">IT and Facility Setup</h4>
                  </div>

                  <div className="panel-section">
                    <div className="panel-section-header">
                      <span className="section-title-small">IT Infrastructure</span>
                      <span className="completion-status purple">{itInfrastructureCompletedCount}/6 Complete</span>
                    </div>
                    <div className="requirements-checklist">
                      <label className="requirement-item">
                        <input 
                          type="checkbox" 
                          className="requirement-checkbox"
                          checked={itInfrastructure.serverRoom}
                          onChange={() => handleItInfrastructureChange('serverRoom')}
                        />
                        <span className="requirement-text">Server room setup and configuration</span>
                      </label>
                      <label className="requirement-item">
                        <input 
                          type="checkbox" 
                          className="requirement-checkbox"
                          checked={itInfrastructure.networkInfrastructure}
                          onChange={() => handleItInfrastructureChange('networkInfrastructure')}
                        />
                        <span className="requirement-text">Network infrastructure installation</span>
                      </label>
                      <label className="requirement-item">
                        <input 
                          type="checkbox" 
                          className="requirement-checkbox"
                          checked={itInfrastructure.softwareSystems}
                          onChange={() => handleItInfrastructureChange('softwareSystems')}
                        />
                        <span className="requirement-text">Software systems deployment</span>
                      </label>
                      <label className="requirement-item">
                        <input 
                          type="checkbox" 
                          className="requirement-checkbox"
                          checked={itInfrastructure.securityIntegration}
                          onChange={() => handleItInfrastructureChange('securityIntegration')}
                        />
                        <span className="requirement-text">Security systems integration</span>
                      </label>
                      <label className="requirement-item">
                        <input 
                          type="checkbox" 
                          className="requirement-checkbox"
                          checked={itInfrastructure.backupRecovery}
                          onChange={() => handleItInfrastructureChange('backupRecovery')}
                        />
                        <span className="requirement-text">Backup and disaster recovery setup</span>
                      </label>
                      <label className="requirement-item">
                        <input 
                          type="checkbox" 
                          className="requirement-checkbox"
                          checked={itInfrastructure.userAccess}
                          onChange={() => handleItInfrastructureChange('userAccess')}
                        />
                        <span className="requirement-text">User access and permissions configuration</span>
                      </label>
                    </div>
                  </div>

                  <div className="it-vendor-box">
                    <div className="box-header">IT Vendor</div>
                    <div className="vendor-info">
                      <div className="vendor-item">
                        <span className="vendor-label">Provider:</span>
                        <span className="vendor-value">TechFlow Solutions</span>
                      </div>
                      <div className="vendor-item">
                        <span className="vendor-label">Setup Cost:</span>
                        <span className="vendor-value">₹1,04,37,500</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location Launch Panel */}
                <div className="execution-panel">
                  <div className="panel-header">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="panel-icon">
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
                    <h4 className="panel-title">Location Launch</h4>
                  </div>

                  <div className="panel-section">
                    <div className="panel-section-header">
                      <span className="section-title-small">Launch Activities</span>
                      <span className="completion-status gray">{launchActivitiesCompletedCount}/5 Complete</span>
                    </div>
                    <div className="requirements-checklist">
                      <label className="requirement-item">
                        <input 
                          type="checkbox" 
                          className="requirement-checkbox"
                          checked={launchActivities.assetTagging}
                          onChange={() => handleLaunchActivitiesChange('assetTagging')}
                        />
                        <span className="requirement-text">Asset tagging and inventory management</span>
                      </label>
                      <label className="requirement-item">
                        <input 
                          type="checkbox" 
                          className="requirement-checkbox"
                          checked={launchActivities.atmInstallation}
                          onChange={() => handleLaunchActivitiesChange('atmInstallation')}
                        />
                        <span className="requirement-text">ATM installation and activation</span>
                      </label>
                      <label className="requirement-item">
                        <input 
                          type="checkbox" 
                          className="requirement-checkbox"
                          checked={launchActivities.staffTraining}
                          onChange={() => handleLaunchActivitiesChange('staffTraining')}
                        />
                        <span className="requirement-text">Staff training and orientation</span>
                      </label>
                      <label className="requirement-item">
                        <input 
                          type="checkbox" 
                          className="requirement-checkbox"
                          checked={launchActivities.complianceVerification}
                          onChange={() => handleLaunchActivitiesChange('complianceVerification')}
                        />
                        <span className="requirement-text">Regulatory compliance verification</span>
                      </label>
                      <label className="requirement-item">
                        <input 
                          type="checkbox" 
                          className="requirement-checkbox"
                          checked={launchActivities.grandOpening}
                          onChange={() => handleLaunchActivitiesChange('grandOpening')}
                        />
                        <span className="requirement-text">Grand opening preparation</span>
                      </label>
                    </div>
                  </div>

                  <div className="launch-timeline-box">
                    <div className="box-header">Launch Timeline</div>
                    <div className="vendor-info">
                      <div className="vendor-item">
                        <span className="vendor-label">Soft Launch:</span>
                        <span className="vendor-value">Feb 15, 2025</span>
                      </div>
                      <div className="vendor-item">
                        <span className="vendor-label">Grand Opening:</span>
                        <span className="vendor-value">Mar 1, 2025</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Completion Status */}
              <div className="project-completion-section">
                <div className="completion-section-header">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="completion-icon">
                    <path
                      d="M3 3H21V21H3V3Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 9H21M9 3V21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M7 7H17M7 11H17M7 15H13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  <h3 className="completion-section-title">Project Completion Status</h3>
                </div>

                <div className="project-requirements-card">
                  <div className="requirements-card-title">Project Requirements:</div>
                  <div className="requirements-two-column">
                    <div className="requirements-column">
                      <label className="project-requirement-item">
                        <input 
                          type="checkbox" 
                          className="project-requirement-checkbox"
                          checked={projectRequirements.securityDeployment}
                          onChange={() => setProjectRequirements(prev => ({ ...prev, securityDeployment: !prev.securityDeployment }))}
                        />
                        <span className="project-requirement-text">Security deployment completed</span>
                      </label>
                      <label className="project-requirement-item">
                        <input 
                          type="checkbox" 
                          className="project-requirement-checkbox"
                          checked={projectRequirements.materialProcurement}
                          onChange={() => setProjectRequirements(prev => ({ ...prev, materialProcurement: !prev.materialProcurement }))}
                        />
                        <span className="project-requirement-text">Material procurement finished</span>
                      </label>
                    </div>
                    <div className="requirements-column">
                      <label className="project-requirement-item">
                        <input 
                          type="checkbox" 
                          className="project-requirement-checkbox"
                          checked={projectRequirements.itFacilitySetup}
                          onChange={() => setProjectRequirements(prev => ({ ...prev, itFacilitySetup: !prev.itFacilitySetup }))}
                        />
                        <span className="project-requirement-text">IT and facility setup complete</span>
                      </label>
                      <label className="project-requirement-item">
                        <input 
                          type="checkbox" 
                          className="project-requirement-checkbox"
                          checked={projectRequirements.locationLaunch}
                          onChange={() => setProjectRequirements(prev => ({ ...prev, locationLaunch: !prev.locationLaunch }))}
                        />
                        <span className="project-requirement-text">Location launch activities finished</span>
                      </label>
                    </div>
                  </div>
                </div>

                <button 
                  className="mark-complete-button" 
                  onClick={() => router.push("/final-confirmation")}
                  disabled={!isAllProjectRequirementsComplete}
                >
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="button-icon">
                    <rect
                      x="2"
                      y="6"
                      width="12"
                      height="8"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M6 6V4C6 2.89543 6.89543 2 8 2C9.10457 2 10 2.89543 10 4V6"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Mark Project as Complete
                </button>
                <div className="completion-instruction">Complete all project execution tasks to mark as finished</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

