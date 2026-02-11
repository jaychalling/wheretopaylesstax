"use client";

import { useState, FormEvent } from "react";

interface NewsletterFormProps {
  variant?: "inline" | "footer" | "card";
}

export default function NewsletterForm({ variant = "inline" }: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    // TODO: integrate with newsletter service
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 3000);
  };

  if (variant === "footer") {
    return (
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
        <label htmlFor="footer-newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="footer-newsletter-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-md text-white placeholder-slate-500 text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          required
        />
        <button
          type="submit"
          className="btn-primary btn-sm whitespace-nowrap"
        >
          Subscribe
        </button>
        {status === "success" && (
          <p className="text-success-500 text-xs mt-1 sm:mt-0 sm:ml-2 self-center">Newsletter coming soon! We&apos;ll notify you when it&apos;s ready.</p>
        )}
        {status === "error" && (
          <p className="text-danger-500 text-xs mt-1 sm:mt-0 sm:ml-2 self-center">Invalid email</p>
        )}
      </form>
    );
  }

  if (variant === "card") {
    return (
      <div className="bg-primary-50 dark:bg-primary-950/30 border border-primary-100 dark:border-primary-800 rounded-lg p-6">
        <h3 className="text-lg font-heading font-bold text-slate-900 dark:text-white mb-1">
          Get Tax Insights Weekly
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 font-body">
          Stay updated on tax changes, nomad visas, and optimization strategies.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <label htmlFor="card-newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="card-newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1 px-4 py-2.5 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded-md text-sm font-body text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            className="btn-secondary btn-sm"
          >
            Subscribe
          </button>
        </form>
        {status === "success" && (
          <p className="text-success-600 dark:text-success-500 text-xs mt-2">Newsletter coming soon! We&apos;ll notify you when it&apos;s ready.</p>
        )}
        {status === "error" && (
          <p className="text-danger-600 dark:text-danger-500 text-xs mt-2">Please enter a valid email.</p>
        )}
      </div>
    );
  }

  // inline variant
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <label htmlFor="inline-newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="inline-newsletter-email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        className="flex-1 px-3 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded-md text-sm font-body text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        required
      />
      <button
        type="submit"
        className="btn-secondary btn-sm"
      >
        Subscribe
      </button>
    </form>
  );
}
