"use client";

import { useState, useRef } from "react";
import "@/css/documentUploadModal.css";

/**
 * Document Upload Modal Component
 * 
 * Modal for uploading multiple documents (minimum 3) before approving property
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Function to close modal
 * @param {Function} props.onSubmit - Function called when documents are uploaded and submitted
 */
export default function DocumentUploadModal({ isOpen, onClose, onSubmit }) {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  // Get file type extension
  const getFileExtension = (fileName) => {
    if (!fileName) return "FILE";
    const ext = fileName.split(".").pop().toUpperCase();
    return ext || "FILE";
  };

  // Check for duplicate files
  const isDuplicateFile = (newFile) => {
    return files.some(
      (existingFile) =>
        existingFile.name === newFile.name &&
        existingFile.size === newFile.size &&
        existingFile.lastModified === newFile.lastModified
    );
  };

  // Validate and process files
  const processFiles = (fileList) => {
    const newFiles = Array.from(fileList);
    const validFiles = [];
    const duplicates = [];

    newFiles.forEach((file) => {
      // Check for duplicates
      if (isDuplicateFile(file)) {
        duplicates.push(file.name);
        return;
      }

      // Validate file size (10MB max - optional, can be removed if not needed)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        alert(`File "${file.name}" exceeds 10MB limit. Please upload a smaller file.`);
        return;
      }

      validFiles.push({
        id: Date.now() + Math.random(), // Unique ID
        file: file,
        name: file.name,
        size: file.size,
        progress: 0,
      });
    });

    if (duplicates.length > 0) {
      alert(`The following files are already uploaded: ${duplicates.join(", ")}`);
    }

    if (validFiles.length > 0) {
      setFiles((prev) => [...prev, ...validFiles]);
      // Simulate upload progress for new files
      validFiles.forEach((fileObj) => {
        simulateUploadProgress(fileObj.id);
      });
    }
  };

  // Handle file selection from input
  const handleFileSelect = (e) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      processFiles(selectedFiles);
    }
    // Reset input to allow selecting same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle drag and drop
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      processFiles(droppedFiles);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  // Handle browse button click
  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  // Simulate upload progress
  const simulateUploadProgress = (fileId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setFiles((prev) =>
        prev.map((fileObj) =>
          fileObj.id === fileId
            ? { ...fileObj, progress: Math.min(progress, 100) }
            : fileObj
        )
      );

      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 100);
  };

  // Remove file from list
  const handleRemoveFile = (fileId) => {
    setFiles((prev) => prev.filter((fileObj) => fileObj.id !== fileId));
  };

  // Check if submit is enabled (at least 3 files uploaded and completed)
  const isSubmitEnabled =
    files.length >= 3 && files.every((fileObj) => fileObj.progress === 100);

  // Handle submit
  const handleSubmit = () => {
    if (!isSubmitEnabled) {
      alert("Please upload at least 3 documents before proceeding.");
      return;
    }

    if (onSubmit) {
      onSubmit(files);
    }
    handleClose();
  };

  // Handle close
  const handleClose = () => {
    // Reset state
    setFiles([]);
    setIsDragging(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    if (onClose) {
      onClose();
    }
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
            <h3 className="upload-section-title">UPLOAD FILES</h3>

            {/* Single Upload Area */}
            <div className="single-upload-container">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                style={{ display: "none" }}
              />

              <div
                className={`upload-area ${isDragging ? "dragging" : ""}`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onClick={handleBrowseClick}
              >
                <div className="upload-icon-large">
                  <svg width="60" height="60" viewBox="0 0 100 100" fill="none">
                    <defs>
                      <linearGradient id="upload-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
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
                      fill="url(#upload-gradient)"
                    />
                    <text
                      x="50"
                      y="60"
                      fontSize="20"
                      fontWeight="bold"
                      fill="white"
                      textAnchor="middle"
                    >
                      FILE
                    </text>
                  </svg>
                </div>
                <div className="drag-drop-text">Drag & Drop files here</div>
                <div className="or-text">or</div>
                <button
                  className="browse-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBrowseClick();
                  }}
                >
                  Browse
                </button>
                <div className="upload-hint">
                  Select multiple files (Ctrl/Cmd + Click) or drag and drop
                </div>
              </div>

              {/* File List */}
              {files.length > 0 && (
                <div className="files-list-container">
                  <div className="files-list-header">
                    <span className="files-count">
                      {files.length} file{files.length !== 1 ? "s" : ""} uploaded
                    </span>
                  </div>
                  <div className="files-list">
                    {files.map((fileObj) => (
                      <div key={fileObj.id} className="uploaded-file-item">
                        <div className="file-icon-container">
                          <svg width="36" height="36" viewBox="0 0 100 100" fill="none">
                            <defs>
                              <linearGradient
                                id={`gradient-${fileObj.id}`}
                                x1="0%"
                                y1="0%"
                                x2="100%"
                                y2="100%"
                              >
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
                              fill={`url(#gradient-${fileObj.id})`}
                            />
                            <text
                              x="50"
                              y="60"
                              fontSize="16"
                              fontWeight="bold"
                              fill="white"
                              textAnchor="middle"
                            >
                              {getFileExtension(fileObj.name)}
                            </text>
                          </svg>
                        </div>
                        <div className="file-info">
                          <div className="file-name">{fileObj.name}</div>
                          <div className="file-size">{formatFileSize(fileObj.size)}</div>
                          {fileObj.progress < 100 && (
                            <div className="upload-progress-container">
                              <div
                                className="upload-progress-bar"
                                style={{ width: `${fileObj.progress}%` }}
                              ></div>
                            </div>
                          )}
                          {fileObj.progress === 100 && (
                            <div className="file-status">
                              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                                <circle
                                  cx="10"
                                  cy="10"
                                  r="9"
                                  stroke="#10b981"
                                  strokeWidth="2"
                                  fill="#ecfdf5"
                                />
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
                        <button
                          className="remove-file-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFile(fileObj.id);
                          }}
                          title="Remove file"
                        >
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path
                              d="M15 5L5 15M5 5L15 15"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
