"use client";

import BranchTracker from "@/components/BranchTracker";
import BRTDashboard from "@/components/BRTDashboard";
import ITAssessmentDashboard from "@/components/ITAssessmentDashboard";
import Providers from "@/components/Providers";
import { useAuth } from "@/contexts/AuthContext";

function DashboardContent() {
  const { user, loading } = useAuth();

  // Show loading state while checking user
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

  // If user is BRT, show BRT Dashboard
  if (user?.role === "BRT") {
    return <BRTDashboard />;
  }

  // If user is IT Team, show IT Assessment Dashboard
  if (user?.role === "IT team") {
    return <ITAssessmentDashboard />;
  }

  // Otherwise show the common BranchTracker dashboard
  return <BranchTracker />;
}

export default function DashboardPage() {
  return (
    <Providers>
      <DashboardContent />
    </Providers>
  );
}

