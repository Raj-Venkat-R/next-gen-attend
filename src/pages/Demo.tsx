import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Database, 
  Shield, 
  Smartphone, 
  BarChart, 
  Users, 
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const Demo = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "Role-based access with register number/faculty ID login",
      status: "Ready"
    },
    {
      icon: CheckCircle,
      title: "Smart Attendance",
      description: "Code generation, geofencing, and USSD support",
      status: "Ready"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Responsive interface optimized for all devices",
      status: "Ready"
    },
    {
      icon: Database,
      title: "Supabase Backend",
      description: "Real-time database, authentication, and file storage",
      status: "Requires Setup"
    },
    {
      icon: BarChart,
      title: "Analytics Dashboard",
      description: "Comprehensive reporting and data visualization",
      status: "Backend Required"
    },
    {
      icon: Users,
      title: "Multi-User Management",
      description: "Student, teacher, and admin role management",
      status: "Backend Required"
    }
  ];

  const demoScreens = [
    {
      title: "Landing Page",
      path: "/",
      description: "Professional homepage showcasing platform benefits"
    },
    {
      title: "Login System",
      path: "/login",
      description: "Dual authentication for students and teachers"
    },
    {
      title: "Student Dashboard",
      path: "/student-dashboard",
      description: "Attendance overview, code entry, and engagement activities"
    },
    {
      title: "Teacher Dashboard",
      path: "/teacher-dashboard",
      description: "Code generation, analytics, and OD request management"
    }
  ];

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            EduEngage Demo
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore the student engagement and attendance management platform. 
            The frontend is fully functional - backend integration with Supabase will unlock full functionality.
          </p>
        </div>

        {/* Feature Status */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle>Feature Implementation Status</CardTitle>
            <CardDescription>Current implementation progress and requirements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-medium">{feature.title}</div>
                      <Badge 
                        variant={feature.status === "Ready" ? "default" : "secondary"}
                        className="mt-1"
                      >
                        {feature.status}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Demo Screens */}
        <Card className="shadow-card mb-8">
          <CardHeader>
            <CardTitle>Demo Screens</CardTitle>
            <CardDescription>Explore the different sections of the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {demoScreens.map((screen, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium">{screen.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {screen.description}
                      </p>
                    </div>
                  </div>
                  <Button asChild variant="outline" size="sm" className="w-full">
                    <Link to={screen.path}>View Demo</Link>
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="shadow-card">
          <CardHeader>
            <CardTitle>Ready for Production?</CardTitle>
            <CardDescription>
              To enable full functionality including user authentication, database storage, 
              and real-time features, connect your project to Supabase.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">What Supabase Integration Enables:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• User authentication and session management</li>
                  <li>• Real-time attendance data storage</li>
                  <li>• Student and teacher profile management</li>
                  <li>• Quiz and activity data persistence</li>
                  <li>• File uploads for documents and images</li>
                  <li>• Push notifications and real-time updates</li>
                </ul>
              </div>
              
              <div className="flex gap-4">
                <Button asChild>
                  <Link to="/login">Try Demo Login</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/">Back to Home</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Demo;