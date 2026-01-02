"use client";

import { useAuth } from "@/contexts/AuthContext";
import BranchTracker from "@/components/BranchTracker";
import BRTDashboard from "@/components/BRTDashboard";
import Providers from "@/components/Providers";

function DashboardContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh" 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  // Show BRT Dashboard for BRT users (case-insensitive check)
  if (user?.role && user.role.toUpperCase() === "BRT") {
    return <BRTDashboard />;
  }

  // Show BranchTracker for all other users
  return <BranchTracker />;
}

export default function DashboardPage() {
  return (
    <Providers>
      <DashboardContent />
    </Providers>
  );
}

