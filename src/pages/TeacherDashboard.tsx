import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  QrCode, 
  BarChart, 
  FileText, 
  CheckSquare, 
  Clock,
  Download,
  Plus,
  RefreshCw,
  BookOpen,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TeacherDashboard = () => {
  const [currentCode, setCurrentCode] = useState("");
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);
  const [isCreateQuizOpen, setIsCreateQuizOpen] = useState(false);
  const [quizForm, setQuizForm] = useState({
    title: "",
    subject: "",
    description: "",
    duration: "",
    questions: ""
  });
  const { toast } = useToast();

  // Mock data
  const classStats = {
    totalStudents: 45,
    present: 38,
    absent: 7,
    percentage: 84
  };

  const subjects = [
    { name: "Data Structures & Algorithms - Section A", students: 45, present: 38, percentage: 84 },
    { name: "Database Management Systems (DBMS) - Section B", students: 42, present: 35, percentage: 83 },
    { name: "Operating Systems (OS)", students: 38, present: 32, percentage: 84 },
    { name: "Computer Networks (CN)", students: 40, present: 34, percentage: 85 },
    { name: "Theory of Computation (TOC)", students: 35, present: 30, percentage: 86 },
    { name: "Software Engineering (SE)", students: 44, present: 38, percentage: 86 },
    { name: "Artificial Intelligence (AI)", students: 30, present: 26, percentage: 87 },
    { name: "Machine Learning (ML)", students: 28, present: 24, percentage: 86 }
  ];

  const pendingRequests = [
    { 
      student: "John Doe", 
      reason: "Sports Competition", 
      type: "Sports", 
      date: "Dec 15, 2024", 
      status: "pending",
      subject: "Data Structures & Algorithms",
      description: "Participating in inter-college cricket tournament",
      startDate: "Dec 20, 2024",
      endDate: "Dec 22, 2024"
    },
    { 
      student: "Jane Smith", 
      reason: "Technical Fest", 
      type: "Fest", 
      date: "Dec 16, 2024", 
      status: "pending",
      subject: "Database Management Systems",
      description: "Organizing technical fest at college",
      startDate: "Dec 25, 2024",
      endDate: "Dec 27, 2024"
    },
    { 
      student: "Mike Johnson", 
      reason: "Internship Interview", 
      type: "Internship", 
      date: "Dec 17, 2024", 
      status: "pending",
      subject: "Operating Systems",
      description: "Final round interview at tech company",
      startDate: "Dec 18, 2024",
      endDate: "Dec 18, 2024"
    }
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
      // Generate 6-digit numeric code
      const newCode = Math.floor(100000 + Math.random() * 900000).toString();
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

  const handleExportData = () => {
    // Mock export functionality
    toast({
      title: "Export Started",
      description: "Your data is being prepared for download...",
    });
    
    // Simulate file download
    setTimeout(() => {
      const csvContent = "Student Name,Subject,Attendance %,Last Class\n" +
        "John Doe,Data Structures,90%,Dec 15, 2024\n" +
        "Jane Smith,DBMS,85%,Dec 15, 2024\n" +
        "Mike Johnson,OS,88%,Dec 15, 2024";
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'attendance-report.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Export Complete",
        description: "Attendance report downloaded successfully",
      });
    }, 2000);
  };

  const handleCreateQuiz = () => {
    if (!quizForm.title || !quizForm.subject || !quizForm.duration) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Quiz Created!",
      description: `Quiz "${quizForm.title}" has been created successfully`,
    });
    
    // Reset form and close dialog
    setQuizForm({
      title: "",
      subject: "",
      description: "",
      duration: "",
      questions: ""
    });
    setIsCreateQuizOpen(false);
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
            <Button variant="outline" size="sm" onClick={handleExportData}>
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Dialog open={isCreateQuizOpen} onOpenChange={setIsCreateQuizOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Quiz
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Quiz</DialogTitle>
                  <DialogDescription>
                    Create a new quiz for your students
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="quiz-title">Quiz Title *</Label>
                    <Input
                      id="quiz-title"
                      placeholder="Enter quiz title"
                      value={quizForm.title}
                      onChange={(e) => setQuizForm(prev => ({ ...prev, title: e.target.value }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="quiz-subject">Subject *</Label>
                    <Select value={quizForm.subject} onValueChange={(value) => setQuizForm(prev => ({ ...prev, subject: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="quiz-duration">Duration (minutes) *</Label>
                    <Input
                      id="quiz-duration"
                      type="number"
                      placeholder="30"
                      value={quizForm.duration}
                      onChange={(e) => setQuizForm(prev => ({ ...prev, duration: e.target.value }))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="quiz-description">Description</Label>
                    <Textarea
                      id="quiz-description"
                      placeholder="Enter quiz description..."
                      value={quizForm.description}
                      onChange={(e) => setQuizForm(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateQuizOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreateQuiz}>
                    <BookOpen className="w-4 h-4 mr-2" />
                    Create Quiz
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
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
                            <option>Data Structures & Algorithms - Section A</option>
                            <option>Database Management Systems (DBMS) - Section B</option>
                            <option>Operating Systems (OS)</option>
                            <option>Computer Networks (CN)</option>
                            <option>Theory of Computation (TOC)</option>
                            <option>Software Engineering (SE)</option>
                            <option>Artificial Intelligence (AI)</option>
                            <option>Machine Learning (ML)</option>
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
                          <div className="text-sm text-muted-foreground">{request.subject}</div>
                        </div>
                        <Badge variant="outline">{request.type}</Badge>
                      </div>
                      
                      <div className="mb-3">
                        <div className="text-sm font-medium mb-1">Reason: {request.reason}</div>
                        <div className="text-sm text-muted-foreground mb-2">{request.description}</div>
                        <div className="text-sm text-muted-foreground">
                          <span className="font-medium">Duration:</span> {request.startDate} - {request.endDate}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Submitted: {request.date}
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