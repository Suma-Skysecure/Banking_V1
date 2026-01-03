/**
 * Login Credentials Configuration
 * 
 * Predefined credentials for testing and development
 * In production, these would be stored securely and validated via API
 */

export const LOGIN_CREDENTIALS = {
  // SRBM Role
  "SRBM@Kotakbank.com": {
    username: "SRBM@Kotakbank.com",
    password: "SRBM123",
    role: "SRBM",
    name: "SRBM User",
    email: "SRBM@Kotakbank.com"
  },

  // Business Role
  "Business@Kotakbank.com": {
    username: "Business@Kotakbank.com",
    password: "Business123",
    role: "Business",
    name: "Business User",
    email: "Business@Kotakbank.com"
  },

  // Site Measure Role
  "Sitemeasure@Kotakbank.com": {
    username: "Sitemeasure@Kotakbank.com",
    password: "Sitemeasure123",
    role: "Site measurement",
    name: "Site Measure User",
    email: "Sitemeasure@Kotakbank.com"
  },

  // Legal Due Role
  "Legaldue@Kotakbank.com": {
    username: "Legaldue@Kotakbank.com",
    password: "Legaldue123",
    role: "Legal due",
    name: "Legal Due User",
    email: "Legaldue@Kotakbank.com"
  },

  // IT Team Role
  "ITteam@Kotakbank.com": {
    username: "ITteam@Kotakbank.com",
    password: "ITteam123",
    role: "IT team",
    name: "IT Team User",
    email: "ITteam@Kotakbank.com"
  },

  // Agreement Execution Role
  "Agreementexe@Kotakbank.com": {
    username: "Agreementexe@Kotakbank.com",
    password: "Agreementexe123",
    role: "Agreement execution",
    name: "Agreement Execution User",
    email: "Agreementexe@Kotakbank.com"
  },

  // Project Execution Role
  "Projectexe@Kotakbank.com": {
    username: "Projectexe@Kotakbank.com",
    password: "Projectexe123",
    role: "Project execution",
    name: "Project Execution User",
    email: "Projectexe@Kotakbank.com"
  },

  // Vendor Role
  "Vendor@Kotakbank.com": {
    username: "Vendor@Kotakbank.com",
    password: "Vendor123",
    role: "Vendor",
    name: "Vendor User",
    email: "Vendor@Kotakbank.com"
  },

  // Account Role
  "Account@Kotakbank.com": {
    username: "Account@Kotakbank.com",
    password: "Account123",
    role: "Account",
    name: "Account User",
    email: "Account@Kotakbank.com"
  }
};

/**
 * Validate login credentials
 * @param {string} username - Username
 * @param {string} password - Password
 * @returns {object|null} - User data if valid, null otherwise
 */
export const validateCredentials = (username, password) => {
  // Try exact match first (case-sensitive for email)
  let userKey = username.trim();
  let creds = LOGIN_CREDENTIALS[userKey];
  
  // If not found, try lowercase
  if (!creds) {
    userKey = username.toLowerCase().trim();
    creds = LOGIN_CREDENTIALS[userKey];
  }
  
  if (creds && creds.password === password) {
    return {
      username: creds.username,
      role: creds.role,
      name: creds.name,
      email: creds.email
    };
  }
  
  return null;
};

/**
 * Get role from username (if credentials exist)
 * @param {string} username - Username
 * @returns {string|null} - Role if username exists, null otherwise
 */
export const getRoleFromUsername = (username) => {
  // Try exact match first (case-sensitive for email)
  let userKey = username.trim();
  let creds = LOGIN_CREDENTIALS[userKey];
  
  // If not found, try lowercase
  if (!creds) {
    userKey = username.toLowerCase().trim();
    creds = LOGIN_CREDENTIALS[userKey];
  }
  
  return creds ? creds.role : null;
};

