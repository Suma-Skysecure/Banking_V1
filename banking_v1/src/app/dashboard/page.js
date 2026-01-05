"use client";

import dynamic from 'next/dynamic';
import Providers from "@/components/Providers";

const BranchTracker = dynamic(() => import("@/components/BranchTracker"), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export default function DashboardPage() {
  return (
    <Providers>
      <BranchTracker />
    </Providers>
  );
}

