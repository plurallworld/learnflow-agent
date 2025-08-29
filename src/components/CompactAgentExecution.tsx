import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight, Loader2, CheckCircle } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface AgentStep {
  id: string;
  agentName: string;
  action: string;
  details: string[];
  status: 'pending' | 'executing' | 'completed';
}

interface CompactAgentExecutionProps {
  isGenerating: boolean;
}

export function CompactAgentExecution({ isGenerating }: CompactAgentExecutionProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOpen, setIsOpen] = useState(true);
  const [currentDetailIndex, setCurrentDetailIndex] = useState(0);

  const agentSteps: AgentStep[] = [
    {
      id: 'parsing',
      agentName: 'Context Parser',
      action: 'Analyzing learning context',
      details: [
        'Extracting key concepts from topic',
        'Analyzing complexity requirements',
        'Mapping prerequisite gaps',
        'Determining learning sequence'
      ],
      status: 'pending'
    },
    {
      id: 'knowledge',
      agentName: 'Knowledge Base',
      action: 'Consulting expert resources',
      details: [
        'Querying educational databases',
        'Cross-referencing best practices',
        'Validating content accuracy',
        'Selecting case studies'
      ],
      status: 'pending'
    },
    {
      id: 'orchestrator',
      agentName: 'Agent Orchestrator',
      action: 'Coordinating learning agents',
      details: [
        'Initializing Content Agent',
        'Activating Assessment Agent',
        'Starting Code Environment',
        'Synchronizing Progress Tracker'
      ],
      status: 'pending'
    },
    {
      id: 'architect',
      agentName: 'Learning Architect',
      action: 'Designing structure',
      details: [
        'Calculating module duration',
        'Sequencing concepts',
        'Designing challenges',
        'Creating assessments'
      ],
      status: 'pending'
    },
    {
      id: 'personalizer',
      agentName: 'Personalizer',
      action: 'Customizing delivery',
      details: [
        'Adapting language complexity',
        'Selecting industry examples',
        'Customizing prerequisites',
        'Generating scenarios'
      ],
      status: 'pending'
    }
  ];

  useEffect(() => {
    if (!isGenerating) {
      setCurrentStep(0);
      setCurrentDetailIndex(0);
      setIsOpen(true);
      return;
    }

    let stepTimer: NodeJS.Timeout;
    let detailTimer: NodeJS.Timeout;

    // Start with first step
    setCurrentStep(0);
    setCurrentDetailIndex(0);

    const processStep = (stepIndex: number) => {
      if (stepIndex >= agentSteps.length) return;

      const step = agentSteps[stepIndex];
      setCurrentDetailIndex(0);

      // Process each detail line by line
      const processDetails = (detailIndex: number) => {
        if (detailIndex < step.details.length) {
          setCurrentDetailIndex(detailIndex);
          detailTimer = setTimeout(() => {
            processDetails(detailIndex + 1);
          }, 600);
        } else {
          // Move to next step after completing current step
          stepTimer = setTimeout(() => {
            if (stepIndex < agentSteps.length - 1) {
              setCurrentStep(stepIndex + 1);
              processStep(stepIndex + 1);
            }
          }, 500);
        }
      };

      processDetails(0);
    };

    processStep(0);

    return () => {
      clearTimeout(stepTimer);
      clearTimeout(detailTimer);
    };
  }, [isGenerating]);

  if (!isGenerating && currentStep === 0) {
    return null;
  }

  const currentAgent = agentSteps[currentStep];

  return (
    <div className="mt-3 pt-3 border-t border-border/30">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-muted/20 rounded text-left">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-primary/20 rounded">
              <Loader2 className={cn(
                "h-3 w-3 text-primary",
                isGenerating && "animate-spin"
              )} />
            </div>
            <span className="text-xs font-medium">Agent Execution</span>
            <Badge variant="outline" className="text-xs px-1.5 py-0 border-primary/30 text-primary">
              {isGenerating ? 'Running' : 'Complete'}
            </Badge>
          </div>
          {isOpen ? (
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-3 w-3 text-muted-foreground" />
          )}
        </CollapsibleTrigger>
        
        <CollapsibleContent>
          <div className="p-2 mt-2 bg-muted/20 rounded border border-border/30">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1 bg-primary/20 rounded">
                {isGenerating ? (
                  <Loader2 className="h-3 w-3 text-primary animate-spin" />
                ) : (
                  <CheckCircle className="h-3 w-3 text-success" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-medium text-primary truncate">
                  {currentAgent?.agentName || 'Generation Complete'}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {currentAgent?.action || 'All agents finished successfully'}
                </div>
              </div>
            </div>
            
            {isGenerating && currentAgent && (
              <div className="ml-5 space-y-1">
                {currentAgent.details.slice(0, currentDetailIndex + 1).map((detail, index) => (
                  <div 
                    key={index}
                    className={cn(
                      "flex items-start gap-2 text-xs transition-opacity duration-300",
                      index === currentDetailIndex ? "opacity-100" : "opacity-60"
                    )}
                  >
                    <div className={cn(
                      "h-1 w-1 rounded-full mt-1.5 flex-shrink-0",
                      index === currentDetailIndex ? "bg-primary animate-pulse" : "bg-success"
                    )} />
                    <span className="text-muted-foreground leading-relaxed">
                      {detail}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}