"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import UserProfile from "@/components/UserProfile";
import "@/css/branchTracker.css";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();
  const { user } = useAuth();

  const navigationItems = [
    {
      name: "Dashboard",
      icon: "🌐",
      href: "/dashboard",
      page: "dashboard"
    },
    { name: "Property Search", icon: "🔍", href: "/property-search", page: "propertySearch" },
  ];

  return (
    <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : "closed"}`}>
      <div className="sidebar-logo" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <img 
          src="/kotak.png" 
          alt="Kotak Logo" 
          style={{ 
            height: "64px", 
            width: "auto",
            objectFit: "contain"
          }} 
        />
        <span style={{ fontSize: "16px", textAlign: "center", lineHeight: "1.2" }}>Branch Management System</span>
      </div>
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

