"use client";

import dynamic from 'next/dynamic';
import Providers from "@/components/Providers";

const ITAssessmentDashboard = dynamic(() => import("@/components/ITAssessmentDashboard"), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function DashboardPage() {
  return (
    <Providers>
      <ITAssessmentDashboard />
    </Providers>
  );
}

