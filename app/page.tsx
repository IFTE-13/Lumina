'use client';

import Link from 'next/link';
import { 
  Shield, 
  ArrowRight, 
  Zap, 
  Lock, 
  BarChart3,
  Clock,
  FileSearch,
  Server,
  CheckCircle,
  Cpu,
  Cloud,
  TrendingUp,
  Users,
  Star,
  CodeXml,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';

export default function Home() {
  const features = [
    {
      icon: Zap,
      title: "Real-time Analysis",
      description: "Get instant results in under 2 seconds with our optimized ML pipeline",
      accent: "text-yellow-500"
    },
    {
      icon: FileSearch,
      title: "Static PE Analysis",
      description: "Examines 50+ PE features without executing suspicious files",
      accent: "text-blue-500"
    },
    {
      icon: BarChart3,
      title: "99.9% Accuracy",
      description: "LightGBM model trained on 2500+ samples for reliable detection",
      accent: "text-emerald-500"
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "Files processed in memory - never stored or shared",
      accent: "text-purple-500"
    },
    {
      icon: Cloud,
      title: "Batch Processing",
      description: "Analyze up to 10 files simultaneously with queue management",
      accent: "text-cyan-500"
    },
    {
      icon: Server,
      title: "REST API",
      description: "Integrate Lumina into your security workflow via our API",
      accent: "text-orange-500"
    }
  ];

  const stats = [
    { value: "99.9%", label: "Detection Rate", icon: TrendingUp },
    { value: "<2s", label: "Average Analysis", icon: Clock },
    { value: "5,000+", label: "Files Analyzed", icon: Users },
    { value: "50+", label: "PE Features", icon: Cpu }
  ];

  return (
    <div className="min-h-screen bg-linear-to-b from-background via-background to-muted/20">
      <section className="relative overflow-hidden pt-20 pb-28 md:pt-32 md:pb-40">

        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-xl" />
                <div className="relative rounded-2xl bg-linear-to-br from-primary/10 to-background p-4 shadow-lg">
                  <Image
                    src="/logo.png"
                    alt="Lumina"
                    width={56}
                    height={56}
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="mb-4 flex items-center justify-center gap-2">
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
                <span className="bg-linear-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  Lumina
                </span>
              </h1>
              <Badge className="hidden sm:inline-flex">AI-Powered</Badge>
            </div>

            <p className="mx-auto mb-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Advanced malware detection powered by machine learning. 
              Protect your systems with real-time PE analysis.
            </p>

            <div className="mb-10 flex flex-wrap justify-center gap-2">
              {[
                { icon: Shield, label: '99.9% Accurate' },
                { icon: Zap, label: 'Real-time' },
                { icon: Lock, label: 'Privacy First' },
              ].map(({ icon: Icon, label }) => (
                <Badge key={label} variant="secondary" className="gap-1.5 p-3 text-xs">
                  <Icon className="h-3 w-3" />
                  {label}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/threat-detector">
                <Button size="lg" className="group gap-2 px-8 shadow-lg transition-all hover:shadow-xl">
                  Start Analyzing
                </Button>
              </Link>
              <Link href="/api-docs">
                <Button size="lg" variant="outline" className="gap-2">
                  <Server className="h-4 w-4" />
                  API Docs
                </Button>
              </Link>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="gap-2">
                  <CodeXml
                   className="h-4 w-4" />
                  GitHub
                </Button>
              </a>
            </div>

            <div className="mt-20">
              <Separator className="mb-8" />
              <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <stat.icon className="mx-auto mb-3 h-5 w-5 text-primary/70" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
              <Separator className="mt-8" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose Lumina?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Everything you need for professional malware analysis
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => (
              <Card key={idx} className="group transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className={`mb-4 rounded-lg p-3 w-fit`}>
                    <feature.icon className={`h-5 w-5 ${feature.accent}`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20 md:py-28">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Three simple steps to detect malware
            </p>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                title: "Upload",
                description: "Upload a Windows executable (.exe) file",
                icon: Upload
              },
              {
                title: "Analyze",
                description: "Our AI analyzes 50+ PE features in real-time",
                icon: FileSearch
              },
              {
                title: "Results",
                description: "Get detailed report with confidence score",
                icon: BarChart3
              }
            ].map((item, idx) => (
              <div key={idx} className="relative text-center">
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 shadow-sm">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="relative overflow-hidden rounded-2xl p-12 text-center shadow-sm">
            <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full" />
            
            <div className="relative">
              <Star className="mx-auto mb-4 h-10 w-10 text-primary/70" />
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to Enhance Your Security?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">
                Start analyzing suspicious files now. No account required. Free forever.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/threat-detector">
                  <Button size="lg" className="gap-2 shadow-lg">
                    Analyze Files Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/help">
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-emerald-500" />
                  No account required
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-emerald-500" />
                  Open source
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-emerald-500" />
                  Privacy guaranteed
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}