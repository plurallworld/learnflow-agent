import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle,
  XCircle,
  Brain,
  Target,
  Trophy,
  RotateCcw
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  concept: string;
}

interface KnowledgeValidationProps {
  onComplete: () => void;
  onBack: () => void;
}

export function KnowledgeValidation({ onComplete, onBack }: KnowledgeValidationProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const questions: Question[] = [
    {
      id: 'q1',
      question: 'What are the four essential components that every autonomous agent must have?',
      options: [
        'Input, Output, Processing, Storage',
        'Sensors, Actuators, Decision-making logic, Memory',
        'Hardware, Software, Network, Database',
        'Frontend, Backend, API, Database'
      ],
      correctAnswer: 1,
      explanation: 'Autonomous agents require Sensors (to perceive), Actuators (to act), Decision-making logic (to choose actions), and Memory (to store knowledge and experience).',
      difficulty: 'easy',
      concept: 'Agent Architecture'
    },
    {
      id: 'q2',
      question: 'Which type of agent architecture is best suited for time-critical applications like autonomous driving?',
      options: [
        'Purely deliberative (plan-based) agents',
        'Purely reactive agents', 
        'Hybrid agents combining reactive and deliberative approaches',
        'Database-driven agents'
      ],
      correctAnswer: 2,
      explanation: 'Hybrid agents combine quick reactive responses for immediate threats with deliberative planning for complex scenarios - perfect for autonomous driving where both are needed.',
      difficulty: 'medium',
      concept: 'Agent Types'
    },
    {
      id: 'q3',
      question: 'In multi-agent systems, what is the primary challenge when coordinating thousands of agents?',
      options: [
        'Individual agent intelligence',
        'Hardware limitations',
        'Scalable communication and coordination protocols',
        'User interface design'
      ],
      correctAnswer: 2,
      explanation: 'As seen in Amazon warehouses, the main challenge is developing communication protocols that allow thousands of agents to coordinate without overwhelming the system.',
      difficulty: 'medium',
      concept: 'Multi-Agent Coordination'
    },
    {
      id: 'q4',
      question: 'Based on the Tesla Autopilot case study, what was the key insight about agent specialization?',
      options: [
        'Generalist agents are always better than specialists',
        'Specialized agents for different tasks can outperform generalist approaches',
        'Only one agent should handle all driving tasks',
        'Human drivers are always better than agents'
      ],
      correctAnswer: 1,
      explanation: 'Tesla\'s success came from using specialized agents - perception agents for sensing, planning agents for path calculation, and control agents for execution - rather than one generalist agent.',
      difficulty: 'hard',
      concept: 'Real-World Applications'
    },
    {
      id: 'q5',
      question: 'What is the core principle behind the agent perception-action cycle?',
      options: [
        'Act first, then observe the results',
        'Plan extensively before any action',
        'Continuously observe → decide → act → observe results',
        'Make decisions without environmental input'
      ],
      correctAnswer: 2,
      explanation: 'Agents must continuously cycle through observing their environment, making decisions based on that information, taking actions, and then observing the results to inform future decisions.',
      difficulty: 'easy',
      concept: 'Agent-Environment Interaction'
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate final score
      let correctCount = 0;
      questions.forEach((q, index) => {
        if (selectedAnswers[index] === q.correctAnswer) {
          correctCount++;
        }
      });
      setScore(correctCount);
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResult(false);
    setScore(0);
  };

  const handleComplete = () => {
    onComplete();
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const hasAnswered = selectedAnswers[currentQuestion] !== undefined;

  if (showResult) {
    const percentage = (score / questions.length) * 100;
    const passed = percentage >= 70;

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Module
          </Button>
          <Badge variant="outline" className="text-xs">
            Knowledge Validation Complete
          </Badge>
        </div>

        {/* Results */}
        <Card className="shadow-elevated border-border/50 bg-gradient-card">
          <CardHeader className="text-center pb-4">
            <div className={`text-6xl mb-4 ${passed ? 'text-success' : 'text-warning'}`}>
              {passed ? '🎉' : '📚'}
            </div>
            <CardTitle className="text-2xl">
              {passed ? 'Excellent Work!' : 'Good Progress!'}
            </CardTitle>
            <p className="text-muted-foreground">
              You scored {score} out of {questions.length} questions correctly
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Score Display */}
            <div className="text-center">
              <div className={`text-4xl font-bold mb-2 ${passed ? 'text-success' : 'text-warning'}`}>
                {Math.round(percentage)}%
              </div>
              <Progress value={percentage} className="h-3 max-w-md mx-auto" />
            </div>

            {/* Breakdown */}
            <div className="grid gap-4 max-w-2xl mx-auto">
              {questions.map((q, index) => {
                const isCorrect = selectedAnswers[index] === q.correctAnswer;
                return (
                  <div key={q.id} className={`p-4 rounded-lg border ${
                    isCorrect ? 'bg-success/10 border-success/20' : 'bg-destructive/10 border-destructive/20'
                  }`}>
                    <div className="flex items-center gap-3">
                      {isCorrect ? (
                        <CheckCircle className="h-5 w-5 text-success" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive" />
                      )}
                      <div>
                        <p className="font-medium text-sm">Question {index + 1}: {q.concept}</p>
                        <p className="text-xs text-muted-foreground">{isCorrect ? 'Correct' : 'Incorrect'}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Next Steps */}
            <div className="p-4 bg-primary/10 rounded-lg border border-primary/20 max-w-2xl mx-auto">
              <h4 className="font-medium text-primary mb-2">🎯 What You've Mastered</h4>
              <p className="text-sm">
                {passed 
                  ? 'You have a solid understanding of autonomous agent fundamentals! You\'re ready to dive deeper into advanced topics.'
                  : 'You have a good foundation! Consider reviewing the concepts you missed before moving to advanced topics.'
                }
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-center gap-4">
              <Button variant="outline" onClick={handleRestart} className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4" />
                Retake Quiz
              </Button>
              <Button onClick={handleComplete} className="flex items-center gap-2 bg-primary hover:bg-primary/90">
                <Trophy className="h-4 w-4" />
                Complete Module
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            Knowledge Validation
          </Badge>
          <Badge variant="outline" className="text-xs text-primary border-primary/30">
            5 min
          </Badge>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">Assessment Progress</span>
          <span className="text-muted-foreground">{currentQuestion + 1} of {questions.length}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question */}
      <Card className="shadow-elevated border-border/50 bg-gradient-card">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Brain className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium">Question {currentQuestion + 1}</span>
                <Badge variant="outline" className={cn(
                  "text-xs",
                  currentQ.difficulty === 'easy' && "border-success/30 text-success",
                  currentQ.difficulty === 'medium' && "border-warning/30 text-warning", 
                  currentQ.difficulty === 'hard' && "border-destructive/30 text-destructive"
                )}>
                  {currentQ.difficulty}
                </Badge>
                <Badge variant="outline" className="text-xs border-accent/30 text-accent">
                  {currentQ.concept}
                </Badge>
              </div>
              <CardTitle className="text-lg">{currentQ.question}</CardTitle>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <RadioGroup 
            value={selectedAnswers[currentQuestion]?.toString() || ""} 
            onValueChange={(value) => handleAnswerSelect(parseInt(value))}
          >
            {currentQ.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border border-border/30 hover:bg-muted/30 transition-colors">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {hasAnswered && (
            <div className="p-4 bg-muted/20 rounded-lg border border-border/30">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-accent" />
                <span className="text-sm font-medium text-accent">Explanation</span>
              </div>
              <p className="text-sm text-muted-foreground">{currentQ.explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
          disabled={currentQuestion === 0}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="text-center">
          <p className="text-sm font-medium">Question {currentQuestion + 1} of {questions.length}</p>
          <p className="text-xs text-muted-foreground">
            {hasAnswered ? 'Answer recorded' : 'Select an answer'}
          </p>
        </div>

        <Button 
          onClick={handleNext}
          disabled={!hasAnswered}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90"
        >
          {currentQuestion === questions.length - 1 ? 'Complete Assessment' : 'Next Question'}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}