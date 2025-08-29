import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  Building,
  Car,
  ShoppingCart,
  Gamepad2,
  TrendingUp,
  Shield,
  Factory,
  Stethoscope,
  ExternalLink
} from "lucide-react";

interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  icon: any;
  company: string;
  problem: string;
  solution: string;
  implementation: string;
  results: string;
  keyLearning: string;
}

interface RealWorldApplicationsProps {
  onComplete: () => void;
  onBack: () => void;
}

export function RealWorldApplications({ onComplete, onBack }: RealWorldApplicationsProps) {
  const [currentCase, setCurrentCase] = useState(0);
  const [completedCases, setCompletedCases] = useState<number[]>([]);

  const caseStudies: CaseStudy[] = [
    {
      id: 'tesla-autopilot',
      title: 'Tesla Autopilot System',
      industry: 'Automotive',
      icon: Car,
      company: 'Tesla',
      problem: 'Need for safer, more efficient driving while reducing human error and fatigue',
      solution: 'Multi-agent system with perception agents, planning agents, and control agents working together',
      implementation: 'Camera/radar agents perceive environment → Planning agent calculates optimal path → Control agent executes steering/acceleration',
      results: '10x reduction in accidents per mile driven compared to human-only driving',
      keyLearning: 'Specialized agents for different tasks can outperform generalist approaches'
    },
    {
      id: 'amazon-warehouse',
      title: 'Amazon Warehouse Robots',
      industry: 'Logistics',
      icon: ShoppingCart,
      company: 'Amazon',
      problem: 'Need to fulfill millions of orders efficiently while minimizing warehouse space and labor costs',
      solution: 'Thousands of autonomous robots coordinate to move inventory shelves to human workers',
      implementation: 'Central coordination agent assigns tasks → Individual robots plan paths → Collision avoidance through local communication',
      results: '50% increase in warehouse efficiency, 40% reduction in operational costs',
      keyLearning: 'Large-scale multi-agent coordination requires both centralized and decentralized decision-making'
    },
    {
      id: 'alphago',
      title: 'AlphaGo Game AI',
      industry: 'Gaming/AI Research',
      icon: Gamepad2,
      company: 'DeepMind',
      problem: 'Go game has more possible board states than atoms in the observable universe - impossible to brute force',
      solution: 'Monte Carlo Tree Search agent combined with deep neural network evaluation agents',
      implementation: 'Search agent explores game tree → Evaluation agents assess positions → Selection agent chooses best moves',
      results: 'First AI to defeat world champion Go player, revolutionizing game AI',
      keyLearning: 'Combining different AI techniques through agent collaboration can solve "impossible" problems'
    },
    {
      id: 'trading-systems',
      title: 'High-Frequency Trading',
      industry: 'Finance',
      icon: TrendingUp,
      company: 'Various Financial Firms',
      problem: 'Execute optimal trades in microseconds across multiple markets and instruments',
      solution: 'Market monitoring agents, risk assessment agents, and execution agents operating in parallel',
      implementation: 'Monitor agents track prices → Analysis agents identify opportunities → Risk agents verify safety → Execution agents place trades',
      results: 'Millions of profitable trades per day with minimal human intervention',
      keyLearning: 'Time-critical applications require agents that can operate faster than human reaction time'
    }
  ];

  const handleCaseComplete = () => {
    if (!completedCases.includes(currentCase)) {
      setCompletedCases([...completedCases, currentCase]);
    }
    
    if (currentCase < caseStudies.length - 1) {
      setCurrentCase(currentCase + 1);
    } else {
      onComplete();
    }
  };

  const progress = ((completedCases.length) / caseStudies.length) * 100;
  const currentCaseData = caseStudies[currentCase];
  const CurrentIcon = currentCaseData.icon;

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
            Real-World Applications
          </Badge>
          <Badge variant="outline" className="text-xs text-primary border-primary/30">
            8 min
          </Badge>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Case Studies Progress</span>
          <span className="text-muted-foreground">{completedCases.length} of {caseStudies.length} completed</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Case Study Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {caseStudies.map((caseStudy, index) => {
          const Icon = caseStudy.icon;
          const isActive = index === currentCase;
          const isCompleted = completedCases.includes(index);
          
          return (
            <button
              key={caseStudy.id}
              onClick={() => setCurrentCase(index)}
              className={`p-4 rounded-lg border transition-all duration-200 text-left ${
                isActive ? 'bg-primary/20 border-primary/30' :
                isCompleted ? 'bg-success/10 border-success/20' :
                'bg-muted/30 border-border/30 hover:bg-muted/50'
              }`}
            >
              <Icon className={`h-6 w-6 mb-2 ${
                isActive ? 'text-primary' :
                isCompleted ? 'text-success' :
                'text-muted-foreground'
              }`} />
              <div className="text-sm font-medium mb-1">{caseStudy.company}</div>
              <div className="text-xs text-muted-foreground">{caseStudy.industry}</div>
            </button>
          );
        })}
      </div>

      {/* Main Content */}
      <Card className="shadow-elevated border-border/50 bg-gradient-card">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary/20 rounded-lg">
              <CurrentIcon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">{currentCaseData.title}</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {currentCaseData.industry}
                </Badge>
                <Badge variant="outline" className="text-xs text-accent border-accent/30">
                  {currentCaseData.company}
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Problem Statement */}
          <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
            <h4 className="font-medium text-destructive mb-2">🎯 The Challenge</h4>
            <p className="text-sm">{currentCaseData.problem}</p>
          </div>

          {/* Solution Approach */}
          <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
            <h4 className="font-medium text-warning mb-2">💡 Agent-Based Solution</h4>
            <p className="text-sm">{currentCaseData.solution}</p>
          </div>

          {/* Implementation Details */}
          <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
            <h4 className="font-medium text-primary mb-2">⚙️ How It Works</h4>
            <p className="text-sm">{currentCaseData.implementation}</p>
          </div>

          {/* Results */}
          <div className="p-4 bg-success/10 rounded-lg border border-success/20">
            <h4 className="font-medium text-success mb-2">📈 Impact & Results</h4>
            <p className="text-sm">{currentCaseData.results}</p>
          </div>

          {/* Key Learning */}
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
            <h4 className="font-medium text-accent mb-2">🔑 Key Learning for You</h4>
            <p className="text-sm font-medium">{currentCaseData.keyLearning}</p>
          </div>

          {/* Action Item */}
          <div className="p-4 bg-muted/20 rounded-lg border border-border/30">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium mb-1">🚀 Apply This Knowledge</h4>
                <p className="text-sm text-muted-foreground">
                  Think about how you could apply similar agent-based approaches in your domain
                </p>
              </div>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                Learn More
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentCase(Math.max(0, currentCase - 1))}
          disabled={currentCase === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous Case
        </Button>

        <div className="text-center">
          <p className="text-sm font-medium">Case Study {currentCase + 1} of {caseStudies.length}</p>
          <p className="text-xs text-muted-foreground">{currentCaseData.company}</p>
        </div>

        <Button 
          onClick={handleCaseComplete}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90"
        >
          {currentCase === caseStudies.length - 1 ? 'Complete Applications' : 'Next Case Study'}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}