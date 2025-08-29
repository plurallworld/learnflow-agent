import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  CheckCircle, 
  Brain,
  Users,
  MessageSquare,
  Network,
  ArrowRight,
  Lightbulb
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ConceptSlide {
  id: string;
  title: string;
  content: string;
  visual: string;
  keyPoint: string;
}

interface CoreConceptsProps {
  onComplete: () => void;
  onBack: () => void;
}

export function CoreConceptsOverview({ onComplete, onBack }: CoreConceptsProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [completedSlides, setCompletedSlides] = useState<number[]>([]);

  const slides: ConceptSlide[] = [
    {
      id: 'what-is-agent',
      title: 'What is an Autonomous Agent?',
      content: 'An autonomous agent is a software entity that can perceive its environment, make decisions, and take actions to achieve specific goals without constant human supervision.',
      visual: '🤖',
      keyPoint: 'Agents operate independently to achieve goals'
    },
    {
      id: 'key-components',
      title: 'Key Components of an Agent',
      content: 'Every autonomous agent has four essential components: Sensors (perception), Actuators (action), Decision-making logic, and Memory/Knowledge base.',
      visual: '🧠',
      keyPoint: 'Four core components work together'
    },
    {
      id: 'agent-environment',
      title: 'Agent-Environment Interaction',
      content: 'Agents continuously interact with their environment through a perception-action cycle: observe → decide → act → observe results.',
      visual: '🔄',
      keyPoint: 'Continuous perception-action cycle'
    },
    {
      id: 'types-agents',
      title: 'Types of Autonomous Agents',
      content: 'Agents can be reactive (respond to immediate stimuli), deliberative (plan ahead), or hybrid (combination of both approaches).',
      visual: '⚡',
      keyPoint: 'Different agent types for different needs'
    }
  ];

  const handleNext = () => {
    if (!completedSlides.includes(currentSlide)) {
      setCompletedSlides([...completedSlides, currentSlide]);
    }
    
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      // Mark as complete and move to next component
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const progress = ((currentSlide + 1) / slides.length) * 100;
  const currentSlideData = slides[currentSlide];

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
            Core Concepts Overview
          </Badge>
          <Badge variant="outline" className="text-xs text-primary border-primary/30">
            5 min
          </Badge>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Progress</span>
          <span className="text-muted-foreground">{currentSlide + 1} of {slides.length}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Main Content */}
      <Card className="shadow-elevated border-border/50 bg-gradient-card min-h-[500px]">
        <CardHeader className="text-center pb-4">
          <div className="text-6xl mb-4">{currentSlideData.visual}</div>
          <CardTitle className="text-xl">{currentSlideData.title}</CardTitle>
        </CardHeader>
        
        <CardContent className="text-center space-y-6">
          <p className="text-lg leading-relaxed max-w-2xl mx-auto">
            {currentSlideData.content}
          </p>
          
          {/* Key Point Highlight */}
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 max-w-md mx-auto">
            <div className="flex items-center gap-2 justify-center mb-2">
              <Lightbulb className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Key Insight</span>
            </div>
            <p className="text-sm font-medium">{currentSlideData.keyPoint}</p>
          </div>

          {/* Interactive Elements */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-lg mx-auto">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(index)}
                className={cn(
                  "p-3 rounded-lg border transition-all duration-200",
                  index === currentSlide && "bg-primary/20 border-primary/30",
                  completedSlides.includes(index) && "bg-success/10 border-success/20",
                  index !== currentSlide && !completedSlides.includes(index) && "bg-muted/30 border-border/30 hover:bg-muted/50"
                )}
              >
                <div className="text-2xl mb-1">{slide.visual}</div>
                <div className="text-xs font-medium">{slide.title.split(' ').slice(0, 2).join(' ')}</div>
                {completedSlides.includes(index) && (
                  <CheckCircle className="h-3 w-3 text-success mx-auto mt-1" />
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentSlide === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex items-center gap-2">
          {completedSlides.includes(currentSlide) && (
            <CheckCircle className="h-4 w-4 text-success" />
          )}
          <span className="text-sm text-muted-foreground">
            {completedSlides.includes(currentSlide) ? 'Completed' : 'In Progress'}
          </span>
        </div>

        <Button 
          onClick={handleNext}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90"
        >
          {currentSlide === slides.length - 1 ? 'Complete' : 'Next'}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}