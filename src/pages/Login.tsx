import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [activeTab, setActiveTab] = useState("student");
  const [formData, setFormData] = useState({
    registerNumber: "",
    facultyId: "",
    password: ""
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = (userType: string) => {
    // Demo login - in real app this would authenticate with Supabase
    const identifier = userType === "student" ? formData.registerNumber : formData.facultyId;
    
    if (!identifier || !formData.password) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Login Successful",
      description: `Welcome to EduEngage!`,
    });

    // Navigate to appropriate dashboard
    if (userType === "student") {
      window.location.href = "/student-dashboard";
    } else {
      window.location.href = "/teacher-dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Welcome to EduEngage</h1>
          <p className="text-white/80">Sign in to your account</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Choose your account type to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="student" className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  Student
                </TabsTrigger>
                <TabsTrigger value="teacher" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Teacher
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="student" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="registerNumber">Register Number</Label>
                  <Input
                    id="registerNumber"
                    placeholder="Enter your register number"
                    value={formData.registerNumber}
                    onChange={(e) => handleInputChange("registerNumber", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="studentPassword">Password</Label>
                  <Input
                    id="studentPassword"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                  />
                </div>
                <Button 
                  onClick={() => handleLogin("student")} 
                  className="w-full"
                  size="lg"
                >
                  Sign In as Student
                </Button>
              </TabsContent>
              
              <TabsContent value="teacher" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="facultyId">Faculty ID</Label>
                  <Input
                    id="facultyId"
                    placeholder="Enter your faculty ID"
                    value={formData.facultyId}
                    onChange={(e) => handleInputChange("facultyId", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="teacherPassword">Password</Label>
                  <Input
                    id="teacherPassword"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                  />
                </div>
                <Button 
                  onClick={() => handleLogin("teacher")} 
                  className="w-full"
                  size="lg"
                >
                  Sign In as Teacher
                </Button>
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">Don't have an account? </span>
              <Link to="/register" className="text-primary hover:underline">
                Contact your institution
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-white/80 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;