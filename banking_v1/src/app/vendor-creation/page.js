"use client";
import { Suspense } from "react";
import Providers from "@/components/Providers";
import VendorCreation from "@/components/VendorCreation";

export const dynamic = "force-dynamic";

export default function VendorCreationPage() {
  return (
    <Providers>
      <Suspense fallback={<div>Loading...</div>}>
        <VendorCreation />
      </Suspense>
    </Providers>
  );
}
