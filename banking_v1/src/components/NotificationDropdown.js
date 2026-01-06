"use client";

import { useState, useEffect, useRef } from "react";

/**
 * NotificationDropdown Component
 * 
 * Displays notification bell icon with badge and dropdown menu
 * Shows all notifications with mark all as read functionality
 */
export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Legal Clearance Required",
      message: "New property requires legal due diligence review",
      time: "2 minutes ago",
      read: false,
      type: "info",
    },
    {
      id: 2,
      title: "Document Uploaded",
      message: "Sales Deed document has been uploaded",
      time: "15 minutes ago",
      read: false,
      type: "success",
    },
    {
      id: 3,
      title: "BRT Confirmation Pending",
      message: "BRT confirmation is required for legal call",
      time: "1 hour ago",
      read: false,
      type: "warning",
    },
    {
      id: 4,
      title: "Legal Clearance Approved",
      message: "Legal clearance has been granted for Downtown Arts Plaza",
      time: "2 hours ago",
      read: true,
      type: "success",
    },
    {
      id: 5,
      title: "Compliance Status Updated",
      message: "Compliance status has been updated to completed",
      time: "3 hours ago",
      read: true,
      type: "info",
    },
  ]);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      handleMarkAsRead(notification.id);
    }
    // Handle notification click action here
    console.log("Notification clicked:", notification);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="#10b981" strokeWidth="1.5" fill="#ecfdf5" />
            <path
              d="M5 8L7 10L11 6"
              stroke="#10b981"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        );
      case "warning":
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="#f59e0b" strokeWidth="1.5" fill="#fef3c7" />
            <path
              d="M8 4V8M8 12H8.01"
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        );
      case "error":
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="#ef4444" strokeWidth="1.5" fill="#fee2e2" />
            <path
              d="M8 5V11M5 8H11"
              stroke="#ef4444"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="#3b82f6" strokeWidth="1.5" fill="#dbeafe" />
            <path
              d="M8 4V8M8 12H8.01"
              stroke="#3b82f6"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        );
    }
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative" }}>
      {/* Notification Bell Icon */}
      <button
        className="header-icon-btn"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "relative",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "8px",
          borderRadius: "6px",
          transition: "background-color 0.2s",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#f3f4f6")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        {/* Badge for unread notifications */}
        {unreadCount > 0 && (
          <span
            style={{
              position: "absolute",
              top: "4px",
              right: "4px",
              backgroundColor: "#ef4444",
              color: "white",
              borderRadius: "50%",
              width: "18px",
              height: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "10px",
              fontWeight: "700",
              border: "2px solid white",
            }}
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: "380px",
            maxWidth: "90vw",
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
            border: "1px solid #e5e7eb",
            zIndex: 1000,
            maxHeight: "500px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid #e5e7eb",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h3
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: "#111827",
                margin: 0,
              }}
            >
              Notifications
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                style={{
                  background: "none",
                  border: "none",
                  color: "#1e3a8a",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  transition: "background-color 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#f3f4f6")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div
            style={{
              overflowY: "auto",
              flex: 1,
            }}
          >
            {notifications.length === 0 ? (
              <div
                style={{
                  padding: "40px 20px",
                  textAlign: "center",
                  color: "#6b7280",
                }}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ margin: "0 auto 12px", opacity: 0.5 }}
                >
                  <path
                    d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p style={{ margin: 0, fontSize: "14px" }}>No notifications</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => handleNotificationClick(notification)}
                  style={{
                    padding: "16px 20px",
                    borderBottom: "1px solid #f3f4f6",
                    cursor: "pointer",
                    backgroundColor: notification.read ? "white" : "#eff6ff",
                    transition: "background-color 0.2s",
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = notification.read
                      ? "#f9fafb"
                      : "#dbeafe";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = notification.read
                      ? "white"
                      : "#eff6ff";
                  }}
                >
                  {/* Notification Icon */}
                  <div style={{ flexShrink: 0, marginTop: "2px" }}>
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Notification Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "4px",
                      }}
                    >
                      <h4
                        style={{
                          fontSize: "14px",
                          fontWeight: notification.read ? "500" : "600",
                          color: "#111827",
                          margin: 0,
                        }}
                      >
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <div
                          style={{
                            width: "8px",
                            height: "8px",
                            borderRadius: "50%",
                            backgroundColor: "#3b82f6",
                            flexShrink: 0,
                            marginLeft: "8px",
                            marginTop: "4px",
                          }}
                        />
                      )}
                    </div>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "#6b7280",
                        margin: "0 0 8px 0",
                        lineHeight: "1.4",
                      }}
                    >
                      {notification.message}
                    </p>
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#9ca3af",
                      }}
                    >
                      {notification.time}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {notifications.length > 0 && (
            <div
              style={{
                padding: "12px 20px",
                borderTop: "1px solid #e5e7eb",
                textAlign: "center",
              }}
            >
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#1e3a8a",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  padding: "4px 8px",
                }}
              >
                View all notifications
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

