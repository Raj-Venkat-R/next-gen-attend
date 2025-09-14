import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  QrCode, 
  BarChart, 
  FileText, 
  CheckSquare, 
  Clock,
  Download,
  Plus,
  RefreshCw
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TeacherDashboard = () => {
  const [currentCode, setCurrentCode] = useState("");
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const { toast } = useToast();

  // Mock data
  const classStats = {
    totalStudents: 45,
    present: 38,
    absent: 7,
    percentage: 84
  };

  const subjects = [
    { name: "Mathematics - Section A", students: 45, present: 38, percentage: 84 },
    { name: "Mathematics - Section B", students: 42, present: 35, percentage: 83 },
    { name: "Advanced Calculus", students: 28, present: 24, percentage: 86 }
  ];

  const pendingRequests = [
    { student: "John Doe", reason: "Sports Competition", type: "Sports", date: "Dec 15, 2024", status: "pending" },
    { student: "Jane Smith", reason: "Technical Fest", type: "Fest", date: "Dec 16, 2024", status: "pending" },
    { student: "Mike Johnson", reason: "Internship Interview", type: "Internship", date: "Dec 17, 2024", status: "pending" }
  ];

  const recentActivities = [
    { action: "Attendance marked", class: "Math Section A", time: "2 hours ago" },
    { action: "Quiz created", class: "Advanced Calculus", time: "4 hours ago" },
    { action: "OD request approved", student: "Sarah Wilson", time: "1 day ago" }
  ];

  const generateAttendanceCode = () => {
    setIsGeneratingCode(true);
    // Simulate code generation
    setTimeout(() => {
      const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      setCurrentCode(newCode);
      setIsGeneratingCode(false);
      toast({
        title: "Attendance Code Generated",
        description: `New code: ${newCode} (Valid for 10 minutes)`,
      });
    }, 1000);
  };

  const handleODRequest = (action: 'approve' | 'reject', studentName: string) => {
    toast({
      title: `Request ${action}d`,
      description: `${studentName}'s OD request has been ${action}d`,
    });
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Teacher Dashboard</h1>
            <p className="text-muted-foreground">Faculty ID: MATH001 - Dr. Sarah Johnson</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              New Quiz
            </Button>
          </div>
        </div>

        <Tabs defaultValue="attendance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="requests">OD Requests</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Code Generation */}
              <div className="lg:col-span-2">
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <QrCode className="w-5 h-5" />
                      Generate Attendance Code
                    </CardTitle>
                    <CardDescription>Create a unique code for students to mark attendance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Select Subject</label>
                          <select className="w-full mt-1 p-2 border rounded-md">
                            <option>Mathematics - Section A</option>
                            <option>Mathematics - Section B</option>
                            <option>Advanced Calculus</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Duration (minutes)</label>
                          <Input placeholder="10" className="mt-1" />
                        </div>
                      </div>
                      
                      {currentCode && (
                        <div className="bg-gradient-primary text-white p-6 rounded-lg text-center">
                          <div className="text-sm opacity-90 mb-2">Current Attendance Code</div>
                          <div className="text-4xl font-mono font-bold tracking-wider">{currentCode}</div>
                          <div className="text-sm opacity-90 mt-2">Valid for 10 minutes</div>
                        </div>
                      )}
                      
                      <Button 
                        onClick={generateAttendanceCode} 
                        disabled={isGeneratingCode}
                        className="w-full"
                        size="lg"
                      >
                        {isGeneratingCode ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Generating...
                          </>
                        ) : (
                          <>
                            <QrCode className="w-4 h-4 mr-2" />
                            Generate New Code
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Today's Stats */}
              <div>
                <Card className="shadow-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart className="w-5 h-5" />
                      Today's Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{classStats.percentage}%</div>
                        <div className="text-sm text-muted-foreground">Average Attendance</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-2xl font-bold text-education-success">{classStats.present}</div>
                          <div className="text-xs text-muted-foreground">Present</div>
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-destructive">{classStats.absent}</div>
                          <div className="text-xs text-muted-foreground">Absent</div>
                        </div>
                      </div>

                      <Button variant="outline" size="sm" className="w-full">
                        <FileText className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Subject Overview */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Subject-wise Attendance</CardTitle>
                <CardDescription>Attendance overview for all your subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium">{subject.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {subject.present || 0}/{subject.students} students present
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{subject.percentage}%</div>
                        <Badge variant="outline" className="mt-1">
                          <Users className="w-3 h-3 mr-1" />
                          {subject.students}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Attendance Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-muted-foreground">
                    Analytics charts would be displayed here
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle>Student Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-muted-foreground">
                    Performance metrics would be displayed here
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* OD Requests Tab */}
          <TabsContent value="requests">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckSquare className="w-5 h-5" />
                  Pending OD Requests
                </CardTitle>
                <CardDescription>Review and approve student on-duty requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingRequests.map((request, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-medium">{request.student}</div>
                          <div className="text-sm text-muted-foreground">{request.reason}</div>
                        </div>
                        <Badge variant="outline">{request.type}</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {request.date}
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleODRequest('reject', request.student)}
                          >
                            Reject
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleODRequest('approve', request.student)}
                          >
                            Approve
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Your recent actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <div className="font-medium">{activity.action}</div>
                        <div className="text-sm text-muted-foreground">
                          {activity.class && `Class: ${activity.class}`}
                          {activity.student && `Student: ${activity.student}`}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TeacherDashboard;