import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, BarChart, Calendar, BookOpen, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-education.jpg";

const Landing = () => {
  const features = [
    {
      icon: CheckCircle,
      title: "Smart Attendance",
      description: "Unique codes, geofencing, and USSD support for seamless attendance tracking"
    },
    {
      icon: Users,
      title: "Student Engagement",
      description: "Interactive quizzes, polls, and activities to maximize learning during free periods"
    },
    {
      icon: BarChart,
      title: "Analytics Dashboard",
      description: "Comprehensive attendance analytics and performance insights for educators"
    },
    {
      icon: Calendar,
      title: "Leave Management",
      description: "Digital on-duty requests and approvals with automatic attendance adjustments"
    },
    {
      icon: BookOpen,
      title: "Career Guidance",
      description: "Personalized roadmaps and milestone tracking for student career development"
    },
    {
      icon: Trophy,
      title: "Achievement System",
      description: "Gamified learning with challenges, rewards, and progress recognition"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Transform Student 
                <span className="block text-education-info">Engagement</span>
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Revolutionary attendance management and student engagement platform 
                designed for modern educational institutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" variant="secondary" className="text-lg px-8">
                  <Link to="/login">Get Started</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary">
                  <Link to="/demo">View Demo</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Students using modern education technology" 
                className="rounded-2xl shadow-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Everything You Need for Modern Education
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Streamline attendance, boost engagement, and guide students toward success 
              with our comprehensive educational platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-lg transition-all duration-300 border-0">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">95%</div>
              <div className="text-muted-foreground">Attendance Accuracy</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-education-success">60%</div>
              <div className="text-muted-foreground">Time Saved</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-education-info">85%</div>
              <div className="text-muted-foreground">Student Engagement</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Ready to Transform Your Institution?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of educators already using our platform to improve 
            student outcomes and streamline operations.
          </p>
          <Button asChild size="lg" className="text-lg px-8">
            <Link to="/login">Start Your Journey</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;