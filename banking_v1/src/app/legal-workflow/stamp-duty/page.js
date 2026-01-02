import StampDutyView from "@/components/StampDutyView";
import Providers from "@/components/Providers";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function StampDutyViewPage() {
  return (
    <Providers>
      <ProtectedRoute page="legalWorkflow">
        <StampDutyView />
      </ProtectedRoute>
    </Providers>
  );
}