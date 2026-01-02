/**
 * Role to Stage Mapping Configuration
 * 
 * This file maps user roles to the stages/workflows they should see in the dashboard.
 * Each role will only see branches in their assigned stages.
 */

export const ROLE_STAGE_MAPPING = {
  // Business role - sees only Business Approval stage
  "Business": ["Business Approval"],
  
  // SRBM role - sees only Property Search stage (initiates property search, not approval)
  "SRBM": ["Property Search"],
  
  // Legal due role - sees only Legal Workflow stage
  "Legal due": ["Legal Workflow"],
  
  // Project execution role - sees only Project Execution stage
  "Project execution": ["Project Execution"],
  
  // Site measurement role - sees stages related to site measurement work
  "Site measurement": ["Layout Design", "TSA (Stamp duty)", "TSA (Security Deposit)"],
  
  // Agreement execution role - sees Agreement Execution related stages
  "Agreement execution": ["Agreement Execution", "Agreement Registration"],
  
  // IT team role - sees multiple stages for infrastructure aspects
  "IT team": ["Property Search", "Business Approval", "Legal Workflow", "Project Execution", "Agreement Execution"],
};

/**
 * Get allowed stages for a specific role
 * @param {string} role - User role
 * @returns {string[]} - Array of allowed stage names
 */
export const getAllowedStages = (role) => {
  if (!role) return [];
  return ROLE_STAGE_MAPPING[role] || [];
};

/**
 * Check if a stage is allowed for a role
 * @param {string} role - User role
 * @param {string} stage - Stage name to check
 * @returns {boolean} - True if stage is allowed for the role
 */
export const isStageAllowed = (role, stage) => {
  if (!role) return false;
  const allowedStages = getAllowedStages(role);
  return allowedStages.includes(stage);
};

/**
 * Filter branches based on user role
 * Optimized with early returns and efficient filtering
 * @param {Array} branches - Array of branch objects
 * @param {string} role - User role
 * @returns {Array} - Filtered array of branches
 */
export const filterBranchesByRole = (branches, role) => {
  // Early return if no role or no branches
  if (!role || !branches || branches.length === 0) {
    return branches || [];
  }
  
  const allowedStages = getAllowedStages(role);
  
  // If no mapping found for role, return empty array (don't show all)
  if (allowedStages.length === 0) {
    return [];
  }
  
  // Optimized filtering using Set for O(1) lookup
  const allowedStagesSet = new Set(allowedStages);
  return branches.filter(branch => branch?.stage && allowedStagesSet.has(branch.stage));
};

