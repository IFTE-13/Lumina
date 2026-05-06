// src/app/case-studies/page.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Briefcase, 
  Shield, 
  TrendingUp, 
  Users,
  Building,
  Award,
  ArrowRight,
  Quote
} from 'lucide-react';
import Link from 'next/link';

const caseStudies = [
  {
    company: "TechCorp Solutions",
    industry: "Technology",
    challenge: "High volume of suspicious executables from customer uploads",
    solution: "Integrated Lumina API for real-time scanning",
    results: "99.7% detection rate, 80% reduction in manual review time",
    logo: Building,
    testimonial: "Lumina caught threats our traditional AV missed.",
    author: "Security Director"
  },
  {
    company: "SecureBank",
    industry: "Finance",
    challenge: "Need to scan internal software deployments for malware",
    solution: "Batch analysis for CI/CD pipeline integration",
    results: "Zero breaches from software supply chain in 6 months",
    logo: Building,
    testimonial: "Critical part of our security workflow.",
    author: "CTO"
  },
  {
    company: "Global Defense Systems",
    industry: "Government",
    challenge: "Analyzing suspicious files from various sources",
    solution: "Dedicated malware analysis workstation with Lumina",
    results: "Reduced analysis time from hours to seconds",
    logo: Building,
    testimonial: "Incredibly fast and accurate detection.",
    author: "Security Analyst"
  }
];

export default function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Briefcase className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Case Studies</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how organizations are using Lumina to enhance their security
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid gap-8 mb-12">
          {caseStudies.map((study, idx) => (
            <Card key={idx} className="overflow-hidden">
              <CardHeader className="bg-muted/30">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <study.logo className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>{study.company}</CardTitle>
                      <Badge variant="secondary">{study.industry}</Badge>
                    </div>
                  </div>
                  <Button variant="ghost" asChild>
                    <Link href={`/case-studies/${idx}`}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Challenge</p>
                    <p className="text-sm">{study.challenge}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Solution</p>
                    <p className="text-sm">{study.solution}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Results</p>
                    <p className="text-sm font-semibold text-emerald-500">{study.results}</p>
                  </div>
                </div>
                <div className="mt-4 rounded-lg bg-muted/30 p-4">
                  <Quote className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm italic">"{study.testimonial}"</p>
                  <p className="text-xs text-muted-foreground mt-2">— {study.author}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">99.9%</div>
              <p className="text-sm text-muted-foreground mt-1">Detection Rate</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">&lt;2s</div>
              <p className="text-sm text-muted-foreground mt-1">Avg Analysis Time</p>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary">50+</div>
              <p className="text-sm text-muted-foreground mt-1">Enterprise Customers</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}