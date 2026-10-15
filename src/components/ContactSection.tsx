import React, { useState } from 'react';
import { Mail, Github, Send, MessageSquare, Check, ArrowUpRight, ShieldCheck, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Language, Theme } from '../types';

interface ContactSectionProps {
  theme: Theme;
  lang: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ theme, lang }) => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const isDark = theme === 'dark';

  const t = {
    fa: {
      kicker: 'ارتباط مستقیم و همکاری',
      title: 'شروع یک پروژه یا مشاوره زیرساخت',
      subtitle: 'برای راه‌اندازی سرور، اتوماسیون دوآپس، بهینه‌سازی شبکه یا توسعه وب و PHP، می‌توانید از راه‌های زیر پیام ارسال کنید.',
      nameLabel: 'نام و نام‌خانوادگی',
      namePlaceholder: 'مثال: علیرضا محمدی',
      emailLabel: 'ایمیل تماس',
      emailPlaceholder: 'you@example.com',
      subjectLabel: 'موضوع پروژه',
      subjectPlaceholder: 'مثال: مشاوره کانفیگ سرور لینوکس و DNSTT',
      messageLabel: 'شرح پیام یا پروژه',
      messagePlaceholder: 'توضیحات مورد نظر خود را بنویسید...',
      sendBtn: 'ارسال پیام به حسین شورگشتی',
      sendingBtn: 'در حال ارسال...',
      successMsg: 'پیام شما دریافت شد! در اسرع وقت پاسخ داده خواهد شد.',
      directChannels: 'راه‌های ارتباط مستقیم',
      locationLabel: 'موقعیت:',
      servicesTitle: 'زمینه‌های همکاری تخصصی',
      services: [
        'راه‌اندازی و کانفیگ امنیتی سرورهای لینوکس (Ubuntu, Debian, RHEL)',
        'پیاده‌سازی تونل‌های پایدار شبکه (DNSTT, WireGuard, Reverse Proxy)',
        'توسعه بک‌اند وب با PHP و ابزارهای اتوماسیون Python/Go',
        'بهینه‌سازی تاخیر و تنظیمات هسته لینوکس (Kernel Sysctl & BBR)'
      ]
    },
    en: {
      kicker: 'Direct Inquiries & Collaboration',
      title: 'Start a Project or Infrastructure Consultation',
      subtitle: 'For server provisioning, DevOps automation, network optimization, or full-stack PHP/web engineering.',
      nameLabel: 'Your Full Name',
      namePlaceholder: 'e.g. Alex Morgan',
      emailLabel: 'Your Email Address',
      emailPlaceholder: 'you@example.com',
      subjectLabel: 'Project Subject',
      subjectPlaceholder: 'e.g. Linux Server Hardening & DNSTT Tunnel Setup',
      messageLabel: 'Message Details',
      messagePlaceholder: 'Describe your requirements or questions...',
      sendBtn: 'Send Message to Hossein',
      sendingBtn: 'Sending...',
      successMsg: 'Your inquiry has been received! I will respond promptly.',
      directChannels: 'Direct Channels',
      locationLabel: 'Location:',
      servicesTitle: 'Specialized Capabilities',
      services: [
        'Linux server hardening & automated deployment (Ubuntu, Debian, RHEL)',
        'Resilient network tunneling engineering (DNSTT, WireGuard, Reverse Proxy)',
        'Backend web engineering with PHP & Python/Go automation tools',
        'Kernel latency tuning & TCP congestion control (Sysctl & BBR)'
      ]
    }
  }[lang];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setIsSent(false), 6000);
    }, 700);
  };

  return (
    <section id="contact" className={`py-16 lg:py-24 border-t ${
      isDark ? 'border-slate-800/80 bg-slate-950' : 'border-slate-200 bg-slate-50/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left / Info Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className={`text-xs font-semibold tracking-wide uppercase mb-2 ${
                isDark ? 'text-cyan-400' : 'text-sky-600'
              }`}>
                {t.kicker}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {t.title}
              </h2>
              <p className={`mt-2 text-sm sm:text-base leading-relaxed ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {t.subtitle}
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-3">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-colors ${
                  isDark
                    ? 'border-slate-800 bg-slate-900/40 hover:bg-slate-900 hover:border-slate-700'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-medium">Email</div>
                  <div className="text-sm font-semibold font-mono text-cyan-400">
                    {PERSONAL_INFO.email}
                  </div>
                </div>
              </a>

              <a
                href={PERSONAL_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                  isDark
                    ? 'border-slate-800 bg-slate-900/40 hover:bg-slate-900 hover:border-slate-700'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-white shrink-0">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400 font-medium">GitHub</div>
                    <div className="text-sm font-semibold font-mono">
                      github.com/{PERSONAL_INFO.githubUsername}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </a>

              <div className={`p-4 rounded-xl border ${
                isDark ? 'border-slate-800 bg-slate-900/30 text-slate-300' : 'border-slate-200 bg-white text-slate-700'
              }`}>
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>{t.servicesTitle}</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {t.services.map((item, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-cyan-400">·</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right / Interactive Form Column */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-8 rounded-2xl border ${
              isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200 bg-white shadow-sm'
            }`}>
              {isSent ? (
                <div className="text-center py-12 space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold">{t.successMsg}</h3>
                  <button
                    onClick={() => setIsSent(false)}
                    className="text-xs text-cyan-400 underline cursor-pointer"
                  >
                    ارسال پیام دیگر / Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400">
                        {t.nameLabel}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t.namePlaceholder}
                        className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border transition-colors focus:outline-none ${
                          isDark
                            ? 'border-slate-800 bg-slate-950 text-white placeholder-slate-600 focus:border-cyan-500'
                            : 'border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-sky-500'
                        }`}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-400">
                        {t.emailLabel}
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.emailPlaceholder}
                        className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border transition-colors focus:outline-none ${
                          isDark
                            ? 'border-slate-800 bg-slate-950 text-white placeholder-slate-600 focus:border-cyan-500'
                            : 'border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-sky-500'
                        }`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400">
                      {t.subjectLabel}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={t.subjectPlaceholder}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border transition-colors focus:outline-none ${
                        isDark
                          ? 'border-slate-800 bg-slate-950 text-white placeholder-slate-600 focus:border-cyan-500'
                          : 'border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-sky-500'
                      }`}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400">
                      {t.messageLabel}
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.messagePlaceholder}
                      className={`w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm border transition-colors focus:outline-none resize-none ${
                        isDark
                          ? 'border-slate-800 bg-slate-950 text-white placeholder-slate-600 focus:border-cyan-500'
                          : 'border-slate-300 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-sky-500'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-3 px-6 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md ${
                      isDark
                        ? 'bg-cyan-500 hover:bg-cyan-400 text-slate-950'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? t.sendingBtn : t.sendBtn}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
