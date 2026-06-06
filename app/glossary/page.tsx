'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BookOpen, 
  Search,
} from 'lucide-react';

const terms = [
  {
    term: "PE (Portable Executable)",
    definition: "The executable file format used by Windows for .exe, .dll, and other file types.",
    category: "file-format"
  },
  {
    term: "Static Analysis",
    definition: "Analyzing a file without executing it, examining its structure, headers, and embedded data.",
    category: "methodology"
  },
  {
    term: "Dynamic Analysis",
    definition: "Analyzing a file by executing it in a controlled environment (sandbox) to observe behavior.",
    category: "methodology"
  },
  {
    term: "Feature Extraction",
    definition: "The process of identifying and extracting relevant characteristics from a file for analysis.",
    category: "technical"
  },
  {
    term: "LightGBM",
    definition: "A gradient boosting framework that uses tree-based learning algorithms for classification.",
    category: "ml"
  },
  {
    term: "Confidence Score",
    definition: "A measure of how certain the model is about its prediction (0-100%).",
    category: "results"
  },
  {
    term: "False Positive",
    definition: "When a benign file is incorrectly classified as malicious.",
    category: "results"
  },
  {
    term: "False Negative",
    definition: "When a malicious file is incorrectly classified as benign.",
    category: "results"
  },
  {
    term: "SHA-256",
    definition: "A cryptographic hash function that produces a 256-bit (32-byte) hash value.",
    category: "technical"
  },
  {
    term: "Entropy",
    definition: "A measure of randomness in data; high entropy may indicate packed or encrypted content.",
    category: "technical"
  },
  {
    term: "Section Alignment",
    definition: "The alignment factor used to map PE sections from disk to memory.",
    category: "pe-structure"
  },
  {
    term: "Import Table",
    definition: "A table that lists external functions a PE file calls from other libraries.",
    category: "pe-structure"
  }
];

const categories = [
  { name: "all", label: "All Terms" },
  { name: "pe-structure", label: "PE Structure" },
  { name: "methodology", label: "Methodology" },
  { name: "technical", label: "Technical" },
  { name: "ml", label: "Machine Learning" },
  { name: "results", label: "Results" },
  { name: "file-format", label: "File Format" }
];

export default function GlossaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTerms = terms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          term.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || term.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <BookOpen className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-3">Glossary</h1>
          <p className="text-muted-foreground">
            Understanding cybersecurity and malware analysis terminology
          </p>
        </div>

        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={activeCategory === category.name ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category.name)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredTerms.map((term, idx) => (
            <Card key={idx}>
              <CardContent>
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg">{term.term}</h3>
                  <Badge variant="secondary" className="capitalize">
                    {term.category.replace('-', ' ')}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{term.definition}</p>
              </CardContent>
            </Card>
          ))}
          {filteredTerms.length === 0 && (
            <Card className="p-12 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No terms found matching your search</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}