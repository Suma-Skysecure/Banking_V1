/**
 * Login Credentials Configuration
 * 
 * Predefined credentials for testing and development
 * In production, these would be stored securely and validated via API
 */

export const LOGIN_CREDENTIALS = {
  // Business/SRBM Role
  "srbm@kotakbank.com": {
    username: "srbm@kotakbank.com",
    password: "SRBM123",
    role: "Business/SRBM",
    name: "SRBM User",
    email: "srbm@kotakbank.com"
  },
  "SRBM@Kotakbank.com": {
    username: "SRBM@Kotakbank.com",
    password: "SRBM123",
    role: "Business/SRBM",
    name: "SRBM User",
    email: "SRBM@Kotakbank.com"
  },

  // Admin/Ops Role
  "admin@kotakbank.com": {
    username: "admin@kotakbank.com",
    password: "Admin123",
    role: "Admin/Ops",
    name: "Admin User",
    email: "admin@kotakbank.com"
  },
  "Admin@Kotakbank.com": {
    username: "Admin@Kotakbank.com",
    password: "Admin123",
    role: "Admin/Ops",
    name: "Admin User",
    email: "Admin@Kotakbank.com"
  },

  // Legal Team Role
  "legalteam@kotakbank.com": {
    username: "legalteam@kotakbank.com",
    password: "Legal123",
    role: "Legal Team",
    name: "Legal Team User",
    email: "legalteam@kotakbank.com"
  },
  "Legalteam@Kotakbank.com": {
    username: "Legalteam@Kotakbank.com",
    password: "Legal123",
    role: "Legal Team",
    name: "Legal Team User",
    email: "Legalteam@Kotakbank.com"
  },

  // IT Team Role
  "it@kotakbank.com": {
    username: "it@kotakbank.com",
    password: "ITteam123",
    role: "IT Team",
    name: "IT Team User",
    email: "it@kotakbank.com"
  },
  "IT@Kotakbank.com": {
    username: "IT@Kotakbank.com",
    password: "ITteam123",
    role: "IT Team",
    name: "IT Team User",
    email: "IT@Kotakbank.com"
  },

  // Accounts Role
  "account@kotakbank.com": {
    username: "account@kotakbank.com",
    password: "Account123",
    role: "Accounts",
    name: "Account User",
    email: "account@kotakbank.com"
  },
  "Account@Kotakbank.com": {
    username: "Account@Kotakbank.com",
    password: "Account123",
    role: "Accounts",
    name: "Account User",
    email: "Account@Kotakbank.com"
  },
  "brt@kotakbank.com": {
    username: "brt@kotakbank.com",
    password: "brt123",
    role: "brt",
    name: "brt User",
    email: "brt@kotakbank.com"
  },
  "BRT@Kotakbank.com": {
    username: "BRT@Kotakbank.com",
    password: "BRT123",
    role: "BRT",
    name: "BRT User",
    email: "BRT@Kotakbank.com"
  },
  // Project/Facilities Role
  "project@kotakbank.com": {
    username: "project@kotakbank.com",
    password: "Project123",
    role: "Project/Facilities",
    name: "Project User",
    email: "project@kotakbank.com"
  },
  "Project@Kotakbank.com": {
    username: "Project@Kotakbank.com",
    password: "Project123",
    role: "Project/Facilities",
    name: "Project User",
    email: "Project@Kotakbank.com"
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

