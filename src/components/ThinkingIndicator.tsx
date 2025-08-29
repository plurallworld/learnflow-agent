import { useState, useEffect } from "react";
import { Brain, FileText, Edit3, Trash2, Plus, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ThinkingIndicatorProps {
  isGenerating: boolean;
}

interface Action {
  type: 'edit' | 'create' | 'delete';
  file: string;
  description: string;
}

export function ThinkingIndicator({ isGenerating }: ThinkingIndicatorProps) {
  const [thinkingTime, setThinkingTime] = useState(0);
  const [currentAction, setCurrentAction] = useState("");
  const [completedActions, setCompletedActions] = useState<Action[]>([]);
  const [isThinking, setIsThinking] = useState(true);

  const actions: Action[] = [
    {
      type: 'create',
      file: 'LearningModule_Fundamentals.tsx',
      description: 'Creating autonomous agent fundamentals module'
    },
    {
      type: 'create', 
      file: 'CaseStudy_MultiAgent.tsx',
      description: 'Generating multi-agent communication case study'
    },
    {
      type: 'create',
      file: 'CodingLab_FirstAgent.tsx', 
      description: 'Building hands-on coding environment'
    },
    {
      type: 'edit',
      file: 'VideoContent_Architecture.tsx',
      description: 'Customizing video content for user level'
    },
    {
      type: 'create',
      file: 'Assessment_Knowledge.tsx',
      description: 'Designing adaptive assessment questions'
    }
  ];

  useEffect(() => {
    if (!isGenerating) {
      setThinkingTime(0);
      setCompletedActions([]);
      setCurrentAction("");
      setIsThinking(true);
      return;
    }

    // Thinking phase
    const thinkingTimer = setInterval(() => {
      setThinkingTime(prev => prev + 1);
    }, 1000);

    // Stop thinking after 3-7 seconds
    const thinkingDuration = 3 + Math.random() * 4;
    
    setTimeout(() => {
      setIsThinking(false);
      clearInterval(thinkingTimer);
      
      // Start executing actions
      let actionIndex = 0;
      const executeAction = () => {
        if (actionIndex < actions.length) {
          const action = actions[actionIndex];
          setCurrentAction(action.description);
          
          setTimeout(() => {
            setCompletedActions(prev => [...prev, action]);
            setCurrentAction("");
            actionIndex++;
            executeAction();
          }, 1200 + Math.random() * 800);
        }
      };
      
      executeAction();
    }, thinkingDuration * 1000);

    return () => {
      clearInterval(thinkingTimer);
    };
  }, [isGenerating]);

  if (!isGenerating && thinkingTime === 0) {
    return null;
  }

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'create': return Plus;
      case 'edit': return Edit3;
      case 'delete': return Trash2;
      default: return FileText;
    }
  };

  const getActionColor = (type: string) => {
    switch (type) {
      case 'create': return 'text-success';
      case 'edit': return 'text-warning';
      case 'delete': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card className="mt-4 shadow-card border-border/50 bg-gradient-card">
      <CardContent className="p-4">
        {/* Thinking Phase */}
        {isThinking && (
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Brain className="h-4 w-4 text-primary animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Thought for {thinkingTime} seconds</span>
                <Loader2 className="h-3 w-3 animate-spin text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">
                Analyzing learning requirements and structuring content...
              </p>
            </div>
          </div>
        )}

        {/* Action Description */}
        {!isThinking && (
          <div className="mb-4">
            <p className="text-sm font-medium mb-2">
              I'll create a structured learning path with personalized modules for autonomous agents.
            </p>
            <p className="text-sm text-muted-foreground">
              Generating interactive content tailored to your experience level and learning goals.
            </p>
          </div>
        )}

        {/* Current Action */}
        {currentAction && (
          <div className="flex items-center gap-2 mb-3 p-2 bg-primary/10 rounded border border-primary/20">
            <Loader2 className="h-3 w-3 animate-spin text-primary" />
            <span className="text-xs font-medium text-primary">{currentAction}</span>
          </div>
        )}

        {/* Completed Actions */}
        {completedActions.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-medium text-muted-foreground">Generated Files:</span>
              <Badge variant="outline" className="text-xs border-success/30 text-success">
                {completedActions.length} modules
              </Badge>
            </div>
            
            {completedActions.map((action, index) => {
              const Icon = getActionIcon(action.type);
              return (
                <div key={index} className="flex items-center gap-2 p-2 bg-muted/20 rounded border border-border/30">
                  <Icon className={`h-3 w-3 ${getActionColor(action.type)}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs px-1.5 py-0 capitalize ${
                          action.type === 'create' ? 'border-success/30 text-success' :
                          action.type === 'edit' ? 'border-warning/30 text-warning' :
                          'border-destructive/30 text-destructive'
                        }`}
                      >
                        {action.type}
                      </Badge>
                      <span className="text-xs font-medium truncate">{action.file}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{action.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}