"use client";

import { Image } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--card-border)] bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg hero-gradient flex items-center justify-center">
                <Image className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold">
                Compress<span className="text-[var(--primary)]">Kit</span>
              </span>
            </div>
            <p className="text-sm text-[var(--muted)] max-w-sm leading-relaxed">
              The privacy-first image compressor. Compress, resize, and convert
              images entirely in your browser. No uploads, no servers, no
              tracking.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Product</h4>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li>
                <a href="#features" className="hover:text-[var(--foreground)]">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[var(--foreground)]">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[var(--foreground)]">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm text-[var(--muted)]">
              <li>
                <span className="hover:text-[var(--foreground)] cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-[var(--foreground)] cursor-pointer">
                  Terms of Service
                </span>
              </li>
              <li>
                <span className="hover:text-[var(--foreground)] cursor-pointer">
                  Refund Policy
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-[var(--card-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[var(--muted)]">
          <p>&copy; {new Date().getFullYear()} CompressKit. All rights reserved.</p>
          <p>
            Made with care for creators and developers.
          </p>
        </div>
      </div>
    </footer>
  );
}
