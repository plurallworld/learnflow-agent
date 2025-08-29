import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Settings, Sparkles } from "lucide-react";

interface LearningPathSettingsProps {
  onSettingsChange: (settings: PathSettings) => void;
}

export interface PathSettings {
  includeMCQ: boolean;
  includeCaseStudies: boolean;
  includeCodingExercises: boolean;
  includeSimulations: boolean;
  includeVideos: boolean;
  includeConcepts: boolean;
  industryContext: string;
}

export function LearningPathSettings({ onSettingsChange }: LearningPathSettingsProps) {
  const [settings, setSettings] = useState<PathSettings>({
    includeMCQ: true,
    includeCaseStudies: true,
    includeCodingExercises: true,
    includeSimulations: false,
    includeVideos: true,
    includeConcepts: true,
    industryContext: ""
  });

  const handleSettingChange = (key: keyof PathSettings, value: boolean | string) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
          <Settings className="h-3 w-3" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            Learning Path Settings
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-3">
            <Label className="text-xs font-medium">Include Components</Label>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="concepts"
                  checked={settings.includeConcepts}
                  onCheckedChange={(checked) => handleSettingChange('includeConcepts', !!checked)}
                />
                <Label htmlFor="concepts" className="text-xs">Concepts</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="mcq"
                  checked={settings.includeMCQ}
                  onCheckedChange={(checked) => handleSettingChange('includeMCQ', !!checked)}
                />
                <Label htmlFor="mcq" className="text-xs">MCQs</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="case-studies"
                  checked={settings.includeCaseStudies}
                  onCheckedChange={(checked) => handleSettingChange('includeCaseStudies', !!checked)}
                />
                <Label htmlFor="case-studies" className="text-xs">Case Studies</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="coding"
                  checked={settings.includeCodingExercises}
                  onCheckedChange={(checked) => handleSettingChange('includeCodingExercises', !!checked)}
                />
                <Label htmlFor="coding" className="text-xs">Coding Exercises</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="videos"
                  checked={settings.includeVideos}
                  onCheckedChange={(checked) => handleSettingChange('includeVideos', !!checked)}
                />
                <Label htmlFor="videos" className="text-xs">Videos</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="simulations"
                  checked={settings.includeSimulations}
                  onCheckedChange={(checked) => handleSettingChange('includeSimulations', !!checked)}
                />
                <Label htmlFor="simulations" className="text-xs">Simulations</Label>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="industry" className="text-xs font-medium">
              Industry Context (Optional)
            </Label>
            <Input
              id="industry"
              placeholder="Healthcare, Finance, Automotive..."
              value={settings.industryContext}
              onChange={(e) => handleSettingChange('industryContext', e.target.value)}
              className="h-8 text-xs"
            />
            <p className="text-xs text-muted-foreground">
              Add industry-specific examples and use cases
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}