"use client";

import { createContext, useContext, useState } from "react";

const NotificationContext = createContext(null);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New LOI Generated",
      message: "LOI-2024-001234 has been generated and requires review",
      time: "2 minutes ago",
      unread: true,
      fileName: null
    },
    {
      id: 2,
      title: "Document Approved",
      message: "Stamp Duty certificate has been approved",
      time: "1 hour ago",
      unread: true,
      fileName: null
    },
    {
      id: 3,
      title: "Legal Review Required",
      message: "Property ABC Mall requires legal clearance",
      time: "3 hours ago",
      unread: true,
      fileName: null
    },
    {
      id: 4,
      title: "Workflow Completed",
      message: "Legal clearance workflow for XYZ Plaza is complete",
      time: "1 day ago",
      unread: false,
      fileName: null
    }
  ]);

  const addNotification = (notification) => {
    const newNotification = {
      id: Date.now(),
      time: "Just now",
      unread: true,
      ...notification
    };
    setNotifications((prev) => [newNotification, ...prev]);
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, unread: false }))
    );
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, markAllAsRead, markAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
};
