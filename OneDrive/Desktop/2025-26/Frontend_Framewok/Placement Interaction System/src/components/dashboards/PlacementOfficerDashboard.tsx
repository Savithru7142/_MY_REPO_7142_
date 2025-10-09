import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { WelcomeCard } from '../WelcomeCard';
import { mockStats, mockPlacements, mockApplications, mockUsers, mockJobs } from '../../data/mockData';
import { AuthUser } from '../../types/auth';
import { GraduationCap, Building2, FileText, TrendingUp, Users, Calendar, CheckCircle } from 'lucide-react';

interface PlacementOfficerDashboardProps {
  user?: AuthUser;
}

export function PlacementOfficerDashboard({ user }: PlacementOfficerDashboardProps) {
  const stats = mockStats;
  const recentPlacements = mockPlacements.slice(0, 3);
  const pendingApplications = mockApplications.filter(app => app.status === 'pending').slice(0, 5);

  const monthlyPlacementData = [
    { month: 'Jan', placements: 12 },
    { month: 'Feb', placements: 15 },
    { month: 'Mar', placements: 18 },
    { month: 'Apr', placements: 22 },
    { month: 'May', placements: 20 },
    { month: 'Jun', placements: 25 },
  ];

  return (
    <div className="space-y-6">
      {user && <WelcomeCard user={user} />}
      
      <div>
        <h1>Placement Officer Dashboard</h1>
        <p className="text-muted-foreground">
          Track placement records, manage student-employer interactions, and generate reports.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Placements</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPlacements}</div>
            <p className="text-xs text-muted-foreground">Successful placements</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Placement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.placementRate}%</div>
            <p className="text-xs text-muted-foreground">Success rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Registered students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Partner Companies</CardTitle>
            <Building2 className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmployers}</div>
            <p className="text-xs text-muted-foreground">Registered employers</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Placements</CardTitle>
            <CardDescription>Latest successful student placements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPlacements.map((placement) => {
              const student = mockUsers.find(u => u.id === placement.studentId);
              return (
                <div key={placement.id} className="flex items-center gap-3 p-3 rounded-lg border">
                  <div className="p-2 rounded-full bg-green-100">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{student?.name}</h4>
                    <p className="text-sm text-muted-foreground">{placement.position}</p>
                    <p className="text-sm text-muted-foreground">{placement.company}</p>
                    <p className="text-xs text-muted-foreground">
                      Started {placement.startDate.toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{placement.salary.toLocaleString()}</p>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      {placement.status}
                    </Badge>
                  </div>
                </div>
              );
            })}
            <Button className="w-full" variant="outline">
              View All Placements
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Applications Requiring Attention</CardTitle>
            <CardDescription>Student applications that need follow-up</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingApplications.map((application) => {
              const student = mockUsers.find(u => u.id === application.studentId);
              const job = mockJobs.find(j => j.id === application.jobId);
              return (
                <div key={application.id} className="flex items-center gap-3 p-3 rounded-lg border">
                  <div className="p-2 rounded-full bg-yellow-100">
                    <Clock className="h-4 w-4 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{student?.name}</h4>
                    <p className="text-sm text-muted-foreground">{job?.title}</p>
                    <p className="text-sm text-muted-foreground">{job?.company}</p>
                    <p className="text-xs text-muted-foreground">
                      Applied {application.appliedDate.toLocaleDateString()}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Follow Up
                  </Button>
                </div>
              );
            })}
            <Button className="w-full" variant="outline">
              View All Applications
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Placement Trends</CardTitle>
            <CardDescription>Monthly placement statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyPlacementData.map((data, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="w-8 text-sm font-medium">{data.month}</span>
                  <div className="flex-1">
                    <Progress value={(data.placements / 30) * 100} className="h-2" />
                  </div>
                  <span className="text-sm font-medium">{data.placements}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common placement officer tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="h-20 flex-col">
                <FileText className="h-5 w-5 mb-2" />
                Generate Report
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Calendar className="h-5 w-5 mb-2" />
                Schedule Meeting
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Users className="h-5 w-5 mb-2" />
                Student Analytics
              </Button>
              <Button variant="outline" className="h-20 flex-col">
                <Building2 className="h-5 w-5 mb-2" />
                Employer Outreach
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Clock({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12,6 12,12 16,14"></polyline>
    </svg>
  );
}