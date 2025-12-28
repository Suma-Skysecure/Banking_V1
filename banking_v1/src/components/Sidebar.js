"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import "@/css/branchTracker.css";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();

  const navigationItems = [
    { name: "Dashboard", icon: "🌐", href: "/dashboard" },
    { name: "Property Search", icon: "🔍", href: "/property-search" },
  ];

  return (
    <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : "closed"}`}>
      <div className="sidebar-logo">PropSys</div>
      <nav className="sidebar-nav">
        {navigationItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`sidebar-nav-item ${pathname === item.href ? "active" : ""}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.name}</span>
          </Link>
        ))}
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

