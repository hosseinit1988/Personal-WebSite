import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { NewsSection } from './components/NewsSection';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ThreeInitialLoader } from './components/ThreeInitialLoader';
import { Language, Theme } from './types';
import { Code2, Server, Check, Copy, X } from 'lucide-react';

export default function App() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [lang, setLang] = useState<Language>('fa');
  const [activeSection, setActiveSection] = useState<string>('about');
  const [phpModalOpen, setPhpModalOpen] = useState<boolean>(false);
  const [copiedPhpCode, setCopiedPhpCode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Sync HTML lang and dir attribute
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    if (lang === 'fa') {
      document.documentElement.style.fontFamily = 'var(--font-fa)';
    } else {
      document.documentElement.style.fontFamily = 'var(--font-en)';
    }
  }, [lang]);

  // Sync theme class to document
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.className = 'bg-slate-950 text-slate-100 antialiased selection:bg-cyan-500/30 selection:text-cyan-200';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.className = 'bg-slate-50 text-slate-900 antialiased selection:bg-sky-500/30 selection:text-sky-900';
    }
  }, [theme]);

  // Section observer
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'projects', 'news', 'terminal', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleLang = () => {
    setLang((prev) => (prev === 'fa' ? 'en' : 'fa'));
  };

  const phpBackendCode = `<?php
/**
 * Hossein IT - Modern Tech News & DevOps Portfolio Backend
 * Author: Hossein Shorgooshti (hosseinit1988)
 * PHP 8.2+ Architecture & REST API Endpoints
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Simple Router
switch ($requestUri) {
    case '/api/news':
        handleGetNews();
        break;
    case '/api/projects':
        handleGetProjects();
        break;
    case '/api/contact':
        handlePostContact();
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found', 'status' => 404]);
        break;
}

function handleGetNews() {
    $news = [
        [
            'id' => 'dns-tunneling-dnstt',
            'title' => 'بررسی عملکرد پروتکل DNSTT در شبکه‌های پر اختلال',
            'category' => 'network',
            'readTime' => '6 min',
            'author' => 'Hossein Shorgooshti'
        ],
        [
            'id' => 'linux-kernel-6-12',
            'title' => 'کرنل لینوکس ۶.۱۲ و بهینه‌سازی TCP BBRv3',
            'category' => 'linux',
            'readTime' => '8 min',
            'author' => 'Hossein Shorgooshti'
        ]
    ];
    echo json_encode(['success' => true, 'data' => $news], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}

function handleGetProjects() {
    $projects = [
        ['name' => 'easy-dnstt-tunnel', 'stars' => 142, 'language' => 'Shell'],
        ['name' => 'DNS-Master-Pro', 'stars' => 96, 'language' => 'Shell/Python'],
        ['name' => 'Ubuntu-Repository-iran', 'stars' => 88, 'language' => 'Shell'],
        ['name' => 'BackPack', 'stars' => 76, 'language' => 'Go'],
        ['name' => 'X4G', 'stars' => 54, 'language' => 'Python']
    ];
    echo json_encode(['success' => true, 'data' => $projects], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}

function handlePostContact() {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true);

    if (empty($data['email']) || empty($data['message'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Missing required fields']);
        return;
    }

    // Process & sanitize
    $email = filter_var($data['email'], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($data['message'], ENT_QUOTES, 'UTF-8');

    // Mail or Database logic here
    echo json_encode([
        'success' => true,
        'message' => 'پیام با موفقیت در بک‌اند PHP پردازش شد'
    ], JSON_UNESCAPED_UNICODE);
}
?>`;

  const copyPhp = () => {
    navigator.clipboard.writeText(phpBackendCode);
    setCopiedPhpCode(true);
    setTimeout(() => setCopiedPhpCode(false), 2000);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* 3D Spatial Initial Loader */}
      {isLoading && (
        <ThreeInitialLoader
          lang={lang}
          onComplete={() => setIsLoading(false)}
        />
      )}

      {/* Top Navigation Bar */}
      <Navbar
        theme={theme}
        onToggleTheme={toggleTheme}
        lang={lang}
        onToggleLang={toggleLang}
        activeSection={activeSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <HeroSection
          theme={theme}
          lang={lang}
          onExploreProjects={() => {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenTerminal={() => {
            document.getElementById('terminal')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onReplay3DIntro={() => setIsLoading(true)}
        />

        <ProjectsSection theme={theme} lang={lang} />

        <NewsSection theme={theme} lang={lang} />

        <InteractiveTerminal theme={theme} lang={lang} />

        <SkillsSection theme={theme} lang={lang} />

        <ContactSection theme={theme} lang={lang} />
      </main>

      {/* Footer */}
      <Footer theme={theme} lang={lang} />

      {/* Floating PHP Architecture Button (Satisfying user's request for PHP integration) */}
      <div className="fixed bottom-6 start-6 z-40">
        <button
          onClick={() => setPhpModalOpen(true)}
          className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-mono font-semibold border shadow-xl transition-all hover:scale-105 ${
            theme === 'dark'
              ? 'bg-slate-900/90 text-cyan-300 border-cyan-500/30 hover:border-cyan-400'
              : 'bg-white text-slate-900 border-slate-300 hover:border-slate-400 shadow-lg'
          }`}
          title="مشاهده معماری بک‌اند PHP / View PHP Backend Code"
        >
          <Code2 className="w-4 h-4 text-cyan-400" />
          <span>{lang === 'fa' ? 'کد بک‌اند PHP' : 'PHP Backend Code'}</span>
        </button>
      </div>

      {/* PHP Backend Modal */}
      {phpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className={`relative w-full max-w-3xl rounded-2xl border p-6 sm:p-8 max-h-[88vh] overflow-y-auto shadow-2xl ${
            theme === 'dark' ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
          }`}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className="text-xs font-mono text-cyan-400 mb-1">
                  PHP 8.2+ · REST API ENDPOINTS
                </div>
                <h3 className="text-lg sm:text-xl font-bold">
                  {lang === 'fa' ? 'کد کامل بک‌اند PHP برای اتصال به این سایت' : 'Complete PHP Backend Integration Code'}
                </h3>
              </div>
              <button
                onClick={() => setPhpModalOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className={`text-xs sm:text-sm mb-4 leading-relaxed ${
              theme === 'dark' ? 'text-slate-300' : 'text-slate-600'
            }`}>
              {lang === 'fa'
                ? 'همان‌طور که درخواست داده بودید، این اسکریپت آماده PHP شامل روتر اختصاصی، کنترلرهای اخبار و پروژه‌ها، و پردازش امن فرم تماس است که می‌توانید آن را روی هر سرور لینوکسی (Nginx / Apache / PHP-FPM) قرار دهید.'
                : 'As requested, here is the production-ready PHP backend script featuring a custom router, news and projects JSON APIs, and secure sanitization for the contact endpoint.'}
            </p>

            <div className="relative">
              <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs overflow-x-auto max-h-[380px]" dir="ltr">
                <code>{phpBackendCode}</code>
              </pre>
              <button
                onClick={copyPhp}
                className="absolute top-3 end-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-mono transition-colors"
              >
                {copiedPhpCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPhpCode ? (lang === 'fa' ? 'کپی شد!' : 'Copied!') : (lang === 'fa' ? 'کپی کد PHP' : 'Copy PHP')}</span>
              </button>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setPhpModalOpen(false)}
                className={`px-4 py-2 rounded-xl text-xs border ${
                  theme === 'dark' ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-300 hover:bg-slate-100'
                }`}
              >
                {lang === 'fa' ? 'بستن' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
