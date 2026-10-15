import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, RotateCcw, CornerDownLeft, Sparkles, Check } from 'lucide-react';
import { Language, Theme } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface InteractiveTerminalProps {
  theme: Theme;
  lang: Language;
}

interface CommandLog {
  id: string;
  command: string;
  output: string | React.ReactNode;
  timestamp: string;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ theme, lang }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandLog[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isDark = theme === 'dark';

  const t = {
    fa: {
      kicker: 'محیط شبیه‌ساز ابری',
      title: 'ترمینال لینوکس و تست زنده ابزارها',
      subtitle: 'برای بررسی اسکریپت‌ها، تست سلامت تونل و دریافت مشخصات فنی، دستورات زیر را اجرا کنید.',
      placeholder: 'دستوری وارد کنید (مثلا: help ، whoami ، dnstt یا ping)...',
      runBtn: 'اجرا',
      clearBtn: 'پاک‌سازی',
      welcomeMessage: 'خوش آمدید به ترمینال تعاملی سرور Hossein-IT. برای مشاهده دستورات help را تایپ کنید.',
      quickCommands: [
        { cmd: 'whoami', label: 'معرفی مهندس' },
        { cmd: 'projects', label: 'لیست مخازن' },
        { cmd: 'dnstt --status', label: 'تست وضعیت DNSTT' },
        { cmd: 'ping-mirror', label: 'پینگ میرورهای ایران' },
        { cmd: 'sysctl --tuning', label: 'تنظیمات کرنل BBR' },
        { cmd: 'skills', label: 'استک فنی' }
      ]
    },
    en: {
      kicker: 'Cloud Interactive Console',
      title: 'Linux Terminal & Live Tool Diagnostics',
      subtitle: 'Execute live simulated diagnostic commands, test DNS tunnel status, and inspect kernel parameters.',
      placeholder: 'Type a command (e.g. help, whoami, dnstt, ping)...',
      runBtn: 'Run',
      clearBtn: 'Clear',
      welcomeMessage: 'Welcome to Hossein-IT interactive Linux shell. Type "help" to list available commands.',
      quickCommands: [
        { cmd: 'whoami', label: 'Who Am I' },
        { cmd: 'projects', label: 'List Repos' },
        { cmd: 'dnstt --status', label: 'Check DNSTT' },
        { cmd: 'ping-mirror', label: 'Benchmark Mirrors' },
        { cmd: 'sysctl --tuning', label: 'BBR Kernel Tuning' },
        { cmd: 'skills', label: 'Tech Stack' }
      ]
    }
  }[lang];

  // Initialize terminal welcome log
  useEffect(() => {
    if (history.length === 0) {
      setHistory([
        {
          id: 'init-0',
          command: 'systemctl status hossein-it.service',
          output: (
            <div className="space-y-1 text-slate-300 font-mono text-xs">
              <div className="text-emerald-400">● hossein-it.service - DevOps & Network Infrastructure Engine</div>
              <div className="text-slate-400">   Loaded: loaded (/etc/systemd/system/hossein-it.service; enabled)</div>
              <div className="text-slate-400">   Active: active (running) since Oct 2024; 8+ years track record</div>
              <div className="text-cyan-400">   Tasks: 42 (limit: 4915) | Memory: 18.4M | BBR: Enabled</div>
              <div className="text-slate-400">   Status: "{t.welcomeMessage}"</div>
            </div>
          ),
          timestamp: '12:00:01'
        }
      ]);
    }
  }, [lang]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const raw = cmdStr.trim();
    if (!raw) return;

    const lower = raw.toLowerCase();
    let outputContent: React.ReactNode = '';
    const now = new Date().toLocaleTimeString();

    if (lower === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    if (lower === 'help') {
      outputContent = (
        <div className="space-y-1 font-mono text-xs text-slate-300">
          <div className="text-cyan-400 font-bold mb-1">Available Shell Commands:</div>
          <div><span className="text-amber-400">whoami</span> - Display engineer profile and specialization</div>
          <div><span className="text-amber-400">projects</span> - List open-source GitHub repositories & stars</div>
          <div><span className="text-amber-400">dnstt --status</span> - Simulate DNSTT tunnel diagnostics</div>
          <div><span className="text-amber-400">ping-mirror</span> - Benchmark Ubuntu mirrors for Iranian servers</div>
          <div><span className="text-amber-400">sysctl --tuning</span> - View TCP BBR kernel network parameters</div>
          <div><span className="text-amber-400">skills</span> - Display Linux, networking & programming skills</div>
          <div><span className="text-amber-400">contact</span> - Show direct contact details and telegram</div>
          <div><span className="text-amber-400">clear</span> - Clear terminal history</div>
        </div>
      );
    } else if (lower === 'whoami') {
      outputContent = (
        <div className="space-y-1 font-mono text-xs text-slate-300">
          <div className="text-cyan-400 font-bold">Hossein Shorgooshti (hosseinit1988)</div>
          <div>Role: Senior Linux DevOps & Network Infrastructure Engineer</div>
          <div>Location: Iran · Remote Available</div>
          <div>Specialties: DNSTT, DNS over TLS, Reverse Tunnels (Go), eBPF, Kernel Tuning</div>
          <div>GitHub: https://github.com/hosseinit1988</div>
        </div>
      );
    } else if (lower === 'projects') {
      outputContent = (
        <div className="space-y-1.5 font-mono text-xs text-slate-300">
          <div className="text-cyan-400 font-bold">Featured GitHub Repositories:</div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-1">
            <span className="text-emerald-400 font-semibold">1. easy-dnstt-tunnel</span>
            <span className="text-amber-400">★ 142 stars · 38 forks</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-1">
            <span className="text-emerald-400 font-semibold">2. DNS-Master-Pro</span>
            <span className="text-amber-400">★ 96 stars · 22 forks</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-1">
            <span className="text-emerald-400 font-semibold">3. Ubuntu-Repository-iran</span>
            <span className="text-amber-400">★ 88 stars · 19 forks</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-800 pb-1">
            <span className="text-emerald-400 font-semibold">4. BackPack (Go Tunnel)</span>
            <span className="text-amber-400">★ 76 stars · 14 forks</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-emerald-400 font-semibold">5. X4G (Python Router)</span>
            <span className="text-amber-400">★ 54 stars · 11 forks</span>
          </div>
        </div>
      );
    } else if (lower.startsWith('dnstt')) {
      outputContent = (
        <div className="space-y-1 font-mono text-xs text-slate-300">
          <div className="text-cyan-400 font-bold">[DNSTT Client Diagnostic Engine]</div>
          <div className="text-emerald-400">✓ DNS Recursive Resolver: 1.1.1.1:53 [Connected]</div>
          <div className="text-emerald-400">✓ Domain NS Delegation: t.hossein-it.cloud [Valid]</div>
          <div className="text-emerald-400">✓ Cryptographic Handshake: ChaCha20-Poly1305 [OK]</div>
          <div>→ MTU Negotiated: 1232 bytes</div>
          <div>→ Round-Trip Latency: 184ms (Jitter: ±4ms)</div>
          <div>→ Packet Loss Ratio: 0.00% under BBR Flow Control</div>
          <div className="text-cyan-300 font-semibold">Status: TUNNEL_ESTABLISHED · Ready for duplex proxy streams</div>
        </div>
      );
    } else if (lower.startsWith('ping-mirror') || lower.startsWith('ping')) {
      outputContent = (
        <div className="space-y-1 font-mono text-xs text-slate-300">
          <div className="text-cyan-400 font-bold">[Ubuntu Repository Speed Benchmark - Domestic Servers]</div>
          <div>1. archive.ubuntu.com (Default Global)  - 142ms | 2.1 MB/s</div>
          <div>2. mirror.iranserver.com               - 14ms  | 28.4 MB/s [FASTEST]</div>
          <div>3. ubuntu.asis.ai                      - 18ms  | 24.1 MB/s</div>
          <div>4. mirror.shirazu.ac.ir (Shiraz Univ)  - 22ms  | 19.8 MB/s</div>
          <div className="text-emerald-400 font-semibold mt-1">✓ sources.list successfully updated to fastest local mirror.</div>
        </div>
      );
    } else if (lower.includes('sysctl') || lower.includes('tuning') || lower.includes('bbr')) {
      outputContent = (
        <div className="space-y-1 font-mono text-xs text-slate-300">
          <div className="text-cyan-400 font-bold">[Linux Kernel Network Tuning Config - /etc/sysctl.d/99-network.conf]</div>
          <div>net.core.default_qdisc = fq</div>
          <div>net.ipv4.tcp_congestion_control = bbr</div>
          <div>net.core.rmem_max = 67108864</div>
          <div>net.core.wmem_max = 67108864</div>
          <div>net.ipv4.tcp_rmem = 4096 87380 67108864</div>
          <div>net.ipv4.tcp_wmem = 4096 65536 67108864</div>
          <div className="text-emerald-400">Kernel sysctl parameters verified and applied into runtime.</div>
        </div>
      );
    } else if (lower === 'skills') {
      outputContent = (
        <div className="space-y-1 font-mono text-xs text-slate-300">
          <div className="text-cyan-400 font-bold">[Engineer Technical Stack & Matrix]</div>
          <div>• OS: Ubuntu, Debian, RedHat, Rocky Linux, Alpine</div>
          <div>• Networking: DNS, DoT, DoH, DNSTT, WireGuard, VLESS, BGP, IPTables</div>
          <div>• Languages: Bash / Shell (Expert), Python (AsyncIO), Go, PHP, SQL</div>
          <div>• DevOps: Docker, Podman, Nginx, Systemd, GitHub Actions, Ansible</div>
        </div>
      );
    } else if (lower === 'contact') {
      outputContent = (
        <div className="space-y-1 font-mono text-xs text-slate-300">
          <div className="text-cyan-400 font-bold">[Hossein Shorgooshti Contact Info]</div>
          <div>• Email: {PERSONAL_INFO.email}</div>
          <div>• GitHub: {PERSONAL_INFO.githubUrl}</div>
          <div>• Telegram: {PERSONAL_INFO.telegram}</div>
        </div>
      );
    } else {
      outputContent = (
        <div className="text-rose-400 font-mono text-xs">
          bash: {raw}: command not found. Type <span className="text-cyan-300 underline cursor-pointer" onClick={() => executeCommand('help')}>help</span> for available commands.
        </div>
      );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: `cmd-${Date.now()}`,
        command: raw,
        output: outputContent,
        timestamp: now
      }
    ]);
    setInputVal('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  return (
    <section id="terminal" className={`py-16 lg:py-24 border-t ${
      isDark ? 'border-slate-800/80 bg-slate-950' : 'border-slate-200 bg-slate-900 text-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs font-semibold tracking-wide uppercase text-cyan-400 mb-2">
            {t.kicker}
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            {t.title}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400">
            {t.subtitle}
          </p>

          {/* Quick-Click Command Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {t.quickCommands.map((item) => (
              <button
                key={item.cmd}
                onClick={() => executeCommand(item.cmd)}
                className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 transition-colors cursor-pointer"
              >
                $ {item.cmd}
              </button>
            ))}
          </div>
        </div>

        {/* Terminal Window */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-slate-700/80 bg-slate-950 overflow-hidden shadow-2xl">
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ms-2 font-mono text-xs text-slate-400">
                root@hossein-it: ~ (bash 5.2)
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setHistory([])}
                className="text-xs font-mono text-slate-400 hover:text-white px-2 py-0.5 rounded hover:bg-slate-800 transition-colors"
                title={t.clearBtn}
              >
                {t.clearBtn}
              </button>
            </div>
          </div>

          {/* Terminal Logs & Output */}
          <div className="p-4 sm:p-6 min-h-[280px] max-h-[420px] overflow-y-auto space-y-4 font-mono text-xs text-start" dir="ltr">
            {history.map((item) => (
              <div key={item.id} className="space-y-1.5">
                <div className="flex items-center gap-2 text-slate-400">
                  <span className="text-cyan-400 font-bold">hossein@devops:~$</span>
                  <span className="text-slate-100 font-semibold">{item.command}</span>
                  <span className="text-slate-600 text-[10px] ms-auto">{item.timestamp}</span>
                </div>
                <div className="ps-4 border-s-2 border-slate-800 text-slate-300">
                  {item.output}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Terminal Input Line */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-4 py-3 bg-slate-900/90 border-t border-slate-800"
            dir="ltr"
          >
            <span className="text-cyan-400 font-bold font-mono text-xs shrink-0">
              hossein@devops:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={t.placeholder}
              className="w-full bg-transparent text-xs font-mono text-cyan-200 placeholder-slate-600 focus:outline-none"
            />
            <button
              type="submit"
              className="px-3 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold font-mono text-xs shrink-0 transition-colors"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
