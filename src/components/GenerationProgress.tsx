import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Sparkles, 
  Database, 
  Users, 
  CheckCircle,
  Loader2
} from "lucide-react";
import { useState, useEffect } from "react";

const generationSteps = [
  {
    id: 1,
    label: "Parsing Learning Context",
    description: "Analyzing topic complexity and user background",
    icon: Brain,
    duration: 600,
    thinking: [
      "Identifying key concepts in autonomous agents",
      "Mapping prerequisite knowledge gaps", 
      "Determining optimal learning sequence",
      "Assessing complexity level requirements"
    ]
  },
  {
    id: 2,
    label: "Consulting Expert Knowledge Base",
    description: "Accessing curated educational resources",
    icon: Database,
    duration: 800,
    thinking: [
      "Querying 50,000+ educational resources",
      "Cross-referencing industry best practices",
      "Validating content accuracy and relevance",
      "Selecting peer-reviewed case studies"
    ]
  },
  {
    id: 3,
    label: "Orchestrating MCP Agent Network",
    description: "Coordinating specialized learning agents",
    icon: Users,
    duration: 700,
    thinking: [
      "Activating Content Generation Agent",
      "Initializing Assessment Design Agent", 
      "Coordinating Code Environment Agent",
      "Synchronizing Progress Tracking Agent"
    ]
  },
  {
    id: 4,
    label: "Designing Learning Architecture",
    description: "Structuring optimal learning progression",
    icon: Sparkles,
    duration: 900,
    thinking: [
      "Calculating optimal module duration (15-30 min)",
      "Sequencing concepts for maximum retention",
      "Designing interactive coding challenges",
      "Creating adaptive assessment questions"
    ]
  },
  {
    id: 5,
    label: "Personalizing Content Delivery",
    description: "Tailoring experience to user preferences",
    icon: Brain,
    duration: 650,
    thinking: [
      "Adapting language complexity to user level",
      "Selecting relevant industry examples",
      "Customizing prerequisite recommendations",
      "Generating personalized practice scenarios"
    ]
  }
];

export function GenerationProgress() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (currentStep < generationSteps.length) {
        const stepProgress = (currentStep / generationSteps.length) * 100;
        const newProgress = Math.min(stepProgress + (Math.random() * 5), (currentStep + 1) / generationSteps.length * 100);
        setProgress(newProgress);

        if (newProgress >= (currentStep + 1) / generationSteps.length * 100) {
          setCurrentStep(prev => prev + 1);
        }
      }
    }, 100);

    return () => clearInterval(timer);
  }, [currentStep]);

  return (
    <Card className="shadow-elevated border-border/50 bg-gradient-to-br from-primary/10 to-accent/5">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-gradient-primary rounded-2xl">
              <Loader2 className="h-8 w-8 text-primary-foreground animate-spin" />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">Generating Your Learning Path</h3>
          <p className="text-muted-foreground text-sm">
            Our autonomous agents are creating a structured, personalized experience for you
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Generation Progress</span>
            <span className="text-muted-foreground">{Math.round(progress)}%</span>
          </div>
          
          <Progress value={progress} className="h-2" />

          <div className="space-y-3">
            {generationSteps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              
              return (
                <div 
                  key={step.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
                    isActive ? 'bg-primary/10 border border-primary/20' : 
                    isCompleted ? 'bg-success/5 border border-success/10' : 
                    'bg-muted/30 border border-border/30'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    isActive ? 'bg-primary/20' :
                    isCompleted ? 'bg-success/20' :
                    'bg-muted/50'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : (
                      <Icon className={`h-4 w-4 ${
                        isActive ? 'text-primary animate-pulse' : 'text-muted-foreground'
                      }`} />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`font-medium text-sm ${
                        isActive ? 'text-primary' :
                        isCompleted ? 'text-success' :
                        'text-muted-foreground'
                      }`}>
                        {step.label}
                      </span>
                      {isActive && (
                        <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                          Processing
                        </Badge>
                      )}
                      {isCompleted && (
                        <Badge variant="outline" className="text-xs border-success/30 text-success">
                          Complete
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {step.description}
                    </p>
                    
                    {/* Thinking Process - Show only for active step */}
                    {isActive && step.thinking && (
                      <div className="mt-2 p-2 bg-primary/5 rounded border border-primary/10">
                        <div className="text-xs font-medium text-primary mb-1">Thinking...</div>
                        <div className="space-y-1">
                          {step.thinking.map((thought, idx) => (
                            <div key={idx} className="flex items-center gap-1 text-xs text-muted-foreground">
                              <div className="h-1 w-1 bg-primary/60 rounded-full animate-pulse"></div>
                              <span>{thought}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-4 border-t border-border/30">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <div className="h-1.5 w-1.5 bg-mcp-primary rounded-full animate-pulse"></div>
              <span>MCP Server coordinating {generationSteps.length} specialized agents</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}