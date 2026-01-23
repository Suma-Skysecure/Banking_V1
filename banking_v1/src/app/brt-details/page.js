"use client";

export const dynamic = "force-dynamic";

import { Suspense } from "react";
import BRTDetailsPage from "@/components/BRTDetailsPage";
import Providers from "@/components/Providers";

export default function BRTDetailsRoutePage() {
  return (
    <Providers>
      <Suspense fallback={<div>Loading...</div>}>
        <BRTDetailsPage />
      </Suspense>
    </Providers>
  );
}
