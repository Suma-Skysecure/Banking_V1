"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";

const NotificationContext = createContext(null);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [notifications, setNotifications] = useState([]);

  // Load and filter notifications based on user role
  useEffect(() => {
    if (!user) {
      setNotifications([]);
      return;
    }

    try {
      const storedNotifications = localStorage.getItem("pms_notifications");
      if (storedNotifications) {
        const parsedNotifications = JSON.parse(storedNotifications);
        // Filter notifications: show only if no targetRole or targetRole matches current user's role
        const filteredNotifications = parsedNotifications.filter(notif =>
          !notif.targetRole || notif.targetRole === user.role
        );
        setNotifications(filteredNotifications);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error("Error loading notifications from localStorage:", error);
      setNotifications([]);
    }
  }, [user]);

  // Create a new notification
  const createNotification = (message, type = "info", link = null, targetRole = null) => {
    const newNotification = {
      id: `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      message,
      time: new Date().toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
      type,
      link,
      targetRole, // Role that should see this notification
      read: false,
      createdAt: new Date().toISOString(),
    };

    // Get all notifications from localStorage
    let allNotifications = [];
    try {
      const stored = localStorage.getItem("pms_notifications");
      if (stored) {
        allNotifications = JSON.parse(stored);
      }
    } catch (error) {
      console.error("Error loading notifications from localStorage:", error);
    }

    const updatedNotifications = [newNotification, ...allNotifications];

    // Save to localStorage
    try {
      localStorage.setItem("pms_notifications", JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error("Error saving notification to localStorage:", error);
    }

    // Reload notifications to update the filtered list
    try {
      const storedNotifications = localStorage.getItem("pms_notifications");
      if (storedNotifications) {
        const parsedNotifications = JSON.parse(storedNotifications);
        // Filter notifications: show only if no targetRole or targetRole matches current user's role
        const filteredNotifications = parsedNotifications.filter(notif =>
          !notif.targetRole || notif.targetRole === user?.role
        );
        setNotifications(filteredNotifications);
      }
    } catch (error) {
      console.error("Error reloading notifications:", error);
    }

    return newNotification;
  };

  // Mark notification as read
  const markAsRead = (notificationId) => {
    try {
      const stored = localStorage.getItem("pms_notifications");
      if (stored) {
        const allNotifications = JSON.parse(stored);
        const updatedNotifications = allNotifications.map(notif =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        );
        localStorage.setItem("pms_notifications", JSON.stringify(updatedNotifications));

        // Reload filtered notifications
        const filteredNotifications = updatedNotifications.filter(notif =>
          !notif.targetRole || notif.targetRole === user?.role
        );
        setNotifications(filteredNotifications);
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Handle notification click - navigate to link if available
  const handleNotificationClick = (notification) => {
    if (notification.link) {
      markAsRead(notification.id);
      router.push(notification.link);
    }
  };

  // Get unread count
  const unreadCount = notifications.filter(notif => !notif.read).length;

  // Mark all notifications as read
  const markAllAsRead = () => {
    try {
      const stored = localStorage.getItem("pms_notifications");
      if (stored) {
        const allNotifications = JSON.parse(stored);
        const updatedNotifications = allNotifications.map(notif =>
          (!notif.targetRole || notif.targetRole === user?.role) ? { ...notif, read: true } : notif
        );
        localStorage.setItem("pms_notifications", JSON.stringify(updatedNotifications));

        // Reload filtered notifications
        const filteredNotifications = updatedNotifications.filter(notif =>
          !notif.targetRole || notif.targetRole === user?.role
        );
        setNotifications(filteredNotifications);
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  // Refresh notifications function
  const refreshNotifications = () => {
    try {
      const storedNotifications = localStorage.getItem("pms_notifications");
      if (storedNotifications) {
        const parsedNotifications = JSON.parse(storedNotifications);
        // Filter notifications: show only if no targetRole or targetRole matches current user's role
        const filteredNotifications = parsedNotifications.filter(notif =>
          !notif.targetRole || notif.targetRole === user?.role
        );
        setNotifications(filteredNotifications);
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error("Error loading notifications from localStorage:", error);
      setNotifications([]);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        createNotification,
        markAsRead,
        markAllAsRead,
        handleNotificationClick,
        unreadCount,
        refreshNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

