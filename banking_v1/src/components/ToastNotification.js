"use client";

import { useEffect, useState } from "react";
import "@/css/toastNotification.css";

/**
 * Toast Notification Component
 * 
 * Displays success/error/info notifications that auto-dismiss after a few seconds
 * @param {Object} props
 * @param {boolean} props.show - Whether to show the notification
 * @param {string} props.message - The notification message
 * @param {string} props.type - Type of notification: 'success', 'error', 'info'
 * @param {Function} props.onClose - Callback when notification closes
 * @param {number} props.duration - Duration in milliseconds (default: 3000)
 */
export default function ToastNotification({ 
  show, 
  message, 
  type = "success", 
  onClose,
  duration = 3000 
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      setIsExiting(false);
      
      // Auto-dismiss after duration
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        onClose();
      }
    }, 300); // Animation duration
  };

  if (!isVisible && !show) return null;

  return (
    <div className={`toast-container ${isVisible && !isExiting ? "show" : "hide"}`}>
      <div className={`toast toast-${type}`}>
        <div className="toast-content">
          <div className="toast-icon">
            {type === "success" && (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M7 10L9 12L13 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {type === "error" && (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M7 7L13 13M13 7L7 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
            {type === "info" && (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  d="M10 6V10M10 14H10.01"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </div>
          <div className="toast-message">{message}</div>
        </div>
        <button className="toast-close" onClick={handleClose} aria-label="Close notification">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}


