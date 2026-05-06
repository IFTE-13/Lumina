'use client';

import { useState } from 'react';
import { Settings, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

interface SettingsProps {
  onClearHistory: () => void;
  onMaxFileSizeChange: (size: number) => void;
  onAutoClearChange: (enabled: boolean) => void;
  onRetentionDaysChange: (days: number) => void;
  maxFileSize: number;
  autoClearResults: boolean;
  retentionDays: number;
}

export function SettingsPanel({
  onClearHistory,
  onMaxFileSizeChange,
  onAutoClearChange,
  onRetentionDaysChange,
  maxFileSize,
  autoClearResults,
  retentionDays,
}: SettingsProps) {
  const [open, setOpen] = useState(false);
  const [localMaxSize, setLocalMaxSize] = useState(maxFileSize);
  const [localAutoClear, setLocalAutoClear] = useState(autoClearResults);
  const [localRetentionDays, setLocalRetentionDays] = useState(retentionDays);

  const handleSave = () => {
    onMaxFileSizeChange(localMaxSize);
    onAutoClearChange(localAutoClear);
    onRetentionDaysChange(localRetentionDays);
    toast.success('Settings saved');
    setOpen(false);
  };

  const handleClearHistory = () => {
    onClearHistory();
    toast.success('Analysis history cleared');
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Configure your malware detection preferences
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="general" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="storage">Storage</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Maximum File Size (MB)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[localMaxSize / (1024 * 1024)]}
                  onValueChange={([val]) => setLocalMaxSize(val * 1024 * 1024)}
                  min={10}
                  max={100}
                  step={10}
                  className="flex-1"
                />
                <span className="text-sm font-mono w-16">
                  {localMaxSize / (1024 * 1024)} MB
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Files larger than this will be rejected
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Auto-clear results</Label>
                <p className="text-xs text-muted-foreground">
                  Clear analysis results after each scan
                </p>
              </div>
              <Switch
                checked={localAutoClear}
                onCheckedChange={setLocalAutoClear}
              />
            </div>
          </TabsContent>

          <TabsContent value="storage" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>History Retention (days)</Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[localRetentionDays]}
                  onValueChange={([val]) => setLocalRetentionDays(val)}
                  min={1}
                  max={90}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm font-mono w-16">
                  {localRetentionDays} days
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Automatically remove analyses older than this
              </p>
            </div>

            <Button
              variant="destructive"
              onClick={handleClearHistory}
              className="w-full gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Clear All History
            </Button>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}