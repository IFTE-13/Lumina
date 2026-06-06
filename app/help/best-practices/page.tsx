'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Shield, 
  AlertTriangle, 
  Lock,
  FileWarning,
  Network,
  UserCheck,
  CheckCircle
} from 'lucide-react';

const practices = [
  {
    category: "Sample Handling",
    icon: FileWarning,
    practices: [
      "Never execute suspicious files on production systems",
      "Use isolated environments for analysis (sandbox/VMs)",
      "Always verify file hashes before analysis",
      "Store samples in encrypted containers"
    ]
  },
  {
    category: "Analysis Environment",
    icon: Network,
    practices: [
      "Disable network connectivity during analysis when possible",
      "Use dedicated analysis workstations",
      "Regularly snapshot/restore analysis environments",
      "Implement network monitoring for dynamic analysis"
    ]
  },
  {
    category: "Data Protection",
    icon: Lock,
    practices: [
      "Encrypt sensitive analysis results",
      "Implement access controls for report storage",
      "Regularly purge old analysis data",
      "Use secure channels for API communication"
    ]
  },
  {
    category: "Operational Security",
    icon: UserCheck,
    practices: [
      "Use principle of least privilege",
      "Implement audit logging",
      "Regular security training for analysts",
      "Maintain incident response procedures"
    ]
  }
];

export default function BestPracticesPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Security Best Practices</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Guidelines for safely handling and analyzing malware samples
          </p>
        </div>

        <div className="space-y-8 mb-12">
          {practices.map((section) => (
            <Card key={section.category}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <section.icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>{section.category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 md:grid-cols-2">
                  {section.practices.map((practice, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span className="text-sm">{practice}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-yellow-500/5 border-yellow-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-600">
              <AlertTriangle className="h-5 w-5" />
              Important Warning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">
              Always treat unknown executables as potentially malicious. 
              Use appropriate safety measures and never bypass security controls 
              for convenience. When in doubt, consult with security professionals.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}