"use client";

import {
  Image,
  Layers,
  Eye,
  FileImage,
  Maximize,
  Download,
  Lock,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Image,
    title: "Smart Compression",
    description:
      "Advanced client-side compression reduces file size up to 80% while maintaining visual quality. Adjust quality with a simple slider.",
  },
  {
    icon: Layers,
    title: "Bulk Processing",
    description:
      "Upload and compress up to 50 images at once. Drag & drop or click to select. Process them all in parallel.",
  },
  {
    icon: Eye,
    title: "Before/After Comparison",
    description:
      "Interactive slider lets you compare original vs compressed images side-by-side. See exactly what you're getting.",
  },
  {
    icon: FileImage,
    title: "Format Conversion",
    description:
      "Convert between JPEG, PNG, and WebP formats. WebP gives the best compression for web use.",
  },
  {
    icon: Maximize,
    title: "Resize & Compress",
    description:
      "Set custom dimensions or use percentage scaling. Resize and compress in one step to optimize for any platform.",
  },
  {
    icon: Download,
    title: "Bulk ZIP Download",
    description:
      "Download all compressed images as a single ZIP file. No need to save them one by one.",
  },
  {
    icon: Lock,
    title: "100% Private",
    description:
      "All processing happens in your browser. Your images never leave your device. No server uploads, ever.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "No upload/download to servers. Instant compression using your browser's native Canvas API. Works offline too.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-[var(--muted-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Everything You Need to{" "}
            <span className="text-[var(--primary)]">Optimize Images</span>
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            A complete image optimization toolkit, right in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-[var(--background)] border border-[var(--card-border)] hover:shadow-lg hover:border-[var(--primary)]/30 transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-[var(--primary-light)] flex items-center justify-center mb-4 group-hover:bg-[var(--primary)] group-hover:text-white transition-colors">
                <feature.icon className="w-5 h-5 text-[var(--primary)] group-hover:text-white" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
