'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  GitBranch, 
  Rocket, 
  Bug, 
  Sparkles, 
  Shield, 
  Zap,
  Download,
  Calendar,
  Tag
} from 'lucide-react';
import { toast } from 'sonner';

const releases = [
  {
    version: "2.0.0",
    date: "May 5, 2025",
    type: "major",
    changes: [
      { type: "feature", description: "Batch analysis support for up to 10 files" },
      { type: "feature", description: "Export reports in multiple formats (JSON, CSV, HTML)" },
      { type: "improvement", description: "Redesigned dashboard with statistics" },
      { type: "improvement", description: "Real-time progress tracking" },
      { type: "feature", description: "File hash lookup functionality" },
      { type: "improvement", description: "Dark mode refinement" }
    ]
  },
  {
    version: "1.5.0",
    date: "April 20, 2025",
    type: "minor",
    changes: [
      { type: "feature", description: "Keyboard shortcuts support" },
      { type: "improvement", description: "Enhanced error messages" },
      { type: "fix", description: "Fixed memory leak in batch processing" },
      { type: "feature", description: "Share results via social media" }
    ]
  },
  {
    version: "1.0.0",
    date: "April 1, 2025",
    type: "major",
    changes: [
      { type: "feature", description: "Initial release of Lumina" },
      { type: "feature", description: "PE file analysis support" },
      { type: "feature", description: "Single file detection" },
      { type: "feature", description: "History tracking" },
      { type: "feature", description: "Confidence scoring" }
    ]
  }
];

const getTypeColor = (type: string) => {
  switch (type) {
    case 'major': return 'bg-primary/10 text-primary border-primary/20';
    case 'minor': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    case 'feature': return 'text-emerald-500';
    case 'improvement': return 'text-blue-500';
    case 'fix': return 'text-yellow-500';
    default: return 'text-muted-foreground';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'feature': return <Sparkles className="h-3 w-3" />;
    case 'improvement': return <Zap className="h-3 w-3" />;
    case 'fix': return <Bug className="h-3 w-3" />;
    default: return <Tag className="h-3 w-3" />;
  }
};

export default function ChangelogPage() {
  const downloadRelease = (version: string) => {
    toast.success(`Downloading release ${version} notes`);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <GitBranch className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Changelog</h1>
          <p className="text-xl text-muted-foreground">
            Latest updates and improvements to Lumina
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden md:block" />
          
          <div className="space-y-8">
            {releases.map((release, idx) => (
              <div key={idx} className="relative">
                {/* Version badge */}
                <div className="flex items-start gap-4">
                  <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-background border-2 border-primary z-10 shrink-0">
                    <Tag className="h-5 w-5 text-primary" />
                  </div>
                  
                  <Card className="flex-1">
                    <CardHeader>
                      <div className="flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center gap-3">
                          <Badge className={`${getTypeColor(release.type)} capitalize`}>
                            {release.type}
                          </Badge>
                          <CardTitle className="text-2xl">v{release.version}</CardTitle>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{release.date}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {release.changes.map((change, changeIdx) => (
                          <div key={changeIdx} className="flex items-start gap-3">
                            <div className={`mt-0.5 ${getTypeColor(change.type)}`}>
                              {getTypeIcon(change.type)}
                            </div>
                            <span className="text-sm">{change.description}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-primary" />
              Coming Soon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span>Real-time threat intelligence feed</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span>Custom model training options</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span>Enterprise API with rate limiting</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}