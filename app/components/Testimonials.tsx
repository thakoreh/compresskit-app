"use client";

import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Web Developer",
    avatar: "SC",
    text: "Finally an image compressor that doesn't upload my files to some sketchy server. The bulk ZIP download saves me hours every week.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Marketing Manager",
    avatar: "MJ",
    text: "We switched our entire team to CompressKit. The before/after slider is a game-changer for finding the perfect quality-to-size ratio.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "E-commerce Owner",
    avatar: "PP",
    text: "My product page load times dropped by 60% after compressing images with CompressKit. The WebP conversion is brilliant.",
    rating: 5,
  },
  {
    name: "Tom Anderson",
    role: "Freelance Designer",
    avatar: "TA",
    text: "I process 100+ images per client project. The bulk processing and resize feature alone make this worth every penny.",
    rating: 5,
  },
  {
    name: "Lisa Wang",
    role: "Blogger",
    avatar: "LW",
    text: "So much faster than TinyPNG! No more waiting for uploads. The compression quality is just as good, if not better.",
    rating: 5,
  },
  {
    name: "David Kim",
    role: "Startup Founder",
    avatar: "DK",
    text: "The privacy-first approach sold me. All client assets stay local. The $12 one-time price is insane value.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Loved by <span className="text-[var(--primary)]">12,000+</span> Users
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Here's what people are saying about CompressKit.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-[var(--card-border)] bg-[var(--card)]"
            >
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star
                    key={j}
                    className="w-4 h-4 text-[var(--accent)] fill-[var(--accent)]"
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed mb-4 text-[var(--muted)]">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-xs font-bold">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-[var(--muted)]">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
