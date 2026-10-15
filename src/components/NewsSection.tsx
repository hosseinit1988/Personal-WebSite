import React, { useState } from 'react';
import { Search, Clock, Eye, Heart, Share2, BookOpen, ArrowUpRight, X, Bookmark, Check, Newspaper, Sparkles, Send } from 'lucide-react';
import { NEWS_ARTICLES } from '../data/newsData';
import { NewsArticle, Language, Theme } from '../types';

interface NewsSectionProps {
  theme: Theme;
  lang: Language;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ theme, lang }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [likesState, setLikesState] = useState<Record<string, number>>({});
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const [copiedLink, setCopiedLink] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const isDark = theme === 'dark';

  const t = {
    fa: {
      kicker: 'پایگاه خبری و تحلیل تکنولوژی',
      title: 'جدیدترین مقالات و رویدادهای شبکه و لینوکس',
      subtitle: 'گزارش‌های فنی، تحلیل پروتکل‌های رمزنگاری، کرنل لینوکس و بهینه‌سازی زیرساخت‌های ابری',
      searchPlaceholder: 'جستجو در میان مقالات و تحلیل‌ها...',
      catAll: 'همه مقالات',
      catNetwork: 'شبکه و DNS',
      catLinux: 'کرنل لینوکس و سیستم',
      catSecurity: 'امنیت و تونلینگ',
      catCloud: 'زیرساخت ابری',
      readMore: 'مطالعه کامل مقاله',
      readTimePrefix: 'زمان مطالعه:',
      views: 'بازدید',
      likes: 'پسندیدن',
      authorLabel: 'نویسنده:',
      share: 'اشتراک‌گذاری',
      copied: 'لینک کپی شد!',
      close: 'بستن پنجره',
      newsletterTitle: 'عضویت در خبرنامه تخصصی DevOps و شبکه',
      newsletterDesc: 'هفته‌ای یک‌بار، تحلیل‌های فنی و اسکریپت‌های جدید را در ایمیل خود دریافت کنید.',
      subscribeBtn: 'عضویت در خبرنامه',
      subscribedMsg: 'ایمیل شما با موفقیت ثبت شد!',
      emailPlaceholder: 'ایمیل کاری یا شخصی خود را وارد کنید...'
    },
    en: {
      kicker: 'Tech News & Technical Analysis',
      title: 'Latest Network & Linux Insights',
      subtitle: 'Deep dives into encrypted protocols, Linux kernel evolution, and cloud infrastructure optimization',
      searchPlaceholder: 'Search articles and technical insights...',
      catAll: 'All Articles',
      catNetwork: 'Network & DNS',
      catLinux: 'Linux & Kernel',
      catSecurity: 'Security & Tunnels',
      catCloud: 'Cloud Infrastructure',
      readMore: 'Read Full Article',
      readTimePrefix: 'Read time:',
      views: 'views',
      likes: 'Likes',
      authorLabel: 'Author:',
      share: 'Share',
      copied: 'Link Copied!',
      close: 'Close Window',
      newsletterTitle: 'Subscribe to DevOps & Network Intelligence',
      newsletterDesc: 'Weekly curated technical architectures, kernel insights, and open-source scripts.',
      subscribeBtn: 'Subscribe',
      subscribedMsg: 'Thank you! You are now subscribed.',
      emailPlaceholder: 'Enter your email address...'
    }
  }[lang];

  const categories = [
    { id: 'all', label: t.catAll },
    { id: 'network', label: t.catNetwork },
    { id: 'linux', label: t.catLinux },
    { id: 'security', label: t.catSecurity },
    { id: 'cloud', label: t.catCloud }
  ];

  const filteredArticles = NEWS_ARTICLES.filter((article) => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      article.title[lang].toLowerCase().includes(q) ||
      article.summary[lang].toLowerCase().includes(q) ||
      article.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const handleLike = (articleId: string) => {
    setLikesState((prev) => {
      const current = prev[articleId] ?? (NEWS_ARTICLES.find((a) => a.id === articleId)?.likes || 0);
      return { ...prev, [articleId]: current + 1 };
    });
  };

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleShare = (article: NewsArticle) => {
    navigator.clipboard.writeText(`${window.location.origin}/#news-${article.id}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim() && newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 5000);
    }
  };

  return (
    <section id="news" className={`py-16 lg:py-24 border-t ${
      isDark ? 'border-slate-800/80 bg-slate-950' : 'border-slate-200 bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* News Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
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

          {/* Search Input */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="absolute top-1/2 -translate-y-1/2 start-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className={`w-full ps-9 pe-4 py-2.5 rounded-xl text-xs sm:text-sm border transition-colors focus:outline-none ${
                isDark
                  ? 'border-slate-800 bg-slate-900 text-slate-100 placeholder-slate-500 focus:border-cyan-500'
                  : 'border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-sky-500'
              }`}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className={`flex items-center gap-1 p-1 rounded-xl border mb-8 overflow-x-auto w-fit ${
          isDark ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-slate-100/60'
        }`}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? isDark
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                    : 'bg-white text-slate-900 shadow-xs font-semibold'
                  : isDark
                  ? 'text-slate-400 hover:text-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Articles Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, idx) => (
            <article
              key={article.id}
              className={`rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden ${
                isDark
                  ? 'border-slate-800/80 bg-slate-900/30 hover:border-slate-700 hover:bg-slate-900/60'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
              }`}
            >
              <div>
                {/* Visual Header Strip with Abstract Tech Mesh Container */}
                <div className={`h-36 relative overflow-hidden flex items-center justify-center p-6 ${
                  idx % 3 === 0
                    ? 'bg-gradient-to-br from-cyan-950/70 via-slate-900 to-indigo-950/70'
                    : idx % 3 === 1
                    ? 'bg-gradient-to-br from-indigo-950/70 via-slate-900 to-purple-950/70'
                    : 'bg-gradient-to-br from-emerald-950/70 via-slate-900 to-cyan-950/70'
                }`}>
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
                  <div className="relative text-center space-y-1">
                    <div className="w-10 h-10 mx-auto rounded-xl bg-slate-900/80 border border-slate-700/80 flex items-center justify-center text-cyan-400 shadow-inner">
                      <Newspaper className="w-5 h-5" />
                    </div>
                    <div className="text-[11px] font-mono text-cyan-300/80 tracking-wider">
                      {article.tags.slice(0, 2).join(' · ')}
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  {/* Clean Unboxed Metadata */}
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-3">
                    <span>{lang === 'fa' ? article.dateShamsi : article.dateGregorian}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{article.readTime}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums font-mono">
                      {article.views} {t.views}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold tracking-tight mb-3 line-clamp-2 leading-snug">
                    <button
                      onClick={() => setActiveArticle(article)}
                      className="text-start hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      {article.title[lang]}
                    </button>
                  </h3>

                  {/* Summary */}
                  <p className={`text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3 ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {article.summary[lang]}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-400">
                    {article.tags.map((tag, i) => (
                      <React.Fragment key={tag}>
                        {i > 0 && <span aria-hidden="true" className="text-slate-600">·</span>}
                        <span>{tag}</span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className={`p-6 pt-4 border-t flex items-center justify-between gap-3 text-xs ${
                isDark ? 'border-slate-800' : 'border-slate-100'
              }`}>
                <button
                  onClick={() => setActiveArticle(article)}
                  className={`inline-flex items-center gap-1 font-semibold transition-colors cursor-pointer ${
                    isDark ? 'text-cyan-400 hover:text-cyan-300' : 'text-sky-600 hover:text-sky-700'
                  }`}
                >
                  <span>{t.readMore}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-3 text-slate-400">
                  <button
                    onClick={() => handleLike(article.id)}
                    className="flex items-center gap-1 hover:text-rose-400 transition-colors tabular-nums font-mono"
                    title={t.likes}
                  >
                    <Heart className="w-3.5 h-3.5" />
                    <span>{likesState[article.id] ?? article.likes}</span>
                  </button>

                  <button
                    onClick={() => toggleBookmark(article.id)}
                    className={`hover:text-cyan-400 transition-colors ${
                      bookmarkedIds.has(article.id) ? 'text-cyan-400' : ''
                    }`}
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Subscription Strip */}
        <div className={`mt-14 rounded-2xl border p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 ${
          isDark
            ? 'border-slate-800 bg-gradient-to-r from-slate-900 to-slate-950 text-slate-100'
            : 'border-slate-200 bg-slate-50 text-slate-900'
        }`}>
          <div className="space-y-1 text-center md:text-start">
            <h3 className="text-lg font-bold tracking-tight">
              {t.newsletterTitle}
            </h3>
            <p className={`text-xs sm:text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {t.newsletterDesc}
            </p>
          </div>

          <form onSubmit={handleNewsletterSubmit} className="flex items-center gap-2 w-full md:w-auto">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              className={`px-4 py-2.5 rounded-xl text-xs border w-full sm:w-64 focus:outline-none ${
                isDark
                  ? 'border-slate-700 bg-slate-950 text-white placeholder-slate-500 focus:border-cyan-500'
                  : 'border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:border-sky-500'
              }`}
            />
            <button
              type="submit"
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors shadow-xs ${
                newsletterSubscribed
                  ? 'bg-emerald-500 text-slate-950 font-bold'
                  : isDark
                  ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold'
                  : 'bg-slate-900 hover:bg-slate-800 text-white'
              }`}
            >
              {newsletterSubscribed ? t.subscribedMsg : t.subscribeBtn}
            </button>
          </form>
        </div>
      </div>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className={`relative w-full max-w-3xl rounded-2xl border p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl ${
            isDark ? 'bg-slate-900 border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
          }`}>
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="font-mono text-cyan-400">{articleCategoryLabel(activeArticle.category, lang)}</span>
                  <span>·</span>
                  <span>{lang === 'fa' ? activeArticle.dateShamsi : activeArticle.dateGregorian}</span>
                  <span>·</span>
                  <span>{activeArticle.readTime}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight leading-snug">
                  {activeArticle.title[lang]}
                </h3>
              </div>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
                title={t.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Author info */}
            <div className={`py-3 border-y flex items-center justify-between text-xs ${
              isDark ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-600'
            }`}>
              <div>
                <span>{t.authorLabel} </span>
                <span className="font-medium text-slate-200">{activeArticle.author[lang]}</span>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLike(activeArticle.id)}
                  className="flex items-center gap-1 text-slate-400 hover:text-rose-400 font-mono tabular-nums"
                >
                  <Heart className="w-3.5 h-3.5" />
                  <span>{likesState[activeArticle.id] ?? activeArticle.likes}</span>
                </button>
                <button
                  onClick={() => handleShare(activeArticle)}
                  className="flex items-center gap-1 text-slate-400 hover:text-cyan-400"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? t.copied : t.share}</span>
                </button>
              </div>
            </div>

            {/* Content Article Body */}
            <div className={`mt-6 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4 ${
              isDark ? 'text-slate-300' : 'text-slate-700'
            }`}>
              {activeArticle.content[lang]}
            </div>

            {/* Modal Footer */}
            <div className={`mt-8 pt-4 border-t flex items-center justify-between ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                {activeArticle.tags.map((tag) => (
                  <span key={tag} className="font-mono">#{tag}</span>
                ))}
              </div>
              <button
                onClick={() => setActiveArticle(null)}
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

function articleCategoryLabel(cat: string, lang: 'fa' | 'en') {
  const map: Record<string, { fa: string; en: string }> = {
    network: { fa: 'شبکه و DNS', en: 'Network & DNS' },
    linux: { fa: 'کرنل و لینوکس', en: 'Linux & Kernel' },
    security: { fa: 'امنیت و پروکسی', en: 'Security & Proxy' },
    cloud: { fa: 'زیرساخت ابری', en: 'Cloud Infrastructure' }
  };
  return map[cat]?.[lang] || cat;
}
