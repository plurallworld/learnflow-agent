import { useState, useEffect } from "react";
import { ChevronRight, ChevronDown, Loader2, CheckCircle, Clock } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AgentStep {
  id: string;
  agentName: string;
  action: string;
  description: string;
  details: string[];
  status: 'pending' | 'executing' | 'completed';
  duration?: number;
}

interface AgentExecutionSidebarProps {
  isGenerating: boolean;
}

export function AgentExecutionSidebar({ isGenerating }: AgentExecutionSidebarProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);

  const agentSteps: AgentStep[] = [
    {
      id: 'parsing',
      agentName: 'Context Parser Agent',
      action: 'Analyzing Learning Context',
      description: 'Processing topic complexity and user background',
      details: [
        'Extracting key concepts from "Autonomous Agents"',
        'Analyzing complexity level requirements',
        'Mapping prerequisite knowledge gaps',
        'Determining optimal learning sequence'
      ],
      status: 'pending'
    },
    {
      id: 'knowledge',
      agentName: 'Knowledge Base Agent',
      action: 'Consulting Expert Resources',
      description: 'Accessing curated educational databases',
      details: [
        'Querying 50,000+ educational resources',
        'Cross-referencing industry best practices',
        'Validating content accuracy and relevance',
        'Selecting peer-reviewed case studies'
      ],
      status: 'pending'
    },
    {
      id: 'orchestrator',
      agentName: 'Agent Orchestrator',
      action: 'Coordinating Learning Agents',
      description: 'Activating specialized learning agents',
      details: [
        'Initializing Content Generation Agent',
        'Activating Assessment Design Agent',
        'Starting Code Environment Agent',
        'Synchronizing Progress Tracking Agent'
      ],
      status: 'pending'
    },
    {
      id: 'architect',
      agentName: 'Learning Architect Agent',
      action: 'Designing Learning Structure',
      description: 'Creating optimal learning progression',
      details: [
        'Calculating optimal module duration (15-30 min)',
        'Sequencing concepts for maximum retention',
        'Designing interactive coding challenges',
        'Creating adaptive assessment questions'
      ],
      status: 'pending'
    },
    {
      id: 'personalizer',
      agentName: 'Personalization Agent',
      action: 'Customizing Content Delivery',
      description: 'Tailoring experience to user preferences',
      details: [
        'Adapting language complexity to user level',
        'Selecting relevant industry examples',
        'Customizing prerequisite recommendations',
        'Generating personalized practice scenarios'
      ],
      status: 'pending'
    }
  ];

  const [steps, setSteps] = useState(agentSteps);

  useEffect(() => {
    if (!isGenerating) {
      setCurrentStep(0);
      setSteps(agentSteps.map(step => ({ ...step, status: 'pending' })));
      setExpandedStep(null);
      return;
    }

    const timer = setInterval(() => {
      setSteps(prevSteps => {
        const newSteps = [...prevSteps];
        
        // Mark current step as executing
        if (currentStep < newSteps.length) {
          newSteps[currentStep].status = 'executing';
          setExpandedStep(newSteps[currentStep].id);
        }
        
        // Mark previous steps as completed
        for (let i = 0; i < currentStep; i++) {
          newSteps[i].status = 'completed';
        }
        
        return newSteps;
      });
      
      if (currentStep < agentSteps.length - 1) {
        const stepDuration = 800 + Math.random() * 400; // 800-1200ms per step
        setTimeout(() => {
          setCurrentStep(prev => prev + 1);
        }, stepDuration);
      }
    }, 100);

    return () => clearInterval(timer);
  }, [isGenerating, currentStep]);

  const toggleStep = (stepId: string) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  if (!isGenerating && currentStep === 0) {
    return null;
  }

  return (
    <Sidebar className="w-80 border-r border-border/50">
      <SidebarHeader className="border-b border-border/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-primary/20 rounded">
              <Loader2 className={cn(
                "h-4 w-4 text-primary",
                isGenerating && "animate-spin"
              )} />
            </div>
            <div>
              <h3 className="text-sm font-semibold">Agent Execution</h3>
              <p className="text-xs text-muted-foreground">
                {isGenerating ? 'Generating learning path...' : 'Generation complete'}
              </p>
            </div>
          </div>
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium mb-3">
            Generation Pipeline
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <div className="space-y-2">
              {steps.map((step, index) => {
                const isExpanded = expandedStep === step.id;
                const isCurrentlyExecuting = step.status === 'executing';
                
                return (
                  <div
                    key={step.id}
                    className={cn(
                      "rounded-lg border transition-all duration-200",
                      step.status === 'completed' && "border-success/20 bg-success/5",
                      step.status === 'executing' && "border-primary/30 bg-primary/5",
                      step.status === 'pending' && "border-border/30 bg-muted/30"
                    )}
                  >
                    <button
                      onClick={() => toggleStep(step.id)}
                      className="w-full p-3 text-left hover:bg-muted/20 rounded-lg transition-colors"
                      disabled={step.status === 'pending'}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "p-1.5 rounded",
                          step.status === 'completed' && "bg-success/20",
                          step.status === 'executing' && "bg-primary/20",
                          step.status === 'pending' && "bg-muted/50"
                        )}>
                          {step.status === 'completed' && (
                            <CheckCircle className="h-3 w-3 text-success" />
                          )}
                          {step.status === 'executing' && (
                            <Loader2 className="h-3 w-3 text-primary animate-spin" />
                          )}
                          {step.status === 'pending' && (
                            <Clock className="h-3 w-3 text-muted-foreground" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className={cn(
                              "text-xs font-medium truncate",
                              step.status === 'completed' && "text-success",
                              step.status === 'executing' && "text-primary",
                              step.status === 'pending' && "text-muted-foreground"
                            )}>
                              {step.agentName}
                            </span>
                            <Badge 
                              variant="outline" 
                              className={cn(
                                "text-xs px-1.5 py-0",
                                step.status === 'completed' && "border-success/30 text-success",
                                step.status === 'executing' && "border-primary/30 text-primary",
                                step.status === 'pending' && "border-muted-foreground/30 text-muted-foreground"
                              )}
                            >
                              {step.status === 'completed' ? 'Done' : 
                               step.status === 'executing' ? 'Running' : 'Waiting'}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground truncate mt-0.5">
                            {step.action}
                          </p>
                        </div>
                        
                        {(step.status === 'executing' || step.status === 'completed') && (
                          <div className="ml-2">
                            {isExpanded ? (
                              <ChevronDown className="h-3 w-3 text-muted-foreground" />
                            ) : (
                              <ChevronRight className="h-3 w-3 text-muted-foreground" />
                            )}
                          </div>
                        )}
                      </div>
                    </button>
                    
                    {isExpanded && (step.status === 'executing' || step.status === 'completed') && (
                      <div className="px-3 pb-3">
                        <div className="ml-6 pl-3 border-l border-border/30">
                          <p className="text-xs text-muted-foreground mb-2">
                            {step.description}
                          </p>
                          <div className="space-y-1">
                            {step.details.map((detail, detailIndex) => (
                              <div 
                                key={detailIndex}
                                className="flex items-start gap-2 text-xs"
                              >
                                <div className={cn(
                                  "h-1 w-1 rounded-full mt-1.5 flex-shrink-0",
                                  isCurrentlyExecuting ? "bg-primary animate-pulse" : "bg-success"
                                )} />
                                <span className="text-muted-foreground leading-relaxed">
                                  {detail}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}