import React, { useEffect } from 'react';
import { LandingNav } from '../components/landing/LandingNav';
import { HeroSection } from '../components/landing/HeroSection';
import { ProblemSection } from '../components/landing/ProblemSection';
import { HowItWorksSection } from '../components/landing/HowItWorksSection';
import { FeaturesSection } from '../components/landing/FeaturesSection';
import { DemoPreviewSection } from '../components/landing/DemoPreviewSection';
import { TrustSection } from '../components/landing/TrustSection';
import { CTASection } from '../components/landing/CTASection';
import { LandingFooter } from '../components/landing/LandingFooter';

export const LandingPage: React.FC = () => {
  // Scroll-triggered fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    // Small delay to allow DOM to render
    const timer = setTimeout(() => {
      document.querySelectorAll('.fade-in-up').forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ background: 'var(--bg-base)' }}
    >
      <LandingNav />

      <main id="main-content">
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. The Problem */}
        <ProblemSection />

        {/* 3. How It Works */}
        <HowItWorksSection />

        {/* 4. Key Features */}
        <FeaturesSection />

        {/* 5. Live Demo Preview */}
        <DemoPreviewSection />

        {/* 6. Why Trust It */}
        <TrustSection />

        {/* 7. Final CTA */}
        <CTASection />
      </main>

      <LandingFooter />
    </div>
  );
};
