"use client";

import { Image, Zap, Shield, Download, ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--primary)] opacity-[0.07] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[var(--secondary)] opacity-[0.07] rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary-light)] border border-[var(--primary)]/20 text-[var(--primary)] text-sm font-medium mb-6">
            <Zap className="w-3.5 h-3.5" />
            100% Free — No Upload to Server
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
            Compress Images{" "}
            <span className="bg-gradient-to-r from-[var(--primary)] to-purple-500 bg-clip-text text-transparent">
              Without Limits
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-[var(--muted)] max-w-2xl mx-auto leading-relaxed">
            Compress, resize, and convert images right in your browser. No uploads, no servers, no 
            privacy worries. Bulk process up to 50 images at once.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-8 text-sm text-[var(--muted)]">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[var(--secondary)]" />
              <span>100% Private</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[var(--accent)]" />
              <span>Up to 80% Smaller</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-[var(--primary)]" />
              <span>Bulk Download as ZIP</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <a
              href="#tool"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary-hover)] transition-all hover:shadow-lg hover:shadow-[var(--primary)]/25 text-base"
            >
              Start Compressing
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[var(--card-border)] font-medium hover:bg-[var(--muted-bg)] transition-colors"
            >
              See How It Works
              <ChevronDown className="w-4 h-4" />
            </a>
          </div>

          {/* Social proof */}
          <p className="mt-8 text-sm text-[var(--muted)]">
            Trusted by <span className="font-semibold text-[var(--foreground)]">12,000+</span> users who compressed{" "}
            <span className="font-semibold text-[var(--foreground)]">500,000+</span> images
          </p>
        </div>
      </div>
    </section>
  );
}
