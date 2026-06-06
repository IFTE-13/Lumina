'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Menu, 
  X,
} from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useHealthCheck } from '@/hooks/useHealthCheck';
import { StatusPill } from './statusPill';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { AnimatedThemeToggler } from '@/components/ui/animated-theme-toggler';

const navigation = [
  { name: 'Detector', href: '/threat-detector'},
  { name: 'Dashboard', href: '/dashboard'},
  { name: 'Compare', href: '/compare'},
  { name: 'Batch Reports', href: '/batch-reports'},
  { name: 'Help', href: '/help'},
];

export function Navbar() {
  const { isHealthy, isLoading } = useHealthCheck();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (isMobileMenuOpen && prevPathname.current !== pathname) {
      setIsMobileMenuOpen(false);
      prevPathname.current = pathname;
    }
  }, [pathname, isMobileMenuOpen]);

  return (
    <nav className={cn(
      'sticky top-0 z-50 w-full transition-all duration-300',
      scrolled ? 'border-b border-border/40 bg-background/95 backdrop-blur-md shadow-sm' : 'bg-background/80 backdrop-blur-sm'
    )}>
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <div className="absolute inset-0 rounded-lg bg-primary/20 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-primary/20 to-primary/5">
                <Image
                  src={'/logo.png'}
                  alt="Lumina logo"
                  width={28}
                  height={28}
                  className="object-contain"
                  priority
                />
              </div>
            </div>
            <div>
              <span className="font-bold tracking-tight text-lg">Lumina</span>
            </div>
          </Link>

          <div className="hidden md:flex md:items-center md:gap-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <StatusPill isHealthy={isHealthy} isLoading={isLoading} />
            <AnimatedThemeToggler />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-1.5 px-3 transition-all duration-200 hover:bg-muted/80 group"
                >
                  <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="min-w-45 p-1 rounded-lg border shadow-lg bg-background/95 backdrop-blur-sm"
                sideOffset={8}
              >
                <DropdownMenuItem asChild className="cursor-pointer rounded-md px-3 py-2 text-sm focus:bg-accent focus:text-accent-foreground">
                  <Link href="/threat-intelligence">Threat Intelligence</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-md px-3 py-2 text-sm focus:bg-accent focus:text-accent-foreground">
                  <Link href="/verify">Verify Analysis</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-md px-3 py-2 text-sm focus:bg-accent focus:text-accent-foreground">
                  <Link href="/status">System Status</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-md px-3 py-2 text-sm focus:bg-accent focus:text-accent-foreground">
                  <Link href="/api-docs">API Docs</Link>
                </DropdownMenuItem>
                
                <DropdownMenuSeparator className="my-1" />
                
                <DropdownMenuItem asChild className="cursor-pointer rounded-md px-3 py-2 text-sm focus:bg-accent focus:text-accent-foreground">
                  <Link href="/changelog">Changelog</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer rounded-md px-3 py-2 text-sm focus:bg-accent focus:text-accent-foreground">
                  <Link href="/about">About</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-8 w-8"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="border-t border-border bg-background md:hidden animate-in slide-in-from-top-5 duration-200">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}