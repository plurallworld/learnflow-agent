import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Brain, Heart, Search, ArrowUp, Trash2, Upload, Settings, Link, FileText, Youtube, Clock, Target } from "lucide-react";
import { LearningModule } from "@/components/LearningModule";

interface LearningPath {
  id: string;
  title: string;
  description: string;
  modules: number;
  created: string;
}

interface GeneratedModule {
  id: number;
  title: string;
  type: 'concept' | 'case' | 'coding' | 'video' | 'mcq';
  duration: string;
  description: string;
  completed: boolean;
  outcome: string;
  prerequisites: string[];
  nextSteps: string[];
  keyTopics: string[];
}

interface GeneratedCourse {
  id: string;
  title: string;
  description: string;
  totalDuration: string;
  learningObjective: string;
  targetLevel: string;
  modules: GeneratedModule[];
}

const Index = () => {
  const [whatToLearn, setWhatToLearn] = useState("");
  const [whatToAchieve, setWhatToAchieve] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCourse, setGeneratedCourse] = useState<GeneratedCourse | null>(null);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [webUrl, setWebUrl] = useState("");
  const [learningGoal, setLearningGoal] = useState("");
  const [currentLevel, setCurrentLevel] = useState("");
  const [timeCommitment, setTimeCommitment] = useState("");
  
  const existingPaths: LearningPath[] = [
    {
      id: "1",
      title: "Machine Learning Fundamentals",
      description: "Complete guide to ML algorithms and implementation",
      modules: 5,
      created: "2 days ago"
    },
    {
      id: "2", 
      title: "React Development",
      description: "Modern React patterns and best practices",
      modules: 4,
      created: "1 week ago"
    },
    {
      id: "3",
      title: "System Design",
      description: "Scalable architecture patterns",
      modules: 6,
      created: "2 weeks ago"
    }
  ];

  const generatePath = async () => {
    console.log("generatePath called", { whatToLearn, whatToAchieve });
    if (!whatToLearn.trim() && !whatToAchieve.trim()) {
      console.log("Both fields empty, returning early");
      return;
    }
    console.log("Starting generation...");
    setIsGenerating(true);
    
    // Simulate generation with dynamic content
    setTimeout(() => {
      console.log("Generation complete");
      
      // Create a course based on user input
      const course: GeneratedCourse = {
        id: Date.now().toString(),
        title: `${whatToLearn || 'Custom Learning Path'}`,
        description: `A comprehensive learning path to help you ${whatToAchieve || 'achieve your goals'}.`,
        totalDuration: "6-8 weeks",
        learningObjective: whatToAchieve || "Master the fundamentals and apply them practically",
        targetLevel: "Beginner to Intermediate",
        modules: [
          {
            id: 1,
            title: `Introduction to ${whatToLearn}`,
            type: 'concept',
            duration: "45 min",
            description: `Learn the fundamental concepts and principles of ${whatToLearn}.`,
            completed: false,
            outcome: `Understand the core concepts and terminology of ${whatToLearn}`,
            prerequisites: ["Basic understanding of related field", "Commitment to learning"],
            nextSteps: ["Apply concepts in practice", "Move to hands-on exercises"],
            keyTopics: ["Core principles", "Key terminology", "Historical context", "Current applications"]
          },
          {
            id: 2,
            title: `Practical Applications`,
            type: 'case',
            duration: "60 min",
            description: `Explore real-world case studies and applications.`,
            completed: false,
            outcome: `Analyze real-world scenarios and understand practical implications`,
            prerequisites: ["Completion of Module 1", "Basic conceptual knowledge"],
            nextSteps: ["Implement solutions", "Practice with tools"],
            keyTopics: ["Case studies", "Industry examples", "Best practices", "Common challenges"]
          },
          {
            id: 3,
            title: `Hands-on Implementation`,
            type: 'coding',
            duration: "90 min",
            description: `Build and implement solutions using practical tools and techniques.`,
            completed: false,
            outcome: `Create working implementations and solve real problems`,
            prerequisites: ["Understanding of concepts", "Case study analysis"],
            nextSteps: ["Advanced techniques", "Project work"],
            keyTopics: ["Tools and frameworks", "Implementation strategies", "Debugging", "Testing"]
          },
          {
            id: 4,
            title: `Advanced Techniques`,
            type: 'video',
            duration: "75 min",
            description: `Learn advanced methods and optimization strategies.`,
            completed: false,
            outcome: `Master advanced techniques and optimization approaches`,
            prerequisites: ["Hands-on experience", "Basic implementation skills"],
            nextSteps: ["Real-world projects", "Specialization areas"],
            keyTopics: ["Advanced methods", "Optimization", "Performance", "Scalability"]
          },
          {
            id: 5,
            title: `Final Assessment`,
            type: 'mcq',
            duration: "30 min",
            description: `Test your knowledge and understanding through comprehensive assessment.`,
            completed: false,
            outcome: `Demonstrate mastery of ${whatToLearn} concepts and applications`,
            prerequisites: ["Completion of all modules", "Practical experience"],
            nextSteps: ["Certification", "Advanced courses", "Real-world projects"],
            keyTopics: ["Comprehensive review", "Problem solving", "Application scenarios", "Best practices"]
          }
        ]
      };
      
      setGeneratedCourse(course);
      setIsGenerating(false);
      setWhatToLearn("");
      setWhatToAchieve("");
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-4 sm:px-8 py-5 border-b border-border/10 bg-background/95 backdrop-blur-sm">
        <div className="flex items-center space-x-4 sm:space-x-8">
          <div className="flex items-center space-x-3">
            <Brain className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
            <span className="text-lg sm:text-xl font-bold tracking-tight">DeepCoach</span>
          </div>
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm text-muted-foreground font-medium">
            <span className="hover:text-foreground transition-colors cursor-pointer">Community</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Pricing</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Enterprise</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Learn</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="h-8 w-8 sm:h-9 sm:w-9 p-0">
            <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Button>
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gradient-primary text-white flex items-center justify-center text-sm font-semibold shadow-md">
            A
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-4 sm:px-8 py-12 sm:py-20 bg-gradient-hero text-white min-h-[75vh]">
        <div className="text-center space-y-8 sm:space-y-12 max-w-5xl w-full">
          <div className="space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]">
              Have 10 minutes, learn something new
            </h1>
          </div>

          <div className="w-full max-w-4xl mx-auto">
            <div className="group">
              <div className="bg-black/20 backdrop-blur-md rounded-3xl px-6 py-6 border border-white/10 shadow-2xl transition-all duration-300 group-hover:bg-black/30 group-hover:border-white/20">
                <div className="flex flex-col h-full min-h-[160px]">
                  <div className="flex-1 space-y-3 mb-4">
                    <Input
                      placeholder="What do you want to learn?"
                      value={whatToLearn}
                      onChange={(e) => setWhatToLearn(e.target.value)}
                      className="border-0 bg-transparent text-white placeholder:text-white/50 focus-visible:ring-0 text-base h-12"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          generatePath();
                        }
                      }}
                    />
                    <div className="w-full h-px bg-white/10"></div>
                    <Input
                      placeholder="What do you want to achieve?"
                      value={whatToAchieve}
                      onChange={(e) => setWhatToAchieve(e.target.value)}
                      className="border-0 bg-transparent text-white placeholder:text-white/50 focus-visible:ring-0 text-base h-12"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          generatePath();
                        }
                      }}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                      >
                        <div className="h-4 w-4 flex items-center justify-center">
                          <div className="w-3 h-0.5 bg-current"></div>
                          <div className="w-0.5 h-3 bg-current absolute"></div>
                        </div>
                      </Button>
                      
                      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-3 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 text-xs font-medium"
                          >
                            <Upload className="h-3.5 w-3.5 mr-1.5" />
                            Attach
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Add Learning Materials</DialogTitle>
                          </DialogHeader>
                          <Tabs defaultValue="youtube" className="w-full">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="youtube" className="flex items-center gap-2">
                                <Youtube className="h-4 w-4" />
                                YouTube
                              </TabsTrigger>
                              <TabsTrigger value="web" className="flex items-center gap-2">
                                <Link className="h-4 w-4" />
                                Web Link
                              </TabsTrigger>
                              <TabsTrigger value="upload" className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Upload
                              </TabsTrigger>
                            </TabsList>
                            <TabsContent value="youtube" className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="youtube-url">YouTube URL</Label>
                                <Input
                                  id="youtube-url"
                                  placeholder="https://youtube.com/watch?v=..."
                                  value={youtubeUrl}
                                  onChange={(e) => setYoutubeUrl(e.target.value)}
                                />
                              </div>
                              <Button className="w-full">Add YouTube Video</Button>
                            </TabsContent>
                            <TabsContent value="web" className="space-y-4">
                              <div className="space-y-2">
                                <Label htmlFor="web-url">Website URL</Label>
                                <Input
                                  id="web-url"
                                  placeholder="https://example.com/article"
                                  value={webUrl}
                                  onChange={(e) => setWebUrl(e.target.value)}
                                />
                              </div>
                              <Button className="w-full">Add Web Resource</Button>
                            </TabsContent>
                            <TabsContent value="upload" className="space-y-4">
                              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                                <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                                <p className="text-sm text-muted-foreground mb-2">
                                  Drag and drop files here or click to browse
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  PDF, DOC, TXT files supported
                                </p>
                              </div>
                              <Button className="w-full">Upload Files</Button>
                            </TabsContent>
                          </Tabs>
                        </DialogContent>
                      </Dialog>

                      <Dialog open={settingsDialogOpen} onOpenChange={setSettingsDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-3 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200 text-xs font-medium"
                          >
                            <Brain className="h-3.5 w-3.5 mr-1.5" />
                            Workspace
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg">
                          <DialogHeader>
                            <DialogTitle>Structured Prompt Builder</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-6">
                            <div className="space-y-2">
                              <Label htmlFor="learning-goal">Learning Goal</Label>
                              <Textarea
                                id="learning-goal"
                                placeholder="What specific skill or knowledge do you want to gain?"
                                value={learningGoal}
                                onChange={(e) => setLearningGoal(e.target.value)}
                                rows={3}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="current-level">Current Level</Label>
                              <Input
                                id="current-level"
                                placeholder="Beginner, Intermediate, or Advanced"
                                value={currentLevel}
                                onChange={(e) => setCurrentLevel(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="time-commitment">Time Commitment</Label>
                              <Input
                                id="time-commitment"
                                placeholder="e.g., 2 hours per week, 30 minutes daily"
                                value={timeCommitment}
                                onChange={(e) => setTimeCommitment(e.target.value)}
                              />
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                className="flex-1"
                                onClick={() => setSettingsDialogOpen(false)}
                              >
                                Cancel
                              </Button>
                              <Button 
                                className="flex-1"
                                onClick={() => {
                                  setWhatToLearn(learningGoal);
                                  setWhatToAchieve(`${currentLevel} level - ${timeCommitment}`);
                                  setSettingsDialogOpen(false);
                                }}
                              >
                                Apply to Prompt
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                    
                    <Button
                      onClick={generatePath}
                      disabled={isGenerating || (!whatToLearn.trim() && !whatToAchieve.trim())}
                      size="sm"
                      className="bg-white/10 text-white hover:bg-white/20 h-8 w-8 p-0 rounded-full transition-all duration-200 disabled:opacity-50 border border-white/10"
                    >
                      <ArrowUp className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Course Results */}
      {generatedCourse && (
        <div className="bg-gradient-subtle px-4 sm:px-8 py-8 sm:py-12 border-b border-border/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Your Learning Path</h2>
              <p className="text-muted-foreground">Here's your personalized course based on your goals</p>
            </div>

            {/* Course Overview */}
            <Card className="mb-8 shadow-elevated border-primary/10 bg-gradient-card">
              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{generatedCourse.title}</h3>
                      <p className="text-muted-foreground">{generatedCourse.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{generatedCourse.totalDuration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-muted-foreground" />
                        <span>{generatedCourse.targetLevel}</span>
                      </div>
                      <Badge variant="outline" className="text-primary border-primary/20">
                        {generatedCourse.modules.length} modules
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                      <h4 className="font-medium text-sm mb-2 text-primary">Learning Objective</h4>
                      <p className="text-sm text-muted-foreground">{generatedCourse.learningObjective}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Learning Modules */}
            <div className="space-y-6">
              {generatedCourse.modules.map((module, index) => (
                <LearningModule
                  key={module.id}
                  module={module}
                  moduleNumber={index + 1}
                  onModuleClick={(module) => {
                    console.log("Module clicked:", module);
                    // TODO: Navigate to detailed module view
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Workspace */}
      <div className="bg-background px-4 sm:px-8 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-10 gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Workspace</h2>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              View all
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6 sm:mb-8">
            <div className="relative flex-1 max-w-full sm:max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search learning paths..."
                className="pl-12 h-11 bg-muted/30 border-border/50 focus:border-ring"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-11 flex-1 sm:flex-none">
                Recent
              </Button>
              <Button variant="outline" size="sm" className="h-11 flex-1 sm:flex-none">
                Popular
              </Button>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {existingPaths.map((path) => (
              <Card key={path.id} className="group overflow-hidden border-0 shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer bg-gradient-card">
                <div className="p-6 space-y-4">
                  <div className="aspect-[16/10] bg-gradient-primary rounded-lg flex items-center justify-center shadow-learning group-hover:scale-105 transition-transform duration-300">
                    <Brain className="h-12 w-12 text-white/90" />
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                      {path.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                      {path.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground border-t border-border/30">
                    <Badge variant="secondary" className="font-medium">
                      {path.modules} modules
                    </Badge>
                    <span className="font-medium">{path.created}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;