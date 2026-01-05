"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem("pms_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("pms_user");
      }
    }
    setLoading(false);
  }, []);

  const login = (username, password, role) => {
    const userData = {
      username,
      role,
      email: username.includes("@") ? username : `${username}@pms.com`,
      name: username,
    };
    
    setUser(userData);
    localStorage.setItem("pms_user", JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pms_user");
    router.push("/");
  };

  const hasPermission = (page, action) => {
    if (!user) return false;
    
    const permissions = getRolePermissions(user.role);
    return permissions[page]?.[action] || false;
  };

  const canView = (page) => {
    if (!user) return false;
    const permissions = getRolePermissions(user.role);
    return permissions[page]?.view || false;
  };

  const canEdit = (page) => {
    if (!user) return false;
    const permissions = getRolePermissions(user.role);
    return permissions[page]?.edit || false;
  };

  const canApprove = (page) => {
    if (!user) return false;
    const permissions = getRolePermissions(user.role);
    return permissions[page]?.approve || false;
  };

  const canUpload = (page) => {
    if (!user) return false;
    const permissions = getRolePermissions(user.role);
    return permissions[page]?.upload || false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        hasPermission,
        canView,
        canEdit,
        canApprove,
        canUpload,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Role-based permissions configuration - All permissions enabled for all roles
const getRolePermissions = (role) => {
  // All pages with all permissions enabled for everyone
  const allPermissions = {
    view: true,
    edit: true,
    approve: true,
    upload: true,
    initiate: true,
  };

  const permissions = {
    dashboard: allPermissions,
    propertySearch: allPermissions,
    propertyDetails: allPermissions,
    businessApproval: allPermissions,
    legalWorkflow: allPermissions,
    postLOIActivities: allPermissions,
    agreementExecution: allPermissions,
    agreementRegistration: allPermissions,
    projectExecution: allPermissions,
    // IT Assessment pages - only for IT role
    itAssessment: role === "IT team" ? allPermissions : { view: false, edit: false, approve: false, upload: false, initiate: false },
  };

  return permissions;
};

