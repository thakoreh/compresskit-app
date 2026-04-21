"use client";

import { useTheme } from "./ThemeProvider";
import { Moon, Sun, Image } from "lucide-react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b backdrop-blur-lg bg-[var(--background)]/80 border-[var(--card-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg hero-gradient flex items-center justify-center">
            <Image className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Compress<span className="text-[var(--primary)]">Kit</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--muted)]">
          <a href="#features" className="hover:text-[var(--foreground)] transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="hover:text-[var(--foreground)] transition-colors">
            How It Works
          </a>
          <a href="#pricing" className="hover:text-[var(--foreground)] transition-colors">
            Pricing
          </a>
          <a href="#faq" className="hover:text-[var(--foreground)] transition-colors">
            FAQ
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg border border-[var(--card-border)] flex items-center justify-center hover:bg-[var(--muted-bg)] transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
          <a
            href="#tool"
            className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg bg-[var(--primary)] text-white text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors"
          >
            Start Compressing
          </a>
        </div>
      </div>
    </header>
  );
}
