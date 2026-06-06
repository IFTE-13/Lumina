import { Shield, Heart, CodeXml } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

interface NavLink {
  href: string;
  label: string;
}

interface TechBadge {
  name: string;
  url: string;
}

const PRODUCT_LINKS: NavLink[] = [
  { href: '/threat-detector', label: 'Threat Detector' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/compare', label: 'Compare Files' },
  { href: '/batch-reports', label: 'Batch Reports' },
];

const RESOURCE_LINKS: NavLink[] = [
  { href: '/help', label: 'Help Center' },
  { href: '/api-docs', label: 'API Documentation' },
  { href: '/status', label: 'System Status' },
  { href: '/changelog', label: 'Changelog' },
  { href: '/glossary', label: 'Glossary' },
  { href: '/integrations', label: 'Integrations' },
];

const LEGAL_LINKS: NavLink[] = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/about', label: 'About' },
  { href: '/brand', label: 'Brand' },
];


const TECH_STACK: TechBadge[] = [
  { name: 'Next.js 16', url: 'https://nextjs.org' },
  { name: 'TypeScript', url: 'https://www.typescriptlang.org' },
  { name: 'Tailwind', url: 'https://tailwindcss.com' },
  { name: 'FastAPI', url: 'https://fastapi.tiangolo.com' },
  { name: 'LightGBM', url: 'https://lightgbm.readthedocs.io' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full">
      <Separator />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              <span className="font-semibold tracking-tight">Lumina</span>
            </div>
            <p className="text-xs text-muted-foreground">
              AI-powered malware detection for Windows executables. Fast, accurate, and privacy-focused.
            </p>
          </div>

          <NavSection title="Product" links={PRODUCT_LINKS} />

          <NavSection title="Resources" links={RESOURCE_LINKS} />

          <div className="space-y-3">
            <NavSection title="Legal" links={LEGAL_LINKS} />
            
            <div className="flex gap-3 pt-2">
                <a
                  href={"https://github.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={"GitHub"}
                >
                  <CodeXml className="h-4 w-4" />
                </a>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {currentYear} Lumina. All rights reserved.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <span>Built with</span>
            <Heart className="h-3 w-3 text-red-500" aria-hidden="true" />
            <span>using</span>
            {TECH_STACK.map(({ name, url }) => (
              <TechBadge key={name} name={name} url={url} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function NavSection({ title, links }: { title: string; links: NavLink[] }) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold">{title}</h4>
      <ul className="space-y-2">
        {links.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TechBadge({ name, url }: TechBadge) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="rounded border border-border bg-muted/60 px-1.5 py-0.5 font-mono text-[10px] hover:bg-muted transition-colors"
      aria-label={`Visit ${name} website`}
    >
      {name}
    </a>
  );
}