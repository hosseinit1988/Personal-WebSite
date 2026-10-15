import React from 'react';
import { Github, Mail, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Language, Theme } from '../types';

interface FooterProps {
  theme: Theme;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ theme, lang }) => {
  const isDark = theme === 'dark';

  const t = {
    fa: {
      copyright: `© ${new Date().getFullYear()} تمام حقوق محفوظ است · توسعه داده شده توسط حسین شورگشتی (hosseinit1988)`,
      tagline: 'طراحی شده با استانداردهای مدرن وب، پشتیبانی کامل از زبان فارسی و تعامل سه‌بعدی Three.js',
      backToTop: 'بازگشت به بالا',
      nav: [
        { href: '#about', label: 'درباره من' },
        { href: '#projects', label: 'پروژه‌ها' },
        { href: '#news', label: 'اخبار شبکه' },
        { href: '#terminal', label: 'ترمینال' },
        { href: '#contact', label: 'تماس' }
      ]
    },
    en: {
      copyright: `© ${new Date().getFullYear()} All rights reserved · Engineered by Hossein Shorgooshti (hosseinit1988)`,
      tagline: 'Built with modern web standards, dual language support, and interactive Three.js 3D spatial graphics',
      backToTop: 'Back to top',
      nav: [
        { href: '#about', label: 'About' },
        { href: '#projects', label: 'Projects' },
        { href: '#news', label: 'Tech News' },
        { href: '#terminal', label: 'Terminal' },
        { href: '#contact', label: 'Contact' }
      ]
    }
  }[lang];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t py-12 transition-colors ${
      isDark ? 'border-slate-800/80 bg-slate-950 text-slate-400' : 'border-slate-200 bg-white text-slate-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Tagline */}
          <div className="space-y-1 text-center md:text-start">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-bold text-slate-100 text-sm">
                {lang === 'fa' ? PERSONAL_INFO.name.fa : PERSONAL_INFO.name.en}
              </span>
              <span>·</span>
              <span className="font-mono text-cyan-400 text-xs">
                @{PERSONAL_INFO.githubUsername}
              </span>
            </div>
            <p className="text-xs text-slate-500">
              {t.tagline}
            </p>
          </div>

          {/* Clean Nav Links */}
          <nav className="flex flex-wrap items-center justify-center gap-5 text-xs font-medium">
            {t.nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hover:text-cyan-400 transition-colors whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Social Links & Back to top */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={PERSONAL_INFO.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg border border-slate-800 hover:text-white hover:border-slate-700 transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2 rounded-lg border border-slate-800 hover:text-white hover:border-slate-700 transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-800 hover:text-white hover:border-slate-700 transition-colors text-xs font-medium"
            >
              <span>{t.backToTop}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quiet Copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 text-center text-xs text-slate-500">
          {t.copyright}
        </div>
      </div>
    </footer>
  );
};
