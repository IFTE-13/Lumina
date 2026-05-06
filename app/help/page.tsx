'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  HelpCircle, 
  FileQuestion, 
  Upload, 
  BarChart3,
  BookOpen,
  ChevronRight,
  Cable,
} from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    question: "What file types can I analyze?",
    answer: "Currently, Lumina supports Windows Portable Executable (.exe) files only. This includes both 32-bit and 64-bit executables.",
    category: "general"
  },
  {
    question: "How accurate is the detection?",
    answer: "Our LightGBM model achieves 99.9% accuracy on test data. However, confidence scores vary based on file characteristics.",
    category: "accuracy"
  },
  {
    question: "Are uploaded files stored?",
    answer: "Files are processed in memory and deleted immediately after analysis. We don't store your files permanently.",
    category: "privacy"
  },
  {
    question: "What does the confidence score mean?",
    answer: "Confidence score represents how certain the model is about its prediction. Higher scores (>80%) indicate high confidence.",
    category: "results"
  },
  {
    question: "Can I analyze multiple files at once?",
    answer: "Yes! Use the Batch Analysis tab to upload up to 10 files at once for batch processing.",
    category: "features"
  },
  {
    question: "How long does analysis take?",
    answer: "Single file analysis typically completes in 1-2 seconds. Batch processing time depends on the number of files.",
    category: "performance"
  },
  {
    question: "Is there an API available?",
    answer: "Yes! Check our API Documentation for integration guides and code examples.",
    category: "api"
  },
  {
    question: "How is the model trained?",
    answer: "The model is trained on 50+ PE features from a dataset of 2500 samples (1250 benign, 1250 malicious).",
    category: "technical"
  }
];

const guides = [
  {
    title: "Getting Started",
    description: "First time using Lumina? Learn the basics.",
    icon: BookOpen,
    link: "/help/getting-started"
  },
  {
    title: "Understanding Results",
    description: "Learn to interpret analysis results.",
    icon: BarChart3,
    link: "/help/results"
  },
  {
    title: "Batch Analysis Guide",
    description: "Process multiple files efficiently.",
    icon: Upload,
    link: "/help/batch"
  }, 
  {
    title: "Best Practices",
    description: "Handle you files with care.",
    icon: Cable,
    link: "/help/best-practices"
  }
];

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(faqs.map(f => f.category))];

  return (
    <div className="min-h-screen bg-linear-to-b from-background to-muted/20">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Help Center</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find answers, guides, and support for using Lumina
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Quick Guides</h2>
        <div className="grid gap-6 md:grid-cols-4 lg:grid-cols-4 mb-12">
          {guides.map((guide) => (
            <Card key={guide.title} className="hover:shadow-lg transition-all group cursor-pointer">
              <Link href={guide.link}>
                <CardContent className="pt-6">
                  <guide.icon className="h-10 w-10 text-primary mb-3" />
                  <h3 className="font-semibold mb-1">{guide.title}</h3>
                  <p className="text-xs text-muted-foreground">{guide.description}</p>
                  <div className="mt-3 flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Read More <ChevronRight className="ml-1 h-3 w-3" />
                  </div>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">FAQ</h2>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className="capitalize cursor-pointer"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-start gap-2">
                      <HelpCircle className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                    <Badge variant="secondary" className="mt-3 capitalize">
                      {faq.category}
                    </Badge>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="p-12 text-center">
                <FileQuestion className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No questions found matching your search</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}