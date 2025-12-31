"use client";

import { useState, useRef } from "react";
import "@/css/documentUploadModal.css";

/**
 * Document Upload Modal Component
 * 
 * Modal for uploading 3 documents before approving property
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Function to close modal
 * @param {Function} props.onSubmit - Function called when all documents are uploaded and submitted
 */
export default function DocumentUploadModal({ isOpen, onClose, onSubmit }) {
  const [documents, setDocuments] = useState([
    { id: 1, file: null, name: null, progress: 0 },
    { id: 2, file: null, name: null, progress: 0 },
    { id: 3, file: null, name: null, progress: 0 },
  ]);
  const [isDragging, setIsDragging] = useState(null);
  const fileInputRefs = {
    1: useRef(null),
    2: useRef(null),
    3: useRef(null),
  };

  if (!isOpen) return null;

  // Handle file selection for specific document slot
  const handleFileSelect = (docId, e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(docId, file);
    }
  };

  // Handle file upload for a specific slot
  const handleFileUpload = (docId, file) => {
    // Validate file type - Only Excel files allowed
    const fileExtension = file.name.split(".").pop().toLowerCase();
    const validExtensions = ["xls", "xlsx"];

    if (!validExtensions.includes(fileExtension)) {
      alert(`Invalid file type. Please upload Excel files (.xls or .xlsx) only.`);
      return;
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert(`File size exceeds 10MB limit. Please upload a smaller file.`);
      return;
    }

    // Start with 0 progress and simulate upload
    setDocuments(prev => 
      prev.map(doc => 
        doc.id === docId 
          ? { ...doc, file, name: file.name, progress: 0 }
          : doc
      )
    );

    // Simulate upload progress
    simulateUploadProgress(docId);
  };

  // Simulate upload progress
  const simulateUploadProgress = (docId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setDocuments(prev => 
        prev.map(doc => 
          doc.id === docId 
            ? { ...doc, progress: Math.min(progress, 100) }
            : doc
        )
      );
      
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 100);
  };

  // Handle drag and drop
  const handleDrop = (docId, e) => {
    e.preventDefault();
    setIsDragging(null);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(docId, file);
    }
  };

  const handleDragOver = (docId, e) => {
    e.preventDefault();
    setIsDragging(docId);
  };

  const handleDragLeave = () => {
    setIsDragging(null);
  };

  // Handle browse button click
  const handleBrowseClick = (docId) => {
    fileInputRefs[docId].current?.click();
  };

  // Check if all documents are uploaded and ready
  const isSubmitEnabled = documents.every(doc => doc.file !== null && doc.progress === 100);

  // Handle submit
  const handleSubmit = () => {
    // Check if all documents are uploaded
    if (!isSubmitEnabled) {
      alert("Please upload all 3 documents before proceeding.");
      return;
    }

    if (onSubmit) {
      onSubmit(documents);
    }
    handleClose();
  };

  // Handle close
  const handleClose = () => {
    // Reset state
    setDocuments([
      { id: 1, file: null, name: null, progress: 0 },
      { id: 2, file: null, name: null, progress: 0 },
      { id: 3, file: null, name: null, progress: 0 },
    ]);
    setIsDragging(null);
    if (onClose) {
      onClose();
    }
  };

  // Get file type icon - Excel format
  const getFileType = (fileName) => {
    if (!fileName) return "XLS";
    const ext = fileName.split(".").pop().toUpperCase();
    return ext === "XLSX" ? "XLS" : ext;
  };

  return (
    <div className="document-upload-modal-overlay" onClick={handleClose}>
      <div className="document-upload-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Upload Required Documents</h2>
          <button className="modal-close-btn" onClick={handleClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="modal-content">
          <div className="upload-section">
            <h3 className="upload-section-title">UPLOAD FILE</h3>
            
            {/* Document Upload Slots */}
            {documents.map((doc) => (
              <div key={doc.id} className="document-slot">
                <input
                  ref={fileInputRefs[doc.id]}
                  type="file"
                  accept=".xls,.xlsx"
                  onChange={(e) => handleFileSelect(doc.id, e)}
                  style={{ display: "none" }}
                />

                {!doc.file ? (
                  // Upload Area (Before Upload) - Gray placeholder
                  <div
                    className={`upload-area ${isDragging === doc.id ? "dragging" : ""}`}
                    onDrop={(e) => handleDrop(doc.id, e)}
                    onDragOver={(e) => handleDragOver(doc.id, e)}
                    onDragLeave={handleDragLeave}
                    onClick={() => handleBrowseClick(doc.id)}
                  >
                    <div className="upload-icon-large">
                      <svg width="50" height="50" viewBox="0 0 100 100" fill="none">
                        <defs>
                          <linearGradient id={`gradient-${doc.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#9ca3af" />
                            <stop offset="100%" stopColor="#6b7280" />
                          </linearGradient>
                        </defs>
                        <rect
                          x="10"
                          y="10"
                          width="80"
                          height="80"
                          rx="8"
                          fill={`url(#gradient-${doc.id})`}
                        />
                        <text
                          x="50"
                          y="60"
                          fontSize="24"
                          fontWeight="bold"
                          fill="white"
                          textAnchor="middle"
                        >
                          XLS
                        </text>
                      </svg>
                    </div>
                    <div className="drag-drop-text">Drag & Drop</div>
                    <div className="or-text">or</div>
                    <button className="browse-btn" onClick={(e) => { e.stopPropagation(); handleBrowseClick(doc.id); }}>
                      Browse
                    </button>
                    <div className="document-label gray-text">Document {doc.id}</div>
                  </div>
                ) : (
                  // Uploaded File Display (After Upload) - Blue filled line
                  <div className="uploaded-file-item">
                    <div className="file-icon-container">
                      <svg width="36" height="36" viewBox="0 0 100 100" fill="none">
                        <defs>
                          <linearGradient id={`gradient-uploaded-${doc.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#60a5fa" />
                          </linearGradient>
                        </defs>
                        <rect
                          x="10"
                          y="10"
                          width="80"
                          height="80"
                          rx="8"
                          fill={`url(#gradient-uploaded-${doc.id})`}
                        />
                        <text
                          x="50"
                          y="60"
                          fontSize="20"
                          fontWeight="bold"
                          fill="white"
                          textAnchor="middle"
                        >
                          {getFileType(doc.name)}
                        </text>
                      </svg>
                    </div>
                    <div className="file-info">
                      <div className="file-name">{doc.name}</div>
                      <div className="upload-progress-container">
                        <div 
                          className="upload-progress-bar" 
                          style={{ width: `${doc.progress}%` }}
                        ></div>
                      </div>
                      {doc.progress === 100 && (
                        <div className="file-status">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <circle cx="10" cy="10" r="9" stroke="#10b981" strokeWidth="2" fill="#ecfdf5" />
                            <path
                              d="M6 10L9 13L14 7"
                              stroke="#10b981"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          Uploaded
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="modal-footer">
          <button className="cancel-btn" onClick={handleClose}>
            Cancel
          </button>
          <button 
            className="submit-btn" 
            onClick={handleSubmit}
            disabled={!isSubmitEnabled}
          >
            Submit & Approve
          </button>
        </div>
      </div>
    </div>
  );
}

