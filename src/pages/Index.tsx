import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, Search, ArrowUp, Trash2, Upload, Settings } from "lucide-react";

interface LearningPath {
  id: string;
  title: string;
  description: string;
  modules: number;
  created: string;
}

const Index = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  
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
    if (!prompt.trim()) return;
    setIsGenerating(true);
    
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      setPrompt("");
    }, 3000);
  };

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-border/10 bg-background/95 backdrop-blur-sm">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <Brain className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold tracking-tight">DeepCoach</span>
          </div>
          <div className="hidden md:flex items-center space-x-8 text-sm text-muted-foreground font-medium">
            <span className="hover:text-foreground transition-colors cursor-pointer">Community</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Pricing</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Enterprise</span>
            <span className="hover:text-foreground transition-colors cursor-pointer">Learn</span>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
            <Search className="h-4 w-4" />
          </Button>
          <div className="w-9 h-9 rounded-full bg-gradient-primary text-white flex items-center justify-center text-sm font-semibold shadow-md">
            A
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-8 py-20 bg-gradient-hero text-white min-h-[75vh]">
        <div className="text-center space-y-12 max-w-5xl">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
              Build something{" "}
              <Heart className="inline h-12 w-12 md:h-16 md:w-16 text-pink-400 fill-current" />{" "}
              DeepCoach
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Create personalized learning paths with AI
            </p>
          </div>

          <div className="w-full max-w-2xl">
            <div className="group">
              <div className="flex items-center bg-white/10 backdrop-blur-md rounded-xl px-5 py-4 border border-white/20 shadow-2xl transition-all duration-300 group-hover:bg-white/15 group-hover:border-white/30 group-hover:shadow-elevated">
                <Input
                  placeholder="Describe what you want to learn..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="flex-1 border-0 bg-transparent text-white placeholder:text-white/50 focus-visible:ring-0 text-base h-auto py-2"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      generatePath();
                    }
                  }}
                />
                <div className="flex items-center gap-2 ml-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200"
                  >
                    <Upload className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-white/60 hover:text-white hover:bg-white/10 rounded-md transition-all duration-200"
                  >
                    <Settings className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    onClick={generatePath}
                    disabled={isGenerating || !prompt.trim()}
                    size="sm"
                    className="ml-1 bg-white text-gray-900 hover:bg-white/90 h-10 w-10 p-0 rounded-lg shadow-lg transition-all duration-200 disabled:opacity-50"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Workspace */}
      <div className="bg-background px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold tracking-tight">Workspace</h2>
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              View all
            </Button>
          </div>
          
          <div className="flex items-center gap-4 mb-8">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search learning paths..."
                className="pl-12 h-11 bg-muted/30 border-border/50 focus:border-ring"
              />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-11">
                Recent
              </Button>
              <Button variant="outline" size="sm" className="h-11">
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