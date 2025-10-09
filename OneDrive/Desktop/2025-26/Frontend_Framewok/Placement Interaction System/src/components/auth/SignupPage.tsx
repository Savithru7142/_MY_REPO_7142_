import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Alert, AlertDescription } from '../ui/alert';
import { SignupData } from '../../types/auth';
import { UserRole } from '../../types';
import { Eye, EyeOff, GraduationCap, AlertCircle, Shield, Building2, UserCheck, ArrowLeft } from 'lucide-react';

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
  return nameParts[0] || '';
};

// Utility function to determine role from email domain
const deriveRoleFromEmail = (email: string): UserRole => {
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

interface SignupPageProps {
  onSignup: (data: SignupData) => Promise<void>;
  onSwitchToLogin: () => void;
  isLoading: boolean;
  error: string | null;
}

const roleOptions = [
  {
    value: 'student' as UserRole,
    label: 'Student',
    description: 'I am a student looking for job opportunities',
    icon: GraduationCap,
    color: 'text-blue-600',
  },
  {
    value: 'employer' as UserRole,
    label: 'Employer',
    description: 'I am an employer looking to hire students',
    icon: Building2,
    color: 'text-green-600',
  },
  {
    value: 'placement-officer' as UserRole,
    label: 'Placement Officer',
    description: 'I manage student placements at my institution',
    icon: UserCheck,
    color: 'text-purple-600',
  },
  {
    value: 'admin' as UserRole,
    label: 'Administrator',
    description: 'I am a system administrator',
    icon: Shield,
    color: 'text-red-600',
  },
];

export function SignupPage({ onSignup, onSwitchToLogin, isLoading, error }: SignupPageProps) {
  const [formData, setFormData] = useState<SignupData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    department: '',
    company: '',
    phone: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [nameAutoFilled, setNameAutoFilled] = useState(false);

  // Auto-fill name and role based on email
  useEffect(() => {
    if (formData.email && !nameAutoFilled) {
      const derivedName = deriveNameFromEmail(formData.email);
      const derivedRole = deriveRoleFromEmail(formData.email);
      
      if (derivedName) {
        setFormData(prev => ({
          ...prev,
          name: derivedName,
          role: derivedRole,
        }));
        setNameAutoFilled(true);
      }
    } else if (!formData.email) {
      setNameAutoFilled(false);
    }
  }, [formData.email, nameAutoFilled]);

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'Full name is required';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.role) {
      errors.role = 'Please select your role';
    }

    // Role-specific validations
    if (formData.role === 'student' && !formData.department) {
      errors.department = 'Department is required for students';
    }

    if (formData.role === 'employer' && !formData.company) {
      errors.company = 'Company name is required for employers';
    }

    if ((formData.role === 'placement-officer' || formData.role === 'admin') && !formData.department) {
      errors.department = 'Department is required';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      await onSignup(formData);
    } catch (err) {
      // Error handling is done in parent component
    }
  };

  const handleInputChange = (field: keyof SignupData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // If user manually edits the name field, stop auto-filling
    if (field === 'name') {
      setNameAutoFilled(true);
    }
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleRoleChange = (role: UserRole) => {
    setFormData(prev => ({
      ...prev,
      role,
      // Clear role-specific fields when role changes
      department: '',
      company: '',
    }));
    // Clear role-related validation errors
    setValidationErrors(prev => ({
      ...prev,
      role: '',
      department: '',
      company: '',
    }));
  };

  const selectedRole = roleOptions.find(role => role.value === formData.role);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={onSwitchToLogin}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Sign In
            </Button>
            <div></div>
          </div>
          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-primary">
              <GraduationCap className="h-6 w-6 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-muted-foreground">
            Join the placement portal to get started
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Fill in your details to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={validationErrors.email ? 'border-destructive' : ''}
                />
                {validationErrors.email && (
                  <p className="text-sm text-destructive">{validationErrors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={formData.email ? "Auto-filled from email (editable)" : "Enter your full name"}
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={validationErrors.name ? 'border-destructive' : ''}
                />
                {formData.name && formData.email && !validationErrors.name && (
                  <p className="text-xs text-muted-foreground">✓ Name auto-filled from email address</p>
                )}
                {validationErrors.name && (
                  <p className="text-sm text-destructive">{validationErrors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">I am a...</Label>
                <Select value={formData.role} onValueChange={handleRoleChange}>
                  <SelectTrigger className={validationErrors.role ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roleOptions.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        <div className="flex items-center gap-2">
                          <role.icon className={`h-4 w-4 ${role.color}`} />
                          <div>
                            <div className="font-medium">{role.label}</div>
                            <div className="text-xs text-muted-foreground">{role.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.email && !validationErrors.role && (
                  <p className="text-xs text-muted-foreground">✓ Role auto-detected from email domain</p>
                )}
                {validationErrors.role && (
                  <p className="text-sm text-destructive">{validationErrors.role}</p>
                )}
              </div>

              {/* Role-specific fields */}
              {(formData.role === 'student' || formData.role === 'placement-officer' || formData.role === 'admin') && (
                <div className="space-y-2">
                  <Label htmlFor="department">
                    {formData.role === 'student' ? 'Department/Major' : 'Department'}
                  </Label>
                  <Input
                    id="department"
                    type="text"
                    placeholder={
                      formData.role === 'student' 
                        ? 'e.g., Computer Science, Business Administration'
                        : 'e.g., Career Services, Engineering'
                    }
                    value={formData.department}
                    onChange={(e) => handleInputChange('department', e.target.value)}
                    className={validationErrors.department ? 'border-destructive' : ''}
                  />
                  {validationErrors.department && (
                    <p className="text-sm text-destructive">{validationErrors.department}</p>
                  )}
                </div>
              )}

              {formData.role === 'employer' && (
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    type="text"
                    placeholder="Enter your company name"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className={validationErrors.company ? 'border-destructive' : ''}
                  />
                  {validationErrors.company && (
                    <p className="text-sm text-destructive">{validationErrors.company}</p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={validationErrors.password ? 'border-destructive' : ''}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {validationErrors.password && (
                  <p className="text-sm text-destructive">{validationErrors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className={validationErrors.confirmPassword ? 'border-destructive' : ''}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {validationErrors.confirmPassword && (
                  <p className="text-sm text-destructive">{validationErrors.confirmPassword}</p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>
        </Card>

        {selectedRole && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-muted`}>
                  <selectedRole.icon className={`h-4 w-4 ${selectedRole.color}`} />
                </div>
                <div>
                  <h4 className="font-medium">{selectedRole.label}</h4>
                  <p className="text-sm text-muted-foreground">{selectedRole.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}