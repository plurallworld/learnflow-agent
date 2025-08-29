import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Code, 
  PlayCircle, 
  CheckCircle, 
  BookOpen, 
  Clock,
  ArrowRight,
  Lock,
  ChevronLeft,
  Target,
  Brain,
  Users,
  Lightbulb,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { CoreConceptsOverview } from "./learning/CoreConceptsOverview";
import { DeepDiveAgentFundamentals } from "./learning/DeepDiveAgentFundamentals";
import { RealWorldApplications } from "./learning/RealWorldApplications";
import { KnowledgeValidation } from "./learning/KnowledgeValidation";

interface ModuleComponent {
  id: string;
  type: 'concept' | 'case' | 'coding' | 'video' | 'mcq' | 'simulation';
  title: string;
  duration: string;
  description: string;
  order: number;
}

interface DetailedModuleViewProps {
  module: {
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
  };
  moduleNumber: number;
  onBack: () => void;
  onModuleComplete?: () => void;
}

export function DetailedModuleView({ module, moduleNumber, onBack, onModuleComplete }: DetailedModuleViewProps) {
  const [currentComponent, setCurrentComponent] = useState<string | null>(null);
  const [completedComponents, setCompletedComponents] = useState<string[]>([]);

  // Generate components based on module type and content
  const getModuleComponents = (): ModuleComponent[] => {
    const baseComponents: ModuleComponent[] = [
      {
        id: 'intro-concept',
        type: 'concept',
        title: 'Core Concepts Overview',
        duration: '5 min',
        description: 'Interactive introduction to key concepts with visual explanations',
        order: 1
      }
    ];

    // Add type-specific components
    if (module.type === 'concept') {
      baseComponents.push(
        {
          id: 'deep-dive',
          type: 'concept',
          title: 'Deep Dive: ' + module.title,
          duration: '12 min',
          description: 'Comprehensive exploration with interactive diagrams and examples',
          order: 2
        },
        {
          id: 'practical-examples',
          type: 'case',
          title: 'Real-World Applications',
          duration: '8 min',
          description: 'Industry examples and use cases to cement understanding',
          order: 3
        }
      );
    } else if (module.type === 'case') {
      baseComponents.push(
        {
          id: 'case-study',
          type: 'case',
          title: module.title,
          duration: '15 min',
          description: 'Step-by-step analysis of real-world scenario',
          order: 2
        },
        {
          id: 'decision-points',
          type: 'simulation',
          title: 'Decision Simulation',
          duration: '10 min',
          description: 'Interactive simulation where you make key decisions',
          order: 3
        }
      );
    } else if (module.type === 'coding') {
      baseComponents.push(
        {
          id: 'coding-environment',
          type: 'coding',
          title: 'Code Along Session',
          duration: '15 min',
          description: 'Browser-based coding with live feedback and hints',
          order: 2
        },
        {
          id: 'challenge',
          type: 'coding',
          title: 'Coding Challenge',
          duration: '5 min',
          description: 'Apply what you learned in a guided challenge',
          order: 3
        }
      );
    } else if (module.type === 'video') {
      baseComponents.push(
        {
          id: 'main-video',
          type: 'video',
          title: module.title,
          duration: '12 min',
          description: 'Interactive video with clickable elements and notes',
          order: 2
        },
        {
          id: 'key-insights',
          type: 'concept',
          title: 'Key Insights Summary',
          duration: '3 min',
          description: 'Highlight key takeaways with visual summaries',
          order: 3
        }
      );
    }

    // Always end with assessment
    baseComponents.push({
      id: 'knowledge-check',
      type: 'mcq',
      title: 'Knowledge Validation',
      duration: '5 min',
      description: 'Adaptive questions to validate your understanding',
      order: 4
    });

    return baseComponents.sort((a, b) => a.order - b.order);
  };

  const components = getModuleComponents();
  const totalDuration = components.reduce((acc, comp) => {
    const minutes = parseInt(comp.duration);
    return acc + minutes;
  }, 0);

  const getComponentIcon = (type: string) => {
    switch (type) {
      case 'concept': return FileText;
      case 'case': return BookOpen;
      case 'coding': return Code;
      case 'video': return PlayCircle;
      case 'mcq': return CheckCircle;
      case 'simulation': return Brain;
      default: return FileText;
    }
  };

  const getComponentColor = (type: string) => {
    switch (type) {
      case 'concept': return 'text-primary';
      case 'case': return 'text-accent';
      case 'coding': return 'text-learning-secondary';
      case 'video': return 'text-warning';
      case 'mcq': return 'text-success';
      case 'simulation': return 'text-purple-500';
      default: return 'text-primary';
    }
  };

  const handleComponentComplete = (componentId: string) => {
    if (!completedComponents.includes(componentId)) {
      const newCompleted = [...completedComponents, componentId];
      setCompletedComponents(newCompleted);
      
      // Check if all components are completed
      if (newCompleted.length === components.length && onModuleComplete) {
        onModuleComplete();
      }
    }
    setCurrentComponent(null);
  };

  // If viewing a specific component, render that component
  if (currentComponent) {
    switch (currentComponent) {
      case 'intro-concept':
        return (
          <CoreConceptsOverview 
            onComplete={() => handleComponentComplete('intro-concept')}
            onBack={() => setCurrentComponent(null)}
          />
        );
      case 'deep-dive':
        return (
          <DeepDiveAgentFundamentals 
            onComplete={() => handleComponentComplete('deep-dive')}
            onBack={() => setCurrentComponent(null)}
          />
        );
      case 'practical-examples':
        return (
          <RealWorldApplications 
            onComplete={() => handleComponentComplete('practical-examples')}
            onBack={() => setCurrentComponent(null)}
          />
        );
      case 'knowledge-check':
        return (
          <KnowledgeValidation 
            onComplete={() => handleComponentComplete('knowledge-check')}
            onBack={() => setCurrentComponent(null)}
          />
        );
      default:
        setCurrentComponent(null);
        break;
    }
  }

  const getComponentBg = (type: string) => {
    switch (type) {
      case 'concept': return 'bg-primary/10 border-primary/20';
      case 'case': return 'bg-accent/10 border-accent/20';
      case 'coding': return 'bg-learning-secondary/10 border-learning-secondary/20';
      case 'video': return 'bg-warning/10 border-warning/20';
      case 'mcq': return 'bg-success/10 border-success/20';
      case 'simulation': return 'bg-purple-500/10 border-purple-500/20';
      default: return 'bg-primary/10 border-primary/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to Learning Path
        </Button>
      </div>

      {/* Module Overview */}
      <Card className="shadow-card border-border/50 bg-gradient-card">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="text-xs">
                  Module {moduleNumber}
                </Badge>
                <Badge variant="outline" className="text-xs text-primary border-primary/30">
                  {totalDuration} minutes
                </Badge>
              </div>
              <CardTitle className="text-xl">{module.title}</CardTitle>
              <p className="text-muted-foreground mt-1">{module.description}</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Module Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Module Progress</span>
              <span className="text-xs text-muted-foreground">
                {completedComponents.length}/{components.length} components completed
              </span>
            </div>
            <Progress 
              value={(completedComponents.length / components.length) * 100} 
              className="h-2" 
            />
          </div>

          {/* What You'll Be Able To Do */}
          <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/5 rounded-lg border border-primary/20 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-5 w-5 text-primary" />
              <span className="font-semibold text-primary">What You'll Be Able To Do</span>
            </div>
            <p className="text-foreground font-medium">{module.outcome}</p>
          </div>

          {/* Key Skills & Applications */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-3 bg-muted/30 rounded-lg border border-border/30">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium">Key Skills</span>
              </div>
              <div className="space-y-1">
                {module.keyTopics.map((topic, idx) => (
                  <div key={idx} className="text-xs text-muted-foreground flex items-center gap-1">
                    <Lightbulb className="h-3 w-3" />
                    {topic}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-muted/30 rounded-lg border border-border/30">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 text-warning" />
                <span className="text-sm font-medium">Prerequisites</span>
              </div>
              <div className="space-y-1">
                {module.prerequisites.map((prereq, idx) => (
                  <div key={idx} className="text-xs text-muted-foreground">
                    • {prereq}
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 bg-muted/30 rounded-lg border border-border/30">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">What's Next</span>
              </div>
              <div className="space-y-1">
                {module.nextSteps.map((step, idx) => (
                  <div key={idx} className="text-xs text-muted-foreground">
                    • {step}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Components */}
      <Card className="shadow-card border-border/50 bg-gradient-card">
        <CardHeader>
          <CardTitle className="text-lg">Learning Journey</CardTitle>
          <p className="text-sm text-muted-foreground">
            Complete each component in order to master this module
          </p>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {components.map((component, index) => {
              const Icon = getComponentIcon(component.type);
              const isCompleted = completedComponents.includes(component.id);
              
              return (
                <div key={component.id}>
                  <div 
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 cursor-pointer hover:shadow-md",
                      getComponentBg(component.type),
                      isCompleted && "bg-success/10 border-success/20"
                    )}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className="p-2 bg-background/50 rounded-lg">
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5 text-success" />
                        ) : (
                          <Icon className={cn("h-5 w-5", getComponentColor(component.type))} />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">{component.title}</span>
                          <Badge variant="outline" className="text-xs">
                            {component.duration}
                          </Badge>
                          {isCompleted && (
                            <Badge variant="outline" className="text-xs border-success/30 text-success">
                              Completed
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {component.description}
                        </p>
                      </div>
                    </div>
                    
                    <Button 
                      size="sm" 
                      className="bg-primary hover:bg-primary/90"
                      onClick={() => setCurrentComponent(component.id)}
                    >
                      {isCompleted ? 'Review' : 'Start'}
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                  
                  {index < components.length - 1 && (
                    <div className="flex justify-center py-2">
                      <div className="h-8 w-px bg-border/50"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}