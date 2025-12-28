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

// Role-based permissions configuration
const getRolePermissions = (role) => {
  const permissions = {
    "Business/SRBM": {
      dashboard: { view: true, edit: false, approve: true, upload: false },
      propertySearch: { view: true, edit: true, approve: true, upload: false },
      propertyDetails: { view: true, edit: true, approve: true, upload: false },
      businessApproval: { view: true, edit: true, approve: true, upload: false },
      legalWorkflow: { view: true, edit: false, approve: false, upload: false },
      postLOIActivities: { view: true, edit: false, approve: false, upload: false },
      agreementExecution: { view: true, edit: false, approve: true, upload: false },
      agreementRegistration: { view: true, edit: false, approve: true, upload: false },
      projectExecution: { view: true, edit: false, approve: false, upload: false },
    },
    "Admin/Ops": {
      dashboard: { view: true, edit: false, approve: false, upload: true },
      propertySearch: { view: true, edit: false, approve: false, upload: true },
      propertyDetails: { view: true, edit: false, approve: false, upload: true },
      businessApproval: { view: true, edit: false, approve: false, upload: true },
      legalWorkflow: { view: true, edit: false, approve: false, upload: true },
      postLOIActivities: { view: true, edit: true, approve: false, upload: true },
      agreementExecution: { view: true, edit: false, approve: false, upload: true },
      agreementRegistration: { view: true, edit: false, approve: false, upload: true },
      projectExecution: { view: true, edit: false, approve: false, upload: true },
    },
    "Legal Team": {
      dashboard: { view: true, edit: false, approve: false, upload: false },
      propertySearch: { view: true, edit: false, approve: false, upload: false },
      propertyDetails: { view: true, edit: false, approve: false, upload: false },
      businessApproval: { view: true, edit: false, approve: false, upload: false },
      legalWorkflow: { view: true, edit: false, approve: true, upload: false },
      postLOIActivities: { view: true, edit: false, approve: true, upload: false },
      agreementExecution: { view: true, edit: false, approve: true, upload: false },
      agreementRegistration: { view: true, edit: false, approve: false, upload: false },
      projectExecution: { view: true, edit: false, approve: false, upload: false },
    },
    "IT Team": {
      dashboard: { view: true, edit: false, approve: false, upload: false },
      propertySearch: { view: true, edit: false, approve: false, upload: false },
      propertyDetails: { view: true, edit: false, approve: false, upload: false },
      businessApproval: { view: true, edit: false, approve: false, upload: false },
      legalWorkflow: { view: true, edit: false, approve: false, upload: false },
      postLOIActivities: { view: true, edit: false, approve: false, upload: false },
      agreementExecution: { view: true, edit: false, approve: false, upload: false },
      agreementRegistration: { view: true, edit: false, approve: false, upload: false },
      projectExecution: { view: true, edit: false, approve: false, upload: false },
    },
    "Accounts": {
      dashboard: { view: true, edit: false, approve: false, upload: false },
      propertySearch: { view: true, edit: false, approve: false, upload: false },
      propertyDetails: { view: true, edit: false, approve: false, upload: false },
      businessApproval: { view: true, edit: false, approve: false, upload: false },
      legalWorkflow: { view: true, edit: false, approve: false, upload: false },
      postLOIActivities: { view: true, edit: false, approve: false, upload: false },
      agreementExecution: { view: true, edit: false, approve: false, upload: false },
      agreementRegistration: { view: true, edit: false, approve: false, upload: false },
      projectExecution: { view: true, edit: false, approve: false, upload: false },
    },
    "Project/Facilities": {
      dashboard: { view: true, edit: false, approve: false, upload: false },
      propertySearch: { view: true, edit: false, approve: false, upload: false },
      propertyDetails: { view: true, edit: false, approve: false, upload: false },
      businessApproval: { view: true, edit: false, approve: false, upload: false },
      legalWorkflow: { view: true, edit: false, approve: false, upload: false },
      postLOIActivities: { view: true, edit: true, approve: true, upload: false },
      agreementExecution: { view: true, edit: false, approve: false, upload: false },
      agreementRegistration: { view: true, edit: false, approve: false, upload: false },
      projectExecution: { view: true, edit: true, approve: false, upload: false },
    },
  };

  return permissions[role] || {};
};

