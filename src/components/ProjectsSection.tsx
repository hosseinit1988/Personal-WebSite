import React, { useState } from 'react';
import { Github, Star, GitFork, ArrowUpRight, Terminal, Check, Copy, ExternalLink, ShieldCheck, Layers, X } from 'lucide-react';
import { PROJECTS_DATA } from '../data/portfolioData';
import { Project, Language, Theme } from '../types';

interface ProjectsSectionProps {
  theme: Theme;
  lang: Language;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ theme, lang }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const isDark = theme === 'dark';

  const t = {
    fa: {
      kicker: 'پروژه‌های متن‌باز و ابزارهای مهندسی',
      title: 'مخازن برجسته گیت‌هاب',
      subtitle: 'ابزارهای تخصصی اتوماسیون سرور، کپسوله‌سازی ترافیک DNS، بهینه‌سازی مخازن و تونل‌های معکوس',
      filterAll: 'همه پروژه‌ها',
      filterNetwork: 'شبکه و تونلینگ',
      filterDevops: 'دوآپس و لینوکس',
      filterSecurity: 'امنیت و پروکسی',
      filterTools: 'ابزارهای مانیتورینگ',
      viewDetails: 'مشاهده مشخصات فنی',
      githubLink: 'مشاهده در گیت‌هاب',
      copyCommand: 'کپی دستور نصب',
      copied: 'کپی شد!',
      featuresTitle: 'ویژگی‌ها و قابلیت‌های کلیدی',
      architectureTitle: 'معماری و منطق فنی',
      close: 'بستن'
    },
    en: {
      kicker: 'Open-Source Projects & Engineering Utilities',
      title: 'Featured GitHub Repositories',
      subtitle: 'Specialized server automation scripts, DNS packet encapsulation, repository mirrors, and Go reverse tunnels',
      filterAll: 'All Repositories',
      filterNetwork: 'Networking & Tunnels',
      filterDevops: 'DevOps & Linux',
      filterSecurity: 'Security & Proxy',
      filterTools: 'Monitoring Tools',
      viewDetails: 'Technical Specs',
      githubLink: 'View on GitHub',
      copyCommand: 'Copy Install Command',
      copied: 'Copied!',
      featuresTitle: 'Key Architecture & Capabilities',
      architectureTitle: 'Internal Mechanics',
      close: 'Close'
    }
  }[lang];

  const categories = [
    { id: 'all', label: t.filterAll },
    { id: 'network', label: t.filterNetwork },
    { id: 'devops', label: t.filterDevops },
    { id: 'security', label: t.filterSecurity }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="projects" className={`py-16 lg:py-24 border-t ${
      isDark ? 'border-slate-800/80 bg-slate-950' : 'border-slate-200 bg-slate-50/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className={`text-xs font-semibold tracking-wide uppercase mb-2 ${
              isDark ? 'text-cyan-400' : 'text-sky-600'
            }`}>
              {t.kicker}
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight">
              {t.title}
            </h2>
            <p className={`mt-2 text-sm sm:text-base max-w-2xl ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              {t.subtitle}
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className={`flex items-center gap-1 p-1 rounded-xl border shrink-0 overflow-x-auto ${
            isDark ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-white'
          }`}>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? isDark
                      ? 'bg-cyan-500/20 text-cyan-300 font-semibold shadow-xs'
                      : 'bg-slate-900 text-white shadow-xs'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-200'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between p-6 ${
                isDark
                  ? 'border-slate-800/90 bg-slate-900/40 hover:border-slate-700 hover:bg-slate-900/70'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div>
                {/* Unboxed Metadata Header */}
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                  <span className="font-mono text-cyan-400 font-medium">
                    {project.tags[0]}
                  </span>
                  <div className="flex items-center gap-3 tabular-nums font-mono">
                    <span className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                      <span>{project.stars}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="w-3.5 h-3.5 text-slate-400" />
                      <span>{project.forks}</span>
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold tracking-tight mb-2">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="text-start hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    {project.title[lang]}
                  </button>
                </h3>

                {/* Description */}
                <p className={`text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3 ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {project.description[lang]}
                </p>

                {/* Unboxed Tag List */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400 mb-4">
                  {project.tags.slice(1, 5).map((tag, idx) => (
                    <React.Fragment key={tag}>
                      {idx > 0 && <span aria-hidden="true" className="text-slate-600">·</span>}
                      <span>{tag}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className={`pt-4 border-t flex items-center justify-between gap-2 text-xs ${
                isDark ? 'border-slate-800' : 'border-slate-100'
              }`}>
                <button
                  onClick={() => setActiveModalProject(project)}
                  className={`inline-flex items-center gap-1 font-medium transition-colors cursor-pointer ${
                    isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-sky-600 hover:text-sky-700'
                  }`}
                >
                  <span>{t.viewDetails}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {project.commandSnippet && (
                    <button
                      onClick={() => handleCopy(project.commandSnippet!, project.id)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        copiedId === project.id
                          ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10'
                          : isDark
                          ? 'border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                          : 'border-slate-200 text-slate-600 hover:text-slate-900'
                      }`}
                      title={t.copyCommand}
                    >
                      {copiedId === project.id ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-1.5 rounded-lg border transition-colors ${
                      isDark
                        ? 'border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                        : 'border-slate-200 text-slate-600 hover:text-slate-900'
                    }`}
                    title={t.githubLink}
                  >
                    <Github className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Detail Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className={`relative w-full max-w-2xl rounded-2xl border p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl ${
            isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
          }`}>
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="text-xs font-mono text-cyan-400 mb-1">
                  {activeModalProject.tags.join(' · ')}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                  {activeModalProject.title[lang]}
                </h3>
              </div>
              <button
                onClick={() => setActiveModalProject(null)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                title={t.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="space-y-6 text-sm">
              <p className={`leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {activeModalProject.fullDetails[lang]}
              </p>

              {/* Install snippet */}
              {activeModalProject.commandSnippet && (
                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-slate-400 flex items-center gap-1">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{t.copyCommand}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
                    <code className="text-start select-all">{activeModalProject.commandSnippet}</code>
                    <button
                      onClick={() => handleCopy(activeModalProject.commandSnippet!, 'modal')}
                      className="ms-3 p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white shrink-0"
                    >
                      {copiedId === 'modal' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Architecture */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm flex items-center gap-1.5 text-indigo-400">
                  <Layers className="w-4 h-4" />
                  <span>{t.architectureTitle}</span>
                </h4>
                <p className={`text-xs sm:text-sm leading-relaxed p-3 rounded-xl border ${
                  isDark ? 'bg-slate-950/60 border-slate-800/80 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}>
                  {activeModalProject.architecture[lang]}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-2">
                <h4 className="font-semibold text-sm flex items-center gap-1.5 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t.featuresTitle}</span>
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm">
                  {activeModalProject.keyFeatures[lang].map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold">✓</span>
                      <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className={`mt-8 pt-4 border-t flex items-center justify-between ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <a
                href={activeModalProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950"
              >
                <Github className="w-4 h-4" />
                <span>{t.githubLink}</span>
              </a>
              <button
                onClick={() => setActiveModalProject(null)}
                className={`px-4 py-2 rounded-xl text-xs border ${
                  isDark ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-300 hover:bg-slate-100'
                }`}
              >
                {t.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
