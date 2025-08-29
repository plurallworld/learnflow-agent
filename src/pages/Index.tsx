import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Brain, Code, PlayCircle, FileText, CheckCircle, Clock, Users, Zap, BookOpen, Settings, Database, Edit } from "lucide-react";
import { LearningModule } from "@/components/LearningModule";
import { GenerationProgress } from "@/components/GenerationProgress";
import { LearningPathSettings, type PathSettings } from "@/components/LearningPathSettings";
import { CompactAgentExecution } from "@/components/CompactAgentExecution";
import { ThinkingIndicator } from "@/components/ThinkingIndicator";
import { DetailedModuleView } from "@/components/DetailedModuleView";
import { ModuleEnhancementSidebar } from "@/components/ModuleEnhancementSidebar";
import { ContentRefinementSidebar } from "@/components/ContentRefinementSidebar";

const Index = () => {
  const [topic, setTopic] = useState("");
  const [experience, setExperience] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPath, setGeneratedPath] = useState(false);
  const [selectedModule, setSelectedModule] = useState<any>(null);
  const [enhancementSidebarOpen, setEnhancementSidebarOpen] = useState(false);
  const [refinementSidebarOpen, setRefinementSidebarOpen] = useState(false);
  const [selectedModuleForEnhancement, setSelectedModuleForEnhancement] = useState<any>(null);
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
    // Reset states for new generation
    setGeneratedPath(false);
    setSelectedModule(null);
    setEnhancementSidebarOpen(false);
    setRefinementSidebarOpen(false);
    
    // Simulate generation process
    setTimeout(() => {
      setGeneratedPath(true);
      setIsGenerating(false);
    }, 5000);
  };

  const handleModuleEnhance = (module: any) => {
    setSelectedModuleForEnhancement(module);
    setEnhancementSidebarOpen(true);
  };

  const handleOpenRefinement = () => {
    setRefinementSidebarOpen(true);
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
    <div className="min-h-screen bg-background flex">
      {/* Left Enhancement Sidebar */}
      {enhancementSidebarOpen && (
        <div className="fixed left-0 top-0 h-full z-40">
          <ModuleEnhancementSidebar
            selectedModule={selectedModuleForEnhancement}
            onClose={() => setEnhancementSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${enhancementSidebarOpen ? 'ml-80' : ''} ${refinementSidebarOpen ? 'mr-80' : ''}`}>
        {/* Professional Header */}
        <header className="border-b border-border/50 bg-card/80 backdrop-blur-md sticky top-0 z-30">
          <div className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-lg border border-primary/30">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold text-foreground">
                    DeepCoach
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    AI-Powered Learning Platform
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {generatedPath && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleOpenRefinement}
                      className="h-8 text-xs"
                    >
                      <Settings className="h-3 w-3 mr-1" />
                      Refine
                    </Button>
                  </>
                )}
                <Badge variant="outline" className="border-accent/30 text-accent text-xs">
                  <div className="h-1.5 w-1.5 bg-accent rounded-full mr-1 animate-pulse"></div>
                  MCP Online
                </Badge>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-6 py-6">
          {/* Generate New Path */}
          {!generatedPath && !isGenerating && (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <div className="p-4 bg-primary/20 rounded-lg border border-primary/30 mb-4 inline-block">
                  <Brain className="h-12 w-12 text-primary" />
                </div>
                <h1 className="text-3xl font-bold mb-2 text-foreground">Create Learning Paths with AI</h1>
                <p className="text-lg text-muted-foreground">
                  Generate structured, personalized learning experiences powered by autonomous agents
                </p>
              </div>

              <Card className="shadow-card border-border/50 bg-gradient-card">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <CardTitle>Generate Learning Path</CardTitle>
                  </div>
                  <CardDescription>
                    Tell us what you want to learn and we'll create a comprehensive learning journey
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="topic" className="text-sm font-medium">Learning Topic</Label>
                    <Input
                      id="topic"
                      placeholder="e.g., Autonomous Agents, Machine Learning, Web Development..."
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="text-sm"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-sm font-medium">Your Background & Goals</Label>
                    <Textarea
                      id="experience"
                      placeholder="Tell us about your current experience level and what you hope to achieve..."
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                      rows={3}
                      className="text-sm"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <LearningPathSettings onSettingsChange={setPathSettings} />
                    <Button 
                      onClick={handleGenerate}
                      disabled={!topic.trim() || isGenerating}
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      {isGenerating ? (
                        <>
                          <Zap className="h-4 w-4 mr-2 animate-pulse" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-4 w-4 mr-2" />
                          Generate Path
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Generation Progress */}
          {isGenerating && (
            <div className="max-w-2xl mx-auto">
              <ThinkingIndicator isGenerating={isGenerating} />
              <CompactAgentExecution isGenerating={isGenerating} />
            </div>
          )}

          {/* Generated Learning Path */}
          {generatedPath && !isGenerating && (
            <div className="space-y-6">
              {/* Path Overview Header */}
              <Card className="shadow-card border-border/50 bg-gradient-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl text-foreground">Autonomous Agents Learning Path</CardTitle>
                      <CardDescription className="text-sm">
                        Professional 5-module journey • ~100 minutes • Advanced Level
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setGeneratedPath(false);
                          setTopic("");
                          setExperience("");
                        }}
                      >
                        New Path
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <Progress value={0} className="flex-1 h-3" />
                    <span className="text-sm text-muted-foreground">0% Complete</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {pathSettings.includeConcepts && (
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        <FileText className="h-4 w-4 mr-1" />
                        2 Concepts
                      </Badge>
                    )}
                    {pathSettings.includeCaseStudies && (
                      <Badge variant="outline" className="border-accent/30 text-accent">
                        <BookOpen className="h-4 w-4 mr-1" />
                        1 Case Study
                      </Badge>
                    )}
                    {pathSettings.includeCodingExercises && (
                      <Badge variant="outline" className="border-learning-secondary/30 text-learning-secondary">
                        <Code className="h-4 w-4 mr-1" />
                        1 Coding Lab
                      </Badge>
                    )}
                    {pathSettings.includeVideos && (
                      <Badge variant="outline" className="border-warning/30 text-warning">
                        <PlayCircle className="h-4 w-4 mr-1" />
                        1 Video
                      </Badge>
                    )}
                    {pathSettings.includeMCQ && (
                      <Badge variant="outline" className="border-success/30 text-success">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        1 Assessment
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Learning Modules Grid */}
              {!selectedModule ? (
                <div className="grid gap-4">
                  {learningModules.map((module, index) => (
                    <Card key={module.id} className="shadow-card border-border/50 bg-gradient-card hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                                <span className="text-sm font-semibold text-primary">{index + 1}</span>
                              </div>
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold mb-1">{module.title}</h3>
                                <p className="text-sm text-muted-foreground mb-2">{module.description}</p>
                                <div className="flex gap-2 mb-2">
                                  <Badge variant="outline" className="text-xs">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {module.duration}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs capitalize">
                                    {module.type}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleModuleEnhance(module)}
                              className="flex items-center gap-2"
                            >
                              <Database className="h-3 w-3" />
                              Enhance
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => setSelectedModule(module)}
                              className="bg-primary hover:bg-primary/90"
                            >
                              Start Module
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <DetailedModuleView
                  module={selectedModule}
                  moduleNumber={learningModules.findIndex(m => m.id === selectedModule.id) + 1}
                  onBack={() => setSelectedModule(null)}
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Refinement Sidebar */}
      {refinementSidebarOpen && (
        <div className="fixed right-0 top-0 h-full z-40">
          <ContentRefinementSidebar
            learningPath={generatedPath ? { title: "Autonomous Agents Learning Path", modules: learningModules } : null}
            onClose={() => setRefinementSidebarOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Index;