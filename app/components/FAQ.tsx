"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Is CompressKit really free?",
    a: "Yes! The free tier lets you compress up to 10 images per batch with full quality control. The Pro plan adds bulk processing up to 50 images, AVIF support, and custom resize.",
  },
  {
    q: "Are my images uploaded to a server?",
    a: "No. All image processing happens entirely in your browser using the HTML5 Canvas API. Your images never leave your device. You can even use CompressKit offline.",
  },
  {
    q: "What image formats are supported?",
    a: "CompressKit supports JPEG, PNG, and WebP for input and output. The Pro plan also supports AVIF format for next-gen compression.",
  },
  {
    q: "How much can I compress my images?",
    a: "Typical compression ranges from 40-80% reduction in file size, depending on the original image and quality settings. You can preview the result with our before/after slider before downloading.",
  },
  {
    q: "Is the Pro plan really a one-time payment?",
    a: "Yes! Pay $12 once and get lifetime access to all Pro features, including future updates. No recurring subscriptions.",
  },
  {
    q: "Can I use this for my business?",
    a: "Absolutely. CompressKit is great for e-commerce, web development, marketing, and any professional use case. Optimize product images, blog headers, social media posts, and more.",
  },
  {
    q: "What's the maximum image size?",
    a: "Free users can process images up to 10MB each. Pro users can handle images up to 50MB each. Most web images are well under these limits.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[var(--muted-bg)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Frequently Asked <span className="text-[var(--primary)]">Questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl border border-[var(--card-border)] bg-[var(--background)] overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-[var(--muted-bg)] transition-colors"
              >
                <span className="font-medium pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-[var(--muted)] shrink-0 transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-sm text-[var(--muted)] leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
