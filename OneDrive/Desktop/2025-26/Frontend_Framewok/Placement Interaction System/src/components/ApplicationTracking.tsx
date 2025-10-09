import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { mockApplications, mockJobs, mockUsers } from '../data/mockData';
import { Application, UserRole } from '../types';
import { Eye, Calendar, MessageSquare, CheckCircle, XCircle, Clock, FileText } from 'lucide-react';

interface ApplicationTrackingProps {
  userRole: UserRole;
}

export function ApplicationTracking({ userRole }: ApplicationTrackingProps) {
  const [applications, setApplications] = useState<Application[]>(mockApplications);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

  const filteredApplications = applications.filter(app => {
    const job = mockJobs.find(j => j.id === app.jobId);
    const student = mockUsers.find(u => u.id === app.studentId);
    
    const matchesSearch = 
      job?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job?.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || app.status === filterStatus;
    
    // Filter based on user role
    if (userRole === 'student') {
      return matchesSearch && matchesStatus && app.studentId === '2'; // Current student
    } else if (userRole === 'employer') {
      const employerJobs = mockJobs.filter(job => job.employerId === '3');
      return matchesSearch && matchesStatus && employerJobs.some(job => job.id === app.jobId);
    }
    
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'shortlisted': return 'bg-blue-500';
      case 'interviewed': return 'bg-purple-500';
      case 'selected': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'shortlisted': return <Eye className="h-4 w-4" />;
      case 'interviewed': return <MessageSquare className="h-4 w-4" />;
      case 'selected': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const updateApplicationStatus = (applicationId: string, newStatus: string, notes?: string) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === applicationId 
          ? { ...app, status: newStatus as any, notes: notes || app.notes }
          : app
      )
    );
    setIsUpdateDialogOpen(false);
    setSelectedApplication(null);
  };

  const ApplicationDetailsDialog = () => (
    <Dialog open={!!selectedApplication} onOpenChange={() => setSelectedApplication(null)}>
      {selectedApplication && (
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Application Details</DialogTitle>
            <DialogDescription>
              {mockJobs.find(j => j.id === selectedApplication.jobId)?.title} at{' '}
              {mockJobs.find(j => j.id === selectedApplication.jobId)?.company}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Applicant</h4>
                <p className="text-muted-foreground">
                  {mockUsers.find(u => u.id === selectedApplication.studentId)?.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {mockUsers.find(u => u.id === selectedApplication.studentId)?.email}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Status</h4>
                <Badge 
                  variant="secondary" 
                  className={`text-white ${getStatusColor(selectedApplication.status)}`}
                >
                  <span className="flex items-center gap-1">
                    {getStatusIcon(selectedApplication.status)}
                    {selectedApplication.status}
                  </span>
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Applied Date</h4>
                <p className="text-muted-foreground">
                  {selectedApplication.appliedDate.toLocaleDateString()}
                </p>
              </div>
              {selectedApplication.interviewDate && (
                <div>
                  <h4 className="font-medium mb-2">Interview Date</h4>
                  <p className="text-muted-foreground">
                    {selectedApplication.interviewDate.toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
            
            {selectedApplication.notes && (
              <div>
                <h4 className="font-medium mb-2">Notes</h4>
                <p className="text-muted-foreground">{selectedApplication.notes}</p>
              </div>
            )}
            
            {selectedApplication.feedback && (
              <div>
                <h4 className="font-medium mb-2">Feedback</h4>
                <p className="text-muted-foreground">{selectedApplication.feedback}</p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            {(userRole === 'employer' || userRole === 'placement-officer') && (
              <Button onClick={() => setIsUpdateDialogOpen(true)}>
                Update Status
              </Button>
            )}
            <Button variant="outline" onClick={() => setSelectedApplication(null)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );

  const UpdateStatusDialog = () => (
    <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Application Status</DialogTitle>
          <DialogDescription>
            Change the status of this application and add notes if needed.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select defaultValue={selectedApplication?.status}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="shortlisted">Shortlisted</SelectItem>
                <SelectItem value="interviewed">Interviewed</SelectItem>
                <SelectItem value="selected">Selected</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="notes">Notes (optional)</Label>
            <Textarea 
              id="notes" 
              placeholder="Add any notes about this application..."
              defaultValue={selectedApplication?.notes}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => updateApplicationStatus(selectedApplication?.id || '', 'shortlisted')}>
            Update Status
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  const statusStats = {
    total: filteredApplications.length,
    pending: filteredApplications.filter(app => app.status === 'pending').length,
    shortlisted: filteredApplications.filter(app => app.status === 'shortlisted').length,
    interviewed: filteredApplications.filter(app => app.status === 'interviewed').length,
    selected: filteredApplications.filter(app => app.status === 'selected').length,
    rejected: filteredApplications.filter(app => app.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1>
          {userRole === 'student' ? 'My Applications' : 
           userRole === 'employer' ? 'Candidate Applications' : 
           'Application Management'}
        </h1>
        <p className="text-muted-foreground">
          {userRole === 'student' ? 'Track the status of your job applications' :
           userRole === 'employer' ? 'Review and manage candidate applications' :
           'Monitor all applications across the platform'}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusStats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-1">
              <Clock className="h-3 w-3 text-yellow-500" />
              Pending
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusStats.pending}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-1">
              <Eye className="h-3 w-3 text-blue-500" />
              Shortlisted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusStats.shortlisted}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-1">
              <MessageSquare className="h-3 w-3 text-purple-500" />
              Interviewed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusStats.interviewed}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-1">
              <CheckCircle className="h-3 w-3 text-green-500" />
              Selected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusStats.selected}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-1">
              <XCircle className="h-3 w-3 text-red-500" />
              Rejected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statusStats.rejected}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by job title, company, or student name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="shortlisted">Shortlisted</SelectItem>
            <SelectItem value="interviewed">Interviewed</SelectItem>
            <SelectItem value="selected">Selected</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Applications</CardTitle>
          <CardDescription>
            {filteredApplications.length} applications found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {userRole !== 'student' && <TableHead>Student</TableHead>}
                <TableHead>Job Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => {
                const job = mockJobs.find(j => j.id === application.jobId);
                const student = mockUsers.find(u => u.id === application.studentId);
                
                return (
                  <TableRow key={application.id}>
                    {userRole !== 'student' && (
                      <TableCell>
                        <div>
                          <p className="font-medium">{student?.name}</p>
                          <p className="text-sm text-muted-foreground">{student?.email}</p>
                        </div>
                      </TableCell>
                    )}
                    <TableCell>
                      <div>
                        <p className="font-medium">{job?.title}</p>
                        <p className="text-sm text-muted-foreground">{job?.department}</p>
                      </div>
                    </TableCell>
                    <TableCell>{job?.company}</TableCell>
                    <TableCell>{application.appliedDate.toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="secondary" 
                        className={`text-white ${getStatusColor(application.status)}`}
                      >
                        <span className="flex items-center gap-1">
                          {getStatusIcon(application.status)}
                          {application.status}
                        </span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedApplication(application)}
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        {(userRole === 'employer' || userRole === 'placement-officer') && (
                          <Button 
                            size="sm"
                            onClick={() => {
                              setSelectedApplication(application);
                              setIsUpdateDialogOpen(true);
                            }}
                          >
                            Update
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {filteredApplications.length === 0 && (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium">No applications found</h3>
              <p className="text-muted-foreground">
                {searchTerm || filterStatus !== 'all' 
                  ? 'Try adjusting your search criteria'
                  : 'No applications available at the moment'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <ApplicationDetailsDialog />
      <UpdateStatusDialog />
    </div>
  );
}