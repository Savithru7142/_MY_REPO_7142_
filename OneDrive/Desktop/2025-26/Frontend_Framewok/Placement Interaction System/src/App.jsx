import React, { useState, useEffect } from 'react';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { Layout } from './components/Layout';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { StudentDashboard } from './components/dashboards/StudentDashboard';
import { EmployerDashboard } from './components/dashboards/EmployerDashboard';
import { PlacementOfficerDashboard } from './components/dashboards/PlacementOfficerDashboard';
import { JobManagement } from './components/JobManagement';
import { ApplicationTracking } from './components/ApplicationTracking';
import { CandidatesManagement } from './components/CandidatesManagement';
import { CompanyProfile } from './components/CompanyProfile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Button } from './components/ui/button';
import { Label } from './components/ui/label';
import { useAuth } from './hooks/useAuth';

export default function App() {
  const { user, isLoading, error, login, signup, logout, clearError, isAuthenticated } = useAuth();
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [navigationHistory, setNavigationHistory] = useState(['dashboard']);
  const [authView, setAuthView] = useState('login');

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.altKey && event.key === 'ArrowLeft' && navigationHistory.length > 1) {
        event.preventDefault();
        setNavigationHistory(prev => {
          if (prev.length > 1) {
            const newHistory = [...prev];
            newHistory.pop();
            const previousSection = newHistory[newHistory.length - 1];
            setCurrentSection(previousSection);
            return newHistory;
          }
          return prev;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigationHistory]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    const handleSwitchToSignup = () => {
      setAuthView('signup');
      clearError();
    };

    const handleSwitchToLogin = () => {
      setAuthView('login');
      clearError();
    };

    if (authView === 'signup') {
      return (
        <SignupPage
          onSignup={signup}
          onSwitchToLogin={handleSwitchToLogin}
          isLoading={isLoading}
          error={error}
        />
      );
    }

    return (
      <LoginPage
        onLogin={login}
        onSwitchToSignup={handleSwitchToSignup}
        isLoading={isLoading}
        error={error}
      />
    );
  }

  const handleNavigation = (section) => {
    if (section !== currentSection) {
      setNavigationHistory(prev => [...prev, section]);
      setCurrentSection(section);
    }
  };

  const handleGoBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop();
      const previousSection = newHistory[newHistory.length - 1];
      setNavigationHistory(newHistory);
      setCurrentSection(previousSection);
    }
  };

  const canGoBack = navigationHistory.length > 1;

  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        switch (user.role) {
          case 'admin':
            return <AdminDashboard user={user} />;
          case 'student':
            return <StudentDashboard user={user} />;
          case 'employer':
            return <EmployerDashboard user={user} />;
          case 'placement-officer':
            return <PlacementOfficerDashboard user={user} />;
          default:
            return <div>Dashboard not found</div>;
        }

      case 'jobs':
        return <JobManagement userRole={user.role} />;

      case 'applications':
        return <ApplicationTracking userRole={user.role} />;

      case 'users':
        return (
          <div className="space-y-6">
            <h1>User Management</h1>
            <p className="text-muted-foreground">Manage system users, roles, and permissions.</p>
            <div className="text-center py-12 text-muted-foreground">
              User management interface coming soon...
            </div>
          </div>
        );

      case 'placements':
        return (
          <div className="space-y-6">
            <h1>Placement Records</h1>
            <p className="text-muted-foreground">Track and manage student placement records.</p>
            <div className="text-center py-12 text-muted-foreground">
              Placement records interface coming soon...
            </div>
          </div>
        );

      case 'reports':
        return (
          <div className="space-y-6">
            <h1>Reports & Analytics</h1>
            <p className="text-muted-foreground">Generate comprehensive reports and analytics.</p>
            <div className="text-center py-12 text-muted-foreground">
              Reports and analytics interface coming soon...
            </div>
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-6">
            <h1>System Settings</h1>
            <p className="text-muted-foreground">Configure system settings and preferences.</p>
            <div className="text-center py-12 text-muted-foreground">
              System settings interface coming soon...
            </div>
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <h1>My Profile</h1>
            <p className="text-muted-foreground">Manage your profile information and preferences.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your account details and contact information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Full Name</Label>
                    <p className="text-sm text-muted-foreground">{user.name}</p>
                  </div>
                  <div>
                    <Label>Email Address</Label>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <div>
                    <Label>Role</Label>
                    <Badge variant="secondary" className="capitalize">
                      {user.role.replace('-', ' ')}
                    </Badge>
                  </div>
                  {user.phone && (
                    <div>
                      <Label>Phone Number</Label>
                      <p className="text-sm text-muted-foreground">{user.phone}</p>
                    </div>
                  )}
                  {(user.department || user.company) && (
                    <div>
                      <Label>{user.role === 'employer' ? 'Company' : 'Department'}</Label>
                      <p className="text-sm text-muted-foreground">{user.department || user.company}</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Member Since</Label>
                    <p className="text-sm text-muted-foreground">{new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full">
                      Edit Profile
                    </Button>
                    <Button variant="outline" className="w-full">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full text-red-600 hover:text-red-700">
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case 'candidates':
        return <CandidatesManagement />;

      case 'company':
        return <CompanyProfile userRole={user.role} companyId={user.id} />;

      case 'students':
        return (
          <div className="space-y-6">
            <h1>Students</h1>
            <p className="text-muted-foreground">Manage student profiles and academic information.</p>
            <div className="text-center py-12 text-muted-foreground">
              Student management interface coming soon...
            </div>
          </div>
        );

      case 'employers':
        return (
          <div className="space-y-6">
            <h1>Employers</h1>
            <p className="text-muted-foreground">Manage employer partnerships and company profiles.</p>
            <div className="text-center py-12 text-muted-foreground">
              Employer management interface coming soon...
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-6">
            <h1>Page Not Found</h1>
            <p className="text-muted-foreground">The requested page could not be found.</p>
          </div>
        );
    }
  };

  return (
    <Layout
      currentRole={user.role}
      onNavigate={handleNavigation}
      currentSection={currentSection}
      user={user}
      onLogout={logout}
      onGoBack={handleGoBack}
      canGoBack={canGoBack}
      navigationHistory={navigationHistory}
    >
      {renderContent()}
    </Layout>
  );
}
