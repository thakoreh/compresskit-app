"use client";

import { Check, Star } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for occasional use",
    features: [
      "Up to 10 images per batch",
      "JPEG, PNG, WebP support",
      "Quality slider (1-100)",
      "Before/after comparison",
      "Individual downloads",
      "Up to 10MB per image",
    ],
    cta: "Start Free",
    href: "#tool",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "one-time",
    description: "For power users and professionals",
    features: [
      "Up to 50 images per batch",
      "All formats + AVIF support",
      "Custom resize dimensions",
      "Before/after comparison",
      "Bulk ZIP download",
      "Up to 50MB per image",
      "Priority processing",
      "No watermark",
      "Lifetime updates",
    ],
    cta: "Get Pro — $12 One-Time",
    href: "https://buy.stripe.com/buyKN0FILL_IS_f_s_s_s00TEST",
    highlighted: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 sm:py-28 bg-[var(--muted-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Simple, <span className="text-[var(--primary)]">Transparent</span>{" "}
            Pricing
          </h2>
          <p className="mt-4 text-lg text-[var(--muted)]">
            Start free. Upgrade once, use forever. No subscriptions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-8 border transition-all ${
                plan.highlighted
                  ? "bg-[var(--background)] border-[var(--primary)] shadow-xl shadow-[var(--primary)]/10 scale-[1.02]"
                  : "bg-[var(--background)] border-[var(--card-border)]"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[var(--primary)] text-white text-xs font-bold flex items-center gap-1">
                  <Star className="w-3 h-3" /> BEST VALUE
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold">{plan.name}</h3>
                <p className="text-sm text-[var(--muted)]">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className="text-[var(--muted)] ml-1">/{plan.period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-[var(--secondary)] mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href={plan.href}
                className={`block text-center px-6 py-3 rounded-xl font-semibold transition-all ${
                  plan.highlighted
                    ? "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] hover:shadow-lg"
                    : "border border-[var(--card-border)] hover:bg-[var(--muted-bg)]"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center mt-8 text-sm text-[var(--muted)]">
          30-day money-back guarantee. No questions asked.
        </p>
      </div>
    </section>
  );
}
