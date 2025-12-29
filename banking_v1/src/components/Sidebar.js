"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import "@/css/branchTracker.css";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();
  const { canView } = useAuth();

  const navigationItems = [
    { name: "Dashboard", icon: "🌐", href: "/dashboard", page: "dashboard" },
    { name: "Property Search", icon: "🔍", href: "/property-search", page: "propertySearch" },
  ];

  return (
    <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : "closed"}`}>
      <div className="sidebar-logo">PropSys</div>
      <nav className="sidebar-nav">
        {navigationItems.map((item, index) => {
          // Check if user has permission to view this page
          const hasAccess = item.page ? canView(item.page) : true;
          
          if (!hasAccess) {
            return (
              <div
                key={index}
                className={`sidebar-nav-item disabled`}
                style={{ 
                  opacity: 0.5, 
                  cursor: "not-allowed",
                  pointerEvents: "none"
                }}
                title="You don't have permission to access this page"
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.name}</span>
              </div>
            );
          }
          
          return (
            <Link
              key={index}
              href={item.href}
              className={`sidebar-nav-item ${pathname === item.href ? "active" : ""}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="user-avatar">AM</div>
          <div className="user-info">
            <div className="user-name">Ana Miller</div>
            <a href="#" className="user-logout">
              Logout →
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

