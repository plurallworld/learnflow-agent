import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ChevronLeft, 
  ChevronRight, 
  Brain,
  Network,
  Cog,
  Eye,
  Zap,
  Target,
  MessageSquare,
  Database
} from "lucide-react";

interface DeepDiveProps {
  onComplete: () => void;
  onBack: () => void;
}

export function DeepDiveAgentFundamentals({ onComplete, onBack }: DeepDiveProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);

  const sections = [
    {
      id: 'architecture',
      title: 'Agent Architecture Deep Dive',
      icon: Brain,
      content: {
        overview: 'Understanding the internal structure and components of autonomous agents',
        details: [
          'Perception Module: How agents sense their environment',
          'Decision Engine: The cognitive core that processes information',
          'Action Interface: How agents interact with the world',
          'Memory Systems: Short-term and long-term information storage'
        ]
      }
    },
    {
      id: 'decision-making',
      title: 'Decision-Making Processes',
      icon: Target,
      content: {
        overview: 'How agents evaluate options and choose actions',
        details: [
          'Goal-based reasoning: Working backwards from objectives',
          'Utility functions: Quantifying preferences and trade-offs',
          'Planning algorithms: Sequence of actions to reach goals',
          'Real-time adaptation: Adjusting plans when conditions change'
        ]
      }
    },
    {
      id: 'communication',
      title: 'Multi-Agent Communication',
      icon: MessageSquare,
      content: {
        overview: 'How multiple agents coordinate and share information',
        details: [
          'Message passing protocols: Structured communication',
          'Consensus mechanisms: Agreeing on shared decisions',
          'Coordination strategies: Working together efficiently',
          'Conflict resolution: Handling disagreements between agents'
        ]
      }
    }
  ];

  const handleSectionComplete = () => {
    if (!completedSections.includes(currentSection)) {
      setCompletedSections([...completedSections, currentSection]);
    }
    
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      onComplete();
    }
  };

  const progress = ((completedSections.length) / sections.length) * 100;
  const currentSectionData = sections[currentSection];
  const CurrentIcon = currentSectionData.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to Module
        </Button>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-xs">
            Deep Dive: Autonomous Agent Fundamentals
          </Badge>
          <Badge variant="outline" className="text-xs text-primary border-primary/30">
            12 min
          </Badge>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Deep Dive Progress</span>
          <span className="text-muted-foreground">{completedSections.length} of {sections.length} completed</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Section Navigation */}
      <div className="grid grid-cols-3 gap-4">
        {sections.map((section, index) => {
          const Icon = section.icon;
          const isActive = index === currentSection;
          const isCompleted = completedSections.includes(index);
          
          return (
            <button
              key={section.id}
              onClick={() => setCurrentSection(index)}
              className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                isActive ? 'bg-primary/20 border-primary/30' :
                isCompleted ? 'bg-success/10 border-success/20' :
                'bg-muted/30 border-border/30 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Icon className={`h-5 w-5 ${
                  isActive ? 'text-primary' :
                  isCompleted ? 'text-success' :
                  'text-muted-foreground'
                }`} />
                <span className="text-sm font-medium">{section.title}</span>
              </div>
              {isCompleted && (
                <Badge variant="outline" className="text-xs border-success/30 text-success">
                  Completed
                </Badge>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Content */}
      <Card className="shadow-elevated border-border/50 bg-gradient-card min-h-[600px]">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-primary/20 rounded-lg">
              <CurrentIcon className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-xl">{currentSectionData.title}</CardTitle>
          </div>
          <p className="text-muted-foreground">{currentSectionData.content.overview}</p>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="concepts" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="concepts">Core Concepts</TabsTrigger>
              <TabsTrigger value="diagram">Interactive Diagram</TabsTrigger>
              <TabsTrigger value="examples">Real Examples</TabsTrigger>
            </TabsList>
            
            <TabsContent value="concepts" className="mt-6 space-y-4">
              {currentSectionData.content.details.map((detail, index) => (
                <div key={index} className="p-4 bg-muted/20 rounded-lg border border-border/30">
                  <div className="flex items-start gap-3">
                    <div className="p-1 bg-primary/20 rounded text-primary font-bold text-sm min-w-[24px] text-center">
                      {index + 1}
                    </div>
                    <p className="text-sm font-medium">{detail}</p>
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="diagram" className="mt-6">
              <div className="bg-muted/20 rounded-lg border border-border/30 p-8 text-center">
                <div className="space-y-6">
                  {/* Interactive Diagram Placeholder */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                    <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                      <Eye className="h-8 w-8 text-primary mx-auto mb-2" />
                      <span className="text-sm font-medium">Perception</span>
                    </div>
                    <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                      <Brain className="h-8 w-8 text-accent mx-auto mb-2" />
                      <span className="text-sm font-medium">Processing</span>
                    </div>
                    <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                      <Target className="h-8 w-8 text-warning mx-auto mb-2" />
                      <span className="text-sm font-medium">Decision</span>
                    </div>
                    <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                      <Zap className="h-8 w-8 text-success mx-auto mb-2" />
                      <span className="text-sm font-medium">Action</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Click on each component to explore how it works in detail
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="examples" className="mt-6 space-y-4">
              <div className="grid gap-4">
                <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/5 rounded-lg border border-primary/20">
                  <h4 className="font-medium mb-2">🚗 Autonomous Vehicle</h4>
                  <p className="text-sm text-muted-foreground">
                    Uses cameras and sensors (perception) to process road conditions (decision-making) and control steering/braking (actions)
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-accent/10 to-success/5 rounded-lg border border-accent/20">
                  <h4 className="font-medium mb-2">🤖 Trading Bot</h4>
                  <p className="text-sm text-muted-foreground">
                    Monitors market data (perception), analyzes trends (decision-making), and executes trades (actions)
                  </p>
                </div>
                <div className="p-4 bg-gradient-to-r from-success/10 to-warning/5 rounded-lg border border-success/20">
                  <h4 className="font-medium mb-2">🏠 Smart Home System</h4>
                  <p className="text-sm text-muted-foreground">
                    Senses occupancy and temperature (perception), optimizes comfort and energy (decision-making), adjusts devices (actions)
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
          disabled={currentSection === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous Section
        </Button>

        <div className="text-center">
          <p className="text-sm font-medium">Section {currentSection + 1} of {sections.length}</p>
          <p className="text-xs text-muted-foreground">{currentSectionData.title}</p>
        </div>

        <Button 
          onClick={handleSectionComplete}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90"
        >
          {currentSection === sections.length - 1 ? 'Complete Deep Dive' : 'Next Section'}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}