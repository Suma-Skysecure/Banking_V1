"use client";

import { useAuth } from "@/contexts/AuthContext";
import "@/css/userProfile.css";

/**
 * Reusable UserProfile Component
 * 
 * Displays user avatar with initials, role/name, and logout functionality
 * @param {Object} props
 * @param {string} props.variant - Display variant: 'sidebar' | 'header' | 'compact'
 * @param {Function} props.onLogout - Optional custom logout handler
 * @param {boolean} props.showLogout - Whether to show logout button (default: true)
 */
export default function UserProfile({ 
  variant = "sidebar", 
  onLogout,
  showLogout = true 
}) {
  const { user, logout } = useAuth();

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return "U";
    const name = user.name || user.username || "";
    const parts = name.split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    if (name.length >= 2) {
      return name.substring(0, 2).toUpperCase();
    }
    return name.charAt(0).toUpperCase() + "U";
  };

  // Get display name (role or name)
  const getDisplayName = () => {
    if (!user) return "User";
    // If username contains @, extract the part before @
    if (user.username && user.username.includes("@")) {
      const usernamePart = user.username.split("@")[0];
      // Capitalize first letter
      return usernamePart.charAt(0).toUpperCase() + usernamePart.slice(1);
    }
    return user.role || user.name || user.username || "User";
  };

  const handleLogout = (e) => {
    e.preventDefault();
    if (onLogout) {
      onLogout();
    } else {
      logout(); // Default logout redirects to login page
    }
  };

  // Generate gradient color based on user initials (for consistent avatar colors)
  const getAvatarColor = () => {
    if (!user) return "linear-gradient(135deg, #3b82f6, #8b5cf6)";
    
    const name = user.name || user.username || "";
    const hash = name.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    
    // Generate colors based on hash
    const colors = [
      ["#3b82f6", "#8b5cf6"], // Blue to Purple
      ["#10b981", "#059669"], // Green
      ["#f59e0b", "#d97706"], // Orange
      ["#ef4444", "#dc2626"], // Red
      ["#8b5cf6", "#7c3aed"], // Purple
      ["#06b6d4", "#0891b2"], // Cyan
    ];
    
    const colorPair = colors[Math.abs(hash) % colors.length];
    return `linear-gradient(135deg, ${colorPair[0]}, ${colorPair[1]})`;
  };

  if (variant === "compact") {
    return (
      <div className="user-profile compact">
        <div 
          className="user-avatar" 
          style={{ background: getAvatarColor() }}
        >
          {getUserInitials()}
        </div>
        {showLogout && (
          <button className="logout-btn-compact" onClick={handleLogout} aria-label="Logout">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path
                d="M7 17L17 10L7 3M17 10H3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }

  if (variant === "header") {
    return (
      <div className="user-profile header">
        <div 
          className="user-avatar" 
          style={{ background: getAvatarColor() }}
        >
          {getUserInitials()}
        </div>
        <div className="user-info">
          <div className="user-name">{getDisplayName()}</div>
          {user?.email && (
            <div className="user-email">{user.email}</div>
          )}
        </div>
        {showLogout && (
          <button className="logout-btn-header" onClick={handleLogout} aria-label="Logout">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
              <path
                d="M7 17L17 10L7 3M17 10H3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    );
  }

  // Default: sidebar variant
  return (
    <div className="user-profile sidebar">
      <div 
        className="user-avatar" 
        style={{ background: getAvatarColor() }}
      >
        {getUserInitials()}
      </div>
      <div className="user-info">
        <div className="user-name">{getDisplayName()}</div>
        {showLogout && (
          <a href="#" className="user-logout" onClick={handleLogout}>
            Logout →
          </a>
        )}
      </div>
    </div>
  );
}

