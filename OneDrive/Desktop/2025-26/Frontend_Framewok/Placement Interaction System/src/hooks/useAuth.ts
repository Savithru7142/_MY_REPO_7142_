import { useState, useEffect } from 'react';
import { AuthUser, LoginCredentials, SignupData, AuthState } from '../types/auth';

const STORAGE_KEY = 'placement_portal_auth';

// Utility function to derive name from email address
const deriveNameFromEmail = (email: string): string => {
  const localPart = email.split('@')[0];
  
  // Handle common patterns like "first.last", "firstname.lastname", "first_last"
  const nameParts = localPart
    .split(/[._-]/)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .filter(part => part.length > 0);
  
  // If we have multiple parts, join them with spaces
  if (nameParts.length > 1) {
    return nameParts.join(' ');
  }
  
  // If single part, just capitalize it
  return nameParts[0] || 'User';
};

// Utility function to determine role from email domain
const deriveRoleFromEmail = (email: string): 'admin' | 'student' | 'employer' | 'placement-officer' => {
  const domain = email.split('@')[1]?.toLowerCase() || '';
  
  // Admin patterns
  if (email.toLowerCase().includes('admin') || domain.includes('admin')) {
    return 'admin';
  }
  
  // Placement officer patterns
  if (email.toLowerCase().includes('placement') || 
      email.toLowerCase().includes('officer') || 
      email.toLowerCase().includes('career')) {
    return 'placement-officer';
  }
  
  // Student patterns (educational domains)
  if (domain.includes('student') || 
      domain.includes('.edu') || 
      domain.includes('university') || 
      domain.includes('college')) {
    return 'student';
  }
  
  // Default to employer for business domains
  return 'employer';
};

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedAuth = localStorage.getItem(STORAGE_KEY);
        if (storedAuth) {
          const userData = JSON.parse(storedAuth);
          // Convert date strings back to Date objects
          userData.createdAt = new Date(userData.createdAt);
          setAuthState({
            user: userData,
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState(prev => ({ ...prev, isLoading: false }));
        }
      } catch (error) {
        console.error('Error loading user from storage:', error);
        localStorage.removeItem(STORAGE_KEY);
        setAuthState(prev => ({ ...prev, isLoading: false }));
      }
    };

    loadUser();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Basic validation - in a real app, this would authenticate against a backend
      if (!credentials.email || !credentials.password) {
        throw new Error('Please enter both email and password');
      }

      if (credentials.password.length < 6) {
        throw new Error('Invalid credentials');
      }

      // Create user dynamically from email
      const name = deriveNameFromEmail(credentials.email);
      const role = deriveRoleFromEmail(credentials.email);
      
      // Derive additional fields based on role and email
      let department: string | undefined;
      let company: string | undefined;
      
      if (role === 'student' || role === 'placement-officer' || role === 'admin') {
        // Extract department from email domain or use default
        const domain = credentials.email.split('@')[1];
        if (domain?.includes('cs') || domain?.includes('computer')) {
          department = 'Computer Science';
        } else if (domain?.includes('eng')) {
          department = 'Engineering';
        } else if (role === 'placement-officer') {
          department = 'Career Services';
        } else {
          department = 'General';
        }
      } else if (role === 'employer') {
        // Map common Indian company domains to full names
        const domain = credentials.email.split('@')[1]?.toLowerCase() || '';
        if (domain.includes('infosys')) {
          company = 'Infosys Limited';
        } else if (domain.includes('tcs')) {
          company = 'Tata Consultancy Services';
        } else if (domain.includes('wipro')) {
          company = 'Wipro Technologies';
        } else if (domain.includes('hcl')) {
          company = 'HCL Technologies';
        } else if (domain.includes('tech') || domain.includes('mahindra')) {
          company = 'Tech Mahindra';
        } else {
          // Generic company name from domain
          const companyName = domain.split('.')[0];
          company = companyName.charAt(0).toUpperCase() + companyName.slice(1) + ' Technologies';
        }
      }

      const authUser: AuthUser = {
        id: Date.now().toString(),
        name,
        email: credentials.email,
        role,
        department,
        company,
        createdAt: new Date(),
      };

      // Store in localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));

      setAuthState({
        user: authUser,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  const signup = async (signupData: SignupData): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Basic validation
      if (!signupData.name || !signupData.email || !signupData.password) {
        throw new Error('Please fill in all required fields');
      }

      if (signupData.password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }

      // Create new user
      const newUser: AuthUser = {
        id: Date.now().toString(),
        name: signupData.name,
        email: signupData.email,
        role: signupData.role,
        department: signupData.department,
        company: signupData.company,
        phone: signupData.phone,
        createdAt: new Date(),
      };

      // Store in localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));

      setAuthState({
        user: newUser,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Signup failed';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAuthState({
      user: null,
      isLoading: false,
      error: null,
    });
  };

  const clearError = () => {
    setAuthState(prev => ({ ...prev, error: null }));
  };

  return {
    user: authState.user,
    isLoading: authState.isLoading,
    error: authState.error,
    login,
    signup,
    logout,
    clearError,
    isAuthenticated: !!authState.user,
  };
}