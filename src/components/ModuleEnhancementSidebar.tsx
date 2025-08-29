import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Upload, 
  Link, 
  Youtube, 
  FileText, 
  Trash2, 
  Plus,
  BookOpen,
  Brain,
  Zap,
  Database
} from "lucide-react";

interface KnowledgeSource {
  id: string;
  type: 'pdf' | 'youtube' | 'web' | 'text';
  title: string;
  url?: string;
  content?: string;
  status: 'processing' | 'ready' | 'error';
}

interface ModuleEnhancementSidebarProps {
  selectedModule: any;
  onClose: () => void;
}

export function ModuleEnhancementSidebar({ selectedModule, onClose }: ModuleEnhancementSidebarProps) {
  const [knowledgeSources, setKnowledgeSources] = useState<KnowledgeSource[]>([]);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [webUrl, setWebUrl] = useState("");
  const [customText, setCustomText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const addYoutubeSource = () => {
    if (!youtubeUrl.trim()) return;
    
    const newSource: KnowledgeSource = {
      id: Date.now().toString(),
      type: 'youtube',
      title: `YouTube Video: ${youtubeUrl}`,
      url: youtubeUrl,
      status: 'processing'
    };
    
    setKnowledgeSources([...knowledgeSources, newSource]);
    setYoutubeUrl("");
    
    // Simulate processing
    setTimeout(() => {
      setKnowledgeSources(prev => 
        prev.map(source => 
          source.id === newSource.id 
            ? { ...source, status: 'ready' as const }
            : source
        )
      );
    }, 2000);
  };

  const addWebSource = () => {
    if (!webUrl.trim()) return;
    
    const newSource: KnowledgeSource = {
      id: Date.now().toString(),
      type: 'web',
      title: `Web Page: ${webUrl}`,
      url: webUrl,
      status: 'processing'
    };
    
    setKnowledgeSources([...knowledgeSources, newSource]);
    setWebUrl("");
    
    // Simulate processing
    setTimeout(() => {
      setKnowledgeSources(prev => 
        prev.map(source => 
          source.id === newSource.id 
            ? { ...source, status: 'ready' as const }
            : source
        )
      );
    }, 2000);
  };

  const addTextSource = () => {
    if (!customText.trim()) return;
    
    const newSource: KnowledgeSource = {
      id: Date.now().toString(),
      type: 'text',
      title: `Custom Text (${customText.length} chars)`,
      content: customText,
      status: 'ready'
    };
    
    setKnowledgeSources([...knowledgeSources, newSource]);
    setCustomText("");
  };

  const removeSource = (id: string) => {
    setKnowledgeSources(prev => prev.filter(source => source.id !== id));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const newSource: KnowledgeSource = {
        id: Date.now().toString() + Math.random(),
        type: 'pdf',
        title: file.name,
        status: 'processing'
      };
      
      setKnowledgeSources(prev => [...prev, newSource]);
      
      // Simulate processing
      setTimeout(() => {
        setKnowledgeSources(prev => 
          prev.map(source => 
            source.id === newSource.id 
              ? { ...source, status: 'ready' as const }
              : source
          )
        );
      }, 3000);
    });
  };

  const enhanceModule = () => {
    setIsProcessing(true);
    // Simulate AI enhancement process
    setTimeout(() => {
      setIsProcessing(false);
    }, 4000);
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'pdf': return FileText;
      case 'youtube': return Youtube;
      case 'web': return Link;
      case 'text': return BookOpen;
      default: return FileText;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'text-warning';
      case 'ready': return 'text-success';
      case 'error': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <Card className="w-80 h-full shadow-lg border-border/50 bg-gradient-card">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm">Enhance Module</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>×</Button>
        </div>
        {selectedModule && (
          <div>
            <p className="text-xs text-muted-foreground">
              Adding knowledge to: <span className="font-medium">{selectedModule.title}</span>
            </p>
            <Badge variant="outline" className="text-xs mt-1">
              {knowledgeSources.length} sources added
            </Badge>
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {/* File Upload */}
        <div className="space-y-3">
          <Label className="text-xs font-medium flex items-center gap-2">
            <Upload className="h-3 w-3" />
            Upload PDFs
          </Label>
          <div className="relative">
            <input
              type="file"
              multiple
              accept=".pdf"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="border-2 border-dashed border-border/50 rounded-lg p-4 text-center hover:border-primary/30 transition-colors">
              <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">
                Drop PDFs here or click to browse
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* YouTube Links */}
        <div className="space-y-3">
          <Label className="text-xs font-medium flex items-center gap-2">
            <Youtube className="h-3 w-3" />
            YouTube Videos
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="YouTube URL..."
              value={youtubeUrl}
              onChange={(e) => setYoutubeUrl(e.target.value)}
              className="h-8 text-xs"
            />
            <Button 
              size="sm" 
              onClick={addYoutubeSource}
              disabled={!youtubeUrl.trim()}
              className="h-8"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <Separator />

        {/* Web Links */}
        <div className="space-y-3">
          <Label className="text-xs font-medium flex items-center gap-2">
            <Link className="h-3 w-3" />
            Web Articles
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="Web URL..."
              value={webUrl}
              onChange={(e) => setWebUrl(e.target.value)}
              className="h-8 text-xs"
            />
            <Button 
              size="sm" 
              onClick={addWebSource}
              disabled={!webUrl.trim()}
              className="h-8"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>

        <Separator />

        {/* Custom Text */}
        <div className="space-y-3">
          <Label className="text-xs font-medium flex items-center gap-2">
            <BookOpen className="h-3 w-3" />
            Custom Knowledge
          </Label>
          <Textarea
            placeholder="Add custom text, notes, or additional context..."
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            rows={3}
            className="text-xs resize-none"
          />
          <Button 
            size="sm" 
            onClick={addTextSource}
            disabled={!customText.trim()}
            className="w-full h-8"
          >
            Add Text
          </Button>
        </div>

        {/* Knowledge Sources List */}
        {knowledgeSources.length > 0 && (
          <>
            <Separator />
            <div className="space-y-3">
              <Label className="text-xs font-medium">Knowledge Sources</Label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {knowledgeSources.map((source) => {
                  const Icon = getSourceIcon(source.type);
                  return (
                    <div key={source.id} className="flex items-center gap-2 p-2 bg-muted/30 rounded border border-border/30">
                      <Icon className={`h-3 w-3 ${getStatusColor(source.status)}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{source.title}</p>
                        <Badge variant="outline" className="text-xs">
                          {source.status}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSource(source.id)}
                        className="h-6 w-6 p-0"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {/* Enhancement Actions */}
        <Separator />
        <div className="space-y-3">
          <Button
            onClick={enhanceModule}
            disabled={knowledgeSources.length === 0 || isProcessing}
            className="w-full"
          >
            {isProcessing ? (
              <>
                <Brain className="h-4 w-4 mr-2 animate-pulse" />
                Enhancing...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Enhance with AI
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            AI will integrate your knowledge sources to create richer learning content
          </p>
        </div>
      </CardContent>
    </Card>
  );
}