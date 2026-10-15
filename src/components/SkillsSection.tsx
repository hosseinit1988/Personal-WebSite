import React from 'react';
import { Server, Terminal, Cpu, Activity, ShieldCheck, Globe, Zap, Layers, Network, Cloud, Code, FileCode, Globe2, Database, Box } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { Language, Theme } from '../types';

interface SkillsSectionProps {
  theme: Theme;
  lang: Language;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Server,
  Terminal,
  Cpu,
  Activity,
  ShieldCheck,
  Globe,
  Zap,
  Layers,
  Network,
  Cloud,
  Code,
  FileCode,
  Globe2,
  Database,
  Box
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({ theme, lang }) => {
  const isDark = theme === 'dark';

  const t = {
    fa: {
      kicker: 'تخصص‌ها و تسلط‌های فنی',
      title: 'استک فناوری و مهارت‌های زیرساخت',
      subtitle: 'ترکیبی از عمیق‌ترین مفاهیم سیستم‌عامل لینوکس، پروتکل‌های مسیریابی شبکه و برنامه‌نویسی سطح سیستم'
    },
    en: {
      kicker: 'Technical Proficiencies',
      title: 'Technology Stack & Infrastructure Mastery',
      subtitle: 'Combining deep Linux internals, low-level network routing protocols, and systems engineering'
    }
  }[lang];

  return (
    <section id="skills" className={`py-16 lg:py-24 border-t ${
      isDark ? 'border-slate-800/80 bg-slate-950' : 'border-slate-200 bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className={`text-xs font-semibold tracking-wide uppercase mb-2 ${
            isDark ? 'text-cyan-400' : 'text-sky-600'
          }`}>
            {t.kicker}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
            {t.title}
          </h2>
          <p className={`mt-2 text-sm sm:text-base ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}>
            {t.subtitle}
          </p>
        </div>

        {/* 3 Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILL_CATEGORIES.map((category, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border p-6 flex flex-col justify-between ${
                isDark
                  ? 'border-slate-800/80 bg-slate-900/40'
                  : 'border-slate-200 bg-slate-50/70'
              }`}
            >
              <div>
                <h3 className="text-base sm:text-lg font-bold tracking-tight mb-5 pb-3 border-b border-slate-700/40 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>{category.title[lang]}</span>
                </h3>

                <div className="space-y-4">
                  {category.skills.map((skill) => {
                    const IconComponent = ICON_MAP[skill.icon] || Server;
                    return (
                      <div key={skill.name} className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-medium">
                          <span className="flex items-center gap-2 text-slate-200">
                            <IconComponent className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{skill.name}</span>
                          </span>
                          <span className="font-mono text-cyan-400 tabular-nums">
                            {skill.level}%
                          </span>
                        </div>
                        {/* Progress Bar */}
                        <div className={`h-1.5 w-full rounded-full overflow-hidden ${
                          isDark ? 'bg-slate-800' : 'bg-slate-200'
                        }`}>
                          <div
                            className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full transition-all duration-500"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
