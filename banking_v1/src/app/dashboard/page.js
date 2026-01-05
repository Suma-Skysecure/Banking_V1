"use client";

<<<<<<< HEAD
import BranchTracker from "@/components/BranchTracker";
import BRTDashboard from "@/components/BRTDashboard";
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
=======
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
>>>>>>> 271c475d40527afb6c6438579f940b3b4f58ff86
      </div>
    );
  }

<<<<<<< HEAD
  // If user is BRT, show BRT Dashboard
  if (user?.role === "BRT") {
    return <BRTDashboard />;
  }

  // Otherwise show the common BranchTracker dashboard
=======
  // IT & BRT teams see the IT Assessment Dashboard
  if (user?.role === "IT team" || user?.role === "BRT team") {
    return <ITAssessmentDashboard />;
  }

  // All other roles see the main Branch Tracker Dashboard
>>>>>>> 271c475d40527afb6c6438579f940b3b4f58ff86
  return <BranchTracker />;
}

export default function DashboardPage() {
  return (
    <Providers>
      <DashboardContent />
    </Providers>
  );
}

