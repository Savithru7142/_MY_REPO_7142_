import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { WelcomeCard } from '../WelcomeCard';
import { mockStats } from '../../data/mockData';
import { AuthUser } from '../../types/auth';
import { Users, Briefcase, FileText, TrendingUp, Building2, GraduationCap } from 'lucide-react';

interface AdminDashboardProps {
  user?: AuthUser;
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const stats = mockStats;

  const statCards = [
    {
      title: 'Total Students',
      value: stats.totalStudents,
      icon: GraduationCap,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Employers',
      value: stats.totalEmployers,
      icon: Building2,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Active Jobs',
      value: stats.totalJobs,
      icon: Briefcase,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Total Applications',
      value: stats.totalApplications,
      icon: FileText,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Successful Placements',
      value: stats.totalPlacements,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
  ];

  return (
    <div className="space-y-6">
      {user && <WelcomeCard user={user} />}
      
      <div>
        <h1>Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage and monitor the placement system
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {statCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Placement Rate</CardTitle>
            <CardDescription>
              Overall placement success rate for students
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Placement Rate</span>
              <span className="font-medium">{stats.placementRate}%</span>
            </div>
            <Progress value={stats.placementRate} className="h-2" />
            <div className="text-sm text-muted-foreground">
              {stats.totalPlacements} out of {Math.round(stats.totalPlacements / (stats.placementRate / 100))} students placed
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>
              Current system health and activity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>System Status</span>
              <Badge variant="default" className="bg-green-500">Online</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Active Sessions</span>
              <span className="font-medium">47</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Database Status</span>
              <Badge variant="default" className="bg-green-500">Healthy</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Last Backup</span>
              <span className="text-sm text-muted-foreground">2 hours ago</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest system activities and notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New employer registration</p>
                <p className="text-xs text-muted-foreground">TechStart Inc. joined the platform</p>
              </div>
              <span className="text-xs text-muted-foreground">5 min ago</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Job posting approved</p>
                <p className="text-xs text-muted-foreground">Software Engineer position at DataCorp</p>
              </div>
              <span className="text-xs text-muted-foreground">15 min ago</span>
            </div>
            
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="h-2 w-2 rounded-full bg-purple-500"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Placement confirmed</p>
                <p className="text-xs text-muted-foreground">Student placed at TechCorp Inc.</p>
              </div>
              <span className="text-xs text-muted-foreground">1 hour ago</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}