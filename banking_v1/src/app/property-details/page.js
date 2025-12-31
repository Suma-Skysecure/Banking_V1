import { Suspense } from "react";
import PropertyDetails from "@/components/PropertyDetails";
import Providers from "@/components/Providers";

export default function PropertyDetailsPage() {
  return (
    <Providers>
      <Suspense fallback={<div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>}>
        <PropertyDetails />
      </Suspense>
    </Providers>
  );
}

