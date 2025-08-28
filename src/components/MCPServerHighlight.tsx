import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Server, 
  Zap, 
  Users, 
  Database, 
  Brain,
  Activity,
  GitBranch,
  Shield
} from "lucide-react";
import { cn } from "@/lib/utils";

export function MCPServerHighlight() {
  const mcpComponents = [
    {
      name: "Agent Orchestrator",
      icon: Users,
      description: "Coordinates multiple learning agents",
      status: "active"
    },
    {
      name: "Content Generator", 
      icon: Brain,
      description: "Creates personalized learning modules",
      status: "generating"
    },
    {
      name: "Progress Tracker",
      icon: Activity,
      description: "Maintains user learning state",
      status: "active"
    },
    {
      name: "Knowledge Base",
      icon: Database,
      description: "Stores and retrieves learning data",
      status: "active"
    }
  ];

  return (
    <Card className="mt-6 shadow-mcp border-0 bg-gradient-to-br from-mcp-secondary/20 to-mcp-secondary/5 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-mcp-primary">
          <div className="p-1.5 bg-gradient-mcp rounded-lg">
            <Server className="h-4 w-4 text-white" />
          </div>
          MCP Server Components
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Real-time autonomous agent coordination
        </p>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {mcpComponents.map((component, index) => {
          const Icon = component.icon;
          return (
            <div 
              key={index}
              className="flex items-center gap-3 p-2 rounded-lg bg-card/30 border border-mcp-primary/10"
            >
              <div className={cn(
                "p-2 rounded-lg",
                component.status === 'active' && "bg-success/10",
                component.status === 'generating' && "bg-mcp-primary/10"
              )}>
                <Icon className={cn(
                  "h-3 w-3",
                  component.status === 'active' && "text-success",
                  component.status === 'generating' && "text-mcp-primary animate-pulse"
                )} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium truncate">
                    {component.name}
                  </span>
                  <Badge 
                    variant="outline"
                    className={cn(
                      "text-xs px-1 py-0",
                      component.status === 'active' && "border-success/30 text-success",
                      component.status === 'generating' && "border-mcp-primary/30 text-mcp-primary"
                    )}
                  >
                    {component.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {component.description}
                </p>
              </div>
            </div>
          );
        })}
        
        <div className="pt-2 border-t border-mcp-primary/10">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Shield className="h-3 w-3" />
              <span>Secure & Private</span>
            </div>
            <div className="flex items-center gap-1 text-success">
              <div className="h-1.5 w-1.5 bg-success rounded-full animate-pulse"></div>
              <span>Online</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}