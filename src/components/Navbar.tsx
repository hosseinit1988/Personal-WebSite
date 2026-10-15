import React from 'react';
import { Sun, Moon, Languages, Terminal, ExternalLink, Menu, X } from 'lucide-react';
import { Language, Theme } from '../types';

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
  lang: Language;
  onToggleLang: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  lang,
  onToggleLang,
  activeSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const t = {
    fa: {
      brand: 'حسین شورگشتی',
      role: 'مهندس دوآپس و شبکه',
      nav: [
        { id: 'about', label: 'درباره من' },
        { id: 'projects', label: 'پروژه‌ها' },
        { id: 'news', label: 'اخبار شبکه و لینوکس' },
        { id: 'terminal', label: 'ترمینال تعاملی' },
        { id: 'skills', label: 'مهارت‌ها' },
        { id: 'contact', label: 'ارتباط' }
      ],
      connectBtn: 'ارتباط مستقیم',
      langBtn: 'EN',
      themeDark: 'شب',
      themeLight: 'روز'
    },
    en: {
      brand: 'Hossein Shorgooshti',
      role: 'DevOps & Network Engineer',
      nav: [
        { id: 'about', label: 'About' },
        { id: 'projects', label: 'Projects' },
        { id: 'news', label: 'Tech News' },
        { id: 'terminal', label: 'Terminal' },
        { id: 'skills', label: 'Skills' },
        { id: 'contact', label: 'Contact' }
      ],
      connectBtn: 'Get in Touch',
      langBtn: 'فا',
      themeDark: 'Dark',
      themeLight: 'Light'
    }
  }[lang];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isDark = theme === 'dark';

  return (
    <header className={`sticky top-0 z-50 w-full transition-colors duration-200 border-b ${
      isDark
        ? 'bg-slate-950/90 border-slate-800/80 text-slate-100'
        : 'bg-white/95 border-slate-200 text-slate-900 shadow-xs'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('about');
            }}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm transition-transform group-hover:scale-105 ${
              isDark
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                : 'bg-sky-50 text-sky-700 border border-sky-200'
            }`}>
              H//IT
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-tight text-base sm:text-lg whitespace-nowrap">
                {t.brand}
              </span>
            </div>
          </a>
        </div>

        {/* Zone 2: Navigation Links (Single-line whitespace-nowrap) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          {t.nav.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`whitespace-nowrap transition-colors relative py-1 hover:text-cyan-500 ${
                activeSection === item.id
                  ? isDark
                    ? 'text-cyan-400 font-semibold'
                    : 'text-sky-600 font-semibold'
                  : isDark
                  ? 'text-slate-400'
                  : 'text-slate-600'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 inset-x-0 h-0.5 bg-cyan-500 rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Zone 3: Primary Controls & Action */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Language Switcher */}
          <button
            onClick={onToggleLang}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
              isDark
                ? 'border-slate-800 bg-slate-900/80 text-slate-300 hover:border-slate-700 hover:text-white'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:text-slate-900'
            }`}
            title={lang === 'fa' ? 'تغییر زبان به انگلیسی' : 'Switch to Persian'}
          >
            <Languages className="w-3.5 h-3.5 text-cyan-500" />
            <span className="font-mono">{t.langBtn}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-lg text-xs border transition-colors ${
              isDark
                ? 'border-slate-800 bg-slate-900/80 text-amber-400 hover:border-slate-700'
                : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'
            }`}
            title={isDark ? t.themeLight : t.themeDark}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={() => scrollTo('contact')}
            className={`hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all shadow-xs whitespace-nowrap shrink-0 ${
              isDark
                ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold hover:shadow-cyan-500/20'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            <span>{t.connectBtn}</span>
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-slate-700/50 text-slate-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`lg:hidden border-b px-4 py-4 space-y-2 ${
          isDark ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          {t.nav.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`block w-full text-start py-2 px-3 rounded-lg text-sm transition-colors ${
                activeSection === item.id
                  ? isDark
                    ? 'bg-slate-900 text-cyan-400 font-semibold'
                    : 'bg-slate-100 text-sky-600 font-semibold'
                  : isDark
                  ? 'text-slate-300 hover:bg-slate-900/50'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => scrollTo('contact')}
              className="w-full text-center py-2.5 px-4 text-xs font-semibold rounded-lg bg-cyan-500 text-slate-950"
            >
              {t.connectBtn}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
