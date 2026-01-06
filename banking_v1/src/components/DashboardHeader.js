"use client";

import { useState, useEffect, useRef } from "react";
import NotificationDropdown from "@/components/NotificationDropdown";
>>>>>>>>> Temporary merge branch 2

/**
 * Reusable Dashboard Header Component
 * 
 * Used across all dashboard pages with:
 * - Hamburger menu
 * - Search bar
 * - Bell icon for notifications (via NotificationDropdown)
 */
<<<<<<<<< Temporary merge branch 1
/**
 * @param {Object} props
 * @param {boolean} props.sidebarOpen - Whether sidebar is open
 * @param {Function} props.setSidebarOpen - Function to toggle sidebar
 */
export default function DashboardHeader({ sidebarOpen, setSidebarOpen }) {
  const { notifications, handleNotificationClick, unreadCount } = useNotifications();
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationPanelRef = useRef(null);

  // Close notification panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationPanelRef.current && !notificationPanelRef.current.contains(event.target)) {
        // Check if the click is not on the bell button
        const bellButton = event.target.closest('.header-icon-btn');
        if (!bellButton) {
          setNotificationsOpen(false);
        }
      }
    };

    if (notificationsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notificationsOpen]);

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
  };
=========
export default function DashboardHeader({ sidebarOpen, setSidebarOpen }) {
>>>>>>>>> Temporary merge branch 2

  return (
    <>
      <header className="dashboard-header">
        <button
          className="header-hamburger"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            className="hamburger-icon"
          >
            <path
              d="M3 5H17M3 10H17M3 15H17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div className="header-search">
          <svg
            className="search-icon"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M11.5 10.5L15 14M13 7C13 10.3137 10.3137 13 7 13C3.68629 13 1 10.3137 1 7C1 3.68629 3.68629 1 7 1C10.3137 1 13 3.68629 13 7Z"
              stroke="#6b7280"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <input
            type="text"
            placeholder="Search branch..."
            className="header-search-input"
          />
        </div>
<<<<<<<<< Temporary merge branch 1
        <div className="header-actions" style={{ position: "relative" }}>
          <button 
            className="header-icon-btn" 
            aria-label="Notifications"
            onClick={toggleNotifications}
            style={{
              position: "relative",
              backgroundColor: notificationsOpen ? "#f3f4f6" : "transparent"
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                stroke="#6b7280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.73 21a2 2 0 0 1-3.46 0"
                stroke="#6b7280"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {unreadCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "4px",
                  right: "4px",
                  backgroundColor: "#ef4444",
                  color: "#ffffff",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  fontSize: "11px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #ffffff"
                }}
              >
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </button>

          {/* Notification Panel */}
          {notificationsOpen && (
            <div
              ref={notificationPanelRef}
              style={{
                position: "absolute",
                top: "calc(100% + 12px)",
                right: "0",
                width: "380px",
                maxHeight: "500px",
                backgroundColor: "#f9fafb",
                borderRadius: "12px",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e5e7eb",
                zIndex: 1000,
                display: "flex",
                flexDirection: "column",
                overflow: "hidden"
              }}
            >
              {/* Panel Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  borderBottom: "1px solid #e5e7eb",
                  backgroundColor: "#ffffff"
                }}
              >
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "#111827",
                    margin: 0
                  }}
                >
                  Notifications
                </h3>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    border: "none",
                    backgroundColor: "#f3f4f6",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background-color 0.2s"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#e5e7eb";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#f3f4f6";
                  }}
                  aria-label="Close notifications"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M12 4L4 12M4 4L12 12"
                      stroke="#374151"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Notifications List */}
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "8px"
                }}
              >
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                      style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "8px",
                        padding: "16px",
                        marginBottom: "8px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "12px",
                        transition: "background-color 0.2s, box-shadow 0.2s",
                        border: "1px solid transparent"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f9fafb";
                        e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.05)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#ffffff";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    >
                      {/* Icon Container */}
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "8px",
                          backgroundColor: "#f3f4f6",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0
                        }}
                      >
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            backgroundColor: "#ffffff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid #e5e7eb"
                          }}
                        >
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                            {/* Gear/Cogwheel icon with circular arrows */}
                            <circle cx="9" cy="9" r="2.5" stroke="#6b7280" strokeWidth="1.5" fill="none"/>
                            <path d="M9 1.5L9 3.5M9 14.5L9 16.5M16.5 9L14.5 9M3.5 9L1.5 9M14.55 3.45L13.42 4.58M4.58 13.42L3.45 14.55M14.55 14.55L13.42 13.42M4.58 4.58L3.45 3.45" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round"/>
                            {/* Circular arrows */}
                            <path d="M5 5C5 5 6.5 3.5 9 3.5C11.5 3.5 13 5 13 5" stroke="#9ca3af" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.7"/>
                            <path d="M13 13C13 13 11.5 14.5 9 14.5C6.5 14.5 5 13 5 13" stroke="#9ca3af" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.7"/>
                          </svg>
                        </div>
                      </div>

                      {/* Notification Content */}
                      <div
                        style={{
                          flex: 1,
                          minWidth: 0
                        }}
                      >
                        <div
                          style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#111827",
                            marginBottom: "4px",
                            lineHeight: "1.4"
                          }}
                        >
                          {notification.message}
                        </div>
                        <div
                          style={{
                            fontSize: "12px",
                            color: "#6b7280",
                            lineHeight: "1.4"
                          }}
                        >
                          {notification.time}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div
                    style={{
                      padding: "32px 20px",
                      textAlign: "center",
                      color: "#6b7280",
                      fontSize: "14px"
                    }}
                  >
                    No notifications
                  </div>
                )}
              </div>
            </div>
          )}
=========
        <div className="header-actions">
          <NotificationDropdown />
>>>>>>>>> Temporary merge branch 2
        </div>
      </header>
    </>
  );
}
