import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  CheckCircle, 
  Clock, 
  BookOpen, 
  Trophy, 
  Bell,
  MapPin,
  Code
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const StudentDashboard = () => {
  const [attendanceCode, setAttendanceCode] = useState("");
  const { toast } = useToast();

  // Mock data - in real app this would come from Supabase
  const attendanceStats = {
    totalClasses: 45,
    present: 38,
    absent: 7,
    percentage: 84
  };

  const subjects = [
    { name: "Mathematics", present: 18, total: 20, percentage: 90 },
    { name: "Physics", present: 15, total: 18, percentage: 83 },
    { name: "Chemistry", present: 12, total: 15, percentage: 80 },
    { name: "Computer Science", present: 22, total: 25, percentage: 88 }
  ];

  const upcomingClasses = [
    { subject: "Mathematics", time: "09:00 AM", room: "Room 101" },
    { subject: "Physics Lab", time: "11:00 AM", room: "Lab 2" },
    { subject: "Chemistry", time: "02:00 PM", room: "Room 205" }
  ];

  const activities = [
    { title: "Quick Math Quiz", type: "quiz", points: 50, deadline: "Today 5:00 PM" },
    { title: "Career Planning Module", type: "roadmap", points: 100, deadline: "Tomorrow" },
    { title: "Physics Challenge", type: "challenge", points: 75, deadline: "This Week" }
  ];

  const handleAttendanceSubmit = () => {
    if (!attendanceCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter the attendance code",
        variant: "destructive"
      });
      return;
    }

    // Mock attendance marking
    toast({
      title: "Attendance Marked!",
      description: "Your attendance has been successfully recorded",
    });
    setAttendanceCode("");
  };

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 90) return "text-education-success";
    if (percentage >= 75) return "text-education-warning";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back, John!</h1>
            <p className="text-muted-foreground">Register: CS2021001</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm">
              Profile
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Attendance & Quick Actions */}
          <div className="lg:col-span-2 space-y-6">
            {/* Attendance Overview */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-education-success" />
                  Attendance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{attendanceStats.totalClasses}</div>
                    <div className="text-sm text-muted-foreground">Total Classes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-education-success">{attendanceStats.present}</div>
                    <div className="text-sm text-muted-foreground">Present</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-destructive">{attendanceStats.absent}</div>
                    <div className="text-sm text-muted-foreground">Absent</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getPercentageColor(attendanceStats.percentage)}`}>
                      {attendanceStats.percentage}%
                    </div>
                    <div className="text-sm text-muted-foreground">Percentage</div>
                  </div>
                </div>
                
                <Progress value={attendanceStats.percentage} className="mb-4" />
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Mark Attendance</h4>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter attendance code"
                        value={attendanceCode}
                        onChange={(e) => setAttendanceCode(e.target.value)}
                      />
                      <Button onClick={handleAttendanceSubmit}>
                        <Code className="w-4 h-4 mr-2" />
                        Submit
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h4 className="font-semibold">Alternative Methods</h4>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        Geo Check-in
                      </Button>
                      <Button variant="outline" size="sm">
                        USSD
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Subject-wise Attendance */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Subject-wise Attendance</CardTitle>
                <CardDescription>Your attendance breakdown by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {subjects.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{subject.name}</span>
                          <span className={`font-semibold ${getPercentageColor(subject.percentage)}`}>
                            {subject.percentage}%
                          </span>
                        </div>
                        <Progress value={subject.percentage} className="h-2" />
                        <div className="text-xs text-muted-foreground mt-1">
                          {subject.present}/{subject.total} classes attended
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Info & Activities */}
          <div className="space-y-6">
            {/* Upcoming Classes */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Today's Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingClasses.map((cls, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="font-medium">{cls.subject}</div>
                        <div className="text-sm text-muted-foreground">{cls.room}</div>
                      </div>
                      <div className="text-sm font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {cls.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Engagement Activities */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-education-warning" />
                  Active Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activities.map((activity, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <div className="font-medium">{activity.title}</div>
                        <Badge variant="secondary">{activity.points} pts</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        Due: {activity.deadline}
                      </div>
                      <Button size="sm" variant="outline" className="w-full">
                        {activity.type === 'quiz' && <BookOpen className="w-3 h-3 mr-2" />}
                        {activity.type === 'roadmap' && <MapPin className="w-3 h-3 mr-2" />}
                        {activity.type === 'challenge' && <Trophy className="w-3 h-3 mr-2" />}
                        Start
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-education-success">5</div>
                    <div className="text-xs text-muted-foreground">Quizzes Completed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-education-info">280</div>
                    <div className="text-xs text-muted-foreground">Points Earned</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;