# Role-Based Access Control (RBAC) Implementation

## Overview
This Property Management System implements comprehensive role-based access control with page-level and action-level permissions across all 10 pages.

## User Roles
1. **Business/SRBM** - Full access to approve and edit properties
2. **Admin/Ops** - Document upload and progress tracking
3. **Legal Team** - Legal workflow approval and review
4. **IT Team** - View-only access for infrastructure aspects
5. **Accounts** - View-only access for financial aspects
6. **Project/Facilities** - Edit and manage execution tasks

## Page Access Matrix

### Page 1: Login Page
- **Access**: All Users
- **Permissions**: All roles can log in using their credentials
- **Content**: No content is editable (authentication only)

### Page 2: Dashboard Overview
- **Business/SRBM**: View all properties, approve properties, view progress, initiate property search
- **Admin/Ops**: View all activities, track progress, upload documents (no editing of property details)
- **Legal Team**: View progress and approval statuses (cannot modify properties, can track legal documentation)
- **IT Team**: View infrastructure-related items if relevant
- **Accounts**: View financial aspects related to each property (payments, approvals)
- **Project/Facilities**: View active projects and execution statuses

**Actions:**
- Business/SRBM: Can initiate actions like property search and approval
- Admin/Ops: Can upload documents and track progress
- Legal Team: Can see property status but cannot interact with property details directly

### Page 3: Property Search Page
- **Business/SRBM**: Edit search criteria, initiate property listing for approval
- **Admin/Ops**: View property listings and upload documents (cannot initiate approvals or modify listings)
- **Legal Team**: View property listings to track legal clearance (cannot initiate or edit)
- **IT Team**: View only if relevant to property infrastructure
- **Accounts**: View property costs and financials (cannot initiate or approve)
- **Project/Facilities**: View relevant properties linked to execution phase

**Actions:**
- Business/SRBM: Can filter properties, initiate approval for business review
- Admin/Ops: Can upload property-related documents and track status

### Page 4: Property Details Page
- **Business/SRBM**: Edit and approve property details (location, cost, vendor info)
- **Admin/Ops**: View property details and upload relevant documents (cannot approve or edit property specifics)
- **Legal Team**: View property details related to legal requirements (cannot edit property details)
- **IT Team**: View property details for infrastructure aspects
- **Accounts**: View cost-related details and ensure alignment with financial standards
- **Project/Facilities**: View the property in context with project execution

**Actions:**
- Business/SRBM: Full access to edit and approve properties
- Admin/Ops: Can upload documents related to the property (e.g., legal, site measurements)
- Legal Team: Can review property details but cannot edit

### Page 5: Business Approval Page
- **Business/SRBM**: Edit business approval details and approve or reject properties
- **Admin/Ops**: View approval status and upload related documents (if needed)
- **Legal Team**: View for legal compliance (cannot approve the property)
- **IT Team**: View if any IT-related approvals or infrastructure is necessary
- **Accounts**: View financial details of the property in relation to approval
- **Project/Facilities**: View for execution-related impact once approval is received

**Actions:**
- Business/SRBM: Can approve or reject properties, submit for further legal or operational processes
- Admin/Ops: Can track approval progress but cannot approve or modify

### Page 6: LOI Signing Page (Legal Workflow)
- **Business/SRBM**: View LOI status and initiate the process
- **Admin/Ops**: View LOI status and upload necessary documents (cannot edit or sign LOI)
- **Legal Team**: View and approve the LOI once property details are reviewed
- **IT Team**: View LOI-related infrastructure needs (e.g., data security)
- **Accounts**: View financial components of LOI (cannot approve or sign)
- **Project/Facilities**: View LOI status if relevant to site execution

**Actions:**
- Business/SRBM: Can initiate the LOI signing process
- Admin/Ops: Can upload documents for legal review
- Legal Team: Can approve and sign the LOI

### Page 7: Post-LOI Activities Page
- **Business/SRBM**: View all activities and ensure process moves forward (cannot directly edit details)
- **Admin/Ops**: Edit and upload documents, track and monitor activities
- **Legal Team**: View for legal compliance and due diligence; can approve items like stamp duty
- **IT Team**: View infrastructure details (e.g., site measurement or IT setups) (cannot edit other tasks)
- **Accounts**: View payments and approvals related to stamp duty and vendor payments
- **Project/Facilities**: Edit tasks related to vendor creation, site measurement, and term sheet approval

**Actions:**
- Admin/Ops: Can upload documents and track activity completion
- Legal Team: Can approve actions like stamp duty or vendor agreements
- Project/Facilities: Can edit and track site measurement, vendor details, and approvals

### Page 8: Agreement Execution Page
- **Business/SRBM**: View agreement, approve execution, and manage signing process
- **Admin/Ops**: View and upload relevant documents (cannot approve final agreement)
- **Legal Team**: View agreement for legal verification and approve
- **IT Team**: View to ensure infrastructure and data security requirements are met
- **Accounts**: View to verify cost-related aspects
- **Project/Facilities**: View for execution tracking, especially post-execution

**Actions:**
- Business/SRBM: Can approve the agreement
- Legal Team: Can verify final legal aspects
- Admin/Ops: Can upload documents related to the agreement

### Page 9: Agreement Registration Page
- **Business/SRBM**: View agreement registration status, initiate final steps
- **Admin/Ops**: View for progress tracking, upload final documents for registration
- **Legal Team**: View agreement registration (cannot edit details)
- **IT Team**: View if infrastructure setup needs to be confirmed
- **Accounts**: View for financials, ensuring alignment with financial procedures
- **Project/Facilities**: View for execution and project-related updates

**Actions:**
- Admin/Ops: Can upload final documents for registration
- Business/SRBM: Can approve final registration

### Page 10: Project Execution Page
- **Business/SRBM**: View overall project execution (cannot make changes)
- **Admin/Ops**: View and track project execution; can upload documents related to project progress
- **Legal Team**: View to ensure all legal aspects are complied with during project execution
- **IT Team**: View and verify if any IT setups are in place
- **Accounts**: View for tracking payment and financial tasks
- **Project/Facilities**: Edit and manage tasks related to execution (e.g., material delivery, fit-out vendor)

**Actions:**
- Project/Facilities: Can update progress and tasks
- Admin/Ops: Can upload documents related to site execution

## Implementation Status

✅ **Completed:**
- AuthContext with role-based permissions
- ProtectedRoute component for page-level access
- PermissionWrapper component for action-level access
- All page routes protected with ProtectedRoute
- TwoFactorAuth integrated with AuthContext

🔄 **Next Steps:**
- Apply PermissionWrapper to action buttons across all components
- Make form inputs conditionally editable based on roles
- Add upload buttons with permission checks
- Update Sidebar to show user role and logout functionality

## Usage Examples

### Using PermissionWrapper
```jsx
import PermissionWrapper from "@/components/PermissionWrapper";

<PermissionWrapper page="propertySearch" action="approve">
  <button onClick={handleAction}>Initiate Approval</button>
</PermissionWrapper>
```

### Using useAuth Hook
```jsx
import { useAuth } from "@/contexts/AuthContext";

const { canEdit, canApprove, canUpload } = useAuth();

<input disabled={!canEdit("propertyDetails")} />
```

