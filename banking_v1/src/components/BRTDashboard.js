"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import LegalClearance from "@/components/LegalClearance";
import ITFeasibility from "@/components/ITFeasibility";
import "@/css/branchTracker.css";

export default function BRTDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("legal");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ===== NOTIFICATION STATE =====
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Legal Clearance Required",
      message: "Property ABC Mall requires BRT team review",
      time: "5 minutes ago",
      unread: true
    },
    {
      id: 2,
      title: "IT Feasibility Approved",
      message: "IT feasibility check for XYZ Plaza has been completed",
      time: "1 hour ago",
      unread: true
    },
    {
      id: 3,
      title: "New Branch Request",
      message: "New branch application submitted for review",
      time: "3 hours ago",
      unread: true
    },
    {
      id: 4,
      title: "Clearance Completed",
      message: "Legal and IT clearance for Downtown Branch is complete",
      time: "1 day ago",
      unread: false
    }
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  // Handle marking all notifications as read
  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      unread: false
    })));
  };

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotificationDropdown && !event.target.closest('.notification-wrapper')) {
        setShowNotificationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotificationDropdown]);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-container">
      {/* Top Header Bar */}
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
        <div className="header-logo">
          <div className="logo-text">BRT Dashboard</div>
        </div>
        <div className="header-actions">
          <div className="header-right-section">
            {/* Notification Icon */}
            <div className="notification-wrapper">
              <button
                className="header-notification-btn"
                onClick={() => setShowNotificationDropdown(!showNotificationDropdown)}
                aria-label="Notifications"
              >
                <svg
                  className="notification-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 2C11.1 2 12 2.9 12 4V5.09C14.2 5.57 16 7.47 16 9.77V14L18 16V17H2V16L4 14V9.77C4 7.47 5.8 5.57 8 5.09V4C8 2.9 8.9 2 10 2ZM10 18C11.1 18 12 17.1 12 16H8C8 17.1 8.9 18 10 18Z"
                    fill="currentColor"
                  />
                </svg>
                {unreadCount > 0 && (
                  <span className="notification-badge">{unreadCount}</span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotificationDropdown && (
                <div className="notification-dropdown">
                  <div className="notification-dropdown-header">
                    <h4>Notifications</h4>
                    <button
                      className="notification-close"
                      onClick={() => setShowNotificationDropdown(false)}
                      aria-label="Close"
                    >
                      ×
                    </button>
                  </div>
                  <div className="notification-list">
                    {notifications.length === 0 ? (
                      <div className="notification-empty">
                        <p>No notifications</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`notification-item ${notification.unread ? 'unread' : ''}`}
                          onClick={() => {
                            // Handle notification click
                            console.log('Notification clicked:', notification.id);
                          }}
                        >
                          {notification.unread && <div className="notification-dot"></div>}
                          <div className="notification-content">
                            <p className="notification-title">{notification.title}</p>
                            <p className="notification-message">{notification.message}</p>
                            <p className="notification-time">{notification.time}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  {notifications.length > 0 && (
                    <div className="notification-footer">
                      <button 
                        className="btn tertiary" 
                        onClick={handleMarkAllAsRead}
                        disabled={unreadCount === 0}
                      >
                        Mark all as read
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Profile Section */}
            <div className="header-profile">
              <span className="text-sm text-gray-700 mr-4">
                Logged in as: {user?.role || "BRT"}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="dashboard-content-wrapper">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Main Content Area */}
        <main className="dashboard-main">
          <div className="main-content">
            {/* Tabs */}
            <div className="mb-6 border-b border-gray-200">
              <nav className="flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab("legal")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "legal"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Legal
                </button>
                <button
                  onClick={() => setActiveTab("it-feasibility")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "it-feasibility"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  IT Feasibility
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="mt-6">
              {activeTab === "legal" && <LegalClearance />}
              {activeTab === "it-feasibility" && <ITFeasibility />}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

