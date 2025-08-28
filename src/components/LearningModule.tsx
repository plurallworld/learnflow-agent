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
  };
  moduleNumber: number;
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

export function LearningModule({ module, moduleNumber }: LearningModuleProps) {
  const config = moduleTypeConfig[module.type];
  const Icon = config.icon;
  const isLocked = moduleNumber > 1 && !module.completed;
  const canStart = moduleNumber === 1 || module.completed;

  return (
    <Card className={cn(
      "shadow-learning border-0 bg-card/80 backdrop-blur-sm transition-all duration-300 hover:shadow-elevated",
      module.completed && "bg-success/5 border-success/20",
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

        {/* Module Preview */}
        {canStart && !module.completed && (
          <div className="mt-4 p-3 bg-muted/30 rounded-lg border border-border/30">
            <div className="text-xs text-muted-foreground mb-2">What you'll learn:</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {module.type === 'concept' && (
                <>
                  <div>• Core principles</div>
                  <div>• Key terminology</div>
                  <div>• Practical examples</div>
                  <div>• Best practices</div>
                </>
              )}
              {module.type === 'coding' && (
                <>
                  <div>• Hands-on coding</div>
                  <div>• Interactive examples</div>
                  <div>• Code debugging</div>
                  <div>• Real implementation</div>
                </>
              )}
              {module.type === 'video' && (
                <>
                  <div>• Visual explanations</div>
                  <div>• Expert insights</div>
                  <div>• Real-world demos</div>
                  <div>• Interactive elements</div>
                </>
              )}
              {module.type === 'mcq' && (
                <>
                  <div>• Knowledge validation</div>
                  <div>• Adaptive questions</div>
                  <div>• Instant feedback</div>
                  <div>• Progress tracking</div>
                </>
              )}
              {module.type === 'case' && (
                <>
                  <div>• Real-world scenario</div>
                  <div>• Problem-solving</div>
                  <div>• Industry insights</div>
                  <div>• Practical application</div>
                </>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}