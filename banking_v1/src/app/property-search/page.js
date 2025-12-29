import PropertySearch from "@/components/PropertySearch";
import ProtectedRoute from "@/components/ProtectedRoute";
import Providers from "@/components/Providers";

export default function PropertySearchPage() {
  return (
    <Providers>
      <ProtectedRoute page="propertySearch">
        <PropertySearch />
      </ProtectedRoute>
    </Providers>
  );
}

