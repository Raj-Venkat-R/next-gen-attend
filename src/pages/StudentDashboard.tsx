import { useState, useEffect } from "react";
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
  Code,
  FileText,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const [attendanceCode, setAttendanceCode] = useState("");
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocationValid, setIsLocationValid] = useState<boolean | null>(null);
  const { toast } = useToast();

  // College location coordinates (example: replace with actual college coordinates)
  const collegeLocation = {
    lat: 12.9716, // Example: Bangalore coordinates
    lng: 77.5946,
    radius: 100 // meters
  };

  // Function to calculate distance between two coordinates
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lng2-lng1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  };

  // Get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setCurrentLocation(location);
        setLocationError(null);

        // Check if location is within college radius
        const distance = calculateDistance(
          location.lat, 
          location.lng, 
          collegeLocation.lat, 
          collegeLocation.lng
        );
        
        const isValid = distance <= collegeLocation.radius;
        setIsLocationValid(isValid);

        if (!isValid) {
          toast({
            title: "Location Alert",
            description: "You are not within the college premises. This has been reported to your teacher.",
            variant: "destructive"
          });
        }
      },
      (error) => {
        setLocationError("Unable to retrieve your location.");
        console.error("Error getting location:", error);
      }
    );
  };

  // Get location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Mock data - in real app this would come from Supabase
  const attendanceStats = {
    totalClasses: 45,
    present: 38,
    absent: 7,
    percentage: 84
  };

  const subjects = [
    { name: "Data Structures & Algorithms", present: 18, total: 20, percentage: 90 },
    { name: "Database Management Systems (DBMS)", present: 15, total: 18, percentage: 83 },
    { name: "Operating Systems (OS)", present: 12, total: 15, percentage: 80 },
    { name: "Computer Networks (CN)", present: 22, total: 25, percentage: 88 },
    { name: "Theory of Computation (TOC)", present: 14, total: 16, percentage: 87 },
    { name: "Software Engineering (SE)", present: 19, total: 22, percentage: 86 },
    { name: "Artificial Intelligence (AI)", present: 13, total: 15, percentage: 87 },
    { name: "Machine Learning (ML)", present: 11, total: 12, percentage: 92 }
  ];

  const upcomingClasses = [
    { subject: "Data Structures & Algorithms", time: "09:00 AM", room: "Room 101" },
    { subject: "DBMS Lab", time: "11:00 AM", room: "Lab 2" },
    { subject: "Operating Systems", time: "02:00 PM", room: "Room 205" }
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

    // Check location validity before marking attendance
    if (isLocationValid === false) {
      toast({
        title: "Attendance Denied",
        description: "You must be within college premises to mark attendance",
        variant: "destructive"
      });
      return;
    }

    if (isLocationValid === null) {
      toast({
        title: "Location Check Required",
        description: "Please wait for location verification to complete",
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

  const handleUSSDAttendance = () => {
    // In real app, get current attendance code from backend/context
    const currentAttendanceCode = "123456"; // This would come from backend
    const ussdCode = `*123*${currentAttendanceCode}#`;
    window.location.href = `tel:${ussdCode}`;
    
    toast({
      title: "USSD Dialer Opened",
      description: `Dialing: ${ussdCode}`,
    });
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
                
                <div className="space-y-4">
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
                  
                  {/* Location Status */}
                  <div className="space-y-2">
                    <h4 className="font-semibold">Location Status</h4>
                    <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                      <MapPin className="w-4 h-4" />
                      <div className="flex-1">
                        {locationError ? (
                          <div className="flex items-center gap-2 text-destructive">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="text-sm">{locationError}</span>
                          </div>
                        ) : isLocationValid === null ? (
                          <span className="text-sm text-muted-foreground">Checking location...</span>
                        ) : isLocationValid ? (
                          <span className="text-sm text-education-success">✓ Within college premises</span>
                        ) : (
                          <span className="text-sm text-destructive">⚠ Outside college premises</span>
                        )}
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={getCurrentLocation}
                      >
                        Refresh
                      </Button>
                    </div>
                  </div>

                  {/* Alternative Methods */}
                  <div className="space-y-3">
                    <h4 className="font-semibold">Alternative Methods</h4>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleUSSDAttendance}
                      >
                        USSD
                      </Button>
                      <Link to="/od-submission">
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          Submit OD
                        </Button>
                      </Link>
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
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          if (activity.type === 'quiz') {
                            toast({
                              title: "Quiz Started!",
                              description: `Starting ${activity.title}`,
                            });
                            // In a real app, this would navigate to the quiz page
                            // For now, we'll just show a success message
                          } else {
                            toast({
                              title: "Activity Started!",
                              description: `Starting ${activity.title}`,
                            });
                          }
                        }}
                      >
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