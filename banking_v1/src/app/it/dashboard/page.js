"use client";

import dynamic from "next/dynamic";
import Providers from "@/components/Providers";

// Dynamically import the IT Assessment Dashboard to avoid SSR issues
const ITAssessmentDashboard = dynamic(() => import("@/components/ITAssessmentDashboard"), {
  ssr: false,
});

export default function ITDashboardPage() {
  return (
    <Providers>
      <ITAssessmentDashboard />
    </Providers>
  );
}