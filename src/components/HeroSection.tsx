import React, { useState } from 'react';
import { ArrowUpRight, Terminal, Github, Shield, Cpu, Activity, CheckCircle, ExternalLink, RefreshCw, Mail, Sparkles } from 'lucide-react';
import { ThreeTechSphere } from './ThreeTechSphere';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Language, Theme } from '../types';

interface HeroSectionProps {
  theme: Theme;
  lang: Language;
  onExploreProjects: () => void;
  onOpenTerminal: () => void;
  onReplay3DIntro?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  theme,
  lang,
  onExploreProjects,
  onOpenTerminal,
  onReplay3DIntro
}) => {
  const [imageError, setImageError] = useState(false);
  const isDark = theme === 'dark';

  // Real GitHub avatar URL
  const githubAvatarUrl = 'https://github.com/hosseinit1988.png';

  const t = {
    fa: {
      kicker: 'معمار زیرساخت لینوکس، مهندس شبکه و امنیت ابری',
      badgeStatus: 'در دسترس برای همکاری و پروژه‌های DevOps',
      headlineStart: 'توسعه‌دهنده ابزارهای نوین',
      headlineAccent: 'تونلینگ، DNS و اتوماسیون لینوکس',
      bio: 'من حسین شورگشتی هستم؛ توسعه‌دهنده ابزارهای تخصصی شبکه و ادمین ارشد سرور. طراح پروژه‌های easy-dnstt-tunnel، DNS-Master-Pro و BackPack با تمرکز بر انتقال امن داده، معماری Zero-Trust و بهینه‌سازی تاخیر هسته لینوکس.',
      btnProjects: 'بررسی پروژه‌های متن‌باز',
      btnTerminal: 'ترمینال تعاملی لینوکس',
      btnGithub: 'پروفایل گیت‌هاب',
      replayIntro: 'پخش مجدد انیمیشن سه‌بعدی لودینگ',
      pinnedReposTitle: 'مخازن پین‌شده در گیت‌هاب:',
      repos: [
        { name: 'easy-dnstt-tunnel', desc: 'تونل DNSTT + پنل 3x-ui' },
        { name: 'DNS-Master-Pro', desc: 'مدیریت و تست ۳۰+ DNS' },
        { name: 'Ubuntu-Repository-iran', desc: 'بهینه‌ساز مخازن ابری' }
      ],
      kpis: [
        { value: '۸+', label: 'سال سابقه مهندسی سیستم‌های لینوکس' },
        { value: '۲۴+', label: 'پروژه و اسکریپت متن‌باز در گیت‌هاب' },
        { value: '۳۰+', label: 'ارائه‌دهنده تحلیل‌شده در DNS-Master-Pro' },
        { value: '۹۹.۹۸٪', label: 'شاخص پایداری و بدون قطعی در زیرساخت' }
      ]
    },
    en: {
      kicker: 'Linux Infrastructure Architect, Network & Cloud Security Engineer',
      badgeStatus: 'Available for DevOps & Network Architecture Inquiries',
      headlineStart: 'Engineering Resilient',
      headlineAccent: 'DNS Tunnels, Networking & Linux Automation',
      bio: 'I am Hossein Shorgooshti (hosseinit1988); Senior Systems & DevOps Engineer. Creator of easy-dnstt-tunnel, DNS-Master-Pro, and BackPack, specializing in high-throughput network tunneling, Zero-Trust edge gateways, and Linux kernel optimization.',
      btnProjects: 'Explore Open-Source Tools',
      btnTerminal: 'Interactive Terminal',
      btnGithub: 'GitHub Profile',
      replayIntro: 'Replay 3D Intro Animation',
      pinnedReposTitle: 'Pinned GitHub Repositories:',
      repos: [
        { name: 'easy-dnstt-tunnel', desc: 'DNSTT tunnel + 3x-ui setup' },
        { name: 'DNS-Master-Pro', desc: '30+ DNS providers benchmark' },
        { name: 'Ubuntu-Repository-iran', desc: 'Mirror latency optimizer' }
      ],
      kpis: [
        { value: '8+', label: 'Years of Linux & Systems Engineering' },
        { value: '24+', label: 'Open-Source Repositories on GitHub' },
        { value: '30+', label: 'DNS Providers Probed in DNS-Master-Pro' },
        { value: '99.98%', label: 'Infrastructure Availability & Uptime Track' }
      ]
    }
  }[lang];

  return (
    <section id="about" className="relative pt-6 pb-16 lg:pt-10 lg:pb-24 overflow-hidden">
      {/* Background radial gradient */}
      <div className="absolute top-0 start-1/2 -translate-x-1/2 w-full max-w-7xl h-96 opacity-15 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500 via-indigo-500 to-transparent blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split Grid: Left Profile & Typography + Right 3D Spatial Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Typography & Profile Column */}
          <div className="lg:col-span-7 space-y-6">
            {/* Real GitHub Profile Avatar Card */}
            <div className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-center sm:items-start gap-4 ${
              isDark
                ? 'bg-slate-900/60 border-slate-800/90 shadow-xl'
                : 'bg-white border-slate-200 shadow-sm'
            }`}>
              {/* Profile Avatar Image with Fallback and Status Dot */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-cyan-500/40 p-0.5 bg-gradient-to-tr from-cyan-500 via-sky-400 to-indigo-500 shadow-lg">
                  {!imageError ? (
                    <img
                      src={githubAvatarUrl}
                      alt={PERSONAL_INFO.name[lang]}
                      referrerPolicy="no-referrer"
                      onError={() => setImageError(true)}
                      className="w-full h-full object-cover rounded-xl bg-slate-900"
                    />
                  ) : (
                    <div className="w-full h-full rounded-xl bg-slate-900 flex flex-col items-center justify-center font-mono font-bold text-cyan-400">
                      <span className="text-xl">HS</span>
                      <span className="text-[10px] text-slate-400 font-sans">hosseinit</span>
                    </div>
                  )}
                </div>
                {/* Active Status Badge */}
                <span
                  className="absolute -bottom-1 -end-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 flex items-center justify-center text-slate-950"
                  title="Active System Engineer"
                >
                  <CheckCircle className="w-3.5 h-3.5 fill-emerald-500 text-slate-950" />
                </span>
              </div>

              {/* Bio & GitHub Attributes */}
              <div className="space-y-1.5 text-center sm:text-start flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
                    <span>{PERSONAL_INFO.name[lang]}</span>
                  </h2>
                  <a
                    href={PERSONAL_INFO.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                  >
                    <span>@{PERSONAL_INFO.githubUsername}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                <div className="text-xs text-slate-400 font-medium">
                  {PERSONAL_INFO.title[lang]}
                </div>

                {/* Status Indicator Bar */}
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{t.badgeStatus}</span>
                </div>
              </div>
            </div>

            {/* Clean Unboxed Kicker */}
            <div className="flex items-center gap-2 text-xs font-medium tracking-wide">
              <span className={isDark ? 'text-cyan-400 font-semibold' : 'text-sky-600 font-semibold'}>
                {t.kicker}
              </span>
              <span className="text-slate-500" aria-hidden="true">·</span>
              <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>
                Iran / Remote
              </span>
            </div>

            {/* Hero Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.25] text-balance">
              <span>{t.headlineStart} </span>
              <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-400 bg-clip-text text-transparent">
                {t.headlineAccent}
              </span>
            </h1>

            {/* Lead Bio */}
            <p className={`text-sm sm:text-base leading-relaxed max-w-2xl ${
              isDark ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {t.bio}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreProjects}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all shadow-md ${
                  isDark
                    ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold hover:shadow-cyan-500/20'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <span>{t.btnProjects}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenTerminal}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm border transition-colors ${
                  isDark
                    ? 'border-slate-700 bg-slate-900/60 hover:bg-slate-800 text-slate-200 hover:text-white'
                    : 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                <Terminal className="w-4 h-4 text-cyan-500" />
                <span>{t.btnTerminal}</span>
              </button>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-colors ${
                  isDark
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Github className="w-4 h-4" />
                <span className="font-mono text-xs">{t.btnGithub}</span>
              </a>

              {onReplay3DIntro && (
                <button
                  onClick={onReplay3DIntro}
                  className="p-3 rounded-xl border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-cyan-400 transition-colors"
                  title={t.replayIntro}
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Pinned Repositories Strip */}
            <div className={`pt-4 border-t space-y-2 ${
              isDark ? 'border-slate-800/80' : 'border-slate-200'
            }`}>
              <div className="text-xs font-semibold text-slate-400">
                {t.pinnedReposTitle}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {t.repos.map((repo) => (
                  <a
                    key={repo.name}
                    href={`https://github.com/hosseinit1988/${repo.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                      isDark
                        ? 'border-slate-800 bg-slate-900/40 text-cyan-300 hover:border-cyan-500/40 hover:bg-slate-900'
                        : 'border-slate-200 bg-slate-100 text-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-bold">{repo.name}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-slate-400 text-[11px] font-sans">{repo.desc}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 3D Scene Viewport Column */}
          <div className="lg:col-span-5 h-[440px] lg:h-[520px]">
            <ThreeTechSphere theme={theme} lang={lang} />
          </div>
        </div>

        {/* Full-Width KPI Strip Below Hero Split */}
        <div className={`mt-14 pt-8 border-t grid grid-cols-2 md:grid-cols-4 gap-6 ${
          isDark ? 'border-slate-800/80' : 'border-slate-200'
        }`}>
          {t.kpis.map((kpi, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono tabular-nums tracking-tight text-cyan-400">
                {kpi.value}
              </div>
              <div className={`text-xs leading-normal ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {kpi.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
