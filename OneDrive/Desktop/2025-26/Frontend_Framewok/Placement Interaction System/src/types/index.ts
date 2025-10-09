export type UserRole = 'admin' | 'student' | 'employer' | 'placement-officer';

// Re-export auth types for convenience
export type { AuthUser, LoginCredentials, SignupData, AuthState } from './auth';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
  company?: string;
  phone?: string;
  createdAt: Date;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'internship' | 'contract';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  skills: string[];
  deadline: Date;
  status: 'active' | 'closed' | 'draft';
  employerId: string;
  postedDate: Date;
  applicationsCount: number;
}

export interface Application {
  id: string;
  jobId: string;
  studentId: string;
  status: 'pending' | 'shortlisted' | 'interviewed' | 'selected' | 'rejected';
  appliedDate: Date;
  notes?: string;
  resume?: string;
  coverLetter?: string;
  interviewDate?: Date;
  feedback?: string;
}

export interface PlacementRecord {
  id: string;
  studentId: string;
  jobId: string;
  company: string;
  position: string;
  salary: number;
  startDate: Date;
  status: 'active' | 'completed' | 'terminated';
  duration?: number; // in months
}

export interface SystemStats {
  totalStudents: number;
  totalEmployers: number;
  totalJobs: number;
  totalApplications: number;
  totalPlacements: number;
  placementRate: number;
}