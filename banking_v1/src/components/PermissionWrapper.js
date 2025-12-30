"use client";

import { useAuth } from "@/contexts/AuthContext";

/**
 * PermissionWrapper Component
 * Conditionally renders children based on user permissions
 * 
 * @param {string} page - The page name to check permissions for
 * @param {string} action - The action to check (view, edit, approve, upload)
 * @param {ReactNode} children - Content to render if permission is granted
 * @param {ReactNode} fallback - Optional content to render if permission is denied
 */
export default function PermissionWrapper({ 
  page, 
  action = "view", 
  children, 
  fallback = null 
}) {
  const { hasPermission, canView, canEdit, canApprove, canUpload } = useAuth();

  let hasAccess = false;

  switch (action) {
    case "view":
      hasAccess = canView(page);
      break;
    case "edit":
      hasAccess = canEdit(page);
      break;
    case "approve":
      hasAccess = canApprove(page);
      break;
    case "upload":
      hasAccess = canUpload(page);
      break;
    default:
      hasAccess = hasPermission(page, action);
  }

  if (!hasAccess) {
    return fallback;
  }

  return children;
}

