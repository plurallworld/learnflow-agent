import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { 
  Settings, 
  Palette, 
  Users, 
  Clock,
  Target,
  Sparkles,
  Eye,
  Share,
  Download,
  Globe,
  Lock,
  Zap
} from "lucide-react";

interface ContentRefinementSidebarProps {
  learningPath: any;
  onClose: () => void;
}

export function ContentRefinementSidebar({ learningPath, onClose }: ContentRefinementSidebarProps) {
  const [difficulty, setDifficulty] = useState([3]);
  const [duration, setDuration] = useState([90]);
  const [interactivity, setInteractivity] = useState([4]);
  const [includeAssessments, setIncludeAssessments] = useState(true);
  const [includePractical, setIncludePractical] = useState(true);
  const [adaptiveLearning, setAdaptiveLearning] = useState(true);
  const [pathName, setPathName] = useState("Autonomous Agents Learning Path");
  const [pathDescription, setPathDescription] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const handlePublish = () => {
    setIsPublishing(true);
    // Simulate publishing process
    setTimeout(() => {
      setIsPublishing(false);
      // Show success toast or redirect
    }, 3000);
  };

  const handlePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const getDifficultyLabel = (value: number) => {
    const labels = ['Beginner', 'Easy', 'Intermediate', 'Advanced', 'Expert'];
    return labels[value - 1] || 'Intermediate';
  };

  const getInteractivityLabel = (value: number) => {
    const labels = ['Basic', 'Some', 'Interactive', 'Highly Interactive', 'Immersive'];
    return labels[value - 1] || 'Interactive';
  };

  return (
    <Card className="w-80 h-full shadow-lg border-border/50 bg-gradient-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Settings className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm">Refine & Publish</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Customize and publish your learning path
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Path Identity */}
        <div className="space-y-3">
          <Label className="text-xs font-medium flex items-center gap-2">
            <Target className="h-3 w-3" />
            Path Details
          </Label>
          <div className="space-y-2">
            <Input
              placeholder="Learning path name..."
              value={pathName}
              onChange={(e) => setPathName(e.target.value)}
              className="h-8 text-xs"
            />
            <Textarea
              placeholder="Brief description of what learners will achieve..."
              value={pathDescription}
              onChange={(e) => setPathDescription(e.target.value)}
              rows={2}
              className="text-xs resize-none"
            />
            <Input
              placeholder="Target audience (e.g., Software Engineers, Students)..."
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="h-8 text-xs"
            />
          </div>
        </div>

        <Separator />

        {/* Learning Parameters */}
        <div className="space-y-4">
          <Label className="text-xs font-medium flex items-center gap-2">
            <Palette className="h-3 w-3" />
            Learning Experience
          </Label>
          
          {/* Difficulty Level */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs">Difficulty Level</span>
              <Badge variant="outline" className="text-xs">
                {getDifficultyLabel(difficulty[0])}
              </Badge>
            </div>
            <Slider
              value={difficulty}
              onValueChange={setDifficulty}
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs">Total Duration</span>
              <Badge variant="outline" className="text-xs">
                {duration[0]} min
              </Badge>
            </div>
            <Slider
              value={duration}
              onValueChange={setDuration}
              max={180}
              min={30}
              step={15}
              className="w-full"
            />
          </div>

          {/* Interactivity */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs">Interactivity</span>
              <Badge variant="outline" className="text-xs">
                {getInteractivityLabel(interactivity[0])}
              </Badge>
            </div>
            <Slider
              value={interactivity}
              onValueChange={setInteractivity}
              max={5}
              min={1}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        <Separator />

        {/* Learning Components */}
        <div className="space-y-3">
          <Label className="text-xs font-medium flex items-center gap-2">
            <Users className="h-3 w-3" />
            Learning Components
          </Label>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium">Include Assessments</p>
                <p className="text-xs text-muted-foreground">MCQs and knowledge checks</p>
              </div>
              <Switch
                checked={includeAssessments}
                onCheckedChange={setIncludeAssessments}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium">Practical Exercises</p>
                <p className="text-xs text-muted-foreground">Hands-on coding and projects</p>
              </div>
              <Switch
                checked={includePractical}
                onCheckedChange={setIncludePractical}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium">Adaptive Learning</p>
                <p className="text-xs text-muted-foreground">AI-powered personalization</p>
              </div>
              <Switch
                checked={adaptiveLearning}
                onCheckedChange={setAdaptiveLearning}
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Preview & Publishing */}
        <div className="space-y-3">
          <Label className="text-xs font-medium flex items-center gap-2">
            <Globe className="h-3 w-3" />
            Preview & Publish
          </Label>
          
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreview}
              className="w-full flex items-center gap-2"
            >
              <Eye className="h-3 w-3" />
              {isPreviewMode ? 'Exit Preview' : 'Preview Mode'}
            </Button>
            
            <Button
              onClick={handlePublish}
              disabled={isPublishing || !pathName.trim()}
              className="w-full"
            >
              {isPublishing ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
                  Publishing...
                </>
              ) : (
                <>
                  <Share className="h-4 w-4 mr-2" />
                  Publish Learning Path
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Export Options */}
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full flex items-center gap-2"
          >
            <Download className="h-3 w-3" />
            Export as PDF
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="w-full flex items-center gap-2"
          >
            <Lock className="h-3 w-3" />
            Private Share Link
          </Button>
        </div>

        {/* AI Refinement */}
        <Separator />
        <div className="space-y-2">
          <Button
            variant="outline"
            size="sm"
            className="w-full flex items-center gap-2 border-primary/30 text-primary hover:bg-primary/5"
          >
            <Zap className="h-3 w-3" />
            AI Optimize Path
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Let AI suggest improvements based on learning science
          </p>
        </div>
      </CardContent>
    </Card>
  );
}