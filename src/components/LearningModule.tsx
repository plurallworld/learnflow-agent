import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Code, 
  PlayCircle, 
  CheckCircle, 
  BookOpen, 
  Clock,
  ArrowRight,
  Lock
} from "lucide-react";
import { cn } from "@/lib/utils";

interface LearningModuleProps {
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
  onModuleClick: (module: any) => void;
}

const moduleTypeConfig = {
  concept: {
    icon: FileText,
    label: "Concept",
    color: "learning-concept",
    bgClass: "bg-learning-concept/10",
    borderClass: "border-learning-concept/20",
    textClass: "text-learning-concept"
  },
  case: {
    icon: BookOpen,
    label: "Case Study",
    color: "learning-case",
    bgClass: "bg-learning-case/10",
    borderClass: "border-learning-case/20",
    textClass: "text-learning-case"
  },
  coding: {
    icon: Code,
    label: "Coding Lab",
    color: "learning-coding",
    bgClass: "bg-learning-coding/10",
    borderClass: "border-learning-coding/20",
    textClass: "text-learning-coding"
  },
  video: {
    icon: PlayCircle,
    label: "Video",
    color: "learning-video",
    bgClass: "bg-learning-video/10",
    borderClass: "border-learning-video/20",
    textClass: "text-learning-video"
  },
  mcq: {
    icon: CheckCircle,
    label: "Assessment",
    color: "learning-mcq",
    bgClass: "bg-learning-mcq/10",
    borderClass: "border-learning-mcq/20",
    textClass: "text-learning-mcq"
  }
};

export function LearningModule({ module, moduleNumber, onModuleClick }: LearningModuleProps) {
  const config = moduleTypeConfig[module.type];
  const Icon = config.icon;
  const isLocked = moduleNumber > 1 && !module.completed;
  const canStart = moduleNumber === 1 || module.completed;

  return (
    <Card className={cn(
      "shadow-card border-border/50 bg-gradient-card transition-all duration-200 hover:shadow-elevated",
      module.completed && "bg-success/5 border-success/30",
      isLocked && "opacity-60"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className={cn(
              "p-3 rounded-xl border",
              config.bgClass,
              config.borderClass,
              module.completed && "bg-success/10 border-success/20"
            )}>
              {module.completed ? (
                <CheckCircle className="h-5 w-5 text-success" />
              ) : (
                <Icon className={cn("h-5 w-5", config.textClass)} />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-muted-foreground">
                  Module {moduleNumber}
                </span>
                <Badge 
                  variant="outline" 
                  className={cn(config.borderClass, config.textClass, "text-xs")}
                >
                  {config.label}
                </Badge>
              </div>
              <CardTitle className="text-lg leading-tight">{module.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {module.description}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-3 w-3" />
              {module.duration}
            </div>
            {isLocked && (
              <Lock className="h-4 w-4 text-muted-foreground/50" />
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex-1 mr-4">
            {module.completed ? (
              <div className="flex items-center gap-2 text-sm text-success">
                <CheckCircle className="h-4 w-4" />
                Completed
              </div>
            ) : canStart ? (
              <Progress value={0} className="h-2" />
            ) : (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" />
                Complete previous modules to unlock
              </div>
            )}
          </div>

          <Button 
            variant={module.completed ? "outline" : "default"}
            size="sm"
            disabled={isLocked}
            onClick={() => !isLocked && onModuleClick(module)}
            className={cn(
              !module.completed && canStart && "bg-gradient-primary hover:opacity-90",
              module.completed && "border-success/20 text-success hover:bg-success/10"
            )}
          >
            {module.completed ? (
              "Review"
            ) : canStart ? (
              <>
                Start
                <ArrowRight className="h-3 w-3 ml-1" />
              </>
            ) : (
              <Lock className="h-3 w-3" />
            )}
          </Button>
        </div>

        {/* Comprehensive Module Information */}
        {canStart && !module.completed && (
          <div className="mt-4 space-y-3">
            {/* What You'll Be Able To Do */}
            <div className="p-3 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/10">
              <div className="text-xs font-medium text-primary mb-1">🎯 What You'll Be Able To Do</div>
              <p className="text-xs text-foreground">{module.outcome}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Prerequisites */}
              <div className="p-3 bg-muted/30 rounded-lg border border-border/30">
                <div className="text-xs font-medium text-muted-foreground mb-2">📚 Prerequisites</div>
                <div className="space-y-1">
                  {module.prerequisites.map((prereq, idx) => (
                    <div key={idx} className="text-xs text-muted-foreground">
                      • {prereq}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Topics */}
              <div className="p-3 bg-muted/30 rounded-lg border border-border/30">
                <div className="text-xs font-medium text-muted-foreground mb-2">🔑 Key Topics</div>
                <div className="space-y-1">
                  {module.keyTopics.map((topic, idx) => (
                    <div key={idx} className="text-xs text-muted-foreground">
                      • {topic}
                    </div>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              <div className="p-3 bg-muted/30 rounded-lg border border-border/30">
                <div className="text-xs font-medium text-muted-foreground mb-2">🚀 After This Module</div>
                <div className="space-y-1">
                  {module.nextSteps.map((step, idx) => (
                    <div key={idx} className="text-xs text-muted-foreground">
                      • {step}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Completed Module Summary */}
        {module.completed && (
          <div className="mt-4 p-3 bg-success/5 rounded-lg border border-success/20">
            <div className="text-xs font-medium text-success mb-1">✅ Module Completed</div>
            <p className="text-xs text-muted-foreground">{module.outcome}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}