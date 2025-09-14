import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft,
  FileText,
  Calendar as CalendarIcon,
  Clock,
  Upload,
  CheckCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const ODSubmission = () => {
  const [formData, setFormData] = useState({
    subject: "",
    reason: "",
    description: "",
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    supportingDocuments: [] as File[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const subjects = [
    "Data Structures & Algorithms",
    "Database Management Systems (DBMS)",
    "Operating Systems (OS)",
    "Computer Networks (CN)",
    "Theory of Computation (TOC)",
    "Software Engineering (SE)",
    "Artificial Intelligence (AI)",
    "Machine Learning (ML)"
  ];

  const odTypes = [
    "Sports Competition",
    "Technical Fest",
    "Cultural Event",
    "Internship Interview",
    "Medical Emergency",
    "Family Function",
    "Conference/Seminar",
    "Other"
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      supportingDocuments: [...prev.supportingDocuments, ...files]
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      supportingDocuments: prev.supportingDocuments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.subject || !formData.reason || !formData.description || !formData.startDate || !formData.endDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (formData.startDate > formData.endDate) {
      toast({
        title: "Invalid Dates",
        description: "Start date cannot be after end date",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "OD Request Submitted!",
        description: "Your on-duty request has been submitted for teacher approval",
      });
      
      // Reset form
      setFormData({
        subject: "",
        reason: "",
        description: "",
        startDate: undefined,
        endDate: undefined,
        supportingDocuments: []
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/student-dashboard">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Submit OD Request</h1>
            <p className="text-muted-foreground">Request for on-duty leave from classes</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  OD Request Form
                </CardTitle>
                <CardDescription>
                  Fill in the details for your on-duty request
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Subject Selection */}
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
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

                {/* Reason Selection */}
                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for OD *</Label>
                  <Select value={formData.reason} onValueChange={(value) => handleInputChange('reason', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                    <SelectContent>
                      {odTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed description of your on-duty request..."
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Date Range */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.startDate ? format(formData.startDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.startDate}
                          onSelect={(date) => handleInputChange('startDate', date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>End Date *</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.endDate ? format(formData.endDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={formData.endDate}
                          onSelect={(date) => handleInputChange('endDate', date)}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* File Upload */}
                <div className="space-y-2">
                  <Label>Supporting Documents (Optional)</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <div className="text-sm text-muted-foreground mb-2">
                      Upload supporting documents (certificates, invitations, etc.)
                    </div>
                    <Input
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={handleFileUpload}
                      className="max-w-xs mx-auto"
                    />
                  </div>
                  
                  {/* File List */}
                  {formData.supportingDocuments.length > 0 && (
                    <div className="space-y-2">
                      <Label>Uploaded Files:</Label>
                      {formData.supportingDocuments.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <span className="text-sm">{file.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <Button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Submit OD Request
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Guidelines */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-muted-foreground">
                  <p>• Submit requests at least 2 days in advance</p>
                  <p>• Provide valid supporting documents</p>
                  <p>• Be specific about dates and reasons</p>
                  <p>• Check with your teacher for approval</p>
                </div>
              </CardContent>
            </Card>

            {/* Recent Requests */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Recent Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <div>
                      <div className="text-sm font-medium">Sports Competition</div>
                      <div className="text-xs text-muted-foreground">Dec 10-12, 2024</div>
                    </div>
                    <Badge variant="secondary">Approved</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <div>
                      <div className="text-sm font-medium">Technical Fest</div>
                      <div className="text-xs text-muted-foreground">Dec 15-17, 2024</div>
                    </div>
                    <Badge variant="outline">Pending</Badge>
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

export default ODSubmission;
