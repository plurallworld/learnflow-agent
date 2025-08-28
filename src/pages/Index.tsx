import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Brain, Code, PlayCircle, FileText, CheckCircle, Clock, Users, Zap } from "lucide-react";
import { LearningModule } from "@/components/LearningModule";
import { MCPServerHighlight } from "@/components/MCPServerHighlight";
import { GenerationProgress } from "@/components/GenerationProgress";

const Index = () => {
  const [topic, setTopic] = useState("");
  const [experience, setExperience] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPath, setGeneratedPath] = useState(false);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    // Simulate generation process
    setTimeout(() => {
      setGeneratedPath(true);
      setIsGenerating(false);
    }, 3000);
  };

  const learningModules = [
    {
      id: 1,
      title: "Autonomous Agent Fundamentals",
      type: "concept" as const,
      duration: "25 min",
      description: "Core concepts and principles of autonomous agents",
      completed: false
    },
    {
      id: 2,
      title: "Multi-Agent Communication Patterns",
      type: "case" as const,
      duration: "30 min",
      description: "Real-world case study: Coordinating multiple agents",
      completed: false
    },
    {
      id: 3,
      title: "Building Your First Agent",
      type: "coding" as const,
      duration: "20 min",
      description: "Hands-on coding environment with step-by-step guidance",
      completed: false
    },
    {
      id: 4,
      title: "Agent Architecture Deep Dive",
      type: "video" as const,
      duration: "15 min",
      description: "Visual explanation of agent architectures",
      completed: false
    },
    {
      id: 5,
      title: "Knowledge Check",
      type: "mcq" as const,
      duration: "10 min",
      description: "Test your understanding with adaptive questions",
      completed: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-xl">
              <Brain className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-learning bg-clip-text text-transparent">
                LearningPath AI
              </h1>
              <p className="text-sm text-muted-foreground">
                Autonomous Learning with MCP Server Intelligence
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Generator Panel */}
          <div className="lg:col-span-1">
            <Card className="shadow-learning border-0 bg-card/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  Generate Learning Path
                </CardTitle>
                <CardDescription>
                  Create a personalized, structured learning experience powered by autonomous agents
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="topic">Learning Topic</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Autonomous Agents, Machine Learning..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="border-border/50 focus:border-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience Level & Goals</Label>
                  <Textarea
                    id="experience"
                    placeholder="Describe your current knowledge and what you want to achieve..."
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    rows={3}
                    className="border-border/50 focus:border-primary resize-none"
                  />
                </div>

                <Button 
                  onClick={handleGenerate}
                  disabled={!topic.trim() || isGenerating}
                  className="w-full bg-gradient-primary hover:opacity-90 transition-opacity shadow-learning"
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

                {/* Quick Stats */}
                <div className="pt-4 border-t border-border/30">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-primary">15-30</div>
                      <div className="text-xs text-muted-foreground">Minutes per module</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-accent">100%</div>
                      <div className="text-xs text-muted-foreground">Personalized</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* MCP Server Highlight */}
            <MCPServerHighlight />
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            {isGenerating && <GenerationProgress />}
            
            {generatedPath && !isGenerating && (
              <div className="space-y-6">
                {/* Path Overview */}
                <Card className="shadow-elevated border-0 bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">Autonomous Agents Learning Path</CardTitle>
                        <CardDescription>
                          Structured 5-module journey • ~100 minutes total
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Generated
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4">
                      <Progress value={0} className="flex-1" />
                      <span className="text-sm text-muted-foreground">0% Complete</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="border-learning-concept/30 text-learning-concept">
                        <FileText className="h-3 w-3 mr-1" />
                        3 Concepts
                      </Badge>
                      <Badge variant="outline" className="border-learning-coding/30 text-learning-coding">
                        <Code className="h-3 w-3 mr-1" />
                        1 Coding Lab
                      </Badge>
                      <Badge variant="outline" className="border-learning-video/30 text-learning-video">
                        <PlayCircle className="h-3 w-3 mr-1" />
                        1 Video
                      </Badge>
                      <Badge variant="outline" className="border-learning-mcq/30 text-learning-mcq">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        1 Assessment
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                {/* Learning Modules */}
                <div className="space-y-4">
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
              <Card className="shadow-learning border-0 bg-card/50 backdrop-blur-sm">
                <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="p-4 bg-gradient-primary rounded-2xl mb-4">
                    <Brain className="h-12 w-12 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Ready to Learn?</h3>
                  <p className="text-muted-foreground max-w-md">
                    Enter your learning topic and let our autonomous agents create a personalized, 
                    structured learning path with interactive content and real-time progress tracking.
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