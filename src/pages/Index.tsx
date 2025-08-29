import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Heart, Search, ArrowUp, Trash2 } from "lucide-react";

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
      <nav className="flex items-center justify-between px-6 py-4 border-b border-border/20">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-semibold">DeepCoach</span>
          </div>
          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <span>Community</span>
            <span>Pricing</span>
            <span>Enterprise</span>
            <span>Learn</span>
            <span>Launched</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Search className="h-4 w-4" />
          </Button>
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">
            A
          </div>
          <span className="text-sm">Ankur's DeepCoach</span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center px-6 py-24 bg-gradient-hero text-white">
        <div className="text-center space-y-8 max-w-4xl">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold">
              Build something{" "}
              <Heart className="inline h-12 w-12 text-orange-400 fill-current" />{" "}
              DeepCoach
            </h1>
            <p className="text-xl opacity-80 max-w-md mx-auto">
              Create learning paths by chatting with AI
            </p>
          </div>

          <div className="w-full max-w-2xl">
            <div className="relative bg-black/20 backdrop-blur-sm rounded-xl p-1">
              <div className="flex items-center bg-black/40 rounded-lg px-4 py-4">
                <Input
                  placeholder="Ask DeepCoach to create a learning path..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="flex-1 border-0 bg-transparent text-white placeholder:text-white/60 focus-visible:ring-0 text-lg"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      generatePath();
                    }
                  }}
                />
                <Button
                  onClick={generatePath}
                  disabled={isGenerating || !prompt.trim()}
                  size="sm"
                  className="ml-3 bg-white/20 hover:bg-white/30 border-0"
                >
                  <ArrowUp className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Workspace */}
      <div className="bg-background px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Ankur's DeepCoach Workspace</h2>
            <span className="text-sm text-muted-foreground">View All</span>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-10 w-64 bg-muted/50"
              />
            </div>
            <Button variant="outline" size="sm">
              Last edited
            </Button>
            <Button variant="outline" size="sm">
              Newest first
            </Button>
            <Button variant="outline" size="sm">
              All creators
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {existingPaths.map((path) => (
              <Card key={path.id} className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="space-y-4">
                  <div className="aspect-video bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Brain className="h-12 w-12 text-white/80" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">{path.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {path.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{path.modules} modules</span>
                    <span>{path.created}</span>
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