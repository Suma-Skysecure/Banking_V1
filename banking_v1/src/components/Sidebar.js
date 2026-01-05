"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import UserProfile from "@/components/UserProfile";
import "@/css/branchTracker.css";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();
  const { user } = useAuth();

  const baseNavigationItems = [
    { name: "Dashboard", icon: "🌐", href: "/dashboard", page: "dashboard" },
    { name: "Property Search", icon: "🔍", href: "/property-search", page: "propertySearch" },
  ];

  // Add IT Assessment Dashboard for IT users
  const navigationItems = user?.role === "IT team" 
    ? [...baseNavigationItems, { name: "IT Assessment", icon: "🖥️", href: "/it/assessment-dashboard", page: "itAssessment" }]
    : baseNavigationItems;

  return (
    <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : "closed"}`}>
      <div className="sidebar-logo">PropSys</div>
      <nav className="sidebar-nav">
        {navigationItems.map((item, index) => {
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
        <UserProfile variant="sidebar" />
      </div>
    </aside>
  );
}

