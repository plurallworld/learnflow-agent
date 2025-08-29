import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Brain, Code, PlayCircle, FileText, CheckCircle, Clock, Users, Zap, BookOpen } from "lucide-react";
import { LearningModule } from "@/components/LearningModule";
import { MCPServerHighlight } from "@/components/MCPServerHighlight";
import { GenerationProgress } from "@/components/GenerationProgress";
import { LearningPathSettings, type PathSettings } from "@/components/LearningPathSettings";

const Index = () => {
  const [topic, setTopic] = useState("");
  const [experience, setExperience] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPath, setGeneratedPath] = useState(false);
  const [pathSettings, setPathSettings] = useState<PathSettings>({
    includeMCQ: true,
    includeCaseStudies: true,
    includeCodingExercises: true,
    includeSimulations: false,
    includeVideos: true,
    includeConcepts: true,
    industryContext: ""
  });

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    // Simulate generation process
    setTimeout(() => {
      setGeneratedPath(true);
      setIsGenerating(false);
    }, 5000);
  };

  const learningModules = [
    {
      id: 1,
      title: "Autonomous Agent Fundamentals",
      type: "concept" as const,
      duration: "25 min",
      description: "Core concepts and principles of autonomous agents in AI systems",
      completed: false,
      outcome: "Understand agent architecture, decision-making processes, and core components of autonomous systems",
      prerequisites: ["Basic programming knowledge", "Understanding of AI concepts"],
      nextSteps: ["Multi-Agent Communication Patterns", "Advanced agent coordination techniques"],
      keyTopics: ["Agent Architecture", "Perception & Action", "Goal-oriented behavior", "Environment interaction"]
    },
    {
      id: 2,
      title: "Multi-Agent Communication Patterns",
      type: "case" as const,
      duration: "30 min",
      description: "Real-world case study: Coordinating multiple agents in distributed systems",
      completed: false,
      outcome: "Design and implement communication protocols for multi-agent coordination",
      prerequisites: ["Autonomous Agent Fundamentals", "Network protocols knowledge"],
      nextSteps: ["Building Your First Agent", "Advanced coordination algorithms"],
      keyTopics: ["Message Passing", "Consensus Algorithms", "Coordination Protocols", "Fault Tolerance"]
    },
    {
      id: 3,
      title: "Building Your First Agent",
      type: "coding" as const,
      duration: "20 min",
      description: "Hands-on coding environment with step-by-step agent implementation",
      completed: false,
      outcome: "Implement a functional autonomous agent with basic decision-making capabilities",
      prerequisites: ["Multi-Agent Communication Patterns", "Python programming"],
      nextSteps: ["Agent Architecture Deep Dive", "Advanced agent behaviors"],
      keyTopics: ["Code Structure", "Decision Logic", "State Management", "Testing & Debugging"]
    },
    {
      id: 4,
      title: "Agent Architecture Deep Dive",
      type: "video" as const,
      duration: "15 min",
      description: "Visual explanation of advanced agent architectures and design patterns",
      completed: false,
      outcome: "Analyze and compare different agent architectures for various use cases",
      prerequisites: ["Building Your First Agent", "Software architecture basics"],
      nextSteps: ["Knowledge Check", "Production deployment strategies"],
      keyTopics: ["Layered Architecture", "Reactive vs Deliberative", "Hybrid Approaches", "Scalability Patterns"]
    },
    {
      id: 5,
      title: "Knowledge Validation & Next Steps",
      type: "mcq" as const,
      duration: "10 min",
      description: "Comprehensive assessment with adaptive questions and personalized feedback",
      completed: false,
      outcome: "Validate understanding and receive personalized recommendations for advanced topics",
      prerequisites: ["All previous modules completed"],
      nextSteps: ["Advanced MCP Integration", "Production Agent Systems", "Research Frontiers"],
      keyTopics: ["Concept Validation", "Practical Applications", "Common Pitfalls", "Advanced Pathways"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Professional Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-lg border border-primary/30">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  LearningPath AI
                </h1>
                <p className="text-xs text-muted-foreground">
                  Autonomous Learning Platform
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="border-accent/30 text-accent text-xs">
                <div className="h-1.5 w-1.5 bg-accent rounded-full mr-1 animate-pulse"></div>
                MCP Online
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Generator Panel */}
          <div className="lg:col-span-1">
            <Card className="shadow-card border-border/50 bg-gradient-card">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <CardTitle className="text-sm">Generate Path</CardTitle>
                  </div>
                  <LearningPathSettings onSettingsChange={setPathSettings} />
                </div>
                <CardDescription className="text-xs">
                  Create structured learning with AI agents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="topic" className="text-xs font-medium">Topic</Label>
                  <Input
                    id="topic"
                    placeholder="Autonomous Agents, ML..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="h-8 text-xs bg-input border-border/50 focus:border-primary/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience" className="text-xs font-medium">Background</Label>
                  <Textarea
                    id="experience"
                    placeholder="Your experience and goals..."
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    rows={2}
                    className="text-xs bg-input border-border/50 focus:border-primary/50 resize-none"
                  />
                </div>

                <Button 
                  onClick={handleGenerate}
                  disabled={!topic.trim() || isGenerating}
                  className="w-full h-8 text-xs bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {isGenerating ? (
                    <>
                      <Zap className="h-3 w-3 mr-1 animate-pulse" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3 w-3 mr-1" />
                      Generate
                    </>
                  )}
                </Button>

                {/* Stats */}
                <div className="pt-3 border-t border-border/30">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="p-2 bg-muted/30 rounded border border-border/30">
                      <div className="text-sm font-semibold text-primary">15-30</div>
                      <div className="text-xs text-muted-foreground">min/module</div>
                    </div>
                    <div className="p-2 bg-muted/30 rounded border border-border/30">
                      <div className="text-sm font-semibold text-accent">AI</div>
                      <div className="text-xs text-muted-foreground">Powered</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* MCP Server Status - Only show when generating or has generated */}
            {(isGenerating || generatedPath) && <MCPServerHighlight isGenerating={isGenerating} />}
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {isGenerating && <GenerationProgress />}
            
            {generatedPath && !isGenerating && (
              <div className="space-y-4">
                {/* Path Overview */}
                <Card className="shadow-card border-border/50 bg-gradient-card">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg text-foreground">Autonomous Agents Learning Path</CardTitle>
                        <CardDescription className="text-xs">
                          Professional 5-module journey • ~100 minutes • Advanced Level
                        </CardDescription>
                      </div>
                      <Badge className="bg-success/20 text-success border-success/30 text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Generated
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <Progress value={0} className="flex-1 h-2" />
                      <span className="text-xs text-muted-foreground">0% Complete</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pathSettings.includeConcepts && (
                        <Badge variant="outline" className="border-primary/30 text-primary text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          2 Concepts
                        </Badge>
                      )}
                      {pathSettings.includeCaseStudies && (
                        <Badge variant="outline" className="border-accent/30 text-accent text-xs">
                          <BookOpen className="h-3 w-3 mr-1" />
                          1 Case Study
                        </Badge>
                      )}
                      {pathSettings.includeCodingExercises && (
                        <Badge variant="outline" className="border-learning-secondary/30 text-learning-secondary text-xs">
                          <Code className="h-3 w-3 mr-1" />
                          1 Coding Lab
                        </Badge>
                      )}
                      {pathSettings.includeVideos && (
                        <Badge variant="outline" className="border-warning/30 text-warning text-xs">
                          <PlayCircle className="h-3 w-3 mr-1" />
                          1 Video
                        </Badge>
                      )}
                      {pathSettings.includeMCQ && (
                        <Badge variant="outline" className="border-success/30 text-success text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          1 Assessment
                        </Badge>
                      )}
                    </div>

                    {/* Professional Metrics */}
                    <div className="grid grid-cols-3 gap-3 p-3 bg-muted/20 rounded border border-border/30">
                      <div className="text-center">
                        <div className="text-sm font-bold text-primary">100min</div>
                        <div className="text-xs text-muted-foreground">Duration</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-accent">95%</div>
                        <div className="text-xs text-muted-foreground">Success</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-success">Pro</div>
                        <div className="text-xs text-muted-foreground">Level</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Learning Modules */}
                <div className="space-y-3">
                  {learningModules.map((module, index) => (
                    <LearningModule 
                      key={module.id} 
                      module={module} 
                      moduleNumber={index + 1}
                    />
                  ))}
                </div>
              </div>
            )}

            {!generatedPath && !isGenerating && (
              <Card className="shadow-card border-border/50 bg-gradient-card">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="p-4 bg-primary/20 rounded-lg border border-primary/30 mb-4">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Professional Learning Awaits</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    Generate a structured learning path powered by autonomous agents 
                    and MCP server technology for professional skill development.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;