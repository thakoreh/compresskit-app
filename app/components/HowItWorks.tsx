"use client";

import { Upload, Settings, Download, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Drop Your Images",
    description:
      "Drag & drop up to 50 images, or click to browse. Supports JPEG, PNG, and WebP up to 50MB each.",
  },
  {
    icon: Settings,
    step: "02",
    title: "Choose Settings",
    description:
      "Set your quality level, output format, and optional resize dimensions. Preview changes in real time.",
  },
  {
    icon: Download,
    step: "03",
    title: "Download Optimized",
    description:
      "Download individual images or grab them all as a ZIP. See exact savings for each file.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            How It <span className="text-[var(--primary)]">Works</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Three simple steps to optimized images.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {steps.map((s, i) => (
            <div key={i} className="relative text-center">
              <div className="w-16 h-16 rounded-2xl bg-[var(--primary)] text-white flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[var(--primary)]/20">
                <s.icon className="w-7 h-7" />
              </div>
              <div className="text-xs font-bold text-[var(--primary)] mb-2 tracking-widest uppercase">
                Step {s.step}
              </div>
              <h3 className="text-lg font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {s.description}
              </p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 -right-4 w-8 text-[var(--card-border)]">
                  <ArrowRight className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
