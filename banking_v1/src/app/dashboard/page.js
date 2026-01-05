"use client";

import dynamic from 'next/dynamic';
import Providers from "@/components/Providers";
import { useAuth } from "@/contexts/AuthContext";

const ITAssessmentDashboard = dynamic(() => import("@/components/ITAssessmentDashboard"), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

const BranchTracker = dynamic(() => import("@/components/BranchTracker"), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

function DashboardContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        Loading...
      </div>
    );
  }

  // IT & BRT teams see the IT Assessment Dashboard
  if (user?.role === "IT team" || user?.role === "BRT team") {
    return <ITAssessmentDashboard />;
  }

  // All other roles see the main Branch Tracker Dashboard
  return <BranchTracker />;
}

export default function DashboardPage() {
  return (
    <Providers>
      <DashboardContent />
    </Providers>
  );
}

