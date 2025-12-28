"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children, requiredPermission = null, page = null }) {
  const { user, canView, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    } else if (!loading && user && page && !canView(page)) {
      router.push("/dashboard");
    }
  }, [user, loading, page, canView, router]);

  if (loading) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh" 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (page && !canView(page)) {
    return (
      <div style={{ 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center", 
        height: "100vh",
        flexDirection: "column",
        gap: "16px"
      }}>
        <h2>Access Denied</h2>
        <p>You don't have permission to view this page.</p>
        <button onClick={() => router.push("/dashboard")}>Go to Dashboard</button>
      </div>
    );
  }

  return children;
}

